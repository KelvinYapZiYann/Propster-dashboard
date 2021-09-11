<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <div class="header text-center"><h3 class="title">{{$t('topbar.notifications')}}</h3></div>
    <div class="row">
        <div class="col-12">
            <div class="pro-feature alert alert-danger">
                <strong>
                    {{$t('alert.featureDeveloping')}}
                </strong>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
  },
  data() {
    return {
      
    };
  },
  mounted() {
    this.getNotifications();
  },
  methods: {
    async getNotifications() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        // await this.$store.dispatch('asset/get', {}).then(() => {

        //   let models = this.$store.getters["asset/models"];

        //   for (let i = 0; i < models.length; i++) {
        //     this.getAssetTenants(models, i, models[i].id);
        //   }
        // })
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    }
  }
};
</script>
<style>
</style>
