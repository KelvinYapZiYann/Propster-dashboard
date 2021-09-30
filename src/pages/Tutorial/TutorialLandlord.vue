<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <div class="header text-center"><h3 class="title">{{$t('tutorial.title')}} - {{$t('selectRole.landlord')}}</h3></div>
    <div class="row">
        <div class="col-md-6">
            <card class="tutorial">
                <div class="card-header mb-3">
                    <h5 class="card-category">{{$t('sidebar.dashboard')}}</h5>
                </div>
                <div class="card-body">
                    <div class="text-left mb-3">
                        {{$t('selectRole.landlordDesc')}}
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
                    <h5 class="card-category">{{$t('sidebar.asset')}}</h5>
                </div>
                <div class="card-body">
                    <div class="text-left mb-3">
                        {{$t('selectRole.landlordDesc')}}
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
                    <h5 class="card-category">{{$t('sidebar.tenant')}}</h5>
                </div>
            </card>
        </div>

        <div class="col-md-6">
            <card class="tutorial">
                <div class="card-header mb-3">
                    <h5 class="card-category">{{$t('sidebar.tenureContract')}}</h5>
                </div>
            </card>
        </div>

        <div class="col-md-6">
            <card class="tutorial">
                <div class="card-header mb-3">
                    <h5 class="card-category">{{$t('sidebar.billingRecord')}}</h5>
                </div>
            </card>
        </div>

        <div class="col-md-6">
            <card class="tutorial">
                <div class="card-header mb-3">
                    <h5 class="card-category">{{$t('sidebar.billingPayment')}}</h5>
                </div>
            </card>
        </div>

        <div class="col-md-6">
            <card class="tutorial">
                <div class="card-header mb-3">
                    <h5 class="card-category">{{$t('sidebar.paymentRecord')}}</h5>
                </div>
            </card>
        </div>

        <div class="col-md-6">
            <card class="tutorial">
                <div class="card-header mb-3">
                    <h5 class="card-category">{{$t('sidebar.assetExpense')}}</h5>
                </div>
            </card>
        </div>
    </div>
    <base-button slot="footer" type="neutral" @click="handleBack()" fill>{{$t('component.back')}}</base-button>
  </div>
</template>
<script>
import { Card } from "@/components/index";

export default {
  components: {
    Card
  },
  methods: {
    handleBack() {
      if (this.previousRoute) {
        this.$router.push({path: this.previousRoute});
      } else {
        this.$router.go(-1);
      }
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
