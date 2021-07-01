<template>
  <div class="content">
    <payment-page
      :model="resource.model"
      :asset="resource.model.asset"
      :recipient="resource.model.recipient"
      :sender="resource.model.sender"
    ></payment-page>
    <base-detail-list
      :category="'Payment Details'"
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
        </drop-zone>
    </card>
  </div>
</template>
<script>
import {BaseDetailList} from "@/components";
import DropZone from "@/components/DropZone";
import PaymentPage from "@/components/Resources/PaymentRecords/PaymentPage";

let detailHeaders = {
  payment_description: "Payment Description",
  amount: "Receiver",
  payment_method: "Payment Method",
  payment_type: "Payment Type",
  is_reference_only: "Is reference only?"
};

export default {
  components: {
    BaseDetailList,
    DropZone,
    PaymentPage
  },
  data() {
    return {
      allowAddUser: false,
      showMedia: false,
      resource: {
        model: {},
        data: {}
      },
      table: {
        title: "Asset Details",
        detailHeaders: {...detailHeaders},
      },
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        maxFiles: 1
      },
    };
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
        let file = { size: 123, name: "Icon", type: "image/png" };
        this.$refs.myVueDropzone.manuallyAddFile(file, this.resource.model.media[0].temporary_url);
        this.$refs.myVueDropzone.removeEventListeners()
        this.$refs.myVueDropzone.setupEventListeners()
      }
    }
  }
};
</script>
<style>
</style>
