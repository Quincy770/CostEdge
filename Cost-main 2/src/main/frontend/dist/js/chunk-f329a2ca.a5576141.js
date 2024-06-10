(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f329a2ca"],{"5ac4":function(t,e,n){"use strict";n.r(e);n("7f7f");var s=function(){var t=this,e=t._self._c;return e("vx-card",{attrs:{title:t.$t("regionList")}},[e("vx-card",[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6 mt-4 mr-2"},[e("vs-button",{staticClass:"mb-2 small text-base",attrs:{"icon-pack":"feather",icon:"icon-plus",color:"#292929"},on:{click:function(e){return e.preventDefault(),t.add.apply(null,arguments)}}},[t._v(t._s(t.$t("create"))+"\n      ")])],1),e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-2",attrs:{id:"dropdown"}},[e("vs-dropdown",{attrs:{"vs-custom-content":"","vs-trigger-click":""}},[e("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[e("span",{staticClass:"mr-2"},[e("p",[t._v(t._s(t.limit))])]),e("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e("vs-dropdown-menu",[e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(15)}}},[t._v("15")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(25)}}},[t._v("25")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(50)}}},[t._v("50")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(75)}}},[t._v("75")])])],1)],1)],1),e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4"}),e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4"}),e("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4"},[e("vs-input",{staticClass:"w-full mx-2 input-rounded-full no-icon-border",attrs:{icon:"icon-search","icon-pack":"feather",placeholder:t.$t("Search")},on:{keyup:function(e){return t.fetchRegions()}},model:{value:t.searchKey,callback:function(e){t.searchKey=e},expression:"searchKey"}})],1)])]),e("vx-card",{attrs:{id:"internal-card",title:"","no-shadow":"","card-border":""}},[e("vs-table",{staticClass:"stripe",attrs:{hoverFlat:"","max-items":t.perPage,data:t.regions},on:{selected:t.goToDetail},scopedSlots:t._u([{key:"default",fn:function(n){var s=n.data;return t._l(s,(function(n,a){return e("vs-tr",{key:a,attrs:{data:n}},[e("vs-td",{staticClass:"w-10"},[t._v(t._s(a+1+t.limit*(t.currentPage-1)))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:s[a].name}},[t._v(t._s(s[a].name))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:s[a].description}},[t._v(t._s(s[a].description))]),e("vs-td",{staticClass:"p-0",attrs:{data:s[a].regionId}},[t.isGranted("editRegion")?e("span",{on:{click:function(e){return t.updateRegion(s[a].regionId)}}},[e("vs-avatar",{attrs:{color:"lightGreen","icon-pack":"feather",icon:"icon-edit"}})],1):t._e(),t.isGranted("deleteRegion")?e("span",{on:{click:function(e){return t.openConfirm(s[a].regionId)}}},[e("vs-avatar",{attrs:{color:"danger","icon-pack":"feather",icon:"icon-delete"}})],1):t._e()])],1)}))}}])},[e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"number"}},[t._v("#")]),e("vs-th",{attrs:{"sort-key":"regionName"}},[t._v(t._s(t.$t("regionName")))]),e("vs-th",{attrs:{"sort-key":"description"}},[t._v(t._s(t.$t("description")))]),e("vs-th",[t._v(t._s(t.$t("actions")))])],1)],2),0!=t.increament?e("p",[t._v(".")]):t._e()],1),e("vs-pagination",{staticClass:"m-4",attrs:{total:t.total},on:{change:t.fetchRegions},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)},a=[],i={components:{},data:function(){return{regions:[],limit:15,total:0,currentPage:1,searchKey:"",perPage:20,totalPage:0,preventTableClickAction:!1,regionId:""}},methods:{fetchRegions:function(){var t=this;this.isLoading=!0,this.$http.get("/region",{params:{page:t.currentPage,limit:t.limit,searchKey:t.searchKey}}).then((function(e){t.isLoading=!1,t.regions=e.data,t.total=e.data[0].totalPage})).catch((function(e){t.isLoading=!1}))},openConfirm:function(t){this.regionId=t,this.$vs.dialog({type:"confirm",color:"warning",title:"Confirm",text:this.$t("deleteConfirmation"),accept:this.acceptAlert,acceptText:this.$t("Yes"),cancelText:this.$t("No")})},acceptAlert:function(){var t=this;this.$http.delete("/region/"+this.regionId).then((function(e){t.$vs.notify({color:"success",title:"Status",text:"Region Deleted!"}),t.fetchRegions()})).catch((function(t){}))},add:function(){this.$router.push({name:"addRegion"})},updateRegion:function(t){this.$router.push({path:"/pages/edit-region/"+t})}},created:function(){this.fetchRegions()}},o=i,r=(n("8566"),n("2877")),c=Object(r["a"])(o,s,a,!1,null,"d38bda12",null);e["default"]=c.exports},"6bcc":function(t,e,n){},8566:function(t,e,n){"use strict";n("6bcc")}}]);
//# sourceMappingURL=chunk-f329a2ca.a5576141.js.map