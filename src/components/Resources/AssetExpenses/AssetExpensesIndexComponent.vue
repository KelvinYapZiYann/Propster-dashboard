<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left">{{$t('sidebar.assetExpenses')}}</h4>
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
            :disableEdit="true"
            :disableDelete="true"
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
          >
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

let tableColumns = {
  payment_description: "Payment Description",
  amount: "Amount (RM)",
  status: "Status",
  payment_method: "Payment Method"
};

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
          payment_description: this.$t('property.description'),
          amount: this.$t('property.amount'),
          status: this.$t('property.status'),
          payment_method: this.$t('property.paymentMethod')
        },
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
        name: "Asset Expenses Detail",
        params: {
          assetExpenseId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    async handlePagination(pageId) {
      try {
        if (this.$props.query) {
          if (this.$props.query.assetId) {
            var param = {
              id: this.$props.query.assetId,
              pageId: pageId
            }
            await this.$store.dispatch('asset/getAssetExpenses', param).then(() => {
              this.resource.models = this.$store.getters["asset/assetExpenseModels"];
              this.resource.data = Object.assign({}, this.$store.getters["asset/assetExpenseData"]);
            });
          } else {
            await this.$store.dispatch('assetExpenses/get', pageId).then(() => {
              this.resource.models = this.$store.getters["assetExpenses/models"];
              this.resource.data = Object.assign({}, this.$store.getters["assetExpenses/data"]);
            });
          }
        } else {
          await this.$store.dispatch('assetExpenses/get', pageId).then(() => {
            this.resource.models = this.$store.getters["assetExpenses/models"];
            this.resource.data = Object.assign({}, this.$store.getters["assetExpenses/data"]);
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
