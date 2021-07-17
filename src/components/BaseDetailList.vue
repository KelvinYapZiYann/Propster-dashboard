<template>
  <div class="content">
    <card>
      <div class="card-header mb-3">
        <h5 class="card-category">{{ category }}</h5>
        <h3 class="card-title">{{ title }}</h3>
      </div>
      <div class="card-body">
        <div class="row" v-for="(value, key) in headers" :key="key">
          <div class="col-sm-3 mb-3">
            <!-- v-if="hasValue(model, key)" -->
            <h6 class="mb-0">{{ headers[key] }}</h6>
          </div>
          <span class="col-sm-9 mb-3">
            <!-- v-if="hasValue(model, key)" -->
            {{ itemValue(model, key) }}
          </span>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
  import {Card} from "@/components";
  export default {
    components: {
      Card
    },
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
        type: Object,
        default: () => {},
        description: "Table data"
      },
      headers: {
        type: Object,
        default: () => {},
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
        if (item[column.toLowerCase()]) {
          return true;
        }
        for (const objectValue of Object.values(item)) {
          if (typeof objectValue == 'object') {
            if (objectValue[column.toLowerCase()]) {
              return true;
            }
          }
        }
        return false;
      },
      itemValue(item, column) {
        if (!item) {
          return '-';
        }
        if (typeof item[column.toLowerCase()] == 'boolean') {
          return item[column.toLowerCase()];
        } else if (typeof item[column.toLowerCase()] == 'number') {
          return item[column.toLowerCase()];
        } else if (typeof item[column.toLowerCase()] == 'string') {
          return item[column.toLowerCase()];
        } else {
          for (const objectValue of Object.values(item)) {
            if (objectValue) {
              if (typeof objectValue == 'object') {
                if (typeof objectValue[column.toLowerCase()] == 'boolean') {
                  return objectValue[column.toLowerCase()];
                } else if (typeof objectValue[column.toLowerCase()] == 'number') {
                  return objectValue[column.toLowerCase()];
                } else if (typeof objectValue[column.toLowerCase()] == 'string') {
                  return objectValue[column.toLowerCase()];
                }
              }
            }
          }
          return '-';
        }
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
