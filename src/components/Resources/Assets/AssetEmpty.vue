<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h2 slot="header" class="">{{$t('alert.noAssetAlert')}}</h2>
        <base-button slot="footer" type="info" @click="addModel" fill>{{$t('component.add')}} {{$t('sidebar.asset')}}</base-button>
      </card>
    </div>
  </div>
</template>
<script>
import {BaseInput, BaseTable, BasePagination, Card} from "@/components";
import router from "@/router";
import swal from "sweetalert2";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    BaseInput,
    BaseTable,
    BasePagination,
    Card
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        models: [{}],
        data: {
          canAdd: false,
          currentPage: 1,
          total: 0,
          from: 0,
          to: 0,
          perPage: 10,
          links: []
        }
      },
      description: "Resource info"
    },
  },
  methods: {
    addModel() {
      if (!this.resource.data.canAdd) {
        swal.fire({
          title: this.$t('alert.assetFailedAdded'),
          text: this.$t('alert.basicTierAssetCount'),
          buttonsStyling: false,
          confirmButtonClass: "btn btn-info btn-fill",
          icon: "error",
        });
        return;
      }
      router.push({
        name: "Add Assets",
        params: {
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
  },
};
</script>
<style>
</style>
