<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <div class="row">
      <!-- <div
        class="col-xl-3 col-lg-6 col-md-6 col-sm-6"
        v-for="card in statsCards"
        :key="card.title"
      >
        <el-tooltip
          :content="card.description"
          :open-delay="300"
        >
          <stats-card
            :title="card.title"
            :sub-title="card.subTitle"
            :type="card.type"
            :icon="card.icon"
          >
            <div slot="footer" v-html="card.footer"></div>
          </stats-card>
        </el-tooltip>
      </div> -->
      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
        <el-tooltip
          :content="$t('dashboard.overdueIncomeDesc')"
          :open-delay="300"
        >
          <stats-card
            :title="`RM${resource.general ? resource.general.overdue_income : ''}`"
            :sub-title="$t('dashboard.overdueIncome')"
            type="warning"
            icon="fas fa-clock"
          >
          </stats-card>
        </el-tooltip>
      </div>
      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
        <el-tooltip
          :content="$t('dashboard.upcomingIncomeDesc')"
          :open-delay="300"
        >
          <stats-card
            :title="`RM${resource.general ? resource.general.upcoming_income : ''}`"
            :sub-title="$t('dashboard.upcomingIncome')"
            type="primary"
            icon="fas fa-building"
          >
          </stats-card>
        </el-tooltip>
      </div>
      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
        <el-tooltip
          :content="$t('dashboard.overdueExpensesDesc')"
          :open-delay="300"
        >
          <stats-card
            :title="`RM${resource.general ? resource.general.overdue_expenses : ''}`"
            :sub-title="$t('dashboard.overdueExpenses')"
            type="warning"
            icon="fas fa-clock"
          >
          </stats-card>
        </el-tooltip>
      </div>
      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
        <el-tooltip
          :content="$t('dashboard.upcomingExpensesDesc')"
          :open-delay="300"
        >
          <stats-card
            :title="`RM${resource.general ? resource.general.upcoming_expenses : ''}`"
            :sub-title="$t('dashboard.upcomingExpenses')"
            type="primary"
            icon="fas fa-dollar-sign"
          >
          </stats-card>
        </el-tooltip>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mr-auto">
        <card class="card-chart card-chart-pie">
          <h5 slot="header" class="card-category text-left">
            {{$t('dashboard.rent')}}
          </h5>

          <div class="row">
            <div class="col-6">
              <div class="chart-area">
                <pie-chart
                  :chart-data="pieChart2.chartData"
                  :extra-options="pieChart2.extraOptions"
                  :height="120"
                >
                </pie-chart>
              </div>
            </div>

            <div class="col-6">
              <p class="category text-left"><i class="tim-icons icon-tag text-warning"></i> {{$t('dashboard.collectedRent')}}: RM{{resource.rental ? resource.rental.collected_rent : ''}}</p>
              <p class="category text-left"><i class="tim-icons icon-tag text-info"></i> {{$t('dashboard.overdueRent')}}: RM{{resource.rental ? resource.rental.overdue_rent : ''}}</p>
              <p class="category text-left"><i class="tim-icons icon-tag text-light"></i> {{$t('dashboard.upcomingRent')}}: RM{{resource.rental ? resource.rental.upcoming_rent : ''}}</p>
            </div>
          </div>
        </card>
      </div>
    </div>
    <overdue-tenants-index-component
      :resource="resource.overdueTenantList"
      @getResource="getResource"
    ></overdue-tenants-index-component>
    
  </div>
</template>
<script>
import { Card } from "@/components/index";

import * as chartConfigs from "@/components/Charts/config";
import StatsCard from "@/components/Cards/StatsCard";
import PieChart from "@/components/Charts/PieChart";
import OverdueTenantsIndexComponent from "@/components/Resources/Tenants/OverdueTenantsIndexComponent";

export default {
  components: {
    Card,
    StatsCard,
    PieChart,
    OverdueTenantsIndexComponent
  },
  data() {
    // let rentalDetail = {
    //   collected_rent: 10,
    //   overdue_rent: 10,
    //   upcoming_rent: 10,
    // };
    return {
      resource: {
        general: {},
        rental: {},
        overdueTenantList: {
          models: [],
          data: {}
        },
      },
      // statsCards: [
      //   {
      //     title: "RM22,000.00",
      //     subTitle: this.$t('dashboard.overdueIncome'),
      //     type: "warning",
      //     icon: "fas fa-clock",
      //     description: this.$t('dashboard.overdueIncomeDesc'),
      //   },
      //   {
      //     title: "RM22,000.00",
      //     subTitle: this.$t('dashboard.upcomingIncome'),
      //     type: "primary",
      //     icon: "fas fa-building",
      //     description: this.$t('dashboard.upcomingIncomeDesc'),
      //   },
      //   {
      //     title: "RM8,000.00",
      //     subTitle: this.$t('dashboard.overdueExpenses'),
      //     type: "warning",
      //     icon: "fas fa-clock",
      //     description: this.$t('dashboard.overdueExpensesDesc'),
      //   },
      //   {
      //     title: "RM5,000.00",
      //     subTitle: this.$t('dashboard.upcomingExpenses'),
      //     type: "primary",
      //     icon: "fas fa-dollar-sign",
      //     description: this.$t('dashboard.upcomingExpensesDesc'),
      //   }
      // ],
      pieChart2: {
        chartData: {
          labels: [this.$t('dashboard.collectedRent'), this.$t('dashboard.overdueRent'), this.$t('dashboard.upcomingRent')],
          datasets: [
            {
              label: "Rent",
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ["#ff8779", "#2a84e9", "#e2e2e2"],
              borderWidth: 0,
              data: [this.collectedRent, this.overdueRent, this.upcomingRent]
            }
          ]
        },
        extraOptions: chartConfigs.pieChartOptions
      }
    };
  },
  // props: {
    // fromLogin: {
    //   type: Boolean,
    //   required: false,
    //   default: false,
    //   description: "From Login"
    // }
  // },
  computed: {
    // enableRTL() {
    //   return this.$route.query.enableRTL;
    // },
    // isRTL() {
    //   return this.$rtl.isRTL;
    // }
    collectedRent() {
      return this.resource.rental ? this.resource.rental.collected_rent : 0;
    },
    overdueRent() {
      return this.resource.rental ? this.resource.rental.overdue_rent : 0;
    },
    upcomingRent() {
      return this.resource.rental ? this.resource.rental.upcoming_rent : 0;
    }
  },
  methods: {
    async getResource() {
      try {
        if (this.$route.params.fromLogin) {
          await this.$store.dispatch('users/get', {});
        }
        await this.$store.dispatch('dashboard/getGeneralDetail', {}).then(() => {
          this.resource.general = this.$store.getters["dashboard/general"]
        });
        await this.$store.dispatch('dashboard/getRentalDetail', {}).then(() => {
          this.resource.rental = this.$store.getters["dashboard/rental"]
        });
        await this.$store.dispatch('dashboard/getOverdueTenantList', {}).then(() => {
          this.resource.overdueTenantList.models = this.$store.getters["dashboard/overdueTenantList"]
        });
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    },
    
  },
  mounted() {
    this.getResource();
  },
  beforeDestroy() {
  }
};
</script>
<style>
#worldMap .datamap {
  left: 0 !important;
}
</style>
