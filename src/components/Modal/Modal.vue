<template>
  <transition name="modal2-fade">
    <div class="modal2-backdrop">
      <div
        class="modal2"
        role="dialog"
        aria-labelledby="modal2Title"
        aria-describedby="modal2Description"
      >
        <section class="modal2-body" id="modal2Description">
          <v-layout row class="ques">
            <v-flex xs6>
              <h2>Are u sure want to {{ msg }} ?</h2>
            </v-flex>
          </v-layout>
          <v-layout row class="buttons">
            <v-flex xs6>
              <v-btn @click="confirm(true)">Yes</v-btn>
              <v-btn @click="confirm(false)">No</v-btn>
            </v-flex>
          </v-layout>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["msg"],
  methods: {
    confirm(val) {
      this.$emit("confirm", val);
    }
  }
};
</script>
<style >
.modal2-backdrop {
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

.modal2 {
  position: relative;
  background: linear-gradient(
    to right bottom,
    rgb(11, 230, 84),
    rgba(16, 187, 130, 0.801)
  );
  background-size: cover;
  box-shadow: 2px 2px 20px 1px;
  border-radius: 10px;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
}
.modal2-body {
  position: relative;
  top: 22%;
  left: 27%;
  padding: 20px 10px;
}
.modal2-fade-enter,
.modal2-fade-leave-active {
  opacity: 0;
}

.modal2-fade-enter-active,
.modal2-fade-leave-active {
  transition: opacity 0.5s ease;
}
.ques {
}

.buttons {
}
</style>