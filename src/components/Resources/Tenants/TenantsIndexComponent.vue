<template>
  <div class="row">
    <div class="col-12">
      <div class="pro-feature alert alert-danger" v-if="userTier == 'BASIC' || userTier == 'USER_BASIC'">
        <strong>
          <!-- {{$t('component.proFeature1')}} 3 {{$t('sidebar.tenants')}} {{$t('component.proFeature21')}} {{$t('component.proFeature3')}} 
          <a
            href="https://www.propster.io"
            target="_blank"
          >PRO</a>
          {{$t('component.proFeature4')}} {{$t('sidebar.tenants')}}! -->
          {{$t('alert.basicTierTenantCount')}}
        </strong>
      </div>
      <card>
        <h3 slot="header" class="card-title">{{$t('sidebar.tenants')}}</h3>
        <div class="text-right">
          <base-button
            @click="addModel"
            type="info"
          >
          <!-- v-if="resource.data.canAdd"
            v-bind:disabled="!resource.data.canAdd" -->
            {{$t('component.add')}} {{$t('sidebar.tenants')}}
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
          <tenant-table
            :data="resource.models"
            v-on:show-details="showDetails"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails"
            v-on:long-click-event="longClickEvent"
            :paginationPage="paginationPage"
            v-if="$router.currentRoute.matched[0].path == '/m'"
          >
          </tenant-table>
          <base-table
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails"
            v-on:long-click-event="longClickEvent"
            :paginationPage="paginationPage"
            v-else
          >
          <!-- :disableDelete="true" -->
          </base-table>
        </div>
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
      </card>
    </div>
  </div>
