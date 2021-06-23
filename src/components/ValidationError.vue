<template>
  <span v-if="errorsArray && errorsArray.length">
    <small class="error" v-text="errorsArray[0]"/>
  </span>
</template>

<script>
  export default {
    name: "validation-error",
    props: {
      errorsArray: {
        type: Array,
        default: function() {
          return [];
        }
      }
    }
  }
</script>

<style lang="scss">
  .error {
    position: relative;
    font-size: 0.75rem;
    margin-bottom: 5px;
    color: #ec250d;
  }
</style>
