<template>
  <div class="content">
    <div class="col-12">
      <div class="pro-feature alert alert-danger">
        <strong>
          You can only add ONE {{table.title}} with free tier. Get 
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
            type="info"
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
import {BaseTable, BasePagination, Card} from "@/components";
import router from "@/router";

let tableColumns = {
  asset_nickname: "Asset Nickname",
  asset_ownership_type: "Ownership Type",
  asset_size: "Size",
  is_occupied: "Currently Occupied",
  is_multi_unit: "Is Multi Unit"
};

const tableDefaultData = [
  {
    id: "",
    asset_nickname: "",
    ownership_type: "",
    ownership_size: "",
    is_occupied: "",
    is_multi_unit: ""
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
        title: "Assets",
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
    }
  },
  methods: {
    showDetails(id) {
      router.push({
        name: "Asset Detail",
        params: {
          assetId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    editDetails(id) {
      router.push({
        name: "Edit Assets",
        params: {
          assetId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    deleteDetails(id) {
      if (id == null) {
        this.$notify({
          message:'Server error del id == null',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } else {
        try {
          this.$store.dispatch('asset/remove', id)
          this.$notify({
            message:'Successfully Deleted',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.getResource();
        } catch (e) {
          this.$notify({
            message:'Server error when del',
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        }
      }
    },
    addModel() {
      router.push({
        name: "Add Assets",
        params: {
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    getResource() {
      this.$emit('getResource')
    },
    async handlePagination(pageId) {
      try {
        if (this.$props.query) {
          if (this.$props.query.tenantId) {
            var param = {
              id: this.$props.query.tenantId,
              pageId: pageId
            }
            await this.$store.dispatch('tenant/getAssets', param).then(() => {
              this.resource.models = this.$store.getters["tenant/assetModels"];
              this.resource.data = Object.assign({}, this.$store.getters["tenant/assetData"]);
            });
          } else {
            await this.$store.dispatch('asset/get', pageId).then(() => {
              this.resource.models = this.$store.getters["asset/models"];
              this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);
            });
          }
        } else {
          await this.$store.dispatch('asset/get', pageId).then(() => {
            this.resource.models = this.$store.getters["asset/models"];
            this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);
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
