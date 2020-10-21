<template>
  <q-page class="flex flex-center">
    <q-form
      ref="authForm"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      @submit.prevent.stop="handleSubmit"
    >
      <div class="q-gutter-y-sm">
        <form-input
          ref="emailFieldRef"
          type="email"
          spellcheck="false"
          :maxlength="254"
          placeholder="email address"
          aria-label="email address"
          v-model.trim="form.email"
          lazy-rules="ondemand" :rules="[$valid.required, $valid.email]"
          data-cy="email"
        />
        <form-input
          ref="passwordFieldRef"
          type="password"
          spellcheck="false"
          :maxlength="255"
          placeholder="password"
          aria-label="password"
          v-model.trim="form.password"
          lazy-rules="ondemand" :rules="[$valid.required]"
          data-cy="password"
        />
      </div>
      <div class="q-gutter-y-sm q-pt-lg">
        <q-btn
          unelevated
          type="submit"
          color="dark"
          label="Sign In"
          size="lg"
          class="full-width no-border-radius"
          :loading="submitting"
          :disable="submitting"
          data-cy="btnSignIn"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import FormInput from 'components/FormInput'
import { Loading } from 'quasar'

/*
To see the issue: (I was using Chrome... Safari is autofocusing to try and auto fill for me)
Load the page in the browser and do not give focus to any input, but click sign in.
It will submit even though the rules should fail.

If instead a field is focused first, then the rules are evaluated. They also evaluate if you click sign in
again after the first fake login.

Line 92 is the work around I had used in my other project, but I don't think that should be required.

autofocus on a field is also a work around, but in my projects case I had 2 forms side by side and since
I could not autofocus both it was not an option and also it should not be a requirement.
*/

export default {
  name: 'PageIndex',

  data () {
    return {
      submitting: false,
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    async fakeLogin ({ username, password }) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true)
        }, 2000)
      })
    },
    async handleSubmit () {
      // await this.$refs.authForm.focus() // work around I had used in my project
      const formValid = await this.$refs.authForm.validate()

      if (formValid) {
        Loading.show()
        this.submitting = true

        const success = await this.fakeLogin({
          username: this.form.email,
          password: this.form.password
        })

        if (success) {
          this.resetForm()
          this.$q.dialog({
            persistent: true,
            title: 'Good',
            message: 'Good stuff',
            ok: { color: 'positive' }
          })
        } else {
          this.$q.dialog({
            persistent: true,
            title: 'Bad',
            message: 'Bad stuff',
            ok: { color: 'negative' }
          })
        }
        this.submitting = false
        Loading.hide()
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Form invalid!'
        })
      }
    },
    resetForm () {
      this.form = {
        email: '',
        password: ''
      }
      if (this.$refs.authForm) {
        this.$refs.authForm.resetValidation()
      }
    }
  },

  components: {
    FormInput
  }
}
</script>
