<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left">{{$t('sidebar.billingPayments')}}</h4>
        <!-- <div class="text-right mb-3">
          <base-button
            @click="addModel"
            class="mt-3"
            type="info"
          >{{$t('component.add')}} {{$t('sidebar.billingPayment')}}</base-button>
        </div> -->
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
          description: this.$t('property.description'),
          amount: this.$t('property.amount'),
          payment_type: this.$t('property.paymentType')
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
      if (this.$props.query) {
        if (this.$props.query.billingRecordId) {
          try {
            var param = {
              id: this.$props.query.billingRecordId,
              pageId: pageId
            }
            await this.$store.dispatch('billingRecords/getBillingPayments', param).then(() => {
              this.resource.models = this.$store.getters["billingRecords/billingPaymentModels"];
              this.resource.data = Object.assign({}, this.$store.getters["billingRecords/billingPaymentData"]);
            });
          } catch (e) {
            this.$notify({
              message:'Server error',
              icon: 'tim-icons icon-bell-55',
              type: 'danger'
            });
          }
        } else {
          try {
            await this.$store.dispatch('billingPayments/get', pageId).then(() => {
              this.resource.models = this.$store.getters["billingPayments/models"];
              this.resource.data = Object.assign({}, this.$store.getters["billingPayments/data"]);
            });
          } catch (e) {
            this.$notify({
              message:'Server error',
              icon: 'tim-icons icon-bell-55',
              type: 'danger'
            });
          }
        }
      } else {
        try {
          await this.$store.dispatch('billingPayments/get', pageId).then(() => {
            this.resource.models = this.$store.getters["billingPayments/models"];
            this.resource.data = Object.assign({}, this.$store.getters["billingPayments/data"]);
          });
        } catch (e) {
          this.$notify({
            message:'Server error',
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        }
      }
    },
    addModel() {
      swal({
        title: this.$t('alert.billingPaymentFailedAdded'),
        text: this.$t('alert.billingPaymentFailedAddedText'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        type: "error",
      });
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
