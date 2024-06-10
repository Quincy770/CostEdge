export default [


 {
   url: null,
   name: "Orders",
   i18n: "Orders",
   icon: "ServerIcon",
   submenu: [
     {
       url: '/pages/order/viewOrders',
       name: "Ordered",
       slug: "Ordered",
       i18n: "Ordered",
       icon: "ListIcon"
     },
     {
       url: '/pages/order/paidOrders',
       name: "paymentStatus",
       slug: "paymentStatus",
       i18n: "paymentStatus",
       icon: "UserIcon"
     },
   ]
 },
 
 {
   url: '/pages/transaction/viewTransaction',
   name: "Transaction",
   slug: "Transaction",
   i18n: "Transaction",
   icon: "SlidersIcon",
 },
 {
   header: "",
   i18n: "",
 },

]
