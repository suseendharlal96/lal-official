<template>
  <!-- <div class="row"> -->
  <v-container>

    <form>
      <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
        <label>Quote</label>
        <textarea
          class="form-control"
          rows="3"
          v-model="quote"
          placeholder="type a quote..."
        ></textarea>
      </div>
      <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
        <button
          class="btn btn-primary"
          @click.prevent="createNew"
        >Add Quote</button>
      </div>
    </form>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      quote: ""
    };
  },
  methods: {
    createNew() {
      this.$emit("quoteAdded", this.quote);
      this.quote = "";
    }
  }
};
</script>

<style>
</style>