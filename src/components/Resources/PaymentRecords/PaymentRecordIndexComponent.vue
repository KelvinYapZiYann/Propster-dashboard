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
        <h4 slot="header" class="card-title text-left">{{$t('sidebar.paymentRecords')}}</h4>
        <div class="text-right mb-3">
          <base-button
            @click="addModel"
            class="mt-3"
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
          <base-table
            :disableEdit="true"
            :disableDelete="true"
            :data="resource.models"
            :columns="table.columns"
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
          payment_description: this.$t('property.description'),
          amount: this.$t('property.amount'),
          status: this.$t('property.status'),
          payment_method: this.$t('property.paymentMethod')
        },
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
        name: "Payment Record Detail",
        params: {
          paymentRecordId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    addModel() {
      // if (this.paymentRecordType == 'All') {
      //   swal({
      //     title: this.$t('alert.paymentRecordFailedAdded'),
      //     text: this.$t('alert.paymentRecordFailedAddedTextInTenantDetail'),
      //     buttonsStyling: false,
      //     confirmButtonClass: "btn btn-info btn-fill",
      //     type: "error",
      //   });
      //   return;
      // }
      if (this.$props.query ? !this.$props.query.tenantId : true) {
        this.$store.dispatch('asset/get').then(() => {
          if (this.$store.getters["asset/data"].total <= 0) {
            swal({
              title: this.$t('alert.paymentRecordFailedAdded'),
              text: this.$t('alert.noAssetAddingPaymentRecord'),
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
                  title: this.$t('alert.paymentRecordFailedAdded'),
                  text: this.$t('alert.noTenantAddingPaymentRecord'),
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
                if (!this.userResource.model.landlord_ids) {
                  this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
                }
                this.$router.push({
                  name: 'Add Payment Record',
                  query: {
                    senderType: "TENANT",
                    senderId: this.$props.query ? this.$props.query.tenantId : null,
                    recipientType: "LANDLORD",
                    recipientId: this.userResource.model.landlord_ids[0],
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
          name: 'Add Payment Record',
          query: {
            senderType: "TENANT",
            senderId: this.$props.query ? this.$props.query.tenantId : null,
            recipientType: "LANDLORD",
            recipientId: this.userResource.model.landlord_ids[0],
          },
          params: {
            previousRoute: this.$router.currentRoute.fullPath
          }
        });
      }
    },
    async handlePagination(pageId) {
      try {
        if (this.$props.query) {
          if (this.$props.query.tenantId) {
            var param = {
              id: this.$props.query.tenantId,
              pageId: pageId
            }
            await this.$store.dispatch('tenant/getPaymentRecords', param).then(() => {
              this.resource.models = this.$store.getters["tenant/paymentRecordModels"];
              this.resource.data = Object.assign({}, this.$store.getters["tenant/paymentRecordData"]);
            });
          } else if (this.$props.query.billingPaymentId) {
            var param = {
              id: this.$props.query.billingPaymentId,
              pageId: pageId
            }
            await this.$store.dispatch('billingPayments/getPaymentRecords', param).then(() => {
              this.resource.models = this.$store.getters["billingPayments/paymentRecordModels"];
              this.resource.data = Object.assign({}, this.$store.getters["billingPayments/paymentRecordData"]);
            });
          } else {
            await this.$store.dispatch('paymentRecords/get', pageId).then(() => {
              this.resource.models = this.$store.getters["paymentRecords/models"];
              this.resource.data = Object.assign({}, this.$store.getters["paymentRecords/data"]);
            });
          }
        } else {
          await this.$store.dispatch('paymentRecords/get', pageId).then(() => {
            this.resource.models = this.$store.getters["paymentRecords/models"];
            this.resource.data = Object.assign({}, this.$store.getters["paymentRecords/data"]);
          });
        }
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
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
