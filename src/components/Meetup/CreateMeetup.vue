<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h4>
                    Create a new Meetup
                </h4>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required
                                >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="location"
                                required
                                >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="imageUrl"
                                label="Image  URL"
                                id="image-url"
                                v-model="imageUrl"
                                required
                                >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150" alt="">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="description"
                                label="Descrition"
                                id="description"
                                required
                                v-model="description"
                                multi-line
                                rows=6
                                >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 offset-sm3>
                            <h4>Choose a Date & Time </h4>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 offset-sm3 class="mb2">
                            <v-date-picker v-model="date" format="24hr">
                            </v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 offset-sm3>
                            <v-time-picker v-model="time"  format="24hr">
                            </v-time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="primary"
                                :disabled="!formIsValid"
                                type="submit"
                                >
                                Create Meetup
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: 'http://angelomincuzzi.blog.ilsole24ore.com/wp-content/uploads/sites/109/2016/06/74639365_DDD1MM_aerial_view_of_the_City_of_London_Gherkin_Cheese_Grater_and_NatWest_Tower_plus_t-xlarge_transZgEkZX3M936N5BQK4Va8RWtT0gK_6EfZT336f62E.jpg',
      description: '',
      date: '',
      time: new Date(),
    };
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== '';
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    },
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDateTime,
      };
      this.$store.dispatch('createMeetup', meetupData);
      this.$router.push('/meetups');
    },
  },
};
</script>
