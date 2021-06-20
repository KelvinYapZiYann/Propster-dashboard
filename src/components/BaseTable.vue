<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
    <tr>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
    </tr>
    </thead>
    <tbody :class="tbodyClasses">
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, index)">
          {{itemValue(item, index)}}
        </td>
      </slot>
      <td>
        <base-button
            v-if="!disableView"
            @click="showDetails(item.id)"
            class="remove btn-link"
            type="danger"
            size="sm"
            icon
        >
          <i class="fa fa-eye" aria-hidden="true"></i>
        </base-button>
        <base-button
            v-if="!disableEdit"
            @click="editDetails(item.id)"
            class="edit btn-link"
            type="warning"
            size="sm"
            icon
        >
          <i class="tim-icons icon-pencil"></i>
        </base-button>
        <base-button
            v-if="!disableDelete"
            @click="deleteDetails(item.id)"
            class="remove btn-link"
            type="danger"
            size="sm"
            icon
        >
          <i class="tim-icons icon-simple-remove"></i>
        </base-button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>

export default {
  name: 'base-table',
  props: {
    columns: {
      type: Object,
      default: () => {},
      description: "Table columns"
    },
    data: {
      type: Array,
      default: () => [],
      description: "Table data"
    },
    type: {
      type: String, // striped | hover
      default: "",
      description: "Whether table is striped or hover type"
    },
    theadClasses: {
      type: String,
      default: '',
      description: "<thead> css classes"
    },
    tbodyClasses: {
      type: String,
      default: '',
      description: "<tbody> css classes"
    },
    disableEdit: {
      type: Boolean,
      default: false
    },
    disableView: {
      type: Boolean,
      default: false
    },
    disableDelete: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()] ? item[column.toLowerCase()] : "-";
    },
    showDetails: function (id) {
      this.$emit('show-details', id)
    },
    editDetails: function (id) {
      this.$emit('edit-details', id)
    },
    deleteDetails: function (id) {
      this.$emit('delete-details', id)
    }
  }
};
</script>
<style>
</style>
