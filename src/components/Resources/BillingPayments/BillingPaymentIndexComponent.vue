<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left">{{$t('sidebar.billingPayments')}}</h4>
        <div class="text-right mb-3">
          <base-button
            @click="addModel"
            class="mt-3"
            type="info"
            v-if="!isBillingRecordsPayment"
          >{{$t('component.add')}} {{$t('sidebar.oneTimeBillingRecords')}}</base-button>
        </div>
        <!-- <div class="row">
          <div class="col-xl-4 col-lg-5 col-md-6 ml-auto">
            <base-input 
                    addonLeftIcon="el-icon-search"
                    :placeholder="$t('component.search')"
                    v-model="searchQuery">
            </base-input>
          </div>
        </div> -->
        <div class="table-responsive">
          <base-table
            :disableEdit="true"
            :disableDelete="true"
            :data="resource.models"
            :columns="table.columns"
            :columnsDisplayPrefix="table.columnsDisplayPrefix"
            :columnsDisplayValue="table.columnsDisplayValue"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
          >
          <!-- v-on:edit-details="editDetails" -->
          <!-- v-on:delete-details="deleteDetails" -->
          </base-table>
          <div
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class="">
              <p class="card-category">
                {{$t('component.showing')}} {{ resource.data.from ? resource.data.from : "0" }} {{$t('component.to')}} {{ resource.data.to ? resource.data.to : "0" }} {{$t('component.of')}} {{ resource.data.total }} {{$t('component.entries')}}
              </p>
            </div>
            <base-pagination
              class="pagination-no-border"
              v-model="resource.data.currentPage"
              :total="resource.data.total"
              @input="handlePagination"
              :per-page="resource.data.perPage"
              type="info"
            >
            </base-pagination>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import {BaseInput, BaseTable, BasePagination, Card} from "@/components";
