<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <div class="header text-center"><h3 class="title">{{$t('tutorial.title')}}</h3></div>
    <div class="row">
      <div class="col-md-6">
        <card class="tutorial">
          <div class="card-header mb-3">
            <h5 class="card-category">{{$t('selectRole.landlord')}}</h5>
          </div>
          <div class="card-body">
            <div class="text-left mb-3">
              {{$t('tutorial.landlordDesc')}}
            </div>
            <base-button slot="footer" type="info" @click="handleLandlordTutorial()" fill>
              <i class="tim-icons icon-istanbul"></i>
              {{$t('selectRole.landlord')}}
            </base-button>
          </div>
        </card>
      </div>
      <div class="col-md-6">
        <card class="tutorial">
          <div class="card-header mb-3">
            <h5 class="card-category">{{$t('selectRole.tenant')}}</h5>
          </div>
          <div class="card-body">
            <div class="text-left mb-3">
              {{$t('selectRole.tenantDesc')}}
            </div>
            <base-button slot="footer" type="info" @click="handleTenantTutorial()" fill>
              <i class="tim-icons icon-single-02"></i>
              {{$t('selectRole.tenant')}}
            </base-button>
          </div>
        </card>
      </div>
      <div class="col-md-6">
        <card class="tutorial">
          <div class="card-header mb-3">
            <h5 class="card-category">{{$t('selectRole.agent')}}</h5>
          </div>
          <div class="card-body">
            <div class="text-left mb-3">
              {{$t('selectRole.agentDesc')}}
            </div>
            <base-button slot="footer" type="info" @click="handleAgentTutorial()" fill>
              <i class="fa fa-user-secret"></i>
              {{$t('selectRole.agent')}}
            </base-button>
          </div>
        </card>
      </div>
      <div class="col-md-6">
        <card class="tutorial">
          <div class="card-header mb-3">
            <h5 class="card-category">{{$t('selectRole.vendor')}}</h5>
          </div>
          <div class="card-body">
            <div class="text-left mb-3">
              {{$t('selectRole.vendorDesc')}}
            </div>
            <base-button slot="footer" type="info" @click="handleVendorTutorial()" fill>
              <i class="fa fa-industry"></i>
              {{$t('selectRole.vendor')}}
            </base-button>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components/index";
import swal from "sweetalert2";

export default {
  components: {
    Card
  },
  methods: {
    handleLandlordTutorial() {
      this.$router.push({
        name: 'Tutorial Landlord',
        params: {
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    handleTenantTutorial() {
      swal.fire({
        title: this.$t('alert.contentEmpty'),
        text: this.$t('alert.contentEmptyText'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "error",
      });
    },
    handleAgentTutorial() {
      swal.fire({
        title: this.$t('alert.contentEmpty'),
        text: this.$t('alert.contentEmptyText'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "error",
      });
    },
    handleVendorTutorial() {
      swal.fire({
        title: this.$t('alert.contentEmpty'),
        text: this.$t('alert.contentEmptyText'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "error",
      });
    },
  }
};
</script>
<style>
.tutorial .card-body i {
  display: block;
  font-size: 24px;
  line-height: 60px;
}
</style>
