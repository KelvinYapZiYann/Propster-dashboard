<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6 ml-auto">
        <div class="info-area info-horizontal mt-5">
          <div class="icon icon-warning">
            <i class="tim-icons icon-wifi"></i>
          </div>
          <div class="description">
            <h3 class="info-title">{{$t('register.desc1')}}</h3>
          </div>
        </div>
        <div class="info-area info-horizontal">
          <div class="icon icon-primary">
            <i class="tim-icons icon-triangle-right-17"></i>
          </div>
          <div class="description">
            <h3 class="info-title">{{$t('register.desc2')}}</h3>
          </div>
        </div>
        <div class="info-area info-horizontal">
          <div class="icon icon-info">
            <i class="tim-icons icon-trophy"></i>
          </div>
          <div class="description">
            <h3 class="info-title">{{$t('register.desc3')}}</h3>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-5 col-md-6 mr-auto">
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

            <VuePhoneNumberInput 
                      v-model="phone_number" 
                      :default-country-code="phoneCountryCodeInput"
                      @update="updatePhoneNumber"
                      :no-example="false"
                      color="#1d8cf8"
                      valid-color="#1d8cf8"
                      error-color="#1d8cf8"
                      :show-code-on-list="true"
                      :only-countries="['MY']"
                      class="pb-2"
                      />
            <!-- <base-input
                v-model="mobile_number"
                placeholder="Mobile Number"
                addon-left-icon="tim-icons icon-mobile"
                type="text">
            </base-input> -->
            <validation-error :errorsArray="apiValidationErrors.mobile_number" />

            <base-input
                v-model="email"
                :placeholder="$t('register.email')"
                addon-left-icon="tim-icons icon-email-85"
                type="email"
                :error="apiValidationErrors.email ? apiValidationErrors.email[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="apiValidationErrors.email" /> -->

            <base-input
                v-model="password"
                :placeholder="$t('register.password')"
                addon-left-icon="tim-icons icon-lock-circle"
                type="password"
                :error="apiValidationErrors.password ? apiValidationErrors.password[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="apiValidationErrors.password"/> -->

            <base-input
                :placeholder="$t('register.confirmPassowrd')"
                type="password"
                name="Password confirmation"
                v-model="password_confirmation"
                addon-left-icon="tim-icons icon-lock-circle"
                :error="apiValidationErrors.password_confirmation ? apiValidationErrors.password_confirmation[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="apiValidationErrors.password_confirmation" /> -->

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
                {{$t('register.register')}}
              </base-button>
              <div class="pull-left text-left">
                <h6>
                  <router-link class="link footer-link" to="/login" v-slot="{ navigate, href }" custom>
                    <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">{{$t('register.login')}}</a>
                  </router-link>
                </h6>
              </div>
            </div>
          </card>
        </form>
      </div>
    </div>
    <!-- <modal
      :show.sync="registerSuccessful"
      footerClasses="justify-content-center"
      type="notice"
    >
      <div class="instruction">
        <p class="description">
          {{$t('register.registerSuccessfully')}}
        </p>
        <p class="description">
          {{$t('register.verifyEmail')}}
        </p>
      </div>
      <p class="text-center">
        {{$t('register.moreQuestions')}}
      </p>
      <p class="text-center">
        {{$t('register.noVerificationEmail')}}
      </p>
      <div slot="footer" class="justify-content-center">
        <base-button
          type="info"
          round
          @click="resendVerificationEmail"
          >{{$t('register.resendVerificationEmail')}}
        </base-button>
        <base-button
          type="info"
          round
          @click="backToLoginPage"
          >OK
        </base-button>
      </div>
    </modal> -->
  </div>
</template>
<script>
import { BaseCheckbox, Card, BaseInput, ValidationError, Modal } from "@/components";
import formMixin from "@/mixins/form-mixin";
import axios from "axios";
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import swal from "sweetalert2";

export default {
  components: {
    BaseCheckbox,
    Card,
    BaseInput,
    ValidationError,
    Modal,
    VuePhoneNumberInput
  },
  mixins: [formMixin],
  data() {
    return {
      phone_number: null,
      boolean: false,
      email: null,
      password: null,
      password_confirmation: null,
      // registerSuccessful: false,
      phoneCountryCodeInput: "MY",
    };
  },
  mounted() {
    this.phoneCountryCodeInput = "MY";
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
        mobile_number: this.phone_number,
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
        await this.$store.dispatch("register", { user, requestOptions }).then(() => {
          this.resetApiValidation();
          swal({
            title: this.$t('register.registerSuccessfully'),
            text: this.$t('register.registerSuccessfullyText') + ' ' + this.$t('register.verifyEmail') + ' ' + this.$t('register.moreQuestions'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            type: "success",
          }).then((result) => {
            this.$router.push({name: "login"});
          });
        });
        // this.registerSuccessful = true;
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
      
    },
    updatePhoneNumber(event) {
      // this.phone_country_code = event.countryCallingCode;
    }
  }
};
</script>
<style></style>
