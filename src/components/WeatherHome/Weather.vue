<template>
  <div v-if="weatherCache != null">
    <v-flex xs12 sm12 md12 lg6 offset-lg3 offset-md1>
      <v-container class="areaInfo">
        <h4>Current Location: {{ weatherCache.location.name }}</h4>
        <h5>{{ weatherCache.location.region }}</h5>
        <h5>{{ weatherCache.location.country }}</h5>
      </v-container>

      <v-container class="currentCondition" v-if="isTabFlagCurrent">
        <img :src="weatherCache.current.condition.icon" />
        <h3>{{ weatherCache.current.feelslike_c }}°c</h3>
        <h3>{{ weatherCache.current.condition.text }}</h3>
      </v-container>

      <v-container v-if="!isTabFlagCurrent">
        <b-row name>
          <b-col v-for="day in weatherCache.forecast.forecastday" :key="day.id">
            <img :src="day.day.condition.icon" />
            <p>Avg Temp: {{ day.day.avgtemp_c }}°c</p>
            <p>{{ day.day.condition.text }}</p>
            <p>{{ day.date }}</p>
          </b-col>
        </b-row>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
// import {store} from '../../store/index'
import service from "../../service";
export default {  
  data() {
    return {
      currentLocation: "Chennai",
      weatherForecast: null
    };
  },
  created() {
    this.$store.commit("setTabFlag", true),
      this.$store.dispatch("searchLocation", this.currentLocation);
  },
  computed: {
    weatherCache() {
      return this.$store.getters["getWeatherCache"];
    },
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
