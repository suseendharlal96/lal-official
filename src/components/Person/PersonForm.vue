<template>
  <v-container>
    <v-form v-model="valid">
      <v-layout row>
        <v-flex xs6>
          <v-text-field
            label="Name"
            id="name"
            :rules="nameRules"
            :counter="15"
            v-model.lazy.trim="rowData.name"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-layout row>
        <v-flex xs6>
          <v-text-field
            type="number"
            label="Age"
            id="age"
            v-model.number="rowData.age"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <v-text-field
            id="email"
            label="Email"
            :rules="emailRules"
            :counter="40"
            v-model.trim="rowData.email"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <img :src="rowData.imgUrl" height="150" />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs3>
          <v-overflow-btn
            :items="adminOptions"
            label="Admin"
            v-model.trim="rowData.admin"
          ></v-overflow-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <v-btn @click="onUpload">Upload!</v-btn>
          <input
            type="file"
            style="display:none"
            ref="imgFile"
            accept="image/*"
            @change="onFileChanged"
          />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-btn
            depressed
            color="primary"
            @click="
              addPerson(
                rowData.name,
                rowData.age,
                rowData.email,
                rowData.admin,
                rowData.imgUrl,
                image
              )
            "
            >Save</v-btn
          >

          <v-btn depressed color="error" @click="clearbox">Cancel</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { eventBus } from "../../main";
// import { required, email, numeric, minValue } from "vuelidate/lib/validators";
export default {
  props: ["rowData"],
  data() {
    return {
      adminOptions: ["true", "false"],
      valid: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 40 || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      selected: this.rowData.admin,
      image: null,
      imageUrl: "",
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
    addPerson(name, age, email, admin, imgUrl, image) {
      // console.log(name);
      if (this.rowData.toCreate) {
        // console.log("create");
        const newPerson = {
          name: this.rowData.name,
          age: this.rowData.age,
          email: this.rowData.email,
          admin: this.rowData.admin,
          imgUrl: this.rowData.imgUrl,
          img: this.image
        };
        this.$emit("added", newPerson);
        this.rowData.name = "";
        this.rowData.email = "";
        this.rowData.age = "";
        this.rowData.admin = "";
        this.rowData.imgUrl = "";
        this.rowData.toCreate = false;
        // } else {
        //   this.$toaster.error("creation failed");
        // }
      } else {
        // console.log("update");
        // console.log(this.rowData.index);
        let newPerson;
        newPerson = {
          name: name,
          age: age,
          email: email,
          admin: admin,
          image: this.image
        };

        this.$emit("update", newPerson, this.rowData.index);
      }
    },
    onUpload() {
      // console.log(2);
      this.$refs.imgFile.click();
    },
    onFileChanged(event) {
      // console.log(1);
      const selectedImg = event.target.files;
      let fileName = selectedImg[0].name;
      // console.log(fileName);
      if (fileName.lastIndexOf(".") <= 0) {
        this.$toaster.error("Please upload a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.rowData.imgUrl = fileReader.result; // URL of the image
        // console.log(this.rowData.imgUrl);
      });
      fileReader.readAsDataURL(selectedImg[0]);
      this.image = selectedImg[0];
      // console.log(this.image); // Actual image
      this.$toaster.success("Image uploaded!");
    },
    clearbox() {
      //  this.$emit('cancel', this.rowData, this.rowData.index);
    }
  },
  created() {
    console.log(this.rowData.imageUrl);
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


