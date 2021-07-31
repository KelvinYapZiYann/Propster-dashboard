<template>
      <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <base-detail-list
          :category="$t('property.tenantDetails')"
          :model="resource.model"
          :headers="table.detailHeaders"
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
        ></billing-record-index-component>
        
        <payment-record-index-component
          :resource="paymentRecordResource"
          :query="{
            tenantId: this.tenantId,
            assetId: this.assetId,
          }"
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
import PaymentRecordIndexComponent from "@/components/Resources/PaymentRecords/PaymentRecordIndexComponent";
import fab from "vue-fab";

export default {
  components: {
    AssetsIndexComponent,
    BaseDetailList,
    AssetExpensesIndexComponent,
    TenureContractIndexComponent,
    BillingRecordIndexComponent,
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
        models: [{}],
        data: {}
      },
      tenureContractResource: {
        models: [{}],
        data: {},
        selector: {}
      },
      billingRecordResource: {
        models: [{}],
        data: {},
        selector: {}
      },
      paymentRecordResource: {
        models: [{}],
        data: {}
      },
      userResource: {
        model: {},
      },
      table: {
        detailHeaders: {
          first_name: this.$t('property.firstName'),
          last_name: this.$t('property.lastName'),
          email: this.$t('property.email'),
          phone_number: this.$t('property.phoneNumber'),
          gender: this.$t('property.gender'),
          is_business: this.$t('property.isBusiness'),
          date_of_birth: this.$t('property.dateOfBirth'),
          // reputation: "Reputation",
          salary_range: this.$t('property.salaryRange'),
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
      try {
        await this.$store.dispatch('tenant/getById',  this.tenantId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenant/model"])
          this.resource.data = Object.assign({}, this.$store.getters["tenant/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenant/selector"])
        })

        await this.$store.dispatch('tenant/getAssets',  this.tenantId).then(() => {
          this.assetResource.models = this.$store.getters["tenant/assetModels"]
          this.assetResource.data = Object.assign({}, this.$store.getters["tenant/assetData"])
        })

        await this.$store.dispatch('tenant/getTenureContracts',  this.tenantId).then(() => {
          this.tenureContractResource.models = this.$store.getters["tenant/tenureContractModels"]
          this.tenureContractResource.data = Object.assign({}, this.$store.getters["tenant/tenureContractData"])
        })

        await this.$store.dispatch('tenant/getBillingRecords', this.tenantId).then(() => {
          this.billingRecordResource.models = this.$store.getters["tenant/billingRecordModels"]
          this.billingRecordResource.data = Object.assign({}, this.$store.getters["tenant/billingRecordData"])
        })

        await this.$store.dispatch('tenant/getPaymentRecords',  this.tenantId).then(() => {
          this.paymentRecordResource.models = this.$store.getters["tenant/paymentRecordModels"]
          this.paymentRecordResource.data = Object.assign({}, this.$store.getters["tenant/paymentRecordData"])
        })

        this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
      } catch (e) {
        this.$notify({
          message:'Server error',
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
