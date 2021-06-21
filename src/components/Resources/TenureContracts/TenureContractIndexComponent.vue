<template>
  <div class="row">
    <div class="col-12">
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
  contract_name: "Contract Name",
  monthly_rental_amount: "Monthly Rental Amount",
  tenure_start_date: "Tenure Start Date",
  tenure_end_date: "Tenure End Date",
};

const tableDefaultData = [
  {
    contract_name: "",
    monthly_rental_amount: "",
    tenure_start_date: "",
    tenure_end_date: "",
  }
];

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      table: {
        title: "Tenure Contract",
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
      router.push({path: "/tenure-contracts/" + id});
    },
    editDetails(id) {
      router.push({path: "/tenure-contracts/" + id + "/edit"});
    },
    deleteDetails(id) {
      if (id == null) {
        this.$notify({
          message: 'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } else {
        try {
          this.$store.dispatch('tenure-contracts/remove', id)
          this.$notify({
            message: 'Successfully Deleted',
            icon: 'tim-icons icon-bell-55',
            type: 'success'
          });
          this.getResource();
        } catch (e) {
          this.$notify({
            message: 'Server error',
            icon: 'tim-icons icon-bell-55',
            type: 'danger'
          });
        }
      }
    },
    addModel() {
      this.$router.push({
        name: 'Add Tenure Contract',
        query: this.query
      });
    }
  }
};
</script>
<style>
</style>
