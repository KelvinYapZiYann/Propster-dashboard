<template>
      <div class="content">
        <base-detail-list
          :category="`Tenure Contract Details`"
          :title="''"
          :model="resource.model"
          :headers="table.detailHeaders"
          thead-classes="text-primary"
        ></base-detail-list>

        <card v-show="showMedia">
          <div class="card-header mb-3">
            <h5 class="card-category">Media</h5>
          </div>
          <drop-zone ref="myVueDropzone"
                     id="dropzone"
                     :options="dropzoneOptions"
          >
          <!-- :disable="disableDropZone" -->
          </drop-zone>
        </card>
      </div>
</template>
<script>
import { BaseDetailList, Card, DropZone } from "@/components";

let detailHeaders = {
  asset_nickname: "Asset Nickname",
  tenant_name: "Tenant Name",
  contract_name: "Contract Name",
  monthly_rental_amount: "Monthly Rental Amount (RM)",
  tenure_start_date: "Tenure Start Date",
  tenure_end_date: "Tenure End Date",
};

export default {
  components: {
    BaseDetailList,
    Card,
    DropZone
  },
  data() {
    return {
      allowAddUser: false,
      modelId: this.$route.params.tenureContractId,
      resource: {
        model: {},
        data: {}
      },
      table: {
        title: "Tenure Contract",
        detailHeaders: {...detailHeaders},
      },
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        maxFiles: 1
      },
      showMedia: false,
    };
  },
  mounted() {
    this.getResource();
    this.disableDropZone();
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('tenureContract/getById',  this.modelId).then(() => {
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
        let file = { size: 123, name: "Icon", type: "image/png" };
        this.$refs.myVueDropzone.manuallyAddFile(file, this.resource.model.media[0].temporary_url);
        this.$refs.myVueDropzone.removeEventListeners()
        this.$refs.myVueDropzone.setupEventListeners()
      }
    },
    disableDropZone() {
      return true;
    }
  }
};
</script>
<style>
</style>
