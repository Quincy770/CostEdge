(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ab0fcb4"],{"18fa":function(t,e,i){(function(e,i){t.exports=i()})(0,()=>(()=>{"use strict";var t={};(()=>{t.d=(e,i)=>{for(var a in i)t.o(i,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:i[a]})}})(),(()=>{t.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e)})();var e={};t.d(e,{default:()=>A});var i=function(){var t=this,e=t._self._c;return e("transition",{attrs:{name:t.transition}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"vld-overlay is-active",class:{"is-full-page":t.isFullPage},style:{zIndex:t.zIndex},attrs:{tabindex:"0","aria-busy":t.isActive,"aria-label":"Loading"}},[e("div",{staticClass:"vld-background",style:t.bgStyle,on:{click:function(e){return e.preventDefault(),t.cancel.apply(null,arguments)}}}),e("div",{staticClass:"vld-icon"},[t._t("before"),t._t("default",(function(){return[e(t.loader,{tag:"component",attrs:{color:t.color,width:t.width,height:t.height}})]})),t._t("after")],2)])])},a=[];const n=t=>{"undefined"!==typeof t.remove?t.remove():t.parentNode.removeChild(t)},r=()=>"undefined"!==typeof window,s=r()?window.HTMLElement:Object,o={mounted(){this.enforceFocus&&document.addEventListener("focusin",this.focusIn)},methods:{focusIn(t){if(!this.isActive)return;if(t.target===this.$el||this.$el.contains(t.target))return;let e=this.container?this.container:this.isFullPage?null:this.$el.parentElement;(this.isFullPage||e&&e.contains(t.target))&&(t.preventDefault(),this.$el.focus())}},beforeDestroy(){document.removeEventListener("focusin",this.focusIn)}};var l=function(){var t=this,e=t._self._c;return e("svg",{attrs:{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:t.width,height:t.height,stroke:t.color}},[e("g",{attrs:{fill:"none","fill-rule":"evenodd"}},[e("g",{attrs:{transform:"translate(1 1)","stroke-width":"2"}},[e("circle",{attrs:{"stroke-opacity":".25",cx:"18",cy:"18",r:"18"}}),e("path",{attrs:{d:"M36 18c0-9.94-8.06-18-18-18"}},[e("animateTransform",{attrs:{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.8s",repeatCount:"indefinite"}})],1)])])])},c=[];const u={name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}},d=u;function m(t,e,i,a,n,r,s,o){var l,c="function"===typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=i,c._compiled=!0),a&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),s?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=l):n&&(l=o?function(){n.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:n),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(t,e){return l.call(e),u(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:c}}var h=m(d,l,c,!1,null,null,null);const v=h.exports;var p=function(){var t=this,e=t._self._c;return e("svg",{attrs:{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:t.color,width:t.width,height:t.height}},[e("circle",{attrs:{cx:"15",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"60",cy:"15",r:"9","fill-opacity":"0.3"}},[e("animate",{attrs:{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"0.5",to:"0.5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"}})]),e("circle",{attrs:{cx:"105",cy:"15",r:"15"}},[e("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})])])},f=[];const g={name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}},b=g;var y=m(b,p,f,!1,null,null,null);const w=y.exports;var L=function(){var t=this,e=t._self._c;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:t.height,width:t.width,fill:t.color}},[e("rect",{attrs:{x:"0",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"10",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}})]),e("rect",{attrs:{x:"20",y:"13",width:"4",height:"5"}},[e("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}}),e("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}})])])},C=[];const x={name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}},T=x;var _=m(T,L,C,!1,null,null,null);const $=_.exports,N={Spinner:v,Dots:w,Bars:$},k={name:"vue-loading",mixins:[o],props:{active:Boolean,programmatic:Boolean,container:[Object,Function,s],isFullPage:{type:Boolean,default:!0},enforceFocus:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!1},transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:()=>{}},color:String,backgroundColor:String,blur:{type:String,default:"2px"},opacity:Number,width:Number,height:Number,zIndex:Number,loader:{type:String,default:"spinner"}},data(){return{isActive:this.active}},components:N,beforeMount(){this.programmatic&&(this.container?(this.isFullPage=!1,this.container.appendChild(this.$el)):document.body.appendChild(this.$el))},mounted(){this.programmatic&&(this.isActive=!0),document.addEventListener("keyup",this.keyPress)},methods:{cancel(){this.canCancel&&this.isActive&&(this.hide(),this.onCancel.apply(null,arguments))},hide(){this.$emit("hide"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(()=>{this.$destroy(),n(this.$el)},150))},disableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.add("vld-shown")},enableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.remove("vld-shown")},keyPress(t){27===t.keyCode&&this.cancel()}},watch:{active(t){this.isActive=t},isActive(t){t?this.disableScroll():this.enableScroll()}},computed:{bgStyle(){return{background:this.backgroundColor,opacity:this.opacity,backdropFilter:`blur(${this.blur})`}}},beforeDestroy(){document.removeEventListener("keyup",this.keyPress)}},M=k;var S=m(M,i,a,!1,null,null,null);const I=S.exports,O=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{show(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;const r={programmatic:!0},s=Object.assign({},e,a,r),o=new(t.extend(I))({el:document.createElement("div"),propsData:s}),l=Object.assign({},i,n);return Object.keys(l).map(t=>{o.$slots[t]=l[t]}),o}}},P=O,F=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=P(t,e,i);t.$loading=a,t.prototype.$loading=a};I.install=F;const A=I;return e=e["default"],e})())},d5c7:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"vx-row",attrs:{id:"main-div"}},[e("div",{staticClass:"vx-col w-full mb-base"},[e("vx-card",{attrs:{id:"card-id",title:t.$t("editOrderTimeLimit")}},[e("vx-card",{staticClass:"mt-5",attrs:{id:"internal-card",title:"","no-shadow":"","card-border":""}},[e("loading",{attrs:{active:t.isLoading,"can-cancel":!0},on:{"update:active":function(e){t.isLoading=e}}}),e("div",{staticClass:"vx-row mt-10"},[e("div",{staticClass:"vx-col sm:w-1/4 w-full mb-6"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full",attrs:{label:t.$t("timeLimit"),name:"orderTimeLimit","data-vv-validate-on":"blur"},model:{value:t.orderTimeLimit,callback:function(e){t.orderTimeLimit=e},expression:"orderTimeLimit"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("orderTimeLimit")))])],1),e("div",{staticClass:"vx-col w-1/6 mb-6 mr-4 ml-1"},[e("span",{staticClass:"ml-2"},[t._v(t._s(t.$t("unit")))]),e("v-select",{staticClass:"w-full",attrs:{options:t.units,label:"unit",name:"unit"},model:{value:t.unit,callback:function(e){t.unit=e},expression:"unit"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("unit")))])],1),e("div",{staticClass:"vx-col sm:w-1/6 w-full mb-6"},[e("div",{staticClass:"vx-col w-full"},[e("br"),e("vs-button",{staticClass:"mr-3 mb-2",attrs:{color:"success"},on:{click:function(e){return t.editOrderTimeLimit()}}},[t._v(t._s(t.$t("save")))])],1)])])],1)],1)],1)])},n=[],r=(i("41cb"),i("7bb1")),s=i("aae5"),o=i.n(s),l=(i("0952"),i("4a7a")),c=i.n(l),u=i("18fa"),d=i.n(u),m={custom:{siteName:{required:"Please enter site name"}}};r["a"].localize("en",m);var h={components:{"v-select":c.a,Loading:d.a,flatPickr:o.a},data:function(){return{orderTimeLimit:"",timeLimitInMinute:"",unit:"",units:["Minute","Hour","Day","Month","Year"],isLoading:!1,paymentDateTime:"",configdateTimePicker:{enableTime:!0,dateFormat:"Y-m-dTH:i"},orderTimeLimitId:this.$route.params.orderTimeLimitId}},methods:{resetValues:function(){this.siteName=""},convertToMinute:function(){"Hour"==this.unit?this.timeLimitInMinute=60*this.orderTimeLimit:"Day"==this.unit?this.timeLimitInMinute=60*this.orderTimeLimit*24:"Month"==this.unit?this.timeLimitInMinute=60*this.orderTimeLimit*24*30:"Year"==this.unit?this.timeLimitInMinute=60*this.orderTimeLimit*24*30*12:this.timeLimitInMinute=this.orderTimeLimit},editOrderTimeLimit:function(){var t=this;this.convertToMinute(),this.$validator.validateAll().then((function(e){if(e){t.isLoading=!0;var i={timeLimit:t.timeLimitInMinute};t.$http.put("/order-time-limit/"+t.orderTimeLimitId,i).then((function(e){t.isLoading=!1,t.$vs.notify({title:t.$t("update"),text:t.$t("Updated Successfully!"),iconPack:"feather",icon:"icon-alert-circle",color:"success"}),t.$vs.loading.close(),t.$router.push({path:"/pages/view-order-time-limit"})})).catch((function(e){t.isLoading=!1}))}}))},getOrderTimeLimit:function(){var t=this;this.$http.get("/order-time-limit/"+this.orderTimeLimitId).then((function(e){t.orderTimeLimit=e.data.timeLimit,t.unit="Minute",t.isLoading=!1})).catch((function(e){t.isLoading=!1}))}},created:function(){this.getOrderTimeLimit()}},v=h,p=i("2877"),f=Object(p["a"])(v,a,n,!1,null,"57cc13a2",null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-3ab0fcb4.50258224.js.map