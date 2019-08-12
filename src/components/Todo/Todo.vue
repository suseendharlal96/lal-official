<template>
  <v-container id="todo">
    <h2>To-do List</h2>
    <div>
      <div v-if="loading">
        <div class="text-xs-center">
          <!-- <v-progress-circular
            :size="50"
            :width="4"
            indeterminate
            color="red"
          ></v-progress-circular> -->
          <img
            src="https://loading.io/spinners/gear-set/lg.triple-gears-loading-icon.gif"
            style="width: 20%;height: 20%;"
          />
        </div>
      </div>
      <div v-if="!loading">
        <v-container fluid grid-list-md>
          <v-text-field
            box
            type="text"
            placeholder="add something..."
            required
            v-model="addVal"
          ></v-text-field>
          <span>
            <b-button variant="outline-danger" @click.prevent="add(addVal)"
              >Add</b-button
            >
          </span>
          <div>
            <select label="delete" v-model="val" style="border: ridge">
              <option class="form-control" disabled value="">
                Select task name</option
              >
              <!-- <optgroup label="Task name"> -->
              <option
                class="form-control"
                v-for="(todo, index) in todos"
                :key="index"
              >
                {{ todo }}
              </option>
              <!-- </optgroup> -->
            </select>
            <span style="position: absolute;cursor:pointer">
              <i
                class="material-icons"
                v-b-tooltip.hover
                title="click to delete"
                @click="del(val)"
                >delete</i
              >
            </span>
          </div>
          <!-- Image upload -->
          <!-- <v-layout row>
            <v-flex xs12d sm6 offset-sm3>
              <v-text-field
                name="imgUrl"
                label="Image URL"
                id="image-url"
                v-model="imgUrl"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imgUrl" height="150" />
            </v-flex>
          </v-layout>
          <h4>Your mode of view(click to Toggle):</h4> -->
          <b-button variant="outline-primary" @click="classicMode"
            >Switch to {{ btnName }}</b-button
          >
          <h3 class="br" v-if="todos.length > 0">
            You've got {{ todos.length }} thing(s) to-do
          </h3>
          <h2 class="re" v-else>You got everything done!!</h2>
          <div v-if="classic">
            <!-- if classic 1st Child component -->
            <classic-todo
              :Todos="todos"
              :buttonname="dispName"
              @del="del"
            ></classic-todo>
          </div>
          <!-- if Table 2nd Child component -->
          <div v-else>
            <table-todo
              :Todos="todos"
              :buttonname="dispName"
              :readOnly="readOnly"
              @update="update"
              @del="del"
              @editable="editable"
            ></table-todo>
          </div>
          <b-button @click="home">Back to Home</b-button>
        </v-container>
      </div>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";

import Classic from "./ClassicTodo";
import Table from "./TableTodo";
export default {
  data() {
    return {
      todos: [], // values will be fetched from DB firebase
      val: "",
      addVal: "",
      readOnly: "",
      imgUrl: "",
      classic: false,
      btnName: "Classic",
      dispName: "Table",
      dropDownArr: [],
      loading: false
    };
  },
  methods: {
    add(val) {
      if (val.length > 0) {
        let newTodo = {
          val: val.toLowerCase()
        };
        console.log(newTodo);
        let newIndex = this.todos.findIndex(ele => ele === val.toLowerCase());
        if (newIndex === -1) {
          this.todos.push(val);
          // Firebase backend
          axios
            .post("https://todolist-7be14.firebaseio.com/tasks.json", newTodo)
            .then(this.$toaster.success("Successfully added"))
            .catch(err => console.log(err));

          this.val = "";
        } else {
          this.$toaster.error("Task already exists");
        }
      } else {
        this.$toaster.error("should not be empty");
      }
    },
    del(tobeDeleted) {
      if (typeof tobeDeleted === "string" && tobeDeleted.length !== 0) {
        // if (index.length <= 2) {
        console.log("inside string 2");
        const delIndex = this.todos.findIndex(t => t === tobeDeleted);
        console.log(delIndex);
        if (delIndex !== -1) {
          this.todos.splice(+delIndex, 1);
          this.val = "";
          this.$toaster.success("Successfully deleted");
        } else {
          this.$toaster.error("failed deletion");
        }
      } else if (typeof tobeDeleted === "number") {
        console.log("inside num");
        console.log(tobeDeleted);
        this.todos.splice(tobeDeleted, 1);
        this.val = "";
        this.$toaster.success("Successfully deleted");
      } else {
        this.$toaster.error("Select a task name");
      }
    },
    update(newVal, index) {
      console.log(newVal);
      if (newVal.length > 0) {
        let updatedValue = newVal.toLowerCase().replace(/\s/g, "");
        console.log(updatedValue);
        let updateIndex = this.todos.findIndex(u =>
          u
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(updatedValue)
        );
        console.log(updateIndex);
        let updatedItem = this.todos[index];
        if (updateIndex === -1) {
          this.todos[index] = updatedValue;
          this.readOnly = true;
          this.$toaster.info("Successfully updated");
          this.readOnly = false;
        } else {
          this.readOnly = true;
          this.$toaster.error("Task already exists");
        }
      } else {
        this.$toaster.error("No changes recorded");
      }
    },
    classicMode() {
      if (this.readOnly) {
        this.readOnly = false;
      }
      this.classic = !this.classic;
      this.btnName = this.classic ? "Table" : "Classic";
      this.dispName = this.classic ? "Classic" : "Table";
    },
    editable() {
      this.readOnly = true;
      if (this.readOnly) {
        this.$toaster.info("Edit Mode");
      } else {
        this.$toaster.info("Read Mode");
      }
    },
    home() {
      this.$router.push("/success");
    }
  },
  filters: {
    "to-upperCase"(value) {
      // Or toUpperCase(value) -> Alternative
      return value.toUpperCase();
    }
  },
  mounted() {
    this.loading = true;
    axios
      .get("https://todolist-7be14.firebaseio.com/tasks.json")
      .then(res =>
        Object.keys(res.data).map(key => {
          const id = key;
          console.log(id);
          const task = res.data[key];
          console.log(task);
          this.todos.push(task.val);
          this.loading = false;
        })
      )
      .catch(err => {
        this.loading = true;
        console.log(err);
      });
  },
  components: {
    "classic-todo": Classic,
    "table-todo": Table
  }
};
</script>
<style>
#todo {
  position: relative;
  bottom: 17%;
}
.br {
  color: brown;
}
.re {
  color: red;
}
.react {
  color: #61dafb;
}
#tableEmpty {
  color: blue;
}
</style>