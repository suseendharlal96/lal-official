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
              <form @submit.prevent="onSignIn">
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
                    <v-btn
                      :disabled="loading"
                      :loading="loading"
                      class="ani-btn"
                      type="submit"
                      color="info"
                      @click="loader = 'loading'"
                      >Sign in
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </template></v-btn
                    >
                    <!-- <v-btn color="info" @click="signupWithEmail()"
                      >Sign in with verification</v-btn
                    > -->
                    <p v-html="text"></p>
                    <p>(OR)</p>
                    <v-btn class="ani-btn" @click="googleSignIn()"
                      >Continue with google</v-btn
                    >
                    <v-btn class="ani-btn" color="info" @click="facebookLogin()"
                      >Continue with facebook</v-btn
                    >
                    <div id="phone-container"></div>
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
      password: "",
      valid: true,
      // actionCodeSettings: {
      //   // url: "https://person-vue.herokuapp.com/#/success",
      //   url:"http://localhost:8080/#/success",
      //   handleCodeInApp: true
      // },
      show: false,
      // text: "<a href='http://localhost:8080/#/signup'>New user?</a>",
      text: "<a href='https://person-vue.herokuapp.com/#/signup'>New user?</a>",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      },
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
    ...mapGetters({
      user: "user",
      error: "error",
      loading: "loading"
    })
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        console.log(value);
        this.$router.push("/success");
      }
    },
    // email(value) {
    //   if (value !== null && value !== undefined) {
    //     console.log(value);
    //     this.$router.push("/success");
    //   }
    // },
  },
  methods: {
    // signupWithEmail() {
    //   this.$toaster.success(
    //     "A confirmation mail has been sent your provided email-id"
    //   );
    //   this.$store.dispatch("signUserUpEmail", {
    //     email: this.email,
    //     actionCode: this.actionCodeSettings
    //   });
    // },
    onSignIn() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
    googleSignIn() {
      const base_provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(base_provider)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    },
    facebookLogin() {
      const fb_provider = new firebase.auth.FacebookAuthProvider();
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
/* #form {
  position: relative;
} */
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
  opacity: 0.8;
  background-image: linear-gradient(
    to right bottom,
    rgba(2, 29, 32, 0.87),
    rgba(15, 181, 199, 0.87)
  );
}
a:link,
a:visited {
  color: tomato;
  text-decoration: none;
  animation: moveFromLeft 0.5s ease-out;
}
a:hover {
  color: yellowgreen;
}
.ani-btn {
  animation: moveFromLeft 0.5s ease-out;
}
@keyframes moveFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }

  100% {
    opacity: 1;
    transform: translate(0px);
  }
}
</style>

