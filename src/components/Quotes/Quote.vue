<template>
  <v-container>

    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="panel panel-default">
        <div class="panel-body quote">
          <slot></slot>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
</script>

<style>
.panel-body {
  font-family: "Arizonia", cursive;
  font-size: 24px;
  color: green;
}

.quote {
  cursor: pointer;
}

.quote:hover {
  color: #ffffff;
  background-color: red;
}
</style>