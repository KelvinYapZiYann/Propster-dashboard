<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <div class="header text-center"><h3 class="title">{{$t('roadmap.title')}}</h3></div>
    <div class="row">
      <div class="col-md-12">
        <time-line>
          <time-line-item
            inverted
            badge-type="success"
            badge-icon="fa fa-check"
          >
            <span slot="header" class="badge badge-pill badge-success">
              {{$t('roadmap.planning')}}
            </span>
            <span slot="header" class="badge badge-pill badge-success">
              {{$t('dateTime.april')}} 2021
            </span>
            <p slot="content">
              {{$t('roadmap.planningText')}}
            </p>
          </time-line-item>

          <time-line-item
            badge-type="warning"
            badge-icon="fas fa-spinner"
          >
            <span slot="header" class="badge badge-pill badge-warning">
              {{$t('roadmap.webBasedReportingTools')}}
            </span>
            <span slot="header" class="badge badge-pill badge-warning">
              {{$t('dateTime.september')}} 2021
            </span>
            <p slot="content">
              {{$t('roadmap.webBasedReportingToolsText')}}
            </p>
          </time-line-item>

          <time-line-item
            inverted
            badge-type="info"
            badge-icon="fa fa-ellipsis-h"
          >
            <span slot="header" class="badge badge-pill badge-info">
              {{$t('roadmap.mobileAppDeployment')}}
            </span>
            <span slot="header" class="badge badge-pill badge-info">
              {{$t('dateTime.october')}} 2021
            </span>

            <div slot="content">
              {{$t('roadmap.mobileAppDeploymentText')}}
            </div>
          </time-line-item>

          <time-line-item
            badge-type="info"
            badge-icon="fa fa-ellipsis-h"
          >
             <span slot="header" class="badge badge-pill badge-info">
              {{$t('roadmap.vendorRecruitmentPropertyInsight')}}
            </span>
            <span slot="header" class="badge badge-pill badge-info">
              {{$t('dateTime.december')}} 2021
            </span>

            <div slot="content">
              {{$t('roadmap.vendorRecruitmentPropertyInsightText')}}
            </div>
          </time-line-item>

          <time-line-item
            inverted
            badge-type="info"
            badge-icon="fa fa-ellipsis-h"
          >
            <span slot="header" class="badge badge-pill badge-info">
              {{$t('roadmap.rentalRewardSystem')}}
            </span>
            <span slot="header" class="badge badge-pill badge-info">
              {{$t('dateTime.march')}} 2022
            </span>

            <div slot="content">
              {{$t('roadmap.rentalRewardSystemText')}}
            </div>
          </time-line-item>

          <time-line-item
            badge-type="info"
            badge-icon="fa fa-ellipsis-h"
          >
             <span slot="header" class="badge badge-pill badge-info">
              {{$t('roadmap.customerServicesOpsTeam')}}
            </span>
            <span slot="header" class="badge badge-pill badge-info">
              {{$t('dateTime.may')}} 2022
            </span>

            <div slot="content">
              {{$t('roadmap.customerServicesOpsTeamText')}}
            </div>
          </time-line-item>
        </time-line>
      </div>
    </div>
    <div class="text-center"><h3 class="title">{{$t('roadmap.toTheMoon')}}</h3></div>
  </div>
</template>
<script>
import { TimeLine, TimeLineItem, DropDown } from "@/components/index";

export default {
  components: {
    TimeLine,
    TimeLineItem,
    DropDown
  }
};
</script>
<style>
.badge {
  font-size: 0.875rem;
}
</style>
