<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
   <base-detail-list
     :title="$t('property.assetDetails')"
     :model="resource.model"
     :headers="table.detailHeaders"
     :headers2="table.detailHeaders2"
     :detailDisplayValue="table.detailDisplayValue"
     :detailDisplaySuffix="table.detailDisplaySuffix"
     thead-classes="text-primary"
   >
    <template v-slot:column2="column2">
      <div class="row">
        <div class="col-12">
          <h6 class="mb-0">{{ column2.text.number_of_rooms }}</h6>
        </div>
        <span class="col-12 mb-3">
          <base-room-indicator :value="resource.model.number_of_rooms"></base-room-indicator>
        </span>
      </div>
      <div class="row">
        <div class="col-12">
          <h6 class="mb-0">{{ column2.text.number_of_bathrooms }}</h6>
        </div>
        <span class="col-12 mb-3">
          <base-bathroom-indicator :value="resource.model.number_of_bathrooms"></base-bathroom-indicator>
        </span>
      </div>
      <div class="row">
        <div class="col-12">
          <h6 class="mb-0">{{ column2.text.number_of_tenants }}</h6>
        </div>
        <span class="col-12 mb-3">
          <base-tenant-indicator :value="resource.model.number_of_tenants"></base-tenant-indicator>
        </span>
      </div>
    </template>
   </base-detail-list>
   <!-- :title="resource.model.asset_nickname" -->

   <div class="row">
     <div class="col-xl-6">
       <base-detail-list
        :title="$t('property.locationDetails')"
        :model="resource.model.location_details"
        :headers="table.locationDetailHeaders"
        :headers2="table.locationDetailHeaders2"
        :detailDisplayValue="table.locationDetailDisplayValue"
        thead-classes="text-primary"
       ></base-detail-list>
     </div>

     <div class="col-xl-6">
       <!-- <div class="content"> -->
          <card type="">
            <div id="assetLocationMap" class="map"></div>
          </card>
        <!-- </div> -->
     </div>   
   </div>

   <base-detail-list
     :title="$t('property.financialDetails')"
     :model="resource.model.financial_details"
     :headers="table.financialDetailHeaders"
     :headers2="table.financialDetailHeaders2"
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
      :tableData="{'columnsClass': columnsClass}"
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
   <base-button slot="footer" type="info" @click="reportModalVisible = true" fill>{{$t('component.generateReport')}}</base-button>
  </div>
</template>
<script>
import { BaseDetailList, Modal, ValidationError, Card, BaseTenantIndicator, BaseBathroomIndicator, BaseRoomIndicator } from "@/components";
import AssetExpensesIndexComponent from "@/components/Resources/AssetExpenses/AssetExpensesIndexComponent";
import TenantsIndexComponent from "@/components/Resources/Tenants/TenantsIndexComponent";
import fab from "vue-fab";
// import Modal from "@/components/Modal";
import GenerateReportForm from "@/components/Resources/Assets/GenerateReportForm";
import formMixin from "@/mixins/form-mixin";
// import ValidationError from "@/components/ValidationError.vue";
import axios from 'axios';
import errorHandlingService from "@/store/services/error-handling-service";

import { GOOGLE_MAP_API_KEY } from "@/pages/Maps/API_KEY";
import {Loader} from "google-maps";
import router from "@/router";

const GoogleMapLoader = new Loader(GOOGLE_MAP_API_KEY, {
  region: "MY",
  // libraries: ["places"]
});

