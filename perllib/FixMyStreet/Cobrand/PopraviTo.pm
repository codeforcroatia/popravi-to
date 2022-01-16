package FixMyStreet::Cobrand::PopraviTo;
use base 'FixMyStreet::Cobrand::Default';

use strict;
use warnings;

use Carp;
use mySociety::MaPit;
use FixMyStreet::Geocode::OSM;

sub country {
    return 'HR';
}

sub languages { [ 'hr,Croatian,hr_HR' ] }
sub language_override { 'hr' }

sub send_questionnaires { 1 }

# The pin is green is it's fixed or closed, yellow if it's in progress (not in a
# confirmed state), and red otherwise.
sub pin_colour {
    my ( $self, $p, $context ) = @_;
    return 'green' if $p->is_closed;
    return 'green' if $p->is_fixed;
    return 'yellow' if $p->is_in_progress;
    return 'red';
}

sub open311_config {
    my ($self, $row, $h, $params) = @_;

    $params->{multi_photos} = 1;
}

# Is also adding language parameter
sub disambiguate_location {
    return {
        lang => 'hr',
        country => 'hr',
    };
}

sub area_types {
    my $self = shift;
    return $self->next::method() if FixMyStreet->staging_flag('skip_checks');
    [ 'O02', 'O06', 'O07' ];
}

sub geocoded_string_check {
    my ( $self, $s ) = @_;
    return 1 if $s =~ /, Hrvatska/;
    return 0;
}

sub find_closest {
    my ( $self, $problem ) = @_;
    $problem = $problem->{problem} if ref $problem eq 'HASH';
    return FixMyStreet::Geocode::OSM::closest_road_text( $self, $problem->latitude, $problem->longitude );
}

# Used by send-reports, calling find_closest, calling OSM geocoding
sub guess_road_operator {
    my ( $self, $inforef ) = @_;

    my $highway = $inforef->{highway} || "unknown";
    my $refs    = $inforef->{ref}     || "unknown";

    return "Hrvatske autoceste"
        if $highway eq "trunk" || $highway eq "primary";

    for my $ref (split(/;/, $refs)) {
        return "Hrvatske autoceste"
            if $ref =~ m/E ?\d+/ || $ref =~ m/Fv\d+/i;
    }
    return '';
}

sub remove_redundant_areas {
    my $self = shift;
    my $all_areas = shift;

    # Oslo is both a kommune and a fylke, we only want to show it once
    #delete $all_areas->{301}
    #    if $all_areas->{3};
}

# sub reports_body_check {
#     my ( $self, $c, $council ) = @_;
#
#     if ($council eq 'Oslo') {
#
#         # There are two Oslos (kommune and fylke), we only want one of them.
#         $c->stash->{council} = mySociety::MaPit::call('area', 3);
#         return 1;
#
#     } elsif ($council =~ /,/) {
#
#         # Some kommunes have the same name, use the fylke name to work out which.
#         my ($kommune, $fylke) = split /\s*,\s*/, $council;
#         my $area_types = $c->cobrand->area_types;
#         my $areas_k = mySociety::MaPit::call('areas', $kommune, type => $area_types);
#         my $areas_f = mySociety::MaPit::call('areas', $fylke, type => $area_types);
#         if (keys %$areas_f == 1) {
#             ($fylke) = values %$areas_f;
#             foreach (values %$areas_k) {
#                 if ($_->{name} eq $kommune && $_->{parent_area} == $fylke->{id}) {
#                     $c->stash->{council} = $_;
#                     return 1;
#                 }
#             }
#         }
#         # If we're here, we've been given a bad name.
#         $c->detach( 'redirect_index' );
#
#     }
# }

sub jurisdiction_id_example {
    'popravi.to';
}

1;
