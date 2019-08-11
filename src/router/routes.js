import Home from '../components/Home/Home.vue';
import Person from '../components/Person/PersonHome.vue';
import Quote from '../components/Quotes/QuoteHome.vue';
import Todo from '../components/Todo/Todo.vue';
import Signup from '../components/User/Signup.vue';
import SignIn from '../components/User/SignIn.vue';
import SignHome from '../components/Home/SignHome.vue';
import WeatherHome from '../components/WeatherHome/WeatherHome.vue';

import AuthGuard from './authguard';
import { store } from '../store/index';

let path = '';
let component;

if (store.getters.user !== null && store.getters.user !== undefined) {
  path = '/success';
  component = SignHome;
} else {
  path = '';
  component = Home;
}

export const routes = [
  {
    path: path,
    component: component
  },
  {
    path: '/quote',
    component: Quote,
    beforeEnter: AuthGuard
  },
  {
    path: '/person',
    component: Person,
    beforeEnter: AuthGuard
  },
  {
    path: '/todo',
    component: Todo,
    beforeEnter: AuthGuard
  },
  {
    path: '/weather',
    component: WeatherHome,
    beforeEnter: AuthGuard
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/success',
    component: SignHome,
    beforeEnter: AuthGuard
  },
  {
    path: '/logout',
    component: SignIn
  }
];
