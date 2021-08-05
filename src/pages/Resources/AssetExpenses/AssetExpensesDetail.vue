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
      :category="$t('property.assetExpenseDetails')"
      :model="resource.model"
      :headers="table.detailHeaders"
      thead-classes="text-primary"
    ></base-detail-list>
    <card v-show="showMedia">
      <div class="card-header mb-3">
        <h5 class="card-category">{{$t('component.media')}}</h5>
      </div>
        <drop-zone 
                   ref="myVueDropzone"
                   @click.native="downloadFile" 
                   id="dropzone"
                   :options="dropzoneOptions"
        >
        </drop-zone>
    </card>

    <base-button slot="footer" type="info"  @click="handleBack()" fill>{{$t('component.back')}}</base-button>
  </div>
</template>
<script>
import {BaseDetailList, Card, DropZone, TransactionSection} from "@/components";

export default {
  components: {
    BaseDetailList,
    Card,
    DropZone,
    TransactionSection
  },
  data() {
    return {
      showMedia: false,
      resource: {
        model: {},
        data: {}
      },
      table: {
        detailHeaders: {
          asset_nickname: this.$t('property.assetNickname'),
          payment_description: this.$t('property.description'),
          amount: this.$t('property.amount'),
          payment_method:this.$t('property.paymentMethod'),
          payment_type: this.$t('property.paymentType'),
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
        await this.$store.dispatch('assetExpenses/getById', this.$route.params.assetExpenseId)
        this.resource.model = await this.$store.getters["assetExpenses/model"]
        this.resource.data = await this.$store.getters["assetExpenses/data"]
        this.loadAttachment();
      } catch (e) {
        this.$notify({
          message: 'Server error',
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
