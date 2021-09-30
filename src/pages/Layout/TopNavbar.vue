<template>
  <nav
    class="navbar navbar-expand-lg sticky-top navbar-transparent"
  >
  <!-- navbar-absolute -->
  <!-- :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu, 'border-bottom ': showMenu }" -->
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-minimize d-inline"><sidebar-toggle-button /></div>
        <div
          class="navbar-toggle d-inline"
          :class="{ toggled: $sidebar.showSidebar }"
        >
          <button type="button" class="navbar-toggler" @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="javascript:void(0)">Propster.io</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        data-toggle="collapse"
        data-target="#navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <div class="collapse navbar-collapse show text-left" v-show="showMenu">
        <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
          <!-- <li class="search-bar input-group" @click="searchModalVisible = true">
            <button
              class="btn btn-link"
              id="search-button"
              data-toggle="modal"
              data-target="#searchModal"
            >
              <i class="tim-icons icon-zoom-split"></i>
              <span class="d-lg-none d-md-block">Search</span>
            </button>
          </li> -->
          <modal
            :show.sync="searchModalVisible"
            class="modal-search"
            id="searchModal"
            :centered="false"
            :show-close="true"
          >
            <input
              slot="header"
              v-model="searchQuery"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="SEARCH"
            />
          </modal>
          <!-- <drop-down>
            <a
              href="javascript:void(0)"
              data-toggle="dropdown"
              class="dropdown-toggle nav-link"
              :title="$t('topbar.messages')"
            >
              <div class="notification d-none d-lg-block d-xl-block" v-if="messages.length > 0"></div>
              <i class="fa fa-comments text-muted"></i>
              <p class="d-lg-none text-left">
                {{$t('topbar.messages')}}
              </p>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
              <li class="nav-link" v-for="(value, key) in messages" :key="key">
                <a :href="value.link" class="nav-item dropdown-item"
                  >{{value.title}}</a
                >
              </li>
              <div class="dropdown-divider"></div>
              <li class="nav-link">
                <router-link class="nav-item dropdown-item" to="/messages" v-slot="{ navigate, href }" custom>
                  <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">All Messages</a>
                </router-link>
              </li>
            </ul>
          </drop-down> -->
          <!-- <drop-down>
            <a
              href="javascript:void(0)"
              data-toggle="dropdown"
              class="dropdown-toggle nav-link"
              :title="$t('topbar.notifications')"
            >
              <div class="notification d-none d-lg-block d-xl-block" v-if="notifications.length > 0"></div>
              <i class="fa fa-bell text-muted"></i>
              <p class="d-lg-none text-left">
                {{$t('topbar.notifications')}}
              </p>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
              <li class="nav-link" v-for="(value, key) in notifications" :key="key">
                <router-link class="nav-item dropdown-item" :to="value.link" v-slot="{ navigate, href }" custom>
                  <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">{{value.title}}</a>
                </router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li class="nav-link">
                <router-link class="nav-item dropdown-item" to="/notifications" v-slot="{ navigate, href }" custom>
                  <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">All Notifications</a>
                </router-link>
              </li>
            </ul>
          </drop-down> -->
          <drop-down :defaultShow="showMenu">
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <div class="photo" :title="userFullname">
                <img v-if="userGender == 'FEMALE'" src="@/assets/img/anime6.png" alt="Profile Photo" />
                <img v-else src="@/assets/img/anime3.png" alt="Profile Photo" />
              </div>
              <b class="caret d-none d-lg-block d-xl-block"></b>
              <p class="d-lg-none">
                {{userFullname}}
              </p>
            </a>
            <ul class="dropdown-menu dropdown-navbar">
              <li class="nav-link">
                <a href="javascript:void(0)" @click="profile" class="nav-item dropdown-item"
                  >{{$t('sidebar.userProfile')}}</a
                >
              </li>
              <!-- <li class="nav-link">
                <a href="/settings" class="nav-item dropdown-item"
                  >Settings</a
                >
              </li> -->
              <li class="nav-link">
                <a href="/select-role" class="nav-item dropdown-item"
                >{{$t('topbar.changeRole')}}</a
                >
              </li>
              <li class="dropdown-divider"></li>
              <li class="nav-link">
                <a href="javascript:void(0)" @click="logout" class="nav-item dropdown-item"
                  >{{$t('topbar.logout')}}</a
                >
              </li>
            </ul>
          </drop-down>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import DropDown from "@/components/Dropdown.vue";
import Modal from "@/components/Modal.vue";
import SidebarToggleButton from "./SidebarToggleButton.vue";
import swal from "sweetalert2";

export default {
  components: {
    DropDown,
    Modal,
    SidebarToggleButton
  },
  data() {
    return {
      searchModalVisible: false,
      searchQuery: "",
      showMenu: false,
      hasNotification: false,
      messages: [
        {
          id: 1,
          title: "Message 1 email sent",
          link: "https://propster.io/api/dashboard/message/1"
        },
        {
          id: 2,
          title: "Message 2 email sent",
          link: "https://propster.io/api/dashboard/message/2"
        },
        {
          id: 3,
          title: "Message 3 email sent",
          link: "https://propster.io/api/dashboard/message/3"
        },
        {
          id: 4,
          title: "Message 1 email sent",
          link: "https://propster.io/api/dashboard/message/4"
        },
        {
          id: 5,
          title: "Message 1 email sent",
          link: "https://propster.io/api/dashboard/message/5"
        },
      ],
      notifications: [
        {
          id: 1,
          title: "Notification 1 email sent",
          link: "/notifications"
        },
        {
          id: 2,
          title: "Notification 2 email sent",
          link: "/notifications"
        },
        {
          id: 3,
          title: "Notification 3 email sent",
          link: "/notifications"
        },
        {
          id: 4,
          title: "Notification 1 email sent",
          link: "/notifications"
        },
        {
          id: 5,
          title: "Notification 1 email sent",
          link: "/notifications"
        },
      ],
      userFullname: this.$store.getters["users/model"].full_name,
      userGender: this.$store.getters["users/model"].gender,
    };
  },
  mounted() {
    if (!this.$store.getters["users/model"].full_name) {
      this.$store.dispatch('users/get').then(() => {
        this.userFullname = this.$store.getters["users/model"].full_name;
        this.userGender = this.$store.getters["users/model"].gender;
      });
    }
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
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
        confirmButtonClass: "btn btn-neutral btn-fill",
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
    async profile() {
      try {
        if (this.$router.currentRoute.path == "/profile") {
          return;
        }
        this.$router.push({name: "User Profile"});
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Oops, something went wrong!",
        });
      }
    },
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    }
  }
};
</script>
<style></style>
