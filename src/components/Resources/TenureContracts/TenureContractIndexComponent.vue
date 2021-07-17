<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left">{{table.title}}</h4>
        <div class="text-right mb-3">
          <base-button
            @click="addModel"
            class="mt-3"
            type="info"
            v-bind:disabled="!resource.data.canAdd"
            v-if="resource.data.canAdd"
          >Add {{table.title}}</base-button>
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
        <div class="row">
          <div class="col-xl-4 col-lg-2 col-md-12">
          </div>
          <div class="col-xl-4 col-lg-5 col-md-6 ml-auto">
            <base-selector-input label="Asset Nickname"
                        placeholder="Asset Nickname"
                        v-model="assetIdComp"
                        :options="resource.selector.asset_id"
                        @input="filterAssetId"
                        >
            </base-selector-input>
          </div>
          <div class="col-xl-4 col-lg-5 col-md-6" v-if="query ? !query.tenantId : true">
            <base-selector-input label="Tenant Name"
                        placeholder="Tenant Name"
                        v-model="tenantIdComp"
                        :options="resource.selector.tenant_id"
                        @input="filterTenantId"
                        >
            </base-selector-input>
          </div>
        </div>
        <div class="table-responsive">
          <base-table
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            :disableDelete="true"
            :disableEdit="true"
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
import {BaseInput, BaseTable, BasePagination, BaseSelectorInput, Card} from "@/components";
import router from "@/router";

let tableColumns = {
  asset_nickname: "Asset Nickname",
  first_name: "Tenant First Name",
  contract_name: "Contract Name",
  monthly_rental_amount: "Monthly Rental Amount (RM)",
  tenure_start_date: "Tenure Start Date",
  tenure_end_date: "Tenure End Date",
};

const tableDefaultData = [
  {
    asset_nickname: "",
    first_name: "",
    contract_name: "",
    monthly_rental_amount: "",
    tenure_start_date: "",
    tenure_end_date: "",
  }
];

export default {
  components: {
    BaseInput,
    BaseTable,
    BasePagination,
    BaseSelectorInput,
    Card
  },
  data() {
    return {
      table: {
        title: "Tenure Contract",
        columns: {...tableColumns},
        data: [...tableDefaultData]
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
        },
        selector: {}
      },
      description: "Resource info"
    },
    query: {
      type: Object,
      // default: {},
    },
    assetId: {
      type: Number | Object,
      required: true,
      default: null
    },
    tenantId: {
      type: Number | Object,
      required: true,
      default: null
    }
  },
  computed: {
    assetIdComp: {
      get: function() {
        return this.assetId;
      },
      set: function(value) {
        this.$emit('assetIdChange', value);
      }
    },
    tenantIdComp: {
      get: function() {
        return this.tenantId;
      },
      set: function(value) {
        this.$emit('tenantIdChange', value);
      }
    }
  },
  methods: {
    showDetails(id) {
      router.push({
        name: "Tenure Contract Detail",
        params: {
          tenureContractId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    editDetails(id) {
      router.push({
        name: "Edit Tenure Contract",
        query: this.query,
        params: {
          tenureContractId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    // deleteDetails(id) {
    //   if (id == null) {
    //     this.$notify({
    //       message: 'Server error',
    //       icon: 'tim-icons icon-bell-55',
    //       type: 'danger'
    //     });
    //   } else {
    //     try {
    //       this.$store.dispatch('tenureContract/remove', id)
    //       this.$notify({
    //         message: 'Successfully Deleted',
    //         icon: 'tim-icons icon-bell-55',
    //         type: 'success'
    //       });
    //       this.getResource();
    //     } catch (e) {
    //       this.$notify({
    //         message: 'Server error',
    //         icon: 'tim-icons icon-bell-55',
    //         type: 'danger'
    //       });
    //     }
    //   }
    // },
    addModel() {
      this.$router.push({
        name: 'Add Tenure Contract',
        query: this.query,
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
            await this.$store.dispatch('tenant/getTenureContracts', param).then(() => {
              this.resource.models = this.$store.getters["tenant/tenureContractModels"];
              this.resource.data = Object.assign({}, this.$store.getters["tenant/tenureContractData"]);
            });
          } else {
            await this.$store.dispatch('tenureContract/get', pageId).then(() => {
              this.resource.models = this.$store.getters["tenureContract/models"];
              this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"]);
            });
          }
        } else {
          await this.$store.dispatch('tenureContract/get', pageId).then(() => {
            this.resource.models = this.$store.getters["tenureContract/models"];
            this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"]);
          });
        }
        // await this.$store.dispatch('tenureContract/create', pageId).then(() => {
        //   this.resource.selector = Object.assign({}, this.$store.getters["tenureContract/selector"])
        // });
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    },
    filterAssetId(value) {
      console.log('filtering by asset id');
      console.log(`asset id = ${this.assetId}, tenant id = ${this.tenantIdComp}`);
    },
    filterTenantId(value) {
      console.log('filtering by tenant id');
      console.log(`asset id = ${this.assetId}, tenant id = ${value}`);
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
