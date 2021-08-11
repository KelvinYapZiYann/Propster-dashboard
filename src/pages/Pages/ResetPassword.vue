<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <form @submit.prevent="resetPassword">
        <card class="card-login card-white text-left">
          <template slot="header">
            <!-- <img src="img/card-primary.png" class="card-img" alt=""/> -->
            <img src="img/main_propster_logo.svg" class="card-img" alt=""/>
            <h1 class="card-title text-center text-primary" style="font-size: 2em;font-weight: 900;">PROPSTER.IO</h1>
          </template>

          <div>
            <!-- <validation-error :errorsArray="apiValidationErrors.password"/> -->
            <base-input
                v-validate="'required|min:5'"
                name="password"
                v-model="model.password"
                type="password"
                :placeholder="$t('resetPassword.password')"
                addon-left-icon="tim-icons icon-lock-circle"
                :error="apiValidationErrors.password ? apiValidationErrors.password[0] : ''"
            >
            </base-input>
            <base-input
                v-validate="'required|min:5'"
                name="password"
                v-model="model.password_confirmation"
                type="password"
                :placeholder="$t('resetPassword.confirmPassword')"
                addon-left-icon="tim-icons icon-lock-circle"
                :error="apiValidationErrors.password_confirmation ? apiValidationErrors.password_confirmation[0] : ''"
            >
            </base-input>
          </div>

          <div slot="footer">
            <base-button
                native-type="submit"
                type="info"
                class="mb-3"
                size="lg"
                block
            >
              {{$t('resetPassword.resetPassword')}}
            </base-button>
            <div class="pull-left">
              <h6>
                <router-link class="link footer-link" to="/login" v-slot="{ navigate, href }" custom>
                  <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">{{$t('resetPassword.backToLogin')}}</a>
                </router-link>
              </h6>
            </div>
          </div>
        </card>
      </form>
    </div>
  </div>
</template>
<script>
import {Card, BaseInput} from "@/components/index";
import formMixin from "@/mixins/form-mixin";
// import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import swal from "sweetalert2";

export default {
  mixins: [formMixin],
  components: {
    Card,
    BaseInput,
    // ValidationError
  },
  data() {
    return {
      model: {
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    async resetPassword() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch("resetPassword", {
            email: router.currentRoute.query.email,
            password: this.model.password,
            password_confirmation: this.model.password_confirmation,
            token: router.currentRoute.params.token
        });
        swal({
          title: `Success`,
          text: this.$t('resetPassword.resetPasswordSuccessfully'),
          buttonsStyling: false,
          confirmButtonClass: "btn btn-info btn-fill",
          type: "success"
        }).then(() => {
            router.push({ path: "/login" });
        });
      } catch (e) {
        this.$notify({
          message: 'Oops, Something went wrong.',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
        this.setApiValidation(e.response.data.errors)
      } finally {
        loader.hide();
      }
    }
  }
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
