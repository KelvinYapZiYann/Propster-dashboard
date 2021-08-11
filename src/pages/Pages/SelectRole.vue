<template>
  <div class="container">
    <div class=" col-md-6 ml-auto mr-auto">
        <card>
          <template slot="header">
            <!-- <h5 class="card-category text-left">Before we start..</h5> -->
            <h3 class="card-title text-left">{{$t('selectRole.title')}}</h3>
          </template>
          <tabs
              type="info"
              tabNavWrapperClasses="col-lg-3 col-md-6"
              tabContentClasses="col-md-8"
              vertical
              square
              class="row text-left"
          >
            <tab-pane>
              <span slot="label" @click="selectRole('LANDLORD')">
                <i class="tim-icons icon-istanbul"></i>{{$t('selectRole.landlord')}}
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
                round
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
import {Card} from "@/components/index";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import { BaseCheckbox, BaseInput } from "@/components/index";
import router from "@/router";
import errorHandlingService from "@/store/services/error-handling-service";

import {
  TabPane,
  Tabs,
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
