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
import ToDoListIndexComponent from "@/components/Resources/ToDoList/ToDoListIndexComponent";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    ToDoListIndexComponent
  },
  data() {
    return {
      resource: {
        models: [],
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
    this.getTodoList();
  },
  methods: {
    async getTodoList() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('todoList/get', {}).then(() => {
          this.resource.models = this.$store.getters["todoList/models"]
          this.resource.data = Object.assign({}, this.$store.getters["todoList/data"])
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
    }
  }
};
</script>
<style>
</style>
