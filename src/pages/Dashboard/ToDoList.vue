<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <div class="row">
        <div class="col-12">
          <div class="pro-feature alert alert-danger">
            <strong>
              {{$t('alert.featureDeveloping')}}
            </strong>
          </div>
        </div>
      </div>
    <to-do-list-index-component
        :resource="resource"
    ></to-do-list-index-component>
  </div>
</template>
<script>
import ToDoListIndexComponent from "@/pages/Dashboard/ToDoListIndexComponent";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    ToDoListIndexComponent
  },
  data() {
    return {
      resource: {
        models: [
            {
            title: "Contact Vendor",
            description: "Contact Wi-Fi provider to fix the internet issue.",
            done: false
            },
            {
            title: "Contact Tenant",
            description: "Contact tenant to confirm if he want to extend his contract.",
            done: true
            },
            {
            title: "Replace Table",
            description: "Buy a new table for tenant that is broken.",
            done: false
            }
        ],
        data: {
          currentPage: 1,
          total: 0,
          from: 0,
          to: 0,
          perPage: 10,
          links: []
        }
      },
    };
  },
  mounted() {
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
        // await this.$store.dispatch('asset/get', {}).then(() => {
        //   this.resource.models = this.$store.getters["asset/models"]
        //   this.resource.data = Object.assign({}, this.$store.getters["asset/data"])
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
