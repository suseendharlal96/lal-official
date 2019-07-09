<template>
  <v-container>

    <app-quote
      v-for="(quote, index) in quotes"
      :key="index"
      @click.native="deleteQuote(index)"
    >{{ quote }}</app-quote>
  </v-container>
</template>

<script>
import Quote from "./Quote.vue";

export default {
  props: ["quotes"],
  components: {
    appQuote: Quote
  },
  methods: {
    deleteQuote(index) {
      this.$emit("quoteDeleted", index);
    }
  }
};
</script>

<style>
</style>