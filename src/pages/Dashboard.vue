<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <div class="row">
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
                  :chart-data="rentChart"
                  :extra-options="pieChartExtraOptions"
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

    <assets-value-index-component
      :resource="resource.assetsValueList"
      @getResource="getResource"
    ></assets-value-index-component>

    <assets-rental-rate-index-component
      :resource="resource.rentalRateList"
      @getResource="getResource"
    ></assets-rental-rate-index-component>

    <div class="row">
      <div class="col-md-12 mr-auto">
        <card class="card-chart card-chart-pie">
          <h5 slot="header" class="card-category text-left">
            {{$t('dashboard.cashflow')}}
          </h5>
          <div class="row ml-3">
            <div class="col-12">
              <p class="category text-left"><i class="tim-icons icon-tag text-info"></i> {{$t('dashboard.income')}}</p>
              <p class="category text-left"><i class="tim-icons icon-tag text-warning"></i> {{$t('dashboard.expenses')}}</p>
            </div>
          </div>
          <div class="chart-area">
            <bar-chart
              :chart-data="cashflowChart"
              :extra-options="barChartExtraOptions"
              :height="200"
            >
            </bar-chart>
          </div>
        </card>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 mr-auto">
        <card class="card-chart card-chart-pie">
          <h5 slot="header" class="card-category text-left">
            {{$t('dashboard.assetsVacancy')}}
          </h5>

          <div class="row">
            <div class="col-6">
              <div class="chart-area">
                <pie-chart
                  :chart-data="assetsVacancyChart"
                  :extra-options="pieChartExtraOptions"
                  :height="120"
                >
                </pie-chart>
              </div>
            </div>

            <div class="col-6">
              <p class="category text-left"><i class="tim-icons icon-tag text-warning"></i> {{$t('dashboard.blankVacancy')}}</p>
              <p class="category text-left"><i class="tim-icons icon-tag text-info"></i> {{$t('dashboard.currentTenants')}}</p>
            </div>
          </div>
        </card>
      </div>
    </div>
    
  </div>
</template>
<script>
import { Card } from "@/components/index";

import * as chartConfigs from "@/components/Charts/config";
import StatsCard from "@/components/Cards/StatsCard";
import PieChart from "@/components/Charts/PieChart";
import BarChart from "@/components/Charts/BarChart";
import OverdueTenantsIndexComponent from "@/components/Resources/Tenants/OverdueTenantsIndexComponent";
import AssetsValueIndexComponent from "@/components/Resources/Assets/AssetsValueIndexComponent";
import AssetsRentalRateIndexComponent from "@/components/Resources/Assets/AssetsRentalRateIndexComponent";

export default {
  components: {
    Card,
    StatsCard,
    PieChart,
    BarChart,
    OverdueTenantsIndexComponent,
    AssetsValueIndexComponent,
    AssetsRentalRateIndexComponent
  },
  data() {
    return {
      resource: {
        general: {},
        rental: {},
        overdueTenantList: {
          models: [],
          data: {}
        },
        assetsValueList: {
          models: [],
          data: {}
        },
        rentalRateList: {
          models: [],
          data: {}
        },
        assetsVacancy: {
          currentTenants: 0
        }
      },
      barChartExtraOptions: chartConfigs.barChartOptionsGradient,
      pieChartExtraOptions: chartConfigs.pieChartOptions,
    };
  },
  computed: {
    rentChart() {
      return {
        labels: [this.$t('dashboard.collectedRent'), this.$t('dashboard.overdueRent'), this.$t('dashboard.upcomingRent')],
        datasets: [
          {
            label: this.$t('dashboard.rent'),
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#ff8779", "#2a84e9", "#e2e2e2"],
            borderWidth: 0,
            data: [this.resource.rental.collected_rent, this.resource.rental.overdue_rent, this.resource.rental.upcoming_rent]
          }
        ]
      }
    },
    cashflowChart() {
      return {
        labels: [this.$t('dateTime.march'), this.$t('dateTime.april'), this.$t('dateTime.may'), this.$t('dateTime.june'), this.$t('dateTime.july'), this.$t('dateTime.august')],
        datasets: [
          {
            label: this.$t('dashboard.income') + " (RM)",
            fill: true,
            backgroundColor: "#2a84e9",
            hoverBackgroundColor: "#2a84e9",
            borderColor: "#2a84e9",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [80, 100, 70, 80, 120, 80]
          },
          {
            label: this.$t('dashboard.expenses') + " (RM)",
            fill: true,
            backgroundColor: "#ff8779",
            hoverBackgroundColor: "#ff8779",
            borderColor: "#ff8779",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [60, 110, 90, 70, 90, 100]
          }
        ]
      }
    },
    assetsVacancyChart() {
      return {
        labels: [this.$t('dashboard.blankVacancy'), this.$t('dashboard.currentTenants')],
        datasets: [
          {
            label: this.$t('dashboard.assetsVacancy'),
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#ff8779", "#2a84e9"],
            borderWidth: 0,
            data: [3, this.resource.assetsVacancy.currentTenants]
          }
        ]
      }
    },
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
        await this.$store.dispatch('asset/get', {}).then(() => {
          this.resource.assetsValueList.models = this.$store.getters["asset/models"]
          this.resource.assetsValueList.data = Object.assign({}, this.$store.getters["asset/data"]);

          this.resource.rentalRateList.models = this.$store.getters["asset/models"];
            for (let i = 0; i < this.resource.rentalRateList.models.length; i++) {
                this.resource.rentalRateList.models[i]['current_rental_rate'] = '1250';
                this.resource.rentalRateList.models[i]['current_market_rental_rate'] = '1450';
            }
            this.resource.rentalRateList.data = Object.assign({}, this.$store.getters["asset/data"]);
        });
        await this.$store.dispatch('tenant/get', {}).then(() => {
          this.resource.assetsVacancy.currentTenants = this.$store.getters["tenant/data"].total;
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
