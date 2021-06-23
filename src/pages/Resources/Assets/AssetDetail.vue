<template>
  <div class="content">
   <base-detail-list
     :category="resource.data.category"
     :title="resource.model.asset_nickname"
     :model="resource.model"
     :headers="table.detailHeaders"
     thead-classes="text-primary"
   ></base-detail-list>

   <base-detail-list
     :category="'Location Details'"
     :model="resource.model.location_details"
     :headers="table.locationDetailHeaders"
     thead-classes="text-primary"
   ></base-detail-list>

   <base-detail-list
     :category="'Financial Details'"
     :model="resource.model.financial_details"
     :headers="table.financialDetailHeaders"
     thead-classes="text-primary"
   ></base-detail-list>

   <!-- <asset-expenses-index-component
     :resource="assetExpensesResource"
     :table="table"
     :query='{
           modelType: "asset_id",
           modelId: `${modelId}`
         }'
   ></asset-expenses-index-component> -->

   <tenants-index-component
     :resource="tenantResource"
     :table="table"
     :query='{
           modelType: "asset_id",
           modelId: `${modelId}`
         }'
   ></tenants-index-component>

   <!-- <fab
     :position="position"
     :bg-color="bgColor"
     :actions="fabActions"
     @generateReport="reportModalVisible = true"
   ></fab>

   <modal :show.sync="reportModalVisible"
          class="modal-search"
          id="searchModal"
          :centered="false"
          :show-close="true">
       <generate-report-form
         :reportTypes="reportTypes"
         :apiValidationErrors="apiValidationErrors"
         @requestReport="requestReport"
       ></generate-report-form>
   </modal> -->
  </div>
</template>
<script>
import { BaseDetailList } from "@/components";
import AssetExpensesIndexComponent from "@/components/Resources/AssetExpenses/AssetExpensesIndexComponent";
import TenantsIndexComponent from "@/components/Resources/Tenants/TenantsIndexComponent";
import fab from "vue-fab";
import Modal from "@/components/Modal";
import GenerateReportForm from "@/components/Resources/Assets/GenerateReportForm";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";

let detailHeaders = {
  asset_nickname: "Asset Nickname",
  asset_ownership_type: "Ownership Type",
  asset_size: "Size (sq. ft)",
  currently_occupied: "Currently Occupied",
  is_multi_unit: "Is Multi Unit",
  asset_type: "Asset Type",
};

let locationDetailHeaders = {
  asset_unit_no: "Unit No",
  asset_address_line: "Address Line",
  asset_city: "City",
  asset_state: "State",
  asset_postal_code: "Postal Code",
  asset_country: "Country",
};

let financialDetailHeaders = {
  asset_purchased_value: "Purchased Value (RM)",
  asset_purchased_tax: "Purchased Tax",
  asset_current_value: "Current Value (RM)",
  purchased_date: "Date",
  loan_is_active: "Loan Is Active",
  loan_interest_rate: "Interest Rate (%)",
  loan_outstanding_amount: "Outstanding Amount (RM)",
  loan_remaining_year: "Remaining Years",
  loan_total_year: "Total Loan Years",

};

export default {
  mixins: [formMixin],
  components: {
    BaseDetailList,
    AssetExpensesIndexComponent,
    TenantsIndexComponent,
    fab,
    Modal,
    GenerateReportForm,
    ValidationError
  },
  data() {
    return {
      modelId: this.$route.params.assetId,
      resource: {
        model: {},
        data: {}
      },
      assetExpensesResource: {
        models: [{}],
        data: {}
      },
      tenantResource: {
        models: [{}],
        data: {}
      },
      // tenureContractResource: {
      //   models: [{}],
      //   data: {}
      // },
      table: {
        title: "Assets",
        detailHeaders: {...detailHeaders},
        locationDetailHeaders: {...locationDetailHeaders},
        financialDetailHeaders: {...financialDetailHeaders}
      },
      fabActions: [
        {
          name: 'generateReport',
          icon: 'insert_chart_outlined'
        }
      ],
      bgColor: '#778899',
      position: 'bottom-right',
      reportTypes: [
        { "id": "CASHFLOW_STATEMENT", "name": "Cashflow Statement" },
      ],
      reportModalVisible: false,
    };
  },
  mounted() {
    this.getResource();
  },
  methods: {
    requestReport() {

      alert('test');
    },
    async getResource() {
      try {
        await this.$store.dispatch('asset/getById', this.modelId)
        this.resource.model = await this.$store.getters["asset/model"]
        this.resource.data = await this.$store.getters["asset/data"]

        // await this.$store.dispatch('asset/getAssetExpenses', this.$route.params.assetId)
        // this.assetExpensesResource.models = await this.$store.getters["asset/assetExpenseModels"]
        // this.assetExpensesResource.data = await this.$store.getters["asset/assetExpenseData"]

        await this.$store.dispatch('asset/getTenants', this.$route.params.assetId)
        this.tenantResource.models = await this.$store.getters["asset/tenantModels"]
        this.tenantResource.data = await this.$store.getters["asset/tenantData"]

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
  }
};
</script>
<style>
</style>
