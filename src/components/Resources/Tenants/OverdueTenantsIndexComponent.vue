<template>
  <div class="content">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left">{{table.title}}</h4>
        <div class="table-responsive">
          <base-table
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            :disableEdit="true"
            :disableDelete="true"
          >
          </base-table>
        </div>
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
      </card>
    </div>
  </div>
</template>
<script>
import {BaseTable, BasePagination, Card} from "@/components";
import router from "@/router";

let tableColumns = {
  first_name: "First Name",
  last_name: "Last Name",
  // is_business: "Is Business",
  email: "Email",
  phone_number: "Phone Number",
  due_date: "Due Date",
  due_amount: "Due Amount"
};

const tableDefaultData = [
  {
    first_name: "",
    last_name: "",
    // is_business: "",
    email: "",
    phone_number: "",
    due_date: "",
    due_amount: "",
  }
];

export default {
  components: {
    BaseTable,
    BasePagination,
    Card
  },
  data() {
    return {
      table: {
        title: "Overdue Tenants List",
        columns: {...tableColumns},
        data: [...tableDefaultData]
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
    // assetId: {
    //   type: Number | Object,
    //   default: null
    // }
    // showAll: {
    //   type: Boolean,
    //   required: true,
    //   default: false
    // }
  },
  methods: {
    showDetails(id) {
        router.push({
        name: "Tenant Detail", 
        params: {
            tenantId: id,
            previousRoute: this.$router.currentRoute.fullPath
        }
        });
    },
    getResource() {
      this.$emit('getResource')
    },
    async handlePagination(pageId) {
        try {
            await this.$store.dispatch('tenant/get', pageId).then(() => {
                this.resource.models = this.$store.getters["tenant/models"];
                this.resource.data = Object.assign({}, this.$store.getters["tenant/data"]);
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
