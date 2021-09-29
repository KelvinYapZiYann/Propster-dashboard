<template>
  <div class="room-indicator d-inline-flex" :class="[{
      'justify-content-center': align == 'center',
      'justify-content-start': align == 'left',
      'justify-content-end': align == 'right'
    }]">
    <!-- <ul>
        <li v-for="(item, index) in value" :key="index">
            <i class="fas fa-child" aria-hidden="true"></i>
        </li>
    </ul> -->
    <div v-for="(item, index) in value" :key="index" class="pl-1 pr-1">
        <i class="fas fa-child" aria-hidden="true"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "base-tenant-indicator",
  props: {
    value: {
      type: Number,
      default: 0
    },
    align: {
      type: String,
      default: "center"
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
/* .tenant-indicator {
    height: 100%;
    vertical-align: middle;
} */
/* .tenant-indicator ul {
    list-style-type: none;
    padding: 0;
}
.tenant-indicator ul li {
    float: left;
    padding-left: 2px;
    color: rgba(34, 42, 66, 0.7) !important;
} */
</style>
