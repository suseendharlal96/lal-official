// FROM VUE PACKAGE
import Vue from 'vue';
import * as firebase from 'firebase';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';
import 'vuetify/dist/vuetify.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// LOCAL IMPORTS
import { routes } from './router/routes';
import { store } from './store';
import Alert from './components/Shared/Alert.vue';

// export const eventBus = new Vue()
Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(Toaster, { timeout: 5000 });
Vue.use(BootstrapVue);

Vue.component('app-alert', Alert);

const router = new VueRouter({
  routes,
  mode: 'history' // to load route without hash(#) (default: hash)
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAVIhLjXZlxUOL7YwZCPt_Z8qakMODA8-A',
      authDomain: 'personlist-8be9e.firebaseapp.com',
      databaseURL: 'https://personlist-8be9e.firebaseio.com',
      projectId: 'personlist-8be9e',
      storageBucket: 'gs://personlist-8be9e.appspot.com',
      messagingSenderId: '146959222232',
      appId: '1:146959222232:web:1905680734b9ec51'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
  }
});
//   if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
//     var email = window.localStorage.getItem('emailForSignIn');
//     if (!email) {
//       email = window.prompt('Please provide your email for confirmation');
//     } else {
//       this.$store.dispatch('autoSignInEmail', email);
//     }
//   }
//   firebase
//     .auth()
//     .signInWithEmailLink(email, window.location.href)
//     .then(function(result) {
//       // Clear email from storage.
//       window.localStorage.removeItem('emailForSignIn');
//       // You can access the new user via result.user
//       // Additional user info profile not available via:
//       // result.additionalUserInfo.profile == null
//       // You can check if the user is new or existing:
//       // result.additionalUserInfo.isNewUser
//       this.$store.dispatch('autoSignIn', result.user);
//     })
//     .catch(function(error) {
//       // Some error occurred, you can inspect the code: error.code
//       // Common errors could be invalid email and invalid or expired OTPs.
//     });
