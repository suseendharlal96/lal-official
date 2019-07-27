<template>
  <v-container fluid grid-list-md>
    <!-- from parent to child means ':' -->
    <!-- from child to parent means '@'(this component is parent) -->
    <person
      :personList="PersonList"
      :loading="loading"
      @createperson="createPerson"
      @personDelete="deletePerson"
      @updatePerson="updatePerson"
      @reset="resetPerson"
    ></person>
    <v-container>
      <b-button @click="home" class="home-btn">Back to Home</b-button>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

import Person from "./PersonList";
export default {
  data() {
    return {
      PersonList: [],
      loading: false
    };
  },
  methods: {
    deletePerson(index) {
      this.PersonList.splice(index, 1);
      this.$toaster.success("Successfully deleted");
      if (this.PersonList.length === 0) {
      }
    },
    createPerson(data) {
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
        .then(this.$toaster.success("Successfully created"))
        .catch(err => console.log(err));

      //  this.PersonList.push(data);
    },
    updatePerson(data, index) {
      this.PersonList[index].name = data.name;
      this.PersonList[index].age = data.age;
      this.PersonList[index].email = data.email;
      this.PersonList[index].admin = data.admin;
    },
    resetPerson(data, index) {
      console.log(index);
      this.PersonList[index].name = data.name;
      this.PersonList[index].age = data.age;
      this.PersonList[index].email = data.email;
      this.PersonList[index].admin = data.admin;
    },

    home() {
      this.$router.push("/");
    }
  },
  created() {
    this.loading = true;
    axios
      .get("https://personlist-8be9e.firebaseio.com/persons.json")
      .then(res =>
        Object.keys(res.data).map(key => {
          const id = key;
          console.log(id);
          const person = res.data[key];
          console.log(person);
          this.PersonList.push(person);
          this.loading = false;
        })
      )
      .catch(err => {
        this.loading = true;
        console.log(err);
      });
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