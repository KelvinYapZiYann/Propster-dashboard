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
          :query='{
            modelType: "tenant_id",
            modelId: `${modelId}`
          }'
        ></assets-index-component>

        <tenure-contract-index-component
          :resource="tenureContractResource"
          :table="table"
          :query='{
            modelType: "tenant_id",
            modelId: `${modelId}`
          }'
          :assetId="assetId"
          :tenantId="tenantId"
          @assetIdChange="assetIdChange"
          @tenantIdChange="tenantIdChange"
        ></tenure-contract-index-component>

        <payment-record-index-component
          :resource="receivingPaymentRecordResource"
          :table="table"
          :query='{
            modelType: "tenant_id",
            modelId: `${modelId}`
          }'
          :paymentRecordType="receivingPaymentRecordType"
        ></payment-record-index-component>
        
        <payment-record-index-component
          :resource="sendingPaymentRecordResource"
          :table="table"
          :query='{
            modelType: "tenant_id",
            modelId: `${modelId}`
          }'
          :paymentRecordType="sendingPaymentRecordType"
        ></payment-record-index-component>

        <fab
          :position="position"
          :bg-color="bgColor"
          :actions="fabActions"
          :fixed-tooltip="fixedTooltip"
          @tenantPayment="addPaymentRecord"
        ></fab>

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
      modelId: this.$route.params.tenantId,
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
      assetId: this.$route.query ? (this.$route.query.modelType ? (this.$route.query.modelType == "asset_id" ? this.$route.query.modelId : null) : null) : null
    };
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('tenant/getById',  this.modelId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenant/model"])
          this.resource.data = Object.assign({}, this.$store.getters["tenant/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenant/selector"])
        })

        await this.$store.dispatch('tenant/getAssets',  this.modelId).then(() => {
          this.assetResource.models = this.$store.getters["tenant/assetModels"]
          this.assetResource.data = Object.assign({}, this.$store.getters["tenant/assetData"])
        })

        await this.$store.dispatch('tenant/getTenureContracts',  this.modelId).then(() => {
          this.tenureContractResource.models = this.$store.getters["tenant/tenureContractModels"]
          this.tenureContractResource.data = Object.assign({}, this.$store.getters["tenant/tenureContractData"])
        })

        await this.$store.dispatch('tenant/getReceivingPaymentRecords',  this.modelId).then(() => {
          this.receivingPaymentRecordResource.models = this.$store.getters["tenant/receivingPaymentRecordModels"]
          this.receivingPaymentRecordResource.data = Object.assign({}, this.$store.getters["tenant/receivingPaymentRecordData"])
        })

        await this.$store.dispatch('tenant/getSendingPaymentRecords',  this.modelId).then(() => {
          this.sendingPaymentRecordResource.models = this.$store.getters["tenant/sendingPaymentRecordModels"]
          this.sendingPaymentRecordResource.data = Object.assign({}, this.$store.getters["tenant/sendingPaymentRecordData"])
        })

        await this.$store.dispatch('tenureContract/create', {}).then(() => {
          this.tenureContractResource.selector = Object.assign({}, this.$store.getters["tenureContract/selector"])
        });

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
      console.log('addPaymentRecord');
      console.log(this.assetResource);
      // this.$router.push({
      //   name: 'Add Payment Record',
      //   query: {
      //     senderType: "tenant",
      //     senderId: `${this.modelId}`,
      //     recipientType: "landlord",
      //     modelId: `${this.modelId}`
      //   }
      // });
    },
    assetIdChange(value) {
      this.assetId = value;
    },
    tenantIdChange(value) {
      this.tenantId = value;
    }
  }
};
</script>
<style>
</style>
