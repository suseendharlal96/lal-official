<template>
  <div>
    <input
      v-model="filterPerson"
      class="search"
      placeholder="search persons"
    >
    <p>Showing all names</p>
    <ul>
      <li
        v-for="(person, index) in filteredPersons"
        :key="index"
      >{{ person.name }}</li>
    </ul><span>
      <input
        type="text"
        :value="delData"
        @input="val=$event.target.value"
        class="text"
        placeholder="enter age"
      >
      <b-button
        variant="danger"
        @click="deletePersonById(val)"
      >Del</b-button>
    </span>
    <div class="w3-container">
      <h2>Person Table</h2>

      <table class="w3-table-all w3-hoverable w3-centered">
        <thead>
          <tr class="w3-red">
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody
          v-for="(person, index) in personList"
          :key="index"
        >
          <tr
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

        <!-- <div v-else>
        <tbody>
          <td>{{ propB.message }}</td>
        </tbody>
      </div> -->
        <b-button
          variant="outline-success"
          @click="createPerson()"
        >Create</b-button>
      </table>
      <person-form
        :rowData="rowData"
        @added="addPerson"
        @update="updatePerson"
      ></person-form>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import Form from "./PersonForm";
import { PersonMixin } from "./PersonMixin.js";
export default {
  props: ["personList"],
  mixins: [PersonMixin],

  data() {
    return {
      perList: "",
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
      if (age.length > 0) {
        let p = this.personList.findIndex(person => person.age === age);
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
      //   this.personList.name = "";
      //   this.personList.age = "";
      //   this.personList.email = "";
      //   this.personList.admin = "";
      this.rowData = {
        name: "",
        age: "",
        email: "",
        admin: "",
        toCreate: true
      };
      //   console.log(this.personList);
    },
    addPerson(list) {
      console.log("pList");
      // this.perList = list;
      this.$emit("createperson", list);
    },
    updatePerson(updatedList, index) {
      this.$emit("updatePerson", updatedList, index);
    },
    dispOnForm(i) {
      // console.log(i);
      // console.log(this.personList[i]);
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