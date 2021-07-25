<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <form @submit.prevent="forgotPassword">
        <card class="card-login card-white text-left">
          <template slot="header">
            <!-- <img src="img/card-primary.png" class="card-img" alt=""/> -->
            <img src="img/main_propster_logo.svg" class="card-img" alt=""/>
            <h1 class="card-title text-center text-primary" style="font-size: 2em;font-weight: 900;">PROPSTER.IO</h1>
          </template>

          <div>
            <!-- <validation-error :errorsArray="apiValidationErrors.email"/> -->
            <base-input
                v-validate="'required|email'"
                name="email"
                v-model="model.email"
                :placeholder="$t('forgotPassword.email')"
                addon-left-icon="tim-icons icon-email-85"
                :error="apiValidationErrors.email ? apiValidationErrors.email[0] : ''"
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
              {{$t('forgotPassword.forgotPassword')}}
            </base-button>
            <div class="pull-left">
              <h6>
                <router-link class="link footer-link" to="/login" v-slot="{ navigate, href }" custom>
                  <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">{{$t('forgotPassword.backToLogin')}}</a>
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
        email: "",
      }
    };
  },
  methods: {
    async forgotPassword() {
      try {
        await this.$store.dispatch('forgotPassword', {
          email: this.model.email,
          // redirect_url: router.currentRoute.fullPath,
        }).then(() => {
          swal({
            title: `Success`,
            text: this.$t('forgotPassword.forgotPasswordSuccessfully'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            type: "success"
          }).then(() => {
            router.push({ path: "/login" });
          });
        });
      } catch (e) {
        this.$notify({
          message: 'Oops, Something went wrong.',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
        this.setApiValidation(e.response.data.errors)
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
