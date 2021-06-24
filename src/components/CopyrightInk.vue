<template>
    <div class="copyright">
        Copyright <i class="fa fa-copyright" style="font-weight: 200;"></i> {{ year }} All Rights Reserved by 
          <a
            href="https://propster.io/"
            target="_blank"
            rel="noopener"
          >Propster.io</a>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>