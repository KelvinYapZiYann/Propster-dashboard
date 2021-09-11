<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h3 slot="header" class="card-title">{{$t('sidebar.assets')}}</h3>
        <div class="text-right" v-if="this.$props.query ? !this.$props.query.tenantId : true">
          <base-button
                @click="addModel"
                type="info"      
          >
          <!-- v-bind:disabled="!resource.data.canAdd" -->
            {{$t('component.add')}} {{$t('sidebar.assets')}}
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
          <base-table
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails"
            :paginationPage="paginationPage"
          >
          <!-- :disableDelete="true" -->
            <template slot-scope="{ row }">
              <td
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.asset_nickname }}
              </td>
              <td
                v-if="!$store.getters['mobileLayout/isMobileLayout']"
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.location_details ? row.location_details.asset_unit_no : '' }}
              </td>
              <td
                v-if="!$store.getters['mobileLayout/isMobileLayout']"
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.location_details ? row.location_details.asset_address_line : '' }}
              </td>
              <td
                v-if="!$store.getters['mobileLayout/isMobileLayout']"
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.location_details ? row.location_details.asset_city : '' }}
              </td>
              <td
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                <base-room-indicator :value="row.number_of_rooms"></base-room-indicator>
              </td>
              <td
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                <base-tenant-indicator :value="row.number_of_tenants"></base-tenant-indicator>
              </td>
              <!-- <td>
                <base-checkbox v-model="row.done"> </base-checkbox>
              </td> -->
            </template>
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
import {BaseInput, BaseTable, BasePagination, Card, BaseTenantIndicator, BaseRoomIndicator } from "@/components";
import router from "@/router";
import swal from "sweetalert2";
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    BaseInput,
    BaseTable,
    BasePagination,
    Card,
    BaseTenantIndicator,
    BaseRoomIndicator
  },
  data() {
    return {
      table: {
        columns: this.$store.getters["mobileLayout/isMobileLayout"] ? {
          asset_nickname: this.$t('property.assetNickname'),
          // asset_unit_no: this.$t('property.unitNo'),
          // asset_address_line: this.$t('property.addressLine'),
          // asset_city: this.$t('property.city'),
          rooms: this.$t('property.rooms'),
          tenants: this.$t('sidebar.tenants'),
        } : {
          asset_nickname: this.$t('property.assetNickname'),
          asset_unit_no: this.$t('property.unitNo'),
          asset_address_line: this.$t('property.addressLine'),
          asset_city: this.$t('property.city'),
          rooms: this.$t('property.rooms'),
          tenants: this.$t('sidebar.tenants'),
        },
      },
      searchQuery: "",
      searchQueryTimeout: null,
      paginationPage: 1,
      timeout: null
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
      swal.fire({
        title: this.$t('alert.notDeletable'),
        text: this.$t('alert.notDeletableText'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "error",
      });
      // if (id == null) {
      //   this.$notify({
      //     message:'Server error del id == null',
      //     icon: 'tim-icons icon-bell-55',
      //     type: 'danger'
      //   });
      // } else {
      //   try {
      //     this.$store.dispatch('asset/remove', id)
      //     this.$notify({
      //       message:'Successfully Deleted',
      //       icon: 'tim-icons icon-bell-55',
      //       type: 'success'
      //     });
      //     this.getResource();
      //   } catch (e) {
      //     this.$notify({
      //       message:'Server error when del',
      //       icon: 'tim-icons icon-bell-55',
      //       type: 'danger'
      //     });
      //   }
      // }
    },
    addModel() {
      if (!this.resource.data.canAdd) {
        swal.fire({
          title: this.$t('alert.assetFailedAdded'),
          text: this.$t('alert.basicTierAssetCount'),
          buttonsStyling: false,
          confirmButtonClass: "btn btn-info btn-fill",
          icon: "error",
        });
        return;
      }
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
      this.paginationPage = pageId;
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
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
              // let models = this.$store.getters["tenant/assetModels"];
              // for (let i = 0; i < models.length; i++) {
              //   this.getAssetTenantsFromTenant(models, i, models[i].id);
              // }
            });
          } else {
            await this.$store.dispatch('asset/get', pageId).then(() => {
              this.resource.models = this.$store.getters["asset/models"];
              this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);
              // let models = this.$store.getters["asset/models"];
              // for (let i = 0; i < models.length; i++) {
              //   this.getAssetTenantsFromAsset(models, i, models[i].id);
              // }
            });
          }
        } else {
          await this.$store.dispatch('asset/get', pageId).then(() => {
            this.resource.models = this.$store.getters["asset/models"];
            this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);
            // let models = this.$store.getters["asset/models"];
            // for (let i = 0; i < models.length; i++) {
            //   this.getAssetTenantsFromAsset(models, i, models[i].id);
            // }
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
    async getAssetTenantsFromAsset(models, id, assetId) {
      try {
        await this.$store.dispatch('asset/getTenants', assetId).then(() => {
          models[id]['tenantCount'] = this.$store.getters["asset/tenantData"].total;
          if (models.length - 1 == id) {
            this.resource.models = models;
            this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);
          }
        })
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    },
    async getAssetTenantsFromTenant(models, id, assetId) {
      try {
        await this.$store.dispatch('asset/getTenants', assetId).then(() => {
          models[id]['tenantCount'] = this.$store.getters["asset/tenantData"].total;
          if (models.length - 1 == id) {
            this.resource.models = models;
            this.resource.data = Object.assign({}, this.$store.getters["tenant/assetData"]);
          }
        })
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    },
    longClickEvent(id) {
      swal.fire({
        title: this.$t('alert.editOrRemove'),
        text: this.$t('alert.editOrRemoveText') + " " + this.$t('sidebar.asset') + "?",
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
            name: "Edit Assets",
            params: {
              assetId: id,
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
    },
    startLongClick(id) {
      if (!this.timeout && this.$store.getters["mobileLayout/isMobileLayout"]) {
        this.timeout = setTimeout(() => {
          this.longClickEvent(id);
        }, 2000);
      }
    },
    stopLongClick() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
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
