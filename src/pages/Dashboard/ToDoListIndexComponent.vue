<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h4 slot="header" class="card-title text-left">{{$t('dashboard.todoList')}}</h4>
        <div class="text-right mb-3">
          <base-button
                @click="addModel"
                class="mt-3"
                type="info"      
          >
            {{$t('component.add')}} {{$t('dashboard.todoList')}}
          </base-button>
        </div>
        <div class="table-responsive custom-body-height">
          <base-table 
            :data="resource.models" 
            thead-classes="text-primary"
            :disableView="true"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails"
          >
            <template slot-scope="{ row }">
              <td>
                <base-checkbox v-model="row.done"> </base-checkbox>
              </td>
              <td class="text-left" :class="[{disabled : !row.done}]">
                <p class="title">{{ row.title }}</p>
                <p class="text-muted">{{ row.description }}</p>
              </td>
              <!-- <td class="td-actions text-right">
                <base-button type="link" artia-label="edit button">
                  <i class="tim-icons icon-pencil"></i>
                </base-button>
              </td> -->
            </template>
          </base-table>
        </div>
        <div
          slot="footer"
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
        >
          <div class="">
            <p class="card-category">
              {{$t('component.showing')}} {{ resource.data.from ? resource.data.from : "0" }} {{$t('component.to')}} {{ resource.data.to ? resource.data.to : "0" }} {{$t('component.of')}} {{ resource.data.total }} {{$t('component.entries')}}
            </p>
          </div>
          <base-pagination
            class="pagination-no-border"
            v-model="resource.data.currentPage"
            :per-page="resource.data.perPage"
            :total="resource.data.total"
            @input="handlePagination"
            type="info"
          >
          </base-pagination>
        </div>
      </card>
    </div>
  </div>
</template>
<script>

import {BaseButton, BaseCheckbox, BaseTable, BasePagination, Card} from "@/components";
import swal from "sweetalert2";

export default {
  components: {
    BaseButton,
    BaseTable,
    BaseCheckbox,
    BasePagination,
    Card
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        models: [],
        data: {
          currentPage: 1,
          total: 0,
          from: 0,
          to: 0,
          perPage: 10,
          links: []
        }
      },
      description: "Task List Table Data"
    }
  },
  methods: {
    editDetails(id) {
      swal({
        title: this.$t('alert.notEditable'),
        text: this.$t('alert.dummyData'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        type: "error",
      });
      // router.push({
      //   name: "Edit Assets",
      //   params: {
      //     assetId: id,
      //     previousRoute: this.$router.currentRoute.fullPath
      //   }
      // });
    },
    deleteDetails(id) {
      swal({
        title: this.$t('alert.notDeletable'),
        text: this.$t('alert.dummyData'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        type: "error",
      });
      // if (id == null) {
      //   this.$notify({
      //     message:'Server error del id == null',
      //     icon: 'tim-icons icon-bell-55',
      //     type: 'danger'
      //   });
      // } else {
      //   try {
      //     this.$store.dispatch('asset/remove', id)
      //     this.$notify({
      //       message:'Successfully Deleted',
      //       icon: 'tim-icons icon-bell-55',
      //       type: 'success'
      //     });
      //     this.getResource();
      //   } catch (e) {
      //     this.$notify({
      //       message:'Server error when del',
      //       icon: 'tim-icons icon-bell-55',
      //       type: 'danger'
      //     });
      //   }
      // }
    },
    addModel() {
      swal({
        title: this.$t('alert.todoListFailedAdded'),
        text: this.$t('alert.featureDeveloping'),
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
        type: "error",
      });
    },
    async handlePagination(pageId) {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
        try {
          // await this.$store.dispatch('dashboard/getOverdueTenantList', {}).then(() => {
          //   this.resource.models = this.$store.getters["dashboard/overdueTenantListModels"]
          //   this.resource.data = this.$store.getters["dashboard/overdueTenantListModels"]
          // });
        } catch (e) {
          this.$notify({
            message: errorHandlingService.displayAlertFromServer(e),
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        } finally {
          loader.hide();
        }
    }
  }

  // computed: {
  //   tableData() {
  //     return this.$t("dashboard.taskList");
  //   }
  // }
};
</script>
<style>
.disabled .title {
  color: #93959d;
}
.disabled .text-muted {
  color: #b7babb !important;
}

.custom-body-height {
  min-height: 350px;
}
@media (max-width:991px) {
  .custom-body-height {
    min-height: 10px;
  }
}
</style>
