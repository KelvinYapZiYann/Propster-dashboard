<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">Create New Payment</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-input label="Payment Description"
                      placeholder="Payment Description"
                      v-model="resource.model.payment_description"
                      :error="tmpApiValidationErrors.payment_description ? tmpApiValidationErrors.payment_description[0] : ''">
          </base-input>
          <!-- <validation-error :errors="apiValidationErrors.payment_description"/> -->
        </div>
        <div class="col-md-6">
          <base-input label="Amount(RM)"
                      placeholder="Amount"
                      v-model="resource.model.amount"
                      :error="tmpApiValidationErrors.amount ? tmpApiValidationErrors.amount[0] : ''">
          </base-input>
          <!-- <validation-error :errors="apiValidationErrors.amount"/> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-selector-input label="Payment Method"
                               placeholder="Payment Method"
                               v-model="resource.model.payment_method"
                               :initialValue="resource.model.payment_method"
                               :options="resource.selector.payment_method"
                               :error="tmpApiValidationErrors.payment_method ? tmpApiValidationErrors.payment_method[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errors="apiValidationErrors.payment_method"/> -->
        </div>
        <div class="col-md-6">
          <base-selector-input label="Payment Type"
                               placeholder="Payment Type"
                               v-model="resource.model.payment_type"
                               :initialValue="resource.model.payment_type"
                               :options="resource.selector.payment_type"
                               :error="tmpApiValidationErrors.payment_type ? tmpApiValidationErrors.payment_type[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errors="apiValidationErrors.payment_type"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Reference Payment?"
                      type="checkbox"
                      v-model="resource.model.is_reference_only"
                      :error="tmpApiValidationErrors.is_reference_only ? tmpApiValidationErrors.is_reference_only[0] : ''">
          </base-input>
          <!-- <validation-error :errors="apiValidationErrors.is_reference_only"/> -->
        </div>
      </div>
    </card>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>Send</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
// import ValidationError from "@/components/ValidationError.vue";
import BaseSelectorInput from "@/components/Inputs/BaseSelectorInput";

export default {
  mixins: [formMixin],
  components: {
    // AssetForm,
    // ValidationError,
    BaseSelectorInput
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        model: {},
        data: {},
        selector: {}
      },
      description: "Resource info"
    },
    tmpApiValidationErrors: {
      type: Object
    }
  },
  methods: {
    async handleSubmit() {
      let formData = new FormData();

      // if (this.resource.model.file) {
      //   formData.append('file', this.resource.model.file);
      // }

      for (const [key, value] of Object.entries(this.translateModel())) {
        if (value) {
          formData.append(key, value);
        }
      }

      this.$emit('submit', formData)
    },
    translateModel() {
      return {
        recipient_type: this.resource.model.recipient.recipient_type,
        recipient_id: this.resource.model.recipient.id,
        asset_id: this.resource.model.asset.id,
        payment_description: this.resource.model.payment_description,
        payment_method: this.resource.model.payment_method,
        payment_type: this.resource.model.payment_type,
        amount: this.resource.model.amount,
        is_reference_only: this.resource.model.is_reference_only == null ? false : true,
      }
    }
  }
}
</script>
<style>
</style>
