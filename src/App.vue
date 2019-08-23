<template>
  <v-app>
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
    //
  }),
};
</script>
