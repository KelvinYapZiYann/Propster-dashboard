<template>
  <div class="row">
    <div class="col-12">
      <!-- <div class="pro-feature alert alert-danger" v-if="!resource.data.canAdd">
        <strong>
          You can only add ONE {{ table.title }} with free tier. Get
          <a
            href="https://www.propster.io"
            target="_blank"
          >PRO</a>
          version to add more {{ table.title }} !
        </strong>
      </div> -->
      <card>
        <h3 slot="header" class="card-title">{{$t('sidebar.paymentRecords')}}</h3>
        <div class="text-right">
          <base-button
            @click="addModel"
            type="info"
          >{{$t('component.add')}} {{$t('sidebar.paymentRecords')}}
          </base-button>
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
          <payment-record-table
            :data="resource.models"
            v-on:show-details="showDetails"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails"
            v-on:long-click-event="longClickEvent"
            :paginationPage="paginationPage"
            v-if="$router.currentRoute.matched[0].path == '/m'"
          >
          </payment-record-table>
          <base-table
            :data="resource.models"
            :columns="table.columns"
            :columnsDisplayPrefix="table.columnsDisplayPrefix"
            :columnsDisplayValue="table.columnsDisplayValue"
            :columnsClass="tableData.columnsClass"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails"
            v-on:long-click-event="longClickEvent"
            :paginationPage="paginationPage"
            v-else
          >
          <!-- :columnsClassColumn="table.columnsClassColumn" -->
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
import PaymentRecordTable from "./PaymentRecordTable";
import router from "@/router";
import swal from "sweetalert2";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    BaseInput,
    BaseTable,
    BasePagination,
    Card,
    PaymentRecordTable
  },
  data() {
    return {
      table: {
        columns: this.$store.getters["mobileLayout/isMobileLayout"] ? {
          sender_name: this.$t('property.senderName'),
          recipient_name: this.$t('property.recipientName'),
          // asset_nickname: this.$t('property.assetNickname'),
          payment_description: this.$t('property.description'),
          // cash_flow_direction: this.$t('property.cashflow'),
          amount: this.$t('property.amount'),
          // status: this.$t('property.status'),
          // payment_method: this.$t('property.paymentMethod'),
          // created_at: this.$t('property.createdAt')
        } : {
          sender_name: this.$t('property.senderName'),
          recipient_name: this.$t('property.recipientName'),
          asset_nickname: this.$t('property.assetNickname'),
          payment_description: this.$t('property.description'),
          cash_flow_direction: this.$t('property.cashflow'),
          amount: this.$t('property.amount'),
          status: this.$t('property.status'),
          payment_method: this.$t('property.paymentMethod'),
          created_at: this.$t('property.createdAt')
        },
        columnsDisplayPrefix: {
          amount: "RM"
        },
        // columnsClassColumn: [
        //   "status",
        //   "cash_flow_direction"
        // ],
        columnsDisplayValue: {
          status: {
            RECEIVED: "Received",
            AWAITING_ACKNOWLEDGEMENT: "Awaiting Acknowledgement",
            PROCESSING: "Processing",
            CREATED: "Created",
          },
          recipient_name: {
            "null": "Vendor"
          },
          payment_method: {
            BANK_TRANSFER: "Bank Transfer",
            CASH: "Cash",
            CREDIT_CARD: "Credit Card",
            EWALLET_C2B: "E-Wallet(C2B)",
            EWALLET_P2P: "E-Wallet(P2P)",
          },
          cash_flow_direction: {
            SENDING: "Out",
            RECEIVING: "In",
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
      description: "Resource info"
    },
    tableData: {
      type: Object,
      required: true,
      default: () => {
        columnClass: [
          {name: "status" , class: []},
          {name: "cashflow" , class: []},
        ]
      }
    },
    query: {
      type: Object,
      // default: {},
    }
  },
  mounted() {
    this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
  },
  methods: {
    showDetails(id) {
      router.push({
        name: router.currentRoute.matched[0].path == "/m" ? "Mobile Payment Record Detail" : "Payment Record Detail",
        params: {
          paymentRecordId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
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
      // if (this.paymentRecordType == 'All') {
      //   swal.fire({
      //     title: this.$t('alert.paymentRecordFailedAdded'),
      //     text: this.$t('alert.paymentRecordFailedAddedTextInTenantDetail'),
      //     buttonsStyling: false,
      //     confirmButtonClass: "btn btn-info btn-fill",
      //     icon: "error",
      //   });
      //   return;
      // }
      if (this.$props.query ? !this.$props.query.tenantId : true) {
        this.$store.dispatch('asset/get').then(() => {
          if (this.$store.getters["asset/data"].total <= 0) {
            swal.fire({
              title: this.$t('alert.paymentRecordFailedAdded'),
              text: this.$t('alert.noAssetAddingPaymentRecord'),
              buttonsStyling: false,
              showCancelButton: true,
              confirmButtonText: this.$t('component.add') + ' ' + this.$t('sidebar.asset'),
              cancelButtonText: this.$t('component.cancel'),
              cancelButtonClass: "btn btn-neutral btn-fill",
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
                  title: this.$t('alert.paymentRecordFailedAdded'),
                  text: this.$t('alert.noTenantAddingPaymentRecord'),
                  buttonsStyling: false,
                  showCancelButton: true,
                  confirmButtonText: this.$t('component.add') + ' ' + this.$t('sidebar.tenant'),
                  cancelButtonText: this.$t('component.cancel'),
                  cancelButtonClass: "btn btn-neutral btn-fill",
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
                if (!this.userResource.model.landlord_ids) {
                  this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
                }
                this.$router.push({
                  name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Payment Record" : "Add Payment Record",
                  query: {
                    senderType: "TENANT",
                    senderId: this.$props.query ? this.$props.query.tenantId : null,
                    recipientType: "LANDLORD",
                    recipientId: this.userResource.model.landlord_ids[0],
                    assetId: this.$props.query ? this.$props.query.assetId : null,
                    paymentType: this.$props.query ? this.$props.query.paymentType : null,
                    amount: this.$props.query ? this.$props.query.amount : null,
                    billingPaymentId: this.$props.query ? this.$props.query.billingPaymentId : null
                  },
                  params: {
                    previousRoute: this.$router.currentRoute.fullPath
                  }
                });
              }
            });
          }
        });
      } else {
        if (!this.userResource.model.landlord_ids) {
          this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
        }
        this.$router.push({
          name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Payment Record" : "Add Payment Record",
          query: {
            senderType: "TENANT",
            senderId: this.$props.query ? this.$props.query.tenantId : null,
            recipientType: "LANDLORD",
            recipientId: this.userResource.model.landlord_ids[0],
            assetId: this.$props.query ? this.$props.query.assetId : null,
            paymentType: this.$props.query ? this.$props.query.paymentType : null,
            amount: this.$props.query ? this.$props.query.amount : null,
            billingPaymentId: this.$props.query ? this.$props.query.billingPaymentId : null
          },
          params: {
            previousRoute: this.$router.currentRoute.fullPath
          }
        });
      }
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
          if (this.$props.query.billingPaymentId) {
            var param = {
              id: this.$props.query.billingPaymentId,
              pageId: pageId
            }
            await this.$store.dispatch('billingPayments/getPaymentRecords', param).then(() => {
              this.resource.models = this.$store.getters["billingPayments/paymentRecordModels"];
              this.resource.data = Object.assign({}, this.$store.getters["billingPayments/paymentRecordData"]);
              this.insertColumnBadgeClass(this.resource.models);
            });
          } else if (this.$props.query.tenantId) {
            var param = {
              id: this.$props.query.tenantId,
              pageId: pageId
            }
            await this.$store.dispatch('tenant/getPaymentRecords', param).then(() => {
              this.resource.models = this.$store.getters["tenant/paymentRecordModels"];
              this.resource.data = Object.assign({}, this.$store.getters["tenant/paymentRecordData"]);
              this.insertColumnBadgeClass(this.resource.models);
            });
          } else {
            await this.$store.dispatch('paymentRecords/get', pageId).then(() => {
              this.resource.models = this.$store.getters["paymentRecords/models"];
              this.resource.data = Object.assign({}, this.$store.getters["paymentRecords/data"]);
              this.insertColumnBadgeClass(this.resource.models);
            });
          }
        } else {
          await this.$store.dispatch('paymentRecords/get', pageId).then(() => {
            this.resource.models = this.$store.getters["paymentRecords/models"];
            this.resource.data = Object.assign({}, this.$store.getters["paymentRecords/data"]);
            this.insertColumnBadgeClass(this.resource.models);
          });
        }
      } catch (e) {
        console.log(e);
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    },
    insertColumnBadgeClass(models) {
      let tmpStatusColumnsClass = [];
      let tmpCashflowColumnsClass = [];
      for (let i = 0; i < models.length; i++) {
        if (models[i].status == 'RECEIVED') {
          tmpStatusColumnsClass.push('badge badge-pill badge-success');
        } else if (models[i].status == 'AWAITING_ACKNOWLEDGEMENT') {
          tmpStatusColumnsClass.push('badge badge-pill badge-warning');
        }
        if (models[i].cash_flow_direction == 'RECEIVING') {
          tmpCashflowColumnsClass.push('badge badge-pill badge-success');
        } else if (models[i].cash_flow_direction == 'SENDING') {
          tmpCashflowColumnsClass.push('badge badge-pill badge-danger');
        }
      }
      this.tableData.columnsClass = [
        {name: "status", class: tmpStatusColumnsClass},
        {name: "cash_flow_direction", class: tmpCashflowColumnsClass}
      ]
    },
    longClickEvent(id) {
      swal.fire({
        title: this.$t('alert.editOrRemove'),
        text: this.$t('alert.editOrRemoveText') + " " + this.$t('sidebar.paymentRecord') + "?",
        buttonsStyling: false,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: this.$t('component.edit'),
        denyButtonText: this.$t('component.remove'),
        cancelButtonText: this.$t('component.cancel'),
        cancelButtonClass: "btn btn-neutral btn-fill",
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
