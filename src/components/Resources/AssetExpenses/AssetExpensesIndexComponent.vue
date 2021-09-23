<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h3 slot="header" class="card-title">{{$t('sidebar.assetExpenses')}}</h3>
        <div class="text-right">
          <base-button
            @click="addModel"
            type="info"
          >
            {{$t('component.add')}} {{$t('sidebar.assetExpenses')}}
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
          <base-table
            :data="resource.models"
            :columns="table.columns"
            :columnsDisplayPrefix="table.columnsDisplayPrefix"
            :columnsDisplayValue="table.columnsDisplayValue"
            :columnsClass="tableData.columnsClass"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            v-on:delete-details="deleteDetails"
            v-on:edit-details="editDetails"
            v-on:long-click-event="longClickEvent"
            :paginationPage="paginationPage"
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
              :per-page="resource.data.perPage"
              :total="resource.data.total"
              @input="handlePagination"
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

// let tableColumns = {
//   payment_description: "Payment Description",
//   amount: "Amount (RM)",
//   status: "Status",
//   payment_method: "Payment Method"
// };

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
          asset_nickname: this.$t('property.assetNickname'),
          payment_description: this.$t('property.description'),
          amount: this.$t('property.amount'),
          // status: this.$t('property.status'),
          // payment_method: this.$t('property.paymentMethod'),
          // created_at: this.$t('property.createdAt'),
        } : {
          asset_nickname: this.$t('property.assetNickname'),
          payment_description: this.$t('property.description'),
          amount: this.$t('property.amount'),
          // status: this.$t('property.status'),
          payment_method: this.$t('property.paymentMethod'),
          created_at: this.$t('property.createdAt'),
        },
        columnsDisplayPrefix: {
          amount: "RM"
        },
        // columnsClassColumn: [
        //   "status"
        // ],
        columnsDisplayValue: {
          status: {
            RECEIVED: "Received",
            AWAITING_ACKNOWLEDGEMENT: "Awaiting Acknowledgement",
            PROCESSING: "Processing",
            CREATED: "Created",
          },
          payment_method: {
            BANK_TRANSFER: "Bank Transfer",
            CASH: "Cash",
            CREDIT_CARD: "Credit Card",
            EWALLET_C2B: "E-Wallet(C2B)",
            EWALLET_P2P: "E-Wallet(P2P)",
          }
        }
      },
      searchQuery: "",
      searchQueryTimeout: null,
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
        columnsClass: [
          {name: "status", class:[]}
        ]
      }
    },
    query: {
      type: Object,
      // default: {},
    }
  },
  methods: {
    showDetails(id) {
      router.push({
        name: router.currentRoute.matched[0].path == "/m" ? "Mobile Asset Expenses Detail" : "Asset Expenses Detail",
        params: {
          assetExpenseId: id,
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
      if (this.$props.query ? !this.$props.query.assetId : true) {
        this.$store.dispatch('asset/get').then(() => {
          if (this.$store.getters["asset/data"].total <= 0) {
            swal.fire({
              title: this.$t('alert.assetExpenseFailedAdded'),
              text: this.$t('alert.noAssetAddingAssetExpense'),
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
                title: this.$t('alert.assetExpenseFailedAdded'),
                text: this.$t('alert.noAssetAddingAssetExpense'),
                buttonsStyling: false,
                confirmButtonClass: "btn btn-info btn-fill",
                icon: "error",
              });
              return;
            }
            this.$router.push({
              name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Asset Expenses" : "Add Asset Expenses",
              query: this.query,
              params: {
                previousRoute: this.$router.currentRoute.fullPath
              }
            });
          }
        });
      } else {
        this.$router.push({
          name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Asset Expenses" : "Add Asset Expenses",
          query: this.query,
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
          if (this.$props.query.assetId) {
            var param = {
              id: this.$props.query.assetId,
              pageId: pageId
            }
            await this.$store.dispatch('asset/getAssetExpenses', param).then(() => {
              this.resource.models = this.$store.getters["asset/assetExpenseModels"];
              this.resource.data = Object.assign({}, this.$store.getters["asset/assetExpenseData"]);
              let tmpColumnsClass = [];
              for (let i = 0; i < this.resource.models.length; i++) {
                if (this.resource.models[i].status == 'RECEIVED') {
                  tmpColumnsClass.push('badge badge-pill badge-success');
                }
              }
              this.tableData.columnsClass[0] = {name:"status", class:tmpColumnsClass};
            });
          } else {
            await this.$store.dispatch('assetExpenses/get', pageId).then(() => {
              this.resource.models = this.$store.getters["assetExpenses/models"];
              this.resource.data = Object.assign({}, this.$store.getters["assetExpenses/data"]);
              let tmpColumnsClass = [];
              for (let i = 0; i < this.resource.models.length; i++) {
                if (this.resource.models[i].status == 'RECEIVED') {
                  tmpColumnsClass.push('badge badge-pill badge-success');
                }
              }
              this.tableData.columnsClass[0] = {name:"status", class:tmpColumnsClass};
            });
          }
        } else {
          await this.$store.dispatch('assetExpenses/get', pageId).then(() => {
            this.resource.models = this.$store.getters["assetExpenses/models"];
            this.resource.data = Object.assign({}, this.$store.getters["assetExpenses/data"]);
            let tmpColumnsClass = [];
            for (let i = 0; i < this.resource.models.length; i++) {
              if (this.resource.models[i].status == 'RECEIVED') {
                tmpColumnsClass.push('badge badge-pill badge-success');
              }
            }
            this.tableData.columnsClass[0] = {name:"status", class:tmpColumnsClass};
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
        text: this.$t('alert.editOrRemoveText') + " " + this.$t('sidebar.assetExpense') + "?",
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
