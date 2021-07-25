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
      <div class="col-md-6">
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
        <!-- <validation-error :errorsArray="tmpApiValidationErrors.start_date"/> -->
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
        <!-- <validation-error :errorsArray="tmpApiValidationErrors.end_date"/> -->
      </div>
    </div>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>Generate Report</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    // AssetForm,
    // ValidationError,
    BaseSelectorInput,
    BaseInput
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
        start_date: this.model.start_date,
        end_date: this.model.end_date
      }
    }
  }
}
</script>
<style>
.has-danger .el-date-editor .el-input__inner {
  border-color: #ec250d;
  color: #ec250d;
}
</style>
