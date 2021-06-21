<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title">
        <div class="table-responsive">
          <base-table
            :disableEdit="true"
            :disableDelete="true"
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
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
  payment_description: "Payment Description",
  amount: "Amount (RM)",
  cash_flow_direction: "Cash flow",
  payment_method: "Payment Method"
};

export default {
  components: {
    BaseTable,
    BasePaginator
  },
  data() {
    return {
      table: {
        title: "Payment Records",
        columns: {...tableColumns},
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
      router.push({path: "/asset-expenses/" + id});
    },
  }
};
</script>
<style>
</style>
