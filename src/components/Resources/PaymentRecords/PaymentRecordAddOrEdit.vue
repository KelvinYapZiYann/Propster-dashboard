<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">Create New Payment</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-selector-input label="Asset"
                               placeholder="Asset"
                               v-model="resource.model.asset.id"
                               :options="resource.selector.assets"
                               v-if="addOrEdit == 'Add' && (query ? !query.assetId : true)"
                               :error="tmpApiValidationErrors.asset_id ? tmpApiValidationErrors.asset_id[0] : ''"
          >
          </base-selector-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_id"/> -->
          <base-input label="Asset"
                      v-if="addOrEdit != 'Add' || (query ? query.assetId : false)" 
                      :value="resource.model.asset ? resource.model.asset.asset_nickname : ''"
                      :disabled="true"
                      :error="tmpApiValidationErrors.asset ? tmpApiValidationErrors.asset[0] : ''">
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 ">
          <base-input label="Payment Description"
                      placeholder="Payment Description"
                      v-model="resource.model.payment_description"
                      :error="tmpApiValidationErrors.payment_description ? tmpApiValidationErrors.payment_description[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.payment_description"/> -->
        </div>
        <div class="col-md-6">
          <base-input label="Amount(RM)"
                      placeholder="Amount"
                      v-model="resource.model.amount"
                      :error="tmpApiValidationErrors.amount ? tmpApiValidationErrors.amount[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.amount"/> -->
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
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.payment_method"/> -->
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
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.payment_type"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Reference Payment?"
                      type="checkbox"
                      :checked="typeof resource.model.is_reference_only == 'boolean' ? resource.model.is_reference_only : (typeof resource.model.is_reference_only == 'string' ? resource.model.is_reference_only == 'true' : false)"
                      v-model="resource.model.is_reference_only"
                      :error="tmpApiValidationErrors.is_reference_only ? tmpApiValidationErrors.is_reference_only[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.is_reference_only"/> -->
        </div>
      </div>
    </card>
    <base-button slot="footer" type="info" @click="handleBack()" fill>Cancel</base-button>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>Send</base-button>
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
    BaseInput,
    BaseSelectorInput,
    Card
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
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
    addOrEdit: {
      type: String,
      required: false,
      default: "Add"
    },
    query: {
      type: Object,
      // default: {},
    },
    previousRoute: {
      type: String,
      required: false,
      default: "",
      description: "Previous Route"
    }
  },
  mounted() {
    // console.log('mounted');
    // console.log(this.resource);
    // console.log(this.resource.model.payment_description);
    // console.log(this.resource.data);
    // console.log(this.resource.selector);
  },
  methods: {
    async handleBack() {
      if (this.previousRoute) {
        this.$router.push({path: this.previousRoute});
      } else {
        this.$router.go(-1);
      }
    },
    async handleSubmit() {
      let formData = new FormData();

      // if (this.resource.model.file) {
      //   formData.append('file', this.resource.model.file);
      // }

      for (const [key, value] of Object.entries(this.translateModel())) {
        if (value) {
          formData.append(key, value);
          continue;
        }
        if (key == "is_reference_only") {
          formData.append(key, value);
        }
      }

      this.$emit('submit', formData)
    },
    translateModel() {
      console.log(this.resource);
      return {
        // recipient_type: this.resource.model.recipient.recipient_type,
        recipient_type: "LANDLORD",
        recipient_id: this.resource.model.recipient.id,
        // sender_type: this.resource.model.sender.sender_type,
        sender_type: "TENANT",
        sender_id: this.resource.model.sender.id,
        asset_id: this.resource.model.asset.id,
        payment_description: this.resource.model.payment_description,
        payment_method: this.resource.model.payment_method,
        payment_type: this.resource.model.payment_type,
        amount: this.resource.model.amount,
        is_reference_only: this.resource.model.is_reference_only == null ? false : this.resource.model.is_reference_only,
      }
    }
  }
}
</script>
<style>
</style>
