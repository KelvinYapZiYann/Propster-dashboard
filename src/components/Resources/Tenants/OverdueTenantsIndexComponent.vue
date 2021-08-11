<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left" title="Shows tenants which the Rent already exceed the given due date (incl. of Grace Period).">
          {{table.title}}
        </h4>
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
            :disableEdit="true"
            :disableDelete="true"
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
        columns: {
          first_name: this.$t('property.firstName'),
          last_name: this.$t('property.lastName'),
          email: this.$t('property.email'),
          phone_number: this.$t('property.phoneNumber'),
          due_date: this.$t('property.dueDate'),
          due_amount: this.$t('property.dueAmount')
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
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
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
