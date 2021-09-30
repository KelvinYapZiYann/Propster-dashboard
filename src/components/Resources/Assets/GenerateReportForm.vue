<template>
  <form @submit.prevent>
    <h5 slot="header" class="title">Generate Report</h5>
      <div class="row">
        <div class="col-md-6">
          <base-selector-input label="Report Type"
                               placeholder="Report Type"
                               v-model="model.report_type"
                               :options="reportTypes"
                               :error="tmpApiValidationErrors.report_type ? tmpApiValidationErrors.report_type[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.report_type"/> -->
        </div>
      </div>
    <div class="row">
      <!-- <div class="col-md-6">
        <base-input :label="$t('property.startDate')"
                    :error="tmpApiValidationErrors.start_date ? tmpApiValidationErrors.start_date[0] : ''">
              <el-date-picker
                type="date"
                :placeholder="$t('property.startDate')"
                v-model="model.start_date"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
        </base-input>
      </div>
      <div class="col-md-6">
        <base-input :label="$t('property.endDate')"
                    :error="tmpApiValidationErrors.end_date ? tmpApiValidationErrors.end_date[0] : ''">
              <el-date-picker
                type="date"
                :placeholder="$t('property.endDate')"
                v-model="model.end_date"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
        </base-input>
      </div> -->
      <div class="col-md-12">
        <!-- <base-input :label="$t('property.dateRange')"
                    :error="tmpApiValidationErrors.start_date ? (tmpApiValidationErrors.end_date ? tmpApiValidationErrors.start_date[0] + ' ' + tmpApiValidationErrors.end_date[0] : tmpApiValidationErrors.start_date[0]) : (tmpApiValidationErrors.end_date ? tmpApiValidationErrors.end_date[0] : '')">
              <el-date-picker
                type="daterange"
                v-model="dateRange"
                value-format="yyyy-MM-dd"
                range-separator="-"
                :start-placeholder="$t('property.startDate')"
                :end-placeholder="$t('property.endDate')"
              >
              </el-date-picker>
        </base-input> -->

        <v-date-picker
          v-model="dateRange"
          :masks="{input: 'YYYY-MM-DD'}"
          is-range
        >
          <template v-slot="{ inputValue, inputEvents }">
            <div class="row">
              <div class="col-md-6">
                <base-input :label="$t('property.startDate')"
                        :error="tmpApiValidationErrors.start_date ? tmpApiValidationErrors.start_date[0] : ''"
                        :placeholder="$t('property.startDate')"
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                        >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input :label="$t('property.endDate')"
                        :error="tmpApiValidationErrors.end_date ? tmpApiValidationErrors.end_date[0] : ''"
                        :placeholder="$t('property.endDate')"
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                        >
                </base-input>
              </div>
            </div>
          </template>
        </v-date-picker>
      </div>
    </div>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>Generate Report</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card } from "@/components";
import VDatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  mixins: [formMixin],
  components: {
    // AssetForm,
    // ValidationError,
    BaseSelectorInput,
    BaseInput,
    VDatePicker
  },
  data() {
    return {
      model: {
        report_type: null,
        start_date: null,
        end_date: null,
      },
      reportTypes: [
        { "id": "CASHFLOW_STATEMENT", "name": "Cashflow Statement" },
      ],
      dateRange: {
        start: null,
        end: null
      }
    }
  },
  props: {
    tmpApiValidationErrors: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
  },
  methods: {
    async handleSubmit() {
      this.$emit('requestReport', this.translateModel())
    },
    translateModel() {
      return {
        report_type: this.model.report_type,
        start_date: this.dateRange.start ? this.dateRange.start.toISOString() : '',
        end_date: this.dateRange.end ? this.dateRange.end.toISOString() : ''
      }
    }
  }
}
</script>
<style>
/* .modal .form-group.has-label label {
  font-size: 1rem;
  font-style: normal;
  color: black;
}
.modal .vc-popover-content .vc-day {
  font-size: 0.5rem;
  font-style: normal;
  color: black;
} */
</style>
