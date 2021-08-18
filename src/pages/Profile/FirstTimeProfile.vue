<template>
  <div class="content">
    <!-- <div class="row">
      <div class="col-md-8">
        <user-card :model="model"></user-card>
      </div>
    </div> -->
    <div class="row justify-content-center">
      <div class="col-md-8">
        <edit-profile-form 
          :model="model"
          @submit="handleSubmit"
          :tmpApiValidationErrors="apiValidationErrors"
          addOrEdit="Add"
          >
        </edit-profile-form>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from "@/pages/Profile/EditProfileForm";
//   import UserCard from "@/pages/Profile/UserCard";
  import formMixin from "@/mixins/form-mixin";
  import ValidationError from "@/components/ValidationError.vue";
  import errorHandlingService from "@/store/services/error-handling-service";

  export default {
    mixins: [formMixin],
    components: {
      EditProfileForm,
    //   UserCard,
      ValidationError
    },
    data() {
      return {
        model: {
            first_name: "",
            last_name: "",
            phone_country_code: "",
            phone_number: "",
            date_of_birth: "",
            is_business: false,
            gender: "",
        }
      }
    },
    mounted() {

    },
    methods: {
        async handleSubmit(userData) {
            let loader = this.$loading.show({
              canCancel: false,
              color: '#1d8cf8',
              loader: 'spinner',
            });
            try {
              let data = {
                "role": 'LANDLORD',
                "remember_role": true
              };

              await this.$store.dispatch('selectRole/submit', data).then(() => {
                 this.$store.dispatch('createProfile/submit', userData).then(() => {
                   this.$notify({
                      message:'Successfully Updated',
                      icon: 'tim-icons icon-bell-55',
                      type: 'success'
                  });
                  this.resetApiValidation();
                  this.$router.push({name: "Select Role"});
                 }).catch((e)=> {
                   if (e.response.data.message) {
                    if (e.response.data.message == 'profile already filled.') {
                      this.resetApiValidation();
                      this.$router.push({name: "Select Role"});
                      return;
                    }
                  }
                  this.$notify({
                    message: errorHandlingService.displayAlertFromServer(e),
                    icon: 'tim-icons icon-bell-55',
                    type: 'danger'
                  });
                  this.setApiValidation(e.response.data.errors);
                 });
              });
            } catch (e) {
              if (e.response.data.message) {
                if (e.response.data.message == 'profile already filled.') {
                  this.resetApiValidation();
                  this.$router.push({name: "Select Role"});
                  return;
                }
              }
                this.$notify({
                  message: errorHandlingService.displayAlertFromServer(e),
                  icon: 'tim-icons icon-bell-55',
                  type: 'danger'
                });
                this.setApiValidation(e.response.data.errors);
            } finally {
              loader.hide();
            }
        }
    }
  }
</script>
<style>
</style>
