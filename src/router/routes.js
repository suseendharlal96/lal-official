import AuthGuard from './authguard';
import Home from '../components/Home/Home.vue';
import Signup from '../components/User/Signup.vue';
import SignIn from '../components/User/SignIn.vue';
import SignHome from '../components/Home/SignHome.vue';

const Person = resolve => {
  require.ensure(['../components/Person/PersonHome.vue'], () => {
      resolve(require('../components/Person/PersonHome.vue'));
  });
};
const WeatherHome = resolve => {
  require.ensure(['../components/WeatherHome/WeatherHome.vue'], () => {
      resolve(require('../components/WeatherHome/WeatherHome.vue'));
  });
};
const Todo = resolve => {
  require.ensure(['../components/Todo/Todo.vue'], () => {
      resolve(require('../components/Todo/Todo.vue'));
  });
};
const MainPage = resolve => {
  require.ensure(['../components/MainPage/MainPage.vue'], () => {
      resolve(require('../components/MainPage/MainPage.vue'));
  });
};
const Quote = resolve => {
  require.ensure(['../components/Quotes/QuoteHome.vue'], () => {
      resolve(require('../components/Quotes/QuoteHome.vue'));
  });
};

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
    path: '/all',
    component: MainPage,
    beforeEnter: AuthGuard,
    children: [
      {
        path: 'person/update/:id',
        component: MainPage,
        name: 'allperson',
        beforeEnter: AuthGuard
      },
      {
        path: 'person/create',
        component: MainPage,
        name: 'createperson',
        beforeEnter: AuthGuard
      },
      {
        path: 'person/delete',
        component: MainPage,
        name: 'delete',
        beforeEnter: AuthGuard
      }
    ]
  },
  {
    path: '/person',
    component: Person,
    beforeEnter: AuthGuard,
    children: [
      {
        path: 'update/:id',
        component: Person,
        beforeEnter: AuthGuard,
        name: 'update'
      },
      {
        path: 'create',
        component: Person,
        beforeEnter: AuthGuard
      },
      {
        path: 'delete',
        component: Person,
        beforeEnter: AuthGuard
      }
    ]
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
  },
  {
    path: '*',
    redirect: '/success',
    beforeEnter: AuthGuard
  }
];
