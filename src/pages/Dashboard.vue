<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <div v-if="doesAssetExist && doesTenantExist">
      <div class="row">
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <el-tooltip
            :content="$t('dashboard.overdueIncomeDesc')"
            :open-delay="300"
          >
            <stats-card
              :title="`RM${resource.general ? resource.general.overdue_income : ''}`"
              :sub-title="$t('dashboard.overdueIncome')"
              type="primary"
              icon="tim-icons icon-time-alarm"
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
              icon="tim-icons icon-money-coins"
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
              icon="tim-icons icon-time-alarm"
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
              type="warning"
              icon="tim-icons icon-money-coins"
            >
            </stats-card>
          </el-tooltip>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <el-tooltip
            :content="$t('dashboard.projectedMonthlyIncomeDesc')"
            :open-delay="300"
          >
            <stats-card
              :title="`RM${resource.projectedMonthlyIncome}`"
              :sub-title="$t('dashboard.projectedMonthlyIncome')"
              type="primary"
              icon="tim-icons icon-spaceship"
            >
            <!-- image="/img/dollar_up.png" -->
            </stats-card>
          </el-tooltip>
          <el-tooltip
            :content="$t('dashboard.projectedMonthlyExpensesDesc')"
            :open-delay="300"
          >
            <stats-card
              :title="`RM0`"
              :sub-title="$t('dashboard.projectedMonthlyExpenses')"
              type="warning"
              icon="tim-icons icon-user-run"
            >
            </stats-card>
          </el-tooltip>
        </div>

        <div class="col-xl-9 col-lg-6 col-md-6 col-sm-6 mr-auto">
          <card class="card-chart card-chart-pie">
            <h5 slot="header" class="card-category text-left chart-header">
              {{$t('dashboard.rent')}}
            </h5>
            <div class="row">
              <div class="col-6">
                <div class="chart-area">
                  <div v-if="rentChartAlertText">{{$t('alert.pieChartNoValueAlert')}}</div>
                  <pie-chart
                    :chart-data="rentChart"
                    :extra-options="pieChartExtraOptions"
                    :height="120"
                  >
                  </pie-chart>
                </div>
              </div>

              <div class="col-6">
                <p class="category text-left chart-text"><i class="tim-icons icon-tag text-warning"></i> {{$t('dashboard.collectedRent')}}: RM{{resource.rental ? resource.rental.collected_rent : ''}}</p>
                <p class="category text-left chart-text"><i class="tim-icons icon-tag text-info"></i> {{$t('dashboard.overdueRent')}}: RM{{resource.rental ? resource.rental.overdue_rent : ''}}</p>
                <p class="category text-left chart-text"><i class="tim-icons icon-tag text-light"></i> {{$t('dashboard.upcomingRent')}}: RM{{resource.rental ? resource.rental.upcoming_rent : ''}}</p>
              </div>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-8 col-lg-6 mr-auto">
          <overdue-tenants-index-component
            :resource="resource.overdueTenantList"
            @getResource="getResource"
          ></overdue-tenants-index-component>
        </div>
        <div class="col-xl-4 col-lg-6 mr-auto">
          <div class="row">
            <div class="col-12">
              <div class="pro-feature alert alert-danger">
                <strong>
                  {{$t('alert.featureDeveloping')}}
                </strong>
              </div>
            </div>
          </div>
          <!-- <card type="tasks" headerClasses="text-left"> -->
            <!-- <template slot="header"> -->
              <!-- <template>
                <h6 class="title d-inline mr-2">Tasks(5)</h6>
              </template> -->
              <!-- <template>
                <p class="card-category d-inline">{{$t('dashboard.todoList')}}</p>
              </template> -->
              <!-- <drop-down tag="div">
                <button
                  aria-label="Settings menu"
                  data-toggle="dropdown"
                  class="dropdown-toggle btn-rotate btn btn-link btn-icon"
                >
                  <i class="tim-icons icon-settings-gear-63"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">
                  <a href="#pablo" class="dropdown-item">Action</a>
                  <a href="#pablo" class="dropdown-item">Another Action</a>
                  <a href="#pablo" class="dropdown-item">Something else</a>
                </ul>
              </drop-down> -->
            <!-- </template> -->
            <!-- <div class="table-full-width table-responsive"> -->
              <!-- <task-list
                :tableData="todoListTableData"
              ></task-list> -->
              <to-do-list-index-component
                :resource="todoListResource"
              ></to-do-list-index-component>
            <!-- </div> -->
          <!-- </card> -->
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="pro-feature alert alert-danger">
            <strong>
              {{$t('alert.featureDeveloping')}}
            </strong>
          </div>
        </div>
      </div>

      <assets-value-index-component
        :resource="resource.assetsValueList"
        @getResource="getResource"
      ></assets-value-index-component>

      <div class="row">
        <div class="col-12">
          <div class="pro-feature alert alert-danger">
            <strong>
              {{$t('alert.featureDeveloping')}}
            </strong>
          </div>
        </div>
      </div>

      <assets-rental-rate-index-component
        :resource="resource.rentalRateList"
        @getResource="getResource"
      ></assets-rental-rate-index-component>

      <div class="row">
        <div class="col-12">
          <div class="pro-feature alert alert-danger">
            <strong>
              {{$t('alert.featureDeveloping')}}
            </strong>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mr-auto">
          <card class="card-chart card-chart-pie">
            <h5 slot="header" class="card-category text-left chart-header">
              {{$t('dashboard.cashflow')}}
            </h5>
            <div class="row ml-3">
              <div class="col-12">
                <p class="category text-left chart-text"><i class="tim-icons icon-tag text-info"></i> {{$t('dashboard.income')}}</p>
                <p class="category text-left chart-text"><i class="tim-icons icon-tag text-warning"></i> {{$t('dashboard.expenses')}}</p>
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

        <div class="col-md-6 mr-auto">
          <card class="card-chart card-chart-pie height-350">
            <h5 slot="header" class="card-category text-left chart-header">
              {{$t('dashboard.assetsVacancy')}}
            </h5>
            <div class="row">
              <div class="col-6">
                <div v-if="assetVacancyChartAlertText">{{$t('alert.pieChartNoValueAlert')}}</div>
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
                <p class="category text-left chart-text"><i class="tim-icons icon-tag text-warning"></i> {{$t('dashboard.blankVacancy')}}: {{resource.assetsVacancy ? resource.assetsVacancy.blankVacancy : ''}}</p>
                <p class="category text-left chart-text"><i class="tim-icons icon-tag text-info"></i> {{$t('dashboard.currentTenants')}}: {{resource.assetsVacancy ? resource.assetsVacancy.currentTenants : ''}}</p>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>

    <div v-if="!doesAssetExist && !doesTenantExist">
      <tutorial-component></tutorial-component>
      <asset-empty
        :resource="resource.assetsValueList"
      >
      </asset-empty>
    </div>
    <div v-if="doesAssetExist && !doesTenantExist">
      <tenant-empty
        :resource="resource.tenants"
      >
      </tenant-empty>
    </div>
  </div>
