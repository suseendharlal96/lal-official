<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <h2>{{ weather.location.name | toUpperCase }}</h2>
    <img class="homepageLogo" :src="weather.current.condition.icon" />
    <Searchbar />
    <DayForecastTab />
    <Weathers />
  </v-container>
</template>

<script>
import Weathers from "./Weather";
import Searchbar from "./Searchbar";
import DayForecastTab from "./DayForecastTab";

export default {
  data() {
    return {
      name: "home",
    };
  },
  computed: {
    weather() {
      return this.$store.getters["getWeatherCache"];
    },
    error() {
      return this.$store.getters.error;
    }
  },
  created() {
    this.$store.dispatch("searchLocation", "Chennai");
  },
  filters: {
    toUpperCase(value) {
      // Or toUpperCase(value) -> Alternative
      return value.toUpperCase();
    }
  },
  components: {
    Weathers,
    Searchbar,
    DayForecastTab
  }
};
</script>
<style>
.homepageLogo {
  /* padding-top: 1%; */
  width: 20%;
}
</style>

