<template>
      <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
        <base-detail-list
          :title="$t('property.tenantDetails')"
          :model="resource.model"
          :headers="table.detailHeaders"
          :headers2="table.detailHeaders2"
          :detailDisplayValue="table.detailDisplayValue"
          thead-classes="text-primary"
        ></base-detail-list>

        <assets-index-component
          :resource="assetResource"
          :query="{
            tenantId: this.tenantId,
            assetId: this.assetId,
          }"
        ></assets-index-component>

        <div class="pro-feature alert alert-danger" v-if="tenureContractResource.models.length == 0">
          <strong>
            {{$t('alert.noTenureContractAlert')}}
          </strong>
        </div>

        <tenure-contract-index-component
          :resource="tenureContractResource"
          :query="{
            tenantId: this.tenantId,
            assetId: this.assetId,
          }"
          :assetId="assetId"
          :tenantId="tenantId"
          :tableData="{'rowColor': tenureContractRowColor}"
          @assetIdChange="assetIdChange"
          @tenantIdChange="tenantIdChange"
        ></tenure-contract-index-component>

        <div class="pro-feature alert alert-danger" v-if="billingRecordResource.models.length == 0">
          <strong>
            {{$t('alert.noBillingRecordAlert')}}
          </strong>
        </div>

        <billing-record-index-component
          :resource="billingRecordResource"
          :query="{
            tenantId: this.tenantId,
            assetId: this.assetId,
          }"
          :tableData="{'rowColor': billingRecordRowColor}"
        ></billing-record-index-component>

        <billing-payment-index-component
          :isBillingRecordsPayment="false"
          :resource="billingPaymentResource"
          :query="{
            tenantId: this.tenantId,
            assetId: this.assetId,
          }"
        ></billing-payment-index-component>
        
        <payment-record-index-component
          :resource="paymentRecordResource"
          :query="{
            tenantId: this.tenantId,
            assetId: this.assetId,
          }"
          :tableData="{'columnsClass': columnsClass}"
        ></payment-record-index-component>

        <!-- <fab
          position="bottom-right"
          bg-color="#1d8cf8"
          :actions="fabActions"
          fixed-tooltip="true"
          @tenantPayment="addTenantPaymentRecord"
          @tenantBilling="addTenantBillingRecord"
        ></fab> -->

        <base-button slot="footer" type="info" @click="handleBack()" fill>{{$t('component.back')}}</base-button>
        <base-button slot="footer" type="info" @click="handleEdit()" fill>{{$t('component.edit')}} {{$t('sidebar.tenant')}}</base-button>
      </div>
