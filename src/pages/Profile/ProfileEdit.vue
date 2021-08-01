<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
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
          @cancel="handleCancel"
          :tmpApiValidationErrors="apiValidationErrors"
          addOrEdit="Edit"
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
    props: {
      previousRoute: {
        type: String,
        required: false,
        default: "",
        description: "Previous Route"
      }
    },
    mounted() {
      this.getProfile();
    },
    methods: {
      async getProfile() {
        try {
          await this.$store.dispatch('users/get', {}).then(() => {
            this.resource.model = Object.assign({}, this.$store.getters["users/model"])
            this.resource.data = Object.assign({}, this.$store.getters["users/data"])
            this.resource.selector = Object.assign({}, this.$store.getters["users/selector"])
          })
        } catch (e) {
          this.$notify({
            message:'Server error',
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        }
      },
      async handleCancel() {
        if (this.previousRoute) {
          this.$router.push({path: this.previousRoute});
        } else {
          this.$router.push({
            name: 'User Profile'
          });
        }
      },
      async handleSubmit(userData) {
        try {
          await this.$store.dispatch('users/update', userData).then(() => {
            this.resource.model = Object.assign({}, this.$store.getters["users/model"])
          })
          this.$notify({
            message:'Successfully Updated',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.resetApiValidation();
          if (this.previousRoute) {
            this.$router.push({path: this.previousRoute});
          } else {
            this.$router.push({
              name: 'User Profile'
            });
          }
        } catch (e) {
          this.$notify({
            message:'Server error',
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
          this.setApiValidation(e.response.data.errors)
        }
      }
    }
  }
</script>
<style>
</style>
