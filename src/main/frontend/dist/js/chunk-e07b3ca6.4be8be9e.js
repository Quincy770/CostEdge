(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e07b3ca6"],{"18fa":function(e,t,a){(function(t,a){e.exports=a()})(0,()=>(()=>{"use strict";var e={};(()=>{e.d=(t,a)=>{for(var i in a)e.o(a,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:a[i]})}})(),(()=>{e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})();var t={};e.d(t,{default:()=>U});var a=function(){var e=this,t=e._self._c;return t("transition",{attrs:{name:e.transition}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive,expression:"isActive"}],staticClass:"vld-overlay is-active",class:{"is-full-page":e.isFullPage},style:{zIndex:e.zIndex},attrs:{tabindex:"0","aria-busy":e.isActive,"aria-label":"Loading"}},[t("div",{staticClass:"vld-background",style:e.bgStyle,on:{click:function(t){return t.preventDefault(),e.cancel.apply(null,arguments)}}}),t("div",{staticClass:"vld-icon"},[e._t("before"),e._t("default",(function(){return[t(e.loader,{tag:"component",attrs:{color:e.color,width:e.width,height:e.height}})]})),e._t("after")],2)])])},i=[];const s=e=>{"undefined"!==typeof e.remove?e.remove():e.parentNode.removeChild(e)},r=()=>"undefined"!==typeof window,n=r()?window.HTMLElement:Object,l={mounted(){this.enforceFocus&&document.addEventListener("focusin",this.focusIn)},methods:{focusIn(e){if(!this.isActive)return;if(e.target===this.$el||this.$el.contains(e.target))return;let t=this.container?this.container:this.isFullPage?null:this.$el.parentElement;(this.isFullPage||t&&t.contains(e.target))&&(e.preventDefault(),this.$el.focus())}},beforeDestroy(){document.removeEventListener("focusin",this.focusIn)}};var o=function(){var e=this,t=e._self._c;return t("svg",{attrs:{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:e.width,height:e.height,stroke:e.color}},[t("g",{attrs:{fill:"none","fill-rule":"evenodd"}},[t("g",{attrs:{transform:"translate(1 1)","stroke-width":"2"}},[t("circle",{attrs:{"stroke-opacity":".25",cx:"18",cy:"18",r:"18"}}),t("path",{attrs:{d:"M36 18c0-9.94-8.06-18-18-18"}},[t("animateTransform",{attrs:{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.8s",repeatCount:"indefinite"}})],1)])])])},c=[];const u={name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}},d=u;function h(e,t,a,i,s,r,n,l){var o,c="function"===typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=a,c._compiled=!0),i&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),n?(o=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),s&&s.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(n)},c._ssrRegister=o):s&&(o=l?function(){s.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:s),o)if(c.functional){c._injectStyles=o;var u=c.render;c.render=function(e,t){return o.call(t),u(e,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,o):[o]}return{exports:e,options:c}}var m=h(d,o,c,!1,null,null,null);const v=m.exports;var p=function(){var e=this,t=e._self._c;return t("svg",{attrs:{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:e.color,width:e.width,height:e.height}},[t("circle",{attrs:{cx:"15",cy:"15",r:"15"}},[t("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),t("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})]),t("circle",{attrs:{cx:"60",cy:"15",r:"9","fill-opacity":"0.3"}},[t("animate",{attrs:{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}}),t("animate",{attrs:{attributeName:"fill-opacity",from:"0.5",to:"0.5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"}})]),t("circle",{attrs:{cx:"105",cy:"15",r:"15"}},[t("animate",{attrs:{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}}),t("animate",{attrs:{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"}})])])},f=[];const b={name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}},g=b;var w=h(g,p,f,!1,null,null,null);const y=w.exports;var N=function(){var e=this,t=e._self._c;return t("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:e.height,width:e.width,fill:e.color}},[t("rect",{attrs:{x:"0",y:"13",width:"4",height:"5"}},[t("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}}),t("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}})]),t("rect",{attrs:{x:"10",y:"13",width:"4",height:"5"}},[t("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}}),t("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}})]),t("rect",{attrs:{x:"20",y:"13",width:"4",height:"5"}},[t("animate",{attrs:{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}}),t("animate",{attrs:{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}})])])},x=[];const C={name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}},_=C;var P=h(_,N,x,!1,null,null,null);const $=P.exports,k={Spinner:v,Dots:y,Bars:$},q={name:"vue-loading",mixins:[l],props:{active:Boolean,programmatic:Boolean,container:[Object,Function,n],isFullPage:{type:Boolean,default:!0},enforceFocus:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!1},transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:()=>{}},color:String,backgroundColor:String,blur:{type:String,default:"2px"},opacity:Number,width:Number,height:Number,zIndex:Number,loader:{type:String,default:"spinner"}},data(){return{isActive:this.active}},components:k,beforeMount(){this.programmatic&&(this.container?(this.isFullPage=!1,this.container.appendChild(this.$el)):document.body.appendChild(this.$el))},mounted(){this.programmatic&&(this.isActive=!0),document.addEventListener("keyup",this.keyPress)},methods:{cancel(){this.canCancel&&this.isActive&&(this.hide(),this.onCancel.apply(null,arguments))},hide(){this.$emit("hide"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(()=>{this.$destroy(),s(this.$el)},150))},disableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.add("vld-shown")},enableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.remove("vld-shown")},keyPress(e){27===e.keyCode&&this.cancel()}},watch:{active(e){this.isActive=e},isActive(e){e?this.disableScroll():this.enableScroll()}},computed:{bgStyle(){return{background:this.backgroundColor,opacity:this.opacity,backdropFilter:`blur(${this.blur})`}}},beforeDestroy(){document.removeEventListener("keyup",this.keyPress)}},F=q;var L=h(F,a,i,!1,null,null,null);const S=L.exports,M=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{show(){let i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a;const r={programmatic:!0},n=Object.assign({},t,i,r),l=new(e.extend(S))({el:document.createElement("div"),propsData:n}),o=Object.assign({},a,s);return Object.keys(o).map(e=>{l.$slots[e]=o[e]}),l}}},T=M,E=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=T(e,t,a);e.$loading=i,e.prototype.$loading=i};S.install=E;const U=S;return t=t["default"],t})())},"2e7c":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"vx-row",attrs:{id:"main-div"}},[t("div",{staticClass:"vx-col w-full mb-base"},[t("vx-card",{attrs:{id:"card-id",title:e.$t("updateUser")}},[t("vx-card",{staticClass:"mt-10",attrs:{id:"internal-card",title:"","no-shadow":"","card-border":""}},[t("div",{staticClass:"vx-row mt-10"},[t("loading",{attrs:{active:e.isLoading,"can-cancel":!0},on:{"update:active":function(t){e.isLoading=t}}}),t("div",{staticClass:"vx-col sm:w-1/4 w-full mb-6"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha",expression:"'required|alpha'"}],staticClass:"w-full",attrs:{label:e.$t("firstName"),name:"firstName","data-vv-validate-on":"blur"},model:{value:e.firstName,callback:function(t){e.firstName=t},expression:"firstName"}}),t("span",{staticClass:"text-danger"},[e._v(e._s(e.errors.first("firstName")))])],1),t("div",{staticClass:"vx-col sm:w-1/4 w-full mb-6"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha",expression:"'required|alpha'"}],staticClass:"w-full",attrs:{label:e.$t("fatherName"),name:"lastName","data-vv-validate-on":"blur"},model:{value:e.lastName,callback:function(t){e.lastName=t},expression:"lastName"}}),t("span",{staticClass:"text-danger"},[e._v(e._s(e.errors.first("lastName")))])],1),t("div",{staticClass:"vx-col sm:w-1/4 w-full mb-6"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha",expression:"'required|alpha'"}],staticClass:"w-full",attrs:{label:e.$t("grandFatherName"),name:"grandFatherName","data-vv-validate-on":"blur"},model:{value:e.grandFatherName,callback:function(t){e.grandFatherName=t},expression:"grandFatherName"}}),t("span",{staticClass:"text-danger"},[e._v(e._s(e.errors.first("grandFatherName")))])],1)],1),t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col sm:w-1/4 w-full mb-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:{regex:/^[' '][9]\d{8}$/},expression:"{ regex: (/^[' '][9]\\d{8}$/) }"}],staticClass:"w-full",attrs:{"icon-pack":"feather",icon:"icon-country-code","icon-no-border":"",label:e.$t("mobilePhone"),name:"mobilePhone","data-vv-validate-on":"blur"},on:{keyup:e.space},model:{value:e.mobilePhone,callback:function(t){e.mobilePhone=t},expression:"mobilePhone"}}),t("span",{staticClass:"text-danger"},[e._v(e._s(e.errors.first("mobilePhone")))]),t("span",{attrs:{id:"mobilePhone"}},[e._v(e._s(e.validateMobilePhone))])],1),t("div",{staticClass:"vx-col sm:w-1/4 w-full mb-2"},[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"w-full",attrs:{label:e.$t("Email"),name:"email","data-vv-validate-on":"blur"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.updateUser.apply(null,arguments)}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),t("span",{staticClass:"text-danger"},[e._v(e._s(e.errors.first("email")))])],1),t("div",{staticClass:"vx-col w-1/4 mb-6 mr-4 ml-1"},[t("span",{staticClass:"ml-2"},[e._v(e._s(e.$t("role")))]),t("v-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"validate",rawName:"v-validate:role",value:"required",expression:"'required'",arg:"role"}],staticClass:"w-full",class:{danger:e.errors.has("role")},attrs:{options:e.roles,name:"role"},model:{value:e.role,callback:function(t){e.role=t},expression:"role"}}),t("span",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("role"),expression:"errors.has('role')"}],staticClass:"text-danger"},[e._v(e._s(e.errors.first("role")))])],1)]),t("div",{staticClass:"vx-row"},[t("div",{staticClass:"vx-col w-3/4"},[t("vs-button",{staticClass:"mr-3 mb-2",staticStyle:{float:"right"},on:{click:e.updateUser}},[e._v(e._s(e.$t("Update")))])],1)]),t("p")])],1)],1)])},s=[],r=a("7bb1"),n=a("18fa"),l=a.n(n),o=(a("e40d"),a("4a7a")),c=a.n(o),u={custom:{firstName:{required:"First name is required",alpha:"First name must be characters"},lastName:{required:"Last name is required",alpha:"Last name must be characters"},grandFatherName:{required:"Grand fahter is required",alpha:"Grand Father name must be characters"},mobilePhone:{regex:"Invalid phone number format"},password:{required:"Password is required"},confirm_password:{required:"Password is required",alpha:"password must contain alphabets"},email:{required:"Email is required",email:"Please enter valid email"},company_name:{required:"company name is required",alpha_spaces:"company must be characters"},licence_number:{required:"licence number is required",alpha_dash:"Tin Number can contain characters, dashes, underscores and numbers"},tin_number:{required:"Tin Number is required",alpha_dash:"Tin Number can contain characters, dashes, underscores and numbers"}}};r["a"].localize("en",u);var d={components:{Loading:l.a,"v-select":c.a},data:function(){return{users:[],id:this.$route.params.id,firstName:"",lastName:"",grandFatherName:"",mobilePhone:"",email:"",role:"",roles:["Admin","Customer","Finance"],validateMobilePhone:"",isLoading:!1}},methods:{space:function(){var e=this.mobilePhone;this.mobilePhone.length<2&&" "!=this.mobilePhone&&(this.mobilePhone=" "+e),""==this.mobilePhone?this.validateMobilePhone="Please enter mobile phone":this.validateMobilePhone="",this.mobilePhone.length>10&&(this.mobilePhone=this.mobilePhone.substring(0,this.mobilePhone.length-1))},updateUser:function(){var e=this;""==this.mobilePhone&&(this.validateMobilePhone="Mobile phone is required"),this.$validator.validateAll().then((function(t){t&&""!=e.mobilePhone&&(e.isLoading=!0,e.$http.put("/accounts/"+e.id,{firstName:e.firstName,lastName:e.lastName,grandFatherName:e.grandFatherName,mobilePhone:"+251"+e.mobilePhone.substr(1),email:e.email,userType:e.role}).then((function(t){e.isLoading=!1,e.$vs.notify({title:e.$t("Update"),text:e.$t("Updated Successfully!"),iconPack:"feather",icon:"icon-alert-circle",color:"success"}),e.$router.push({path:"/pages/view-customer"})})).catch((function(t){e.isLoading=!1})))}))},getUserDetail:function(){var e=this;this.$http.get("/accounts/"+this.id,{}).then((function(t){e.users=t.data,e.firstName=e.users.firstName,e.lastName=e.users.lastName,e.grandFatherName=e.users.grandFatherName,e.mobilePhone=" "+e.users.mobilePhone.substr(4),e.email=e.users.email,e.role=e.users.userType,e.isLoading=!1})).catch((function(t){e.isLoading=!1}))}},created:function(){this.$store.getters["user/getUser"](this.id)?(this.users=this.$store.getters["user/getUser"](this.id),this.firstName=this.users.firstName,this.lastName=this.users.lastName,this.grandFatherName=this.users.grandFatherName,this.mobilePhone=" "+this.users.mobilePhone.substr(4),this.email=this.users.email,this.role=this.users.userType):this.getUserDetail()}},h=d,m=(a("c97f"),a("2877")),v=Object(m["a"])(h,i,s,!1,null,"3014307f",null);t["default"]=v.exports},3836:function(e,t,a){},c97f:function(e,t,a){"use strict";a("3836")},e40d:function(e,t,a){}}]);
//# sourceMappingURL=chunk-e07b3ca6.4be8be9e.js.map