</template>
<script>
import { BaseDetailList, Card } from "@/components";
import AssetExpensesIndexComponent from "@/components/Resources/AssetExpenses/AssetExpensesIndexComponent";
import AssetsIndexComponent from "@/components/Resources/Assets/AssetsIndexComponent";
import TenureContractIndexComponent from "@/components/Resources/TenureContracts/TenureContractIndexComponent";
import BillingRecordIndexComponent from "@/components/Resources/BillingRecords/BillingRecordIndexComponent";
import BillingPaymentIndexComponent from "@/components/Resources/BillingPayments/BillingPaymentIndexComponent";
import PaymentRecordIndexComponent from "@/components/Resources/PaymentRecords/PaymentRecordIndexComponent";
import fab from "vue-fab";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    AssetsIndexComponent,
    BaseDetailList,
    AssetExpensesIndexComponent,
    TenureContractIndexComponent,
    BillingRecordIndexComponent,
    BillingPaymentIndexComponent,
    PaymentRecordIndexComponent,
    Card,
    fab
  },
  data() {
    return {
      // modelId: this.$route.params.tenantId,
      resource: {
        model: {},
        data: {}
      },
      assetResource: {
        models: [],
        data: {}
      },
      tenureContractResource: {
        models: [],
        data: {},
        selector: {}
      },
      tenureContractRowColor: [],
      billingRecordRowColor: [],
      billingRecordResource: {
        models: [],
        data: {},
        selector: {}
      },
      billingPaymentResource: {
        models: [],
        data: {},
        selector: {}
      },
      paymentRecordResource: {
        models: [],
        data: {}
      },
      columnsClass: [
        {name:"status", class:[]},
        {name:"cash_flow_direction", class:[]},
      ],
      userResource: {
        model: {},
      },
      table: {
        detailHeaders: {
          first_name: this.$t('property.firstName'),
          last_name: this.$t('property.lastName'),
          email: this.$t('property.email'),
          phone_number: this.$t('property.phoneNumber'),
          identification_type: this.$t('property.idType'),
          identification_number: this.$t('property.idNumber'),
        },
        detailHeaders2: {
          gender: this.$t('property.gender'),
          is_business: this.$t('property.isBusiness'),
          date_of_birth: this.$t('property.dateOfBirth'),
          // reputation: "Reputation",
          salary_range: this.$t('property.salaryRange'),
          occupation_type: this.$t('property.occupation'),
        },
        detailDisplayValue: {
          identification_type: {
            NRIC: "IC Number",
            PASSPORT: "Passport",
          },
          gender: {
            MALE: "Male",
            FEMALE: "Female",
          },
          is_business: {
            true: "Yes",
            false: "No",
          },
          salary_range: {
            "NO_INCOME": "No Income",
            "1_TO_5000": "RM 1 to RM 5000",
            "5001_TO_10000": "RM 5001 to RM 10000",
            "ABOVE_10000": "Above RM 10000"
          },
          occupation_type: {
            EMPLOYED: "Employed",
            FREELANCER_OR_PART_TIMER: "Freelancer/Part Timer",
            SELF_EMPLOYED: "Self Employed",
            STUDENT: "Student"
          }
        },
      },
      fabActions: [
        {
          name: 'tenantBilling',
          icon: 'payment',
          tooltip: this.$t('component.tenantBilling')
        },
        {
          name: 'tenantPayment',
          icon: 'history',
          tooltip: this.$t('component.tenantPayment')
        }
      ],
      tenantId: this.$route.params.tenantId,
      assetId: this.$route.query ? (this.$route.query.assetId ? this.$route.query.assetId : null) : null,
    };
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
    this.getResource();
  },
  methods: {
    async getResource() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('tenant/getById',  this.tenantId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenant/model"])
          this.resource.data = Object.assign({}, this.$store.getters["tenant/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenant/selector"])
        })

        await this.$store.dispatch('tenant/getAssets',  this.tenantId).then(() => {
          // this.assetResource.models = this.$store.getters["tenant/assetModels"]
          let models = this.$store.getters["tenant/assetModels"];
          for (let i = 0; i < models.length; i++) {
            this.getAssetTenants(models, i, models[i].id);
          }
        })

        await this.$store.dispatch('tenant/getTenureContracts',  this.tenantId).then(() => {
          this.tenureContractResource.models = this.$store.getters["tenant/tenureContractModels"]
          this.tenureContractResource.data = Object.assign({}, this.$store.getters["tenant/tenureContractData"])
          this.tenureContractRowColor = [];
          let today = new Date();
          for (let i = 0; i < this.tenureContractResource.models.length; i++) {
            let date = new Date(this.tenureContractResource.models[i].tenure_end_date);
            if (date > today) {
              this.tenureContractRowColor.push({});
            } else {
              this.tenureContractRowColor.push({'backgroundColor': '#00000011'});
            }
          }
        })

        await this.$store.dispatch('tenant/getBillingRecords', this.tenantId).then(() => {
          this.billingRecordResource.models = this.$store.getters["tenant/billingRecordModels"]
          this.billingRecordResource.data = Object.assign({}, this.$store.getters["tenant/billingRecordData"])
          this.billingRecordRowColor = [];
          let today = new Date();
          for (let i = 0; i < this.billingRecordResource.models.length; i++) {
            let date = new Date(this.billingRecordResource.models[i].billing_end_at);
            if (date > today) {
              this.billingRecordRowColor.push({});
            } else {
              this.billingRecordRowColor.push({'backgroundColor': '#00000011'});
            }
          }
        })

        await this.$store.dispatch('tenant/getBillingPayments', this.tenantId).then(() => {
          this.billingPaymentResource.models = this.$store.getters["tenant/billingPaymentModels"]
          this.billingPaymentResource.data = Object.assign({}, this.$store.getters["tenant/billingPaymentData"])
        })

        await this.$store.dispatch('tenant/getPaymentRecords',  this.tenantId).then(() => {
          this.paymentRecordResource.models = this.$store.getters["tenant/paymentRecordModels"]
          this.paymentRecordResource.data = Object.assign({}, this.$store.getters["tenant/paymentRecordData"])
          let tmpStatusColumnsClass = [];
          let tmpCashflowColumnsClass = [];
          for (let i = 0; i < this.paymentRecordResource.models.length; i++) {
            if (this.paymentRecordResource.models[i].status == 'RECEIVED') {
              tmpStatusColumnsClass.push('badge badge-pill badge-success');
            } else if (this.paymentRecordResource.models[i].status == 'AWAITING_ACKNOWLEDGEMENT') {
              tmpStatusColumnsClass.push('badge badge-pill badge-warning');
            }
            if (this.paymentRecordResource.models[i].cash_flow_direction == 'RECEIVING') {
              tmpCashflowColumnsClass.push('badge badge-pill badge-success');
            } else if (this.paymentRecordResource.models[i].cash_flow_direction == 'SENDING') {
              tmpCashflowColumnsClass.push('badge badge-pill badge-danger');
            }
          }
          this.columnsClass = [
            {name:"status", class:tmpStatusColumnsClass},
            {name:"cash_flow_direction", class:tmpCashflowColumnsClass},
          ];
        })

        this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    },
    async getAssetTenants(models, id, assetId) {
      try {
        await this.$store.dispatch('asset/getTenants', assetId).then(() => {
          models[id]['tenantCount'] = this.$store.getters["asset/tenantData"].total;
          if (models.length - 1 == id) {
            this.assetResource.models = models;
            this.assetResource.data = Object.assign({}, this.$store.getters["tenant/assetData"])
          }
        })
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    },
    addTenantPaymentRecord() {
      this.$router.push({
        name: 'Add Payment Record',
        query: {
          senderType: "TENANT",
          senderId: this.tenantId,
          recipientType: "LANDLORD",
          recipientId: this.userResource.model.landlord_ids[0],
          assetId: this.assetId,
        },
        params: {
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    addTenantBillingRecord() {
      this.$router.push({
        name: 'Add Billing Record',
        query: {
          senderType: "TENANT",
          senderId: this.tenantId,
          recipientType: "LANDLORD",
          recipientId: this.userResource.model.landlord_ids[0],
          assetId: this.assetId,
        },
        params: {
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    assetIdChange(value) {
      this.assetId = value;
    },
    tenantIdChange(value) {
      this.tenantId = value;
    },
    async handleBack() {
      if (this.previousRoute) {
        this.$router.push({path: this.previousRoute});
      } else {
        this.$router.go(-1);
      }
    },
    async handleEdit() {
      this.$router.push({
        name: "Edit Tenant",
        params: {
          tenantId: this.tenantId,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    }
  }
};
</script>
<style>
</style>
