(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cb1e857a"],{"18fa":function(t,e,i){(function(e,i){t.exports=i()})(0,()=>(()=>{"use strict";var t={};(()=>{t.d=(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})}})(),(()=>{t.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e)})();var e={};t.d(e,{default:()=>D});var i=function(){var t=this,e=t._self._c;return e("transition",{attrs:{name:t.transition}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"vld-overlay is-active",class:{"is-full-page":t.isFullPage},style:{zIndex:t.zIndex},attrs:{tabindex:"0","aria-busy":t.isActive,"aria-label":"Loading"}},[e("div",{staticClass:"vld-background",style:t.bgStyle,on:{click:function(e){return e.preventDefault(),t.cancel.apply(null,arguments)}}}),e("div",{staticClass:"vld-icon"},[t._t("before"),t._t("default",(function(){return[e(t.loader,{tag:"component",attrs:{color:t.color,width:t.width,height:t.height}})]})),t._t("after")],2)])])},n=[];const a=t=>{"undefined"!==typeof t.remove?t.remove():t.parentNode.removeChild(t)},s=()=>"undefined"!==typeof window,r=s()?window.HTMLElement:Object,o={mounted(){this.enforceFocus&&document.addEventListener("focusin",this.focusIn)},methods:{focusIn(t){if(!this.isActive)return;if(t.target===this.$el||this.$el.contains(t.target))return;let e=this.container?this.container:this.isFullPage?null:this.$el.parentElement;(this.isFullPage||e&&e.contains(t.target))&&(t.preventDefault(),this.$el.focus())}},beforeDestroy(){document.removeEventListener("focusin",this.focusIn)}};var l=function(){var t=this,e=t._self._c;return e("svg",{attrs:{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:t.width,height:t.height,stroke:t.color}},[e("g",{attrs:{fill:"none","fill-rule":"evenodd"}},[e("g",{attrs:{transform:"translate(1 1)","stroke-width":"2"}},[e("circle",{attrs:{"stroke-opacity":".25",cx:"18",cy:"18",r:"18"}}),e("path",{attrs:{d:"M36 18c0-9.94-8.06-18-18-18"}},[e("animateTransform",{attrs:{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.8s",repeatCount:"indefinite"}})],1)])])])},c=[];const u={name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}},d=u;function p(t,e,i,n,a,s,r,o){var l,c="function"===typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=i,c._compiled=!0),n&&(c.functional=!0),s&&(c._scopeId="data-v-"+s),r?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=l):a&&(l=o?function(){a.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:a),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(t,e){return l.call(e),u(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:c}}var h=p(d,l,c,!1,null,null,null);const v=h.exports;var m=function(){var t=this,e=t._self._c;return e("svg",{attrs:{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:t.color,width:t.width,height:t.height}},[e("circle",{attrs:{cx:"15",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"60",cy:"15",r:"9","fill-opacity":"0.3"}},[e("animate",{attrs:{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"0.5",to:"0.5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"105",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})])])},f=[];const g={name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}},y=g;var b=p(y,m,f,!1,null,null,null);const _=b.exports;var w=function(){var t=this,e=t._self._c;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:t.height,width:t.width,fill:t.color}},[e("rect",{attrs:{x:"0",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"10",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"20",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}})])])},C=[];const k={name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}},x=k;var $=p(x,w,C,!1,null,null,null);const N=$.exports,S={Spinner:v,Dots:_,Bars:N},I={name:"vue-loading",mixins:[o],props:{active:Boolean,programmatic:Boolean,container:[Object,Function,r],isFullPage:{type:Boolean,default:!0},enforceFocus:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!1},transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:()=>{}},color:String,backgroundColor:String,blur:{type:String,default:"2px"},opacity:Number,width:Number,height:Number,zIndex:Number,loader:{type:String,default:"spinner"}},data(){return{isActive:this.active}},components:S,beforeMount(){this.programmatic&&(this.container?(this.isFullPage=!1,this.container.appendChild(this.$el)):document.body.appendChild(this.$el))},mounted(){this.programmatic&&(this.isActive=!0),document.addEventListener("keyup",this.keyPress)},methods:{cancel(){this.canCancel&&this.isActive&&(this.hide(),this.onCancel.apply(null,arguments))},hide(){this.$emit("hide"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(()=>{this.$destroy(),a(this.$el)},150))},disableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.add("vld-shown")},enableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.remove("vld-shown")},keyPress(t){27===t.keyCode&&this.cancel()}},watch:{active(t){this.isActive=t},isActive(t){t?this.disableScroll():this.enableScroll()}},computed:{bgStyle(){return{background:this.backgroundColor,opacity:this.opacity,backdropFilter:`blur(${this.blur})`}}},beforeDestroy(){document.removeEventListener("keyup",this.keyPress)}},L=I;var P=p(L,i,n,!1,null,null,null);const T=P.exports,A=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{show(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;const s={programmatic:!0},r=Object.assign({},e,n,s),o=new(t.extend(T))({el:document.createElement("div"),propsData:r}),l=Object.assign({},i,a);return Object.keys(l).map(t=>{o.$slots[t]=l[t]}),o}}},M=A,F=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=M(t,e,i);t.$loading=n,t.prototype.$loading=n};T.install=F;const D=T;return e=e["default"],e})())},"4a7a0":function(t,e,i){"use strict";i.r(e);i("386d");var n=function(){var t=this,e=t._self._c;return e("vx-card",{attrs:{title:t.$t("All Products Items")}},[e("vx-card",{staticClass:"mt-10",attrs:{id:"internal-card",title:"","no-shadow":"","card-border":""}},[e("div",{staticClass:"chat__profile-search flex p-4 mt-6"},[t.isAdmin?e("div",{staticClass:"p-3 mb-4 mr-4 w-64 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary",attrs:{id:"add"},on:{click:t.add}},[e("feather-icon",{attrs:{icon:"PlusIcon",svgClasses:"h-4 w-4"}}),e("span",{staticClass:"ml-2 text-base text-primary"},[t._v(t._s(t.$t("addNewInventory")))])],1):t._e(),e("div",{staticClass:"ml-8 lg:w-1/6",attrs:{id:"dropdown"}},[e("vs-dropdown",{attrs:{"vs-custom-content":"","vs-trigger-click":""}},[e("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[e("span",{staticClass:"mr-2"},[e("p",[t._v(t._s(t.limit))])]),e("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e("vs-dropdown-menu",[e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(15)}}},[t._v("15")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(25)}}},[t._v("25")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(50)}}},[t._v("50")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.pageLimit(75)}}},[t._v("75")])])],1)],1)],1),e("div",{staticClass:"float-right",attrs:{id:"search"}},[e("vs-input",{staticClass:"w-full mx-2 input-rounded-full no-icon-border",attrs:{icon:"icon-search","icon-pack":"feather",placeholder:t.$t("Search")},on:{keyup:function(e){return t.search(t.searcCompany)}},model:{value:t.searcCompany,callback:function(e){t.searcCompany=e},expression:"searcCompany"}})],1)]),e("loading",{attrs:{active:t.isLoading,"can-cancel":!0},on:{"update:active":function(e){t.isLoading=e}}}),e("vs-table",{attrs:{"max-items":t.currentPage,data:t.inventory},scopedSlots:t._u([{key:"default",fn:function(i){var n=i.data;return t._l(n,(function(i,a){return e("vs-tr",{key:a,attrs:{state:n[a].availableQuantity<n[a].minimumStockQuantity?"warning":null,data:i}},[e("vs-td",[t._v(t._s(a+1))]),e("router-link",{attrs:{to:"/inventory/inventory-Item-Price-Details/"+i.inventoryId}},[e("vs-td",{staticClass:"p-4",attrs:{data:n[a].inventoryGenericName}},[t._v(t._s(n[a].inventoryGenericName)+"\n              "+t._s(n[a].dosageForm)+" "+t._s(n[a].strength))])],1),e("vs-td",{staticClass:"p-0",attrs:{data:n[a].inventoryType}},[t._v(t._s(n[a].inventoryType))]),e("vs-td",{staticClass:"p-4",attrs:{data:n[a].id}},[t._v(t._s(n[a].measuringUnit))]),e("vs-td",{staticClass:"p-4",attrs:{data:n[a].availableQuantity}},[t._v(t._s(n[a].availableQuantity))]),e("vs-td",{staticClass:"p-4",attrs:{data:n[a].minimumStockQuantity}},[t._v(t._s(n[a].minimumStockQuantity)+"\n          ")]),t.isAdmin?e("vs-td",{staticClass:"p-0 w-24",attrs:{data:n[a].id}},[e("span",{attrs:{id:"edit-icon"},on:{click:function(e){return t.updateInventory(n[a].inventoryId)}}},[e("vs-avatar",{attrs:{color:"lightGreen","icon-pack":"feather",icon:"icon-edit"}})],1)]):t._e(),e("vs-td",{staticClass:"p-0",attrs:{data:n[a].id}},[e("span",{attrs:{id:"detail-icon"},on:{click:function(e){return t.inventoryDetail(n[a].inventoryId)}}},[e("vs-avatar",{attrs:{color:"lightGreen","icon-pack":"feather",icon:"icon-chevrons-right"}})],1)])],1)}))}}])},[e("template",{slot:"thead"},[e("vs-th",[t._v("#")]),e("vs-th",{staticClass:"p-4 w-48",attrs:{"sort-key":"inventoryGenericName"}},[t._v(t._s(t.$t("genericName")))]),e("vs-th",{staticClass:"p-0",attrs:{"sort-key":"inventoryType"}},[t._v(t._s(t.$t("Category")))]),e("vs-th",{staticClass:"p-0",attrs:{"sort-key":"measuringUnit"}},[t._v(t._s(t.$t("Unit")))]),e("vs-th",{staticClass:"p-4 w-48",attrs:{"sort-key":"availableQuantity"}},[t._v(t._s(t.$t("Available Qty")))]),e("vs-th",{staticClass:"p-0 w-32",attrs:{"sort-key":"minimumStockQuantity"}},[t._v(t._s(t.$t("Min Qty")))]),t.isAdmin?e("vs-th",{staticClass:"p-0 w-16"},[t._v(t._s(t.$t("Edit")))]):t._e(),e("vs-th",{staticClass:"p-0 w-24"},[t._v(t._s(t.$t("Detail")))])],1)],2),""!=t.inventory?e("vs-pagination",{attrs:{total:t.total},on:{change:function(e){return t.pagination()}},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}}):t._e()],1)],1)},a=[],s=(i("41cb"),i("a433"),i("3022"),i("18fa")),r=i.n(s),o=(i("e40d"),{components:{Loading:r.a},data:function(){return{selected:[],inventory:[],limit:15,currentPage:1,total:0,searcCompany:"",isVisible:!0,text:"",responseGeted:!1,isLoading:!1}},methods:{inventoryDetail:function(t){this.$router.push({path:"/pages/inventory-detail/"+t})},navigateToDetail:function(t){this.$router.push({path:"/inventory/inventory-Item-Price-Details/"+t.inventoryId})},search:function(t){var e=this;this.$http.post("/inventory/search",{searchKey:t,customerType:this.isCustomer?"Customer":""},{params:{page:this.currentPage,limit:this.limit}}).then((function(t){e.inventory=t.data,e.total=thisIns.inventory[0].totalPages,thisIns.$store.dispatch("inventory/populateInventory",t.data)}))},pageLimit:function(t){this.limit=t,this.pagination()},pagination:function(){this.getInvenrotries()},updateInventory:function(t){this.$router.push({path:"/inventory/"+t})},add:function(){this.$router.push({path:"/pages/add-inventory"})},getInvenrotries:function(){var t=this,e=this;this.isLoading=!0,this.$http.get("/inventory",{params:{customerType:this.isCustomer?"Customer":"",page:this.currentPage,limit:this.limit}}).then((function(t){e.isLoading=!1,e.inventory=t.data,e.total=e.inventory[0].totalPages,e.$store.dispatch("inventory/populateInventory",t.data),this.responseGeted=!0})).catch((function(i){t.responseGeted=!0,e.isLoading=!1}))}},computed:{getCurrentUser:function(){return{userType:localStorage.getItem("userType")}},isCustomer:function(){return"Customer"==this.getCurrentUser.userType},isAdmin:function(){return"Admin"==this.getCurrentUser.userType}},created:function(){this.getInvenrotries()}}),l=o,c=(i("8d81"),i("2877")),u=Object(c["a"])(l,n,a,!1,null,"355e6138",null);e["default"]=u.exports},"8d81":function(t,e,i){"use strict";i("f370")},e40d:function(t,e,i){},f370:function(t,e,i){}}]);
//# sourceMappingURL=chunk-cb1e857a.3b18a321.js.map