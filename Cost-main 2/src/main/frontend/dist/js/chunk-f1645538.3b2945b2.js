(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f1645538"],{"19dc":function(t,e,a){"use strict";a("4f6c")},"2ac1":function(t,e,a){"use strict";a.r(e);a("7f7f");var r=function(){var t=this,e=t._self._c;return e("vx-card",{attrs:{title:t.$t("productCategoryList")}},[e("vx-card",[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6 mt-4 mr-2"},[e("vs-button",{staticClass:"mb-2 small text-base",attrs:{"icon-pack":"feather",icon:"icon-plus",color:"#292929"},on:{click:function(e){return e.preventDefault(),t.add.apply(null,arguments)}}},[t._v(t._s(t.$t("create"))+"\n      ")])],1),e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-2",attrs:{id:"dropdown"}},[e("vs-dropdown",{attrs:{"vs-custom-content":"","vs-trigger-click":""}},[e("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[e("span",{staticClass:"mr-2"},[e("p",[t._v(t._s(t.limit))])]),e("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e("vs-dropdown-menu",[e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(15)}}},[t._v("15")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(25)}}},[t._v("25")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(50)}}},[t._v("50")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(75)}}},[t._v("75")])])],1)],1)],1),e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4"}),e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4"}),e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4"},[e("vs-input",{staticClass:"w-full mx-2 input-rounded-full no-icon-border",attrs:{icon:"icon-search","icon-pack":"feather",placeholder:t.$t("Search")},on:{keyup:function(e){return t.fetchProductCategorys()}},model:{value:t.searchKey,callback:function(e){t.searchKey=e},expression:"searchKey"}})],1)])]),e("vx-card",{attrs:{id:"internal-card",title:"","no-shadow":"","card-border":""}},[e("vs-table",{staticClass:"stripe",attrs:{hoverFlat:"","max-items":t.perPage,data:t.productCategorys},on:{selected:t.goToDetail},scopedSlots:t._u([{key:"default",fn:function(a){var r=a.data;return t._l(r,(function(a,o){return e("vs-tr",{key:o,attrs:{data:a}},[e("vs-td",{staticClass:"w-10"},[t._v(t._s(o+1+t.limit*(t.currentPage-1)))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:r[o].name}},[t._v(t._s(r[o].name))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:r[o].description}},[t._v(t._s(r[o].description))]),e("vs-td",{staticClass:"p-0",attrs:{data:r[o].productCategoryId}},[t.isGranted("editProductCategory")?e("span",{on:{click:function(e){return t.updateProductCategory(r[o].productCategoryId)}}},[e("vs-avatar",{attrs:{color:"lightGreen","icon-pack":"feather",icon:"icon-edit"}})],1):t._e(),t.isGranted("deleteProductCategory")?e("span",{on:{click:function(e){return t.openConfirm(r[o].productCategoryId)}}},[e("vs-avatar",{attrs:{color:"danger","icon-pack":"feather",icon:"icon-delete"}})],1):t._e()])],1)}))}}])},[e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"number"}},[t._v("#")]),e("vs-th",{attrs:{"sort-key":"productCategory"}},[t._v(t._s(t.$t("productCategory")))]),e("vs-th",{attrs:{"sort-key":"description"}},[t._v(t._s(t.$t("description")))]),e("vs-th",[t._v(t._s(t.$t("actions")))])],1)],2),0!=t.increament?e("p",[t._v(".")]):t._e()],1),e("vs-pagination",{staticClass:"m-4",attrs:{total:t.total},on:{change:t.fetchProductCategorys},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)},o=[],s={components:{},data:function(){return{productCategorys:[],limit:15,total:0,currentPage:1,searchKey:"",perPage:20,totalPage:0,preventTableClickAction:!1,productCategoryId:""}},methods:{fetchProductCategorys:function(){var t=this;this.isLoading=!0,this.$http.get("/product-category",{params:{page:t.currentPage,limit:t.limit,searchKey:t.searchKey}}).then((function(e){t.isLoading=!1,t.productCategorys=e.data,t.total=e.data[0].totalPage})).catch((function(e){t.isLoading=!1}))},openConfirm:function(t){this.productCategoryId=t,this.$vs.dialog({type:"confirm",color:"warning",title:"Confirm",text:this.$t("deleteConfirmation"),accept:this.acceptAlert,acceptText:this.$t("Yes"),cancelText:this.$t("No")})},acceptAlert:function(){var t=this;this.$http.delete("/product-category/"+this.productCategoryId).then((function(e){t.$vs.notify({color:"success",title:"Status",text:"ProductCategory Deleted!"}),t.fetchProductCategorys()})).catch((function(t){}))},add:function(){this.$router.push({name:"addProductCategory"})},updateProductCategory:function(t){this.$router.push({path:"/pages/edit-product-category/"+t})}},created:function(){this.fetchProductCategorys()}},c=s,n=(a("19dc"),a("2877")),i=Object(n["a"])(c,r,o,!1,null,"3bb4046e",null);e["default"]=i.exports},"4f6c":function(t,e,a){}}]);
//# sourceMappingURL=chunk-f1645538.3b2945b2.js.map