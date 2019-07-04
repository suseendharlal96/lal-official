<template>
  <div class="container">
    <form>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>Add/Edit Details</h1>
          <hr>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              class="form-control"
              :value="rowData.name"
              @input="rowData.name = $event.target.value"
            >
          </div>
          <div class="form-group">
            <label for="age">Age</label>
            <input
              type="text"
              id="age"
              class="form-control"
              :value="rowData.age"
              @input="rowData.age = $event.target.value"
            >
            <!-- <p v-if="$v.age.minval">jkadjfka</p> -->
          </div>
          <div class="form-group">
            <label for="age">Email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              :value="rowData.email"
              @input="rowData.email = $event.target.value"
            >
            <!-- <p v-if="!$v.email.email">Please provide a valid email-id</p> -->
          </div>
          <div class="form-group">
            <label for="age">Admin</label>
            <input
              type="text"
              id="admin"
              class="form-control"
              :value="rowData.admin"
              @input="rowData.admin = $event.target.value"
            >
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 from-group">
              <b-button
                variant="outline-primary"
                @click="addPerson(rowData.name, rowData.age, rowData.email, rowData.admin)"
              >Save</b-button>
              <b-button
                class="danger"
                variant="outline-danger"
                @click="clearbox"
              >Cancel</b-button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
import { eventBus } from "../../main";
// import { required, email, numeric, minValue } from "vuelidate/lib/validators";
export default {
  props: ["rowData"],
  data() {
    return {
      adminOptions: ["admin", "non-admin"],
      selected: this.rowData.admin,
      toCreate: true,
      name: "",
      age: "",
      email: "",
      admin: ""
    };
  },
  // validations: {
  //   //   email: {
  //   //     required, // required: required(SAME)
  //   //     email: email
  //   //   }
  //   age: {
  //     required,
  //     numeric,
  //     minval: minValue(18)
  //   }
  // },
  methods: {
    addPerson(name, age, email, admin) {
      if (this.rowData.toCreate) {
        console.log("create");
        if (name.length && age.length && email.length && admin.length > 0) {
          const newPerson = {
            name: this.rowData.name,
            age: this.rowData.age,
            email: this.rowData.email,
            admin: this.rowData.admin
          };
          this.$emit("added", newPerson);
          this.rowData.name = "";
          this.rowData.email = "";
          this.rowData.age = "";
          this.rowData.admin = "";
          this.rowData.toCreate = false;
        } else {
          this.$toaster.error("creation failed");
        }
      } else {
        console.log("update");
        let newPerson;
        newPerson = {
          name: this.rowData.name,
          age: this.rowData.age,
          email: this.rowData.email,
          admin: this.rowData.admin
        };

        this.$emit("update", newPerson, this.rowData.index);
        this.$toaster.success("Successfully updated");
      }
    },
    clearbox() {}
  }
};
</script>

<style>
/* .form-group.invalid input {
  border: "1px solid red";
  background-color: "salmon";
}
.form-group.invalid label {
  color: "red";
} */
</style>


