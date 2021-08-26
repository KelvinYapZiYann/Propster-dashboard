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
            :link="{ name: $t('sidebar.assets'), path: '/assets', icon: 'fas fa-home'}"
          ></sidebar-link>
        </el-tooltip>
        <!-- v-if="$store.getters['users/model'].selected_role ? $store.getters['users/model'].selected_role == 'LANDLORD' : false" -->
        <el-tooltip :content="$t('sidebar.tenantsDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.tenants'), path: '/tenants', icon: 'fas fa-child'}"
          ></sidebar-link>
        </el-tooltip>
          <!-- v-if="$store.getters['users/model'].selected_role ? $store.getters['users/model'].selected_role == 'LANDLORD' : false" -->
        <el-tooltip :content="$t('sidebar.tenureContractsDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.tenureContracts'), path: '/tenure-contracts', icon: 'fas fa-file'}"
          ></sidebar-link>
        </el-tooltip>
        <el-tooltip :content="$t('sidebar.billingRecordsDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.billingRecords'), path: '/billing-records', icon: 'fas fa-credit-card'}"
          ></sidebar-link>
        </el-tooltip>
        <el-tooltip :content="$t('sidebar.billingPaymentsDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.billingPayments'), path: '/billing-payments', icon: 'fas fa-history'}"
          ></sidebar-link>
        </el-tooltip>
        <el-tooltip :content="$t('sidebar.paymentRecordsDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.paymentRecords'), path: '/payment-records', icon: 'fas fa-dollar-sign'}"
          ></sidebar-link>
        </el-tooltip>
        <el-tooltip :content="$t('sidebar.assetExpensesDesc')" :open-delay="300" placement="right">
          <sidebar-link
            :link="{ name: $t('sidebar.assetExpenses'), path: '/asset-expenses', icon: 'fas fa-newspaper'}"
          ></sidebar-link>
        </el-tooltip>
        <el-tooltip :content="$t('sidebar.userProfileDesc')" :open-delay="300" placement="right">
          <!-- v-if="$store.getters['users/model'].selected_role ? $store.getters['users/model'].selected_role == 'LANDLORD' : false" -->
          <sidebar-link
            :link="{ name: $t('sidebar.userProfile'), path: '/profile', icon: 'tim-icons icon-single-02'}"
          ></sidebar-link>
        </el-tooltip>
        <!-- <sidebar-link
          :link="{ name: $t('sidebar.settings'), path: '/settings', icon: 'fas fa-cog'}"
        ></sidebar-link> -->
        <sidebar-link
          :link="{
            name: $t('sidebar.more'),
            icon: 'tim-icons icon-bullet-list-67',
            path: '/profile',
          }"
        >
          <sidebar-link
            :link="{
              name: $t('sidebar.todoList'),
              path: '/todo-list'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('topbar.changeRole'),
              path: '/select-role'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('roadmap.title'),
              path: '/roadmap'
            }"
          ></sidebar-link>
          <!-- <sidebar-link
            :link="{
              name: $t('tutorial.title'),
              path: '/tutorial'
            }"
          > 
          </sidebar-link> -->
        </sidebar-link>
        <li class="align-bottom">
          <a href="javascript:void(0)" class="nav-link " @click="logout">
            <i class="fas fa-sign-out-alt"></i>
            <p>{{$t('topbar.logout')}}</p>
          </a>
        </li>
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
import swal from "sweetalert2";

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
    },
    async logout() {
      swal.fire({
        title: this.$t('topbar.logout'),
        text: this.$t('alert.logoutText'),
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: this.$t('topbar.logout'),
        cancelButtonText: this.$t('component.cancel'),
        cancelButtonClass: "btn btn-info btn-fill",
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "warning",
      }).then((result) => {
        if (result.value) {
          try {
            this.$store.dispatch("logout");
          } catch (error) {
            this.$notify({
              type: "danger",
              message: "Oops, something went wrong!",
            });
          }
        }
      });
      
    },
  }
};
</script>
