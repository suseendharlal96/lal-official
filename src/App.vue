<template>
  <div class="container">
    <app-header></app-header>
    <!-- For the components you have assigned routes will get rendered here -->
    <!-- here the routes are assigned for home, person & quote component -->
    <div id="contents">

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  components: {
    "app-header": Header
  }
};
</script>
<style>
body {
  height: 100%;
  width: 100%;
  background-color: bisque;
}
#contents {
  position: absolute;
  height: auto;
  top: 14%;
}
</style>


