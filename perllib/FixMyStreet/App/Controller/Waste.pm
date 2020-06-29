package FixMyStreet::App::Controller::Waste;
use Moose;
use namespace::autoclean;

BEGIN { extends 'Catalyst::Controller' }

use utf8;
use Lingua::EN::Inflect qw( NUMWORDS );
use FixMyStreet::App::Form::Waste::UPRN;
use FixMyStreet::App::Form::Waste::AboutYou;
use FixMyStreet::App::Form::Waste::Request;
use FixMyStreet::App::Form::Waste::Report;

sub auto : Private {
    my ( $self, $c ) = @_;
    my $cobrand_check = $c->cobrand->feature('waste');
    $c->detach( '/page_error_404_not_found' ) if !$cobrand_check;
    return 1;
}

sub index : Path : Args(0) {
    my ( $self, $c ) = @_;

    if (my $uprn = $c->get_param('address')) {
        $c->detach('redirect_to_uprn', [ $uprn ]);
    }

    $c->stash->{title} = 'What is your address?';
    my $form = FixMyStreet::App::Form::Waste::UPRN->new( cobrand => $c->cobrand );
    $form->process( params => $c->req->body_params );
    if ($form->validated) {
        my $addresses = $form->value->{postcode};
        $form = address_list_form($addresses);
    }
    $c->stash->{form} = $form;
}

sub address_list_form {
    my $addresses = shift;
    HTML::FormHandler->new(
        field_list => [
            address => {
                required => 1,
                type => 'Select',
                widget => 'RadioGroup',
                label => 'Select an address',
                tags => { last_differs => 1, small => 1 },
                options => $addresses,
            },
            go => {
                type => 'Submit',
                value => 'Continue',
                element_attr => { class => 'govuk-button' },
            },
        ],
    );
}

sub redirect_to_uprn : Private {
    my ($self, $c, $uprn) = @_;
    my $uri = '/waste/uprn/' . $uprn;
    my $type = $c->get_param('type') || '';
    $uri .= '/request' if $type eq 'request';
    $uri .= '/report' if $type eq 'report';
    $c->res->redirect($uri);
    $c->detach;
}

sub uprn : Chained('/') : PathPart('waste/uprn') : CaptureArgs(1) {
    my ($self, $c, $uprn) = @_;

    if ($uprn eq 'missing') {
        $c->stash->{template} = 'waste/missing.html';
        $c->detach;
    }

    $c->forward('/auth/get_csrf_token');

    my $property = $c->stash->{property} = $c->cobrand->call_hook(look_up_property => $uprn);
    $c->detach( '/page_error_404_not_found', [] ) unless $property;

    $c->stash->{uprn} = $uprn;
    $c->stash->{latitude} = $property->{latitude};
    $c->stash->{longitude} = $property->{longitude};

    $c->stash->{service_data} = $c->cobrand->call_hook(bin_services_for_address => $property) || [];
    $c->stash->{services} = { map { $_->{service_id} => $_ } @{$c->stash->{service_data}} };
}

sub bin_days : Chained('uprn') : PathPart('') : Args(0) {
    my ($self, $c) = @_;
}

sub construct_bin_request_form {
    my $c = shift;

    my $field_list = [];

    foreach (@{$c->stash->{service_data}}) {
        next unless $_->{next};
        my $name = $_->{service_name};
        my $containers = $_->{request_containers};
        my $max = $_->{request_max};
        foreach my $id (@$containers) {
            push @$field_list, "container-$id" => {
                type => 'Checkbox',
                apply => [
                    {
                        when => { "quantity-$id" => sub { $_[0] > 0 } },
                        check => qr/^1$/,
                        message => 'Please tick the box',
                    },
                ],
                label => $name,
                option_label => $c->stash->{containers}->{$id},
                tags => { toggle => "form-quantity-$id-row" },
            };
            $name = ''; # Only on first container
            push @$field_list, "quantity-$id" => {
                type => 'Select',
                label => 'Quantity',
                tags => {
                    hint => "You can request a maximum of " . NUMWORDS($max) . " containers",
                    initial_hidden => 1,
                },
                options => [
                    { value => "", label => '-' },
                    map { { value => $_, label => $_ } } (1..$max),
                ],
                required_when => { "container-$id" => 1 },
            };
        }
    }

    return $field_list;
}

sub request : Chained('uprn') : Args(0) {
    my ($self, $c) = @_;

    my $field_list = construct_bin_request_form($c);

    $c->stash->{first_page} = 'request';
    $c->stash->{form_class} = 'FixMyStreet::App::Form::Waste::Request';
    $c->stash->{page_list} = [
        request => {
            fields => [ grep { ! ref $_ } @$field_list, 'submit' ],
            title => 'Which containers do you need?',
            next => 'about_you',
        },
    ];
    $c->stash->{field_list} = $field_list;
    $c->forward('form');
}

sub process_request_data : Private {
    my ($self, $c, $form) = @_;
    my $data = $form->saved_data;
    my $address = $c->stash->{property}->{address};
    my @services = grep { /^container-/ && $data->{$_} } keys %$data;
    foreach (@services) {
        my ($id) = /container-(.*)/;
        my $container = $c->stash->{containers}{$id};
        my $quantity = $data->{"quantity-$id"};
        $data->{title} = "Request new $container";
        $data->{detail} = "Quantity: $quantity\n\n$address";
        $c->set_param('Container_Type', $id);
        $c->set_param('Quantity', $quantity);
        $c->forward('add_report', [ $data ]) or return;
        push @{$c->stash->{report_ids}}, $c->stash->{report}->id;
    }
    return 1;
}

