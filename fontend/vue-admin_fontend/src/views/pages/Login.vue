<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" :value="loginEmail" @input="setLoginEmail" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" :value="loginPassword" @input="setLoginPassword" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" @click="login">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
                <div class="err" v-if="loginError" style="color: red;">
                  <p>{{loginError}}</p>
                </div>

                <!-- <b-alert show variant="warning"></b-alert> -->
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Employee and salary management application using Nodejs/Adonis-framework Backend and Vuejs Fontend.</p>
                  <b-button variant="primary" class="active mt-3" to="/pages/register">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Login',
  computed: mapState('authentication', [
    'loginEmail',
    'loginPassword',
    'loginError',
  ]),
  methods: {
    ...mapMutations('authentication', [
      'setLoginEmail',
      'setLoginPassword',
    ]),
    ...mapActions('authentication', [
      'login',
    ]),
  },
}
</script>

