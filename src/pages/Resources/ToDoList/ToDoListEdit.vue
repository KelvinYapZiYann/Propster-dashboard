<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <to-do-list-add-or-edit
      :resource="resource"
      :tmpApiValidationErrors="apiValidationErrors"
      addOrEdit="Edit"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
    </to-do-list-add-or-edit>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import ToDoListAddOrEdit from "@/components/Resources/ToDoList/ToDoListAddOrEdit";
import swal from "sweetalert2";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    ToDoListAddOrEdit,
  },
  data() {
    return {
      resource: {
        model: {},
        data: {},
        // selector: {}
      },
    };
  },
  props: {
    previousRoute: {
      type: String,
      required: false,
      default: "",
      description: "Previous Route"
    }
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
        await this.$store.dispatch('todoList/getById', this.$route.params.todoListId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["todoList/model"])
          this.resource.data = Object.assign({}, this.$store.getters["todoList/data"])
        //   this.resource.selector = Object.assign({}, this.$store.getters["todoList/selector"])
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
    async handleSubmit(model) {
      swal.fire({
        title: this.$t('alert.confirmEdit'),
        text: this.$t('alert.confirmEditText'),
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: this.$t('component.yes'),
        cancelButtonText: this.$t('component.no'),
        cancelButtonClass: "btn btn-neutral btn-fill",
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "info",
      }).then((result) => {
        if (result.value) {
          const todoListId = this.$route.params.todoListId;
          if (!todoListId) {
            this.$notify({
                message: errorHandlingService.displayAlertFromServer(e),
                icon: 'tim-icons icon-bell-55',
                type: 'danger'
            });
          } else {
            this.$store.dispatch('todoList/update', {'todoListId': todoListId, 'model': model}).then(() => {
              this.$notify({
                message:'Successfully Updated',
                icon: 'tim-icons icon-bell-55',
                type: 'success'
              });
              this.resetApiValidation();
              if (this.previousRoute) {
                router.push({path: this.previousRoute});
              } else {
                router.go(-1);
              }
            }).catch((e) => {
              this.$notify({
                message: errorHandlingService.displayAlertFromServer(e),
                icon: 'tim-icons icon-bell-55',
                type: 'danger'
              });
              this.setApiValidation(e.response.data.errors)
            });
          }
        }
      });
    },
    async handleCancel() {
      if (this.previousRoute) {
        router.push({path: this.previousRoute});
      } else {
        router.go(-1);
      }
    },
  }
}
</script>
<style>
</style>
