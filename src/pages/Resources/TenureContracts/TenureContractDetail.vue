<template>
      <div class="content">
        <base-detail-list
          :category="$t('property.tenureContractDetails')"
          :model="resource.model"
          :headers="table.detailHeaders"
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

        <base-button slot="footer" type="info" @click="handleBack()" fill>{{$t('component.back')}}</base-button>
        <!-- <base-button slot="footer" type="info" @click="handleEdit()" fill>Edit Tenure Contract</base-button> -->
      </div>
</template>
<script>
import { BaseDetailList, Card, DropZone } from "@/components";
import axios from 'axios';

export default {
  components: {
    BaseDetailList,
    Card,
    DropZone
  },
  data() {
    return {
      allowAddUser: false,
      tenureContractId: this.$route.params.tenureContractId,
      resource: {
        model: {},
        data: {}
      },
      table: {
        title: "Tenure Contract",
        detailHeaders: {
          asset_nickname: this.$t('property.assetNickname'),
          first_name: this.$t('property.firstName'),
          contract_name: this.$t('property.contractName'),
          monthly_rental_amount: this.$t('property.monthlyRentalAmount'),
          tenure_start_date: this.$t('property.tenureStartDate'),
          tenure_end_date: this.$t('property.tenureEndDate'),
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
      try {
        await this.$store.dispatch('tenureContract/getById',  this.tenureContractId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["tenureContract/model"])
          this.resource.data = Object.assign({}, this.$store.getters["tenureContract/data"])
          this.resource.selector = Object.assign({}, this.$store.getters["tenureContract/selector"])
          this.loadAttachment();
        })
      } catch (e) {
        this.$notify({
          message:'Server error',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        });
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
      axios({
        url: this.resource.model.media[0].temporary_url,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        console.log(response);
        // let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        // let fileLink = document.createElement('a');

        // fileLink.href = fileURL;
        // fileLink.setAttribute('download', fileName);
        // document.body.appendChild(fileLink);

        // fileLink.click();
      }).catch((error) => {
        console.log(error);
      });
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
    async handleEdit() {
      this.$router.push({
        name: "Edit Tenure Contract",
        params: {
          tenureContractId: this.tenureContractId,
          previousRoute: this.$router.currentRoute.fullPath
        }
      });
    }
  }
};
</script>
<style>
.dz-size span {
  display: none;
}
</style>
