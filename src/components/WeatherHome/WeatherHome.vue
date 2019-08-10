<template>
  <v-container>
    <img
      class="homepageLogo"
      src="https://www.iosicongallery.com/icons/weather-2017-06-19/512.png"
    />
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
  name: "home",
  components: {
    Weathers,
    Searchbar,
    DayForecastTab
  },
  mounted() {}
};
</script>
<style>
.homepageLogo {
  /* padding-top: 1%; */
  width: 20%;
}
</style>

