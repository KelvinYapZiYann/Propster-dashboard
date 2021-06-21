<template>
  <div>
    <card>
      <div class="card-header mb-3">
        <h5 class="card-category">{{ category }}</h5>
        <h3 class="card-title">{{ title }}</h3>
      </div>
      <div class="card-body">
        <div class="row" v-for="(value, key) in model">
          <div class="col-sm-3 mb-3" v-if="hasValue(headers, key)">
            <h6 class="mb-0">{{ headers[key] }}</h6>
          </div>
          <span class="col-sm-9 mb-3" v-if="hasValue(headers, key)">
          {{ value }}
        </span>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
  export default {
    name: 'base-table',
    props: {
      category: {
        type: String,
        default: '',
        description: "Detail Category"
      },
      title: {
        type: String,
        default: '',
        description: "Detail Title"
      },
      model: {
        type: Array,
        default: () => [],
        description: "Table data"
      },
      headers: {
        type: Array,
        default: () => [],
        description: "Table data"
      },
    },
    computed: {
      // tableClass() {
      //   return this.type && `table-${this.type}`;
      // }
    },
    methods: {
      hasValue(item, column) {
        return item[column.toLowerCase()] ? true : false;
      },
      itemValue(item, column) {
        return item[column.toLowerCase()] ? item[column.toLowerCase()] : "-";
      },
      // showDetails: function (id) {
      //   this.$emit('show-details', id)
      // },
      // editDetails: function (id) {
      //   this.$emit('edit-details', id)
      // },
      // deleteDetails: function (id) {
      //   this.$emit('delete-details', id)
      // }
    }
  };
</script>
<style>
</style>
