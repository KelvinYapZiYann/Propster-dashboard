<template>
  <div>
    <div class="wrapper wrapper-full-page">
      <div class="full-page" :class="pageClass">
        <div class="content">
          <router-view></router-view>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <div class="copyright">
              &copy; 2021, made with
              <i class="tim-icons icon-heart-2"></i> by
              <a
                href="https://propster.io/"
                target="_blank"
                rel="noopener"
                >propster.io</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import BaseNav from "@/components/BaseNav";
export default {
  components: {
    BaseNav
  },
  data() {
    return {
      showMenu: false,
      pageClass: "login-page"
    };
  },
  computed: {
    title() {
      return `${this.$route.name} Page`;
    }
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      this.showMenu = false;
    },
    setPageClass() {
      this.pageClass = `${this.$route.name}-page`.toLowerCase();
    }
  },
  beforeDestroy() {
    this.closeMenu();
  },
  beforeRouteUpdate(to, from, next) {
    if (this.showMenu) {
      this.closeMenu();
      setTimeout(() => {
        next();
      }, this.menuTransitionDuration);
    } else {
      next();
    }
  },
  mounted() {
    this.setPageClass();
  },
  watch: {
    $route() {
      this.setPageClass();
    }
  }
};
</script>
<style></style>
