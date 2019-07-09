import Home from '../components/Home/Home.vue';
import Person from '../components/Person/PersonHome.vue';
import Quote from '../components/Quotes/QuoteHome.vue';
import Todo from '../components/Todo/Todo.vue';
import Signup from '../components/User/Signup.vue';
import SignIn from '../components/User/SignIn.vue';
import SignHome from '../components/Home/SignHome.vue';
import AuthGuard from './authguard';

export const routes = [
  {
    path: '',
    component: Home
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
    component: Signup
  }
];
