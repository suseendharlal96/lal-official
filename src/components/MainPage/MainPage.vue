<template>
  <div class="all">
    <div class="header">
      <div class="progress-container">
        <div class="progress-bar" id="myBar"></div>
      </div>
    </div>
    <person class="space"></person>
    <quote></quote>
    <todo></todo>
    <weather></weather>
    <quicknav></quicknav>
  </div>
</template>
<script>
import Vue from "vue";

import Person from "../Person/PersonHome";
import Quote from "../Quotes/QuoteHome";
import Todo from "../Todo/Todo";
import Weather from "../WeatherHome/WeatherHome";
import QuickNav from "../QuickNav/QuickNav";

export default {
  components: {
    person: Person,
    quote: Quote,
    todo: Todo,
    weather: Weather,
    quicknav: QuickNav
  },
  methods: {
    myFunction() {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById("myBar").style.width = scrolled + "%";
    }
  },
  mounted() {
    Vue.prototype.scroll = window.onscroll(this.myFunction);
  }
};
</script>
<style>
.space {
  margin-bottom: 40%;
}
.all {
  margin-top: 8%;
}
.progress-container {
  width: 100%;
  height: 8px;
  background: #ccc;
}

.progress-bar {
  height: 8px;
  background: linear-gradient(
    to right,
    rgb(244, 248, 7),
    rgba(236, 31, 4, 0.801)
  );
  width: 0%;
}
.header {
  position: fixed;
  top: 7%;
  z-index: 1;
  width: 100%;
  background-color: #f1f1f1;
}
</style>