<template>
  <v-container>
    <div v-if="weather === null || undefined">
      <div class="text-xs-center">
        <v-progress-circular
          :size="50"
          :width="4"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </div>
    <div v-if="weather !== null || undefined">
      <h2 style="color:red">{{ weather.location.name | toUpperCase }}</h2>
      <img class="homepageLogo" :src="weather.current.condition.icon" />
      <v-btn color="info" @click="getLocation()">
        <v-icon left dark>home</v-icon>Get my location</v-btn>
      <Searchbar />
      <DayForecastTab />
      <Weathers :weatherCache="weather" />
      <!-- YOUTUBE -->
      <!-- <iframe
        width="420"
        height="345"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
      >
      </iframe> -->
      <b-button @click="home" class="home-btn">Back to Home</b-button>
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
      name: "home"
    };
  },
  methods: {
    home() {
      this.$router.push("/success");
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        this.$toaster.error("Geolocation is not supported by this browser.");
      }
    },
    showPosition(position) {
      this.$store.dispatch("searchLocation", position.coords.latitude + "," + position.coords.longitude);
    }
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

