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
                <strong>{{item.payment_description}}</strong>
              </span>
              <br>
              <span>
                <i class="fa fa-home mr-2"></i>
                {{item.asset ? item.asset.asset_nickname : ''}}
              </span>
              <br>
              <span
                v-if="item.cash_flow_direction == 'SENDING'"
              >
                <i class="fa fa-child mr-2 ml-1"></i>
                {{item.recipient ? (item.recipient.recipient_name ? item.recipient.recipient_name : 'Vendor') : ''}}
                <i class="fa fa-arrow-right ml-2" style="color:#fd5d93"></i>
              </span>
              <span
                v-else
              >
                <i class="fa fa-child mr-2 ml-1"></i>
                {{item.sender ? item.sender.sender_name : ''}}
                <i class="fa fa-arrow-left ml-2" style="color:#00f2c3"></i>
              </span>
          </td>
          <td
            @click="showDetails(item.id)"
            @mousedown="startLongClick(item.id)" 
            @mouseleave="stopLongClick"
            @mouseup="stopLongClick"
            @touchstart="startLongClick(item.id)"
            @touchend="stopLongClick"
            @touchcancel="stopLongClick"
            align="right"
            >
              <span 
                :class="[{'badge badge-pill badge-success': item.status == 'RECEIVED'}, {'badge badge-pill badge-warning': item.status != 'RECEIVED'}]"
                style="font-size:0.8rem;"
              >
                {{status[item.status]}}
              </span>
              <br>
              <span>
                <i class="fa fa-dollar-sign"></i>
                RM{{item.amount}}
              </span>
              <br>
              <span>
                <i class="fa fa-calendar"></i>
                {{item.created_at}}
              </span>
          </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>

export default {
  name: 'asset-expense-table',
  data() {
    return {
      timeout: null,
      status: {
        RECEIVED: "Received",
        AWAITING_ACKNOWLEDGEMENT: "Awaiting Acknowledgement",
        PROCESSING: "Processing",
        CREATED: "Created",
      },
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
        console.log('zxczxczxc');
      if (!this.timeout) {
        this.timeout = setTimeout(() => {
          this.$emit('long-click-event', id)
        }, 2000);
      }
    },
    stopLongClick() {
        console.log('stop');
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
