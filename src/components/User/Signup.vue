<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card id="signcard">
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      :rules="emailRules"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      v-model="password"
                      onselectstart="return false"
                      onpaste="return false;"
                      onCopy="return false"
                      onCut="return false"
                      onDrag="return false"
                      onDrop="return false"
                      :append-icon="show ? 'visibility' : 'visibility_off'"
                      :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      onselectstart="return false"
                      onpaste="return false;"
                      onCopy="return false"
                      onCut="return false"
                      onDrag="return false"
                      onDrop="return false"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn
                      :disabled="loading"
                      :loading="loading"
                      type="submit"
                      color="info"
                      @click="loader = 'loading'"
                      >Sign up
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </template></v-btn
                    >
                    <p>
                      <router-link to="/signin" v-html="text"></router-link>
                    </p>
                    <p>(OR)</p>
                    <v-btn @click="googleSignIn()">Continue with google</v-btn>
                    <v-btn color="info" @click="facebookLogin()"
                      >Continue with facebook</v-btn
                    >
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      valid: true,
      show: false,
      password: "",
      confirmPassword: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      },
      // text: "<a href='http://localhost:8080/#/signin'>Have an account?</a>",
      text:
        "<a href='https://person-vue.herokuapp.com/#/signin'>Have an account?</a>",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : true;
    },
    ...mapGetters(["user", "loading", "error"]) // bundles all getters from store
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$store.dispatch("authorizeUser", value.id);
        localStorage.setItem("user", value.id);
        this.$router.push("/success");
      }
    }
  },
  methods: {
    onSignup() {
      if (this.confirmPassword) {
        this.$store.dispatch("signUserUp", {
          email: this.email,
          password: this.password
        });
        localStorage.setItem("email", this.email);
      } else {
        this.$toaster.warning("Confirm your Password!");
      }
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
    googleSignIn() {
      const base_provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(base_provider)
        .then(result => {
          localStorage.setItem("email", result.user.displayName);
          // console.log(result);
        })
        .catch(err => console.log(err));
    },
    facebookLogin() {
      const fb_provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(fb_provider)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
  }
};
</script>
<style>
#form {
  position: relative;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
#signcard {
  border-radius: 18px;
  background-image: linear-gradient(
    to right bottom,
    rgba(2, 29, 32, 0.87),
    rgba(15, 181, 199, 0.87)
  );
}
a:link,
a:visited {
  color: brown;
  text-decoration: none;
}
a:hover {
  color: yellowgreen;
}
</style>
