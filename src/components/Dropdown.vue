<template>
  <component
    :is="tag"
    class="dropdown nav-item"
    :class="{ show: isOpen }"
    @click="toggleDropDown"
    v-click-outside="closeDropDown"
  >
    <slot></slot>
  </component>
</template>
<script>
// import ClickOutside from 'vue-click-outside';

export default {
  name: "drop-down",
  props: {
    tag: {
      type: String,
      default: "li"
    },
    defaultShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    }
  },
  watch: {
    defaultShow: function(newVal, oldVal) {
      setTimeout(() => {
        this.isOpen = newVal;
      }, 10);
    }
  },
};
</script>

<style></style>
