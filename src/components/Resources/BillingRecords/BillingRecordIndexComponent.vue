<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left">{{$t('sidebar.billingRecords')}}</h4>
        <div class="text-right mb-3">
          <base-button
            @click="addModel"
            class="mt-3"
            type="info"
            v-bind:disabled="!resource.data.canAdd"
          >
            {{$t('component.add')}} {{$t('sidebar.billingRecords')}}
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
              type="info"
            >
            <!-- :per-page="resource.data.perPage" -->
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
          description: this.$t('property.billingName'),
          payment_type: this.$t('property.paymentType'),
          amount: this.$t('property.amount'),
          billing_start_at: this.$t('property.startDate'),
          billing_end_at: this.$t('property.endDate'),
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
          // perPage: 10,
          links: []
        }
      },
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
        name: "Billing Record Detail",
        params: {
          billingRecordsId: id,
          previousRoute: router.currentRoute.fullPath
        }
      });
    },
    addModel() {
      // if (router.currentRoute.name == "Billing Records") {
      //   swal({
      //     title: this.$t('alert.billingRecordFailedAdded'),
      //     text: this.$t('alert.billingRecordFailedAddedTextInTenantDetail'),
      //     buttonsStyling: false,
      //     confirmButtonClass: "btn btn-info btn-fill",
      //     type: "error",
      //   });
      //   return;
      // }
      if (!this.resource.data.canAdd) {
        swal({
          title: this.$t('alert.billingRecordFailedAdded'),
          text: this.$t('alert.billingRecordFailedAddedText'),
          buttonsStyling: false,
          confirmButtonClass: "btn btn-info btn-fill",
          type: "error",
        });
        return;
      }
      if (!this.userResource.model.landlord_ids) {
        this.userResource.model = Object.assign({}, this.$store.getters["users/model"])
      }
      // if (this.$props.query) {
        router.push({
          name: 'Add Billing Record',
          query: {
            senderType: "TENANT",
            senderId: this.$props.query ? this.$props.query.tenantId : null,
            recipientType: "LANDLORD",
            recipientId: this.userResource.model.landlord_ids[0],
            assetId: this.$props.query ? this.$props.query.assetId : null,
          },
          params: {
            previousRoute: router.currentRoute.fullPath
          }
        });
      // } else {
        
      // }
    },
    async handlePagination(pageId) {
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
            });
          } else if (this.$props.query.tenantId) {
            var param = {
              id: this.$props.query.tenantId,
              pageId: pageId
            }
            await this.$store.dispatch('tenant/getBillingRecords', param).then(() => {
              this.resource.models = this.$store.getters["tenant/billingRecordModels"];
              this.resource.data = Object.assign({}, this.$store.getters["tenant/billingRecordData"]);
            });
          } else {
            await this.$store.dispatch('billingRecords/get', pageId).then(() => {
              this.resource.models = this.$store.getters["billingRecords/models"];
              this.resource.data = Object.assign({}, this.$store.getters["billingRecords/data"]);
            });
          }
        } else {
          await this.$store.dispatch('billingRecords/get', pageId).then(() => {
            this.resource.models = this.$store.getters["billingRecords/models"];
            this.resource.data = Object.assign({}, this.$store.getters["billingRecords/data"]);
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
