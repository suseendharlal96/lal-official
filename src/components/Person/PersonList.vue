<template>
  <v-container>
    <div v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular
          :size="50"
          :width="4"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </div>
    <div
      v-if="!loading"
      class="row"
    >
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">

        <v-text-field
          v-model="filterPerson"
          class="search"
          placeholder="Search..."
          prepend-inner-icon="search"
          solo-inverted
        ></v-text-field>
        <p>Showing all names</p>
        <ul>
          <li
            v-for="(person, index) in filteredPersons"
            :key="index"
          >{{ person.name }}</li>
        </ul><span>
          <v-text-field
            type="number"
            v-model.number="delData"
            placeholder="enter age to del"
          ></v-text-field>
          <b-button
            variant="danger"
            @click="deletePersonById(delData)"
          >Del</b-button>
        </span>
        <!-- <v-containe></v-containe> -->
        <div class="w3-container">
          <h2>Person Table</h2>

          <table
            class="w3-table-all w3-hoverable w3-centered"
            
          >
            <thead>
              <tr class="w3-red">
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody v-if="personList.length > 0">
              <tr
                v-for="(person, index) in personList"
                :key="index"
                class="w3-hover-yellow hover"
                @click="dispOnForm(index)"
              >
                <td>{{ person.name | to-upperCase }}</td>
                <td>{{ person.age }}</td>
                <td>{{ person.email }}</td>
                <td>{{ person.admin }}</td>
                <td>
                  <b-button
                    variant="outline-danger"
                    id="del"
                    @click="deletePerson(index)"
                  >Del</b-button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr
                id="tableEmpty"
                style="font-size: xx-large"
              >Click create</tr>
            </tbody>
            <b-button
              variant="outline-success"
              @click="createPerson()"
            >Create</b-button>
          </table>
          <person-form
            :rowData="rowData"
            @added="addPerson"
            @update="updatePerson"
            @cancel="cancel"
          ></person-form>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { eventBus } from "../../main";
import Form from "./PersonForm";
import { PersonMixin } from "./PersonMixin.js";
export default {
  props: ["personList", "loading"],
  mixins: [PersonMixin],

  data() {
    return {
      delData: "",
      rowData: "",
      val: "",
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
      console.log(index);
      this.dispOnForm(index);
      this.$emit("personDelete", index);
      this.createPerson();
    },
    deletePersonById(age) {
      console.log(typeof age);
      console.log(age.to);
      if (age.toString().length > 0) {
        let p = this.personList.findIndex(person => person.age === age);
        console.log(p);
        if (p !== -1) {
          this.$emit("personDelete", p);
          this.createPerson();
        } else {
          this.$toaster.error("person doesn't exist");
        }
      } else {
        this.$toaster.warning("unable to delete");
      }
    },
    createPerson() {
      this.rowData = {
        name: "",
        age: "",
        email: "",
        admin: "",
        toCreate: true
      };
    },
    addPerson(list) {
      this.$emit("createperson", list);
    },
    updatePerson(updatedList, index) {
      this.$emit("updatePerson", updatedList, index);
    },
    cancel(value, index) {
      this.$emit("reset", value, index);
    },
    dispOnForm(i) {
      this.rowData = {
        name: this.personList[i].name,
        age: this.personList[i].age,
        email: this.personList[i].email,
        admin: this.personList[i].admin,
        toCreate: false,
        index: i
      };
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
  filters: {
    "to-upperCase"(value) {
      // Or toUpperCase(value) -> Alternative
      return value.toUpperCase();
    }
  },
  components: {
    "person-form": Form
  }
};
</script>
<style>
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