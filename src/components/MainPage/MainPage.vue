<template>
  <div class="all">
    <person class="space"></person>
    <quote></quote>
    <todo></todo>
    <weather></weather>
    <quicknav></quicknav>
  </div>
</template>
<script>
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
  }
};
</script>
<style>
.space {
  margin-bottom: 40%;
}
.all{
    margin-top: 8%;
}
</style>