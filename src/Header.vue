<template>
  <div id="header">

    <v-app>
      <v-navigation-drawer
        temporary
        v-model="sideNav"
      >
        <v-list>
          <v-list-tile
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link"
          >
            <v-list-tile-action>
              <!-- <v-icon>{{ item.icon }}</v-icon> -->
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        dark
        class="primary"
      >
        <v-toolbar-title>
          <router-link
            to="/success"
            tag="span"
            style="cursor: pointer"
          >Simple App</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            flat
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link"
          >
            <!-- <v-icon
            left
            dark
          >{{ item.icon }}</v-icon> -->
            {{ item.title }}

          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!-- <main>
      <router-view></router-view>
    </main> -->
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { title: "Sign up", link: "/signup" },
        {title: 'Sign in', link: '/signin'}
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { title: "Person", link: "/person" },
          { title: "Quotes", link: "/quote" },
          { title: "Todo", link: "/todo" },
          { title: "Logout", link: "/logout" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  }
};
</script>

<style >
#header {
  position: fixed;
  z-index: 1;
  height: 0%;
  top: -92%;
  bottom: -2%;
  width: 100%;
  left: 0%;
}
/* @import './s\' */
</style>
