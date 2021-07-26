<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <div class="row">
      <div class="col-12">
        <div class="pro-feature alert alert-danger" v-if="$store.getters['users/model'].tier == 'BASIC'">
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

export default {
  components: {
    AssetsIndexComponent
  },
  data() {
    return {
      resource: {
        models: [{}],
        data: {}
      },
    };
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('asset/get', {}).then(() => {
          this.resource.models = this.$store.getters["asset/models"]
          this.resource.data = Object.assign({}, this.$store.getters["asset/data"])
        })
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    }
  }
};
</script>
<style>
</style>
