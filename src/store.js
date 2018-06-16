import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://www.opodo.de/blog/wp-content/uploads/sites/11/2014/10/New-York-an-einem-Tag-Reiseblog-7.jpg',
        id: '1',
        title: 'Meetup in New York',
        date: '2018-06-17',
      },
      {
        imageUrl: 'https://www.opodo.de/blog/wp-content/uploads/sites/11/2014/10/New-York-an-einem-Tag-Reiseblog-5.jpg',
        id: '2',
        title: 'Meetup in Paris',
        date: '2018-07-19',
      },
    ],
    user: {
      id: '3',
      registeredMeetups: ['3'],
    },
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 3,
      };
      // Reach out to firbase and store it
      commit('createMeetup', meetup);
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
      console.log('loadedMeetup');
      return meetupId => state.loadedMeetups.find(meetup => meetup.id === meetupId);
    },
  },
});
