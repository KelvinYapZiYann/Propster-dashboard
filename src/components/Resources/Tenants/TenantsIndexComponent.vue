<template>
  <div class="row">
    <div class="col-12">
      <div class="pro-feature alert alert-danger">
        <strong>
          You can only add 3 {{table.title}} per property with free tier. Get
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
        <base-paginator
          :links="resource.data.links"
          @selectedPageURL="handleSelectedPageURL"
        >
        </base-paginator>
      </card>
    </div>
  </div>
</template>
<script>
import {BaseTable, BasePaginator} from "@/components";
import router from "@/router";

let tableColumns = {
  first_name: "First Name",
  last_name: "Last Name",
  is_business: "Is Business",
};

const tableDefaultData = [
  {
    first_name: "",
    last_name: "",
    is_business: "",
  }
];

export default {
  components: {
    BaseTable,
    BasePaginator
  },
  data() {
    return {
      table: {
        title: "Tenants",
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
      // default: {},
    }
  },
  methods: {
    showDetails(id) {
      router.push({path: "/tenants/" + id});
    },
    editDetails(id) {
      router.push({path: "/tenants/" + id + "/edit"});
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
          this.$store.dispatch('tenant/remove', id)
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
        name: 'Add Tenant',
        query: this.query
      });
    },
    async handleSelectedPageURL(url) {
      try {
        await this.$store.dispatch('tenant/get', parseInt(url.substring(url.indexOf('page=') + 5, url.length))).then(() => {
          this.resource.models = this.$store.getters["tenant/models"];
          this.resource.data = Object.assign({}, this.$store.getters["tenant/data"]);
        });
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      }
    }
  }
};
</script>
<style>
</style>
