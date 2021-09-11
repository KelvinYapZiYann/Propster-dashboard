<template>
  <card class="card-stats" :show-footer-line="true">
    <div class="row">
      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12" v-if="$slots.icon || icon">
        <div class="info-icon text-center ml-auto mr-auto" :class="`icon-${type}`">
          <slot name="icon"><i :class="icon"></i></slot>
        </div>
      </div>
      <!-- <div class="col-5" v-if="$slots.icon || icon">
        <div class="info-icon text-center" :class="`icon-${type}`">
          <slot name="icon"><img :src="image" alt="" v-if="image"></slot>
        </div>
      </div> -->
      <div class="col-xl-9 col-lg-9 col-md-8 col-sm-8 col-12" v-if="$slots.content || title || subTitle">
        <div class="numbers">
          <slot>
            <p v-if="subTitle" class="card-category">{{ subTitle }}</p>
            <h3 v-if="title" class="card-title mb-0">{{ title }}</h3>
          </slot>
        </div>
      </div>
    </div>
    <div class="stats" slot="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </card>
</template>
<script>
import Card from "./Card.vue";

export default {
  name: "stats-card",
  components: {
    Card
  },
  props: {
    type: {
      type: String,
      default: "primary"
    },
    icon: String,
    title: String,
    subTitle: String,
    image: String
  }
};
</script>
<style></style>
