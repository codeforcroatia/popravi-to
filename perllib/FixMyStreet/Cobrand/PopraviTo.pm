package FixMyStreet::Cobrand::PopraviTo;
use base 'FixMyStreet::Cobrand::Default';

use strict;
use warnings;

sub languages { [ 'hr,Croatian,hr_HR' ] }
sub language_override { 'hr' }

sub send_questionnaires { 0 }

1;
