<template>
  <div>
    <h2>You've currently selected <span></span>
      <h2 class="re">{{buttonname}}</h2>
    </h2>
    <table class="w3-table-all w3-hoverable w3-centered">
      <thead>
        <tr class="w3-red">
          <th>Task no.</th>
          <th>Task</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="Todos.length > 0">
        <tr
          v-for="(todo, index) in Todos"
          :key="index"
          @dblclick="editable()"
          style="cursor: pointer"
          v-b-tooltip.hover
          title="double click to edit"
        >
          <td>{{ todo.id }}</td>
          <td v-if="readOnly"><input
          class="form-control"
              type="text"
              v-b-tooltip.hover
              title="click update"
              :value="todo.name"
              @input="updateVal=$event.target.value"
            ></td>
          <td v-else>
            <input
            class="form-control"
              :value="todo.name"
              @input="updateVal=$event.target.value"
              readonly
            >
          </td>
          <td>
            <b-button
              variant="outline-primary"
              @click="update(updateVal, index)"
            >Update</b-button>
            <b-button
              variant="outline-danger"
              @click="del(index)"
            >Delete</b-button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          id="tableEmpty"
          style="font-size: xx-large"
        >Completed Tasks</tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ["Todos", "buttonname", "readOnly"],
  data() {
    return {
      updateVal: ""
    };
  },
  methods: {
    del(index) {
      this.$emit("del", index);
    },
    update(val, index) {
      this.$emit("update", val, index);
    },
    editable() {
      this.$emit("editable");
    }
  }
};
</script>

