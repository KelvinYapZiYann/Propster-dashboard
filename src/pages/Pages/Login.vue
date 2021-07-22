<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <form @submit.prevent="login">
        <card class="card-login card-white">
          <template slot="header">
            <!-- <img src="img/card-primary.png" class="card-img" alt=""/> -->
            <img src="img/main_propster_logo.svg" class="card-img" alt=""/>
            <h1 class="card-title text-info text-center">PROPSTER.IO</h1>
          </template>

          <div>
            <!-- <validation-error :errorsArray="apiValidationErrors.email"/> -->
            <base-input
                v-validate="'required|email'"
                name="email"
                v-model="model.email"
                :placeholder="$t('login.email')"
                addon-left-icon="tim-icons icon-email-85"
                :error="apiValidationErrors.email ? apiValidationErrors.email[0] : ''"
            >
            </base-input>

            <!-- <validation-error :errorsArray="apiValidationErrors.password"/> -->
            <base-input
                v-validate="'required|min:5'"
                name="password"
                v-model="model.password"
                type="password"
                :placeholder="$t('login.password')"
                addon-left-icon="tim-icons icon-lock-circle"
                :error="apiValidationErrors.password ? apiValidationErrors.password[0] : ''"
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
              {{$t('login.login')}}
            </base-button>
            <div class="pull-left">
              <h6>
                <router-link class="link footer-link" to="/register" v-slot="{ navigate, href }" custom>
                  <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">{{$t('login.createAccount')}}</a>
                </router-link>
              </h6>
            </div>
            <div class="pull-right">
              <h6>
                <router-link class="link footer-link" to="/forgot-password" v-slot="{ navigate, href }" custom>
                  <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">{{$t('login.forgotPassword')}}</a>
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
import ValidationError from "@/components/ValidationError.vue";
import errorHandlingService from "@/store/services/error-handling-service";
// import router from "@/router";

export default {
  mixins: [formMixin],
  components: {
    Card,
    BaseInput,
    ValidationError
  },
  data() {
    return {
      model: {
        email: "",
        password: "",
        subscribe: true
      }
    };
  },
  methods: {
    async login() {
      const user = {
        email: this.model.email,
        password: this.model.password
      }

      const requestOptions = {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        }
      }

      try {
        await this.$store.dispatch("login", {user, requestOptions});
      } catch (e) {
        this.$notify({
          message: 'Invalid credentials!',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
        this.setApiValidation(e.response.data.errors);
        return;
      }

      // try {
      //   await this.$store.dispatch("verifyMiddleware");
      // } catch (e) {
      //   errorHandlingService.verifyErrorFromServer(e);
      //   return;
      // }

      this.$router.push({path: "/dashboard"});
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
