<template>
  <card type="user">
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <img v-if="this.model.gender == 'MALE'" class="avatar" src="../../assets/img/anime3.png" alt="...">
      <img v-else-if="this.model.gender == 'FEMALE'" class="avatar" src="../../assets/img/anime6.png" alt="...">
      <div v-else></div>

      <h1 v-if="this.model.gender == 'MALE'">Mr. {{model.full_name}}</h1>
      <h1 v-else-if="this.model.gender == 'FEMALE'">Ms. {{model.full_name}}</h1>
      <div v-else></div>

      <h5 class="title"></h5>
      <p class="description">
        Tier: {{model.tier}}
      </p>
      <p class="description">
        Current Role: {{model.selected_role}}
      </p>
    </div>
  </card>
</template>
<script>
import { Card } from "@/components/index";

import BaseButton from "@/components/BaseButton";

export default {
  components: {
    Card,
    BaseButton
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      }
    },
    model: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
<style></style>
