<template>
  <v-container>
    <div v-if="weather == null">
      <div class="text-xs-center">
        <v-progress-circular
          :size="50"
          :width="4"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </div>
    <div v-if="weather !== null">
      <h2>{{ currentLocation | toUpperCase }}</h2>
      <img class="homepageLogo" :src="weather.current.condition.icon" />
      <Searchbar @searchValue="location" />
      <DayForecastTab />
      <Weathers />
    </div>
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
      currentLocation: "Chennai"
    };
  },
  methods: {
    location(location) {
      this.currentLocation = location;
    }
  },
  computed: {
    weather() {
      return this.$store.getters["getWeatherCache"];
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

