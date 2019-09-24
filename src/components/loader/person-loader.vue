<template>
  <v-container id="persons" fluid grid-list-md>
    <div class="card-skeleton">
      <div class="animated-background">
        <div class="card-skeleton-img"></div>
        <div class="skel-mask-container">
          <div class="skel-mask skel-mask-1"></div>
          <div class="skel-mask skel-mask-1"></div>
          <div class="skel-mask skel-mask-2"></div>
          <div class="skel-mask skel-mask-3"></div>
          <div class="skel-mask skel-mask-4"></div>
          <div class="skel-mask skel-mask-5"></div>
          <div class="skel-mask skel-mask-6"></div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.container {
  margin: 0 auto;
  max-width: 930px;
}
@keyframes placeHolderShimmer {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    background-position: -468px 0;
  }
  to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    background-position: 468px 0;
  }
}

.card-skeleton {
  width: 100%;
  height: 300px;
  margin: 5px;
  position: relative;
  float: left;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  -webkit-backface-visibility: hidden;
  background: #fff;
  z-index: 10;
  padding: 15px;
  opacity: 1;
}

.card-skeleton.hidden {
  transition: all 0.3s ease-in-out;
  opacity: 0;
  height: 0;
  padding: 0;
}

.card-skeleton-img {
  width: 100%;
  height: 120px;
  background: #e6e6e6;
  display: block;
}

.animated-background {
  will-change: transform;
  animation: placeHolderShimmer 1s linear infinite forwards;
  -webkit-backface-visibility: hidden;
  background: #e6e6e6;
  background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
  background-size: 800px 104px;
  height: 100%;
  position: relative;
}

.skel-mask-container {
  position: relative;
}

.skel-mask {
  background: #fff;
  position: absolute;
  z-index: 200;
}

.skel-mask-1 {
  width: 100%;
  height: 15px;
  top: 0;
  left: 0;
}

.skel-mask-2 {
  width: 25%;
  height: 10px;
  top: 15px;
  right: 0;
}

.skel-mask-3 {
  top: 25px;
}

.skel-mask-3,
.skel-mask-4 {
  width: 100%;
  height: 15px;
  right: 0;
}

.skel-mask-4 {
  top: 50px;
}

.skel-mask-5 {
  width: 10%;
  height: 30px;
  top: 65px;
  right: 30%;
}

.skel-mask-6 {
  width: 100%;
  height: 15px;
  top: 95px;
  right: 0;
}
</style>