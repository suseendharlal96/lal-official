import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import axios from 'axios';
import * as toaster from 'v-toaster';

import service from '../service';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // loadedMeetups: [
    //   {
    //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
    //     id: 'afajfjadfaadfa323',
    //     title: 'Meetup in New York',
    //     date: new Date(),
    //     location: 'New York',
    //     description: 'New York, New York!'
    //   },
    //   {
    //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
    //     id: 'aadsfhbkhlk1241',
    //     title: 'Meetup in Paris',
    //     date: new Date(),
    //     location: 'Paris',
    //     description: 'It\'s Paris!'
    //   }
    // ],
    personList: [{}],
    user: null,
    loading: false,
    error: null,
    isTabFlagCurrent: null,
    locationSearch: null,
    weatherCache: null
  },
  mutations: {
    // createMeetup (state, payload) {
    //   state.loadedMeetups.push(payload)
    // },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setPersons(state, payload) {
      // state.personList.age = payload.age;
      // state.personList.name = payload.name;
      // state.personList.email = payload.email;
      // state.personList.admin = payload.admin;
      state.personList.push(payload);
    },
    setTabFlag: (state, payload) => (state.isTabFlagCurrent = payload),
    setlocationSearch: (state, payload) => (state.locationSearch = payload),
    setWeatherCache: (state, payload) => (state.weatherCache = payload)
  },
  actions: {
    signUserUpEmail({ commit }, payload) {
      commit('clearError');
      commit('setLoading', true);
      firebase
        .auth()
        .sendSignInLinkToEmail(payload.email, payload.actionCode)
        .then(user => {
          commit('setLoading', false);
          window.localStorage.setItem('emailForSignIn', email);
          // commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);

          console.log(error);
        });
    },
    signUserUp({ commit }, payload) {
      commit('clearError');
      commit('setLoading', true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid
          };
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);

          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit('clearError');
      commit('setLoading', true);

      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid
          };
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    clearError({ commit }) {
      commit('clearError');
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', payload);
    },
    autoSignInEmail({ commit }, payload) {
      commit('setUser', { id: payload.uid });
    },
    createPerson({ commit }, payload) {
      console.log(payload);
      commit('setPersons', {
        // name: payload.name,
        // age: payload.age,
        // email: payload.email,
        // admin: payload.admin
        payload
      });
      axios
        .post('https://personlist-8be9e.firebaseio.com/persons.json', payload)
        .then(toaster.success('Successfully created'))
        .catch(commit('setError', error));
    },
    searchLocation({ commit }, payload) {
      commit('setLoading', true);
      service
        .getWeather(payload + '&days=7')
        .then(res => {
          commit('setLoading', false);
          commit('setWeatherCache', res);
          console.log(res);
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err);
          console.log(err.message);
        });

      // console.log(wF);
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    persons(state) {
      return state.personList;
    },
    getTabFlag(state) {
      return state.isTabFlagCurrent;
    },
    getlocationSearch(state) {
      return state.locationSearch;
    },
    getWeatherCache(state) {
      return state.weatherCache;
    }
  }
});
