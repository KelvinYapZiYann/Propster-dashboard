<template>
  <table class="table tablesorter">
    <tbody :class="tbodyClasses">
    <tr v-for="(item, index) in data" :key="index" :class="[{unselectable: true}]" :style="rowColor[index]" >
      <td>
        {{((paginationPage - 1) * 10) + (index + 1)}}.
      </td>
      <slot :row="item">
          <td
            @click="showDetails(item.id)"
            @mousedown="startLongClick(item.id)" 
            @mouseleave="stopLongClick"
            @mouseup="stopLongClick"
            @touchstart="startLongClick(item.id)"
            @touchend="stopLongClick"
            @touchcancel="stopLongClick"
            align="left">
              <span>
                <strong>{{item.first_name}} {{item.last_name}}</strong>
              </span>
              <br>
              <span>
                {{item.email}} 
              </span>
              <br>
              <span>
                {{item.phone_number}}
              </span>
          </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>

export default {
  name: 'tenant-table',
  data() {
    return {
      timeout: null
    }
  },
  props: {
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
    tbodyClasses: {
      type: String,
      default: '',
      description: "<tbody> css classes"
    },
    paginationPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
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
      this.$emit('show-details', id)
    },
    editDetails: function (id) {
      this.$emit('edit-details', id)
    },
    deleteDetails: function (id) {
      this.$emit('delete-details', id)
    },
    startLongClick(id) {
      if (!this.timeout) {
        this.timeout = setTimeout(() => {
          this.$emit('long-click-event', id)
        }, 2000);
      }
    },
    stopLongClick() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
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
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
