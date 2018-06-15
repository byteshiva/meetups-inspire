<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large router to="meetups" class="accent">
                   Explore Meetups
                </v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large router to="meetup/new" class="accent">
                   Organize Meetups
                </v-btn>
            </v-flex>
        </v-layout>
       <v-layout  row wrap class="mt-2">
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                        v-for="meetup in meetups"
                        :src="meetup.imageUrl"
                        :key="meetup.id">
                        <div class="title">{{ meetup.title }}</div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="mb-2">
            <v-flex xs12 class="text-xs-center">
                <p>Join our awesome meetups!</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      meetups: [
        { imageUrl: 'https://www.opodo.de/blog/wp-content/uploads/sites/11/2014/10/New-York-an-einem-Tag-Reiseblog-7.jpg', id: '123', title: 'Meetup in New York' },
        { imageUrl: 'https://www.opodo.de/blog/wp-content/uploads/sites/11/2014/10/New-York-an-einem-Tag-Reiseblog-5.jpg', id: '124', title: 'Meetup in Paris' },
      ],
    };
  },
};
</script>

<style scoped>
 .title {
     position: absolute;
     bottom: 50px;
     text-align: center;
     background-color: rgba(0,0,0,0.5);
     color: white;
     font-size: 2em;
     padding: 20px;
 }
</style>
