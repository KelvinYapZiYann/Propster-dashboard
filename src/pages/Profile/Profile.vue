<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <div class="row">
      <div class="col-md-12">
        <user-card :model="resource.model"></user-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <edit-profile-form 
          :model="resource.model"
          @submit="handleSubmit"
          :tmpApiValidationErrors="apiValidationErrors"
          addOrEdit="View"
          >
        </edit-profile-form>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from "@/pages/Profile/EditProfileForm";
  import UserCard from "@/pages/Profile/UserCard";
  import formMixin from "@/mixins/form-mixin";
  import ValidationError from "@/components/ValidationError.vue";
  import errorHandlingService from "@/store/services/error-handling-service";

  export default {
    mixins: [formMixin],
    components: {
      EditProfileForm,
      UserCard,
      ValidationError
    },
    data() {
      return {
        resource: {
          model: {},
          data: {},
          selector: {}
        },
      }
    },
    mounted() {
      this.getProfile();
    },
    methods: {
      async getProfile() {
        let loader = this.$loading.show({
          canCancel: false,
          color: '#1d8cf8',
          loader: 'spinner',
        });
        try {
          await this.$store.dispatch('users/get', {}).then(() => {
            this.resource.model = Object.assign({}, this.$store.getters["users/model"])
            this.resource.data = Object.assign({}, this.$store.getters["users/data"])
            this.resource.selector = Object.assign({}, this.$store.getters["users/selector"])
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
      async handleSubmit() {
        this.$router.push({
          name: 'User Profile Edit',
          params: {
            previousRoute: this.$router.currentRoute.fullPath
          }
        });
        // try {
        //   await this.$store.dispatch('users/update', userData).then(() => {
        //     this.resource.model = Object.assign({}, this.$store.getters["users/model"])
        //   })
        //   this.$notify({
        //     message:'Successfully Updated',
        //     icon: 'tim-icons icon-bell-55',
        //     type: 'success'
        //   });
        //   this.resetApiValidation();
        // } catch (e) {
          // this.$notify({
          //   message: errorHandlingService.displayAlertFromServer(e),
          //   icon: 'tim-icons icon-bell-55',
          //   type: 'danger'
          // });
        //   this.setApiValidation(e.response.data.errors)
        // }
      }
    }
  }
</script>
<style>
</style>
