<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h3 slot="header" class="card-title" title="Shows tenants which the Rent already exceed the given due date (incl. of Grace Period).">{{$t('dashboard.overdueTenantsList')}}</h3>
        <!-- <div class="row">
          <div class="col-xl-4 col-lg-5 col-md-6 ml-auto">
            <base-input 
                    addonLeftIcon="el-icon-search"
                    :placeholder="$t('component.search')"
                    v-model="searchQuery">
            </base-input>
          </div>
        </div> -->
        <div class="table-responsive custom-table-height">
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
          </base-table>
        </div>
        <!-- <div
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
        </div> -->
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
        title: this.$t('dashboard.overdueTenantsList'),
        columns: this.$store.getters["mobileLayout/isMobileLayout"] ? {
          first_name: this.$t('property.firstName'),
          last_name: this.$t('property.lastName'),
          // email: this.$t('property.email'),
          // phone_number: this.$t('property.phoneNumber'),
          total_due_amount: this.$t('property.dueAmount'),
          latest_due_date: this.$t('property.dueDate'),
        } : {
          first_name: this.$t('property.firstName'),
          last_name: this.$t('property.lastName'),
          email: this.$t('property.email'),
          phone_number: this.$t('property.phoneNumber'),
          total_due_amount: this.$t('property.dueAmount'),
          latest_due_date: this.$t('property.dueDate'),
        },
        columnsDisplayPrefix: {
          total_due_amount: "RM"
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
        models: [],
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
          name: router.currentRoute.matched[0].path == "/m" ? "Mobile Tenant Detail" : "Tenant Detail",
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
      this.paginationPage = pageId;
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
        try {
          await this.$store.dispatch('dashboard/getOverdueTenantList', {}).then(() => {
            this.resource.models = this.$store.getters["dashboard/overdueTenantListModels"]
            this.resource.data = Object.assign({}, this.$store.getters["dashboard/overdueTenantListData"]);
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
/* .custom-table-height {
  min-height: 500px;
}
@media (max-width:991px) {
  .custom-table-height {
    min-height: 10px;
  }
} */


</style>
