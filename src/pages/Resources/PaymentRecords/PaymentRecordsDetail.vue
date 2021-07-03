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

    <base-button slot="footer" type="primary"  @click="handleBack()" fill>Back</base-button>
  </div>
</template>
<script>
import { BaseDetailList, PaymentPage } from "@/components";

let detailHeaders = {
  payment_description: "Payment Description",
  amount: "Receiver",
  payment_method: "Payment Method",
  payment_type: "Payment Type",
  is_reference_only: "Is reference only?"
};
export default {
  components: {
    PaymentPage,
    BaseDetailList
  },
  data() {
    return {
      resource: {
        model: {},
        data: {}
      },
      table: {
        title: "Assets",
        detailHeaders: {...detailHeaders},
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
        await this.$store.dispatch('paymentRecords/getById', this.$route.params.paymentRecordsId)
        this.resource.model = await this.$store.getters["paymentRecords/model"]
        this.resource.data = await this.$store.getters["paymentRecords/data"]
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
