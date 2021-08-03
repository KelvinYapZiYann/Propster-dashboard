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
                      :error="tmpApiValidationErrors.asset_id ? tmpApiValidationErrors.asset_id[0] : ''">
          </base-selector-input>
          <base-input :label="$t('property.assetNickname')"
                      v-if="addOrEdit == 'Add' && assetId" 
                      :value="getAssetNicknameByAssetIdFromSelector()"
                      :disabled="true"
                      :error="tmpApiValidationErrors.asset_id ? tmpApiValidationErrors.asset_id[0] : ''">
          </base-input>
          <base-input :label="$t('property.assetNickname')"
                      v-if="addOrEdit != 'Add'" 
                      :value="resource.model.asset ? (resource.model.asset.asset_nickname ? resource.model.asset.asset_nickname : '') : ''"
                      :disabled="true"
                      :error="tmpApiValidationErrors.asset_id ? tmpApiValidationErrors.asset_id[0] : ''">
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
          <base-selector-input :label="$t('property.tenantName')"
                      v-model="resource.model.tenant_id"
                      :options="resource.selector.tenant_id"
                      v-if="addOrEdit == 'Add' && !tenantId"
                      :error="tmpApiValidationErrors.tenant_id ? tmpApiValidationErrors.tenant_id[0] : ''">
          </base-selector-input>
          <!-- <div v-for="tenant in resource.selector.tenant_id" v-bind:key="tenant.id">
              <base-input :label="$t('property.tenantName')"
                        v-if="tenant.id == tenantId && addOrEdit == 'Add'" 
                        :value="tenant.name"
                        :disabled="true"
                        :error="tmpApiValidationErrors.tenant_id ? tmpApiValidationErrors.tenant_id[0] : ''">
              </base-input>
          </div> -->
          <base-input :label="$t('property.tenantName')"
                      v-if="addOrEdit == 'Add' && tenantId" 
                      :value="getTenantNameByTenantIdFromSelector()"
                      :disabled="true"
                      :error="tmpApiValidationErrors.tenant_id ? tmpApiValidationErrors.tenant_id[0] : ''">
          </base-input>
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
                      :disabled="addOrEdit == 'Edit'"
                      :error="tmpApiValidationErrors.monthly_rental_amount ? tmpApiValidationErrors.monthly_rental_amount[0] : ''">
          </base-input>
          <!-- <validation-error :errorsArray="tmpApiValidationErrors.monthly_rental_amount"/> -->
        </div>
      </div>

      <div class="row">
        <!-- <div class="col-md-6">
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
        </div> -->

        <div class="col-md-12">
          <base-input :label="$t('property.tenureDateRange')"
                      v-if="addOrEdit == 'Add'"
                      :error="tmpApiValidationErrors.tenure_start_date ? (tmpApiValidationErrors.tenure_end_date ? tmpApiValidationErrors.tenure_start_date[0] + ' ' + tmpApiValidationErrors.tenure_end_date[0] : tmpApiValidationErrors.tenure_start_date[0]) : (tmpApiValidationErrors.tenure_end_date ? tmpApiValidationErrors.tenure_end_date[0] : '')">
                <el-date-picker
                  type="daterange"
                  v-model="addTenureDateRange"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  :start-placeholder="$t('property.tenureStartDate')"
                  :end-placeholder="$t('property.tenureEndDate')"
                >
                </el-date-picker>
          </base-input>

          <base-input :label="$t('property.tenureDateRange')"
                      v-if="addOrEdit == 'Edit'"
                      :error="tmpApiValidationErrors.tenure_start_date ? (tmpApiValidationErrors.tenure_end_date ? tmpApiValidationErrors.tenure_start_date[0] + ' ' + tmpApiValidationErrors.tenure_end_date[0] : tmpApiValidationErrors.tenure_start_date[0]) : (tmpApiValidationErrors.tenure_end_date ? tmpApiValidationErrors.tenure_end_date[0] : '')">
                <el-date-picker
                  type="daterange"
                  v-model="editTenureDateRange"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  :start-placeholder="$t('property.tenureStartDate')"
                  :end-placeholder="$t('property.tenureEndDate')"
                  :disabled="true"
                >
                </el-date-picker>
          </base-input>
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
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>{{addOrEdit == 'Add' ? $t('component.add') : $t('component.edit')}}</base-button>
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
      addTenureDateRange: []
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
  computed: {
    editTenureDateRange: {
      get() {
        if (!this.resource.model.tenure_start_date) {
          return [];
        }
        if (!this.resource.model.tenure_end_date) {
          return [];
        }
        return [this.resource.model.tenure_start_date, this.resource.model.tenure_end_date];
      },
    }
  },
  methods: {
    async handleSubmit() {
      let formData = new FormData();

      if (this.resource.model.file) {
        formData.append('file', this.resource.model.file);
        console.log('appending file');
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
          tenant_id: this.tenantId ? this.tenantId : this.resource.model.tenant_id,
          asset_id: this.assetId ? this.assetId : this.resource.model.asset_id,
          contract_name: this.resource.model.contract_name,
          contract_description: this.resource.model.contract_description,
          monthly_rental_amount: this.resource.model.monthly_rental_amount,
          tenure_start_date: this.addTenureDateRange.length == 2 ? this.addTenureDateRange[0] : '',
          tenure_end_date: this.addTenureDateRange.length == 2 ? this.addTenureDateRange[1] : ''
        }
      } else {
        return {
          asset_id: this.resource.model.asset.id,
          contract_name: this.resource.model.contract_name,
          contract_description: this.resource.model.contract_description,
          monthly_rental_amount: this.resource.model.monthly_rental_amount,
          tenure_start_date: this.editTenureDateRange.length == 2 ? this.editTenureDateRange[0] : '',
          tenure_end_date: this.editTenureDateRange.length == 2 ? this.editTenureDateRange[1] : ''
        }
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
    },
    getTenantNameByTenantIdFromSelector() {
      if (!this.resource.selector) {
        return "-";
      }
      if (!this.resource.selector.tenant_id) {
        return "-";
      }
      for (var i = 0; i < this.resource.selector.tenant_id.length; i++) {
        if (this.resource.selector.tenant_id[i].id == this.tenantId) {
          return this.resource.selector.tenant_id[i].name;
        }
      }
      return "-";
    }
  }
}
</script>
<style></style>
