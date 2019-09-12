<template>
  <v-app id="appbg">
    <div id="particles-js"></div>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="red" id="mynav">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "
      ></v-toolbar-side-icon>
      <v-toolbar-title v-if="userIsAuthenticated">
        <router-link to="/success" tag="span" style="cursor: pointer"
          >Simple App</router-link
        >
        <p style="color:yellow">Welcome {{ welcomeMail }} !</p>
      </v-toolbar-title>
      <v-toolbar-title v-if="!userIsAuthenticated">
        <router-link to="/" tag="span" style="cursor: pointer"
          >Simple App</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn v-if="userIsAuthenticated" flat @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
    <footer class="footer">
      <p>
        Copyright © 2019 built with <i class="fa fa-heart pulse"></i> by
        Suseendhar LaL
      </p>
      <p id="google_translate_element"></p>
    </footer>
    <div>
      <modal v-show="openModal" :msg="msg" @confirm="confirmLogout"></modal>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

import Modal from "./components/Modal/Modal";

export default {
  data() {
    return {
      sideNav: false,
      welcomeMail: "",
      msg: "logout",
      openModal: false
    };
  },
  methods: {
    onLogout() {
      this.openModal = true;
    },
    confirmLogout(val) {
      if (val) {
        localStorage.clear();
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/logout");
        });
      }
      this.openModal = false;
    }
    // scrollFunction() {
    //   console.log('fsgdf')
    //   if (
    //     document.body.scrollTop > 20 ||
    //     document.documentElement.scrollTop > 20
    //   ) {
    //     document.getElementById("mynav").style.top = "0";
    //   } else {
    //     document.getElementById("mynav").style.top = "-50px";
    //   }
    // }
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "person", title: "Person", link: "/person" },
          { icon: "calendar_today", title: "Todo", link: "/todo" },
          { icon: "cloud", title: "Weather", link: "/weather" },
          { icon: "view_list", title: "AllInOne", link: "/all" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    getWelcomeUser() {
      this.welcomeMail = this.$store.getters["getWelcomeUser"];
    }
  },
  watch: {
    getEmail() {
      this.welcomeMail = this.$store.getters["getWelcomeUser"];
      if (this.welcomeMail) {
        this.welcomeMail = localStorage.getItem("email");
      }
    }
  },
  created() {
    this.welcomeMail = localStorage.getItem("email");
  },
  components: {
    modal: Modal
  }
};
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Roboto, "Open Sans", sans-serif !important;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.7;
  color: #f8f8f8;
  /* padding: 16px; */
}
#appbg {
  /* overflow: auto; */
  /* background-image: linear-gradient(
      to right bottom,
      rgba(126, 213, 111, 0.801),
      rgba(40, 180, 133, 0.801)
    ),
    url(assets/img/nat-4.jpg);
  background-size: cover;
  background-position: top;
  height: 100%; */
}
.red {
  position: fixed;
  z-index: 1;
  background: linear-gradient(
    to right bottom,
    rgba(165, 52, 17, 0.801),
    rgba(226, 66, 3, 0.801)
  );
  opacity: 0.9;
}
#google_translate_element {
  color: #ffff;
}

::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: linear-gradient(
    to bottom,
    rgba(231, 29, 11, 0.801),
    rgba(224, 210, 13, 0.801)
  );
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

.footer {
  position: absolute;
  background: linear-gradient(
    to left,
    rgba(19, 18, 18, 0.76),
    rgba(73, 72, 72, 0.76)
  );
  height: 38px;
  bottom: 0%;
  width: 100%;
  text-align: end;
  color: #728872;
}
.fa {
  color: #e90606;
  margin: 0 3px;
  font-size: 10px;
  animation: pound 0.35s infinite alternate;
}

@keyframes pound {
  to {
    transform: scale(1.1);
  }
}
.footer p {
  font-size: 90%;
}
html {
  text-rendering: optimizeLegibility;
}
.container {
  position: relative;
  bottom: 7%;
}
.v-btn {
  border-radius: 80px;
  animation: moveFromBottom 0.5s ease-out;
}
.v-card .v-sheet {
  border-radius: 18px;
}
div {
  animation: fadein 0.75s;
}
@keyframes moveFromBottom {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translate(0px);
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
