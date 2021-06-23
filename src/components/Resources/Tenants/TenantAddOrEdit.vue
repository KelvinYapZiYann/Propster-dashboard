<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{addOrEdit}} Tenant</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-input label="First Name"
                      placeholder="First Name"
                      v-model="resource.model.first_name">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.first_name"/>
        </div>
        <div class="col-md-6">
          <base-input label="Last Name"
                      placeholder="Last Name"
                      v-model="resource.model.last_name">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.last_name"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-selector-input label="Gender"
                               placeholder="Gender"
                               v-model="resource.model.gender"
                               :initialValue="resource.model.gender"
                               :options="resource.selector.gender"
          >
          </base-selector-input>
          <validation-error :errorsArray="tmpApiValidationErrors.gender"/>
        </div>
        <div class="col-md-6">
          <base-input label="Is Business?"
                      type="checkbox"
                      v-model="resource.model.is_business">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.is_business"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Date Of Birth"
                      type="date"
                      v-model="resource.model.date_of_birth">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.date_of_birth"/>
        </div>
        <div class="col-md-6 pr-md-1">
          <base-input label="Reputation"
                      placeholder="Reputation"
                      v-model="resource.model.reputation">
          </base-input>
          <validation-error :errorsArray="tmpApiValidationErrors.reputation"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-selector-input label="Salary Range"
                               placeholder="Salary Range"
                               v-model="resource.model.salary_range"
                               :initialValue="resource.model.salary_range"
                               :options="resource.selector.salary_range"
          >
          </base-selector-input>
          <validation-error :errorsArray="tmpApiValidationErrors.salary_range"/>
        </div>
      </div>
    </card>

    <base-button slot="footer" native-type="submit" type="primary"  @click="handleSubmit()" fill>{{addOrEdit}}</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card, ValidationError } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    BaseInput,
    BaseSelectorInput,
    Card
  },
  data() {
    return {
      fileCount: 0,
      parentModelId: null,
      parentModelType: null,
    }
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        model: {},
        data: {},
        selector: []
      },
      description: "Resource info",
    },
    addOrEdit: {
      type: String,
      required: true,
      default: "Add"
    },
    tmpApiValidationErrors: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    }
  },
  created() {
    this.parentModelId = this.$route.query.modelId
    this.parentModelType = this.$route.query.modelType
  },
  methods: {
    async handleSubmit() {
      this.$emit('submit', this.translateModel(this.resource.model))
    },
    translateModel(model) {
      return {
        asset_id: this.parentModelId && this.parentModelType === 'asset_id' ? this.parentModelId : null,
        first_name: this.resource.model.first_name,
        last_name: this.resource.model.last_name,
        gender: this.resource.model.gender,
        is_business: this.resource.model.is_business == null ? false : true,
        date_of_birth: this.resource.model.date_of_birth,
        reputation: this.resource.model.reputation,
        salary_range: this.resource.model.salary_range
      }
    }
  }
}
</script>
<style>
</style>
