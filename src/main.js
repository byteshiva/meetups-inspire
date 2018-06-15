import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// Helpers
import colors from 'vuetify/es5/util/colors';
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

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

// .$mount('#app');

