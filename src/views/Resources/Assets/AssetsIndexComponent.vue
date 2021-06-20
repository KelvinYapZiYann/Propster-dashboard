<template>
  <div class="row">
    <div class="col-12">
      <div class="pro-feature alert alert-danger">
        <strong>
          You can only add ONE {{table.title}} with free tier. Get
          <a
            href="https://www.creative-tim.com/live/vue-black-dashboard-pro-laravel"
            target="_blank"
          >PRO</a>
          version to add more {{ table.title }} !
        </strong>
      </div>
      <card :title="table.title">
        <div class="text-right mb-3">
          <base-button
            @click="addModel"
            class="mt-3"
            type="primary"
            v-bind:disabled="!resource.data.canAdd"
          >Add {{table.title}}</base-button>
        </div>
        <div class="table-responsive">
          <base-table
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails"
          >
          </base-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import {BaseTable} from "@/components";
import router from "@/router";

let tableColumns = {
  asset_nickname: "Asset Nickname",
  asset_ownership_type: "Ownership Type",
  asset_size: "Size",
  is_occupied: "Currently Occupied",
  is_multi_unit: "Is Multi Unit"
};

const tableDefaultData = [
  {
    id: "",
    asset_nickname: "",
    ownership_type: "",
    ownership_size: "",
    is_occupied: "",
    is_multi_unit: ""
  }
];

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      table: {
        title: "Assets",
        columns: {...tableColumns},
        data: [...tableDefaultData]
      }
    };
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        models: [{}],
        data: {
          canAdd: false
        }
      },
      description: "Resource info"
    },
    query: {
      type: Object,
      default: {},
    }
  },
  methods: {
    showDetails(id) {
      router.push({path: "/assets/" + id});
    },
    editDetails(id) {
      router.push({path: "/assets/" + id + "/edit"});
    },
    deleteDetails(id) {
      if (id == null) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } else {
        try {
          this.$store.dispatch('asset/remove', id)
          this.$notify({
            message:'Successfully Deleted',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.getResource();
        } catch (e) {
          this.$notify({
            message:'Server error',
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        }
      }
    },
    addModel() {
      router.push({path: "/assets/add"});
    }
  }
};
</script>
<style>
</style>
