<template>
  <v-container class="quicknav">
    <ul>
      <li>
        <i
          class="material-icons"
          v-b-tooltip.hover
          title="Persons"
          @click="navigate('person')"
          >person_pin</i
        >
      </li>
      <li>
        <i
          class="material-icons"
          v-b-tooltip.hover
          title="Quotes"
          @click="navigate('myquote')"
          >create</i
        >
      </li>
      <li>
        <i
          class="material-icons"
          v-b-tooltip.hover
          title="Todo"
          @click="navigate('todo')"
          >calendar_today</i
        >
      </li>
      <li>
        <i
          class="material-icons"
          v-b-tooltip.hover
          title="Weather"
          @click="navigate('weather')"
          >cloud_queue</i
        >
      </li>
    </ul>
  </v-container>
</template>
<script>
export default {
  methods: {
    navigate(section) {
      console.log(section);
      let elmt = document.getElementById(section);
      elmt.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }
  }
};
</script>
<style>
li {
  cursor: pointer;
  list-style: none;
  padding: 1px;
}
ul {
  background: linear-gradient(
    to right bottom,
    rgb(88, 197, 74),
    rgba(16, 187, 130, 0.801)
  );
  border-radius: 10px;
  width: 6%;
}
.quicknav {
  position: fixed;
  left: 92%;
  top: 42%;
}
</style>