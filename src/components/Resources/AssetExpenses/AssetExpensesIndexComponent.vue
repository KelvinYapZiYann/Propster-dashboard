<template>
  <div class="content">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left">{{table.title}}</h4>
        <div class="table-responsive">
          <base-table
            :disableEdit="true"
            :disableDelete="true"
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
          >
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
      default: {},
    }
  },
  methods: {
    showDetails(id) {
      router.push({path: "/asset-expenses/" + id});
    },
    async handlePagination(pageId) {
      try {
        console.log(this.props.query);
        await this.$store.dispatch('assetExpenses/get', pageId).then(() => {
          this.resource.models = this.$store.getters["assetExpenses/models"];
          this.resource.data = Object.assign({}, this.$store.getters["assetExpenses/data"]);
        });
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
