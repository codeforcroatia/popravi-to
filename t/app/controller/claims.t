use utf8;
use FixMyStreet::TestMech;
use FixMyStreet::Script::Reports;

my $mech = FixMyStreet::TestMech->new;

my $body = $mech->create_body_ok(2217, 'Buckinghamshire Council');

FixMyStreet::override_config {
    ALLOWED_COBRANDS => 'buckinghamshire',
    COBRAND_FEATURES => {
        claims => { buckinghamshire => 1 },
    },
    PHONE_COUNTRY => 'GB',
    MAPIT_URL => 'http://mapit.uk/',
}, sub {
    subtest 'Report new vehicle claim, report id known' => sub {
        $mech->get_ok('/claims');
        $mech->submit_form_ok({ button => 'start' });
        $mech->submit_form_ok({ with_fields => { what => 0, claimed_before => 0 } });
        $mech->submit_form_ok({ with_fields => { name => "Test McTest", email => 'test@example.org', phone => '01234 567890', address => "12 A Street\nA Town" } });
        $mech->submit_form_ok({ with_fields => { fault_fixed => 2 } });
        $mech->submit_form_ok({ with_fields => { fault_reported => 1 } });
        $mech->submit_form_ok({ with_fields => { report_id => 1 } });
        $mech->submit_form_ok({ with_fields => { location => 'A location' } });
        $mech->submit_form_ok({ with_fields => { 'incident_date.year' => 2020, 'incident_date.month' => 10, 'incident_date.day' => 10, incident_time => 'morning' } });
        $mech->submit_form_ok({ with_fields => { weather => 'sunny', direction => 'east', details => 'some details', in_vehicle => 1, speed => '20mph', actions => 'an action' } });
        $mech->submit_form_ok({ with_fields => { witnesses => 1, witness_details => 'some witnesses', report_police => 1, incident_number => 23 } });
        $mech->submit_form_ok({ with_fields => { what_cause => 'bollard', aware => 1, where_cause => 'bridge', describe_cause => 'a cause', photos => 'phoot!' } });
        $mech->submit_form_ok({ with_fields => { make => 'a car', registration => 'rego!', mileage => '20', v5 => 'v5', v5_in_name => 1, insurer_address => 'insurer address', damage_claim => 0, vat_reg => 0 } });
        $mech->submit_form_ok({ with_fields => { vehicle_damage => 'the car was broken', vehicle_photos => 'car photos', vehicle_receipts => 'receipt photos', tyre_damage => 1, tyre_mileage => 20, tyre_receipts => 'tyre receipts' } });
        $mech->content_contains('Summary');
        $mech->submit_form_ok({ with_fields => { process => 'summary' } });
        $mech->content_contains('Thank you for reporting this issue');

        #my $report = $user->problems->first;
        #is $report->title, "Noise report";
        #is $report->detail, "Kind of noise: music\nNoise details: Details\n\nWhere is the noise coming from? residence\nNoise source: 100000333\n\nIs the noise happening now? Yes\nDoes the time of the noise follow a pattern? Yes\nWhat days does the noise happen? monday, thursday\nWhat time does the noise happen? morning, evening\n";
        #is $report->latitude, 53;
    };
};

done_testing;
