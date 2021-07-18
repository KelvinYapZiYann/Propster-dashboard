<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left">{{billingRecordType == "All" ? "" : (billingRecordType + " ")}}{{table.title}}</h4>
        <div class="text-right mb-3">
        </div>
        <div class="row">
          <div class="col-xl-4 col-lg-5 col-md-6 ml-auto">
            <base-input 
                    addonLeftIcon="el-icon-search"
                    placeholder="Search"
                    v-model="searchQuery">
            </base-input>
          </div>
        </div>
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
                Showing {{ resource.data.from }} to {{ resource.data.to }} of {{ resource.data.total }} entries
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

let tableColumns = {
//   sender_name: "Sender",
//   recipient_name: "Recipient",
//   asset_nickname: "Asset",
//   payment_description: "Payment Description",
//   amount: "Amount (RM)",
//   status: "Status",
//   payment_method: "Payment Method"
};

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
        title: "Billing Records",
        columns: {...tableColumns},
      },
      searchQuery: "",
      searchQueryTimeout: null,
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
    billingRecordType: {
      type: String,
      required: true,
      default: function() {
        return "";
      }
    }
  },
  methods: {
    showDetails(id) {
      router.push({
        name: "Billing Record Detail",
        params: {
          paymentRecordsId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    async handlePagination(pageId) {
      try {
        if (this.$props.query) {
          if (this.$props.query.tenantId) {
            var param = {
              tenantId: this.$props.query.tenantId,
              id: this.$props.query.tenantId,
              pageId: pageId
            }
            // await this.$store.dispatch('tenant/getPaymentRecords', param).then(() => {
            //   this.resource.models = this.$store.getters["tenant/paymentRecordModels"];
            //   this.resource.data = Object.assign({}, this.$store.getters["tenant/paymentRecordData"]);
            // });
          } else {
            // await this.$store.dispatch('paymentRecords/get', pageId).then(() => {
            //   this.resource.models = this.$store.getters["paymentRecords/models"];
            //   this.resource.data = Object.assign({}, this.$store.getters["paymentRecords/data"]);
            // });
          }
        } else {
        //   await this.$store.dispatch('paymentRecords/get', pageId).then(() => {
        //     this.resource.models = this.$store.getters["paymentRecords/models"];
        //     this.resource.data = Object.assign({}, this.$store.getters["paymentRecords/data"]);
        //   });
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
