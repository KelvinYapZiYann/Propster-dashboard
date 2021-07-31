<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left">{{$t('sidebar.tenureContracts')}}</h4>
        <div class="text-right mb-3">
          <base-button
            @click="addModel"
            class="mt-3"
            type="info"
          >
          <!-- v-bind:disabled="!resource.data.canAdd"
            v-if="resource.data.canAdd" -->
            {{$t('component.add')}} {{$t('sidebar.tenureContracts')}}
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
        <!-- <div class="row">
          <div class="col-xl-4 col-lg-2 col-md-12">
          </div>
          <div class="col-xl-4 col-lg-5 col-md-6 ml-auto">
            <base-selector-input 
                        :label="$t('property.assetNickname')"
                        :placeholder="$t('property.assetNickname')"
                        v-model="assetIdComp"
                        :options="resource.selector.asset_id"
                        @input="filterAssetId"
                        >
            </base-selector-input>
          </div>
          <div class="col-xl-4 col-lg-5 col-md-6" v-if="query ? !query.tenantId : true">
            <base-selector-input 
                        :label="$t('property.tenantName')"
                        :placeholder="$t('property.tenantName')"
                        v-model="tenantIdComp"
                        :options="resource.selector.tenant_id"
                        @input="filterTenantId"
                        >
            </base-selector-input>
          </div>
        </div> -->
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
                {{$t('component.showing')}} {{ resource.data.from ? resource.data.from : "0" }} {{$t('component.to')}} {{ resource.data.to ? resource.data.to : "0" }} {{$t('component.of')}} {{ resource.data.total }} {{$t('component.entries')}}
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
import swal from "sweetalert2";

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
        columns: {
          asset_nickname: this.$t('property.assetNickname'),
          first_name: this.$t('property.firstName'),
          contract_name: this.$t('property.contractName'),
          monthly_rental_amount: this.$t('property.monthlyRentalAmount'),
          tenure_start_date: this.$t('property.tenureStartDate'),
          tenure_end_date: this.$t('property.tenureEndDate')
        }
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
      // if (!this.query) {
      //   swal({
      //     title: this.$t('alert.tenureContractFailedAdded'),
      //     text: this.$t('alert.tenureContractFailedAddedTextInTenantDetail'),
      //     buttonsStyling: false,
      //     confirmButtonClass: "btn btn-info btn-fill",
      //     type: "error",
      //   });
      //   return;
      // }
      // if (!this.resource.data.canAdd) {
      //   swal({
      //     title: this.$t('alert.tenureContractFailedAdded'),
      //     text: this.$t('alert.tenureContractFailedAddedText'),
      //     buttonsStyling: false,
      //     confirmButtonClass: "btn btn-info btn-fill",
      //     type: "error",
      //   });
      //   return;
      // }
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
