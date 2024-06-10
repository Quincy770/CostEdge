(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5414b916"],{"1c0a":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"sidebar-demo"}},[t("sidebar-default"),t("sidebar-parent"),t("sidebar-static"),t("sidebar-group-collapsed"),t("sidebar-right"),t("sidebar-reduce-expand"),t("sidebar-custom")],1)},r=[],s=function(){var e=this,t=e._self._c;return t("vx-card",{attrs:{title:"Default","code-toggler":""}},[t("p",[e._v("One of the most common features is to have the hidden sidebar to show it when the user presses a button or makes an action, to add a sidebar we have the component vs-sidebar")]),t("vs-alert",{staticClass:"my-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[e._v("To add an internal link using "),t("a",{attrs:{href:"https://router.vuejs.org/",targte:"_blank"}},[e._v("vue-router")]),e._v(" you can do them simply by adding the property "),t("a",{attrs:{href:"https://router.vuejs.org/api/#to"}},[e._v("to")]),e._v(" as if it were a vue-router link.\n            "),t("br"),e._v("\n            In case you need an external link or normal html, simply do it with the href property")])]),t("vs-alert",{staticClass:"mb-1",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[e._v("To make the link is in an active state we have the property "),t("code",[e._v("v-model")])])]),t("div",{staticClass:"mt-5"},[t("div",{attrs:{id:"parentx-demo-1"}},[t("vs-button",{attrs:{color:"primary",type:"filled"},on:{click:function(t){e.active=!e.active}}},[e._v("Open Sidebar")]),t("vs-sidebar",{staticClass:"sidebarx sidebarpage",attrs:{parent:"body","default-index":"1",color:"primary",spacer:""},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[t("div",{staticClass:"header-sidebar",attrs:{slot:"header"},slot:"header"},[t("vs-avatar",{attrs:{size:"70px",src:"https://randomuser.me/api/portraits/men/85.jpg"}}),t("h4",[e._v("\n                            My Name\n                            "),t("vs-button",{attrs:{color:"primary",icon:"more_horiz",type:"flat"}})],1)],1),t("vs-sidebar-item",{attrs:{index:"1",icon:"question_answer"}},[e._v("\n                        Dashboard\n                    ")]),t("vs-sidebar-item",{attrs:{index:"2",icon:"gavel"}},[e._v("\n                        History\n                    ")]),t("vs-divider",{attrs:{icon:"person",position:"left"}},[e._v("\n                        User\n                    ")]),t("vs-sidebar-item",{attrs:{index:"3",icon:"verified_user"}},[e._v("\n                        Configurations\n                    ")]),t("vs-sidebar-item",{attrs:{index:"4",icon:"account_box"}},[e._v("\n                        Profile\n                    ")]),t("vs-sidebar-item",{attrs:{index:"5"}},[e._v("\n                        Card\n                    ")]),t("div",{staticClass:"footer-sidebar",attrs:{slot:"footer"},slot:"footer"},[t("vs-button",{attrs:{icon:"reply",color:"danger",type:"flat"}},[e._v("log out")]),t("vs-button",{attrs:{icon:"settings",color:"primary",type:"border"}})],1)],1)],1)]),t("template",{slot:"codeContainer"},[e._v('\n<template>\n\n  <div id="parentx-demo-1">\n\n    <vs-button @click="active=!active" color="primary" type="filled">Open Sidebar</vs-button>\n    <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">\n\n      <div class="header-sidebar" slot="header">\n        <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>\n\n        <h4>\n          My Name\n          <vs-button color="primary" icon="more_horiz" type="flat"></vs-button>\n        </h4>\n\n      </div>\n\n      <vs-sidebar-item index="1" icon="question_answer"> Dashboard </vs-sidebar-item>\n      <vs-sidebar-item index="2" icon="gavel"> History </vs-sidebar-item>\n\n      <vs-divider icon="person" position="left"> User </vs-divider>\n\n      <vs-sidebar-item index="3" icon="verified_user"> Configurations </vs-sidebar-item>\n      <vs-sidebar-item index="4" icon="account_box"> Profile </vs-sidebar-item>\n      <vs-sidebar-item index="5" > Card </vs-sidebar-item>\n\n      <div class="footer-sidebar" slot="footer">\n        <vs-button icon="reply" color="danger" type="flat">log out</vs-button>\n        <vs-button icon="settings" color="primary" type="border"></vs-button>\n      </div>\n\n    </vs-sidebar>\n  </div>\n\n</template>\n\n<script>\nexport default {\n  data:()=>({\n    active:false,\n  })\n}\n<\/script>\n\n<style lang="scss">\n.header-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  width: 100%;\n  h4 {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    > button {\n      margin-left: 10px;\n    }\n  }\n}\n\n.footer-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  > button {\n    border: 0px solid rgba(0, 0, 0, 0) !important;\n    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;\n    border-radius: 0px !important;\n  }\n}\n</style>\n        ')])],2)},a=[],o={data:function(){return{active:!1}}},d=o,c=(n("4550"),n("2877")),l=Object(c["a"])(d,s,a,!1,null,null,null),v=l.exports,p=function(){var e=this,t=e._self._c;return t("vx-card",{staticClass:"overflow-hidden",attrs:{title:"Parent","code-toggler":""}},[t("p",[e._v("You can change the parent of the sidebar with the property "),t("code",[e._v("parent")]),e._v(" that as a value requires an element of the DOM ("),t("strong",[e._v("#idx, .classx")]),e._v(") or a reference of Vuejs as "),t("code",[e._v("$refs.myrefContent")])]),t("vs-alert",{staticClass:"my-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[e._v("By default the parent of the sidebar is the body")])]),t("vs-alert",{staticClass:"mb-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[e._v("You can remove dark background(overlay) by setting "),t("code",[e._v("hidden-background")]),e._v(" prop to "),t("code",[e._v("true")])])]),t("div",{attrs:{slot:"no-body-bottom"},slot:"no-body-bottom"},[t("div",{staticClass:"relative",staticStyle:{height:"500px"},attrs:{id:"parentx-demo-2"}},[t("vs-button",{staticClass:"ml-6",attrs:{color:"primary",type:"filled"},on:{click:function(t){e.active=!e.active}}},[e._v("Open Sidebar")]),t("vs-sidebar",{staticClass:"sidebarx sidebarpage sidebar-demo-parent bordered-sidebar",attrs:{parent:"#parentx-demo-2","hidden-background":!0,"default-index":"1",color:"primary",spacer:""},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[t("div",{staticClass:"header-sidebar",attrs:{slot:"header"},slot:"header"},[t("vs-avatar",{attrs:{size:"70px",src:"https://randomuser.me/api/portraits/men/85.jpg"}}),t("h4",[e._v("\n\t\t\t\t\t\t\tMy Name\n\t\t\t\t\t\t\t"),t("vs-button",{attrs:{color:"primary",icon:"more_horiz",type:"flat"}})],1)],1),t("vs-sidebar-item",{attrs:{index:"1",icon:"question_answer"}},[e._v(" Dashboard ")]),t("vs-sidebar-item",{attrs:{index:"2",icon:"gavel"}},[e._v(" History ")]),t("vs-divider",{attrs:{icon:"person",position:"left"}},[e._v(" User ")]),t("vs-sidebar-item",{attrs:{index:"3",icon:"verified_user"}},[e._v(" Configurations ")]),t("vs-sidebar-item",{attrs:{index:"4",icon:"account_box"}},[e._v(" Profile ")]),t("vs-sidebar-item",{attrs:{index:"5"}},[e._v(" Card ")]),t("div",{staticClass:"footer-sidebar",attrs:{slot:"footer"},slot:"footer"},[t("vs-button",{attrs:{icon:"reply",color:"danger",type:"flat"}},[e._v("log out")]),t("vs-button",{attrs:{icon:"settings",color:"primary",type:"border"}})],1)],1)],1)]),t("template",{slot:"codeContainer"},[e._v('\n<template>\n\n  <div id="parentx-demo-2">\n\n    <vs-button @click="active=!active" color="primary" type="filled">Open Sidebar</vs-button>\n    <vs-sidebar parent="#parentx-demo-2" :hidden-background="true" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">\n\n      <div class="header-sidebar" slot="header">\n        <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>\n        <h4>\n          My Name\n          <vs-button color="primary" icon="more_horiz" type="flat"></vs-button>\n        </h4>\n\n      </div>\n\n      <vs-sidebar-item index="1" icon="question_answer"> Dashboard </vs-sidebar-item>\n      <vs-sidebar-item index="2" icon="gavel"> History </vs-sidebar-item>\n\n      <vs-divider icon="person" position="left"> User </vs-divider>\n\n      <vs-sidebar-item index="3" icon="verified_user"> Configurations </vs-sidebar-item>\n      <vs-sidebar-item index="4" icon="account_box"> Profile </vs-sidebar-item>\n      <vs-sidebar-item index="5" > Card </vs-sidebar-item>\n\n      <div class="footer-sidebar" slot="footer">\n        <vs-button icon="reply" color="danger" type="flat">log out</vs-button>\n        <vs-button icon="settings" color="primary" type="border"></vs-button>\n      </div>\n    </vs-sidebar>\n  </div>\n\n</template>\n\n<script>\nexport default {\n  data:()=>({\n    active:false,\n  })\n}\n<\/script>\n\n<style lang="scss">\n#parentx {\n  overflow: hidden;\n  height: 500px;\n  position: relative;\n}\n\n.header-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  width: 100%;\n  h4 {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    > button {\n      margin-left: 10px;\n    }\n  }\n}\n\n.footer-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  > button {\n    border: 0px solid rgba(0, 0, 0, 0) !important;\n    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;\n    border-radius: 0px !important;\n  }\n}\n</style>\n\t\t')])],2)},b=[],u={data:function(){return{active:!1}}},m=u,f=Object(c["a"])(m,p,b,!1,null,null,null),x=f.exports,y=function(){var e=this,t=e._self._c;return t("vx-card",{attrs:{title:"Static","code-toggler":""}},[t("p",[e._v("You can also use the sidebar in static mode with the property static")]),t("vs-alert",{staticClass:"mt-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[e._v("when putting the sidebar in static mode its position becomes relative for better manipulation")])]),t("div",[t("div",{staticClass:"parentx-static relative",staticStyle:{height:"500px"}},[t("vs-sidebar",{staticClass:"sidebarx sidebarpage bordered-sidebar",attrs:{"static-position":"","default-index":"1",color:"primary",spacer:""},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[t("div",{staticClass:"header-sidebar",attrs:{slot:"header"},slot:"header"},[t("vs-avatar",{attrs:{size:"70px",src:"https://randomuser.me/api/portraits/men/85.jpg"}}),t("h4",[e._v("\n\t\t\t\t\t\t\tMy Name\n\t\t\t\t\t\t\t"),t("vs-button",{attrs:{color:"primary",icon:"more_horiz",type:"flat"}})],1)],1),t("vs-sidebar-item",{attrs:{index:"1",icon:"question_answer"}},[e._v(" Dashboard ")]),t("vs-sidebar-item",{attrs:{index:"2",icon:"gavel"}},[e._v(" History ")]),t("vs-divider",{attrs:{icon:"person",position:"left"}},[e._v(" User ")]),t("vs-sidebar-item",{attrs:{index:"3",icon:"verified_user"}},[e._v(" Configurations ")]),t("vs-sidebar-item",{attrs:{index:"4",icon:"account_box"}},[e._v(" Profile ")]),t("vs-sidebar-item",{attrs:{index:"5"}},[e._v(" Card ")]),t("div",{staticClass:"footer-sidebar",attrs:{slot:"footer"},slot:"footer"},[t("vs-button",{attrs:{icon:"reply",color:"danger",type:"flat"}},[e._v("log out")]),t("vs-button",{attrs:{icon:"settings",color:"primary",type:"border"}})],1)],1)],1)]),t("template",{slot:"codeContainer"},[e._v('\n<template>\n\n  <div class="parentx-static">\n    <vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer v-model="active">\n\n      <div class="header-sidebar" slot="header">\n        <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>\n        <h4>\n          My Name\n          <vs-button color="primary" icon="more_horiz" type="flat"></vs-button>\n        </h4>\n\n      </div>\n\n      <vs-sidebar-item index="1" icon="question_answer"> Dashboard </vs-sidebar-item>\n\n      <vs-sidebar-item index="2" icon="gavel"> History </vs-sidebar-item>\n\n      <vs-divider icon="person" position="left"> User </vs-divider>\n\n      <vs-sidebar-item index="3" icon="verified_user"> Configurations </vs-sidebar-item>\n      <vs-sidebar-item index="4" icon="account_box"> Profile </vs-sidebar-item>\n      <vs-sidebar-item index="5" > Card </vs-sidebar-item>\n\n      <div class="footer-sidebar" slot="footer">\n        <vs-button icon="reply" color="danger" type="flat">log out</vs-button>\n        <vs-button icon="settings" color="primary" type="border"></vs-button>\n      </div>\n\n    </vs-sidebar>\n  </div>\n\n</template>\n\n<script>\nexport default {\n  data:()=>({\n    active:false,\n  })\n}\n<\/script>\n\n<style lang="scss">\n.parentx-static {\n  overflow: hidden;\n  height: 500px;\n  position: relative;\n}\n\n.header-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  width: 100%;\n  h4 {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    > button {\n      margin-left: 10px;\n    }\n  }\n}\n\n.footer-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  > button {\n    border: 0px solid rgba(0, 0, 0, 0) !important;\n    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;\n    border-radius: 0px !important;\n  }\n}\n</style>\n\t\t')])],2)},h=[],g={data:function(){return{active:!1}}},_=g,C=Object(c["a"])(_,y,h,!1,null,null,null),w=C.exports,S=function(){var e=this,t=e._self._c;return t("vx-card",{attrs:{title:"Group Collapsed","code-toggler":""}},[t("p",[e._v("You can have groups of sub menus with the component "),t("code",[e._v("vs-sidebar-group")]),e._v(" that as a required parameter we have the "),t("code",[e._v("title")]),e._v(", you can add as many groups as you need, including internally from the same component")]),t("vs-alert",{staticClass:"mt-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[e._v("By default the component is closed but if you need to initialize open you can use the property "),t("code",[e._v("open")])])]),t("div",{staticClass:"mt-5"},[t("div",{attrs:{id:"parentx-demo-4"}},[t("vs-button",{attrs:{color:"primary",type:"filled"},on:{click:function(t){e.active=!e.active}}},[e._v("Open Sidebar")]),t("vs-sidebar",{staticClass:"sidebarx sidebarpage",attrs:{parent:"body","default-index":"1",color:"primary",spacer:""},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[t("div",{staticClass:"header-sidebar",attrs:{slot:"header"},slot:"header"},[t("vs-avatar",{attrs:{size:"70px",src:"https://randomuser.me/api/portraits/men/85.jpg"}}),t("h4",[e._v("\n\t\t\t\t\t\t\tMy Name\n\t\t\t\t\t\t\t"),t("vs-button",{attrs:{color:"primary",icon:"more_horiz",type:"flat"}})],1)],1),t("vs-sidebar-group",{attrs:{title:"Aplication"}},[t("vs-sidebar-item",{attrs:{index:"1",icon:"question_answer"}},[e._v(" Dashboard ")]),t("vs-sidebar-group",{attrs:{title:"Store"}},[t("vs-sidebar-item",{attrs:{index:"2.1",icon:"store"}},[e._v(" Store ")]),t("vs-sidebar-item",{attrs:{index:"2.2",icon:"nature_people"}},[e._v(" Nature ")]),t("vs-sidebar-item",{attrs:{index:"2.3",icon:"style"}},[e._v(" Style ")])],1),t("vs-sidebar-item",{attrs:{index:"2",icon:"gavel"}},[e._v(" History ")]),t("vs-sidebar-item",{attrs:{index:"3",icon:"https"}},[e._v(" Security ")]),t("vs-sidebar-item",{attrs:{index:"4",icon:"help"}},[e._v(" Help ")])],1),t("vs-divider",{attrs:{icon:"person",position:"left"}},[e._v(" User ")]),t("vs-sidebar-item",{attrs:{index:"5",icon:"verified_user"}},[e._v(" Configurations ")]),t("vs-sidebar-item",{attrs:{index:"6",icon:"account_box"}},[e._v(" Profile ")]),t("div",{staticClass:"footer-sidebar",attrs:{slot:"footer"},slot:"footer"},[t("vs-button",{attrs:{icon:"reply",color:"danger",type:"flat"}},[e._v("log out")]),t("vs-button",{attrs:{icon:"settings",color:"primary",type:"border"}})],1)],1)],1)]),t("template",{slot:"codeContainer"},[e._v('\n<template lang="html">\n\n  <div id="parentx-demo-4">\n\n    <vs-button @click="active=!active" color="primary" type="filled">Open Sidebar</vs-button>\n    <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">\n\n      <div class="header-sidebar" slot="header">\n        <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>\n        <h4>\n          My Name\n          <vs-button color="primary" icon="more_horiz" type="flat"></vs-button>\n        </h4>\n\n      </div>\n      <vs-sidebar-group title="Aplication">\n        <vs-sidebar-item index="1" icon="question_answer"> Dashboard </vs-sidebar-item>\n\n        <vs-sidebar-group title="Store">\n          <vs-sidebar-item index="2.1" icon="store"> Store </vs-sidebar-item>\n          <vs-sidebar-item index="2.2" icon="nature_people"> Nature </vs-sidebar-item>\n          <vs-sidebar-item index="2.3" icon="style"> Style </vs-sidebar-item>\n        </vs-sidebar-group>\n\n        <vs-sidebar-item index="2" icon="gavel"> History </vs-sidebar-item>\n        <vs-sidebar-item index="3" icon="https"> Security </vs-sidebar-item>\n        <vs-sidebar-item index="4" icon="help"> Help </vs-sidebar-item>\n      </vs-sidebar-group>\n\n\n      <vs-divider icon="person" position="left"> User </vs-divider>\n\n      <vs-sidebar-item index="5" icon="verified_user"> Configurations </vs-sidebar-item>\n      <vs-sidebar-item index="6" icon="account_box"> Profile </vs-sidebar-item>\n\n      <div class="footer-sidebar" slot="footer">\n        <vs-button icon="reply" color="danger" type="flat">log out</vs-button>\n        <vs-button icon="settings" color="primary" type="border"></vs-button>\n      </div>\n\n    </vs-sidebar>\n  </div>\n\n</template>\n\n<script>\nexport default {\n  data:()=>({\n    active:false,\n  })\n}\n<\/script>\n\n<style lang="scss">\n.header-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  width: 100%;\n  h4 {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    > button {\n      margin-left: 10px;\n    }\n  }\n}\n\n.footer-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  > button {\n    border: 0px solid rgba(0, 0, 0, 0) !important;\n    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;\n    border-radius: 0px !important;\n  }\n}\n</style>\n\t\t')])],2)},k=[],j={data:function(){return{active:!1}}},D=j,z=Object(c["a"])(D,S,k,!1,null,null,null),O=z.exports,H=function(){var e=this,t=e._self._c;return t("vx-card",{attrs:{title:"Open on the right","code-toggler":""}},[t("p",[e._v("You can also choose where you'd like the sidebar to appear, right or left? By default, a sidebar will be located on the left of the screen but sometimes, a right-screened sidebar is really useful!")]),t("vs-alert",{staticClass:"mb-1",attrs:{icon:"warning",active:"true",color:"warning"}},[t("span",[e._v("A "),t("code",[e._v("static")]),e._v(" sidebar will not appear on the right.")])]),t("div",{staticClass:"mt-5"},[t("div",{attrs:{id:"parentx-demo-5"}},[t("vs-button",{attrs:{color:"primary",type:"filled"},on:{click:function(t){e.active=!e.active}}},[e._v("Open Sidebar")]),t("vs-sidebar",{staticClass:"sidebarx sidebarpage",attrs:{"position-right":"",parent:"body","default-index":"1",color:"primary",spacer:""},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[t("div",{staticClass:"header-sidebar",attrs:{slot:"header"},slot:"header"},[t("vs-avatar",{attrs:{size:"70px",src:"https://randomuser.me/api/portraits/men/85.jpg"}}),t("h4",[e._v("\n\t\t\t\t\t\t\tMy Name\n\t\t\t\t\t\t\t"),t("vs-button",{attrs:{color:"primary",icon:"more_horiz",type:"flat"}})],1)],1),t("vs-sidebar-item",{attrs:{index:"1",icon:"question_answer"}},[e._v(" Dashboard ")]),t("vs-sidebar-item",{attrs:{index:"2",icon:"gavel"}},[e._v(" History ")]),t("vs-divider",{attrs:{icon:"person",position:"left"}},[e._v(" User ")]),t("vs-sidebar-item",{attrs:{index:"3",icon:"verified_user"}},[e._v(" Configurations ")]),t("vs-sidebar-item",{attrs:{index:"4",icon:"account_box"}},[e._v(" Profile ")]),t("vs-sidebar-item",{attrs:{index:"5"}},[e._v(" Card ")]),t("div",{staticClass:"footer-sidebar",attrs:{slot:"footer"},slot:"footer"},[t("vs-button",{attrs:{icon:"reply",color:"danger",type:"flat"}},[e._v("log out")]),t("vs-button",{attrs:{icon:"settings",color:"primary",type:"border"}})],1)],1)],1)]),t("template",{slot:"codeContainer"},[e._v('\n<template>\n\n  <div id="parentx-demo-5">\n\n    <vs-button @click="active=!active" color="primary" type="filled">Open Sidebar</vs-button>\n    <vs-sidebar position-right  parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">\n\n      <div class="header-sidebar" slot="header">\n        <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>\n        <h4>\n          My Name\n          <vs-button color="primary" icon="more_horiz" type="flat"></vs-button>\n        </h4>\n\n      </div>\n\n      <vs-sidebar-item index="1" icon="question_answer"> Dashboard </vs-sidebar-item>\n      <vs-sidebar-item index="2" icon="gavel"> History </vs-sidebar-item>\n\n      <vs-divider icon="person" position="left"> User </vs-divider>\n\n      <vs-sidebar-item index="3" icon="verified_user"> Configurations </vs-sidebar-item>\n      <vs-sidebar-item index="4" icon="account_box"> Profile </vs-sidebar-item>\n      <vs-sidebar-item index="5" > Card </vs-sidebar-item>\n\n      <div class="footer-sidebar" slot="footer">\n        <vs-button icon="reply" color="danger" type="flat">log out</vs-button>\n        <vs-button icon="settings" color="primary" type="border"></vs-button>\n      </div>\n    </vs-sidebar>\n  </div>\n\n</template>\n\n<script>\nexport default {\n  data:()=>({\n    active:false,\n  })\n}\n<\/script>\n\n<style lang="scss">\n.header-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  width: 100%;\n  h4 {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    > button {\n      margin-left: 10px;\n    }\n  }\n}\n\n.footer-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  > button {\n    border: 0px solid rgba(0, 0, 0, 0) !important;\n    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;\n    border-radius: 0px !important;\n  }\n}\n</style>\n\t\t')])],2)},E=[],P={data:function(){return{active:!1}}},q=P,N=Object(c["a"])(q,H,E,!1,null,null,null),M=N.exports,U=function(){var e=this,t=e._self._c;return t("vx-card",{attrs:{title:"Reduce and Expand","code-toggler":""}},[t("p",[e._v("You can have a reduced sidebar with the "),t("code",[e._v("reduce")]),e._v(" property which by default makes the sidebar look reduced and when hover expands, if you do not want the functionality to expand when hovering you can remove it with the "),t("code",[e._v("reduce-not-hover-expand")]),e._v(" property")]),t("vs-alert",{staticClass:"mt-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[e._v("You can remove the bounce animation by opening the sidebar with the prop "),t("code",[e._v("reduce-not-rebound")])])]),t("div",{staticClass:"mt-5"},[t("div",{attrs:{id:"parentx-demo-6"}},[t("vs-button",{staticClass:"mr-4",attrs:{color:"success",type:"gradient"},on:{click:function(t){e.active=!e.active,e.notExpand=!1}}},[e._v("Open Sidebar Reduce-expand")]),t("vs-button",{staticClass:"mt-4",attrs:{color:"success",type:"gradient"},on:{click:function(t){e.active=!e.active,e.notExpand=!0}}},[e._v("Open Sidebar Reduce-only")]),t("vs-sidebar",{staticClass:"sidebarx sidebarpage",attrs:{reduce:e.reduce,"reduce-not-hover-expand":e.notExpand,parent:"body","default-index":"1",color:"success",spacer:""},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[t("div",{staticClass:"header-sidebar",attrs:{slot:"header"},slot:"header"},[t("vs-avatar",{attrs:{size:"70px",src:"https://randomuser.me/api/portraits/men/85.jpg"}})],1),t("vs-sidebar-group",{attrs:{open:"",title:"Application"}},[t("vs-sidebar-item",{attrs:{index:"1",icon:"menu"},on:{click:function(t){e.reduce=!e.reduce}}},[e._v(" Toggle Sidebar ")]),t("vs-sidebar-item",{attrs:{index:"5",icon:"verified_user"}},[e._v(" Configurations ")]),t("vs-sidebar-group",{attrs:{title:"Store"}},[t("vs-sidebar-item",{attrs:{index:"2.1",icon:"store"}},[e._v(" Store ")]),t("vs-sidebar-item",{attrs:{index:"2.2",icon:"nature_people"}},[e._v(" Nature ")]),t("vs-sidebar-item",{attrs:{index:"2.3",icon:"style"}},[e._v(" Style ")])],1),t("vs-sidebar-item",{attrs:{index:"2",icon:"gavel"}},[e._v(" History ")]),t("vs-sidebar-item",{attrs:{index:"3",icon:"https"}},[e._v(" Security ")]),t("vs-sidebar-item",{attrs:{index:"4",icon:"help"}},[e._v(" Help\n\t\t\t\t\t\t")])],1),t("vs-divider",{attrs:{icon:"person",position:"left"}},[e._v(" User ")]),t("vs-sidebar-item",{attrs:{index:"6",icon:"account_box"}},[e._v(" Profile ")]),t("div",{staticClass:"footer-sidebar",attrs:{slot:"footer"},slot:"footer"},[t("vs-button",{attrs:{icon:"settings",color:"primary",type:"border"}})],1)],1)],1)]),t("template",{slot:"codeContainer"},[e._v('\n<template>\n\n  <div id="parentx-demo-6">\n    <vs-button @click="active=!active, notExpand = false" color="success" type="filled">Open Sidebar Reduce-expand</vs-button>\n    <vs-button @click="active=!active, notExpand = true" color="success" type="filled">Open Sidebar Reduce-only</vs-button>\n    \n    <vs-sidebar :reduce="reduce" :reduce-not-hover-expand="notExpand" parent="body" default-index="1"  color="success" class="sidebarx" spacer v-model="active">\n\n      <div class="header-sidebar" slot="header">\n        <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>\n      </div>\n      <vs-sidebar-group open title="Application">\n        <vs-sidebar-item index="1" icon="menu" @click="reduce=!reduce"> Toggle Sidebar </vs-sidebar-item>\n        <vs-sidebar-item index="5" icon="verified_user"> Configurations </vs-sidebar-item>\n\n        <vs-sidebar-group title="Store">\n          <vs-sidebar-item index="2.1" icon="store"> Store </vs-sidebar-item>\n          <vs-sidebar-item index="2.2" icon="nature_people"> Nature </vs-sidebar-item>\n          <vs-sidebar-item index="2.3" icon="style"> Style </vs-sidebar-item>\n        </vs-sidebar-group>\n\n        <vs-sidebar-item index="2" icon="gavel"> History </vs-sidebar-item>\n        <vs-sidebar-item index="3" icon="https"> Security </vs-sidebar-item>\n        <vs-sidebar-item index="4" icon="help"> Help </vs-sidebar-item>\n      </vs-sidebar-group>\n\n\n      <vs-divider icon="person" position="left"> User </vs-divider>\n\n      <vs-sidebar-item index="6" icon="account_box"> Profile </vs-sidebar-item>\n\n      <div class="footer-sidebar" slot="footer">\n        <vs-button icon="settings" color="primary" type="border"></vs-button>\n      </div>\n    </vs-sidebar>\n  </div>\n\n</template>\n\n<script>\nexport default {\n  data:()=>({\n    active:false,\n    notExpand: false,\n    reduce: true\n  })\n}\n<\/script>\n\n<style lang="scss">\n.header-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  width: 100%;\n  h4 {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    > button {\n      margin-left: 10px;\n    }\n  }\n}\n\n.footer-sidebar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  > button {\n    border: 0px solid rgba(0, 0, 0, 0) !important;\n    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;\n    border-radius: 0px !important;\n  }\n}\n</style>\n\t\t')])],2)},I=[],Y={data:function(){return{active:!1,notExpand:!1,reduce:!0}}},A=Y,R=Object(c["a"])(A,U,I,!1,null,null,null),T=R.exports,V=function(){var e=this,t=e._self._c;return t("vx-card",{attrs:{title:"Custom Sidebar","code-toggler":""}},[t("p",[e._v("With custom sidebar you can create sidebar items and groups using "),t("strong",[e._v(" list of object")]),e._v(".")]),t("p",[e._v("You can also use feather icons in sidebar group and sidebar items using icon property. Check out all feather icons "),t("a",{attrs:{href:"https://vue-feather-icons.netlify.com/",target:"_blank",rel:"nofollow"}},[e._v("here")])]),t("p",{staticClass:"mt-3"},[e._v("Main sidebar on left side is demo of Custom Sidebar. You can check full code by clicking on code-toggler icon of this card.")]),t("template",{slot:"codeContainer"},[e._v('\n<template>\n  <vx-sidebar\n    :sidebarItems="sidebarItems"\n    title="Custom"\n    :logo="require(\'@/assets/images/logo/logo.png\')"\n</template>\n\n<script>\nimport VxSidebar from "@/layouts/components/vx-sidebar/VxSidebar.vue";\n\nexport default {\n  data: () => ({\n    showSidebar: false,\n    sidebarItems: [\n      {\n        url: "/",\n        name: "Dashboard",\n        slug: "dashboardAnalytics",\n        icon: "HomeIcon",\n        i18n: "Dashboard",\n      },\n      {\n        url: "/ui-elements/colors",\n        name: "Colors",\n        slug: "colors",\n        icon: "DropletIcon",\n        i18n: "Colors",\n      },\n      {\n        header: "Extensions",\n        i18n: "Extensions",\n      },\n      {\n        url: \'/extensions/select\',\n        name: "Select",\n        icon: "PocketIcon",\n        slug: "extraComponentSelect",\n        i18n: "Select",\n      },\n      {\n        url: \'/extensions/quill-editor\',\n        name: "Quill Editor",\n        icon: "EditIcon",\n        slug: "extraComponentQuillEditor",\n        i18n: "QuillEditor",\n      },\n      {\n        url: \'/extensions/drag-and-drop\',\n        name: "Drag & Drop",\n        icon: "DropletIcon",\n        slug: "extraComponentDragAndDrop",\n        i18n: "DragAndDrop",\n      },\n      {\n        url: \'/extensions/datepicker\',\n        name: "Datepicker",\n        icon: "CalendarIcon",\n        slug: "extraComponentDatepicker",\n        i18n: "Datepicker",\n      },\n    ]\n  }),\n  components: {\n    VxSidebar\n  }\n}\n<\/script>\n        ')])],2)},B=[],Q={},G=Object(c["a"])(Q,V,B,!1,null,null,null),J=G.exports,W={components:{SidebarDefault:v,SidebarParent:x,SidebarStatic:w,SidebarGroupCollapsed:O,SidebarRight:M,SidebarReduceExpand:T,SidebarCustom:J}},$=W,F=(n("6682"),Object(c["a"])($,i,r,!1,null,null,null));t["default"]=F.exports},"2ebd":function(e,t,n){},4550:function(e,t,n){"use strict";n("f7cb")},6682:function(e,t,n){"use strict";n("2ebd")},f7cb:function(e,t,n){}}]);
//# sourceMappingURL=chunk-5414b916.33735cd4.js.map