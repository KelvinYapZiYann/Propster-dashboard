<template>
      <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <base-detail-list
          :category="$t('property.tenureContractDetails')"
          :model="resource.model"
          :headers="table.detailHeaders"
          :detailDisplayPrefix="table.detailDisplayPrefix"
          thead-classes="text-primary"
        ></base-detail-list>

        <card v-show="showMedia">
          <div class="card-header mb-3">
            <h5 class="card-category">{{$t('component.media')}}</h5>
          </div>
          <drop-zone
                    @click.native="downloadFile" 
                    ref="myVueDropzone"
                    id="dropzone"
                    :options="dropzoneOptions"
          >
          <!-- :disable="disableDropZone" -->
          </drop-zone>
        </card>
        <billing-record-index-component
          :resource="billingRecordResource"
          :query="{
            tenantId: resource.model.tenant ? resource.model.tenant.id : null,
            assetId: resource.model.asset ? resource.model.asset.id : null,
            tenureContractId: resource.model.id,
          }"
        ></billing-record-index-component>

        <base-button slot="footer" type="info" @click="handleBack()" fill>{{$t('component.back')}}</base-button>
        <!-- <base-button slot="footer" type="info" @click="handleEdit()" fill>Edit Tenure Contract</base-button> -->
      </div>
</template>
<script>
import { BaseDetailList, Card, DropZone } from "@/components";
import BillingRecordIndexComponent from "@/components/Resources/BillingRecords/BillingRecordIndexComponent";
// import axios from 'axios';
import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    BaseDetailList,
    Card,
    DropZone,
    BillingRecordIndexComponent
  },
  data() {
    return {
      tenureContractId: this.$route.params.tenureContractId,
      resource: {
        model: {},
        data: {}
      },
      billingRecordResource: {
        models: [{}],
        data: {},
      },
      table: {
        title: "Tenure Contract",
        detailHeaders: {
          asset_nickname: this.$t('property.assetNickname'),
          first_name: this.$t('property.firstName'),
          last_name: this.$t('property.lastName'),
          contract_name: this.$t('property.contractName'),
          monthly_rental_amount: this.$t('property.monthlyRentalAmount'),
          tenure_start_date: this.$t('property.tenureStartDate'),
          tenure_end_date: this.$t('property.tenureEndDate'),
        },
        detailDisplayPrefix: {
          monthly_rental_amount: "RM",
        },
      },
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: false,
        maxFiles: 1,
        maxFilesize: 1,
        clickable: false
      },
      showMedia: false,
    };
  },
  props: {
    previousRoute: {
      type: String,
      required: false,
      default: "",
      description: "Previous Route"
    }
  },
  mounted() {
    this.getResource();
    // this.disableDropZone();
  },
  methods: {
    async getResource() {
      let loader = this.$loading.show({
        canCancel: false,
        color: '#1d8cf8',
        loader: 'spinner',
      });
      try {
        await this.$store.dispatch('tenureContract/getById',  this.tenureContractId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenureContract/model"])
          this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenureContract/selector"])
          this.loadAttachment();
        })

        await this.$store.dispatch('tenureContract/getBillingRecords', this.tenureContractId).then(() => {
          this.billingRecordResource.models = this.$store.getters["tenureContract/billingRecordModels"]
          this.billingRecordResource.data = Object.assign({}, this.$store.getters["tenureContract/billingRecordData"])
        })
      } catch (e) {
        this.$notify({
          message: errorHandlingService.displayAlertFromServer(e),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
      } finally {
        loader.hide();
      }
    },
    loadAttachment() {
      if (this.resource.model.media.length > 0) {
        this.showMedia = true;
        let fileData = this.resource.model.media[0].temporary_url;
        // console.log(fileData);
        let file = { name: this.resource.model.media[0].file_name, type: this.resource.model.media[0].mime_type };
        this.$refs.myVueDropzone.manuallyAddFile(file, fileData);
        this.$refs.myVueDropzone.removeEventListeners()
        // this.$refs.myVueDropzone.setupEventListeners()
      }
    },
    downloadFile() {
      console.log('trying to download file');
      // console.log(this.$refs.myVueDropzone);
      // console.log(this.$refs.myVueDropzone.getAcceptedFiles());
      // console.log(this.$refs.myVueDropzone.getActiveFiles());
      // console.log(this.$refs.myVueDropzone.getAddedFiles());
      // console.log(this.$refs.myVueDropzone.getExistingFallback());
      // console.log(this.$refs.myVueDropzone.getFallbackForm());
      // console.log(this.$refs.myVueDropzone.getFilesWithStatus());
      // console.log(this.$refs.myVueDropzone.getQueuedFiles());
      // console.log(this.$refs.myVueDropzone.getRejectedFiles());
      // console.log(this.$refs.myVueDropzone.getUploadingFiles());
      if (this.resource.model.media.length <= 0) {
        return;
      }
      // axios({
      //   url: this.resource.model.media[0].temporary_url,
      //   method: 'GET',
      //   responseType: 'blob'
      // }).then((response) => {
      //   console.log(response);
      //   // let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      //   // let fileLink = document.createElement('a');

      //   // fileLink.href = fileURL;
      //   // fileLink.setAttribute('download', fileName);
      //   // document.body.appendChild(fileLink);

      //   // fileLink.click();
      // }).catch((error) => {
      //   console.log(error);
      // });
    },
    // disableDropZone() {
    //   return true;
    // },
    async handleBack() {
      if (this.previousRoute) {
        this.$router.push({path: this.previousRoute});
      } else {
        this.$router.go(-1);
      }
    },
    // async handleEdit() {
    //   this.$router.push({
    //     name: "Edit Tenure Contract",
    //     params: {
    //       tenureContractId: this.tenureContractId,
    //       previousRoute: this.$router.currentRoute.fullPath
    //     }
    //   });
    // }
  }
};
</script>
<style>
.dz-size span {
  display: none;
}
</style>
