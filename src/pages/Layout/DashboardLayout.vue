<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->
    <sidebar-fixed-toggle-button />
    <side-bar :background-color="backgroundColor">
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <template slot="links">
        <el-tooltip :content="$t('sidebar.dashboardDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{
              name: $t('sidebar.dashboard'),
              icon: 'tim-icons icon-chart-pie-36',
              path: '/dashboard'
            }"
          >
          </sidebar-link>
        </el-tooltip>

        <el-tooltip :content="$t('sidebar.assetsDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.assets'), path: '/assets', icon: 'fas fa-home fa-2x'}"
          ></sidebar-link>
        </el-tooltip>
        <!-- v-if="$store.getters['users/model'].selected_role ? $store.getters['users/model'].selected_role == 'LANDLORD' : false" -->
        <el-tooltip :content="$t('sidebar.tenantsDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.tenants'), path: '/tenants', icon: 'fas fa-child fa-2x'}"
          ></sidebar-link>
        </el-tooltip>
          <!-- v-if="$store.getters['users/model'].selected_role ? $store.getters['users/model'].selected_role == 'LANDLORD' : false" -->
        <el-tooltip :content="$t('sidebar.tenureContractsDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.tenureContracts'), path: '/tenure-contracts', icon: 'fas fa-file fa-2x'}"
          ></sidebar-link>
        </el-tooltip>
        <el-tooltip :content="$t('sidebar.billingRecordsDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.billingRecords'), path: '/billing-records', icon: 'fas fa-credit-card fa-2x'}"
          ></sidebar-link>
        </el-tooltip>
        <el-tooltip :content="$t('sidebar.paymentRecordsDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.paymentRecords'), path: '/payment-records', icon: 'fas fa-history fa-2x'}"
          ></sidebar-link>
        </el-tooltip>
        <el-tooltip :content="$t('sidebar.assetExpensesDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.assetExpenses'), path: '/asset-expenses', icon: 'fas fa-dollar-sign fa-2x'}"
          ></sidebar-link>
        </el-tooltip>
        <el-tooltip :content="$t('sidebar.userProfileDesc')" :open-delay="300" placement="right">
          <!-- v-if="$store.getters['users/model'].selected_role ? $store.getters['users/model'].selected_role == 'LANDLORD' : false" -->
          <sidebar-link
            :link="{ name: $t('sidebar.userProfile'), path: '/profile', icon: 'tim-icons icon-single-02'}"
          ></sidebar-link>
        </el-tooltip>
        <!-- <sidebar-link
          :link="{ name: $t('sidebar.settings'), path: '/settings', icon: 'fas fa-cog fa-2x'}"
        ></sidebar-link> -->
      </template>
    </side-bar>

    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";
import SidebarFixedToggleButton from "./SidebarFixedToggleButton.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink,
    SidebarFixedToggleButton
  },
  data() {
    return {
      backgroundColor: "blue"
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
