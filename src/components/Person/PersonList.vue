<template>
  <v-container id="person">
    <div v-if="loading">
      <div class="text-xs-center">
        <person-loader></person-loader>
        <!-- <v-progress-circular
          :size="50"
          :width="4"
          indeterminate
          color="red"
        ></v-progress-circular>
      </div> -->
        <!-- <img
          src="https://loading.io/spinners/gear-set/lg.triple-gears-loading-icon.gif"
          style="width: 20%;height: 20%;"
        /> -->
      </div>
    </div>
    <div v-if="!loading">
      <v-text-field
        v-model="filterPerson"
        class="search"
        placeholder="Search..."
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>
      <span>
        <v-text-field
          type="number"
          v-model.number="delData"
          placeholder="enter age to del"
          @keyup.enter="deletePersonById(delData)"
        ></v-text-field>
        <b-button variant="danger" @click="deletePersonById(delData)"
          >Del</b-button
        >
      </span>
      <h2>Person Table</h2>
      <table class="w3-table-all w3-hoverable w3-centered fixedheader">
        <thead>
          <tr class="w3-red">
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <!-- <th>Dob</th> -->
            <th>Email</th>
            <th>Admin</th>
            <th>Contact Pic</th>
            <!-- <th>Action</th> -->
          </tr>
        </thead>

        <tbody
          v-if="
            personList.length &&
              filteredPersons.length > 0 &&
              personList !== undefined &&
              personList !== null
          "
        >
          <tr
            v-for="(person, index) in filteredPersons"
            :key="index"
            class="w3-hover-yellow hover"
            @click="dispOnForm(index)"
          >
            <td>{{ index + 1 }}.</td>
            <td>{{ person.name | toUpperCase }}</td>
            <td>{{ person.age }}</td>
            <td>{{ person.email }}</td>
            <td>{{ person.admin }}</td>
            <td>
              <img :src="person.imgUrl" height="50" />
            </td>
            <!-- <td>
              <b-button
                variant="outline-danger"
                id="del"
                @click="deletePerson(index)"
                >Del</b-button
              >
            </td> -->
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">
              No data to display.
            </td>
          </tr>
        </tbody>
        <b-button variant="primary" @click="createPerson()">Create</b-button>
      </table>
      <div>
        <person-form
          v-show="isFormVisible"
          :rowData="rowData"
          @clear="closeModal"
          @added="addPerson"
          @update="updatePerson"
          @cancel="cancel"
        ></person-form>
        <modal v-show="openModal" :msg="msg" @confirm="confirmDel"></modal>
      </div>
    </div>
  </v-container>
</template>

