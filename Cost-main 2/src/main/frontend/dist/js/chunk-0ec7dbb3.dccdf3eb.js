(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ec7dbb3"],{2848:function(t,e,s){"use strict";s("41c5")},"2a8d":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t._self._c;return e("vx-card",{attrs:{title:t.$t("assignPermissions")}},[e("vx-card",{attrs:{id:"internal-card",title:"","no-shadow":"","card-border":""}},[e("vs-table",{staticClass:"stripe",attrs:{hoverFlat:"","max-items":t.perPage,data:t.getRoles},on:{selected:t.goToDetail},scopedSlots:t._u([{key:"default",fn:function(s){var a=s.data;return t._l(a,(function(s,i){return e("vs-tr",{key:i,attrs:{data:s}},[e("vs-td",{staticClass:"w-10"},[t._v(t._s(i+1+t.limit*(t.currentPage-1)))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:a[i].roleName}},[t._v(t._s(a[i].roleName))]),e("vs-td",{staticClass:"pr-4 w-1/4",attrs:{data:a[i].roleFullName}},[t._v(t._s(a[i].roleFullName))]),e("vs-td",{staticClass:"p-0",attrs:{data:a[i].id}},[t.isGranted("setRolePermission")?e("vs-button",{staticClass:"small text-base",attrs:{"icon-pack":"feather",icon:"icon-settings",type:"gradient",color:"success"},on:{click:function(e){return e.preventDefault(),t.updateRolePermissions(a[i].id)}}},[t._v(t._s(t.$t("assignPermissions")))]):t._e()],1)],1)}))}}])},[e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"number"}},[t._v("#")]),e("vs-th",{attrs:{"sort-key":"roleName"}},[t._v(t._s(t.$t("roleName")))]),e("vs-th",{attrs:{"sort-key":"roleFullName"}},[t._v(t._s(t.$t("roleFullName")))]),e("vs-th",{attrs:{"sort-key":"actions"}},[t._v(t._s(t.$t("actions")))])],1)],2),0!=t.increament?e("p",[t._v(".")]):t._e()],1),e("vs-pagination",{staticClass:"m-4",attrs:{total:t.totalPage},on:{change:t.getRoles},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)},i=[],o=s("ade3"),r={components:{},data:function(){return Object(o["a"])(Object(o["a"])(Object(o["a"])({dot:"",roles:[],selected:[],limit:15,total:0,searchRole:"",currentPage:1,status:[],swich:!0,roleStatus:"",updateStatus:!1,colorAlert:"primary",titleAlert:"Alert",activeConfirm:!1,valueInput:"",accepted:!1,roleId:"",confirm:"",increament:0,decreament:0,responseGeted:!1,currentItemView:"item-grid-view",knowledgeBaseSearchQuery:"",searchKey:"",kb:[],allRoles:[],perPage:20},"currentPage",1),"totalPage",0),"preventTableClickAction",!1)},methods:Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])({fetchRoles:function(){var t=this,e={limit:this.perPage,page:this.currentPage};this.$store.dispatch("RoleModule/fetchRoles",e).then((function(e){t.totalPage=1,t.isLoading=!1})).catch((function(e){t.isLoading=!1}))},openConfirm:function(t){this.id=t,this.$vs.dialog({type:"confirm",color:"warning",title:"Confirm",text:this.$t("deleteConfirmation"),accept:this.acceptAlert,acceptText:this.$t("Yes"),cancelText:this.$t("No")})},acceptAlert:function(){var t=this;this.$store.dispatch("RoleModule/deleteRole",this.id).then((function(e){t.$vs.notify({color:"success",title:t.$t("notificationStatus"),text:t.$t("deleteSuccess")}),t.getAllRoles()}))},getRoles:function(){var t=this;this.$http.get("/roles",{params:{page:this.currentPage,limit:this.perPage}}).then((function(e){t.roles=e.data,t.totalPage=1,t.isLoading=!1})).catch((function(e){t.isLoading=!1}))},searchRoles:function(){var t=this;this.isLoading=!0,this.$http.get("/role?searchKey="+this.searchKey).then((function(e){t.roles=e.data,t.isLoading=!1})).catch((function(e){t.isLoading=!1}))},goToDetail:function(t){},search:function(t){var e=this;this.$http.post("/role/search",{searchKey:t},{params:{page:this.currentPage,limit:this.limit}}).then((function(t){e.roles=t.data,e.total=thisIns.roles[0].totalPages,thisIns.$store.dispatch("user/populateUser",t.data)}))}},"openConfirm",(function(t,e,s){this.status[0]=!0,1==t?(this.roleStatus="Disabled",this.confirm="Do You Want to Disable?"):(this.roleStatus="Active",this.confirm="Do You Want to Delete"),this.roleId=e,this.$vs.dialog({type:"confirm",color:"warning",title:"Confirm",text:this.confirm,accept:this.acceptAlert,acceptText:this.$t("Yes"),cancelText:this.$t("No")})})),"acceptAlert",(function(){this.$http.delete("/role/"+this.roleId,{roleStatus:this.roleStatus}).then((function(t){})),this.$vs.notify({color:"success",title:this.$t("notificationStatus"),text:this.$t("deleteSuccess")}),this.getRoles()})),"pageLimit",(function(t){this.limit=t,this.updateStatus=!0,this.pagination(),this.updateStatus=!1})),"pagination",(function(){var t=this;this.$http.get("/role",{params:{page:this.currentPage,limit:this.limit}}).then((function(e){if(t.roles=e.data,t.total=t.roles[0].totalPages,t.$store.dispatch("user/populateUser",e.data),1==t.updateStatus)for(var s=0;s<t.roles.length;s++)"Active"==t.roles[s].roleStatus?t.status[s]=!0:t.status[s]=!1}))})),"updateRolePermissions",(function(t){this.$router.push({path:"/pages/set-role-permission/"+t})})),created:function(){this.fetchRoles()},computed:{getRoles:function(){return this.$store.getters["RoleModule/getRoles"]},getRole:function(){return this.$store.getters["RoleModule/getRole"]}}},n=r,c=(s("2848"),s("2877")),l=Object(c["a"])(n,a,i,!1,null,"23e19bc1",null);e["default"]=l.exports},"41c5":function(t,e,s){}}]);
//# sourceMappingURL=chunk-0ec7dbb3.dccdf3eb.js.map