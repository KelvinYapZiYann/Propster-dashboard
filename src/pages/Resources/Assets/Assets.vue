<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <div class="row">
      <div class="col-12">
        <div class="pro-feature alert alert-danger" v-if="userTier == 'BASIC' || userTier == 'USER_BASIC'">
          <strong>
            <!-- {{$t('component.proFeature1')}} 1 {{$t('sidebar.asset')}} {{$t('component.proFeature2')}} {{$t('component.proFeature3')}} 
            <a
              href="https://www.propster.io"
              target="_blank"
            >PRO</a>
            {{$t('component.proFeature4')}} {{$t('sidebar.assets')}}! -->
            {{$t('alert.basicTierAssetCount')}}
          </strong>
        </div>
      </div>
    </div>
    <assets-index-component
      :resource="resource"
      @getResource="getResource"
    ></assets-index-component>
  </div>
</template>
<script>
import AssetsIndexComponent from "@/components/Resources/Assets/AssetsIndexComponent";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    AssetsIndexComponent
  },
  data() {
    return {
      resource: {
        models: [],
        data: {}
      },
      userTier: this.$store.getters["users/model"].tier
    };
  },
  mounted() {
    if (!this.$store.getters["users/model"].tier) {
      this.$store.dispatch('users/get').then(() => {
        this.userTier = this.$store.getters["users/model"].tier;
      });
    }
    this.getResource();
  },
  methods: {
    async getResource() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('asset/get', {}).then(() => {
          this.resource.models = this.$store.getters["asset/models"]
          this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);

          // let models = this.$store.getters["asset/models"];

          // for (let i = 0; i < models.length; i++) {
          //   this.getAssetTenants(models, i, models[i].id);
          // }
        })
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    },
    // async getAssetTenants(models, id, assetId) {
    //   try {
    //     await this.$store.dispatch('asset/getTenants', assetId).then(() => {
    //       models[id]['tenantCount'] = this.$store.getters["asset/tenantData"].total;
    //       if (models.length - 1 == id) {
    //         this.resource.models = models;
    //         this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);
    //       }
    //     })
    //   } catch (e) {
    //     this.$notify({
    //       message: errorHandlingService.displayAlertFromServer(e),
    //       icon: 'tim-icons icon-bell-55',
    //       type: 'danger'
    //     });
    //   }
    // }
  }
};
</script>
<style>
</style>
