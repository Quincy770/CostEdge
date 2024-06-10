<template>
  <!-- <vx-card> -->
  <div class="bg-white border-top" style="border-style: ridge;">
    <vs-button @click.prevent="$router.push({ path: `/pages/order/myOrders` })" color="primary" size="small"
      icon-pack="feather" icon="icon-arrow-left" style="float: left; width: 50px; margin-left: 2px;">

    </vs-button>

    <div id="printableInvoice">
      <div id="printSection" ref="printSection">
        <div class="vx-row px-2 pt-2 row border border-dark mt-2" style="">
          <div class="vx-col w-1/4 w-25 col-sm">
            <img class="flex mx-auto h-1/2 mt-4" src="@/assets/images/logo/logo.png" style="object-fit: fill;
                height: 50px;
                flex: 1 1 auto;
float: left" />
          </div>
          <div class="vx-col w-1/2 col-lg text-center border border-dark mt-8" style="text-align: center;">
            <div class="" style=" border-bottom: 2px solid black; line-height: 1.2 !important;">
              <h4 class="font-bold">
                Cost Edge
              </h4>

            </div>
            <div class="vx-col">

            </div>
            

          </div>
          <div class="vx-col w-1/4 w-25" style="">
            <div class="float-right mt-20">
              {{ $t('Invoice') }} #: <strong>{{ orderResponse.orderNumber }}</strong>
              <br />
              {{ $t('Created') }}: <strong>{{ orderResponse.createdDateTime | date2() }}</strong>
              <br />
            </div>
          </div>
        </div>
      </div>
      <vs-table hoverFlat noDataText class="mx-3">
        <vs-tr>
          <vs-td>
            <p class="text-base">{{ $t('billedTo') }}</p>
            <vs-divider class="my-0" color="success"></vs-divider>
          </vs-td>
        </vs-tr>

        <vs-tr class="information">
          <vs-td colspan="4" class="p-0">
            <table noDataText style="margin-top:-25px;">
              <tr>
                <td>
                  <strong>{{ $t('companyName') }}</strong>: {{ orderResponse.companyName | capitalize() }}
                  <br />
                  <strong>{{ $t('fullName') }}</strong>: {{ orderResponse.fullName }}
                  <br />

                </td>
                <td>
                  <br />

                  <strong>{{ $t('address') }}</strong>:
                  {{ companyInfo.street }},{{ companyInfo.woredaCity }},{{ companyInfo.region
                  }}

                  <br />
                  <strong>{{ $t('email') }}</strong>: {{ userInfo.email }}
                  <vs-button class="print float-right" icon-pack="feather" icon="icon-printer" type="border"
                    color="success" v-print="printObj">{{ $t('printInvoice') }}</vs-button>
                  <!-- {{companyInfo.street}} -->
                </td>
              </tr>
            </table>
          </vs-td>
        </vs-tr>
      </vs-table>
      <div class="p-0 px-3">
        <vs-table hoverFlat :data="orderResponse.orderItems">
          <template slot="thead">
            <vs-th>#</vs-th>
            <vs-th>{{ $t('genericName') }}</vs-th>
            <vs-th>{{ $t('orderQuantity') }}</vs-th>
            <vs-th v-if="!checkIfPreorder()">{{ $t('preOrderQuantity') }}</vs-th>
            <vs-th>{{ $t('unitPrice') }}</vs-th>
            <vs-th>{{ $t('subTotal') }}</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr v-for="(tr, index) in data" :key="index">
              <vs-td class="py-0" :data="index">{{ index + 1 }}</vs-td>
              <vs-td class="text-left" :data="secondInventory[index].inventoryGenericName">{{
                  secondInventory[index].inventoryGenericName
              }} {{ secondInventory[index].dosageForm != null ?
    secondInventory[index].dosageForm : ""
}} {{ +secondInventory[index].strength != null ?
    secondInventory[index].strength : ""
}}</vs-td>
              <vs-td class="text-left" :data="data[index].hours">x{{ data[index].orderQuantity }}</vs-td>
              <vs-td class="text-left" :data="data[index].hours" v-if="!checkIfPreorder()">x{{
                  data[index].preOrderQuantity
              }}</vs-td>
              <vs-td class="text-left" :data="data[index].unitPrice">{{ data[index].unitPrice.toLocaleString('en-US') }}
              </vs-td>
              <vs-td :data="data[index].unitPrice * data[index].orderQuantity" class="text-left">{{
                  (data[index].unitPrice
                    * data[index].orderQuantity + data[index].unitPrice *
                    data[index].preOrderQuantity).toLocaleString('en-US')
              }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>

        <!-- INVOICE SUMMARY TABLE -->
        <vs-table hoverFlat class="w-1/2 ml-auto mt-4 text-left" :data="orderResponse">
          <vs-tr>
            <vs-th>{{ $t('TOTAL') }}</vs-th>
            <vs-td class="text-left">{{ (orderResponse.totalPrice / 1.05).toLocaleString('en-US') }} {{ $t('USD') }}
            </vs-td>
          </vs-tr>
          <vs-tr>
            <vs-th>{{ $t('TAX') }}(5%)</vs-th>
            <vs-td class="text-left">{{ ((orderResponse.totalPrice / 1.05) * 0.05).toLocaleString('en-US') }}
              {{ $t('USD') }}
            </vs-td>
          </vs-tr>
          <vs-tr>
            <th>{{ $t('grandTotal') }}</th>
            <td class="text-black font-bold text-left">{{ (orderResponse.totalPrice).toLocaleString('en-US') }}
              {{ $t('USD') }}</td>
          </vs-tr>
        </vs-table>
        <!-- <vs-button type="filled" @click="printPageArea(printableInvoice)">Print</vs-button> -->
        <!-- <vs-button type="filled" @click="navbarTypeLocal='navbar-hidden'" v-model="navbarTypeLocal">{{navbarTypeLocal}}</vs-button> -->
      </div>

      <!-- INVOICE FOOTER -->
      <div class="invoice__footer text-right p-base">
        <!-- <p
        class="mb-4"
      >Transfer the amounts to the business amount below. Please include invoice number on your check.</p>-->
        <!-- <p> -->
        <!-- <span class="mr-10 mt-4">
          {{$t('orderNumber')}}:
          <span class="text-black font-bold">{{orderResponse.orderNumber}}</span>
        </span> -->
        <!-- <span class="ml-10" v-if="orderResponse.deliveryAddress != 'undefined,undefined,undefined'">
          {{$t('deliveryLocation')}}:
          <span
            class="text-black font-bold"
          >{{orderResponse.deliveryAddress}}</span>
        </span> -->
        <!-- <span class="ml-24" v-if="orderResponse.deliveryTime">
          {{$t('deliveryTime')}}:
          <span class="text-black font-bold">{{orderResponse.deliveryTime}}</span>
        </span> -->
        <!-- </p> -->
      </div>
    </div>
    <!-- </vx-card>   -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      printObj: {
        id: "printableInvoice",
        popTitle: "Ethiopharmacy Order Invoice",
        extraCss: "https://www.google.com,https://www.google.com",
        extraHead:
          '<meta http-equiv="Content-Language"content=sdfdsfdsfds"zh-cn"/>'
      },
      invoice_id: "123456890",
      amount_paid: 10.99,
      amount_due: 0,
      items: [
        { description: "Website design", quantity: 1, price: 300 },
        { description: "Website design", quantity: 1, price: 75 },
        { description: "Website design", quantity: 1, price: 10 }
      ],
      // id: this.$route.params.id,
      // id: this.$route.params.id,
      orderResponse: {},
      userInfo: {},
      companyInfo: {},
      secondInventory: [],
      navbarType: "floating",
      printButtonVisible: true,
      invoiceId: "",
      orderResponses: {},
      isPreOrder: false,
    };
  },
  created() {
    this.orderResponse = this.$store.getters["invoice/getOrder"];
    this.getOrderById();
    // alert(JSON.stringify(this.orderResponse))
    // if(this.orderResponse=='{}')
    //    this.orderResponse = this.$store.getters["invoice/getOrders"];
    setTimeout(() => {
      let invoiceNumber = "IN";
      for (let j = 0; j < 5 - this.orderResponse.orderId.toString().length; j++)
        invoiceNumber = invoiceNumber + "0";
      this.invoiceId = invoiceNumber + this.orderResponse.orderId;
    }, 200);

    // this.getOrderById();
  },
  mounted() {
    // this.timeOutPrint();
  },
  computed: {
    navbarTypeLocal: {
      get() {
        return "navbar-" + this.navbarType;
      },
      set(val) {
        this.$emit("updateNavbar", val.replace("navbar-", ""));
      }
    }
    //  orderResponse () {
    //     return this.$store.state.invoice.order
    //   }
  },
  methods: {
    checkIfPreorder() {
      for (let i = 0; i < this.orderResponse.orderItems.length; i++) {
        if (this.orderResponse.orderItems[i].preOrderQuantity > 0) {
          return false;
        }
      }
      return true;
    },
    // checkIfPreorder(order){
    //   for(let i=0;i<order.length;i++){
    //     if(order[i].preOrderQuantity>0){
    //       this.isPreOrder = true;
    //     }
    //   }
    //   return false;
    // },
    //   fetchOrders(){
    //     this.$http
    //     .get("/order"+ `/${this.$route.params.id}`).then(res => {
    //        this.ordersById = res.data;
    //        this.orderResponse = res.data;

    //        this.$store.dispatch("invoice/insertOrders", res.data);
    //     });
    //   },

    print() {
      window.print();
    },

    getOrderById() {
      this.$http.get(`/order/${this.$route.params.id}`).then(response => {
        this.orderResponse = response.data;

        this.getUserInfo();
        this.getCompanyInfo();
        for (
          let index = 0;
          index < this.orderResponse.orderItems.length;
          index++
        ) {

          if (this.preOrderInfo != '[]' && this.preOrderInfo != [] && this.preOrderInfo != null && this.orderResponse.preOrderInfo[index].orderQuantity != 0 && this.orderResponse.preOrderInfo[index].orderQuantity != null) {
            this.orderResponse.orderItems[index].orderQuantity = this.orderResponse.preOrderInfo[index].orderQuantity + this.orderResponse.orderItems[index].orderQuantity;
          }
          this.getInventoryById(
            this.orderResponse.orderItems[index].inventoryId,
            index
          );
        }
      });
    },

    getInventoryById(id, index) {
      this.$http.get(`/inventory/${id}`).then(response => {
        this.secondInventory.push(response.data);

        console.log(this.order);
      });
    },
    getUserInfo() {
      this.$http
        .get(`/accounts/${this.orderResponse.userId}`)
        .then(response => {
          this.userInfo = response.data;
          console.log(response.data);
        });
    },
    getCompanyInfo() {
      this.$http
        .get(`/company/${this.orderResponse.companyId}`)
        .then(response => {
          this.companyInfo = response.data;
          console.log(response.data);
        });
    },
    printPageArea(areaID) {
      this.printButtonVisible = false;
      this.nextTick(function () {
        // do something cool
        // this.$htmlToPaper('printableInvoice');

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

        // var printContent = document.getElementById("printableInvoice");
        // var WinPrint = window.open('', '', 'width=900,height=650');
        // WinPrint.document.write(printContent.innerHTML);
        // WinPrint.document.write('<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">');
        // WinPrint.document.close();
        // WinPrint.focus();
        // WinPrint.print();
        // WinPrint.close();

        // var prtContent = document.getElementById("printableInvoice");
        // var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        // WinPrint.document.write(prtContent.innerHTML);
        // WinPrint.document.close();
        // WinPrint.focus();
        // WinPrint.print();
        // WinPrint.close();

        // var openWindow = window.open("", "title", "attributes");
        // openWindow.document.write('printableInvoice'.previousSibling.innerHTML);
        // openWindow.document.close();
        // openWindow.focus();
        // openWindow.print();
        // openWindow.close();
      });
    },
    printPageArea() {
      alert("Print");
      var restorePage = document.body.innerHTML;
      var printContent = document.getElementById("printableInvoice").innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = restorePage;
    },
    timeOutPrint() {
      setTimeout(function () {
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
  filters: {
    currency(value) {
      return value.toFixed(2);
    }
  }
};
</script>

<style scoped>
.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(n + 2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.item input {
  padding-left: 5px;
}

.invoice-box table tr.item td:first-child input {
  margin-left: -5px;
  width: 100%;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

.invoice-box input[type="number"] {
  width: 60px;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}

@media print {
  .print {
    visibility: hidden;
  }
}
</style>
