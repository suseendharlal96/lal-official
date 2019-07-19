<template>
  <v-container>
    <h2>
      You've currently selected
      <h2 class="re">{{ buttonname }}</h2>
    </h2>
    <ol v-if="Todos.length > 0">
      <li v-for="(todo, index) in Todos" :key="index">
        <b>Task Name:</b><b class="re">{{ todo | to-upperCase }}</b>

        <b-button variant="outline-danger" @click="del(index)">Delete</b-button>
      </li>
    </ol>
    <ol v-else>
      <li id="tableEmpty" style="font-size: xx-large">Completed Tasks</li>
    </ol>
  </v-container>
</template>
<script>
export default {
  props: ["Todos", "buttonname", "upper"],
  data() {
    return {};
  },
  methods: {
    del(index) {
      this.$emit("del", index);
    }
  },
  filters: {
    "to-upperCase"(value) {
      // Or toUpperCase(value) -> Alternative
      return value.toUpperCase();
    }
  }
};
</script>

