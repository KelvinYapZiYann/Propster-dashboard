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
            try {
                await this.$store.dispatch('createProfile/submit', userData);
                this.$notify({
                    message:'Successfully Updated',
                    icon: 'tim-icons icon-bell-55',
                    type: 'success'
                });
                this.resetApiValidation();
                this.$router.push({name: "Select Role"});
            } catch (e) {
              if (e.response.data.message) {
                if (e.response.data.message == 'profile already filled.') {
                  this.resetApiValidation();
                  this.$router.push({name: "Select Role"});
                  return;
                }
              }
                this.$notify({
                    message:'Server error',
                    icon: 'tim-icons icon-bell-55',
                    type: 'danger'
                });
                this.setApiValidation(e.response.data.errors);
            }
        }
    }
  }
</script>
<style>
</style>
