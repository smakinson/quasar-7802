import Vue from 'vue'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

// Adds some validators to components for use with the Quasar form component rules prop.
export const validators = {
  email (val) {
    return isEmail(val) || 'invalid email'
  },
  required (val) {
    return (!!val && !isEmpty(val)) || 'field is required'
  }
}

Vue.prototype.$valid = validators
