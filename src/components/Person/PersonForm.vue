<template>
  <!-- <v-container> -->
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Person Form!

            <button
              type="button"
              class="btn-close"
              @click="clearbox"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
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
                <div
                  class="drop"
                  @dragover="handleDragOver"
                  @drop="onFileChanged"
                >
                  <v-btn @click="onUpload">
                    <v-icon left light>cloud_upload</v-icon>Upload Image!</v-btn
                  >
                  <input
                    type="file"
                    style="display:none"
                    ref="imgFile"
                    accept="image/*"
                    @change="onFileChanged"
                  />
                  <div><small>You can drop image here</small></div>
                </div>
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
        </section>
      </div>
    </div>
  </transition>
  <!-- </v-container> -->
</template>

<script>
import { eventBus } from "../../main";
// import { required, email, numeric, minValue } from "vuelidate/lib/validators";
export default {
  props: ["rowData"],
  data() {
    return {
      adminOptions: ["true", "false"],
      authorized: "",
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
      this.authorized = this.$store.getters["getAuthorizedUser"];
      if (this.authorized.id === "keDYEODC78TpkTM8NWFyElC0sR32") {
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
      } else {
        this.$toaster.error("You are not authorized to make changes!");
      }
    },
    onUpload() {
      // console.log(2);
      this.$refs.imgFile.click();
    },
    onFileChanged(event) {
      event.stopPropagation();
      event.preventDefault();
      // console.log(1);
      // const selectedImg = event.target.files;
      const selectedImg = event.target.files || event.dataTransfer.files;
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
    handleDragOver(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = "copy";
    },
    clearbox(event) {
      this.$emit("clear");
    }
  },
  created() {
    console.log(this.rowData.imageUrl);
  }
};
</script>

<style>
.drop {
  width: 100%;
  border: 1px dashed yellow;
  padding: 15px;
  text-align: center;
  margin: 10px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background: linear-gradient(
    to right bottom,
    rgb(88, 197, 74),
    rgba(16, 187, 130, 0.801)
  );
  background-size: cover;
  box-shadow: 2px 2px 20px 1px;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 10px;
  display: flex;
  background: linear-gradient(
    to right bottom,
    rgba(221, 86, 23, 0.8),
    rgba(103, 147, 206, 0.8)
  );
  background-size: cover;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: blue;
  justify-content: safe;
}

.modal-body {
  position: relative;
  overflow: auto;
  padding: 20px 10px;
}
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
  font-weight: bold;
  color: red;
  background: transparent;
}


/* .form-group.invalid input {
  border: "1px solid red";
  background-color: "salmon";
}
.form-group.invalid label {
  color: "red";
} */
</style>