export default {
  mixins: [formMixin],
  components: {
    Card,
    BaseDetailList,
    AssetExpensesIndexComponent,
    TenantsIndexComponent,
    fab,
    Modal,
    GenerateReportForm,
    ValidationError,
    BaseTenantIndicator,
    BaseBathroomIndicator,
    BaseRoomIndicator
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
      columnsClass: [
        {name:"status", class:[]}
      ],
      tenantResource: {
        models: [{}],
        data: {}
      },
      table: {
        detailHeaders: {
          asset_nickname: this.$t('property.assetNickname'),
          asset_ownership_type: this.$t('property.ownershipType'),
          asset_size: this.$t('property.assetSize'),
          asset_type: this.$t('property.assetType'),
        },
        detailHeaders2: {
        //   is_occupied: this.$t('property.currentlyOccupied'),
        //   is_multi_unit: this.$t('property.isMultiUnit'),
          number_of_rooms: this.$t('property.numberOfRooms'),
          number_of_bathrooms: this.$t('property.numberOfBathrooms'),
          number_of_tenants: this.$t('sidebar.tenants'),
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
        },
        locationDetailHeaders2: {
          asset_state: this.$t('property.state'),
          asset_postal_code: this.$t('property.postalCode'),
          asset_country: this.$t('property.country'),
        },
        locationDetailDisplayValue: {
          asset_country: {
            MY: "Malaysia",
          },
          number_of_tenants: {
            0: '0'
          }
        },
        financialDetailHeaders: {
          asset_purchased_value: this.$t('property.assetPurchasedValue'),
          asset_current_value: this.$t('property.assetCurrentValue'),
          asset_purchased_tax: this.$t('property.assetPurchasedTax'),
          purchased_date: this.$t('property.purchasedDate'),
        },
        financialDetailHeaders2: {
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
          loan_total_year: " yr(s)"
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
      // showAll: false,
      googleMap: undefined
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
    this.initGoogleMap();
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
          this.resetApiValidation();
          let fileURL = window.URL.createObjectURL(new Blob([response.data]));
          let fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', fileName);
          document.body.appendChild(fileLink);

          fileLink.click();
        }).catch((e) => {
          new Blob([e.response.data]).text().then((data) => {
            this.setApiValidation(JSON.parse(data).errors);
          });
          this.$notify({
            message: errorHandlingService.displayAlertFromServer(e),
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        });
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    },
    async getResource() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('asset/getById', this.assetId).then(() => {
          this.resource.model = this.$store.getters["asset/model"]
          this.resource.data = this.$store.getters["asset/data"]
          this.updateGoogleMap(this.resource.model.location_details.asset_address_line);
        })

        await this.$store.dispatch('asset/getAssetExpenses', this.assetId).then(() => {
          this.assetExpensesResource.models = this.$store.getters["asset/assetExpenseModels"]
          this.assetExpensesResource.data = this.$store.getters["asset/assetExpenseData"]
          let tmpColumnsClass = [];
          for (let i = 0; i < this.assetExpensesResource.models.length; i++) {
            if (this.assetExpensesResource.models[i].status == 'RECEIVED') {
              tmpColumnsClass.push('badge badge-pill badge-success');
            }
          }
          this.columnsClass[0] = {name:"status", class:tmpColumnsClass};
        });
        

        await this.$store.dispatch('asset/getTenants', this.assetId).then(() => {
          this.tenantResource.models = this.$store.getters["asset/tenantModels"]
          this.tenantResource.data = this.$store.getters["asset/tenantData"]
        });

        // await this.$store.dispatch('asset/getTenureContracts', this.assetId)
        // this.tenureContractResource.models = await this.$store.getters["asset/tenureContractModels"]
        // this.tenureContractResource.data = await this.$store.getters["asset/tenureContractData"]


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
    async handleBack() {
      if (this.previousRoute) {
        this.$router.push({path: this.previousRoute});
      } else {
        this.$router.go(-1);
      }
    },
    async handleEdit() {
      this.$router.push({
        name: router.currentRoute.matched[0].path == "/m" ? "Mobile Edit Assets" : "Edit Assets",
        params: {
          assetId: this.assetId,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    initGoogleMap() {
      GoogleMapLoader.load().then(google => {
        const defaultLatLng = {lat: 3.158310, lng: 101.711710};
        const mapOptions = {
          zoom: 10,
          center: defaultLatLng,
          scrollwheel: false
        };

        this.googleMap = new google.maps.Map(
          document.getElementById("assetLocationMap"),
          mapOptions
        );
      });
    },
    updateGoogleMap(address) {
      if (!this.googleMap) {
        this.initGoogleMap();
      }
      let tmpPlaceId = this.resource.model.place_id;
      GoogleMapLoader.load().then(google => {
        if (tmpPlaceId) {
          let tmpLatLng = JSON.parse(tmpPlaceId);
          if (tmpLatLng) {
            if (tmpLatLng.lat && tmpLatLng.lng) {
              this.googleMap.setCenter(tmpLatLng);
              this.googleMap.setZoom(16);

              new google.maps.Marker({
                position: tmpLatLng,
                map: this.googleMap,
                title: address
              });
            }
            return;
          }
        } 
        const geocoder = new google.maps.Geocoder();
        if (geocoder) {
          let tmpGoogleMap = this.googleMap;
          geocoder.geocode({
            'address': address
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                tmpGoogleMap.setCenter({lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()});
                tmpGoogleMap.setZoom(16);

                new google.maps.Marker({
                  position: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()},
                  map: tmpGoogleMap,
                  title: address
                });
              } 
              // else {
              //   alert("No results found");
              // }
            } 
            // else {
            //   alert("Geocode was not successful for the following reason: " + status);
            // }
          });
        }
      });
    },
  }
};
</script>
<style>
</style>
