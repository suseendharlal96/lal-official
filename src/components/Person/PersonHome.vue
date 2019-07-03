<template>
  <div>
    <!-- from parent to child means ':' -->
    <!-- from child to parent means '@'(this component is parent) -->
    <person
      :personList="PersonList"
      @createperson="createPerson"
      @personDelete="deletePerson"
    ></person>
    <b-button
      @click="home"
      class="home-btn"
    >Back to Home</b-button>
  </div>
</template>

<script>
import axios from "axios";

import Person from "./PersonList";
export default {
  data() {
    return {
      PersonList: [
        // {
        //   name: "Mike",
        //   age: 12,
        //   email: "ada@gma",
        //   admin: true
        // },
        // {
        //   name: "John",
        //   age: 24,
        //   email: "ada@gma",
        //   admin: false
        // }
      ]
    };
  },
  methods: {
    deletePerson(index) {
      this.PersonList.splice(index, 1);
      this.$toaster.success("Successfully deleted");
      if (this.PersonList.length === 0) {
        // this.empty = true;
        // this.msg = "No data to display";
      }
    },
    createPerson(data) {
      console.log(data);
      const perData = {
        name: data.name,
        age: data.age,
        email: data.email,
        admin: data.admin
      };
      const index = this.PersonList.length - 1;
      // const persons = [...this.PersonList];
      this.PersonList.push(data);
      axios
        .post("https://personlist-8be9e.firebaseio.com/persons.json", perData)
        .then(this.$toaster.success("Successfully added"))
        .catch(err => console.log(err));

      //  this.PersonList.push(data);
    },
    home() {
      this.$router.push("/");
    }
  },
  created() {
    axios
      .get("https://personlist-8be9e.firebaseio.com/persons.json")
      .then(res =>
        Object.keys(res.data).map(key => {
          const id = key;
          console.log(id);
          const person = res.data[key];
          console.log(person);
          this.PersonList.push(person);
        })
      );
    // this.persons = { ...this.PersonList };
  },
  components: {
    person: Person
  }
};
</script>
<style>
.home-btn {
  color: yellow;
}
</style>