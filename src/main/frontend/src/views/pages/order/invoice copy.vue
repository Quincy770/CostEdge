<template>
  <!-- <vx-card> -->
  <div class="bg-white p-10 m-5 border-top border-solid" id="printableInvoice">
    <vs-table hoverFlat noDataText class="mx-3">
      <vs-tr class="top">
        <vs-td>
          <table>
            <tr>
              <td class="text-left">
                <!-- <img src="https://www.designevo.com/res/templates/thumb_small/bright-blue-kaleidoscope.png" style="width:100%; max-width:100px;"> -->
                <!-- <img class="flex h-8" :src="(`${$domain}/medco_logo.png`)" /> -->
                 <img
            class="flex mx-auto h-1/4"
            src="@/assets/images/logo/logo.png"
            style="object-fit: fill;
                height: 60px;
                flex: 1 1 auto;
float: left"
          />
              </td>

              <td class="float-right">
                {{$t('Invoice')}} #: {{invoiceId}}
                <br />
                {{$t('Created')}}: {{orderResponse.orderedDate | date2()}}
                <br />
                <a href="http://ethiopharmacy.com">info@ethiopharmacy.com</a>
              </td>
            </tr>
          </table>
        </vs-td>
      </vs-tr>
      <vs-tr>
        <vs-td>
          <p class="text-base">{{$t('billedTo')}}</p>
          <vs-divider class="my-0" color="success"></vs-divider>
        </vs-td>
      </vs-tr>
      <vs-tr class="information">
        <vs-td colspan="4" class="p-0">
          <table noDataText>
            <tr>
              <td>
                {{orderResponse.companyName | capitalize() }}.
                <br />
                {{orderResponse.fullName}}
                <br />
                {{userInfo.email}}
              </td>
              <td class="text-right">
                {{companyInfo.street}},{{companyInfo.woredaCity}},{{companyInfo.region}}
                <br />
                <br />
                <vs-button
                  class="print float-right"
                  icon-pack="feather"
                  icon="icon-printer"
                  type="border"
                  color="success"
                  v-print="printObj"
                >{{$t('printInvoice')}}</vs-button>
                <!-- {{companyInfo.street}} -->
              </td>
            </tr>
          </table>
        </vs-td>
      </vs-tr>

      <!-- <tr class="heading">
      <td colspan="3">Payment Method</td>
      <td>Check #</td>
    </tr>

    <tr class="details">
      <td colspan="3">Check</td>
      <td>1000</td>
    </tr>

    <tr class="heading">
      <td>Item</td>
      <td>Unit Cost</td>
      <td>Quantity</td>
      <td>Price</td>
    </tr>

    <tr class="item" v-for="(item, index) in items" :key="index">
      <td><input v-model="item.description" /></td>
      <td>$<input type="number" v-model="item.price" /></td>
      <td><input type="number" v-model="item.quantity" /></td>
      <td>${{ item.price * item.quantity | currency }}</td>
    </tr>

    <tr>
      <td colspan="4">
        <button class="btn-add-row" @click="addRow">Add row</button>
        <vs-button color="primary" type="filled" @click="print">Print</vs-button>
      </td>
    </tr>

    <tr class="total">
      <td colspan="3"></td>
      <td>Total: ${{ total | currency }}</td>
      </tr>-->
    </vs-table>

    <!-- INVOICE CONTENT -->
    <div class="p-0 px-3">
      <!-- INVOICE TASKS TABLE -->
      <vs-table hoverFlat :data="orderResponse.orderItems">
        <!-- HEADER -->
        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th>{{$t('genericName')}}</vs-th>
          <vs-th>{{$t('Quantity')}}</vs-th>
          <vs-th>{{$t('unitPrice')}}</vs-th>
          <vs-th>{{$t('totalPrice')}}</vs-th>
        </template>

        <!-- DATA -->
        <template slot-scope="{data}">
          <vs-tr v-for="(tr, index) in data" :key="index">
            <vs-td class="py-0" :data="index">{{index+1}}</vs-td>
            <vs-td
              class="text-left"
              :data="secondInventory[index].inventoryGenericName"
            >{{ secondInventory[index].inventoryGenericName }} {{secondInventory[index].dosageForm != null ? secondInventory[index].dosageForm : ""}} {{+secondInventory[index].strength != null ? secondInventory[index].strength : "" }}</vs-td>
            <vs-td class="text-left" :data="data[index].hours">x{{ data[index].orderQuantity }}</vs-td>
            <vs-td class="text-left" :data="data[index].unitPrice">{{ data[index].unitPrice }}</vs-td>
            <vs-td
              :data="data[index].unitPrice * data[index].orderQuantity"
              class="text-left"
            >{{ data[index].unitPrice * data[index].orderQuantity }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <!-- INVOICE SUMMARY TABLE -->
      <vs-table hoverFlat class="w-3/5 ml-auto mt-4 text-left" :data="orderResponse">
        <vs-tr>
          <vs-th>{{$t('SUBTOTAL')}}</vs-th>
          <vs-td
            class="text-left"
          >{{ orderResponse.totalPrice - (orderResponse.totalPrice * 0.15).toFixed(2)}} {{$t('USD')}}</vs-td>
        </vs-tr>
        <vs-tr>
          <vs-th>{{$t('TAX')}}(15%)</vs-th>
          <vs-td class="text-left">{{ (orderResponse.totalPrice*0.15).toFixed(2) }} {{$t('USD')}}</vs-td>
        </vs-tr>
        <vs-tr>
          <th>{{$t('grandTotal')}}</th>
          <td class="text-black font-bold text-left">{{ orderResponse.totalPrice }} {{$t('USD')}}</td>
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
      <p>
        <span class="mr-10 mt-4">
          {{$t('orderNumber')}}:
          <span class="text-black font-bold">{{orderResponse.orderNumber}}</span>
        </span>
        <span class="ml-10" v-if="orderResponse.deliveryAddress != 'undefined,undefined,undefined'">
          {{$t('deliveryLocation')}}:
          <span
            class="text-black font-bold"
          >{{orderResponse.deliveryAddress}}</span>
        </span>
        <span class="ml-24" v-if="orderResponse.deliveryTime">
          {{$t('deliveryTime')}}:
          <span
            class="text-black font-bold"
          >{{orderResponse.deliveryTime}}</span>
        </span>
      </p>
    </div>
  </div>
  <!-- </vx-card>   -->
</template>

<script>
export default {
  data() {
    return {
      printObj: {
        id: "printableInvoice",
        popTitle: "costing Order Invoice",
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
      invoiceId: ""
    };
  },
  created() {
    this.orderResponse = this.$store.getters["invoice/getOrder"];
    let invoiceNumber = "IN";
    for (let j = 0; j < 5 - this.orderResponse.orderId.toString().length; j++)
      invoiceNumber = invoiceNumber + "0";
    this.invoiceId = invoiceNumber + this.orderResponse.orderId;
    this.getOrderById();
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
    print() {
      window.print();
    },
    getOrderById() {
      this.$http.get(`/order/${this.orderResponse.orderId}`).then(response => {
        this.orderResponse = response.data;
        this.getUserInfo();
        this.getCompanyInfo();
        for (
          let index = 0;
          index < this.orderResponse.orderItems.length;
          index++
        ) {
          this.getInventoryById(
            this.orderResponse.orderItems[index].inventoryId,
            index
          );
        }
        // console.log(response.data);
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
      this.nextTick(function() {
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
