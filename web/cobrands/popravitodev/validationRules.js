confirm_validation_rules = {
    name: {
      required: true,
      maxlength: 50
    },
    phone: {
      maxlength: 20
    },
    title: {
      required: true,
      maxlength: 50
    },
    detail: {
      required: true,
      maxlength: 2000
    }
};

body_validation_rules = {
    'Grad Zagreb': confirm_validation_rules,
    'Bromley Council': {
        detail: {
          required: true,
          maxlength: 1750
        }
    },
    'Buckinghamshire Council': confirm_validation_rules,
    'Northamptonshire County Council': {
        title: {
          required: true,
          maxlength: 120
        }
    },
    'Oxfordshire County Council': {
        detail: {
          required: true,
          maxlength: 1700
        },
        name: {
          required: true,
          maxlength: 50
        },
        phone: {
          maxlength: 20
        },
        email: {
          maxlength: 50
        }
    }
};
