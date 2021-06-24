<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <user-card :model="resource.model"></user-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <edit-profile-form :model="resource.model"></edit-profile-form>
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
    }
  }
</script>
<style>
</style>
