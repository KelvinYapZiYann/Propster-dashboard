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

   <asset-expenses-index-component
     :resource="assetExpensesResource"
     :table="table"
     :query='{
           assetId: `${assetId}`
         }'
   ></asset-expenses-index-component>

   <tenants-index-component
     :resource="tenantResource"
     :table="table"
     :query='{
           assetId: `${assetId}`
         }'
   ></tenants-index-component>

   <fab
     :position="position"
     :bg-color="bgColor"
     :actions="fabActions"
     :fixed-tooltip="fixedTooltip"
     @generateReport="reportModalVisible = true"
   ></fab>

   <modal :show.sync="reportModalVisible"
          class="modal-search"
          id="searchModal"
          :centered="false"
          :show-close="true">
       <generate-report-form
         :tmpApiValidationErrors="apiValidationErrors"
         @requestReport="requestReport"
       ></generate-report-form>
   </modal>

   <base-button slot="footer" type="primary"  @click="handleBack()" fill>Back</base-button>
   <base-button slot="footer" type="primary"  @click="handleEdit()" fill>Edit Asset</base-button>
  </div>
</template>
<script>
import { BaseDetailList, Modal, ValidationError } from "@/components";
import AssetExpensesIndexComponent from "@/components/Resources/AssetExpenses/AssetExpensesIndexComponent";
import TenantsIndexComponent from "@/components/Resources/Tenants/TenantsIndexComponent";
import fab from "vue-fab";
// import Modal from "@/components/Modal";
import GenerateReportForm from "@/components/Resources/Assets/GenerateReportForm";
import formMixin from "@/mixins/form-mixin";
// import ValidationError from "@/components/ValidationError.vue";
import axios from 'axios';

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
      assetId: this.$route.params.assetId,
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
      table: {
        title: "Assets",
        detailHeaders: {...detailHeaders},
        locationDetailHeaders: {...locationDetailHeaders},
        financialDetailHeaders: {...financialDetailHeaders}
      },
      fabActions: [
        {
          name: 'generateReport',
          icon: 'insert_chart_outlined',
          tooltip: 'Generate Report'
        }
      ],
      bgColor: '#778899',
      fixedTooltip: true,
      position: 'bottom-right',
      reportModalVisible: false,
      // showAll: false
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
    requestReport(data) {
      const url = process.env.VUE_APP_API_BASE_URL;
      let fileName = data.report_type + '-' + data.start_date + '-' + data.end_date + '.csv';
      axios({
        url: `${url}/assets/reports/generate-report`,
        method: 'GET',
        responseType: 'blob',
        params: {
          'report_type': data.report_type,
          'start_date': data.start_date,
          'end_date': data.end_date
        }
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', fileName);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    async getResource() {
      try {
        await this.$store.dispatch('asset/getById', this.assetId)
        this.resource.model = await this.$store.getters["asset/model"]
        this.resource.data = await this.$store.getters["asset/data"]

        await this.$store.dispatch('asset/getAssetExpenses', this.assetId)
        this.assetExpensesResource.models = await this.$store.getters["asset/assetExpenseModels"]
        this.assetExpensesResource.data = await this.$store.getters["asset/assetExpenseData"]

        await this.$store.dispatch('asset/getTenants', this.assetId)
        this.tenantResource.models = await this.$store.getters["asset/tenantModels"]
        this.tenantResource.data = await this.$store.getters["asset/tenantData"]

        // await this.$store.dispatch('asset/getTenureContracts', this.assetId)
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
    async handleBack() {
      if (this.previousRoute) {
        this.$router.push({path: this.previousRoute});
      } else {
        this.$router.go(-1);
      }
    },
    async handleEdit() {
      this.$router.push({
        name: "Edit Assets",
        params: {
          assetId: this.assetId,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    }
  }
};
</script>
<style>
</style>
