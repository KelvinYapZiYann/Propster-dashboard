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
        <div class="table-responsive">
          <base-table 
            :data="tableData" 
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
      </card>
    </div>
  </div>
</template>
<script>

import {BaseButton, BaseCheckbox, BaseTable, Card} from "@/components";

export default {
  components: {
    BaseButton,
    BaseTable,
    BaseCheckbox,
    Card
  },
  props: {
    tableData: {
      type: Array,
      required: true,
      default: [],
      description: "Task List Table Data"
    }
  },
  methods: {
    editDetails(id) {
      // router.push({
      //   name: "Edit Assets",
      //   params: {
      //     assetId: id,
      //     previousRoute: this.$router.currentRoute.fullPath
      //   }
      // });
    },
    deleteDetails(id) {
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
</style>
