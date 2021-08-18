<template>
  <div class="container">
    <div class=" col-md-10 ml-auto mr-auto">
        <card>
          <template slot="header">
            <!-- <h5 class="card-category text-left">Before we start..</h5> -->
            <h3 class="card-title text-left">{{$t('selectRole.title')}}</h3>
          </template>
          <tabs
              type="info"
              tabNavWrapperClasses="col-12"
              tabNavButtonClasses="col-lg-3 col-md-6 col-sm-6"
              tabContentClasses="col-12 mt-5"
              vertical
              square
              class="row text-left"
          >
            <tab-pane>
              <span slot="label" @click="selectRole('LANDLORD')">
                <i class="tim-icons icon-istanbul"></i>
                  {{$t('selectRole.landlord')}}
              </span>
              {{$t('selectRole.landlordDesc')}}
              <br /><br />
              {{$t('selectRole.changeRoleLater')}}
            </tab-pane>

            <tab-pane>
              <span slot="label" @click="selectRole('TENANT')">
                <i class="tim-icons icon-single-02"></i>{{$t('selectRole.tenant')}}
              </span>
              {{$t('selectRole.tenantDesc')}}
              <br /><br />
              {{$t('selectRole.changeRoleLater')}}
            </tab-pane>

            <tab-pane>
              <span slot="label" @click="selectRole('AGENT')">
                <i class="fa fa-user-secret"></i>{{$t('selectRole.agent')}}
              </span>
              {{$t('selectRole.agentDesc')}}
              <br /><br />
              {{$t('selectRole.changeRoleLater')}}
            </tab-pane>

            <tab-pane>
              <span slot="label" @click="selectRole('VENDOR')">
                <i class="fa fa-industry"></i>{{$t('selectRole.vendor')}}
              </span>
              {{$t('selectRole.vendorDesc')}}
              <br /><br />
              {{$t('selectRole.changeRoleLater')}}
            </tab-pane>
          </tabs>

          <div slot="footer">
            <base-button
                @click="submitRole"
                slot="footer"
                type="info"
                block
                size="lg"
            >
              {{$t('selectRole.selectRole')}}
            </base-button>
            <div class="pull-left text-left">
              <h6>
                <base-checkbox v-model="rememberSetting" class="text-left">
                  {{$t('selectRole.remeberThisSetting')}}
                </base-checkbox>
              </h6>
            </div>
          </div>
        </card>
    </div>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import router from "@/router";
import errorHandlingService from "@/store/services/error-handling-service";

import {
  Card,
  TabPane,
  Tabs,
  BaseCheckbox, 
  BaseInput
} from "@/components/index";

export default {
  mixins: [formMixin],
  components: {
    Card,
    ValidationError,
    TabPane,
    Tabs,
    BaseCheckbox,
    BaseInput
  },
  data() {
    return {
      rememberSetting: true,
      selectedRole: 'LANDLORD',
    };
  },
  methods: {
    selectRole(selectedRole) {
      this.selectedRole = selectedRole;
    },
    async submitRole() {
      if (this.selectedRole != 'LANDLORD') {
        this.$notify({
          message: 'This role is not yet developed. Please stay tuned.',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
        return;
      }
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        let data = {
          "role": this.selectedRole,
          "remember_role": this.rememberSetting
        };

        await this.$store.dispatch('selectRole/submit', data)
        this.$notify({
          message:'Successfully Updated',
          icon: 'tim-icons icon-bell-55',
          type: 'success'
        });
        router.push({ path: "/dashboard" });
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
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
