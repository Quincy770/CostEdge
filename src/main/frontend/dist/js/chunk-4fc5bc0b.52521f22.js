(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fc5bc0b"],{"18fa":function(t,e,a){(function(e,a){t.exports=a()})(0,()=>(()=>{"use strict";var t={};(()=>{t.d=(e,a)=>{for(var n in a)t.o(a,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:a[n]})}})(),(()=>{t.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e)})();var e={};t.d(e,{default:()=>F});var a=function(){var t=this,e=t._self._c;return e("transition",{attrs:{name:t.transition}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"vld-overlay is-active",class:{"is-full-page":t.isFullPage},style:{zIndex:t.zIndex},attrs:{tabindex:"0","aria-busy":t.isActive,"aria-label":"Loading"}},[e("div",{staticClass:"vld-background",style:t.bgStyle,on:{click:function(e){return e.preventDefault(),t.cancel.apply(null,arguments)}}}),e("div",{staticClass:"vld-icon"},[t._t("before"),t._t("default",(function(){return[e(t.loader,{tag:"component",attrs:{color:t.color,width:t.width,height:t.height}})]})),t._t("after")],2)])])},n=[];const i=t=>{"undefined"!==typeof t.remove?t.remove():t.parentNode.removeChild(t)},s=()=>"undefined"!==typeof window,r=s()?window.HTMLElement:Object,o={mounted(){this.enforceFocus&&document.addEventListener("focusin",this.focusIn)},methods:{focusIn(t){if(!this.isActive)return;if(t.target===this.$el||this.$el.contains(t.target))return;let e=this.container?this.container:this.isFullPage?null:this.$el.parentElement;(this.isFullPage||e&&e.contains(t.target))&&(t.preventDefault(),this.$el.focus())}},beforeDestroy(){document.removeEventListener("focusin",this.focusIn)}};var l=function(){var t=this,e=t._self._c;return e("svg",{attrs:{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:t.width,height:t.height,stroke:t.color}},[e("g",{attrs:{fill:"none","fill-rule":"evenodd"}},[e("g",{attrs:{transform:"translate(1 1)","stroke-width":"2"}},[e("circle",{attrs:{"stroke-opacity":".25",cx:"18",cy:"18",r:"18"}}),e("path",{attrs:{d:"M36 18c0-9.94-8.06-18-18-18"}},[e("animateTransform",{attrs:{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.8s",repeatCount:"indefinite"}})],1)])])])},c=[];const u={name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}},d=u;function v(t,e,a,n,i,s,r,o){var l,c="function"===typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=a,c._compiled=!0),n&&(c.functional=!0),s&&(c._scopeId="data-v-"+s),r?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=l):i&&(l=o?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(t,e){return l.call(e),u(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:c}}var m=v(d,l,c,!1,null,null,null);const p=m.exports;var h=function(){var t=this,e=t._self._c;return e("svg",{attrs:{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:t.color,width:t.width,height:t.height}},[e("circle",{attrs:{cx:"15",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"60",cy:"15",r:"9","fill-opacity":"0.3"}},[e("animate",{attrs:{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"0.5",to:"0.5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"105",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})])])},f=[];const y={name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}},g=y;var b=v(g,h,f,!1,null,null,null);const w=b.exports;var x=function(){var t=this,e=t._self._c;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:t.height,width:t.width,fill:t.color}},[e("rect",{attrs:{x:"0",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"10",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"20",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}})])])},C=[];const I={name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}},_=I;var $=v(_,x,C,!1,null,null,null);const N=$.exports,T={Spinner:p,Dots:w,Bars:N},k={name:"vue-loading",mixins:[o],props:{active:Boolean,programmatic:Boolean,container:[Object,Function,r],isFullPage:{type:Boolean,default:!0},enforceFocus:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!1},transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:()=>{}},color:String,backgroundColor:String,blur:{type:String,default:"2px"},opacity:Number,width:Number,height:Number,zIndex:Number,loader:{type:String,default:"spinner"}},data(){return{isActive:this.active}},components:T,beforeMount(){this.programmatic&&(this.container?(this.isFullPage=!1,this.container.appendChild(this.$el)):document.body.appendChild(this.$el))},mounted(){this.programmatic&&(this.isActive=!0),document.addEventListener("keyup",this.keyPress)},methods:{cancel(){this.canCancel&&this.isActive&&(this.hide(),this.onCancel.apply(null,arguments))},hide(){this.$emit("hide"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(()=>{this.$destroy(),i(this.$el)},150))},disableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.add("vld-shown")},enableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.remove("vld-shown")},keyPress(t){27===t.keyCode&&this.cancel()}},watch:{active(t){this.isActive=t},isActive(t){t?this.disableScroll():this.enableScroll()}},computed:{bgStyle(){return{background:this.backgroundColor,opacity:this.opacity,backdropFilter:`blur(${this.blur})`}}},beforeDestroy(){document.removeEventListener("keyup",this.keyPress)}},S=k;var q=v(S,a,n,!1,null,null,null);const D=q.exports,P=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{show(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a;const s={programmatic:!0},r=Object.assign({},e,n,s),o=new(t.extend(D))({el:document.createElement("div"),propsData:r}),l=Object.assign({},a,i);return Object.keys(l).map(t=>{o.$slots[t]=l[t]}),o}}},L=P,O=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=L(t,e,a);t.$loading=n,t.prototype.$loading=n};D.install=O;const F=D;return e=e["default"],e})())},"504c":function(t,e,a){var n=a("0d58"),i=a("6821"),s=a("52a7").f;t.exports=function(t){return function(e){var a,r=i(e),o=n(r),l=o.length,c=0,u=[];while(l>c)s.call(r,a=o[c++])&&u.push(t?[a,r[a]]:r[a]);return u}}},"839f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"vx-row",attrs:{id:"main-div"}},[e("div",{staticClass:"vx-col w-full mb-base"},[e("vx-card",{attrs:{id:"card-id",title:t.$t("editTransaction")}},[e("vx-card",{staticClass:"mt-5",attrs:{id:"internal-card",title:"","no-shadow":"","card-border":""}},[e("loading",{attrs:{active:t.isLoading,"can-cancel":!0},on:{"update:active":function(e){t.isLoading=e}}}),e("div",{staticClass:"vx-row mt-10"},[e("div",{staticClass:"vx-col w-1/5"},[e("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("selectItem"))+" ")]),e("v-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full",attrs:{label:"inventoryName",options:t.inventoryItems,reduce:function(t){return t.inventoryId},name:"inventoryName","data-vv-validate-on":"blur"},model:{value:t.item.inventoryId,callback:function(e){t.$set(t.item,"inventoryId",e)},expression:"item.inventoryId"}})],1),e("div",{staticClass:"vx-col sm:w-1/5 w-full mb-6"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full",attrs:{label:t.$t("quantity"),name:"quantity","data-vv-validate-on":"blur"},model:{value:t.item.quantity,callback:function(e){t.$set(t.item,"quantity",e)},expression:"item.quantity"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("quantity")))])],1),e("div",{staticClass:"vx-col w-1/5"},[e("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("selectTransactionReason"))+" ")]),e("v-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full",attrs:{label:"inventoryName",options:t.transactionReasons,reduce:function(t){return t.transactionReasonId},name:"inventoryName","data-vv-validate-on":"blur"},model:{value:t.item.transactionReasonId,callback:function(e){t.$set(t.item,"transactionReasonId",e)},expression:"item.transactionReasonId"}})],1),e("div",{staticClass:"vx-col w-1/5"},[e("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("selectTransactionType"))+" ")]),e("v-select",{staticClass:"w-full",attrs:{options:t.transactionTypes,name:"transactionType"},model:{value:t.item.transactionType,callback:function(e){t.$set(t.item,"transactionType","string"===typeof e?e.trim():e)},expression:"item.transactionType"}})],1),e("div",{staticClass:"vx-col w-1/5"},[e("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("pickSoldTransactionDate"))+" ")]),e("flat-pickr",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"validate",rawName:"v-validate:transactionDate",value:"required",expression:"'required'",arg:"transactionDate"}],staticClass:"w-full",attrs:{config:t.configdateTimePicker,name:"transactionDate",size:"medium"},model:{value:t.item.transactionDate,callback:function(e){t.$set(t.item,"transactionDate",e)},expression:"item.transactionDate"}}),e("span",{directives:[{name:"show",rawName:"v-show",value:t.errors.has("transactionDate"),expression:"errors.has('transactionDate')"}],staticClass:"text-danger"},[t._v(t._s(t.errors.first("transactionDate")))])],1),e("div",{staticClass:"vx-col sm:w-1/6 w-full mb-6"},[e("div",{staticClass:"vx-col w-full"},[e("br"),e("vs-button",{staticClass:"mr-3 mb-2",attrs:{color:"success"},on:{click:t.editTransaction}},[t._v(t._s(t.$t("update")))])],1)])])],1)],1)],1)])},i=[],s=(a("ac6a"),a("8615"),a("41cb"),a("7bb1")),r=a("aae5"),o=a.n(r),l=(a("0952"),a("4a7a")),c=a.n(l),u=a("18fa"),d=a.n(u),v={custom:{countryName:{required:"Please enter country type",alpha:"country type must be character"}}};s["a"].localize("en",v);var m={components:{"v-select":c.a,Loading:d.a,flatPickr:o.a},data:function(){return{configdateTimePicker:{enableTime:!0,dateFormat:"Y-m-dTH:i"},transactionTypes:["In","Out"],registerButtonClicked:!1,clicked:0,error:!1,isLoading:!1,customerInventoryTransactionId:this.$route.params.id,inventoryId:"",quantity:"",sellPrice:"",inventoryItems:[],item:{},searchKey:"",transactions:[],filteredInventories:[],userId:localStorage.getItem("userId"),transactionType:"",transactionReasonId:"",transactionDate:new Date,inventoryName:""}},methods:{getInstantFromDate:function(t){if(!(JSON.stringify(t).indexOf("Z")>0)){var e=t+":00Z";return e}},editTransaction:function(){var t=this;this.$validator.validateAll().then((function(e){e&&t.$http.put("/customer-inventory-transaction/"+t.customerInventoryTransactionId,{inventoryId:t.item.inventoryId,quantity:t.item.quantity,transactionType:t.item.transactionType,transactionReasonId:t.item.transactionReasonId,transactionDate:t.getInstantFromDate(t.item.transactionDate),customerId:t.userId}).then((function(e){t.$vs.notify({title:t.$t("Add"),text:t.$t("Updated Successfully!"),iconPack:"feather",icon:"icon-alert-circle",color:"success"}),t.$vs.loading.close(),t.$router.push({path:"/pages/customer/view-transaction"})})).catch((function(e){t.$vs.loading.close()}))}))},getAllInventoryTransactions:function(){var t=this;this.$http.get("/customer-inventory-transaction",{params:{searchKey:this.searchKey}}).then((function(e){t.transactions=e.data;var a=Object.values(t.transactions.reduce((function(t,e){var a=e.inventoryId,n=e.quantity,i=e.inventoryName,s=e.transactionType,r={inventoryId:a,quantity:0};return t[a]=t[a]||r,t[a].inventoryName=i,"Out"==s?t[a].quantity-=n:t[a].quantity+=n,t}),{}));t.filteredInventories=a.filter((function(t){return t.quantity>0})),t.inventoryItems=t.filteredInventories}))}},created:function(){var t=this;this.getAllInventoryTransactions();var e=this;this.$http.get("/customer-inventory-transaction/"+this.customerInventoryTransactionId,{params:{page:this.currentPage,limit:this.limit}}).then((function(t){e.item=t.data,this.responseGeted=!0})).catch((function(e){t.responseGeted=!0}))},updated:function(){}},p=m,h=a("2877"),f=Object(h["a"])(p,n,i,!1,null,null,null);e["default"]=f.exports},8615:function(t,e,a){var n=a("5ca1"),i=a("504c")(!1);n(n.S,"Object",{values:function(t){return i(t)}})}}]);
//# sourceMappingURL=chunk-4fc5bc0b.52521f22.js.map