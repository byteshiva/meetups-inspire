import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://www.opodo.de/blog/wp-content/uploads/sites/11/2014/10/New-York-an-einem-Tag-Reiseblog-7.jpg',
        id: 'asdas123412asdasd12312',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'New York, New York!',
      },
      {
        imageUrl: 'https://www.opodo.de/blog/wp-content/uploads/sites/11/2014/10/New-York-an-einem-Tag-Reiseblog-5.jpg',
        id: 'asldajsldk123123asdads2',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!',
      },
    ],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      // state.loadedMeetups = payload;
      state.loadedMeetups = payload;
      // state = {}, payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup(state, payload) {
      const meetupInst = state.loadedMeetups.find(meetup => meetup.id === payload.id);
      if (payload.title) {
        meetupInst.title = payload.title;
      }
      if (payload.description) {
        meetupInst.description = payload.description;
      }
      if (payload.date) {
        meetupInst.date = payload.date;
      }
    },
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
  },
  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          // Object.entries(obj).forEach(([key]) => {
          for (const key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              createId: obj[key].createId,
            });
          }
          commit('setLoadedMeetups', meetups);
          commit('setLoading', false);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        createId: getters.user.id,
      };
      let imageUrl;
      let key;
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key;
          return key;
        })
        .then((key) => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase.storage().ref(`/meetups/${key}${ext}`).put(payload.image);
        })
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((downloadURL) => {
          imageUrl = downloadURL;
          return firebase.database().ref('meetups').child(key).update({ imageUrl: downloadURL });
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl,
            id: key,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      // Reach out to firbase and store it
    },
    updateMeetupData({ commit }, payload) {
      commit('setLoading', true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false);
          commit('updateMeetup', payload);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      ).then((user) => {
        commit('setLoading', false);
        const newUser = {
          id: user.uid,
          registeredMeetups: [],
        };
        commit('setUser', newUser);
      }).catch((error) => {
        commit('setLoading', true);
        commit('setError', error);
        console.log(error);
      });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(
        payload.email,
        payload.password,
      ).then((user) => {
        commit('setLoading', false);
        const newUser = {
          id: user.uid,
          registeredMeetups: [],
        };
        commit('setUser', newUser);
      }).catch((error) => {
        commit('setLoading', true);
        commit('setError', error);
        console.log(error);
      });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [] });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => meetupA.date > meetupB.date);
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupId => state.loadedMeetups.find(meetup => meetup.id === meetupId);
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
});
