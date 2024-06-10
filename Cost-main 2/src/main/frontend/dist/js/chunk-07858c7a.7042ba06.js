(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07858c7a"],{"7de2":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("vx-card",{attrs:{title:t.$t("allCategories")}},[e("div",{attrs:{id:"knowledge-base-page"}},[e("div",{staticClass:"knowledge-base-jumbotron"},[e("div",{staticClass:"knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base"},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"w-2/5"},[e("vs-input",{staticClass:"w-full no-icon-border mt-6",attrs:{placeholder:t.$t("seachCategoryHint"),"icon-pack":"feather",icon:"icon-search",size:"large"},on:{keyup:function(e){return t.getCategories()}},model:{value:t.searchKey,callback:function(e){t.searchKey=e},expression:"searchKey"}})],1),e("div",{staticClass:"w-1/6",attrs:{id:"dropdown"}},[e("vs-dropdown",{attrs:{"vs-custom-content":"","vs-trigger-click":""}},[e("div",{staticClass:"p-4 mt-6 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[e("span",{staticClass:"pl-4 pr-4"},[e("p",[t._v(t._s((t.currentPage-1)*t.perPage+1)+"-"+t._s(t.currentPage*t.perPage)+" of "+t._s(t.totalPage*t.perPage))])]),e("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e("vs-dropdown-menu",[e("vs-dropdown-item",[e("span",{on:{click:function(e){t.perPage=15,t.getCategories()}}},[t._v("15")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){t.perPage=25,t.getCategories()}}},[t._v("25")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){t.perPage=50,t.getCategories()}}},[t._v("50")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){t.perPage=75,t.getCategories()}}},[t._v("75")])])],1)],1)],1),e("div",{staticClass:"w-1/5 mt-8"},[t.isGranted("addCategory")?e("vs-button",{staticClass:"small text-base",attrs:{"icon-pack":"feather",icon:"icon-plus",type:"gradient",color:"success"},on:{click:function(e){return e.preventDefault(),t.add.apply(null,arguments)}}},[t._v(t._s(t.$t("addCategory")))]):t._e()],1),e("div",{staticClass:"w-1/6 ml-12 mt-6"})])])])]),e("vx-card",{attrs:{id:"internal-card",title:"","no-shadow":"","card-border":""}},[e("vs-table",{staticClass:"stripe",attrs:{hoverFlat:"","max-items":t.perPage,data:t.categories},on:{selected:t.goToDetail},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.data;return t._l(s,(function(a,r){return e("vs-tr",{key:r,attrs:{data:a}},[e("vs-td",{staticClass:"w-10"},[t._v(t._s(r+1+t.perPage*(t.currentPage-1)))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:s[r].inventoryType}},[t._v(t._s(s[r].inventoryType))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:s[r].description}},[t._v(t._s(s[r].description))]),e("vs-td",{staticClass:"p-0",attrs:{data:s[r].categoryId}},[t.isGranted("editCategory")?e("span",{on:{click:function(e){return t.updateCategory(s[r].categoryId)}}},[e("vs-avatar",{attrs:{color:"lightGreen","icon-pack":"feather",icon:"icon-edit"}})],1):t._e()]),e("vs-td",{staticClass:"p-0",attrs:{data:s[r].categoryId}},[e("ul",{staticClass:"switch-container"},[e("li",[t.isGranted("deleteCategory")?e("span",{on:{click:function(e){t.preventTableClickAction=!0,t.openConfirm(s[r].categoryId)}}},[e("vs-avatar",{attrs:{color:"danger","icon-pack":"feather",icon:"icon-delete"}})],1):t._e()])])])],1)}))}}])},[e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"number"}},[t._v("#")]),e("vs-th",{attrs:{"sort-key":"Category"}},[t._v(t._s(t.$t("Category")))]),e("vs-th",{attrs:{"sort-key":"description"}},[t._v(t._s(t.$t("Description")))]),e("vs-th",[t._v(t._s(t.$t("edit")))]),e("vs-th",[t._v(t._s(t.$t("delete")))])],1)],2)],1),e("vs-pagination",{staticClass:"m-4",attrs:{total:t.totalPage},on:{change:t.getCategories},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)},r=[],c=a("ade3"),o={components:{},data:function(){var t;return t={dot:"",categories:[],selected:[]},Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(t,"selected",[]),"limit",15),"total",0),"searchCategory",""),"status",[]),"swich",!0),"categoriestatus",""),"updateStatus",!1),"colorAlert","primary"),"titleAlert","Alert"),Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(t,"activeConfirm",!1),"valueInput",""),"accepted",!1),"categoryId",""),"confirm",""),"increament",0),"decreament",0),"responseGeted",!1),"currentItemView","item-grid-view"),"knowledgeBaseSearchQuery",""),Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])(t,"searchKey",""),"kb",[]),"allCategories",[]),"perPage",50),"currentPage",1),"totalPage",0),"preventTableClickAction",!1)},methods:{getCategories:function(){var t=this;this.$http.get("/category",{params:{page:this.currentPage,limit:this.perPage,searchKey:this.searchKey}}).then((function(e){t.categories=e.data,t.totalPage=e.data[0].totalPage,t.isLoading=!1})).catch((function(e){t.isLoading=!1}))},openConfirm:function(t){this.categoryId=t,this.$vs.dialog({type:"confirm",color:"warning",title:"Confirm",text:this.$t("deleteConfirmation"),accept:this.acceptAlert,acceptText:this.$t("Yes"),cancelText:this.$t("No")})},acceptAlert:function(){var t=this;this.$http.delete("/category/"+this.categoryId,{categoriestatus:this.categoriestatus}).then((function(e){t.$vs.notify({color:"success",title:"Status",text:"Category Deleted"}),t.getCategories()}))},add:function(){this.$router.push({path:"/pages/add-category"})},updateCategory:function(t){this.$router.push({path:"/pages/edit-categories/"+t})}},created:function(){this.getCategories()}},i=o,n=(a("c2f6"),a("2877")),d=Object(n["a"])(i,s,r,!1,null,"09410d1c",null);e["default"]=d.exports},c2f6:function(t,e,a){"use strict";a("c8d9")},c8d9:function(t,e,a){}}]);
//# sourceMappingURL=chunk-07858c7a.7042ba06.js.map