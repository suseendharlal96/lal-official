<template>
  <v-container>
    <div v-if="loading">
      <div class="text-xs-center">
        <!-- <v-progress-circular
          :size="50"
          :width="4"
          indeterminate
          color="primary"
        ></v-progress-circular> -->
        <img
          src="https://loading.io/spinners/gear-set/lg.triple-gears-loading-icon.gif"
          style="width: 20%;height: 20%;"
        />
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
        ></v-text-field>
        <b-button variant="danger" @click="deletePersonById(delData)"
          >Del</b-button
        >
      </span>
      <h2>Person Table</h2>
      <table class="w3-table-all w3-hoverable w3-centered fixedheader">
        <thead>
          <tr class="w3-red">
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Contact Pic</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody v-if="personList.length && filteredPersons.length > 0 && personList !== undefined && personList !== null">
          <tr
            v-for="(person, index) in filteredPersons"
            :key="index"
            class="w3-hover-yellow hover"
            @click="dispOnForm(index)"
          >
            <td>{{ person.name | toUpperCase }}</td>
            <td>{{ person.age }}</td>
            <td>{{ person.email }}</td>
            <td>{{ person.admin }}</td>
            <td>
              <img
                :src="person.imgUrl" height="50"
              />
            </td>
            <td>
              <b-button
                variant="outline-danger"
                id="del"
                @click="deletePerson(index)"
                >Del</b-button
              >
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">
              No data to display.
            </td>
          </tr>
        </tbody>
        <b-button variant="outline-danger" @click="createPerson()"
          >Create</b-button
        >
      </table>
      <div>
        <person-form
          :rowData="rowData"
          @added="addPerson"
          @update="updatePerson"
          @cancel="cancel"
        ></person-form>
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
      imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_großen_Triumphbogen.jpg',
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
      // console.log(index);
      this.dispOnForm(index);
      this.$emit("personDelete", index);
      this.createPerson();
    },
    deletePersonById(age) {
      // console.log(typeof age);
      // console.log(age.to);
      if (age.toString().length > 0) {
        let p = this.personList.findIndex(person => person.age === age);
        // console.log(p);
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
        imageUrl: "",
        toCreate: true
      };
    },
    addPerson(list) {
      // console.log(list);
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
        imgUrl: this.personList[i].imgUrl,
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
    toUpperCase(value) {
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