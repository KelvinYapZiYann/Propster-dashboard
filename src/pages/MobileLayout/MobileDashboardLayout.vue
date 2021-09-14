<template>
  <div class="wrapper">
    <div class="main-panel" :data="backgroundColor">
      <mobile-dashboard-content></mobile-dashboard-content>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import MobileDashboardContent from "./MobileDashboardContent.vue";

export default {
  components: {
    MobileDashboardContent
  },
  data() {
    return {
      backgroundColor: "blue"
    };
  },
};
</script>
