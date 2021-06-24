<template>
  <div class="content">
    <div class="col-12">
      <div class="pro-feature alert alert-danger">
        <strong>
          You can only add 3 {{table.title}} per asset with free tier. Get
          <a
            href="https://www.propster.io"
            target="_blank"
          >PRO</a>
          version to add more {{ table.title }} !
        </strong>
      </div>
      <card>
        <h4 slot="header" class="card-title text-left">{{table.title}}</h4>
        <div class="text-right mb-3">
          <base-button
            @click="addModel"
            class="mt-3"
            type="primary"
            v-bind:disabled="!resource.data.canAdd"
          >Add {{table.title}}</base-button>
        </div>
        <div class="table-responsive">
          <base-table
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails"
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
  is_business: "Is Business",
};

const tableDefaultData = [
  {
    first_name: "",
    last_name: "",
    is_business: "",
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
        title: "Tenants",
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
    // showAll: {
    //   type: Boolean,
    //   required: true,
    //   default: false
    // }
  },
  methods: {
    showDetails(id) {
      router.push({path: "/tenants/" + id});
    },
    editDetails(id) {
      router.push({path: "/tenants/" + id + "/edit"});
    },
    deleteDetails(id) {
      if (id == null) {
        this.$notify({
          message: 'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } else {
        try {
          this.$store.dispatch('tenant/remove', id)
          this.$notify({
            message: 'Successfully Deleted',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.getResource();
        } catch (e) {
          this.$notify({
            message: 'Server error',
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        }
      }
    },
    addModel() {
      this.$router.push({
        name: 'Add Tenant',
        query: this.query
      });
    },
    async handlePagination(pageId) {
      try {
        if (this.$props.query) {
          if (this.$props.query.modelType === 'asset_id') {
            var param = {
              id: this.$props.query.modelId,
              pageId: pageId
            }
            await this.$store.dispatch('asset/getTenants', param).then(() => {
              this.resource.models = this.$store.getters["asset/tenantModels"];
              this.resource.data = Object.assign({}, this.$store.getters["asset/tenantData"]);
            });
          } else {
            await this.$store.dispatch('tenant/get', pageId).then(() => {
              this.resource.models = this.$store.getters["tenant/models"];
              this.resource.data = Object.assign({}, this.$store.getters["tenant/data"]);
            });
          }
        } else {
          await this.$store.dispatch('tenant/get', pageId).then(() => {
            this.resource.models = this.$store.getters["tenant/models"];
            this.resource.data = Object.assign({}, this.$store.getters["tenant/data"]);
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
