<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h3 slot="header" class="card-title">{{$t('dashboard.assetsValueOverTime')}}</h3>
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
            :columnsDisplayPrefix="table.columnsDisplayPrefix"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            :disableEdit="true"
            :disableDelete="true"
            :paginationPage="paginationPage"
          >
          <!-- v-on:show-details="showDetails"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails" -->
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
import {BaseInput, BaseTable, BasePagination, Card} from "@/components";
import router from "@/router";
import errorHandlingService from "@/store/services/error-handling-service";

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
        columns: {
          asset_nickname: this.$t('property.assetNickname'),
          asset_purchased_value: this.$t('property.assetPurchasedValue'),
          asset_current_value: this.$t('property.assetCurrentValue'),
        },
        columnsDisplayPrefix: {
          asset_purchased_value: "RM",
          asset_current_value: "RM",
        },
      },
      searchQuery: "",
      searchQueryTimeout: null,
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
    }
  },
  methods: {
    showDetails(id) {
      router.push({
        name: router.currentRoute.matched[0].path == "/m" ? "Mobile Asset Detail" : "Asset Detail",
        params: {
          assetId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    // editDetails(id) {
    //   router.push({
    //     name: "Edit Assets",
    //     params: {
    //       assetId: id,
    //       previousRoute: this.$router.currentRoute.fullPath
    //     }
    //   });
    // },
    // deleteDetails(id) {
    //   if (id == null) {
    //     this.$notify({
    //       message:'Server error del id == null',
    //       icon: 'tim-icons icon-bell-55',
    //       type: 'danger'
    //     });
    //   } else {
    //     try {
    //       this.$store.dispatch('asset/remove', id)
    //       this.$notify({
    //         message:'Successfully Deleted',
    //         icon: 'tim-icons icon-bell-55',
    //         type: 'success'
    //       });
    //       this.getResource();
    //     } catch (e) {
    //       this.$notify({
    //         message:'Server error when del',
    //         icon: 'tim-icons icon-bell-55',
    //         type: 'danger'
    //       });
    //     }
    //   }
    // },
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
        await this.$store.dispatch('asset/get', pageId).then(() => {
            this.resource.models = this.$store.getters["asset/models"];
            this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);
        });
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
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