</template>
<script>
import { 
  Card,
  // TimeLine,
  // TimeLineItem 
} from "@/components/index";

import * as chartConfigs from "@/components/Charts/config";
import StatsCard from "@/components/Cards/StatsCard";
import PieChart from "@/components/Charts/PieChart";
import BarChart from "@/components/Charts/BarChart";
import OverdueTenantsIndexComponent from "@/components/Resources/Tenants/OverdueTenantsIndexComponent";
import AssetsValueIndexComponent from "@/components/Resources/Assets/AssetsValueIndexComponent";
import AssetsRentalRateIndexComponent from "@/components/Resources/Assets/AssetsRentalRateIndexComponent";
import errorHandlingService from "@/store/services/error-handling-service";

import AssetEmpty from "@/components/Resources/Assets/AssetEmpty";
import TenantEmpty from "@/components/Resources/Tenants/TenantEmpty";
import TutorialComponent from "@/components/Tutorial/TutorialComponent";

// import TaskList from "./Dashboard/TaskList";
import ToDoListIndexComponent from "./Dashboard/ToDoListIndexComponent";
import swal from "sweetalert2";

export default {
  components: {
    Card,
    StatsCard,
    PieChart,
    BarChart,
    OverdueTenantsIndexComponent,
    AssetsValueIndexComponent,
    AssetsRentalRateIndexComponent,
    AssetEmpty,
    TenantEmpty,
    // TimeLine,
    // TimeLineItem,
    // TaskList,
    ToDoListIndexComponent,
    TutorialComponent
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
          blankVacancy: 0,
          currentTenants: 0
        },
        tenants: {
          data: {}
        },
        projectedMonthlyIncome: 0
      },
      barChartExtraOptions: chartConfigs.barChartOptionsGradient,
      pieChartExtraOptions: chartConfigs.pieChartOptions,
      doesAssetExist: true,
      doesTenantExist: true,
      todoListResource: {
        models: [
          {
            title: "Contact Vendor",
            description: "Contact Wi-Fi provider to fix the internet issue.",
            done: false
          },
          {
            title: "Contact Tenant",
            description: "Contact tenant to confirm if he want to extend his contract.",
            done: true
          },
          {
            title: "Replace Table",
            description: "Buy a new table for tenant that is broken.",
            done: false
          },
          {
            title: "Replace Chair",
            description: "Buy a new chair for tenant that is broken.",
            done: false
          }
        ],
        data: {
          currentPage: 1,
          total: 0,
          from: 0,
          to: 0,
          perPage: 10,
          links: []
        }
      }
    };
  },
  computed: {
    rentChart() {
      return {
        labels: [this.$t('dashboard.collectedRent') + " (RM)", this.$t('dashboard.overdueRent') + " (RM)", this.$t('dashboard.upcomingRent') + " (RM)"],
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
    rentChartAlertText() {
      return this.resource.rental.collected_rent == 0 && this.resource.rental.overdue_rent == 0 && this.resource.rental.upcoming_rent == 0;
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
            data: [40, 110, 90, 70, 90, 100]
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
            data: [this.resource.assetsVacancy.blankVacancy, this.resource.assetsVacancy.currentTenants]
          }
        ]
      }
    },
    assetVacancyChartAlertText() {
      return this.resource.assetsVacancy.currentTenants <= 0;
    }
  },
  methods: {
    async getResource() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
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
          this.resource.overdueTenantList.models = this.$store.getters["dashboard/overdueTenantListModels"]
          this.resource.overdueTenantList.data = Object.assign({}, this.$store.getters["dashboard/overdueTenantListData"]);
        });
        await this.$store.dispatch('asset/get', {}).then(() => {
          this.resource.assetsValueList.models = this.$store.getters["asset/models"]
          this.resource.assetsValueList.data = Object.assign({}, this.$store.getters["asset/data"]);
          this.doesAssetExist = this.$store.getters["asset/models"].length > 0;
          if (!this.doesAssetExist) {
            swal.fire({
              title: this.$t('dashboard.welcome') + ` ${this.$store.getters["users/model"].gender == 'MALE' ? 'Mr. ' : 'Ms. '}` + this.$store.getters["users/model"].first_name,
              text: this.$t('dashboard.welcomeText'),
              buttonsStyling: false,
              confirmButtonClass: "btn btn-info btn-fill",
              confirmButtonText: this.$t('component.gotIt'),
              icon: "success",
            });
          }

          this.resource.rentalRateList.models = this.$store.getters["asset/models"];
            for (let i = 0; i < this.resource.rentalRateList.models.length; i++) {
                this.resource.rentalRateList.models[i]['current_rental_rate'] = '1250';
                this.resource.rentalRateList.models[i]['current_market_rental_rate'] = '1450';
            }
            this.resource.rentalRateList.data = Object.assign({}, this.$store.getters["asset/data"]);
        });
        await this.$store.dispatch('tenant/get', {}).then(() => {
          this.resource.tenants.data = this.$store.getters["tenant/data"]
          this.resource.assetsVacancy.currentTenants = this.$store.getters["tenant/data"].total;
          let blankVacancy = 0;
          for (let i = 0; i < this.resource.assetsValueList.models.length; i++) {
            blankVacancy += this.resource.assetsValueList.models[i].number_of_rooms;
          }
          if (blankVacancy - this.resource.assetsVacancy.currentTenants < 0) {
            this.resource.assetsVacancy.blankVacancy = 0;
          } else {
            this.resource.assetsVacancy.blankVacancy = blankVacancy - this.resource.assetsVacancy.currentTenants;
          }
          this.doesTenantExist = this.resource.assetsVacancy.currentTenants > 0;
        });
        await this.$store.dispatch('billingRecords/get', {}).then(() => {
          let billingRecordsModels = this.$store.getters["billingRecords/models"];
          let totalAmount = 0;
          for (let i = 0; i < billingRecordsModels.length; i++) {
            totalAmount += parseFloat(billingRecordsModels[i].amount);
          }
          this.resource.projectedMonthlyIncome = totalAmount;
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
.chart-header {
  font-size: 1.0625rem !important;
  font-weight: 100;
}
.category.chart-text {
  font-size: 1em;
}
/* .height-350 {
  height: 350px;
} */
@media (min-width: 768px){
  .height-350 {
    height: 350px;
  }
}
</style>
