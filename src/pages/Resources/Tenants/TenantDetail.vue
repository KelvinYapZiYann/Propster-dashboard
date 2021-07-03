<template>
      <div class="content">
        <base-detail-list
          :category="`Personal Details`"
          :title="''"
          :model="resource.model"
          :headers="table.detailHeaders"
          thead-classes="text-primary"
        ></base-detail-list>

        <assets-index-component
          :resource="assetResource"
          :table="table"
          :query="{
            tenantId: this.tenantId,
            assetId: this.assetId,
          }"
        ></assets-index-component>

        <tenure-contract-index-component
          :resource="tenureContractResource"
          :table="table"
          :query="{
            tenantId: this.tenantId,
            assetId: this.assetId,
          }"
          :assetId="assetId"
          :tenantId="tenantId"
          @assetIdChange="assetIdChange"
          @tenantIdChange="tenantIdChange"
        ></tenure-contract-index-component>

        <payment-record-index-component
          :resource="receivingPaymentRecordResource"
          :table="table"
          :query="{
            tenantId: this.tenantId,
            assetId: this.assetId,
          }"
          :paymentRecordType="receivingPaymentRecordType"
        ></payment-record-index-component>
        
        <payment-record-index-component
          :resource="sendingPaymentRecordResource"
          :table="table"
          :query="{
            tenantId: this.tenantId,
            assetId: this.assetId,
          }"
          :paymentRecordType="sendingPaymentRecordType"
        ></payment-record-index-component>

        <fab
          :position="position"
          :bg-color="bgColor"
          :actions="fabActions"
          :fixed-tooltip="fixedTooltip"
          @tenantPayment="addPaymentRecord"
        ></fab>

        <base-button slot="footer" type="primary"  @click="handleBack()" fill>Back</base-button>
      </div>
</template>
<script>
import { BaseDetailList, Card } from "@/components";
import AssetExpensesIndexComponent from "@/components/Resources/AssetExpenses/AssetExpensesIndexComponent";
import AssetsIndexComponent from "@/components/Resources/Assets/AssetsIndexComponent";
import TenureContractIndexComponent from "@/components/Resources/TenureContracts/TenureContractIndexComponent";
import PaymentRecordIndexComponent from "@/components/Resources/PaymentRecords/PaymentRecordIndexComponent";
import fab from "vue-fab";

let detailHeaders = {
    first_name: "First Name",
    last_name: "Last Name",
    gender: "Gender",
    is_business: "Is Business",
    date_of_birth: "Date Of Birth",
    reputation: "Reputation",
    salary_range: "Salary Range",
};

export default {
  components: {
    AssetsIndexComponent,
    BaseDetailList,
    AssetExpensesIndexComponent,
    TenureContractIndexComponent,
    PaymentRecordIndexComponent,
    Card,
    fab
  },
  data() {
    return {
      allowAddUser: false,
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
      receivingPaymentRecordResource: {
        models: [{}],
        data: {}
      },
      sendingPaymentRecordResource: {
        models: [{}],
        data: {}
      },
      userResource: {
        model: {},
      },
      table: {
        title: "Tenants",
        detailHeaders: {...detailHeaders},
      },
      fabActions: [
        {
          name: 'tenantPayment',
          icon: 'payment',
          tooltip: 'Record Tenant Payment'
        }
      ],
      receivingPaymentRecordType: "Receiving",
      sendingPaymentRecordType: "Sending",
      bgColor: '#778899',
      fixedTooltip: true,
      position: 'bottom-right',
      tenantPaymentModalVisible: false,
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

        await this.$store.dispatch('tenant/getReceivingPaymentRecords',  this.tenantId).then(() => {
          this.receivingPaymentRecordResource.models = this.$store.getters["tenant/receivingPaymentRecordModels"]
          this.receivingPaymentRecordResource.data = Object.assign({}, this.$store.getters["tenant/receivingPaymentRecordData"])
        })

        await this.$store.dispatch('tenant/getSendingPaymentRecords',  this.tenantId).then(() => {
          this.sendingPaymentRecordResource.models = this.$store.getters["tenant/sendingPaymentRecordModels"]
          this.sendingPaymentRecordResource.data = Object.assign({}, this.$store.getters["tenant/sendingPaymentRecordData"])
        })

        await this.$store.dispatch('tenureContract/create', {}).then(() => {
          this.tenureContractResource.selector = Object.assign({}, this.$store.getters["tenureContract/selector"])
        });

        await this.$store.dispatch('users/get', {}).then(() => {
          this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
          // this.userResource.data = Object.assign({}, this.$store.getters["users/data"])
          // this.userResource.selector = Object.assign({}, this.$store.getters["users/selector"])
        })

        // await this.$store.dispatch('asset/getAssetExpenses', this.$route.params.assetId)
        // this.assetExpensesResource.models = await this.$store.getters["asset/assetExpenseModels"]
        // this.assetExpensesResource.data = await this.$store.getters["asset/assetExpenseData"]

        // await this.$store.dispatch('asset/getTenureContracts', this.$route.params.assetId)
        // this.tenureContractResource.models = await this.$store.getters["asset/tenureContractModels"]
        // this.tenureContractResource.data = await this.$store.getters["asset/tenureContractData"]
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    },
    addPaymentRecord() {
      this.$router.push({
        name: 'Add Payment Record',
        query: {
          senderType: "TENANT",
          senderId: `${this.tenantId}`,
          recipientType: "LANDLORD",
          recipientId: `${this.userResource.model.landlord_ids[0]}`,
          assetId: `${this.assetId}`,
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
    }
  }
};
</script>
<style>
</style>
