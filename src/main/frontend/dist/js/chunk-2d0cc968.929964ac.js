(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cc968"],{"4f22":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("vx-card",{attrs:{title:t.$t("allCustomerTransactions")}},[e("div",{attrs:{id:"knowledge-base-page"}},[e("div",{staticClass:"knowledge-base-jumbotron",staticStyle:{"margin-top":"-30px"}},[e("div",{staticClass:"knowledge-base-jumbotron-content lg:p-1 md:p-1 sm:p-1 py-1 rounded-lg mb-base"},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"w-2/5"},[e("vs-input",{staticClass:"w-full no-icon-border mt-6 ml-3",attrs:{placeholder:t.$t("searchCustomerTransactionHint"),"icon-pack":"feather",icon:"icon-search",size:"large"},on:{keyup:function(e){return t.getTransactions()}},model:{value:t.searchKey,callback:function(e){t.searchKey=e},expression:"searchKey"}})],1),e("div",{staticClass:"w-1/6",attrs:{id:"dropdown"}},[e("vs-dropdown",{attrs:{"vs-custom-content":"","vs-trigger-click":""}},[e("div",{staticClass:"p-4 mt-6 ml-6 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[e("span",{staticClass:"pl-4 pr-4"},[e("p",[t._v("\n                    "+t._s((t.currentPage-1)*t.perPage+1)+"-"+t._s(t.currentPage*t.perPage)+"\n                    of "+t._s(t.totalPage*t.perPage)+"\n                  ")])]),e("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e("vs-dropdown-menu",[e("vs-dropdown-item",[e("span",{on:{click:function(e){t.perPage=15,t.getTransactions()}}},[t._v("15")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){t.perPage=25,t.getTransactions()}}},[t._v("25")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){t.perPage=50,t.getTransactions()}}},[t._v("50")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){t.perPage=75,t.getTransactions()}}},[t._v("75")])])],1)],1)],1),e("div",{staticClass:"w-1/5 mt-8"},[t.isGranted("addTransaction")&&!t.isCustomerSeller?e("vs-button",{staticClass:"small text-base",attrs:{"icon-pack":"feather",icon:"icon-plus",type:"gradient",color:"success"},on:{click:function(e){return e.preventDefault(),t.add.apply(null,arguments)}}},[t._v(t._s(t.$t("addTransaction")))]):t._e()],1),e("div",{staticClass:"w-1/6 ml-12 mt-6"})])])])]),e("div",{staticStyle:{"margin-top":"-20px"},attrs:{id:"internal-card",title:""}},[e("vs-table",{staticClass:"stripe",attrs:{hoverFlat:"","max-items":t.perPage,data:t.transactions},on:{selected:t.goToDetail},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.data;return t._l(s,(function(a,n){return e("vs-tr",{key:n,attrs:{data:a}},[e("vs-td",{staticClass:"w-10"},[t._v(t._s(n+1+t.perPage*(t.currentPage-1)))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:s[n].inventoryName}},[t._v(t._s(s[n].inventoryName))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:s[n].transactionType}},[t._v(t._s(s[n].transactionType))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:s[n].transactionDate}},[t._v(t._s(t._f("date2")(s[n].transactionDate)))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:s[n].customer}},[t._v(t._s(s[n].customer))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:s[n].transactionReason}},[t._v(t._s(s[n].transactionReason)+"\n          ")])],1)}))}}])},[e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"number"}},[t._v("#")]),e("vs-th",{attrs:{"sort-key":"inventoryName"}},[t._v(t._s(t.$t("inventoryName")))]),e("vs-th",{attrs:{"sort-key":"transactionType"}},[t._v(t._s(t.$t("transactionType")))]),e("vs-th",{attrs:{"sort-key":"transactionDate"}},[t._v(t._s(t.$t("transactionDate")))]),e("vs-th",{attrs:{"sort-key":"transactionBy"}},[t._v(t._s(t.$t("transactionBy")))]),e("vs-th",{attrs:{"sort-key":"transactionReason"}},[t._v(t._s(t.$t("transactionReason")))])],1)],2)],1),e("vs-pagination",{staticClass:"m-4",attrs:{total:t.totalPage},on:{change:t.getTransactions},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)},n=[],r={components:{},data:function(){return{dot:"",transactions:[],limit:15,total:0,colorAlert:"primary",titleAlert:"Alert",activeConfirm:!1,valueInput:"",accepted:!1,companyId:"",customerInventoryTransactionId:"",userType:localStorage.getItem("userId"),increament:0,decreament:0,inventoryName:"",searchKey:"",kb:[],perPage:50,currentPage:1,totalPage:0,preventTableClickAction:!1}},computed:{getCurrentUser:function(){return{userType:localStorage.getItem("userType")}},isCustomerAdmin:function(){return"CustomerAdmin"==this.getCurrentUser.userType},isCustomerSeller:function(){return"CustomerSeller"==this.getCurrentUser.userType}},methods:{getTransactions:function(){var t=this;this.$http.get("/customer-inventory-transaction",{params:{page:this.currentPage,limit:this.perPage,searchKey:this.searchKey,companyId:this.companyId,userType:localStorage.getItem("userType")}}).then((function(e){t.transactions=e.data,t.totalPage=e.data[0].totalPages,t.isLoading=!1})).catch((function(e){t.isLoading=!1}))},openConfirm:function(t){this.customerInventoryTransactionId=t,this.$vs.dialog({type:"confirm",color:"warning",title:"Confirm",text:this.$t("deleteConfirmation"),accept:this.acceptAlert,acceptText:this.$t("Yes"),cancelText:this.$t("No")})},acceptAlert:function(){var t=this;this.$http.delete("/customer-inventory-transaction/"+this.customerInventoryTransactionId,{}).then((function(e){t.$vs.notify({color:"success",title:"Status",text:"customer transaction Deleted"}),t.getCountries()}))},add:function(){this.$router.push({path:"/pages/customer/add-transaction"})},updateCustomerInventoryTransaction:function(t){this.$router.push({path:"/pages/customer/edit-transaction/"+t})}},created:function(){this.getTransactions()}},o=r,i=a("2877"),c=Object(i["a"])(o,s,n,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0cc968.929964ac.js.map