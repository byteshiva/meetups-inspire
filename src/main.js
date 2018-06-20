import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// Helpers
import * as firebase from 'firebase';
import colors from 'vuetify/es5/util/colors';
import DateFilter from '@/filters/date';
import AlertCmp from '@/components/shared/alert.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';


Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base, // #3F51B5
    // primary: colors.red.dark,
    // accent: colors.red.accent,
    // secondary: colors.grey.light,
    info: colors.blue.lighten2,
    warning: colors.amber.darken2,
    error: colors.red.accent2,
    success: colors.green.lighten2,
  },
});
Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDVjYQNA01NEaTWbxhcGHV5NHPP1yTTy7Y',
      authDomain: 'v1-meetups-inspire.firebaseapp.com',
      databaseURL: 'https://v1-meetups-inspire.firebaseio.com',
      projectId: 'v1-meetups-inspire',
      storageBucket: 'gs://v1-meetups-inspire.appspot.com',
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch('loadMeetups');
  },
});

// .$mount('#app');

