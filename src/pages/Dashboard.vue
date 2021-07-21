<template>
  <div class="content">
    <div class="row">
      <div
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
              <p class="category text-left"><i class="tim-icons icon-tag text-warning"></i> {{$t('dashboard.collectedRent')}} <br/>RM{{pieChart2.chartData.datasets[0].data[0]}}</p>
              <p class="category text-left"><i class="tim-icons icon-tag text-info"></i> {{$t('dashboard.overdueRent')}} <br/>RM{{pieChart2.chartData.datasets[0].data[1]}}</p>
              <p class="category text-left"><i class="tim-icons icon-tag text-light"></i> {{$t('dashboard.upcomingRent')}} <br/>RM{{pieChart2.chartData.datasets[0].data[2]}}</p>
            </div>
          </div>
        </card>
      </div>
    </div>
    <overdue-tenants-index-component
      :resource="resource"
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
    return {
      resource: {
        models: [{}],
        data: {}
      },
      statsCards: [
        {
          title: "RM15,000.00",
          subTitle: this.$t('dashboard.overdueImcome'),
          type: "warning",
          icon: "fas fa-clock",
          description: this.$t('dashboard.overdueIncomeDesc'),
        },
        {
          title: "RM22,000.00",
          subTitle: this.$t('dashboard.upcomingIncome'),
          type: "primary",
          icon: "fas fa-building",
          description: this.$t('dashboard.upcomingIncomeDesc'),
        },
        {
          title: "RM8,000.00",
          subTitle: this.$t('dashboard.overdueExpenses'),
          type: "warning",
          icon: "fas fa-clock",
          description: this.$t('dashboard.overdueExpensesDesc'),
        },
        {
          title: "RM5,000.00",
          subTitle: this.$t('dashboard.upcomingExpenses'),
          type: "primary",
          icon: "fas fa-dollar-sign",
          description: this.$t('dashboard.upcomingExpensesDesc'),
        }
      ],
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
              data: [37000, 15000, 22000]
            }
          ]
        },
        extraOptions: chartConfigs.pieChartOptions
      }
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('tenant/get', {}).then(() => {
          this.resource.models = this.$store.getters["tenant/models"]
          this.resource.data = Object.assign({}, this.$store.getters["tenant/data"])
        })
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
