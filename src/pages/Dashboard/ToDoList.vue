<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <to-do-list-index-component
        :tableData="resource.todoListTableData"
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
        todoListTableData: [
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
        ]
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
