<template>
  <div class="bathroom-indicator d-flex justify-content-center ">
    <!-- <ul>
        <li v-for="(item, index) in value" :key="index">
            <i class="fas fa-child" aria-hidden="true"></i>
        </li>
    </ul> -->
    <div v-for="(item, index) in value" :key="index" class="p-2">
        <i class="fas fa-bath" aria-hidden="true"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "base-bathroom-indicator",
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // computedClasses() {
    //   return [
    //     { "progress-bar-striped": this.striped },
    //     { "progress-bar-animated": this.animated }
    //   ];
    // }
  }
};
</script>
<style>
</style>
