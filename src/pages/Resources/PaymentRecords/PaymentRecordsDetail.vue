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
      :detailDisplayValue="table.detailDisplayValue"
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
        detailDisplayValue: {
          payment_type: {
            APPLIANCES: "Appliances",
            BILL_ELECTRICITY: "Electricity bill",
            BILL_GAS: "Gas bill",
            BILL_INSURANCE: "Insurance Bill",
            BILL_INTERNET: " Internet bill",
            BILL_MANAGEMENT: "Management fee",
            BILL_REPAIR: "Repair Bill",
            BILL_SINKING_FUND: "Sinking fund",
            BILL_TV_PROGRAMME: "TV Programme bill",
            BILL_WATER: "Water bill",
            DEPOSIT: "Deposit",
            FURNITURE: "Furniture",
            LATE_FEE_PENALTY: "Late Fee Penalty",
            LOAN_INSTALLMENT: "Loan Installment",
            MAINTENANCE_COST: "Maintenance cost",
            OTHERS: "Others",
            PARKING_RENTAL: "Parking Rental",
            RENOVATION: "Renovation",
            RENTAL: "Rental",
            TAX_CUKAI_PINTU: "Cukai Pintu",
            TAX_CUKAI_TANAH: "Cukai Tanah",
          },
          payment_method: {
            BANK_TRANSFER: "Bank Transfer",
            CASH: "Cash",
            CREDIT_CARD: "Credit Card",
            EWALLET_C2B: "E-Wallet(C2B)",
            EWALLET_P2P: "E-Wallet(P2P)",
          },
          status: {
            RECEIVED: "Received"
          },
          is_seen: {
            true: "Seen",
            false: "Not Seen",
          }
        },
        detailDisplayPrefix: {
          amount: "RM",
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
