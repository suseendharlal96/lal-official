<template>
  <div v-if="weatherCache != null">
    <v-container class="areaInfo">
      <h4 style="color:red">
        Current Location:
        <span>
          <h4 style="color:brown">{{ weatherCache.location.name }}</h4>
        </span>
      </h4>
      <h5 style="color:red">
        Region:
        <span>
          <h5 style="color:beige">{{ weatherCache.location.region }}</h5></span
        >
      </h5>
      <h5 style="color:red">
        Country:
        <span>
          <h5 style="color:beige">{{ weatherCache.location.country }}</h5></span
        >
      </h5>
    </v-container>

    <v-container class="currentCondition" v-if="isTabFlagCurrent">
      <img :src="weatherCache.current.condition.icon" />
      <h3 style="color:brown">{{ weatherCache.current.temp_c }}°c</h3>
      <!-- <span style="color:blue"
        >(Last updated: {{ weatherCache.current.last_updated }})</span
      > -->
      <h3 style="color:brown">{{ weatherCache.current.condition.text }}</h3>
       <!-- <iframe
        width="500"
        height="345"
        src="https://www.youtube.com/embed/8ZjpI6fgYSY"
      >
      </iframe> -->
    </v-container>

    <v-container v-if="!isTabFlagCurrent">
      <b-row name>
        <b-col v-for="weather in weatherCache.forecast.forecastday" :key="weather.id">
          <img :src="weather.day.condition.icon" />
          <p style="color:gold">Avg Temp: {{ weather.day.avgtemp_c }}°c</p>
          <p style="color:white">{{ weather.day.condition.text }}</p>
          <p style="color:gold">{{ weather.date }}</p>
        </b-col>
      </b-row>
    </v-container>
  </div>
</template>

<script>
// import {store} from '../../store/index'
import service from "../../service";
export default {
  props: ["weatherCache"],
  data() {
    return {
      // currentLocation: "Chennai",
      weatherForecast: null,
      loading: false
    };
  },
  created() {
    this.$store.commit("setTabFlag", true);
  },
  computed: {
    isTabFlagCurrent() {
      return this.$store.getters["getTabFlag"];
    }
  }
};
</script>

<style>
.currentWeatherIcon {
  width: 10%;
  height: 10%;
}
</style>
