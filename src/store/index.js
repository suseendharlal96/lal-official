import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

import service from '../service';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    authorizeduser: null,
    email: null,
    loading: false,
    error: null,
    isTabFlagCurrent: null,
    locationSearch: null,
    weatherCache: null,
    createdPersonKey: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuthorizedUser(state, payload) {
      state.authorizeduser = payload;
    },
    setCreatedPersonKey(state, payload) {
      state.createdPersonKey = payload;
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
    setTabFlag: (state, payload) => (state.isTabFlagCurrent = payload),
    setlocationSearch: (state, payload) => (state.locationSearch = payload),
    setWeatherCache: (state, payload) => (state.weatherCache = payload)
  },
  actions: {
    // signUserUpEmail({ commit }, payload) {
    //   commit('clearError');
    //   commit('setLoading', true);
    //   firebase
    //     .auth()
    //     .sendSignInLinkToEmail(payload.email, payload.actionCode)
    //     .then(email => {
    //       commit('setLoading', false);
    //       window.localStorage.setItem('emailForSignIn', email);
    //       commit('setEmail', email);
    //     })
    //     .catch(error => {
    //       commit('setLoading', false);
    //       commit('setError', error);

    //       console.log(error);
    //     });
    // },

    // SIGNUP
    signUserUp({ commit }, payload) {
      commit('clearError');
      commit('setLoading', true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false);
          console.log(user);
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
      
      // SIGNIN
      signUserIn({ commit }, payload) {
        commit('clearError');
        commit('setLoading', true);
        firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          console.log(user);
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
    autoSignInEmail({ commit }, payload) {
      commit('setEmail', payload);
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid });
    },

    // CREATE NEW USER
    createPerson({ commit }, payload) {
      console.log(payload);
      const newPerson = {
        name: payload.name,
        age: payload.age,
        email: payload.email,
        admin: payload.admin
      };
      let key;
      let ext;
      firebase
        .database()
        .ref('persons')
        .push(newPerson)
        .then(data => {
          key = data.key;
          return data.key;
        })
        .then(key => {
          console.log(key);
          const imgname = payload.img.name;
          ext = imgname.slice(imgname.lastIndexOf('.'));
          return firebase
            .storage()
            .ref('persons/' + key + ext)
            .put(payload.img);
        })
        .catch(err => {
          console.log(err);
        })
        .then(fileData => {
          console.log(fileData);
          console.log(key);
          console.log(ext);

          return firebase
            .storage()
            .ref('persons/' + key + ext)
            .getDownloadURL();
        })
        .catch(err => {
          console.log(err);
        })
        .then(url => {
          console.log(url);
          let imgUrl = url;
          console.log(key);
          return firebase
            .database()
            .ref('persons')
            .child(key)
            .update({ imgUrl: imgUrl });
        })
        .catch(err => {
          console.log(err);
        });
    },

    // AUTHORIZE USER

    authorizeUser({ commit }, payload) {
      commit('setAuthorizedUser', payload);
    },

    // SEARCH LOCATION
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
    // email(state) {
    //   return state.email;
    // },
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
    },
    getAuthorizedUser(state) {
      return state.authorizeduser;
    }
  }
});
