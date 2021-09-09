<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
    <tr>
      <slot name="columns">
        <th v-if="!disableIndex && !$store.getters['mobileLayout/isMobileLayout']">{{$t('property.index')}}</th>
        <th v-if="(!disableView || !disableEdit || !disableDelete) && !$store.getters['mobileLayout/isMobileLayout']">{{$t('property.actions')}}</th>
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
    </tr>
    </thead>
    <tbody :class="tbodyClasses">
    <tr v-for="(item, index) in data" :key="index" :class="{viewableRow: !disableView}" :style="rowColor[index]">
      <td v-if="!disableIndex && !$store.getters['mobileLayout/isMobileLayout']">
        {{((paginationPage - 1) * 10) + (index + 1)}}.
      </td>
      <td v-if="!$store.getters['mobileLayout/isMobileLayout']">
        <base-button
            v-if="!disableView"
            @click="showDetails(item.id)"
            class="remove btn-link"
            type="info"
            size="sm"
            :title="$t('component.detail')"
            icon
        >
          <i class="fa fa-eye" aria-hidden="true"></i>
        </base-button>
        <base-button
            v-if="!disableEdit"
            @click="editDetails(item.id)"
            class="edit btn-link"
            type="info"
            size="sm"
            :title="$t('component.edit')"
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
            :title="$t('component.remove')"
            icon
        >
          <i class="tim-icons icon-simple-remove"></i>
        </base-button>
      </td>
      <slot :row="item">
        <td v-for="(column, columnKey, i) in columns"
            :key="i"
            @click="showDetails(item.id)"
            >
            <!-- v-if="hasValue(item, index)" -->
            <span :class="itemClass(columnKey, index)">
              {{itemValue(item, columnKey)}}
            </span>
        </td>
      </slot>
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
    columnsDisplayValue: {
      type: Object,
      default: () => {},
      description: "Table columns display value"
    },
    columnsDisplayColor: {
      type: Object,
      default: () => {},
      description: "Table columns display color"
    },
    columnsDisplayPrefix: {
      type: Object,
      default: () => {},
      description: "Table columns display prefix"
    },
    columnsClass: {
      type: Array,
      default: () => [],
      description: "Table columns class"
    },
    // columnsClassColumn: {
    //   type: Array,
    //   default: () => [],
    //   description: "Table columns class"
    // },
    rowColor: {
      type: Array,
      default: () => [],
      description: "Table row color"
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
    },
    disableIndex: {
      type: Boolean,
      default: false
    },
    paginationPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    },
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      let prefix;
      if (this.columnsDisplayPrefix) {
        prefix = this.columnsDisplayPrefix[column.toLowerCase()];
        if (!prefix) {
          prefix = '';
        }
      } else {
        prefix = '';
      }
      let itemValue = item[column.toLowerCase()];
      if (itemValue) {
        if (this.columnsDisplayValue) {
          let displayValueObject = this.columnsDisplayValue[column.toLowerCase()];
          if (displayValueObject) {
            if (displayValueObject[itemValue]) {
              itemValue = displayValueObject[itemValue];
            }
          }
        }
        if (typeof itemValue == 'boolean') {
          return prefix + itemValue;
        } else if (typeof itemValue == 'number') {
          return prefix + itemValue;
        } else if (typeof itemValue == 'string') {
          return prefix + itemValue;
        } else {
          return '-';
        }
      } else {
        for (const objectValue of Object.values(item)) {
          if (typeof objectValue == 'object') {
            if (objectValue) {
              itemValue = objectValue[column.toLowerCase()];
              if (this.columnsDisplayValue) {
                let displayValueObject = this.columnsDisplayValue[column.toLowerCase()];
                if (displayValueObject) {
                  if (displayValueObject[itemValue]) {
                    itemValue = displayValueObject[itemValue];
                  }
                }
              }
              if (itemValue) {
                if (typeof itemValue == 'boolean') {
                  return prefix + itemValue;
                } else if (typeof itemValue == 'number') {
                  return prefix + itemValue;
                } else if (typeof itemValue == 'string') {
                  return prefix + itemValue;
                }
              }
            }
          }
        }
      }
      return '-';
    },
    itemClass(column, index) {
      try {
      if (this.columnsClass) {
        for (let j = 0; j < this.columnsClass.length; j++) {
          if (this.columnsClass[j].name == column) {
            return this.columnsClass[j].class[index];
          }
        }
      }
      return '';
      } catch(e) {
        console.log(e);
      }
    },
    showDetails: function (id) {
      if (!this.disableView) {
        this.$emit('show-details', id)
      }
    },
    editDetails: function (id) {
      this.$emit('edit-details', id)
    },
    deleteDetails: function (id) {
      this.$emit('delete-details', id)
    },
    // rowColorCallback: function (item, index) {
    //   this.$emit('rowColorCallback', item, index);
    // }
  }
};
</script>
<style>
.viewableRow {
  cursor: pointer;
}
.viewableRow:hover {
  background-color: #1d8cf411;
}
</style>
