(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2232ad00"],{"18fa":function(t,e,a){(function(e,a){t.exports=a()})(0,()=>(()=>{"use strict";var t={};(()=>{t.d=(e,a)=>{for(var i in a)t.o(a,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:a[i]})}})(),(()=>{t.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e)})();var e={};t.d(e,{default:()=>I});var a=function(){var t=this,e=t._self._c;return e("transition",{attrs:{name:t.transition}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"vld-overlay is-active",class:{"is-full-page":t.isFullPage},style:{zIndex:t.zIndex},attrs:{tabindex:"0","aria-busy":t.isActive,"aria-label":"Loading"}},[e("div",{staticClass:"vld-background",style:t.bgStyle,on:{click:function(e){return e.preventDefault(),t.cancel.apply(null,arguments)}}}),e("div",{staticClass:"vld-icon"},[t._t("before"),t._t("default",(function(){return[e(t.loader,{tag:"component",attrs:{color:t.color,width:t.width,height:t.height}})]})),t._t("after")],2)])])},i=[];const r=t=>{"undefined"!==typeof t.remove?t.remove():t.parentNode.removeChild(t)},s=()=>"undefined"!==typeof window,n=s()?window.HTMLElement:Object,o={mounted(){this.enforceFocus&&document.addEventListener("focusin",this.focusIn)},methods:{focusIn(t){if(!this.isActive)return;if(t.target===this.$el||this.$el.contains(t.target))return;let e=this.container?this.container:this.isFullPage?null:this.$el.parentElement;(this.isFullPage||e&&e.contains(t.target))&&(t.preventDefault(),this.$el.focus())}},beforeDestroy(){document.removeEventListener("focusin",this.focusIn)}};var l=function(){var t=this,e=t._self._c;return e("svg",{attrs:{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:t.width,height:t.height,stroke:t.color}},[e("g",{attrs:{fill:"none","fill-rule":"evenodd"}},[e("g",{attrs:{transform:"translate(1 1)","stroke-width":"2"}},[e("circle",{attrs:{"stroke-opacity":".25",cx:"18",cy:"18",r:"18"}}),e("path",{attrs:{d:"M36 18c0-9.94-8.06-18-18-18"}},[e("animateTransform",{attrs:{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.8s",repeatCount:"indefinite"}})],1)])])])},c=[];const d={name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}},u=d;function h(t,e,a,i,r,s,n,o){var l,c="function"===typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=a,c._compiled=!0),i&&(c.functional=!0),s&&(c._scopeId="data-v-"+s),n?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},c._ssrRegister=l):r&&(l=o?function(){r.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:r),l)if(c.functional){c._injectStyles=l;var d=c.render;c.render=function(t,e){return l.call(e),d(t,e)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,l):[l]}return{exports:t,options:c}}var p=h(u,l,c,!1,null,null,null);const f=p.exports;var v=function(){var t=this,e=t._self._c;return e("svg",{attrs:{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:t.color,width:t.width,height:t.height}},[e("circle",{attrs:{cx:"15",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"60",cy:"15",r:"9","fill-opacity":"0.3"}},[e("animate",{attrs:{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"0.5",to:"0.5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"105",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})])])},m=[];const g={name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}},b=g;var y=h(b,v,m,!1,null,null,null);const _=y.exports;var w=function(){var t=this,e=t._self._c;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:t.height,width:t.width,fill:t.color}},[e("rect",{attrs:{x:"0",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"10",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"20",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}})])])},P=[];const C={name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}},k=C;var N=h(k,w,P,!1,null,null,null);const x=N.exports,L={Spinner:f,Dots:_,Bars:x},$={name:"vue-loading",mixins:[o],props:{active:Boolean,programmatic:Boolean,container:[Object,Function,n],isFullPage:{type:Boolean,default:!0},enforceFocus:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!1},transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:()=>{}},color:String,backgroundColor:String,blur:{type:String,default:"2px"},opacity:Number,width:Number,height:Number,zIndex:Number,loader:{type:String,default:"spinner"}},data(){return{isActive:this.active}},components:L,beforeMount(){this.programmatic&&(this.container?(this.isFullPage=!1,this.container.appendChild(this.$el)):document.body.appendChild(this.$el))},mounted(){this.programmatic&&(this.isActive=!0),document.addEventListener("keyup",this.keyPress)},methods:{cancel(){this.canCancel&&this.isActive&&(this.hide(),this.onCancel.apply(null,arguments))},hide(){this.$emit("hide"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(()=>{this.$destroy(),r(this.$el)},150))},disableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.add("vld-shown")},enableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.remove("vld-shown")},keyPress(t){27===t.keyCode&&this.cancel()}},watch:{active(t){this.isActive=t},isActive(t){t?this.disableScroll():this.enableScroll()}},computed:{bgStyle(){return{background:this.backgroundColor,opacity:this.opacity,backdropFilter:`blur(${this.blur})`}}},beforeDestroy(){document.removeEventListener("keyup",this.keyPress)}},S=$;var O=h(S,a,i,!1,null,null,null);const T=O.exports,M=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{show(){let i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a;const s={programmatic:!0},n=Object.assign({},e,i,s),o=new(t.extend(T))({el:document.createElement("div"),propsData:n}),l=Object.assign({},a,r);return Object.keys(l).map(t=>{o.$slots[t]=l[t]}),o}}},F=M,E=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=F(t,e,a);t.$loading=i,t.prototype.$loading=i};T.install=E;const I=T;return e=e["default"],e})())},1913:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return e("vx-card",[e("div",{staticClass:"mt-2"},[e("loading",{attrs:{active:t.isLoading,"can-cancel":!0,"is-full-page":t.fullPage},on:{"update:active":function(e){t.isLoading=e}}}),e("vx-card",{attrs:{id:"internal-card",title:"","no-shadow":"","card-border":""}},[e("div",[e("vs-table",{staticClass:"w-full ml-auto",attrs:{stripe:"","max-items":t.perPage,data:t.orders},scopedSlots:t._u([{key:"default",fn:function(a){var i=a.data;return t._l(i,(function(a,r){return e("vs-tr",{key:r,attrs:{data:a}},[e("vs-td",{staticClass:"py-0 text-left",attrs:{data:r}},[t._v(t._s(r+1))]),e("vs-td",{staticClass:"py-0 text-left",attrs:{data:i[r].orderNumber}},[t._v(t._s(i[r].orderNumber)+"\n                  ")]),e("vs-td",{staticClass:"py-0",attrs:{data:i[r].fullName}},[t._v(t._s(i[r].fullName))]),e("vs-td",{staticClass:"py-0",attrs:{data:i[r].companyName}},[t._v(t._s(i[r].companyName))]),null!=i[r].siteName?e("vs-td",{staticClass:"py-0",attrs:{data:i[r].deliveryTime}},[t._v("\n                    "+t._s(i[r].siteName))]):t._e(),e("vs-td",{staticClass:"py-0",attrs:{data:i[r].totalPrice}},[t._v("\n                    "+t._s(i[r].totalPrice.toLocaleString("en-US")))]),e("vs-td",{staticClass:"py-0",attrs:{data:i[r].orderId}},[e("vs-avatar",{attrs:{color:"warning",size:"small","icon-pack":"feather",icon:"icon-chevrons-right"},on:{click:function(e){return t.navigateToDetail(i[r].orderId)}}})],1)],1)}))}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[e("template",{slot:"header"},[e("div",[e("vs-dropdown",{staticClass:"mb-1",attrs:{"vs-custom-content":"","vs-trigger-click":""}},[e("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[e("span",{staticClass:"mr-2"},[e("p",[t._v(t._s((t.currentPage-1)*t.perPage+1)+"-"+t._s(t.currentPage*t.perPage)+" of "+t._s(t.totalPage*t.perPage))])]),e("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e("vs-dropdown-menu",[e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.setPageLimitPaid(10)}}},[t._v("10")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.setPageLimitPaid(20)}}},[t._v("20")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.setPageLimitPaid(30)}}},[t._v("30")])]),e("vs-dropdown-item",[e("span",{on:{click:function(e){return t.setPageLimitPaid(40)}}},[t._v("40")])])],1)],1)],1),e("div",{staticClass:"float-right",attrs:{id:"search"}},[e("vs-input",{staticClass:"w-full mx-2 input-rounded-full no-icon-border",attrs:{icon:"icon-search","icon-pack":"feather",placeholder:t.$t("searchHere")},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getOrders()}},model:{value:t.orderNumber,callback:function(e){t.orderNumber=e},expression:"orderNumber"}})],1)]),e("template",{slot:"thead"},[e("vs-th",[t._v("#")]),e("vs-th",{attrs:{"sort-key":"orderNumber"}},[t._v(t._s(t.$t("orderNumber")))]),e("vs-th",{attrs:{"sort-key":"fullName"}},[t._v(t._s(t.$t("User")))]),e("vs-th",{attrs:{"sort-key":"companyName"}},[t._v(t._s(t.$t("Company")))]),e("vs-th",{attrs:{"sort-key":"totalPrice"}},[t._v(t._s(t.$t("totalPrice")))]),e("vs-th",[t._v(t._s(t.$t("detail")))])],1)],2),e("vs-pagination",{staticClass:"m-4",attrs:{total:t.totalPage},on:{change:function(e){return t.getOrders()}},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)])],1)])},r=[],s=a("18fa"),n=a.n(s),o=(a("e40d"),{data:function(){return{filter:"",totalPage:"",orderNumber:"",perPage:"10",currentPage:"1",canceledOrders:[],paidOrders:[],postPaidOrders:[],orders:[],UnPaidOrders:[],searchPaid:"",searchUnPaid:"",searchPostPaid:"",searchCanceled:"",isLoading:!1,fullPage:!1}},methods:{getOrders:function(){var t=this;this.isLoading=!0,this.$http.get("order").then((function(e){t.orders=e.data,t.totalPage=e.data[0].totalPages,t.isLoading=!1})).catch((function(e){t.isLoading=!1}))},setPageLimitPaid:function(t){this.perPage=t,this.getPaidOrders()},setPageLimitUnPaid:function(t){this.perPage=t,this.getUnPaidOrders()},setPageLimitPostPaid:function(t){this.perPage=t,this.getPostPaidOrders()},setPageLimitCanceled:function(t){this.perPage=t,this.getCanceledOrders()},navigateToDetail:function(t){this.$router.push({path:"/pages/order/"+t})},navigateToSelectedDetail:function(t){this.$router.push({path:"/pages/order/"+t.orderId})}},created:function(){this.getOrders()},components:{Loading:n.a}}),l=o,c=a("2877"),d=Object(c["a"])(l,i,r,!1,null,null,null);e["default"]=d.exports},e40d:function(t,e,a){}}]);
//# sourceMappingURL=chunk-2232ad00.5205c612.js.map