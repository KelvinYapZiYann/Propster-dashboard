<template>
  <div class="row">
    <div class="col-12">
      <div class="pro-feature alert alert-danger" v-if="!resource.data.canAdd">
        <strong>
          You can only add ONE {{ table.title }} with free tier. Get
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
          >Add {{ table.title }}
          </base-button>
        </div>
        <div class="table-responsive">
          <base-table
            :disableEdit="true"
            :disableDelete="true"
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
  payment_description: "Payment Description",
  amount: "Amount (RM)",
  cash_flow_direction: "Cash flow",
  payment_method: "Payment Method"
};

export default {
  components: {
    BaseTable
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
      router.push({path: "/payment-records/" + id});
    },
    addModel() {
      this.$router.push({
        name: 'Add Payment Record',
        query: this.query
      });
    }
  }
};
</script>
<style>
</style>
