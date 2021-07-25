<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{addOrEdit}} {{$t('sidebar.tenureContract')}}</h5>
      <div class="row">
        <div class="col-md-6 ">
          <base-selector-input :label="$t('property.assetNickname')"
                      v-model="resource.model.asset_id"
                      :options="resource.selector.asset_id"
                      v-if="addOrEdit == 'Add' && !assetId"
                      :error="tmpApiValidationErrors.asset_nickname ? tmpApiValidationErrors.asset_nickname[0] : ''">
          </base-selector-input>
          <base-input :label="$t('property.assetNickname')"
                      v-if="addOrEdit == 'Add' && assetId" 
                      :value="getAssetNicknameByAssetIdFromSelector()"
                      :disabled="true"
                      :error="tmpApiValidationErrors.asset_nickname ? tmpApiValidationErrors.asset_nickname[0] : ''">
          </base-input>
          <base-input :label="$t('property.assetNickname')"
                      v-if="addOrEdit != 'Add'" 
                      :value="resource.model.asset ? (resource.model.asset.asset_nickname ? resource.model.asset.asset_nickname : '') : ''"
                      :disabled="true"
                      :error="tmpApiValidationErrors.asset_nickname ? tmpApiValidationErrors.asset_nickname[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.asset_id"/> -->
        </div>
        <div class="col-md-6">
          <!-- <base-selector-input label="Tenant Name"
                      placeholder="Tenant Name"
                      v-model="resource.model.tenant_id"
                      :options="resource.selector.tenant_id"
                      :defaultValue="tenantId"
                      :disabled="true"
                      > 
          </base-selector-input> -->
          <div v-for="tenant in resource.selector.tenant_id" v-bind:key="tenant.id">
              <base-input :label="$t('property.tenantName')"
                        v-if="tenant.id == tenantId && addOrEdit == 'Add'" 
                        :value="tenant.name"
                        :disabled="true"
                        :error="tmpApiValidationErrors.tenant_name ? tmpApiValidationErrors.tenant_name[0] : ''">
              </base-input>
          </div>
          <base-input :label="$t('property.tenantName')"
                      v-if="addOrEdit != 'Add'" 
                      :value="resource.model.tenant ? (resource.model.tenant.first_name + ' ' + resource.model.tenant.last_name) : ''"
                      :disabled="true"
                      :error="tmpApiValidationErrors.tenant_id ? tmpApiValidationErrors.tenant_id[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.tenant_id"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 ">
          <base-input :label="$t('property.contractName')"
                      :placeholder="$t('property.contractName')"
                      v-model="resource.model.contract_name"
                      :error="tmpApiValidationErrors.contract_name ? tmpApiValidationErrors.contract_name[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.contract_name"/> -->
        </div>
        <div class="col-md-6">
          <base-input :label="$t('property.description')"
                      :placeholder="$t('property.description')"
                      v-model="resource.model.contract_description"
                      :error="tmpApiValidationErrors.contract_description ? tmpApiValidationErrors.contract_description[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.contract_description"/> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.monthlyRentalAmount')"
                      :placeholder="$t('property.monthlyRentalAmount')"
                      v-model="resource.model.monthly_rental_amount"
                      :error="tmpApiValidationErrors.monthly_rental_amount ? tmpApiValidationErrors.monthly_rental_amount[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.monthly_rental_amount"/> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input :label="$t('property.tenureStartDate')"
                      :error="tmpApiValidationErrors.tenure_start_date ? tmpApiValidationErrors.tenure_start_date[0] : ''">
                <el-date-picker
                  type="date"
                  :placeholder="$t('property.tenureStartDate')"
                  v-model="resource.model.tenure_start_date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.tenure_start_date"/> -->
        </div>
        <div class="col-md-6 pr-md-1">
          <base-input :label="$t('property.tenureEndDate')"
                      :error="tmpApiValidationErrors.tenure_end_date ? tmpApiValidationErrors.tenure_end_date[0] : ''">
                <el-date-picker
                  type="date"
                  :placeholder="$t('property.tenureEndDate')"
                  v-model="resource.model.tenure_end_date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.tenure_end_date"/> -->
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
          <validation-error :errorsArray="tmpApiValidationErrors.file"/>
        </div>
      </div>
    </card>
    <base-button slot="footer" type="info" @click="handleCancel()" fill>{{$t('component.cancel')}}</base-button>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>{{addOrEdit}}</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, BaseSelectorInput, Card, DropZone, ValidationError } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    BaseInput,
    BaseSelectorInput,
    Card,
    DropZone,
    ValidationError
  },
  data() {
    return {
      fileCount: 0,
      assetId: null,
      tenantId: null,
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
    tmpApiValidationErrors: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
    addOrEdit: {
      type: String,
      required: true,
      default: "Add"
    }
  },
  created() {
    this.assetId = this.$route.query.assetId;
    this.tenantId = this.$route.query.tenantId;
  },
  methods: {
    async handleSubmit() {
      let formData = new FormData();

      if (this.resource.model.file) {
        formData.append('file', this.resource.model.file);
      }

      for (const [key, value] of Object.entries(this.translateModel())) {
        if (value) {
          formData.append(key, value);
        }
      }

      this.$emit('submit', formData)
    },
    async handleCancel() {
      this.$emit('cancel')
    },
    translateModel() {
      if (this.addOrEdit == 'Add') {
        return {
          tenant_id: this.tenantId ? this.tenantId : null,
          asset_id: this.assetId ? this.assetId : this.resource.model.asset_id,
          contract_name: this.resource.model.contract_name,
          contract_description: this.resource.model.contract_description,
          monthly_rental_amount: this.resource.model.monthly_rental_amount,
          tenure_start_date: this.resource.model.tenure_start_date,
          tenure_end_date: this.resource.model.tenure_end_date
        }
      } else {
        return {
          contract_name: this.resource.model.contract_name,
          contract_description: this.resource.model.contract_description,
          monthly_rental_amount: this.resource.model.monthly_rental_amount,
          tenure_start_date: this.resource.model.tenure_start_date,
          tenure_end_date: this.resource.model.tenure_end_date
        }
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
    getAssetNicknameByAssetIdFromSelector() {
      if (!this.resource.selector) {
        return "-";
      }
      if (!this.resource.selector.asset_id) {
        return "-";
      }
      for (var i = 0; i < this.resource.selector.asset_id.length; i++) {
        if (this.resource.selector.asset_id[i].id == this.assetId) {
          return this.resource.selector.asset_id[i].name;
        }
      }
      return "-";
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
