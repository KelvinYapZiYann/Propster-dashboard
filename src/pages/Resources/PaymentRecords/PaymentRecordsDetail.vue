<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <transaction-section
      :resource="resource"
    ></transaction-section>
      <!-- :model="resource.model"
      :asset="resource.model.asset"
      :recipient="resource.model.recipient"
      :sender="resource.model.sender" -->
    <base-detail-list
      :category="$t('property.paymentRecordDetails')"
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
  </div>
</template>
<script>
import { BaseDetailList, TransactionSection, DropZone, Card } from "@/components";

export default {
  components: {
    TransactionSection,
    BaseDetailList,
    DropZone,
    Card
  },
  data() {
    return {
      resource: {
        model: {},
        data: {}
      },
      table: {
        detailHeaders: {
          asset_nickname: this.$t('property.assetNickname'),
          payment_description: this.$t('property.description'),
          amount: this.$t('property.amount'),
          payment_method: this.$t('property.paymentMethod'),
          payment_type: this.$t('property.paymentType'),
          status: this.$t('property.status'),
          is_seen: this.$t('property.isSeen'),
          // is_reference_only: this.$t('property.isReferenceOnly'),
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
  },
  methods: {
    async getResource() {
      try {
        await this.$store.dispatch('paymentRecords/getById', this.$route.params.paymentRecordId)
        this.resource.model = await this.$store.getters["paymentRecords/model"]
        this.resource.data = await this.$store.getters["paymentRecords/data"]
        this.loadAttachment();
      } catch (e) {
        console.log(e);
        this.$notify({
          message: 'Server error asd',
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
    downloadFile() {

    },
    async handleBack() {
      if (this.previousRoute) {
        this.$router.push({path: this.previousRoute});
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style>
</style>
