<template>
  <div class="content">
    <div class="col-12">
      <!-- <div class="pro-feature alert alert-danger" v-if="!resource.data.canAdd">
        <strong>
          You can only add ONE {{ table.title }} with free tier. Get
          <a
            href="https://www.creative-tim.com/live/vue-black-dashboard-pro-laravel"
            target="_blank"
          >PRO</a>
          version to add more {{ table.title }} !
        </strong>
      </div> -->
      <card>
        <h4 slot="header" class="card-title text-left">{{paymentRecordType == "All" ? "" : (paymentRecordType + " ")}}{{table.title}}</h4>
        <div class="text-right mb-3">
          <base-button
            @click="addModel"
            class="mt-3"
            type="primary"
            v-bind:disabled="!resource.data.canAdd"
          >Add {{paymentRecordType == "All" ? "" : (paymentRecordType + " ")}}{{ table.title }}
          </base-button>
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
            >
            </base-pagination>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import {BaseTable, BasePagination, Card} from "@/components";
import router from "@/router";

let tableColumns = {
  payment_description: "Payment Description",
  amount: "Amount (RM)",
  cash_flow_direction: "Cash flow",
  payment_method: "Payment Method"
};

export default {
  components: {
    BaseTable,
    BasePagination,
    Card
  },
  data() {
    return {
      table: {
        title: "Payment Records",
        columns: {...tableColumns},
      }
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
    },
    paymentRecordType: {
      type: String,
      required: true,
      default: function() {
        return "";
      }
    }
  },
  methods: {
    showDetails(id) {
      router.push({path: "/payment-records/" + id});
    },
    addModel() {
      this.$router.push({
        name: 'Add Payment Record',
        query: this.query
      });
    },
    async handlePagination(pageId) {
      try {
        if (this.$props.query) {
          if (this.$props.query.modelType === 'tenant_id') {
            var param = {
              modelType: this.$props.query.modelType,
              id: this.$props.query.modelId,
              pageId: pageId
            }
            await this.$store.dispatch('tenant/getPaymentRecords', param).then(() => {
              this.resource.models = this.$store.getters["tenant/paymentRecordModels"];
              this.resource.data = Object.assign({}, this.$store.getters["tenant/paymentRecordData"]);
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
  }
};
</script>
<style>
</style>
