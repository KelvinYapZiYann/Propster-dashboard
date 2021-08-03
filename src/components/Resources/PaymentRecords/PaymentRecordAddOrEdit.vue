<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{$t('component.add')}} {{$t('sidebar.paymentRecord')}}</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-selector-input :label="$t('property.sender')"
                               v-model="transactionResource.model.sender_id"
                               :options="transactionResource.selector.senders"
                               v-if="addOrEdit == 'Add' && (transactionResource.selector.senders)"
                               :error="tmpApiValidationErrors.sender_id ? tmpApiValidationErrors.sender_id[0] : ''"
                               @input="senderIdOnChange"
          >
          </base-selector-input>
          <base-input :label="$t('property.sender')"
                      v-if="addOrEdit != 'Add' || (!transactionResource.selector.senders)" 
                      :value="resource.model.sender ? (resource.model.sender.id ? resource.model.sender.sender_name : '') : ''"
                      :disabled="true"
                      :error="tmpApiValidationErrors.sender_id ? tmpApiValidationErrors.sender_id[0] : ''">
          </base-input>
        </div>
        <div class="col-md-6 ">
          <base-selector-input :label="$t('property.recipient')"
                               v-model="transactionResource.model.recipient_id"
                               :options="transactionResource.selector.recipients"
                               v-if="addOrEdit == 'Add' && (transactionResource.selector.recipients)"
                               :error="tmpApiValidationErrors.recipient_id ? tmpApiValidationErrors.recipient_id[0] : ''"
          >
          </base-selector-input>
          <base-input :label="$t('property.recipient')"
                      v-if="addOrEdit != 'Add' || (!transactionResource.selector.recipients)" 
                      :value="resource.model.recipient ? (resource.model.recipient.id ? resource.model.recipient.recipient_name : '') : (transactionResource.model.recipient_id ? transactionResource.model.recipient_name : '')"
                      :disabled="true"
                      :error="tmpApiValidationErrors.recipient_id ? tmpApiValidationErrors.recipient_id[0] : ''">
          </base-input>
        </div>
      </div>
      <div v-if="resource.model.recipient">
        <div class="row">
          <div class="col-md-6 ">
            <base-selector-input :label="$t('property.assetNickname')"
                                v-model="resource.model.asset.id"
                                :options="resource.selector.assets"
                                v-if="addOrEdit == 'Add' && (query ? !query.assetId : true)"
                                :error="tmpApiValidationErrors.asset_id ? tmpApiValidationErrors.asset_id[0] : ''"
            >
            </base-selector-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_id"/> -->
            <base-input :label="$t('property.assetNickname')"
                        v-if="addOrEdit != 'Add' || (query ? query.assetId : false)" 
                        :value="resource.model.asset ? resource.model.asset.asset_nickname : ''"
                        :disabled="true"
                        :error="tmpApiValidationErrors.asset ? tmpApiValidationErrors.asset[0] : ''">
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 ">
            <base-input :label="$t('property.description')"
                        :placeholder="$t('property.description')"
                        v-model="resource.model.payment_description"
                        :error="tmpApiValidationErrors.payment_description ? tmpApiValidationErrors.payment_description[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.payment_description"/> -->
          </div>
          <div class="col-md-6">
            <base-input :label="$t('property.amount')"
                        :placeholder="$t('property.amount')"
                        v-model="resource.model.amount"
                        :error="tmpApiValidationErrors.amount ? tmpApiValidationErrors.amount[0] : ''">
            </base-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.amount"/> -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <base-selector-input :label="$t('property.paymentMethod')"
                                :placeholder="$t('property.paymentMethod')"
                                v-model="resource.model.payment_method"
                                :initialValue="resource.model.payment_method"
                                :options="resource.selector.payment_method"
                                :error="tmpApiValidationErrors.payment_method ? tmpApiValidationErrors.payment_method[0] : ''"
            >
            </base-selector-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.payment_method"/> -->
          </div>
          <div class="col-md-6">
            <base-selector-input :label="$t('property.paymentType')"
                                :placeholder="$t('property.paymentType')"
                                v-model="resource.model.payment_type"
                                :initialValue="resource.model.payment_type"
                                :options="resource.selector.payment_type"
                                :error="tmpApiValidationErrors.payment_type ? tmpApiValidationErrors.payment_type[0] : ''"
            >
            </base-selector-input>
            <!-- <validation-error :errorsArray="tmpApiValidationErrors.payment_type"/> -->
          </div>
        </div>

        <!-- <div class="row">
          <div class="col-md-6">
            <base-input :label="$t('property.isReferenceOnly')"
                        type="checkbox"
                        :checked="typeof resource.model.is_reference_only == 'boolean' ? resource.model.is_reference_only : (typeof resource.model.is_reference_only == 'string' ? resource.model.is_reference_only == 'true' : false)"
                        v-model="resource.model.is_reference_only"
                        :error="tmpApiValidationErrors.is_reference_only ? tmpApiValidationErrors.is_reference_only[0] : ''">
            </base-input>
          </div>
        </div> -->
      </div>
    </card>

    <card v-if="resource.model.recipient">
      <div class="row">
        <div class="col-md-12">
          <drop-zone ref="myVueDropzone"
                     id="dropzone"
                     :options="dropzoneOptions"
                     :duplicateCheck="true"
                     v-on:vdropzone-max-files-exceeded="maxFileExceeded"
                     v-on:vdropzone-sending="sendingFile"
          >
          </drop-zone>
          <validation-error :errorsArray="tmpApiValidationErrors.file"/>
        </div>
      </div>
    </card>

    <base-button slot="footer" type="info" @click="handleBack()" fill>{{$t('component.cancel')}}</base-button>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>{{$t('component.add')}}</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card, DropZone, ValidationError } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    // AssetForm,
    ValidationError,
    BaseInput,
    BaseSelectorInput,
    Card,
    DropZone
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        maxFiles: 1
      },
    }
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
    transactionResource: {
      type: Object,
      required: true,
      default: {
        model: {},
        selector: []
      },
      description: "Transaction resource info"
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
    senderIdOnChange(val) {
      this.$emit("senderIdOnChange", val);
    },
    async handleBack() {
      if (this.previousRoute) {
        this.$router.push({path: this.previousRoute});
      } else {
        this.$router.go(-1);
      }
    },
    async handleSubmit() {
      let formData = new FormData();

      if (this.resource.model.file) {
        formData.append('file', this.resource.model.file);
      }

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
    },
    sendingFile(file, xhr, formData) {
      console.log('sendingFile');
      this.resource.model.file = file;
      console.log(this.resource.model.file);
    },
    maxFileExceeded() {
      this.$notify({
        message: this.$t('alert.maxFileReached'),
        icon: 'tim-icons icon-bell-55',
        type: 'danger'
      });
    },
    getFileCount() {
      if ('undefined' !== typeof this.$refs.myVueDropzone.dropzone) {
        this.fileCount = this.$refs.myVueDropzone.dropzone.files.length
      } else {
        this.fileCount = 0;
      }
    },
  }
}
</script>
<style>
</style>
