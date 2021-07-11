<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5 ml-auto">
        <div class="info-area info-horizontal mt-5">
          <div class="icon icon-warning">
            <i class="tim-icons icon-wifi"></i>
          </div>
          <div class="description">
            <h3 class="info-title">By register, you will experience how this tool can help you manage your property effectively.</h3>
          </div>
        </div>
        <div class="info-area info-horizontal">
          <div class="icon icon-primary">
            <i class="tim-icons icon-triangle-right-17"></i>
          </div>
          <div class="description">
            <h3 class="info-title">Free To Use If you're just started to manage your property</h3>
          </div>
        </div>
        <div class="info-area info-horizontal">
          <div class="icon icon-info">
            <i class="tim-icons icon-trophy"></i>
          </div>
          <div class="description">
            <h3 class="info-title">We will be helping you as much as needed to familiar and be productive in Propster.</h3>
          </div>
        </div>
      </div>

      <div class="col-md-7 mr-auto">
        <form @submit.prevent="register">
          <card class="card-register card-white">
            <template slot="header">
              <!-- <img
                class="card-img"
                src="img/card-primary.png"
                alt="Card image"
              /> -->
              <img src="img/main_propster_logo.svg" class="card-img" alt=""/>
              <h4 class="card-title text-center text-primary">PROPSTER.IO</h4>
            </template>

            <validation-error :errorsArray="apiValidationErrors.mobile_number" />
            <base-input
                v-model="mobile_number"
                placeholder="Mobile Number"
                addon-left-icon="tim-icons icon-mobile"
                type="text">
            </base-input>

            <validation-error :errorsArray="apiValidationErrors.email" />
            <base-input
                v-model="email"
                placeholder="Email"
                addon-left-icon="tim-icons icon-email-85"
                type="email">
            </base-input>

            <validation-error :errorsArray="apiValidationErrors.password"/>
            <base-input
                v-model="password"
                placeholder="Password"
                addon-left-icon="tim-icons icon-lock-circle"
                type="password">
            </base-input>

            <base-input
                placeholder="Confirm Password"
                type="password"
                name="Password confirmation"
                v-model="password_confirmation"
                addon-left-icon="tim-icons icon-lock-circle">
            </base-input>
            <validation-error :errorsArray="apiValidationErrors.password_confirmation" />

            <!-- <base-checkbox v-model="boolean" class="text-left">
              I agree to the <a href="#something">terms and conditions</a>.
            </base-checkbox> -->

            <div slot="footer">
              <base-button
                  native-type="submit"
                  slot="footer"
                  type="info"
                  block
                  size="lg"
              >
                Get Started
              </base-button>
              <div class="pull-left text-left">
                <h6>
                  <router-link class="link footer-link" to="/login">
                    Already have an account? Login
                  </router-link>
                </h6>
              </div>
            </div>
          </card>
        </form>
      </div>
    </div>
    <modal
      :show.sync="registerSuccessful"
      footerClasses="justify-content-center"
      type="notice"
    >
      <div class="instruction">
        <p class="description">
          Register Successfully
        </p>
        <p class="description">
          Please verify the email before logging in.
        </p>
      </div>
      <p class="text-center">
        If you have more questions, don't hesitate to contact us. We're here to help!
      </p>
      <p class="text-center">
        If you have not received any verification email, click the Resend Verification Email.
      </p>
      <div slot="footer" class="justify-content-center">
        <base-button
          type="info"
          round
          @click="resendVerificationEmail"
          >Resend Verification Email
        </base-button>
        <base-button
          type="info"
          round
          @click="backToLoginPage"
          >OK
        </base-button>
      </div>
    </modal>
  </div>
</template>
<script>
import { BaseCheckbox, Card, BaseInput, ValidationError, Modal } from "@/components";
import formMixin from "@/mixins/form-mixin";
import axios from "axios";

export default {
  components: {
    BaseCheckbox,
    Card,
    BaseInput,
    ValidationError,
    Modal
  },
  mixins: [formMixin],
  data() {
    return {
      mobile_number: null,
      boolean: false,
      email: null,
      password: null,
      password_confirmation: null,
      registerSuccessful: true,
    };
  },
  methods: {
    async register() {
      // if (!this.boolean) {
      //   await this.$notify({
      //     type: 'danger',
      //     message: 'You need to agree with our terms and conditions.',
      //     icon: 'tim-icons icon-bell-55',
      //   })
      //   return;
      // }

      const user = {
        mobile_number: this.mobile_number,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      };

      const requestOptions = {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
      };

      try {
        await this.$store.dispatch("register", { user, requestOptions });
        this.registerSuccessful = true;
        // this.$notify({
        //   type: 'succes',
        //   message: 'Successfully registered.',
        //   icon: 'tim-icons icon-bell-55',
        // })
        // this.$router.push({name: "login"});
      } catch (error) {
        this.$notify({
          type: 'danger',
          message: 'Oops, something went wrong!',
          icon: 'tim-icons icon-bell-55',
        })
        this.setApiValidation(error.response.data.errors);
      }
    },
    async backToLoginPage() {
      this.$router.push({name: "login"});
    },
    async resendVerificationEmail() {
      const url = process.env.VUE_APP_API_BASE_URL;
      axios({
        url: `${url}/api/dashboard/email-not-verified`,
        method: 'POST',
      }).then((response) => {
        this.$notify({
          type: 'success',
          message: 'Verification email has been resent. Check your email.',
          // icon: 'tim-icons icon-bell-55',
        })
      }).catch((error) => {
        this.$notify({
          type: 'danger',
          message: 'Something went wrong. Verification email has not been resent.',
          icon: 'tim-icons icon-bell-55',
        })
      });
    }
  }
};
</script>
<style></style>
