<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h2>
                    Create a new Meetup
                </h2>
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
                            <v-btn raised
                            class="accent"
                            @click="onPickFile"
                            >
                            Upload Images
                            </v-btn>
                            <input
                            type="file"
                            style="display: none"
                            ref="fileInput"
                            accept="image/*"
                            @change="onFilePicked"
                            >
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl"
                                height="150"
                                alt="">
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
                            <h2>Choose a Date & Time </h2>
                        </v-flex>
                    </v-layout>
                    <v-layout row >
                        <v-flex xs12 offset-sm3 class="mb2">
                            <v-date-picker
                            color="green lighten-1"
                            header-color="accent"
                            v-model="date"
                            format="24hr">
                            </v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 offset-sm3>
                            <v-time-picker
                            color="green lighten-1"
                            header-color="accent"
                            v-model="time"
                            format="24hr">
                            </v-time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="accent"
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
      imageUrl: '',
      description: '',
      date: '',
      time: new Date(),
      image: null,
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
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime,
        // imageUrl: this.imageUrl,
      };
      this.$store.dispatch('createMeetup', meetupData);
      this.$router.push('/meetups');
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const { target } = event;
      const { files } = target;
      const filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return 'Please add a valid file!';
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      return true;
    },
  },
};
</script>
