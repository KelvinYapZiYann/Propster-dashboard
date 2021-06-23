<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">Edit/Add TenureContract</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-input label="Contract Name"
                      placeholder="Contract Name"
                      v-model="resource.model.contract_name">
          </base-input>
          <validation-error :errors="apiValidationErrors.contract_name"/>
        </div>
        <div class="col-md-6">
          <base-input label="Contract Description"
                      placeholder="Contract Description"
                      v-model="resource.model.contract_description">
          </base-input>
          <validation-error :errors="apiValidationErrors.contract_description"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-input label="Monthly Rental Amount"
                      placeholder="Monthly Rental Amount"
                      v-model="resource.model.monthly_rental_amount">
          </base-input>
          <validation-error :errors="apiValidationErrors.monthly_rental_amount"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input label="Contract Start Date"
                      type="date"
                      v-model="resource.model.tenure_start_date">
          </base-input>
          <validation-error :errors="apiValidationErrors.tenure_start_date"/>
        </div>
        <div class="col-md-6 pr-md-1">
          <base-input label="Contract End Date"
                      type="date"
                      v-model="resource.model.tenure_end_date">
          </base-input>
          <validation-error :errors="apiValidationErrors.tenure_end_date"/>
        </div>
      </div>
    </card>
    <card>
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
          <validation-error :errors="apiValidationErrors.file"/>
        </div>
      </div>
    </card>
    <base-button slot="footer" native-type="submit" type="primary"  @click="handleSubmit()" fill>Save</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";
import BaseSelectorInput from "@/components/Inputs/BaseSelectorInput";
import DropZone from "@/components/DropZone";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    BaseSelectorInput,
    DropZone
  },
  data() {
    return {
      fileCount: 0,
      parentModelId: null,
      parentModelType: null,
      prevRoute: null,
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
    // apiValidationErrors: {
    //   type: Object
    // }
  },
  created() {
    this.parentModelId = this.$route.query.modelId
    this.parentModelType = this.$route.query.modelType
  },
  methods: {
    async handleSubmit() {
      let formData = new FormData();

      if (this.resource.model.file) {
        formData.append('file', this.resource.model.file);
      }

      for (const [key, value] of Object.entries(this.translateModel())) {
        formData.append(key, value);
      }

      this.$emit('submit', formData)
    },
    translateModel() {
      return {
        tenant_id: this.parentModelId && this.parentModelType === 'tenant_id' ? this.parentModelId : null,
        contract_name: this.resource.model.contract_name,
        contract_description: this.resource.model.contract_description,
        monthly_rental_amount: this.resource.model.monthly_rental_amount,
        tenure_start_date: this.resource.model.tenure_start_date,
        tenure_end_date: this.resource.model.tenure_end_date
      }
    },
    sendingFile(file, xhr, formData) {
      this.resource.model.file = file;
    },
    maxFileExceeded() {
      this.$notify({
        message:'Max file reached',
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
