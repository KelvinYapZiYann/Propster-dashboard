<template>
  <div class="container">
    <div class=" col-md-6 ml-auto mr-auto">
        <card>
          <template slot="header">
            <h5 class="card-category text-left">Before we start..</h5>
            <h3 class="card-title text-left">Please Select A Role</h3>
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
                <i class="tim-icons icon-istanbul"></i>Landlord
              </span>
              Having the access to multiple features such as Tenant management, Asset Managements
              and Assets Analytics.<br /><br />
              You will be able to select another role later.
            </tab-pane>

            <tab-pane>
              <span slot="label" @click="selectRole('TENANT')">
                <i class="tim-icons icon-single-02"></i>Tenant
              </span>
              Having access to pay rents, scheduling time with Vendors and Landlords
              <br /><br />You will be able to select another role later.
            </tab-pane>

            <tab-pane>
              <span slot="label" @click="selectRole('AGENT')">
                <i class="fa fa-user-secret"></i>Agent
              </span>
              Having access to manage multiple landlords, and to all the features provided to landlords.
              <br /><br />You will be able to select another role later.
            </tab-pane>

            <tab-pane>
              <span slot="label" @click="selectRole('VENDOR')">
                <i class="fa fa-industry"></i>Vendor
              </span>
              Having access to collect fee from agents, landlords or tenants.
              <br /><br />You will be able to select another role later.
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
              Select Role
            </base-button>
            <div class="pull-left text-left">
              <h6>
                <base-checkbox v-model="rememberSetting" class="text-left">
                  Remember this setting
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
      rememberSetting: false,
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
      try {
        let data = {
          "role": this.selectedRole,
          "remember_role": this.rememberSetting
        };

        await this.$store.dispatch('selectRole/submit', data)
        router.push({ path: "/dashboard" });
      } catch (e) {
        this.$notify({
          message: 'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
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
