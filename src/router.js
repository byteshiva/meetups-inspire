import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import About from '@/views/About.vue';
import Meetups from '@/components/Meetup/Meetups.vue';
import Meetup from '@/components/Meetup/Meetup.vue';
import CreateMeetup from '@/components/Meetup/CreateMeetup.vue';
import Profile from '@/components/User/Profile.vue';
import Signin from '@/components/User/Signin.vue';
import Signup from '@/components/User/Signup.vue';

const ghbasename = 'meetups-inspire';
const testname = 'test';

function getBaseURL(gdenv) {
  let baseURL;
  if (gdenv === 'prod') {
    baseURL = ghbasename;
  } else if (gdenv === 'dev') {
    baseURL = __dirname;
  } else {
    baseURL = testname;
  }
  return baseURL;
}

Vue.use(Router);

export default new Router({
  base: getBaseURL('prod'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups,
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
  ],
  mode: 'history',
});
