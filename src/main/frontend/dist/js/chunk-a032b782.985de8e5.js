(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a032b782"],{"18fa":function(t,e,i){(function(e,i){t.exports=i()})(0,()=>(()=>{"use strict";var t={};(()=>{t.d=(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})}})(),(()=>{t.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e)})();var e={};t.d(e,{default:()=>A});var i=function(){var t=this,e=t._self._c;return e("transition",{attrs:{name:t.transition}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"vld-overlay is-active",class:{"is-full-page":t.isFullPage},style:{zIndex:t.zIndex},attrs:{tabindex:"0","aria-busy":t.isActive,"aria-label":"Loading"}},[e("div",{staticClass:"vld-background",style:t.bgStyle,on:{click:function(e){return e.preventDefault(),t.cancel.apply(null,arguments)}}}),e("div",{staticClass:"vld-icon"},[t._t("before"),t._t("default",(function(){return[e(t.loader,{tag:"component",attrs:{color:t.color,width:t.width,height:t.height}})]})),t._t("after")],2)])])},n=[];const r=t=>{"undefined"!==typeof t.remove?t.remove():t.parentNode.removeChild(t)},a=()=>"undefined"!==typeof window,s=a()?window.HTMLElement:Object,o={mounted(){this.enforceFocus&&document.addEventListener("focusin",this.focusIn)},methods:{focusIn(t){if(!this.isActive)return;if(t.target===this.$el||this.$el.contains(t.target))return;let e=this.container?this.container:this.isFullPage?null:this.$el.parentElement;(this.isFullPage||e&&e.contains(t.target))&&(t.preventDefault(),this.$el.focus())}},beforeDestroy(){document.removeEventListener("focusin",this.focusIn)}};var l=function(){var t=this,e=t._self._c;return e("svg",{attrs:{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:t.width,height:t.height,stroke:t.color}},[e("g",{attrs:{fill:"none","fill-rule":"evenodd"}},[e("g",{attrs:{transform:"translate(1 1)","stroke-width":"2"}},[e("circle",{attrs:{"stroke-opacity":".25",cx:"18",cy:"18",r:"18"}}),e("path",{attrs:{d:"M36 18c0-9.94-8.06-18-18-18"}},[e("animateTransform",{attrs:{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.8s",repeatCount:"indefinite"}})],1)])])])},c=[];const u={name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}},d=u;function v(t,e,i,n,r,a,s,o){var l,c="function"===typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=i,c._compiled=!0),n&&(c.functional=!0),a&&(c._scopeId="data-v-"+a),s?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=l):r&&(l=o?function(){r.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:r),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(t,e){return l.call(e),u(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:c}}var h=v(d,l,c,!1,null,null,null);const m=h.exports;var f=function(){var t=this,e=t._self._c;return e("svg",{attrs:{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:t.color,width:t.width,height:t.height}},[e("circle",{attrs:{cx:"15",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"60",cy:"15",r:"9","fill-opacity":"0.3"}},[e("animate",{attrs:{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"0.5",to:"0.5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"105",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})])])},p=[];const y={name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}},g=y;var b=v(g,f,p,!1,null,null,null);const I=b.exports;var _=function(){var t=this,e=t._self._c;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:t.height,width:t.width,fill:t.color}},[e("rect",{attrs:{x:"0",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"10",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"20",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}})])])},w=[];const C={name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}},k=C;var N=v(k,_,w,!1,null,null,null);const x=N.exports,P={Spinner:m,Dots:I,Bars:x},S={name:"vue-loading",mixins:[o],props:{active:Boolean,programmatic:Boolean,container:[Object,Function,s],isFullPage:{type:Boolean,default:!0},enforceFocus:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!1},transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:()=>{}},color:String,backgroundColor:String,blur:{type:String,default:"2px"},opacity:Number,width:Number,height:Number,zIndex:Number,loader:{type:String,default:"spinner"}},data(){return{isActive:this.active}},components:P,beforeMount(){this.programmatic&&(this.container?(this.isFullPage=!1,this.container.appendChild(this.$el)):document.body.appendChild(this.$el))},mounted(){this.programmatic&&(this.isActive=!0),document.addEventListener("keyup",this.keyPress)},methods:{cancel(){this.canCancel&&this.isActive&&(this.hide(),this.onCancel.apply(null,arguments))},hide(){this.$emit("hide"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(()=>{this.$destroy(),r(this.$el)},150))},disableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.add("vld-shown")},enableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.remove("vld-shown")},keyPress(t){27===t.keyCode&&this.cancel()}},watch:{active(t){this.isActive=t},isActive(t){t?this.disableScroll():this.enableScroll()}},computed:{bgStyle(){return{background:this.backgroundColor,opacity:this.opacity,backdropFilter:`blur(${this.blur})`}}},beforeDestroy(){document.removeEventListener("keyup",this.keyPress)}},$=S;var q=v($,i,n,!1,null,null,null);const T=q.exports,L=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{show(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;const a={programmatic:!0},s=Object.assign({},e,n,a),o=new(t.extend(T))({el:document.createElement("div"),propsData:s}),l=Object.assign({},i,r);return Object.keys(l).map(t=>{o.$slots[t]=l[t]}),o}}},E=L,D=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=E(t,e,i);t.$loading=n,t.prototype.$loading=n};T.install=D;const A=T;return e=e["default"],e})())},"504c":function(t,e,i){var n=i("0d58"),r=i("6821"),a=i("52a7").f;t.exports=function(t){return function(e){var i,s=r(e),o=n(s),l=o.length,c=0,u=[];while(l>c)a.call(s,i=o[c++])&&u.push(t?[i,s[i]]:s[i]);return u}}},8615:function(t,e,i){var n=i("5ca1"),r=i("504c")(!1);n(n.S,"Object",{values:function(t){return r(t)}})},a5dc:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t._self._c;return e("vx-card",{attrs:{id:"external-card",title:"","no-shadow":"","card-border":""}},[e("h3",[t._v(t._s(t.$t("sellInventoryItems")))]),e("vx-card",{staticClass:"mt-10 mb-0",attrs:{id:"internal-card",title:""}},[e("loading",{attrs:{active:t.isLoading,"can-cancel":!0},on:{"update:active":function(e){t.isLoading=e}}}),""!=t.validationError?e("vs-alert",{attrs:{color:"danger","icon-pack":"feather",icon:"icon-info"}},[e("span",[t._v(t._s(t.validationError))])]):t._e(),e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col w-1/2"},[e("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("selectItem"))+" ")]),e("v-select",{staticClass:"w-full",attrs:{label:"inventoryGenericName",options:t.inventoryItems,reduce:function(t){return t.inventoryId},name:"inventoryGenericName"},on:{input:function(e){return t.generateRowInput(t.inventoryId)}},model:{value:t.inventoryId,callback:function(e){t.inventoryId=e},expression:"inventoryId"}})],1),e("div",{staticClass:"vx-col w-1/3"},[e("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("pickSoldDate"))+" ")]),e("flat-pickr",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"validate",rawName:"v-validate:soldDate",value:"required",expression:"'required'",arg:"soldDate"}],staticClass:"w-full",attrs:{config:t.configdateTimePicker,name:"soldDate",size:"medium"},model:{value:t.soldDate,callback:function(e){t.soldDate=e},expression:"soldDate"}}),e("span",{directives:[{name:"show",rawName:"v-show",value:t.errors.has("soldDate"),expression:"errors.has('soldDate')"}],staticClass:"text-danger"},[t._v(t._s(t.errors.first("soldDate")))])],1)]),-1!=t.inc?e("div",{staticClass:"mt-4"},[e("vs-table",{attrs:{data:t.tabledata,id:"table"}},[e("vs-th",[t._v(t._s(t.$t("genericName")))]),e("vs-th",[t._v(t._s(t.$t("Quantity"))+"\n          "),e("p",{staticClass:"ml-1",attrs:{id:"required"}},[t._v("*")])]),e("vs-th",[t._v(t._s(t.$t("sellPrice"))+"\n          "),e("p",{staticClass:"ml-1",attrs:{id:"required"}},[t._v("*")])]),t._l(t.clickedInventoryId,(function(i,n){return e("vs-tr",{key:n,staticClass:"w-1/2"},[t.sellPrice[n]>0?e("vs-td",{staticClass:"w-1/5 mb-3"},[e("p",[t._v(t._s(t.clikedInventoryName[n]))])]):t._e(),t.sellPrice[n]>0?e("vs-td",{staticClass:"w-1/4 mb-3"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|decimal:10",expression:"'required|decimal:10'"}],class:[{error_input:t.errors.has(t.clikedInventoryName[n]+" quantity")}],attrs:{"data-vv-validate-on":"blur",name:t.clikedInventoryName[n]+" quantity"},on:{input:function(e){return t.checkQuantity(t.quantity[n],i,n)},change:t.resetValidationError},model:{value:t.quantity[n],callback:function(e){t.$set(t.quantity,n,e)},expression:"quantity[index]"}}),t.checkQuantityError?e("span",{staticClass:"p-0 text-danger"},[t._v("\n              "+t._s(t.checkQuantityError[n])+"\n              ")]):t._e()],1):t._e(),t.sellPrice[n]>0?e("vs-td",{staticClass:"w-1/4 mb-3 ml-6"},[e("p",[t._v(t._s(t.sellPrice[n])+"USD ")])]):t._e(),t.sellPrice[n]>0?e("vs-td",[e("span",{staticClass:"p-0",attrs:{id:"edit-icon"},on:{click:function(e){return t.removeRow(n)}}},[e("vs-avatar",{attrs:{color:"danger","icon-pack":"feather",icon:"icon-delete"}})],1)]):e("td",{staticClass:"w-1/3"},[e("span",{staticClass:"text-danger"},[t._v("Ask the Administrator to set the price first!")])])],1)}))],2),e("div",{staticClass:"vx-row"},[e("div",{staticClass:"w-1/2"}),e("div",{staticClass:"w-1/2"},[t.totalPrice()>0?e("vs-table",{attrs:{data:t.tabledata,id:"table"}},[e("th",[t._v(t._s(t.$t("TOTAL")))]),e("vs-th",[t._v(t._s(t.$t("TAX"))+"(5%)")]),e("th",[t._v(t._s(t.$t("grandTotal")))]),e("vs-tr",[e("vs-td",[t._v(t._s(t.totalPrice().toLocaleString("en-US"))+" USD")]),e("vs-td",[t._v(t._s((.05*t.totalPrice()).toLocaleString("en-US"))+" USD")]),e("vs-td",{staticClass:"font-bold text-black"},[t._v(t._s((t.totalPrice()+.05*t.totalPrice()).toLocaleString("en-US"))+" USD")])],1)],1):t._e(),e("vs-button",{staticClass:"mt-10 mb-0",staticStyle:{float:"right","margin-right":"50px"},attrs:{color:"success",size:"medium"},on:{click:t.addInventoryItemList}},[t._v(t._s(t.$t("sell"))+"\n          ")])],1)])],1):t._e()],1)],1)},r=[],a=(i("ac6a"),i("8615"),i("c5f6"),i("7bb1")),s=i("4a7a"),o=i.n(s),l=i("18fa"),c=i.n(l),u=(i("e40d"),i("aae5")),d=i.n(u),v=(i("0952"),{custom:{quantity:{required:"please enter quantity",integer:"Quantity must be integer"},sellPrice:{required:"Please Enter Sell Price",integer:"Sell price must be integer"}}});a["a"].localize("en",v);var h={components:{"v-select":o.a,Loading:c.a,flatPickr:d.a},data:function(){return{inc:-1,configdateTimePicker:{enableTime:!0,dateFormat:"Y-m-dTH:i"},userId:localStorage.getItem("userId"),inventoryItems:[],clickedInventoryId:[],clikedInventoryName:[],transactionType:[],quantity:[],sellPrice:[],soldDate:new Date,inventoryNames:[],tabledata:"sdfdsf",validationError:"",isLoading:!1,transactions:[],checkQuantityError:[],filteredInventories:[{inventoryId:"",inventoryName:"",sellQuantity:"",sellPrice:""}],inventories:[],sellInventory:[{inventoryId:""}]}},computed:{getCurrentUser:function(){return{userType:localStorage.getItem("userType")}},isCustomer:function(){return"Customer"==this.getCurrentUser.userType},isCustomerAdmin:function(){return"CustomerAdmin"==this.getCurrentUser.userType},isCustomerSeller:function(){return"CustomerSeller"==this.getCurrentUser.userType},isAdmin:function(){return"Admin"==this.getCurrentUser.userType},customError:function(t){return""==t?"the field is required":"Please enter number"}},created:function(){this.getInvenrotries()},mounted:function(){},methods:{checkQuantity:function(t,e,i){Number(t)>this.inventoryItems.filter((function(t){return t.inventoryId==e}))[0].availableQuantity?this.checkQuantityError[i]="Quantity must be Less than or Equal to "+this.inventoryItems.filter((function(t){return t.inventoryId==e}))[0].availableQuantity:this.checkQuantityError[i]=""},getInvenrotries:function(){var t=this,e=this;this.isLoading=!0,this.$http.get("/inventory",{params:{customerType:this.isCustomer?"Customer":"",page:this.currentPage,limit:this.limit}}).then((function(t){e.isLoading=!1,e.inventoryItems=t.data,e.total=e.inventoryItems[0].totalPages;for(var i=0;i<t.data.length;i++)e.inventoryItems[i].inventoryGenericName=t.data[i].inventoryGenericName+" "+t.data[i].inventoryBrandName+" "+t.data[i].strength;e.$store.dispatch("inventory/populateInventory",t.data),this.responseGeted=!0})).catch((function(i){t.responseGeted=!0,e.isLoading=!1}))},removeRow:function(t){this.inc--,this.clickedInventoryId.splice(t,1),this.clikedInventoryName.splice(t,1),this.quantity.splice(t,1),this.sellPrice.splice(t,1)},generateRowInput:function(t,e,i){if(0!=this.inventoryItems.filter((function(e){return e.inventoryId==t}))[0].currentPrice&&null!=t){for(var n=0,r=0;r<this.inc+1;r++)t==this.clickedInventoryId[r]&&(n=1);if(0==n){this.inc++,this.clickedInventoryId[this.inc]=t,this.sellPrice[this.inc]=this.inventoryItems.filter((function(e){return e.inventoryId==t}))[0].currentPrice;for(var a=0;this.inventoryItems.length;a++)t==this.inventoryItems[a].inventoryId&&(this.clikedInventoryName[this.inc]=this.inventoryItems[a].inventoryGenericName+" "+this.inventoryItems[a].inventoryBrandName);this.transactionType[this.inc]="",this.quantity[this.inc]=""}else this.inc--}},totalPrice:function(){for(var t=0,e=0;e<this.clickedInventoryId.length;e++)t+=(Number(this.quantity[e])?Number(this.quantity[e]):0)*Number(this.sellPrice[e]);return t},addInventoryItemList:function(){for(var t=this,e=!0,i=0;i<this.checkQuantityError.length;i++)""!=this.checkQuantityError[i]&&(e=!1);e&&this.$validator.validateAll().then((function(e){if(e){t.isLoading=!0,t.validationError="";for(var i=[],n=0;n<t.clickedInventoryId.length;n++){var r={};r["inventoryId"]=t.clickedInventoryId[n],r["transactionType"]="In",r["quantity"]=Number(t.quantity[n]),r["sellPrice"]=Number(t.sellPrice[n]),i.push(r)}t.$http.post("/customer-sold-inventory",{customerId:t.userId,soldDate:t.soldDate,customerSoldInventoryDetailRequestModels:i}).then((function(e){t.isLoading=!1,t.clickedInventoryId=[],t.clikedInventoryName=[],t.quantity=[],t.sellPrice=[],t.inc=-1,t.$vs.notify({title:t.$t("Add"),text:t.$t("Added Successfully!"),iconPack:"feather",icon:"icon-alert-circle",color:"success"}),t.$router.push({path:"/pages/customer/view-customer-inventory"})})).catch((function(){t.isLoading=!1}))}else t.validationError="Please enter number on all fields"}))},resetValidationError:function(){this.validationError=""},getAllInventoryTransactions:function(){var t=this;this.$http.get("/customer-inventory-transaction",{params:{searchKey:this.searchKey}}).then((function(e){t.transactions=e.data;var i=Object.values(t.transactions.reduce((function(t,e){var i=e.inventoryId,n=e.quantity,r=e.inventoryName,a=e.transactionType,s={inventoryId:i,quantity:0};return t[i]=t[i]||s,t[i].inventoryName=r,"Out"==a?t[i].quantity-=n:t[i].quantity+=n,t}),{}));t.filteredInventories=i.filter((function(t){return t.quantity>0})),t.inventoryItems=t.filteredInventories}))},addTransaction:function(){}}},m=h,f=i("2877"),p=Object(f["a"])(m,n,r,!1,null,null,null);e["default"]=p.exports},e40d:function(t,e,i){}}]);
//# sourceMappingURL=chunk-a032b782.985de8e5.js.map