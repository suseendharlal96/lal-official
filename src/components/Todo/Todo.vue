<template>
  <div>
    <h2>To-do List</h2>
    <div>
      <div
        v-if="loading"
        class="row"
      >
        <div class="text-xs-center">
          <v-progress-circular
            :size="50"
            :width="4"
            indeterminate
            color="red"
          ></v-progress-circular>
        </div>
      </div>
      <div v-if=!loading>
        <v-container
          fluid
          grid-list-md
        >
          <v-text-field
            box
            type="text"
            placeholder="add something..."
            required
            auto-grow
            v-model="addVal"
          ></v-text-field>
          <span>
            <b-button
              variant="outline-success"
              @click.prevent="add(addVal)"
            >Add</b-button>
          </span>
          <div>
            <select
              label="delete"
              v-model="val"
              style="border: ridge"
            >
              <option
                disabled
                value=""
              > Select id/name</option>
              <optgroup label="Task id">

                <option
                  v-for="(drop,index) in dropDownArr"
                  :key="index"
                >
                  {{drop.id}}
                </option>
              </optgroup>
              <optgroup label="Task name">
                <option
                  v-for="(drop,index) in dropDownArr"
                  :key="index"
                >
                  {{drop.name}}
                </option>
              </optgroup>
            </select>
            <span>
              <b-button
                variant="danger"
                @click="del(val)"
              >Delete by Id/Name</b-button>
            </span>
          </div>
          <h4>Your mode of view(Toggle to change):</h4>
          <b-button
            variant="outline-primary"
            @click="classicMode"
          >{{btnName}}</b-button>
          <h3
            class="br"
            v-if="todos.length > 0"
          >You've got {{todos.length}} thing(s) to-do</h3>
          <h2
            class="re"
            v-else
          >You got everything done!! </h2>
          <div v-if="classic">
            <!-- if classic 1st Child component -->
            <classic-todo
              :Todos="todos"
              :buttonname="btnName"
              @del="del"
            ></classic-todo>
          </div>
          <!-- if Table 2nd Child component -->
          <div v-else>
            <table-todo
              :Todos="todos"
              :buttonname="btnName"
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
  </div>
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
      readOnly: false,
      classic: true,
      btnName: "Classic",
      dropDownArr: [],
      loading: false
    };
  },
  methods: {
    add(val) {
      if (val.length > 0) {
        let ind = this.todos.findIndex(t => t.name === val.toLowerCase());
        if (ind === -1) {
          let newId = this.todos.length + 1;
          let newTodo = {
            id: newId,
            name: val.toLowerCase()
          };
          let newIndex = this.todos.findIndex(ele => ele.id === newId);
          if (newIndex === -1) {
            this.todos.push(newTodo);
            this.dropDownArr.push(newTodo.id, newTodo.name);
            // Firebase backend
            axios
              .post("https://todolist-7be14.firebaseio.com/tasks.json", newTodo)
              .then(this.$toaster.success("Successfully added"))
              .catch(err => console.log(err));

            this.val = "";
          } else {
            newId = this.todos.length + 3;
            newTodo = {
              id: newId,
              name: val.toLowerCase()
            };
            this.todos.push(newTodo);
            this.dropDownArr.push(newTodo.id, newTodo.name);
            // Firebase backend
            axios
              .post("https://todolist-7be14.firebaseio.com/tasks.json", newTodo)
              .then(this.$toaster.success("Successfully added"))
              .catch(err => console.log(err));

            this.val = "";
          }
        } else {
          this.$toaster.error("Task already exists");
        }
      } else {
        this.$toaster.error("should not be empty");
      }
    },
    del(index) {
      if (this.todos.length > 0) {
        if (typeof index === "string" && index.length !== 0) {
          if (index.length <= 2) {
            console.log("inside string 2");
            const delIndex = this.todos.findIndex(t => t.id === +index);
            const dropDownIndex = this.dropDownArr.findIndex(
              d => d.id === +index
            );
            console.log(dropDownIndex);
            console.log(delIndex);
            if (delIndex !== -1) {
              this.dropDownArr.splice(dropDownIndex, 1);
              this.todos.splice(+delIndex, 1);
              this.val = "";
              this.$toaster.success("Successfully deleted");
            } else {
              this.$toaster.error("failed deletion");
            }
          } else {
            console.log("greater 2");
            const delIndex = this.todos.findIndex(
              t => t.name.trim().toLowerCase() === index.trim().toLowerCase()
            );
            const dropDownIndex = this.dropDownArr.findIndex(
              d => d.name.trim().toLowerCase() === index.trim().toLowerCase()
            );
            if (delIndex !== -1) {
              this.dropDownArr.splice(dropDownIndex, 1);
              this.todos.splice(+delIndex, 1);
              this.val = "";
              this.$toaster.success("Successfully deleted");
            } else {
              this.$toaster.error("failed deletion");
            }
          }
        } else if (typeof index === "number") {
          console.log("inside num");
          const tobeDel = this.todos[index];
          const dropDownNumIndex = this.dropDownArr.findIndex(
            d => d.id === tobeDel.id
          );
          this.dropDownArr.splice(dropDownNumIndex, 1);
          this.todos.splice(index, 1);
          this.val = "";
          this.$toaster.success("Successfully deleted");
        }
      } else {
        this.$toaster.error("no more items to delete");
      }
    },
    update(newVal, index) {
      console.log(newVal);
      if (newVal.length > 0) {
        let updatedValue = newVal.toLowerCase().trim();
        let updateIndex = this.todos.findIndex(u => u.name === updatedValue);
        console.log(updateIndex);
        let updatedItem = this.todos[index];
        let updateDropdownIndex = this.dropDownArr.findIndex(
          u => u.name === updatedItem.name
        );
        console.log(updateDropdownIndex);
        if (updateIndex === -1) {
          this.todos[index].name = updatedValue;
          this.dropDownArr[updateDropdownIndex].name = updatedValue;
          this.readOnly = false;
          this.$toaster.info("Successfully updated");
          this.$toaster.info("Read Mode");
        } else {
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
      this.btnName = this.classic ? "Classic" : "Table";
    },
    editable() {
      this.readOnly = !this.readOnly;
      if (this.readOnly) {
        this.$toaster.info("Edit Mode");
      } else {
        this.$toaster.info("Read Mode");
      }
    },
    editMode() {
      if (this.readOnly) {
        this.readOnly = false;
      }
    },
    home() {
      this.$router.push("/");
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
          const dropDownObj = {
            id: task.id,
            name: task.name
          };
          this.dropDownArr.push(dropDownObj);
          console.log(this.dropDownArr);
          this.todos.push(task);
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