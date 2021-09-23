<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h3 slot="header" class="card-title">{{$t('sidebar.billingRecords')}}</h3>
        <div class="text-right">
          <base-button
            @click="addModel"
            type="info"
            v-bind:disabled="!resource.data.canAdd"
          >
            {{$t('component.add')}} {{$t('sidebar.billingRecord')}}
          </base-button>
          <!-- <base-button
            @click="addReminder"
            class="mt-3"
            type="info"
            v-bind:disabled="!resource.data.canAdd"
          >
            {{$t('component.add')}} {{$t('sidebar.reminderBillingRecord')}}
          </base-button> -->
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
            :data="resource.models"
            :columns="table.columns"
            :columnsDisplayPrefix="table.columnsDisplayPrefix"
            :columnsDisplayValue="table.columnsDisplayValue"
            :rowColor="tableData.rowColor"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails"
            v-on:long-click-event="longClickEvent"
            :paginationPage="paginationPage"
          >
          <!-- :disableEdit="true" -->
          <!-- :disableDelete="true" -->
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
import router from "@/router";

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
        columns: this.$store.getters["mobileLayout/isMobileLayout"] ? {
          sender_name: this.$t('property.senderName'),
          recipient_name: this.$t('property.recipientName'),
          // asset_nickname: this.$t('property.assetNickname'),
          description: this.$t('property.billingName'),
          // payment_type: this.$t('property.paymentType'),
          amount: this.$t('property.amount'),
          // billing_start_at: this.$t('property.startDate'),
          // billing_end_at: this.$t('property.endDate'),
          // next_billing_amount: this.$t('property.nextBillingAmount'),
          // next_billing_date: this.$t('property.nextBillingDate'),
        } : {
          sender_name: this.$t('property.senderName'),
          recipient_name: this.$t('property.recipientName'),
          asset_nickname: this.$t('property.assetNickname'),
          description: this.$t('property.billingName'),
          payment_type: this.$t('property.paymentType'),
          amount: this.$t('property.amount'),
          billing_start_at: this.$t('property.startDate'),
          billing_end_at: this.$t('property.endDate'),
          next_billing_amount: this.$t('property.nextBillingAmount'),
          next_billing_date: this.$t('property.nextBillingDate'),
        },
        columnsDisplayPrefix: {
          amount: "RM",
          next_billing_amount: "RM"
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
      paginationPage: 1
    };
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        models: [{}],
        data: {
          canAdd: false,
          currentPage: 1,
          total: 0,
          from: 0,
          to: 0,
          perPage: 10,
          links: []
        }
      },
    },
    query: {
      type: Object,
      // default: {},
    },
    tableData: {
      type: Object,
      required: true,
      default: () => {
        rowColor: []
      }
    },
  },
  mounted() {
    this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
  },
  methods: {
    showDetails(id) {
      router.push({
        name: router.currentRoute.matched[0].path == "/m" ? "Mobile Billing Record Detail" : "Billing Record Detail",
        params: {
          billingRecordId: id,
          previousRoute: router.currentRoute.fullPath
        }
      });
    },
    // if (router.currentRoute.name == "Billing Records") {
    //   swal.fire({
    //     title: this.$t('alert.billingRecordFailedAdded'),
    //     text: this.$t('alert.billingRecordFailedAddedTextInTenantDetail'),
    //     buttonsStyling: false,
    //     confirmButtonClass: "btn btn-info btn-fill",
    //     icon: "error",
    //   });
    //   return;
    // }
    editDetails(id) {
      swal.fire({
        title: this.$t('alert.notEditable'),
        text: this.$t('alert.notEditableText'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "error",
      });
    },
    deleteDetails(id) {
      swal.fire({
        title: this.$t('alert.notDeletable'),
        text: this.$t('alert.notDeletableText'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "error",
      });
    },
    addModel() {
      if (this.$props.query ? !this.$props.query.tenantId : true) {
        this.$store.dispatch('asset/get').then(() => {
          if (this.$store.getters["asset/data"].total <= 0) {
            swal.fire({
              title: this.$t('alert.billingRecordFailedAdded'),
              text: this.$t('alert.noAssetAddingBillingRecord'),
              buttonsStyling: false,
              showCancelButton: true,
              confirmButtonText: this.$t('component.add') + ' ' + this.$t('sidebar.asset'),
              cancelButtonText: this.$t('component.cancel'),
              cancelButtonClass: "btn btn-info btn-fill",
              confirmButtonClass: "btn btn-info btn-fill",
              icon: "error",
            }).then((result) => {
              if (result.value) {
                this.$router.push({
                  name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Assets" : "Add Assets",
                  params: {
                    previousRoute: this.$router.currentRoute.fullPath
                  }
                });
              }
            });
          } else {
            this.$store.dispatch('tenant/get').then(() => {
              if (this.$store.getters["tenant/data"].total <= 0) {
                swal.fire({
                  title: this.$t('alert.billingRecordFailedAdded'),
                  text: this.$t('alert.noTenantAddingBillingRecord'),
                  buttonsStyling: false,
                  showCancelButton: true,
                  confirmButtonText: this.$t('component.add') + ' ' + this.$t('sidebar.tenant'),
                  cancelButtonText: this.$t('component.cancel'),
                  cancelButtonClass: "btn btn-info btn-fill",
                  confirmButtonClass: "btn btn-info btn-fill",
                  icon: "error",
                }).then((result) => {
                  if (result.value) {
                    this.$router.push({
                      name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Tenant" : "Add Tenant",
                      params: {
                        previousRoute: this.$router.currentRoute.fullPath
                      }
                    });
                  }
                });
              } else {
                if (!this.resource.data.canAdd) {
                  swal.fire({
                    title: this.$t('alert.billingRecordFailedAdded'),
                    text: this.$t('alert.billingRecordFailedAddedText'),
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-info btn-fill",
                    icon: "error",
                  });
                  return;
                }
                if (!this.userResource.model.landlord_ids) {
                  this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
                }
                router.push({
                  name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Billing Record" : "Add Billing Record",
                  query: {
                    senderType: "TENANT",
                    senderId: this.$props.query ? this.$props.query.tenantId : null,
                    recipientType: "LANDLORD",
                    recipientId: this.userResource.model.landlord_ids[0],
                    assetId: this.$props.query ? this.$props.query.assetId : null,
                    tenureContractId: this.$props.query ? this.$props.query.tenureContractId : null,
                    // billImmediately: !isRecurring
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
        if (!this.resource.data.canAdd) {
          swal.fire({
            title: this.$t('alert.billingRecordFailedAdded'),
            text: this.$t('alert.billingRecordFailedAddedText'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            icon: "error",
          });
          return;
        }
        if (!this.userResource.model.landlord_ids) {
          this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
        }
        router.push({
          name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Billing Record" : "Add Billing Record",
          query: {
            senderType: "TENANT",
            senderId: this.$props.query ? this.$props.query.tenantId : null,
            recipientType: "LANDLORD",
            recipientId: this.userResource.model.landlord_ids[0],
            assetId: this.$props.query ? this.$props.query.assetId : null,
            tenureContractId: this.$props.query ? this.$props.query.tenureContractId : null,
            // billImmediately: !isRecurring
          },
          params: {
            previousRoute: router.currentRoute.fullPath
          }
        });
      }
    },
    async addReminder() {
      this.$store.dispatch('asset/get').then(() => {
        if (this.$store.getters["asset/data"].total <= 0) {
          swal.fire({
            title: this.$t('alert.billingRecordFailedAdded'),
            text: this.$t('alert.noAssetAddingBillingRecord'),
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: this.$t('component.add') + ' ' + this.$t('sidebar.asset'),
            cancelButtonText: this.$t('component.cancel'),
            cancelButtonClass: "btn btn-info btn-fill",
            confirmButtonClass: "btn btn-info btn-fill",
            icon: "error",
          }).then((result) => {
            if (result.value) {
              this.$router.push({
                name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Assets" : "Add Assets",
                params: {
                  previousRoute: this.$router.currentRoute.fullPath
                }
              });
            }
          });
        } else {
          if (!this.resource.data.canAdd) {
            swal.fire({
              title: this.$t('alert.billingRecordFailedAdded'),
              text: this.$t('alert.billingRecordFailedAddedText'),
              buttonsStyling: false,
              confirmButtonClass: "btn btn-info btn-fill",
              icon: "error",
            });
            return;
          }
          if (!this.userResource.model.landlord_ids) {
            this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
          }
          router.push({
            name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Billing Record" : "Add Billing Record",
            query: {
              senderType: "LANDLORD",
              senderId: this.userResource.model.landlord_ids[0],
              recipientType: "VENDOR",
              recipientId: 1,
              assetId: this.$props.query ? this.$props.query.assetId : null,
            },
            params: {
              previousRoute: router.currentRoute.fullPath
            }
          });
        }
      });
        
    },
    async handlePagination(pageId) {
      this.paginationPage = pageId;
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        if (this.$props.query) {
          if (this.$props.query.tenureContractId) {
            var param = {
              id: this.$props.query.tenureContractId,
              pageId: pageId
            }
            await this.$store.dispatch('tenureContract/getBillingRecords', param).then(() => {
              this.resource.models = this.$store.getters["tenureContract/billingRecordModels"];
              this.resource.data = Object.assign({}, this.$store.getters["tenureContract/billingRecordData"]);
              let tmpRowColor = [];
              let today = new Date();
              for (let i = 0; i < this.resource.models.length; i++) {
                let date = new Date(this.resource.models[i].billing_end_at);
                if (date > today) {
                  tmpRowColor.push({});
                } else {
                  tmpRowColor.push({'backgroundColor': '#00000011'});
                }
              }
              this.tableData.rowColor = tmpRowColor;
            });
          } else if (this.$props.query.tenantId) {
            var param = {
              id: this.$props.query.tenantId,
              pageId: pageId
            }
            await this.$store.dispatch('tenant/getBillingRecords', param).then(() => {
              this.resource.models = this.$store.getters["tenant/billingRecordModels"];
              this.resource.data = Object.assign({}, this.$store.getters["tenant/billingRecordData"])
              ;
              let tmpRowColor = [];
              let today = new Date();
              for (let i = 0; i < this.resource.models.length; i++) {
                let date = new Date(this.resource.models[i].billing_end_at);
                if (date > today) {
                  tmpRowColor.push({});
                } else {
                  tmpRowColor.push({'backgroundColor': '#00000011'});
                }
              }
              this.tableData.rowColor = tmpRowColor;
            });
          } else {
            await this.$store.dispatch('billingRecords/get', pageId).then(() => {
              this.resource.models = this.$store.getters["billingRecords/models"];
              this.resource.data = Object.assign({}, this.$store.getters["billingRecords/data"]);
              let tmpRowColor = [];
              let today = new Date();
              for (let i = 0; i < this.resource.models.length; i++) {
                let date = new Date(this.resource.models[i].billing_end_at);
                if (date > today) {
                  tmpRowColor.push({});
                } else {
                  tmpRowColor.push({'backgroundColor': '#00000011'});
                }
              }
              this.tableData.rowColor = tmpRowColor;
            });
          }
        } else {
          await this.$store.dispatch('billingRecords/get', pageId).then(() => {
            this.resource.models = this.$store.getters["billingRecords/models"];
            this.resource.data = Object.assign({}, this.$store.getters["billingRecords/data"]);
            let tmpRowColor = [];
            let today = new Date();
            for (let i = 0; i < this.resource.models.length; i++) {
              let date = new Date(this.resource.models[i].billing_end_at);
              if (date > today) {
                tmpRowColor.push({});
              } else {
                tmpRowColor.push({'backgroundColor': '#00000011'});
              }
            }
            this.tableData.rowColor = tmpRowColor;
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
    longClickEvent(id) {
      swal.fire({
        title: this.$t('alert.editOrRemove'),
        text: this.$t('alert.editOrRemoveText') + " " + this.$t('sidebar.billingRecord') + "?",
        buttonsStyling: false,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: this.$t('component.edit'),
        denyButtonText: this.$t('component.remove'),
        cancelButtonText: this.$t('component.cancel'),
        cancelButtonClass: "btn btn-info btn-fill",
        denyButtonClass: "btn btn-info btn-fill",
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          swal.fire({
            title: this.$t('alert.notEditable'),
            text: this.$t('alert.notEditableText'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            icon: "error",
          });
        } else if (result.isDenied) {
          swal.fire({
            title: this.$t('alert.notDeletable'),
            text: this.$t('alert.notDeletableText'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            icon: "error",
          });
        }
      });
    }
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
