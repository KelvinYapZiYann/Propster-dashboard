<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
   <base-detail-list
     :category="$t('property.assetDetails')"
     :title="resource.model.asset_nickname"
     :model="resource.model"
     :headers="table.detailHeaders"
     :detailDisplayValue="table.detailDisplayValue"
     :detailDisplaySuffix="table.detailDisplaySuffix"
     thead-classes="text-primary"
   ></base-detail-list>

   <base-detail-list
     :category="$t('property.locationDetails')"
     :model="resource.model.location_details"
     :headers="table.locationDetailHeaders"
     :detailDisplayValue="table.locationDetailDisplayValue"
     thead-classes="text-primary"
   ></base-detail-list>

   <base-detail-list
     :category="$t('property.financialDetails')"
     :model="resource.model.financial_details"
     :headers="table.financialDetailHeaders"
     :detailDisplayValue="table.financialDetailDisplayValue"
     :detailDisplayPrefix="table.financialDetailDisplayPrefix"
     :detailDisplaySuffix="table.financialDetailDisplaySuffix"
     thead-classes="text-primary"
   ></base-detail-list>

   <tenants-index-component
     :resource="tenantResource"
     :query='{
           assetId: `${assetId}`
         }'
   ></tenants-index-component>

   <asset-expenses-index-component
     :resource="assetExpensesResource"
     @getResource="getResource"
     :query='{
        assetId: `${assetId}`,
        assetNickname: resource.model.asset_nickname
      }'
   ></asset-expenses-index-component>

   <!-- <fab
     :position="position"
     :bg-color="bgColor"
     :actions="fabActions"
     :fixed-tooltip="fixedTooltip"
     @generateReport="reportModalVisible = true"
   ></fab> -->

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

   <base-button slot="footer" type="info" @click="handleBack()" fill>{{$t('component.back')}}</base-button>
   <base-button slot="footer" type="info" @click="handleEdit()" fill>{{$t('component.edit')}} {{$t('sidebar.asset')}}</base-button>
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
        detailHeaders: {
          asset_nickname: this.$t('property.assetNickname'),
          asset_ownership_type: this.$t('property.ownershipType'),
          asset_size: this.$t('property.assetSize'),
          is_occupied: this.$t('property.currentlyOccupied'),
          is_multi_unit: this.$t('property.isMultiUnit'),
          asset_type: this.$t('property.assetType'),
        },
        detailDisplayValue: {
          asset_type: {
            RESIDENTIAL: "Residential",
            Commercial: "Commercial",
          },
          is_multi_unit: {
            true: "Yes",
            false: "No",
          },
          is_occupied: {
            true: "Yes",
            false: "No",
          }
        },
        detailDisplaySuffix: {
          asset_size: " sq.ft"
        },
        locationDetailHeaders: {
          asset_unit_no: this.$t('property.unitNo'),
          asset_address_line: this.$t('property.addressLine'),
          asset_city: this.$t('property.city'),
          asset_state: this.$t('property.state'),
          asset_postal_code: this.$t('property.postalCode'),
          asset_country: this.$t('property.country'),
        },
        locationDetailDisplayValue: {
          asset_country: {
            MY: "Malaysia",
          },
        },
        financialDetailHeaders: {
          asset_purchased_value: this.$t('property.assetPurchasedValue'),
          asset_current_value: this.$t('property.assetCurrentValue'),
          asset_purchased_tax: this.$t('property.assetPurchasedTax'),
          purchased_date: this.$t('property.purchasedDate'),
          loan_is_active: this.$t('property.loanIsActive'),
          loan_interest_rate: this.$t('property.loanInterestRate'),
          loan_outstanding_amount: this.$t('property.loanOutstandingAmount'),
          // loan_remaining_year: this.$t('property.loanRemainingYear'),
          loan_total_year: this.$t('property.loanTotalYear'),
        },
        financialDetailDisplayValue: {
          loan_is_active: {
            true: "Active",
            false: "Inactive"
          }
        },
        financialDetailDisplayPrefix: {
          asset_current_value: "RM",
          asset_purchased_tax: "RM",
          loan_outstanding_amount: "RM",
          asset_purchased_value: "RM",
        },
        financialDetailDisplaySuffix: {
          loan_interest_rate: "%",
          loan_total_year: " yrs"
        }
      },
      fabActions: [
        {
          name: 'generateReport',
          icon: 'insert_chart_outlined',
          tooltip: this.$t('component.generateReport')
        }
      ],
      bgColor: '#1d8cf8',
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
      try {
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
        }).catch((e) => {
          this.$notify({
            message:'Server error',
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        });
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
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
