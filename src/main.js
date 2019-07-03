// FROM VUE PACKAGE
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// LOCAL IMPORTS
import { routes } from './routes'

// export const eventBus = new Vue()
Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(Toaster, {timeout: 5000})
Vue.use(BootstrapVue)

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
