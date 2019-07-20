<template>
  <v-container>
    <h2>
      You've currently selected <span></span>
      <h2 class="re">{{ buttonname }}</h2>
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
        <tr v-for="(todo, index) in Todos" :key="index" style="cursor: pointer">
          <template v-if="updateIndex != index">
            <td>{{ index + 1 }}.</td>
            <td>{{ todo }}</td>
            <td>
              <i
                class="material-icons"
                v-b-tooltip.hover
                title="click to edit"
                @click="editMode(index)"
                >create</i
              >
              <i
                class="material-icons"
                v-b-tooltip.hover
                title="click to delete"
                @click="del(index)"
                >delete</i
              >
            </td>
          </template>
          <template v-else>
            <template v-if="readOnly">
              <td>{{ index + 1 }}</td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  :value="todo"
                  @input="updateVal = $event.target.value"
                />
              </td>
              <td>
                <i
                  class="material-icons"
                  v-b-tooltip.hover
                  title="click to save"
                  @click="save(updateVal, index)"
                  >save</i
                >
                <i
                  class="material-icons"
                  v-b-tooltip.hover
                  title="click to cancel"
                  @click="cancel(index)"
                  >cancel</i
                >
              </td>
            </template>
          </template>
        </tr>
      </tbody>
      <template v-else>
        <tbody>
          <tr id="tableEmpty">
            <td colspan="3">
              Completed Tasks.
            </td>
          </tr>
        </tbody>
      </template>
    </table>
  </v-container>
</template>
<script>
export default {
  props: ["Todos", "buttonname", "readOnly"],
  data() {
    return {
      updateVal: "",
      updateIndex: -1
      // editMode: false
    };
  },
  methods: {
    del(index) {
      this.$emit("del", index);
    },
    save(val, index) {
      this.$emit("update", val, index);
      this.updateIndex = -1;
    },
    editMode(index) {
      this.updateIndex = index;
      this.$emit("editable");
    },
    cancel() {
      this.updateIndex = -1;
    }
  }
};
</script>

