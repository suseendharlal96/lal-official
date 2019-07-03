<template>
  <div class="container">
    <app-header></app-header>
    <!-- For the components you have assigned routes will get rendered here -->
    <!-- here the routes are assigned for home, person & quote component -->
    <router-view></router-view>
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


