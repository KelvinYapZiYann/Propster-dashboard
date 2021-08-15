<template class="white-content">
  <div id="app">
    <div class="content">
      <notifications></notifications>
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  methods: {
    disableRTL() {
      if (!this.$rtl.isRTL) {
        this.$rtl.disableRTL();
      }
    },
    toggleNavOpen() {
      let root = document.getElementsByTagName("html")[0];
      root.classList.toggle("nav-open");
    },
    async verifyMiddleware() {
      await this.$store.dispatch('verifyMiddleware').then(() => {
        this.getProfile();
      }).catch((e) => {
        try {
          errorHandlingService.verifyErrorFromServer(e);
        } catch(e1) {
          this.$notify({
            message: errorHandlingService.displayAlertFromServer(e1),
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        }
      });
    },
    async getProfile() {
      if (this.$router.currentRoute.name == 'login') {
        return;
      }
      try {
        await this.$store.dispatch('users/get', {});
      } catch (e) {
        // this.$notify({
        //   message: errorHandlingService.displayAlertFromServer(e),
        //   icon: 'tim-icons icon-bell-55',
        //   type: 'danger'
        // });
      }
    },
  },
  mounted() {
    this.$watch("$route", this.disableRTL, { immediate: true });
    this.$watch("$sidebar.showSidebar", this.toggleNavOpen);
    if (this.$store.getters.isAuthenticated) {
      this.verifyMiddleware();
    }
  }
};
</script>

<style lang="scss">
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
