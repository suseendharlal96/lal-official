<template>
  <v-container>
    <div v-if="weather === null || undefined">
      <div class="text-xs-center">
        <!-- <img
          src="https://loading.io/spinners/gear-set/lg.triple-gears-loading-icon.gif"
          style="width: 20%;height: 20%;"
        /> -->
        <v-progress-circular
          :size="50"
          :width="4"
          indeterminate
          color="red"
        ></v-progress-circular>
      </div>
    </div>
    <div id="weather" v-if="weather !== null || undefined">
      <h2 style="color:red" v-if="weather.location.name !== undefined">
        {{ weather.location.name | toUpperCase }}
      </h2>
      <img class="homepageLogo" :src="weather.current.condition.icon" />
      <v-btn color="info" @click="getLocation()">
        <v-icon left dark>home</v-icon>Get my location</v-btn
      >
      <Searchbar />
      <DayForecastTab />
      <Weathers :weatherCache="weather" />
      <div id="googlemap" style="width:400px;height:400px"></div>
      <pre id="info"></pre>
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
import axios from "axios";
import mapboxgl from "mapbox-gl";

import Weathers from "./Weather";
import Searchbar from "./Searchbar";
import DayForecastTab from "./DayForecastTab";

export default {
  data() {
    return {
      lat: "",
      long: "",
      weatherDetails: ""
    };
  },
  methods: {
    home() {
      this.$router.push("/success");
    },
    getLocation() {
      // console.log(123);
      axios
        .get(
          "https://geo.ipify.org/api/v1?apiKey=at_pftjsvw5tqwPlnvgHrQ1w1AGRg86N"
        )
        .then(res => {
          // console.log(res);
          this.lat = res.data.ip;
          // console.log(this.lat);
        });
      this.showPosition();
    },
    showPosition() {
      this.$store.dispatch("searchLocation", this.lat);
    }
  },
  computed: {
    weather() {
      return this.$store.getters["getWeatherCache"];
     
    },
    // error() {
    //   return this.$store.getters.error;
    // }
  },
  watch: {
    $route() {
      // mapboxgl.accessToken =
      //   "pk.eyJ1Ijoic3VzZWVuZGhhci1sYWwiLCJhIjoiY2sxOTV5a2d5MGZtazNvdGNvazUwN3hycCJ9.7u_HHAT58zhZpB7nHphgjA";
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic3VzZWVuZGhhci1sYWwiLCJhIjoiY2sxOTNiNjRoMDA0eTNkbGs0cmN2OWV6aCJ9.GSKBaPrnxgGq1TyBCaK_6A";
      const googlemap = new mapboxgl.Map({
        container: "googlemap",
        center: [-74.5, 40],
        zoom: 4,
        style: "mapbox://styles/mapbox/streets-v11"
      });
      googlemap.on("mousemove", function(e) {
        document.getElementById("info").innerHTML =
          // e.point is the x, y coordinates of the mousemove event relative
          // to the top-left corner of the map
          JSON.stringify(e.point) +
          "<br />" +
          // e.lngLat is the longitude, latitude geographical position of the event
          JSON.stringify(e.lngLat.wrap());
      });
      new mapboxgl.Marker()
        .setLngLat([-0.1404545, 51.5220163])
        .addTo(googlemap);
    }
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.$store.dispatch("searchLocation", "chennai");
    } else {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/logout");
      });
    }
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
#info {
  display: block;
  position: relative;
  margin: 0px auto;
  width: 50%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  color: #222;
  background: #fff;
}
</style>

