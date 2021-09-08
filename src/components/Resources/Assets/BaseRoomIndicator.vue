<template>
  <div class="room-indicator d-flex justify-content-center ">
    <!-- <ul>
        <li v-for="(item, index) in value" :key="index">
            <i class="fas fa-child" aria-hidden="true"></i>
        </li>
    </ul> -->
    <div v-for="(item, index) in value" :key="index" class="pl-1 pr-1">
        <i class="fas fa-bed" aria-hidden="true"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "base-room-indicator",
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