sub construct_bin_report_form {
    my $c = shift;

    my $field_list = [];

    foreach (@{$c->stash->{service_data}}) {
        next unless $_->{last};
        my $id = $_->{service_id};
        my $name = $_->{service_name};
        push @$field_list, "service-$id" => {
            type => 'Checkbox',
            label => $name,
            option_label => $name,
        };
    }

    return $field_list;
}

sub report : Chained('uprn') : Args(0) {
    my ($self, $c) = @_;

    my $field_list = construct_bin_report_form($c);

    $c->stash->{first_page} = 'report';
    $c->stash->{form_class} = 'FixMyStreet::App::Form::Waste::Report';
    $c->stash->{page_list} = [
        report => {
            fields => [ grep { ! ref $_ } @$field_list, 'submit' ],
            title => 'Select your missed collection',
            next => 'about_you',
        },
    ];
    $c->stash->{field_list} = $field_list;
    $c->forward('form');
}

sub process_report_data : Private {
    my ($self, $c, $form) = @_;
    my $data = $form->saved_data;
    my $address = $c->stash->{property}->{address};
    my @services = grep { /^service-/ && $data->{$_} } keys %$data;
    foreach (@services) {
        my ($id) = /service-(.*)/;
        my $service = $c->stash->{services}{$id}{service_name};
        $data->{title} = "Report missed $service";
        $data->{detail} = "$data->{title}\n\n$address";
        $c->set_param('service_id', $id);
        $c->forward('add_report', [ $data ]) or return;
        push @{$c->stash->{report_ids}}, $c->stash->{report}->id;
    }
    return 1;
}

sub load_form {
    my ($c, $previous_form) = @_;

    my $page;
    if ($previous_form) {
        $page = $previous_form->next;
    } else {
        $page = $c->forward('get_page');
    }

    my $form = $c->stash->{form_class}->new(
        page_list => $c->stash->{page_list},
        $c->stash->{field_list} ? (field_list => $c->stash->{field_list}) : (),
        page_name => $page,
        csrf_token => $c->stash->{csrf_token},
        c => $c,
        previous_form => $previous_form,
        saved_data_encoded => $c->get_param('saved_data'),
        no_preload => 1,
    );

    if (!$form->has_current_page) {
        $c->detach('/page_error_400_bad_request', [ 'Bad request' ]);
    }

    return $form;
}

sub form : Private {
    my ($self, $c) = @_;

    my $form = load_form($c);
    if ($c->get_param('process')) {
        $c->forward('/auth/check_csrf_token');
        $form->process(params => $c->req->body_params);
        if ($form->validated) {
            $form = load_form($c, $form);
        }
    }

    $form->process unless $form->processed;

    $c->stash->{template} = $form->template || 'waste/index.html';
    $c->stash->{form} = $form;
}

sub get_page : Private {
    my ($self, $c) = @_;

    my $goto = $c->get_param('goto') || '';
    my $process = $c->get_param('process') || '';
    $goto = $c->stash->{first_page} unless $goto || $process;
    if ($goto && $process) {
        $c->detach('/page_error_400_bad_request', [ 'Bad request' ]);
    }

    return $goto || $process;
}

sub add_report : Private {
    my ( $self, $c, $data ) = @_;

    $c->stash->{cobrand_data} = 'waste';

    # XXX Is this best way to do this?
    if ($c->user_exists && $c->user->from_body && $c->user->email ne $data->{email}) {
        $c->set_param('form_as', 'another_user');
        $c->set_param('username', $data->{email} || $data->{phone});
    } else {
        $c->set_param('username_register', $data->{email} || $data->{phone});
    }

    # Set the data as if a new report form has been submitted

    $c->set_param('submit_problem', 1);
    $c->set_param('pc', '');
    $c->set_param('non_public', 1);

    $c->set_param('name', $data->{name});
    $c->set_param('phone', $data->{phone});

    $c->set_param('category', $data->{category});
    $c->set_param('title', $data->{title});
    $c->set_param('detail', $data->{detail});
    $c->set_param('uprn', $c->stash->{uprn});

    $c->forward('setup_categories_and_bodies') unless $c->stash->{contacts};
    $c->forward('/report/new/non_map_creation', [['/waste/remove_name_errors']]) or return;
    my $report = $c->stash->{report};
    $report->confirm;
    $report->update;

    $c->model('DB::Alert')->find_or_create({
        user => $report->user,
        alert_type => 'new_updates',
        parameter => $report->id,
        cobrand => $report->cobrand,
        lang => $report->lang,
    })->confirm;

    return 1;
}

sub remove_name_errors : Private {
    my ($self, $c) = @_;
    # We do not mind about missing title/split name here
    my $field_errors = $c->stash->{field_errors};
    delete $field_errors->{fms_extra_title};
    delete $field_errors->{first_name};
    delete $field_errors->{last_name};
}

sub setup_categories_and_bodies : Private {
    my ($self, $c) = @_;

    $c->stash->{all_areas} = $c->stash->{all_areas_mapit} = { $c->cobrand->council_area_id => { id => $c->cobrand->council_area_id } };
    $c->forward('/report/new/setup_categories_and_bodies');
    my $contacts = $c->stash->{contacts};
    @$contacts = grep { grep { $_ eq 'Waste' } @{$_->groups} } @$contacts;
}

__PACKAGE__->meta->make_immutable;

1;
