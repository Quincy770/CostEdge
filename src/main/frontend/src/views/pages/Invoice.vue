<!-- =========================================================================================
    File Name: Invoice.vue
    Description: Invoice Page
    
========================================================================================== -->

<template>
  <!-- <vx-card> -->
  <div class="invoice-box bg-white" id="printableInvoice">
    <table cellpadding="0" cellspacing="0">
      <tr class="top">
        <td colspan="4" class="m-0 p-0">
          <table>
            <tr>
              <td class="title">
                <!-- <img src="https://www.designevo.com/res/templates/thumb_small/bright-blue-kaleidoscope.png" style="width:100%; max-width:100px;"> -->
                <img class="flex h-8" src="@/assets/images/logo/logo.png" alt="algolia-logo" />
              </td>

              <td>
                {{$t('Invoice')}} #:{{rentalPayment.customerPaymentId}}
                <br />
                {{$t('Created')}}: {{new Date() | date2()}}
                <br />info@jabulani.com
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <p class="text-base">{{$t('billedTo')}}</p>
      <vs-divider class="mt-0" color="success"></vs-divider>
      <tr class="information">
        <td colspan="4" class="p-0">
          <table>
            <tr>
              <td>
                {{$t('paymentType')}}
                <span>{{rentalPayment.paymentType}}</span>
                <br />
                <span v-if="rentalPayment.bankDepositNumber">
                  {{$t('depositNumber')}}
                  <span v-if="rentalPayment.bankDepositNumber">{{rentalPayment.bankDepositNumber}}</span>
                </span>
                <br />
                <span v-if="rentalPayment.bankName">
                  {{$t('bankName')}}
                  <span v-if="rentalPayment.bankName">{{rentalPayment.bankName}}</span>
                </span>
              </td>
              <td>
                
                <br />
                <br />
                <!-- {{companyInfo.street}} -->
              </td>
            </tr>
          </table>
        </td>
      </tr>

     
    <div>
     
        <vs-table class="stripe" hoverFlat noDataText=''>
          <template slot="thead">
            <vs-th class="p-0">{{$t('tradeName')}}</vs-th>
            <vs-th class="p-0">{{$t('From')}}</vs-th>
            <vs-th class="p-0">{{$t('To')}}</vs-th>
            <!-- <vs-th class="p-0">{{$t('Payment')}}</vs-th> -->
            <!-- <vs-th class="p-0" sort-key="rentalCost">{{$t('depositNumber')}}</vs-th> -->
            <vs-th class="p-0">{{$t('price')}}</vs-th>
            <!-- <vs-th class="p-0">{{$t('slipNumber')}}</vs-th> -->
            <vs-th class="p-0">{{$t('Date')}}{{$t('EC')}}</vs-th>
            <vs-th class="p-0">{{$t('Done')}} {{$t('By')}}</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr>
              <vs-td :data="rentalPayment.tradeName">{{rentalPayment.tradeName}}</vs-td>
              <vs-td class="p-0 text-left" :data="rentalPayment.fromDate">{{rentalPayment.fromDate }}</vs-td>
              <vs-td class="p-0 text-left" :data="rentalPayment.toDate">{{rentalPayment.toDate }}</vs-td>
         
              <vs-td
                class="p-0 text-left"
                :data="rentalPayment.rentalCost"
              >{{rentalPayment.rentalCost.toLocaleString()}}</vs-td>
              <!-- <vs-td class="p-0" :data="rentalPayment.recieptNumber">{{rentalPayment.recieptNumber}}</vs-td> -->
              <vs-td class="p-0 text-left">
                {{rentalPayment.createdAt}}
                <span>{{rentalPayment.createdTime | toEtTime()}}</span>
               
              </vs-td>
              <vs-td class="p-0 font-black" :data="rentalPayment.createdBy">
                <vs-chip>{{rentalPayment.createdBy}}</vs-chip>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <vs-button
          v-if="printButtonVisible"
          type="filled"
          @click="printButtonVisible = false,timeOutPrint()"
        >Print Invoice</vs-button>
      </div>
   

   
  </div>
  <!-- </vx-card>   -->
</template>

<script>
export default {
  data() {
    return {
      companyDetails: {
        name: "Microsion Technologies Pvt. Ltd.",
        addressLine1: "9 N. Sherwood Court",
        addressLine2: "Elyria, OH",
        zipcode: "94203",
        mailId: "hello@pixinvent.net",
        mobile: "+91 999 999 9999"
      },
      recipientDetails: {
        fullName: "Peter Stark",
        addressLine1: "8577 West West Drive ",
        addressLine2: "Holbrook, NY",
        zipcode: "90001",
        mailId: "peter@mail.com",
        mobile: "+91 988 888 8888"
      },
      invoiceDetails: {
        invoiceNo: "001/2019",
        invoiceDate: "Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)"
      },
      invoiceData: {
        tasks: [
          {
            id: 1,
            task: "Website Redesign",
            hours: 60,
            rate: 15,
            amount: 90000
          },
          {
            id: 2,
            task: "Newsletter template design",
            hours: 20,
            rate: 12,
            amount: 24000
          }
        ],
        subtotal: 114000,
        discountPercentage: 5,
        discountedAmount: 5700,
        total: 108300
      },
      printButtonVisible:false,
      rentalPayment:''
    };
  },
  computed: {},
  methods: {
    print() {
      window.print();
    },
    timeOutPrint() {
      this.printButtonVisible = false;
      setTimeout(function() {
        // this.printPageArea('printableInvoice');
        // console.log("THis. is working")

        // Get HTML to print from element
        const prtHtml = document.getElementById("printableInvoice").innerHTML;

        // Get all stylesheets HTML
        let stylesHtml = "";
        for (const node of [
          ...document.querySelectorAll('link[rel="stylesheet"], style')
        ]) {
          stylesHtml += node.outerHTML;
        }

        // Open the print window
        const WinPrint = window.open(
          "",
          "",
          "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
        );

        WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>
    ${stylesHtml}
  </head>
  <body>
    ${prtHtml}
  </body>
</html>`);

        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
      }, 1500);
    }
  },
  components: {},
  created() {
        this.rentalPayment = this.$store.state.invoice.rentalPayment;

  },
};
</script>