<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h3 slot="header" class="card-title">{{$t('dashboard.todoList')}}</h3>
        <div class="text-right">
          <base-button
                @click="addModel"
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
            :paginationPage="paginationPage"
          >
            <template slot-scope="{ row }">
              
              <td class="text-left" :class="[{disabled : !row.status}]">
                <p class="title">{{ row.title }}</p>
                <p class="text-muted">{{ row.content }}</p>
              </td>
              <td>
                <base-checkbox 
                  v-model="row.status"
                  @input="handleCheckbox($event, row.id, row.title, row.content)"
                ></base-checkbox>
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
import errorHandlingService from "@/store/services/error-handling-service";
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
  data() {
    return {
      paginationPage: 1
    }
  },
  methods: {
    editDetails(id) {
      // swal.fire({
      //   title: this.$t('alert.notEditable'),
      //   text: this.$t('alert.dummyData'),
      //   buttonsStyling: false,
      //   confirmButtonClass: "btn btn-info btn-fill",
      //   icon: "error",
      // });
      this.$router.push({
        name: "Edit ToDo List",
        params: {
          todoListId: id,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    },
    deleteDetails(id) {
      swal.fire({
        title: this.$t('alert.confirmDelete'),
        text: this.$t('alert.confirmDeleteText'),
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: this.$t('component.yes'),
        cancelButtonText: this.$t('component.no'),
        cancelButtonClass: "btn btn-info btn-fill",
        confirmButtonClass: "btn btn-info btn-fill",
        icon: "info",
      }).then((result) => {
        if (result.value) {
          try {
            this.$store.dispatch('todoList/remove', id).then(() => {
              this.$notify({
                message:'Successfully Deleted',
                icon: 'tim-icons icon-bell-55',
                type: 'success'
              });
              this.handlePagination(1);
            })
          } catch (e) {
            this.$notify({
              message: errorHandlingService.displayAlertFromServer(e),
              icon: 'tim-icons icon-bell-55',
              type: 'danger'
            });
          }
        }
      });
    },
    addModel() {
      this.$router.push({
        name: 'Add ToDo List',
        query: this.query,
        params: {
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
      // swal.fire({
      //   title: this.$t('alert.todoListFailedAdded'),
      //   text: this.$t('alert.featureDeveloping'),
      //   buttonsStyling: false,
      //   confirmButtonClass: "btn btn-info btn-fill",
      //   icon: "error",
      // });
    },
    async handlePagination(pageId) {
      this.paginationPage = pageId;
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
        try {
          await this.$store.dispatch('todoList/get', pageId).then(() => {
            this.resource.models = this.$store.getters["todoList/models"]
            this.resource.data = this.$store.getters["todoList/data"]
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
    async handleCheckbox(value, id, title, content) {
      this.$store.dispatch('todoList/update', {'todoListId': id, 'model': {
        'title': title,
        'content': content,
        'status': value,
      }}).then(() => {
        this.$notify({
          message:'Successfully Updated',
          icon: 'tim-icons icon-bell-55',
          type: 'success'
        });
      }).catch((e) => {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      });
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

/* .custom-body-height {
  min-height: 350px;
}
@media (max-width:991px) {
  .custom-body-height {
    min-height: 10px;
  }
} */
</style>