import router from "@/router";
import swal from "sweetalert2";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    BaseInput,
    BaseTable,
    BasePagination,
    Card
  },
  data() {
    return {
      table: {
        columns: {
          sender_name: this.$t('property.senderName'),
          recipient_name: this.$t('property.recipientName'),
          asset_nickname: this.$t('property.assetNickname'),
          description: this.$t('property.description'),
          amount: this.$t('property.amount'),
          payment_type: this.$t('property.paymentType')
        },
        columnsDisplayPrefix: {
          amount: "RM"
        },
        columnsDisplayValue: {
          payment_type: {
            APPLIANCES: "Appliances",
            BILL_ELECTRICITY: "Electricity bill",
            BILL_GAS: "Gas bill",
            BILL_INSURANCE: "Insurance Bill",
            BILL_INTERNET: " Internet bill",
            BILL_MANAGEMENT: "Management fee",
            BILL_REPAIR: "Repair Bill",
            BILL_SINKING_FUND: "Sinking fund",
            BILL_TV_PROGRAMME: "TV Programme bill",
            BILL_WATER: "Water bill",
            DEPOSIT: "Deposit",
            FURNITURE: "Furniture",
            LATE_FEE_PENALTY: "Late Fee Penalty",
            LOAN_INSTALLMENT: "Loan Installment",
            MAINTENANCE_COST: "Maintenance cost",
            OTHERS: "Others",
            PARKING_RENTAL: "Parking Rental",
            RENOVATION: "Renovation",
            RENTAL: "Rental",
            TAX_CUKAI_PINTU: "Cukai Pintu",
            TAX_CUKAI_TANAH: "Cukai Tanah",
          }
        }
      },
      searchQuery: "",
      searchQueryTimeout: null,
      userResource: {
        model: {},
      },
    };
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        models: [],
        data: {
          canAdd: false,
          currentPage: 1,
          total: 0,
          from: 0,
          to: 0,
          perPage: 15,
          links: []
        }
      },
    },
    isBillingRecordsPayment: {
      type: Boolean,
      required: true,
      default: false
    },
    query: {
      type: Object,
      // default: {},
    },
    // billingPaymentsType: {
    //   type: String,
    //   required: true,
    //   default: function() {
    //     return "";
    //   }
    // }
  },
  mounted() {
    this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
  },
  methods: {
    showDetails(id) {
      router.push({
        name: "Billing Payment Detail",
        params: {
          billingPaymentId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    async handlePagination(pageId) {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        if (this.$props.query) {
          if (this.$props.query.billingRecordId) {
            var param = {
              id: this.$props.query.billingRecordId,
              pageId: pageId
            }
            await this.$store.dispatch('billingRecords/getBillingPayments', param).then(() => {
              this.resource.models = this.$store.getters["billingRecords/billingPaymentModels"];
              this.resource.data = Object.assign({}, this.$store.getters["billingRecords/billingPaymentData"]);
            });
          } else if (this.$props.query.tenantId) {
            var param = {
              id: this.$props.query.tenantId,
              pageId: pageId
            }
            await this.$store.dispatch('tenant/getBillingPayments', param).then(() => {
              this.resource.models = this.$store.getters["tenant/billingPaymentModels"];
              this.resource.data = Object.assign({}, this.$store.getters["tenant/billingPaymentData"]);
            });
          } else {
            await this.$store.dispatch('billingPayments/get', pageId).then(() => {
              this.resource.models = this.$store.getters["billingPayments/models"];
              this.resource.data = Object.assign({}, this.$store.getters["billingPayments/data"]);
            });
          }
        } else {
          await this.$store.dispatch('billingPayments/get', pageId).then(() => {
            this.resource.models = this.$store.getters["billingPayments/models"];
            this.resource.data = Object.assign({}, this.$store.getters["billingPayments/data"]);
          });
        }
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
    addModel() {
      if (this.$props.query ? !this.$props.query.tenantId : true) {
        this.$store.dispatch('asset/get').then(() => {
          if (this.$store.getters["asset/data"].total <= 0) {
            swal({
              title: this.$t('alert.billingRecordFailedAdded'),
              text: this.$t('alert.noAssetAddingBillingRecord'),
              buttonsStyling: false,
              showCancelButton: true,
              confirmButtonText: this.$t('component.add') + ' ' + this.$t('sidebar.asset'),
              cancelButtonText: this.$t('component.cancel'),
              cancelButtonClass: "btn btn-info btn-fill",
              confirmButtonClass: "btn btn-info btn-fill",
              type: "error",
            }).then((result) => {
              if (result.value) {
                this.$router.push({
                  name: 'Add Assets',
                  params: {
                    previousRoute: this.$router.currentRoute.fullPath
                  }
                });
              }
            });
          } else {
            this.$store.dispatch('tenant/get').then(() => {
              if (this.$store.getters["tenant/data"].total <= 0) {
                swal({
                  title: this.$t('alert.billingRecordFailedAdded'),
                  text: this.$t('alert.noTenantAddingBillingRecord'),
                  buttonsStyling: false,
                  showCancelButton: true,
                  confirmButtonText: this.$t('component.add') + ' ' + this.$t('sidebar.tenant'),
                  cancelButtonText: this.$t('component.cancel'),
                  cancelButtonClass: "btn btn-info btn-fill",
                  confirmButtonClass: "btn btn-info btn-fill",
                  type: "error",
                }).then((result) => {
                  if (result.value) {
                    this.$router.push({
                      name: 'Add Tenant',
                      params: {
                        previousRoute: this.$router.currentRoute.fullPath
                      }
                    });
                  }
                });
              } else {
                // if (!this.resource.data.canAdd) {
                //   swal({
                //     title: this.$t('alert.billingRecordFailedAdded'),
                //     text: this.$t('alert.billingRecordFailedAddedText'),
                //     buttonsStyling: false,
                //     confirmButtonClass: "btn btn-info btn-fill",
                //     type: "error",
                //   });
                //   return;
                // }
                if (!this.userResource.model.landlord_ids) {
                  this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
                }
                router.push({
                  name: 'Add Billing Record',
                  query: {
                    senderType: "TENANT",
                    senderId: this.$props.query ? this.$props.query.tenantId : null,
                    recipientType: "LANDLORD",
                    recipientId: this.userResource.model.landlord_ids[0],
                    assetId: this.$props.query ? this.$props.query.assetId : null,
                    tenureContractId: this.$props.query ? this.$props.query.tenureContractId : null,
                    billImmediately: true
                  },
                  params: {
                    previousRoute: router.currentRoute.fullPath
                  }
                });
              }
            });
          }
        });
      } else {
        // if (!this.resource.data.canAdd) {
        //   swal({
        //     title: this.$t('alert.billingRecordFailedAdded'),
        //     text: this.$t('alert.billingRecordFailedAddedText'),
        //     buttonsStyling: false,
        //     confirmButtonClass: "btn btn-info btn-fill",
        //     type: "error",
        //   });
        //   return;
        // }
        if (!this.userResource.model.landlord_ids) {
          this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
        }
        router.push({
          name: 'Add Billing Record',
          query: {
            senderType: "TENANT",
            senderId: this.$props.query ? this.$props.query.tenantId : null,
            recipientType: "LANDLORD",
            recipientId: this.userResource.model.landlord_ids[0],
            assetId: this.$props.query ? this.$props.query.assetId : null,
            tenureContractId: this.$props.query ? this.$props.query.tenureContractId : null,
            billImmediately: true
          },
          params: {
            previousRoute: router.currentRoute.fullPath
          }
        });
      }
    },
  },
  watch: {
    searchQuery(value) {
      if (this.searchQueryTimeout) {
        clearTimeout(this.searchQueryTimeout);
      }
      this.searchQueryTimeout = setTimeout(() => {
        console.log('searching query with = ' + value);
      }, 2000);
    }
  }
};
</script>
<style>
</style>
