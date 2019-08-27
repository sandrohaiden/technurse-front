<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="6000"
      top
      >
      {{ msg }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <tech-header></tech-header>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import TechHeader from './components/Header';
export default {
  components: {
    TechHeader,
  },
  name: 'App',
  data: () => ({
    msg: '',
    color: 'success',
    snackbar: false,
  }),

  methods: {
    altSnackbar(data) {
      if (data.msg) {
        this.msg = data.msg;
      }
      if (data.color) {
        this.color = data.color;
      }
      this.snackbar = true;
    },
  },
  created() {
    this.$bus.$on('alt-snackbar', (data) => {
      this.altSnackbar(data);
    });
  },
};
</script>
