<template>
  <div class="navigation">
    <b-nav pills>
      <b-nav-item>
        <router-link
          to="/"
          active-class="active"
          exact
        ><a>Home</a></router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link
          to="/person"
          exact
        ><a>Person</a></router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link
          to="/quote"
          exact
        ><a>Quote</a></router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link
          to="/todo"
          exact
        ><a>Todo</a></router-link>
      </b-nav-item>
    </b-nav>
  </div>
  <!-- <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link to="/">Home</router-link>
    </li>

    <li class="nav-item">
      <router-link to="/person">Person</router-link>
    </li>

    <li class="nav-item">
      <router-link to="/quote">Quote</router-link>
    </li>
  </ul> -->
</template>
<style>
.navigation {
  background-color: whitesmoke;
}
</style>
