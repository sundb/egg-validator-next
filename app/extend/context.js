'use strict';

const Validator = require('async-validator').default;
const _ = require('lodash');

module.exports = {
  async validate(rules, data) {
    data = data || this.request.body;

    const validator = new Validator(rules);
    const fields = this.getFields(rules, data);

    return validator.validate(fields).then(() => {
      return fields;
    }).catch(({ errors }) => {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      });
    });
  },

  getFields(rules, data) {
    const fields = {};
    _.each(data, (v, k) => {
      if (rules[k]) {
        fields[k] = v;
      }
    });

    return fields;
  },
};
