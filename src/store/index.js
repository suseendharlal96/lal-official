import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

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
    user: null,
    loading: false,
    error: null
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
    }
  },
  actions: {
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
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
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
    }
  }
});
