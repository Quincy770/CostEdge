(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5fc7e7f9"],{"2ee4":function(t,e,a){!function(e,a){t.exports=a()}("undefined"!=typeof self&&self,(function(){return function(t){function e(i){if(a[i])return a[i].exports;var s=a[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var a={};return e.m=t,e.c=a,e.d=function(t,a,i){e.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=7)}([function(t,e){t.exports=function(t,e,a,i,s,n){var r,o=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(r=t,o=t.default);var l,d="function"==typeof o?o.options:o;if(e&&(d.render=e.render,d.staticRenderFns=e.staticRenderFns,d._compiled=!0),a&&(d.functional=!0),s&&(d._scopeId=s),n?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},d._ssrRegister=l):i&&(l=i),l){var u=d.functional,h=u?d.render:d.beforeCreate;u?(d._injectStyles=l,d.render=function(t,e){return l.call(e),h(t,e)}):d.beforeCreate=h?[].concat(h,l):[l]}return{esModule:r,exports:o,options:d}}},function(t,e,a){"use strict";var i=a(2),s=a(4),n=a(14);e.a={name:"form-wizard",components:{WizardButton:i.a,WizardStep:s.a},props:{title:{type:String,default:"Awesome Wizard"},subtitle:{type:String,default:"Split a complicated flow in multiple steps"},nextButtonText:{type:String,default:"Next"},backButtonText:{type:String,default:"Back"},finishButtonText:{type:String,default:"Finish"},hideButtons:{type:Boolean,default:!1},validateOnBack:Boolean,color:{type:String,default:"#e74c3c"},errorColor:{type:String,default:"#8b0000"},shape:{type:String,default:"circle"},layout:{type:String,default:"horizontal"},stepsClasses:{type:[String,Array],default:""},stepSize:{type:String,default:"md",validator:function(t){return-1!==["xs","sm","md","lg"].indexOf(t)}},transition:{type:String,default:""},startIndex:{type:Number,default:0,validator:function(t){return t>=0}}},provide:function(){return{addTab:this.addTab,removeTab:this.removeTab}},data:function(){return{activeTabIndex:0,currentPercentage:0,maxStep:0,loading:!1,tabs:[]}},computed:{slotProps:function(){return{nextTab:this.nextTab,prevTab:this.prevTab,activeTabIndex:this.activeTabIndex,isLastStep:this.isLastStep,fillButtonStyle:this.fillButtonStyle}},tabCount:function(){return this.tabs.length},isLastStep:function(){return this.activeTabIndex===this.tabCount-1},isVertical:function(){return"vertical"===this.layout},displayPrevButton:function(){return 0!==this.activeTabIndex},stepPercentage:function(){return 1/(2*this.tabCount)*100},progressBarStyle:function(){return{backgroundColor:this.color,width:this.progress+"%",color:this.color}},fillButtonStyle:function(){return{backgroundColor:this.color,borderColor:this.color,color:"white"}},progress:function(){return this.activeTabIndex>0?this.stepPercentage*(2*this.activeTabIndex+1):this.stepPercentage}},methods:{emitTabChange:function(t,e){this.$emit("on-change",t,e),this.$emit("update:startIndex",e)},addTab:function(t){var e=this.$slots.default.indexOf(t.$vnode);t.tabId=""+t.title.replace(/ /g,"")+e,this.tabs.splice(e,0,t),e<this.activeTabIndex+1&&(this.maxStep=e,this.changeTab(this.activeTabIndex+1,e))},removeTab:function(t){var e=this.tabs,a=e.indexOf(t);a>-1&&(a===this.activeTabIndex&&(this.maxStep=this.activeTabIndex-1,this.changeTab(this.activeTabIndex,this.activeTabIndex-1)),a<this.activeTabIndex&&(this.maxStep=this.activeTabIndex-1,this.activeTabIndex=this.activeTabIndex-1,this.emitTabChange(this.activeTabIndex+1,this.activeTabIndex)),e.splice(a,1))},reset:function(){this.maxStep=0,this.tabs.forEach((function(t){t.checked=!1})),this.navigateToTab(0)},activateAll:function(){this.maxStep=this.tabs.length-1,this.tabs.forEach((function(t){t.checked=!0}))},navigateToTab:function(t){var e=this,a=t>this.activeTabIndex;if(t<=this.maxStep){var i=function i(){a&&t-e.activeTabIndex>1?(e.changeTab(e.activeTabIndex,e.activeTabIndex+1),e.beforeTabChange(e.activeTabIndex,i)):(e.changeTab(e.activeTabIndex,t),e.afterTabChange(e.activeTabIndex))};a?this.beforeTabChange(this.activeTabIndex,i):(this.setValidationError(null),i())}return t<=this.maxStep},nextTab:function(){var t=this,e=function(){t.activeTabIndex<t.tabCount-1?(t.changeTab(t.activeTabIndex,t.activeTabIndex+1),t.afterTabChange(t.activeTabIndex)):t.$emit("on-complete")};this.beforeTabChange(this.activeTabIndex,e)},prevTab:function(){var t=this,e=function(){t.activeTabIndex>0&&(t.setValidationError(null),t.changeTab(t.activeTabIndex,t.activeTabIndex-1))};this.validateOnBack?this.beforeTabChange(this.activeTabIndex,e):e()},focusNextTab:function(){var t=Object(n.b)(this.tabs);if(-1!==t&&t<this.tabs.length-1){var e=this.tabs[t+1];e.checked&&Object(n.a)(e.tabId)}},focusPrevTab:function(){var t=Object(n.b)(this.tabs);if(-1!==t&&t>0){var e=this.tabs[t-1].tabId;Object(n.a)(e)}},setLoading:function(t){this.loading=t,this.$emit("on-loading",t)},setValidationError:function(t){this.tabs[this.activeTabIndex].validationError=t,this.$emit("on-error",t)},validateBeforeChange:function(t,e){var a=this;if(this.setValidationError(null),Object(n.c)(t))this.setLoading(!0),t.then((function(t){a.setLoading(!1);var i=!0===t;a.executeBeforeChange(i,e)})).catch((function(t){a.setLoading(!1),a.setValidationError(t)}));else{var i=!0===t;this.executeBeforeChange(i,e)}},executeBeforeChange:function(t,e){this.$emit("on-validate",t,this.activeTabIndex),t?e():this.tabs[this.activeTabIndex].validationError="error"},beforeTabChange:function(t,e){if(!this.loading){var a=this.tabs[t];if(a&&void 0!==a.beforeChange){var i=a.beforeChange();this.validateBeforeChange(i,e)}else e()}},afterTabChange:function(t){if(!this.loading){var e=this.tabs[t];e&&void 0!==e.afterChange&&e.afterChange()}},changeTab:function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=this.tabs[t],s=this.tabs[e];return i&&(i.active=!1),s&&(s.active=!0),a&&this.activeTabIndex!==e&&this.emitTabChange(t,e),this.activeTabIndex=e,this.activateTabAndCheckStep(this.activeTabIndex),!0},tryChangeRoute:function(t){this.$router&&t.route&&this.$router.push(t.route)},checkRouteChange:function(t){var e=-1,a=this.tabs.find((function(a,i){var s=a.route===t;return s&&(e=i),s}));if(a&&!a.active){var i=e>this.activeTabIndex;this.navigateToTab(e,i)}},deactivateTabs:function(){this.tabs.forEach((function(t){t.active=!1}))},activateTab:function(t){this.deactivateTabs();var e=this.tabs[t];e&&(e.active=!0,e.checked=!0,this.tryChangeRoute(e))},activateTabAndCheckStep:function(t){this.activateTab(t),t>this.maxStep&&(this.maxStep=t),this.activeTabIndex=t},initializeTabs:function(){this.tabs.length>0&&0===this.startIndex&&this.activateTab(this.activeTabIndex),this.startIndex<this.tabs.length?this.activateTabAndCheckStep(this.startIndex):window.console.warn("Prop startIndex set to "+this.startIndex+" is greater than the number of tabs - "+this.tabs.length+". Make sure that the starting index is less than the number of tabs registered")}},mounted:function(){this.initializeTabs()},watch:{"$route.path":function(t){this.checkRouteChange(t)}}}},function(t,e,a){"use strict";function i(t){a(10)}var s=a(3),n=a(11),r=a(0),o=i,c=r(s.a,n.a,!1,o,null,null);e.a=c.exports},function(t,e,a){"use strict";e.a={}},function(t,e,a){"use strict";function i(t){a(12)}var s=a(5),n=a(13),r=a(0),o=i,c=r(s.a,n.a,!1,o,null,null);e.a=c.exports},function(t,e,a){"use strict";e.a={name:"wizard-step",props:{tab:{type:Object,default:function(){}},transition:{type:String,default:""},index:{type:Number,default:0}},computed:{iconActiveStyle:function(){return{backgroundColor:this.tab.color}},stepCheckedStyle:function(){return{borderColor:this.tab.color}},errorStyle:function(){return{borderColor:this.tab.errorColor,backgroundColor:this.tab.errorColor}},stepTitleStyle:function(){return{color:this.tab.validationError?this.tab.errorColor:this.tab.color}},isStepSquare:function(){return"square"===this.tab.shape},isTabShape:function(){return"tab"===this.tab.shape}}}},function(t,e,a){"use strict";e.a={name:"tab-content",props:{title:{type:String,default:""},icon:{type:String,default:""},beforeChange:{type:Function},afterChange:{type:Function},route:{type:[String,Object]},additionalInfo:{type:Object,default:function(){}}},inject:["addTab","removeTab"],data:function(){return{active:!1,validationError:null,checked:!1,tabId:""}},computed:{shape:function(){return this.$parent.shape},color:function(){return this.$parent.color},errorColor:function(){return this.$parent.errorColor}},mounted:function(){this.addTab(this)},destroyed:function(){this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el),this.removeTab(this)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(8),s=a(16),n=a(2),r=a(4);a.d(e,"FormWizard",(function(){return i.a})),a.d(e,"TabContent",(function(){return s.a})),a.d(e,"WizardButton",(function(){return n.a})),a.d(e,"WizardStep",(function(){return r.a}));var o={install:function(t){t.component("form-wizard",i.a),t.component("tab-content",s.a),t.component("wizard-button",n.a),t.component("wizard-step",r.a)}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(o),e.default=o},function(t,e,a){"use strict";function i(t){a(9)}var s=a(1),n=a(15),r=a(0),o=i,c=r(s.a,n.a,!1,o,null,null);e.a=c.exports},function(t,e){},function(t,e){},function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("button",{staticClass:"wizard-btn",attrs:{tabindex:"-1",type:"button"}},[t._t("default")],2)},s=[],n={render:i,staticRenderFns:s};e.a=n},function(t,e){},function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{class:{active:t.tab.active}},[a("a",{class:{disabled:!t.tab.checked},attrs:{href:"javascript:void(0)"}},[a("div",{staticClass:"wizard-icon-circle md",class:{checked:t.tab.checked,square_shape:t.isStepSquare,tab_shape:t.isTabShape},style:[t.tab.checked?t.stepCheckedStyle:{},t.tab.validationError?t.errorStyle:{}],attrs:{role:"tab",tabindex:t.tab.checked?0:"",id:"step-"+t.tab.tabId,"aria-controls":t.tab.tabId,"aria-disabled":t.tab.active,"aria-selected":t.tab.active}},[a("transition",{attrs:{name:t.transition,mode:"out-in"}},[t.tab.active?a("div",{staticClass:"wizard-icon-container",class:{square_shape:t.isStepSquare,tab_shape:t.isTabShape},style:[t.tab.active?t.iconActiveStyle:{},t.tab.validationError?t.errorStyle:{}]},[t._t("active-step",[t.tab.icon?a("i",{staticClass:"wizard-icon",class:t.tab.icon}):a("i",{staticClass:"wizard-icon"},[t._v(t._s(t.index+1))])])],2):t._e(),t._v(" "),t.tab.active?t._e():t._t("default",[!t.tab.active&&t.tab.icon?a("i",{staticClass:"wizard-icon",class:t.tab.icon}):t._e(),t._v(" "),t.tab.active||t.tab.icon?t._e():a("i",{staticClass:"wizard-icon"},[t._v(t._s(t.index+1))])])],2)],1),t._v(" "),t._t("title",[a("span",{staticClass:"stepTitle",class:{active:t.tab.active,has_error:t.tab.validationError},style:t.tab.active?t.stepTitleStyle:{}},[t._v("\n            "+t._s(t.tab.title)+"\n      ")])])],2)])},s=[],n={render:i,staticRenderFns:s};e.a=n},function(t,e,a){"use strict";function i(){return document.activeElement.id}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=i();return t.findIndex((function(t){return t.tabId===e}))}function n(t){document.getElementById(t).focus()}function r(t){return t.then&&"function"==typeof t.then}e.b=s,e.a=n,e.c=r},function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"vue-form-wizard",class:[t.stepSize,{vertical:t.isVertical}],on:{keyup:[function(e){return"button"in e||!t._k(e.keyCode,"right",39,e.key)?"button"in e&&2!==e.button?null:void t.focusNextTab(e):null},function(e){return"button"in e||!t._k(e.keyCode,"left",37,e.key)?"button"in e&&0!==e.button?null:void t.focusPrevTab(e):null}]}},[a("div",{staticClass:"wizard-header"},[t._t("title",[a("h4",{staticClass:"wizard-title"},[t._v(t._s(t.title))]),t._v(" "),a("p",{staticClass:"category"},[t._v(t._s(t.subtitle))])])],2),t._v(" "),a("div",{staticClass:"wizard-navigation"},[t.isVertical?t._e():a("div",{staticClass:"wizard-progress-with-circle"},[a("div",{staticClass:"wizard-progress-bar",style:t.progressBarStyle})]),t._v(" "),a("ul",{staticClass:"wizard-nav wizard-nav-pills",class:t.stepsClasses,attrs:{role:"tablist"}},[t._l(t.tabs,(function(e,i){return t._t("step",[a("wizard-step",{attrs:{tab:e,"step-size":t.stepSize,transition:t.transition,index:i},nativeOn:{click:function(e){t.navigateToTab(i)},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.navigateToTab(i)}}})],{tab:e,index:i,navigateToTab:t.navigateToTab,stepSize:t.stepSize,transition:t.transition})}))],2),t._v(" "),a("div",{staticClass:"wizard-tab-content"},[t._t("default",null,null,t.slotProps)],2)]),t._v(" "),t.hideButtons?t._e():a("div",{staticClass:"wizard-card-footer clearfix"},[t._t("footer",[a("div",{staticClass:"wizard-footer-left"},[t.displayPrevButton?a("span",{attrs:{role:"button",tabindex:"0"},on:{click:t.prevTab,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.prevTab(e)}}},[t._t("prev",[a("wizard-button",{style:t.fillButtonStyle,attrs:{disabled:t.loading}},[t._v("\n              "+t._s(t.backButtonText)+"\n            ")])],null,t.slotProps)],2):t._e(),t._v(" "),t._t("custom-buttons-left",null,null,t.slotProps)],2),t._v(" "),a("div",{staticClass:"wizard-footer-right"},[t._t("custom-buttons-right",null,null,t.slotProps),t._v(" "),t.isLastStep?a("span",{attrs:{role:"button",tabindex:"0"},on:{click:t.nextTab,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.nextTab(e)}}},[t._t("finish",[a("wizard-button",{style:t.fillButtonStyle},[t._v("\n              "+t._s(t.finishButtonText)+"\n            ")])],null,t.slotProps)],2):a("span",{attrs:{role:"button",tabindex:"0"},on:{click:t.nextTab,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.nextTab(e)}}},[t._t("next",[a("wizard-button",{style:t.fillButtonStyle,attrs:{disabled:t.loading}},[t._v("\n            "+t._s(t.nextButtonText)+"\n           ")])],null,t.slotProps)],2)],2)],null,t.slotProps)],2)])},s=[],n={render:i,staticRenderFns:s};e.a=n},function(t,e,a){"use strict";var i=a(6),s=a(17),n=a(0),r=n(i.a,s.a,!1,null,null,null);e.a=r.exports},function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"active"}],staticClass:"wizard-tab-container",attrs:{role:"tabpanel",id:t.tabId,"aria-hidden":!t.active,"aria-labelledby":"step-"+t.tabId}},[t._t("default",null,{active:t.active})],2)},s=[],n={render:i,staticRenderFns:s};e.a=n}])}))},"7d84":function(t,e,a){"use strict";a("bf7e")},b4b1:function(t,e,a){"use strict";a.r(e),a.d(e,"emailAddress",(function(){return u}));var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"register h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"},[e("div",{staticClass:"vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4"},[e("vx-card",{attrs:{id:"card"}},[e("div",{staticClass:"full-page-bg-color",attrs:{slot:"no-body"},slot:"no-body"},[e("div",{staticClass:"vx-row no-gutter"},[e("div",{staticClass:"vx-col sm:w-full md:w-full mx-auto self-center d-theme-dark-bg"},[e("div",{staticClass:"p-8"},[e("p",[e("b",[t._v(t._s(t.$t("userRegistration")))]),e("span",{staticClass:"float-right"},[e("vs-dropdown",{staticClass:"cursor-pointer mr-4",attrs:{"vs-custom-content":"","vs-trigger-click":""}},[e("span",{staticClass:"cursor-pointer flex i18n-locale"},[e("img",{staticClass:"h-4 w-5",attrs:{src:a("1c99")("./".concat(t.$i18n.locale,".png")),alt:t.$i18n.locale}}),e("span",{staticClass:"hidden sm:block ml-2"},[t._v(t._s(t.getCurrentLocaleData.lang))])]),e("vs-dropdown-menu",{staticClass:"w-48 i18n-dropdown vx-navbar-dropdown"},[e("vs-dropdown-item",{on:{click:function(e){return t.updateLocale("en")}}},[e("img",{staticClass:"h-4 w-5 mr-1",attrs:{src:a("9996"),alt:"en"}}),t._v("  English\n          ")])],1)],1),e("b",[e("router-link",{attrs:{to:"/pages/login"}},[t._v(t._s(t.$t("Login")))])],1)],1)]),t.register?t._e():e("div",{staticClass:"mt-5"},[e("form-wizard",{attrs:{color:"rgba(var(--vs-primary), 1)",errorColor:"rgba(var(--vs-danger), 1)",title:null,subtitle:null,finishButtonText:t.$t("Register"),"buttons-hidden":"",nextButtonText:t.$t("Next"),backButtonText:t.$t("Back")}},[e("tab-content",{staticClass:"mb-5",attrs:{title:t.$t("personalInformation"),icon:"feather icon-user","before-change":t.validateStep1}},[e("form",{attrs:{"data-vv-scope":"step-1"}},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col md:w-1/4 w-full mt-5"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha",expression:"'required|alpha'"}],staticClass:"w-full",attrs:{label:t.$t("firstName"),name:"first_name"},model:{value:t.firstName,callback:function(e){t.firstName=e},expression:"firstName"}}),e("span",{staticClass:"text-danger",on:{change:function(e){return t.errors.has("step-1.first_name")}}},[t._v(t._s(t.errors.first("step-1.first_name")))])],1),e("div",{staticClass:"vx-col md:w-1/4 w-full mt-5"},[e("vs-input",{staticClass:"w-full",attrs:{label:t.$t("Middle Name"),name:"last_name"},model:{value:t.lastName,callback:function(e){t.lastName=e},expression:"lastName"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("step-1.last_name")))])],1),e("div",{staticClass:"vx-col md:w-1/4 w-full mt-5"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|alpha",expression:"'required|alpha'"}],staticClass:"w-full",attrs:{label:t.$t("Last Name"),name:"grand_father_name","data-vv-validate-on":"blur"},model:{value:t.grandFatherName,callback:function(e){t.grandFatherName=e},expression:"grandFatherName"}}),e("span",{staticClass:"text-danger"},[t._v("\n                            "+t._s(t.errors.first("step-1.grand_father_name")))])],1),e("div",{staticClass:"vx-col md:w-1/4 w-full mt-5"},[e("vs-input",{staticClass:"w-full",attrs:{"icon-pack":"feather",icon:"icon-country-code","icon-no-border":"",label:t.$t("mobilePhone"),name:"mobile_phone","data-vv-validate-on":"blur"},on:{keyup:t.space},model:{value:t.mm,callback:function(e){t.mm=e},expression:"mm"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("step-1.mobile_phone")))]),e("span",{attrs:{id:"mobilePhone"}},[t._v(t._s(t.validateMobilePhone))])],1),e("div",{staticClass:"vx-col md:w-1/4 w-full mt-5"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"w-full",attrs:{type:"email",label:t.$t("Email"),name:"email","data-vv-validate-on":"blur"},on:{change:t.checkEmailIfNotExist},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("step-1.email")))]),e("p",{attrs:{id:"checkPassword"}},[t._v(t._s(t.checkEmail))])],1),e("div",{staticClass:"vx-col md:w-1/4 w-full mt-5"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:6",expression:"'required|min:6'"}],staticClass:"w-full",attrs:{label:t.$t("Password"),type:"password",name:"password","data-vv-validate-on":"blur"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("step-1.password")))])],1),e("div",{staticClass:"vx-col md:w-1/4 w-full mt-5"},[e("vs-input",{staticClass:"w-full",attrs:{label:t.$t("confirmPassword"),type:"password",name:"confirm_password","data-vv-validate-on":"blur"},on:{change:t.passwordConfirm},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("step-1.confirm_password")))]),e("p",{attrs:{id:"checkPassword"}},[t._v(t._s(t.checkPassword))])],1)])])]),e("tab-content",{staticClass:"mb-5",attrs:{title:t.$t("companyInformation"),icon:"feather icon-briefcase","before-change":t.validateStep2}},[e("form",{attrs:{"data-vv-scope":"step-2"}},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col md:w-1/3 w-full"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full mt-4",attrs:{label:t.$t("companyName"),name:"company_name","data-vv-validate-on":"blur"},model:{value:t.companyName,callback:function(e){t.companyName=e},expression:"companyName"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("step-2.company_name")))])],1),e("div",{staticClass:"vx-col md:w-1/4 w-full"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full mt-4",attrs:{label:t.$t("licenceNumber"),name:"licence_number","data-vv-validate-on":"blur"},on:{keyup:t.convertToUpperCase},model:{value:t.licenceNumber,callback:function(e){t.licenceNumber=e},expression:"licenceNumber"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("step-2.licence_number")))])],1),e("div",{staticClass:"vx-col md:w-1/4 w-full"},[e("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full mt-4",attrs:{label:t.$t("tinNumber"),name:"tin_number","data-vv-validate-on":"blur"},on:{keyup:t.convertToUpperCase},model:{value:t.tinNumber,callback:function(e){t.tinNumber=e},expression:"tinNumber"}}),e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("step-2.tin_number")))])],1)])])]),e("loading",{attrs:{active:t.isLoading,"can-cancel":!0},on:{"update:active":function(e){t.isLoading=e}}}),t.register||t.error?t._e():e("tab-content",{staticClass:"mb-5",attrs:{title:t.$t("Summary"),icon:"feather icon-image","before-change":t.validateStep3}},[e("form",{attrs:{"data-vv-scope":"step-3"}},[e("vx-card",{staticClass:"mt-base",attrs:{title:""}},[e("b",[e("vs-row",{attrs:{type:"flex"}},[e("vs-col",{attrs:{"vs-type":"flex","vs-w":"6","vs-order":"3"}},[e("h3",[e("strong",[t._v(t._s(t.$t("personalInformation")))])])]),e("vs-col",{attrs:{"vs-type":"flex","vs-w":"6","vs-order":"3"}},[e("h3",[e("strong",[t._v(t._s(t.$t("companyInformation")))])])])],1)],1),e("vs-row",{attrs:{"vs-type":"flex"}},[e("vs-col",{attrs:{type:"flex","vs-w":"6","vs-order":"3"}},[e("div",{staticClass:"mt-5"},[e("h6",[t._v(t._s(t.$t("Name")))]),e("p",[t._v(t._s(t.firstName)+" "+t._s(t.lastName)+" "+t._s(t.grandFatherName))]),e("h6",[t._v(t._s(t.$t("mobilePhone")))]),e("p",[t._v(t._s(t.mobilePhone))]),e("h6",[t._v(t._s(t.$t("Email")))]),e("p",[t._v(t._s(t.email))])]),e("div",{staticClass:"mt-5"})]),e("vs-col",{attrs:{"vs-type":"flex","vs-w":"6","vs-order":"3"}},[e("div",{staticClass:"mt-8"},[e("h6",[e("b",[t._v(t._s(t.$t("companyName")))])]),e("p",[t._v(t._s(t.companyName))]),e("h6",[e("b",[t._v(t._s(t.$t("licenceNumber")))])]),e("p",[t._v(t._s(t.licenceNumber))]),e("h6",[e("b",[t._v(t._s(t.$t("tinNumber")))])]),e("p",[t._v(t._s(t.tinNumber))]),e("h6",[e("b",[t._v(t._s(t.$t("Region")))])]),e("p",[t._v(t._s(t.region))]),e("h6",[e("b",[t._v(t._s(t.$t("woredaCity")))])]),e("p",[t._v(t._s(t.woredaCity))]),e("h6",[e("b",[t._v(t._s(t.$t("Street")))])]),e("p",[t._v(t._s(t.street))])])])],1)],1)],1)]),1==t.error?e("tab-content",{staticClass:"mb-5",attrs:{title:"Summary",icon:"feather icon-image","before-change":t.validateStep3}},[e("form",{attrs:{"data-vv-scope":"step-3"}},[e("vx-card",{staticClass:"mt-base",attrs:{id:"success",title:"You have not registered due to some reason"}},[e("vs-row",{attrs:{"vs-type":"flex"}},[e("vs-col",{attrs:{type:"flex","vs-w":"10","vs-order":"3"}},[e("div",{staticClass:"mt-5",attrs:{color:"red"}},[e("h5",[t._v("Please check:")]),e("h6",[t._v("your connection")]),e("h6",[t._v("all fields are filled")]),e("strong",{})]),e("div",{staticClass:"mt-5"})])],1)],1)],1)]):t._e()],1)],1)])])])])])],1)])},s=[],n=a("4a7a"),r=a.n(n),o=a("2ee4"),c=(a("da93"),a("41cb"),a("3a10"),a("18fa")),l=a.n(c),d=(a("e40d"),a("7bb1")),u="",h={custom:{first_name:{required:"First name is required",alpha:"First name must be characters"},last_name:{required:"Last name is required",alpha:"Last name must be characters"},grand_father_name:{required:"Grand fahter name is required",alpha:"Grand Father name must be characters"},mobile_phone:{regex:"Invalid phone number format"},password:{required:"Password is required"},confirm_password:{required:"Password is required",alpha:"password must contain alphabets"},email:{required:"Email is required",email:"Please enter valid email"},company_name:{required:"company name is required",alpha_spaces:"company must be characters"},licence_number:{required:"licence number is required",alpha_dash:"Tin Number can contain characters, dashes, underscores and numbers"},tin_number:{required:"Tin Number is required",alpha_dash:"Tin Number can contain characters, dashes, underscores and numbers"},woredaCity:{required:"Woreda/City is required",alpha_dash:"Tin Number can contain characters, dashes, underscores and numbers"},street:{required:"Street is required",alpha_dash:"Tin Number can contain characters, dashes, underscores and numbers"},region:{required:"Region is required",alpha_dash:"Tin Number can contain characters, dashes, underscores and numbers"}}};d["a"].localize("en",h);var v={data:function(){return{firstName:"",lastName:"",grandFatherName:"",mobilePhone:"",email:"",password:"",confirmPassword:"",companyName:"",licenceNumber:"",tinNumber:"",region:"",woredaCity:"",street:"",regionId:3,options:[this.$t("Tigray"),this.$t("Afar"),this.$t("Oromia"),this.$t("Amhara"),this.$t("Gambiela"),this.$t("Harer"),this.$t("Somali"),this.$t("Debub Hzboch"),this.$t("Benshangul Gumuz"),this.$t("Addis Ababa"),this.$t("Driedawa")],regions:[],checkPassword:"",register:!1,responseStatus:!1,error:!1,checkEmail:"",comingData:"",validateMobilePhone:"",registerButtonClicked:!1,clicked:0,isLoading:!1}},methods:{updateLocale:function(t){this.$i18n.locale=t},space:function(){var t=this.mobilePhone;this.mobilePhone.length<2&&" "!=this.mobilePhone&&(this.mobilePhone=" "+t),""==this.mobilePhone?this.validateMobilePhone="Mobile phone is required":this.validateMobilePhone="",this.mobilePhone.length>10&&(this.mobilePhone=this.mobilePhone.substring(0,this.mobilePhone.length-1))},convertToUpperCase:function(){this.licenceNumber=this.licenceNumber.toUpperCase(),this.tinNumber=this.tinNumber.toUpperCase()},passwordConfirm:function(){this.password!=this.confirmPassword?this.checkPassword="Password mismatch":this.checkPassword=""},checkEmailIfNotExist:function(){var t=this;this.isLoading=!0,this.$http.get("accounts/checkemail/"+this.email).then((function(e){t.isLoading=!1,"Email exists"==e.data?t.checkEmail="This email already Exists":t.checkEmail=""})).catch((function(e){t.isLoading=!1,t.checkEmail="Server error"}))},validateStep1:function(){var t=this;return""==this.mobilePhone&&(this.validateMobilePhone="Mobile phone is required"),new Promise((function(e,a){t.$validator.validateAll("step-1").then((function(i){i&&(t.password==t.confirmPassword&&""==t.checkEmail&&""!=t.mobilePhone?e(!0):a("Correct all values"))}))}))},validateStep2:function(){var t=this;return this.register=!1,this.error=!1,new Promise((function(e,a){t.$validator.validateAll("step-2").then((function(t){t?e(!0):a("correct all values")}))}))},validateStep3:function(){var t=this;this.isLoading=!0,this.$http.post("/auth/signup",{firstName:this.firstName,lastName:this.lastName,grandFatherName:this.grandFatherName,mobilePhone:this.mobilePhone.substr(1),userType:"Customer",userStatus:"Active",email:this.email,password:this.password,companyId:"-1",companyName:this.companyName,licenceNumber:this.licenceNumber,tinNumber:this.tinNumber,companyStatus:"Active",regionId:this.regionId,woredaCity:this.woredaCity,street:this.street}).then((function(e){return t.isLoading=!1,t.clicked=1,t.error=!1,t.$store.state.confirm.email=t.email,t.$router.push({path:"/pages/login"}),new Promise((function(e,a){t.$validator.validateAll("step-3").then((function(t){t?e(!0):a("correct all values")}))}))})).catch((function(e){t.isLoading=!1,0==t.clicked&&(t.error=!0,t.registerButtonClicked=!1)}))},getRegions:function(){var t=this;this.$http.get("/region",{params:{page:this.currentPage,limit:this.perPage,searchKey:this.searchKey}}).then((function(e){t.regions=e.data,t.totalPage=e.data[0].totalPage,t.isLoading=!1})).catch((function(e){t.isLoading=!1}))}},created:function(){this.getRegions()},components:{FormWizard:o["FormWizard"],TabContent:o["TabContent"],"v-select":r.a,Loading:l.a},computed:{isNew:function(){return this.confirmedEmail=this.$store.state.confirm.email,""!=this.$store.state.confirm.email&&(this.confirmedEmail=this.$store.state.confirm.email,this.email=this.confirmedEmail,!0)},validateForm:function(){return!this.errors.any()&&""!=this.email&&""!=this.password},getCurrentLocaleData:function(){var t=this.$i18n.locale;return"en"==t?{flag:"us",lang:"English"}:"am"==t?{flag:"am",lang:"Amharic"}:void 0},checkMobilePhone:function(){this.mobilePhone,this.validateMobilePhone=""}}},b=v,m=(a("7d84"),a("2877")),f=Object(m["a"])(b,i,s,!1,null,null,null);e["default"]=f.exports},bf7e:function(t,e,a){},da93:function(t,e,a){}}]);
//# sourceMappingURL=chunk-5fc7e7f9.cd634e9f.js.map