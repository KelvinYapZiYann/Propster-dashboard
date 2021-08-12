<template>
  <div class="sidebar" :data="backgroundColor">
    <div class="sidebar-wrapper text-left">
      <div class="logo">
        <a class="simple-text logo-mini" @click="dashboard" href="javascript:void(0)">
          <img src="/img/main_propster_logo_white.svg" alt="">
        </a>

        <a href="javascript:void(0)" class="simple-text logo-normal" @click="dashboard" >
          {{ title }}
        </a>
      </div>
      <ul class="nav">
        <slot name="links">
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :link="link"
          >
            <sidebar-link
              v-for="(subLink, index) in link.children"
              :key="link.name + index"
              :link="subLink"
            >
            </sidebar-link>
          </sidebar-link>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  name: "side-bar",
  components: {
    SidebarLink
  },
  props: {
    // abv: {
    //   type: String,
    //   default: "",
    //   description: "Sidebar short title"
    // },
    title: {
      type: String,
      default: "Propster",
      description: "Sidebar title"
    },
    backgroundColor: {
      type: String,
      default: "blue",
      description: "Sidebar background color (blue|green|orange|red|primary)"
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeLinkIndex: 0
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    findActiveLink() {
      this.links.forEach((link, index) => {
        if (link.isActive()) {
          this.activeLinkIndex = index;
        }
      });
    },
    dashboard() {
      try {
        if (this.$router.currentRoute.fullPath != '/dashboard') {
          this.$router.push({name: "Home"});
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Oops, something went wrong!",
        });
      }
    },
  }
};
</script>
<style></style>
