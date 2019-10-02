<template>
  <v-container id="persons" fluid grid-list-md>
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
import firebase, { firestore } from "firebase";
import { store } from "../../store/index";
import Person from "./PersonList";

export default {
  data() {
    return {
      PersonList: [],
      loading: false,
      deleteId: null,
      id: "",
      image: null
    };
  },
  methods: {
    deletePerson(index) {
      console.log(index);
      this.PersonList.splice(index, 1);
      // axios
      //   .get("https://personlist-8be9e.firebaseio.com/persons.json")
      //   .then(res => {
      //     this.deleteId = Object.keys(res.data);
      //     // let myGreeting = setTimeout(function() {
      //     //   this.deleteId[0];
      //     // }, 3000);
      //     axios
      //       .delete("https://personlist-8be9e.firebaseio.com/persons", {
      //         params: { id: this.deleteId[1] }
      //       })
      //       .then(res => {
      //         console.log(res);
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });
      //     console.log(this.deleteId[0]);
      //     // console.log(myGreeting);
      //   });

      // console.log(this.deleteId);
      // // const tobedel = this.deleteId[index];
      // // axios.delete(
      // //   "https://personlist-8be9e.firebaseio.com/persons/" + tobedel
      // // );
      this.$toaster.success("Successfully deleted");
    },
    createPerson(data) {
      this.PersonList.push(data);
      const perData = {
        name: data.name,
        age: data.age,
        email: data.email,
        admin: data.admin,
        img: data.img
      };
      this.$store.dispatch("createPerson", perData);
    },
    updatePerson(data, index) {
      // console.log(data);
      this.PersonList[index].name = data.name;
      this.PersonList[index].age = data.age;
      this.PersonList[index].email = data.email;
      this.PersonList[index].admin = data.admin;
      this.PersonList[index].imgUrl = data.imgUrl;
      this.$toaster.success("Successfully updated");
    },
    resetPerson(data, index) {
      // console.log(index);
      this.PersonList[index].name = data.name;
      this.PersonList[index].age = data.age;
      this.PersonList[index].email = data.email;
      this.PersonList[index].admin = data.admin;
    },

    home() {
      this.$router.push("/success");
    }
  },
  created() {
    if (
      localStorage.getItem("user")
    ) {
      this.loading = true;
      axios
        .get("https://personlist-8be9e.firebaseio.com/persons.json")
        .then(res =>
          Object.keys(res.data).map(key => {
            this.id = key;
            // console.log(this.id);
            const person = res.data[key];
            // console.log(person);
            if (res.data !== undefined || null) {
              this.PersonList.push(person);
            }
            this.loading = false;
          })
        )
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    } else {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/logout");
      });
    }
  },
  components: {
    person: Person
  }
};
</script>
<style>
#persons {
  position: relative;
  bottom: 7.5%;
}
.home-btn {
  color: yellow;
}
</style>