<template>
  <div>
    <v-container class="displaytab">
      <v-flex xs12 sm12 md12 lg6 offset-lg3 offset-md1>
        <v-tabs fixed-tabs slider-color="blue">
          <v-tab @click.prevent="setTabCurrent(true)">Current</v-tab>
          <v-tab @click.prevent="setTabCurrent(false)">7 Day Forecast</v-tab>
        </v-tabs>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
// import store from '@/store.js'
export default {
  name: "DayForecastTab",
  data() {
    return {};
  },
  methods: {
    setTabCurrent: function(payload) {
      this.$store.commit("setTabFlag", payload);
    }
  }
};
</script>


<style >
.displaytab {
  margin-top: -50px;
}
</style>