<script>
import { eventBus } from "../../main";
import Form from "./PersonForm";
import { PersonMixin } from "./PersonMixin.js";
import Modal from "../Modal/Modal";
import PersonLoader from "../loader/person-loader";
export default {
  props: ["personList", "loading"],
  mixins: [PersonMixin],
  data() {
    return {
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_großen_Triumphbogen.jpg",
      delData: "",
      rowData: "",
      msg: "delete",
      authorized: "",
      val: "",
      index: "",
      byUrl: false,
      delIndex: "",
      isFormVisible: false,
      openModal: false,
      formData: {
        name: "",
        age: "",
        email: "",
        admin: ""
      }
    };
  },
  methods: {
    deletePerson(index) {
      // console.log(index);
      this.authorized = this.$store.getters["getAuthorizedUser"];
      if (this.authorized.id === "keDYEODC78TpkTM8NWFyElC0sR32") {
        this.dispOnForm(index);
        this.$emit("personDelete", index);
        this.createPerson();
      } else {
        this.$toaster.error("You are not authorized to make changes");
      }
      this.isFormVisible = false;
    },
    deletePersonById(age) {
      // console.log(typeof age);
      // console.log(age.to);
      this.authorized = this.$store.getters["getAuthorizedUser"];
      if (this.authorized === null) {
        this.authorized = localStorage.getItem("user");
      }
      if (
        this.authorized === "keDYEODC78TpkTM8NWFyElC0sR32" ||
        this.authorized === "TWqhG3hdMcVRy9NWj2VFBPQk9p22"
      ) {
        if (age.toString().length > 0) {
          let p = this.personList.findIndex(person => person.age === age);
          // console.log(p);
          if (p !== -1) {
            if (this.$route.path === "/all") {
              this.$router.push({
                name: "delete"
              });
            } else {
              this.$router.push({ path: "delete", append: true });
            }
            this.delIndex = p;
            this.openModal = true;
          } else {
            this.$toaster.error("person doesn't exist");
          }
        } else {
          this.$toaster.warning("unable to delete");
        }
      } else {
        this.$toaster.error("You are not authorized to make changes!");
      }
    },
    confirmDel(val) {
      if (val) {
        this.$emit("personDelete", this.delIndex);
      }
      this.delData = "";
      this.$router.back();
      this.openModal = false;
    },
    createPerson() {
      this.rowData = {
        name: "",
        age: "",
        email: "",
        admin: "",
        imageUrl: "",
        toCreate: true
      };
      this.isFormVisible = true;
      if (this.$route.path === "/all") {
        this.$router.push({
          name: "createperson"
        });
      } else {
        this.$router.push({ path: "create", append: true });
      }
    },
    addPerson(list) {
      // console.log(list);
      this.$emit("createperson", list);
      this.isFormVisible = false;
    },
    updatePerson(updatedList, index) {
      // console.log(updatedList);
      this.$emit("updatePerson", updatedList, index);
    },
    cancel(value, index) {
      this.$emit("reset", value, index);
    },
    dispOnForm(i) {
      // console.log(this.$route.path);

      if (this.$route.path === "/all") {
        this.$router.push({
          name: "allperson",
          params: { id: i + 1 }
        });
      } else {
        this.$router.push({ name: "update", params: { id: i + 1 } });
      }
      this.rowData = {
        name: this.personList[i].name,
        age: this.personList[i].age,
        email: this.personList[i].email,
        admin: this.personList[i].admin,
        imgUrl: this.personList[i].imgUrl,
        toCreate: false,
        index: i
      };
      this.isFormVisible = true;
    },
    closeModal() {
      this.isFormVisible = false;
      this.$router.back();
    }
  },
  mounted() {
    this.rowData = {
      name: "",
      age: "",
      email: "",
      admin: "",
      toCreate: true
    };
  },
  // watch: {
  //   $route(to, from) {
  //     console.log(12);
  //     console.log(this.$route.params);
  //     const id = this.$route.params.id - 1;
  //     console.log(id);
  //     // this.dispOnForm(id);
  //     this.rowData = {
  //       name: this.personList[id].name,
  //       age: this.personList[id].age,
  //       email: this.personList[id].email,
  //       admin: this.personList[id].admin,
  //       imgUrl: this.personList[id].imgUrl,
  //       toCreate: false,
  //       index: id
  //     };
  //     this.isFormVisible = true;
  //   }
  // },
  filters: {
    toUpperCase(value) {
      // Or toUpperCase(value) -> Alternative
      return value.toUpperCase();
    }
  },
  components: {
    "person-form": Form,
    modal: Modal,
    "person-loader": PersonLoader
  }
};
</script>
<style>
td {
  animation: moveFromLeft 0.5s ease-out;
}
@keyframes moveFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  80% {
    transform: translateX(20px);
  }

  100% {
    opacity: 1;
    transform: translate(0px);
  }
}
.search {
  border: "2px solid red";
}
.hover {
  cursor: pointer;
}
#del {
  cursor: grab;
}
</style>

              // created() {
              //   eventBus.$on("added", list => {
              //     console.log("dfsdaf");
              //     console.log(list);
              //     this.formData.name = list.name;
              //     this.formData.age = list.age;
              //     this.formData.admin = list.admin;
              //     this.sendData();
              //     eventBus.$emit("addedData", this.formData);
              //   });
              // },