<template>
  <v-layout>
    <v-flex>
      <v-card v-if="$auth.state.loggedIn">
        <v-alert :value="error" type="error">{{ error }}</v-alert>
        <v-card-text> Logged in as {{ $auth.state.user.email }} </v-card-text>
        <v-card-actions>
          <v-btn @click="logout">Log out</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-alert :value="error" type="error">{{ error }}</v-alert>
        <v-card-text>
          <v-form>
            <v-text-field v-model="email" label="Email" />
            <v-text-field v-model="password" label="Password" type="password" />
          </v-form>
          <v-card-actions>
            <v-btn @click="login">Log in</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'simple',
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            user: {
              email: this.email,
              password: this.password
            }
          }
        })
      } catch (e) {
        // this.$toast.error('Error while authenticating')
        this.error = e
      }
    }
  }
}
</script>
