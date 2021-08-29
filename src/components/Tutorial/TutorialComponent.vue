<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h2 slot="header" class="">{{$t('tutorial.learnTutorialText')}}</h2>
        <base-button slot="footer" type="info" @click="goToTutorial" fill>{{$t('tutorial.title')}}</base-button>
      </card>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components";
import router from "@/router";
import swal from "sweetalert2";

export default {
  components: {
    Card
  },
  methods: {
    goToTutorial() {
      window.open('https:/propster.io/tutorial', '_blank');
      // router.push({
      //   name: "Tutorial"
      // });
    },
  },
};
</script>
<style>
</style>