</template>
<script>
import {BaseInput, BaseTable, BasePagination, Card} from "@/components";
import TenantTable from "./TenantTable";
import router from "@/router";
import swal from "sweetalert2";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    BaseInput,
    BaseTable,
    BasePagination,
    Card,
    TenantTable
  },
  mounted() {
    if (!this.$store.getters["users/model"].tier) {
      this.$store.dispatch('users/get').then(() => {
        this.userTier = this.$store.getters["users/model"].tier;
      });
    }
  },
  data() {
    return {
      table: {
        columns: this.$store.getters["mobileLayout/isMobileLayout"] ? {
          first_name: this.$t('property.firstName'),
          last_name: this.$t('property.lastName'),
          // email: this.$t('property.email'),
          // phone_number: this.$t('property.phoneNumber'),
        } : {
          first_name: this.$t('property.firstName'),
          last_name: this.$t('property.lastName'),
          email: this.$t('property.email'),
          phone_number: this.$t('property.phoneNumber'),
        },
      },
      searchQuery: "",
      searchQueryTimeout: null,
      userTier: this.$store.getters["users/model"].tier,
      paginationPage: 1
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
      if (this.$props.query) {
        if (this.$props.query.assetId) {
          router.push({
            name: router.currentRoute.matched[0].path == "/m" ? "Mobile Tenant Detail" : "Tenant Detail",
            query: {
              assetId: `${this.$props.query.assetId}`,
            },
            params: {
              tenantId: id,
              previousRoute: this.$router.currentRoute.fullPath
            }
          });
        } else {
          router.push({
            name: router.currentRoute.matched[0].path == "/m" ? "Mobile Tenant Detail" : "Tenant Detail",
            params: {
              tenantId: id,
              previousRoute: this.$router.currentRoute.fullPath
            }
          });
        }
      } else {
        router.push({
          name: router.currentRoute.matched[0].path == "/m" ? "Mobile Tenant Detail" : "Tenant Detail",
          params: {
            tenantId: id,
            previousRoute: this.$router.currentRoute.fullPath
          }
        });
      }
    },
    editDetails(id) {
      router.push({
        name: router.currentRoute.matched[0].path == "/m" ? "Mobile Edit Tenant" : "Edit Tenant",
        params: {
          tenantId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    deleteDetails(id) {
      swal.fire({
        title: this.$t('alert.notDeletable'),
        text: this.$t('alert.notDeletableText'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "error",
      });
      // if (id == null) {
      //   this.$notify({
      //     message: errorHandlingService.displayAlertFromServer(e),
      //     icon: 'tim-icons icon-bell-55',
      //     type: 'danger'
      //   });
      // } else {
      //   try {
      //     this.$store.dispatch('tenant/remove', id)
      //     this.$notify({
      //       message: 'Successfully Deleted',
      //       icon: 'tim-icons icon-bell-55',
      //       type: 'success'
      //     });
      //     this.getResource();
      //   } catch (e) {
      //     this.$notify({
      //     message: errorHandlingService.displayAlertFromServer(e),
      //     icon: 'tim-icons icon-bell-55',
      //     type: 'danger'
      //   });
      //   }
      // }
    },
    addModel() {
      if (this.$props.query ? !this.$props.query.assetId : true) {
        this.$store.dispatch('asset/get').then(() => {
          if (this.$store.getters["asset/data"].total <= 0) {
            swal.fire({
              title: this.$t('alert.tenantFailedAdded'),
              text: this.$t('alert.noAssetAddingTenant'),
              buttonsStyling: false,
              showCancelButton: true,
              confirmButtonText: this.$t('component.add') + ' ' + this.$t('sidebar.asset'),
              cancelButtonText: this.$t('component.cancel'),
              cancelButtonClass: "btn btn-info btn-fill",
              confirmButtonClass: "btn btn-info btn-fill",
              icon: "error",
            }).then((result) => {
              if (result.value) {
                this.$router.push({
                  name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Assets" : "Add Assets",
                  params: {
                    previousRoute: this.$router.currentRoute.fullPath
                  }
                });
              }
            });
          } else {
            if (!this.resource.data.canAdd) {
              swal.fire({
                title: this.$t('alert.tenantFailedAdded'),
                text: this.$t('alert.basicTierTenantCount'),
                buttonsStyling: false,
                confirmButtonClass: "btn btn-info btn-fill",
                icon: "error",
              });
              return;
            }
            this.$router.push({
              name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Tenant" : "Add Tenant",
              query: this.query,
              params: {
                previousRoute: this.$router.currentRoute.fullPath
              }
            });
          }
        });
      } else {
        if (!this.resource.data.canAdd) {
          swal.fire({
            title: this.$t('alert.tenantFailedAdded'),
            text: this.$t('alert.basicTierTenantCount'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            icon: "error",
          });
          return;
        }
        this.$router.push({
          name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Tenant" : "Add Tenant",
          query: this.query,
          params: {
            previousRoute: this.$router.currentRoute.fullPath
          }
        });
      }
    },
    getResource() {
      this.$emit('getResource')
    },
    async handlePagination(pageId) {
      this.paginationPage = pageId;
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        if (this.$props.query) {
          if (this.$props.query.assetId) {
            var param = {
              id: this.$props.query.assetId,
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
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    },
    longClickEvent(id) {
      swal.fire({
        title: this.$t('alert.editOrRemove'),
        text: this.$t('alert.editOrRemoveText') + " " + this.$t('sidebar.tenant') + "?",
        buttonsStyling: false,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: this.$t('component.edit'),
        denyButtonText: this.$t('component.remove'),
        cancelButtonText: this.$t('component.cancel'),
        cancelButtonClass: "btn btn-info btn-fill",
        denyButtonClass: "btn btn-info btn-fill",
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({
            name: router.currentRoute.matched[0].path == "/m" ? "Mobile Edit Tenant" : "Edit Tenant",
            params: {
              tenantId: id,
              previousRoute: this.$router.currentRoute.fullPath
            }
          });
        } else if (result.isDenied) {
          swal.fire({
            title: this.$t('alert.notDeletable'),
            text: this.$t('alert.notDeletableText'),
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info btn-fill",
            icon: "error",
          });
        }
      });
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
