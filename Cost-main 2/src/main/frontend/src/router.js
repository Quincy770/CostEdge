

import Vue from 'vue'
import Router from 'vue-router'
// import auth from "@/auth/authService";
// import firebase from 'firebase/app'
// import 'firebase/auth'
import axios from 'axios'
var redirectionPath;
var userType = localStorage.getItem("userType");
    if(userType == 'Logistics' || userType == 'Finance')
        redirectionPath='/pages/order/viewOrders';
    else if (userType == "CustomerSeller") {
        redirectionPath ='/pages/customer/view-customer-inventory';
      }
      else if (userType == "Admin" || userType=="Customer") {
        redirectionPath = '/pages/orders/shop';
      }
      else if (userType == "CustomerAdmin") {
        redirectionPath = '/pages/my-inventory';
      }
Vue.use(Router)
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
                {
                    path: '/',
                    redirect: `${redirectionPath}`
                },
                {
                    path: '/dashboard/analytics',
                    name: 'dashboard-analytics',
                    component: () => import('./views/DashboardAnalytics.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/dashboard/ecommerce',
                    name: 'dashboard-ecommerce',
                    component: () => import('./views/DashboardECommerce.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/customer-report',
                    name: 'customerReport',
                    component: () => import('@/views/pages/report/customerReport.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/manufacturer-report',
                    name: 'manufacturerReport',
                    component: () => import('@/views/pages/report/manufacturerReport.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: 'pages/add-inventory',
                    name: 'inventory',
                    component: () => import('./views/pages/inventory/addInventory.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/import-text',
                    name: 'inventory',
                    component: () => import('./views/pages/inventory/addInventory.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/view-user',
                    name: 'viewUser',
                    component: () => import('./views/pages/user/viewuserAccount.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/view-customer',
                    name: 'viewUser',
                    component: () => import('./views/pages/customer/viewCustomer.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
//brhane
                  {
                    path: 'pages/customer/add-customer-inventory',
                    name: 'addCustomerInventory',
                    component: () => import('./views/pages/customer/sellInventory.vue'),
                    meta: {
                        rule: 'editor'
                    }
              },

               {
                    path: 'pages/customer/edit-customer-inventory/:id',
                    name: 'editCustomerInventory',
                    component: () => import('./views/pages/customer/editInventory.vue'),
                    meta: {
                        rule: 'editor'
                    }
              },

               {
                    path: 'pages/customer/view-customer-inventory',
                    name: 'viewCustomerInventory',
                    component: () => import('./views/pages/customer/viewSoldInventory.vue'),
                    meta: {
                        rule: 'editor'
                    }
              },

                {
                    path: 'pages/customer/view-transaction',
                    name: 'viewCustomerTransaction',
                    component: () => import('./views/pages/customer/viewTransaction.vue'),
                    meta: {
                        rule: 'editor'
                    }
              },
                {
                    path: 'pages/customer/add-transaction',
                    name: 'addCustomerTransaction',
                    component: () => import('./views/pages/customer/addTransaction.vue'),
                    meta: {
                        rule: 'editor'
                    }
              },
                 {
                    path: 'pages/customer/edit-transaction/:id',
                    name: 'editCustomerTransaction',
                    component: () => import('./views/pages/customer/editTransaction.vue'),
                    meta: {
                        rule: 'editor'
                    }
              },

       

                {
                    path: 'pages/company-detail/:id',
                    name: 'companyDeatail',
                    component: () => import('./views/pages/company/companyDetail.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/view-company',
                    name: 'viewCompany',
                    component: () => import('./views/pages/company/viewCompany.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/update-company/:id',
                    name: 'updateCompany',
                    component: () => import('./views/pages/company/updateCompany.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/view-inventory',
                    name: 'viewInventory',
                    component: () => import('./views/pages/inventory/viewInventory.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/my-inventory',
                    name: 'myInventory',
                    component: () => import('./views/pages/inventory/viewInventory.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'inventory/:id',
                    name: 'updateInventory',
                    component: () => import('./views/pages/inventory/updateInventory.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'inventory/inventory-Item-Price-Details/:id',
                    name: 'viewInventory',
                    component: () => import('./views/pages/inventory/inventoryItemPriceDetails.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/inventory-detail/:id',
                    name: 'ViewInventory',
                    component: () => import('./views/pages/inventory/inventoryDetail.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/import-text',
                    name: 'ViewInventory',
                    component: () => import('./views/pages/inventory/importText.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'upload',
                    name: 'viewInventory',
                    component: () => import('./views/pages/uploadFile.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/update-user/:id',
                    name: 'viewUser',
                    name: 'updateUser',
                    component: () => import('./views/pages/user/updateUser.vue'),

                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: 'pages/update-customer/:id',
                    name: 'updateCustomer',
                    name: 'updateCustomer',
                    component: () => import('./views/pages/customer/updateCustomer.vue'),

                    meta: {
                        rule: 'editor'
                    }
                },
                // {
                //     path: 'pages/user/register',
                //     name: 'viewUser',
                //     component: () => import('./views/pages/user/registerUser.vue'),

                //     meta: {
                //         rule: 'editor'
                //     }
                // },




                // {
                //     path: '/pages/edit-region/:id',
                //     name: 'editRegion',
                //     component: () => import('@/views/pages/region/edit.vue'),
                //     meta: {
                //         rule: 'editor'
                //     }
                // },
                {
                    path: 'pages/insert-inventory-item-list',
                    name: 'insertInventory-item-list',
                    component: () => import('./views/pages/inventory/insertinventoryItemlists.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/add-user',
                    name: 'registerUser',
                    component: () => import('./views/pages/user/registerUser.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/order/viewOrders',
                    name: 'viewOrders',
                    component: () => import('./views/pages/order/viewOrders.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/order/myOrders',
                    name: 'MyOrders',
                    component: () => import('./views/pages/order/myOrders.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
              
                {
                    path: 'pages/transaction/viewTransaction',
                    name: 'viewTransaction',
                    component: () => import('./views/pages/transaction/viewTransaction.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'transaction/:id',
                    name: 'updateTransaction',
                    component: () => import('./views/pages/transaction/updateTransaction.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: 'pages/userProfile',
                    name: 'userProfile',
                    component: () => import('./views/pages/userProfile.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/orders/shop',
                    name: 'ecommerce-shop',
                    component: () => import('./views/pages/orders/Shop.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Orders'},
                            { title: 'Shop', active: true },
                        ],
                        pageTitle: 'Shop',
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/orders/wish-list',
                    name: 'ecommerce-wish-list',
                    component: () => import('./views/pages/orders/WishList.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Orders', url:'/pages/orders/shop'},
                            { title: 'Wish List', active: true },
                        ],
                        pageTitle: 'Wish List',
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/orders/checkout',
                    name: 'ecommerce-checkout',
                    component: () => import('./views/pages/orders/OrderCheckout.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Orders', url:'/pages/orders/shop'},
                            { title: 'Checkout', active: true },
                        ],
                        pageTitle: 'Checkout',
                        rule: 'editor'
                    }
                },
      
                {
                    path: '/pages/order/orders',
                    name: 'paidOrders',
                    component: () => import('./views/pages/order/paidOrders.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/orderConfirmation',
                    name: 'order-confirmation',
                    component: () => import('./views/pages/orderConfirmation.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/order/:id',
                    name: 'order-detail',
                    component: () => import('./views/pages/order/orderDetail.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },



                {
                    path: '/pages/socket-programming',
                    name: 'socket-programming',
                    component: () => import('./views/pages/order/socketProgramming.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/add-order-time-limit',
                    name: 'add-site',
                    component: () => import('./views/pages/orderTimeLimit/addOrderTimeLimit.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/edit-order-time-limit/:orderTimeLimitId',
                    name: 'edit-order-time-limit',
                    component: () => import('./views/pages/orderTimeLimit/editOrderTimeLimit.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/view-order-time-limit',
                    name: 'view-order-time-limit',
                    component: () => import('./views/pages/orderTimeLimit/viewOrderTimeLimit.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/fetch-roles-for-permission',
                    name: 'fetchRolesForPermission',
                    component: () => import('@/views/pages/Permission/fetch-roles-for-permission.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/set-role-permission/:roleId',
                    name: 'setRolePermission',
                    component: () => import('@/views/pages/Permission/assignPermission.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },,
                  {
                    path: 'pages/view-categories',
                    name: 'viewCategories',
                    component: () => import('@/views/pages/Category/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/add-category',
                    name: 'addCategory',
                    component: () => import('@/views/pages/Category/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-categories/:id',
                    name: 'editCategory',
                    component: () => import('@/views/pages/Category/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },


                  {
                    path: 'pages/view-countries',
                    name: 'viewCountries',
                    component: () => import('@/views/pages/Country/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/add-country',
                    name: 'addCountry',
                    component: () => import('@/views/pages/Country/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-countries/:id',
                    name: 'editCountry',
                    component: () => import('@/views/pages/Country/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },

                  {
                    path: 'pages/view-regions',
                    name: 'viewRegions',
                    component: () => import('@/views/pages/region/view.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/add-region',
                    name: 'addRegion',
                    component: () => import('@/views/pages/region/add.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-regions/:id',
                    name: 'editRegion',
                    component: () => import('@/views/pages/region/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },



                  {
                    path: '/pages/edit-region/:id',
                    name: 'editRegion',
                    component: () => import('@/views/pages/region/edit.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: 'pages/view-region',
                    name: 'viewRegion',
                    component: () => import('./views/pages/region/view.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/add-region',
                    name: 'addRegion',
                    component: () => import('@/views/pages/region/add.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/edit-region-price/:id',
                    name: 'editProduct',
                    component: () => import('@/views/pages/regionPrice/edit.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: 'pages/view-region-price',
                    name: 'viewProduct',
                    component: () => import('./views/pages/regionPrice/view.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/add-region-price',
                    name: 'addRegionPrice',
                    component: () => import('@/views/pages/regionPrice/add.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/edit-supplier/:id',
                    name: 'editSupplier',
                    component: () => import('@/views/pages/supplier/edit.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: 'pages/view-supplier',
                    name: 'viewSupplier',
                    component: () => import('./views/pages/supplier/index.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/add-supplier',
                    name: 'addSupplier',
                    component: () => import('@/views/pages/supplier/create.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {
                    path: '/pages/edit-employee/:id',
                    name: 'editEmployee',
                    component: () => import('@/views/pages/employee/edit.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: 'pages/view-employee',
                    name: 'viewEmployee',
                    component: () => import('./views/pages/employee/index.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/add-employee',
                    name: 'addEmployee',
                    component: () => import('@/views/pages/employee/create.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },



                {
                    path: '/pages/edit-product-category/:id',
                    name: 'editProductCategory',
                    component: () => import('@/views/pages/productCategory/edit.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: 'pages/view-product-category',
                    name: 'viewProductCategory',
                    component: () => import('./views/pages/productCategory/view.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/add-product-category',
                    name: 'addProductCategory',
                    component: () => import('@/views/pages/productCategory/add.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {
                    path: '/pages/edit-department/:id',
                    name: 'editDepartment',
                    component: () => import('@/views/pages/department/edit.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {
                    path: 'pages/view-department',
                    name: 'viewDepartment',
                    component: () => import('./views/pages/department/view.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/add-department',
                    name: 'addDepartment',
                    component: () => import('@/views/pages/department/add.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },



                {
                    path: '/pages/payment/success',
                    name: 'paymentSuccess',
                    component: () => import('@/views/pages/payment/Success.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {
                    path: '/pages/payment/failed',
                    name: 'paymentFailed',
                    component: () => import('@/views/pages/payment/Failed.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {
                    path: '/pages/checkout',
                    name: 'checkout',
                    component: () => import('@/views/pages/Checkout/Checkout.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

           

                  {
                    path: 'pages/view-roles',
                    name: 'viewRoles',
                    component: () => import('@/views/pages/Role/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/add-role',
                    name: 'addRole',
                    component: () => import('@/views/pages/Role/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-role/:id',
                    name: 'editRole',
                    component: () => import('@/views/pages/Role/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },


        // =============================================================================
        // Application Routes
        // =============================================================================

                {
                    path: '/pages/orders/shop',
                    name: 'ecommerce-shop',
                    component: () => import('./views/pages/orders/Shop.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Orders'},
                            { title: 'Shop', active: true },
                        ],
                        pageTitle: 'Shop',
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/orders/wish-list',
                    name: 'ecommerce-wish-list',
                    component: () => import('./views/pages/orders/WishList.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Orders', url:'/pages/orders/shop'},
                            { title: 'Wish List', active: true },
                        ],
                        pageTitle: 'Wish List',
                        rule: 'editor'
                    }
                },


                {
                    path: '/components/navbar',
                    name: 'component-navbar',
                    component: () => import('@/views/components/vuesax/navbar/Navbar.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Navbar', active: true },
                        ],
                        pageTitle: 'Navbar',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/notifications',
                    name: 'component-notifications',
                    component: () => import('@/views/components/vuesax/notifications/Notifications.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Notifications', active: true },
                        ],
                        pageTitle: 'Notifications',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/pagination',
                    name: 'component-pagination',
                    component: () => import('@/views/components/vuesax/pagination/Pagination.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Pagination', active: true },
                        ],
                        pageTitle: 'Pagination',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/popup',
                    name: 'component-popup',
                    component: () => import('@/views/components/vuesax/popup/Popup.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Popup', active: true },
                        ],
                        pageTitle: 'Popup',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/progress',
                    name: 'component-progress',
                    component: () => import('@/views/components/vuesax/progress/Progress.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Progress', active: true },
                        ],
                        pageTitle: 'Progress',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/sidebar',
                    name: 'component-sidebar',
                    component: () => import('@/views/components/vuesax/sidebar/Sidebar.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Sidebar', active: true },
                        ],
                        pageTitle: 'Sidebar',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/slider',
                    name: 'component-slider',
                    component: () => import('@/views/components/vuesax/slider/Slider.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Slider', active: true },
                        ],
                        pageTitle: 'Slider',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/tabs',
                    name: 'component-tabs',
                    component: () => import('@/views/components/vuesax/tabs/Tabs.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Tabs', active: true },
                        ],
                        pageTitle: 'Tabs',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/tooltip',
                    name: 'component-tooltip',
                    component: () => import('@/views/components/vuesax/tooltip/Tooltip.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Tooltip', active: true },
                        ],
                        pageTitle: 'Tooltip',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/upload',
                    name: 'component-upload',
                    component: () => import('@/views/components/vuesax/upload/Upload.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Upload', active: true },
                        ],
                        pageTitle: 'Upload',
                        rule: 'editor'
                    },
                },



        // =============================================================================
        // Pages Routes
        // =============================================================================
                {
                    path: '/pages/profile',
                    name: 'page-profile',
                    component: () => import('@/views/pages/Profile.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Pages' },
                            { title: 'Profile', active: true },
                        ],
                        pageTitle: 'Profile',
                        rule: 'editor'
                    },
                },
                {
                    path: '/pages/faq',
                    name: 'page-faq',
                    component: () => import('@/views/pages/Faq.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Pages' },
                            { title: 'FAQ', active: true },
                        ],
                        pageTitle: 'FAQ',
                        rule: 'editor'
                    },
                },
                {
                    path: '/pages/knowledge-base',
                    name: 'page-knowledge-base',
                    component: () => import('@/views/pages/KnowledgeBase.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Pages' },
                            { title: 'KnowledgeBase', active: true },
                        ],
                        pageTitle: 'KnowledgeBase',
                        rule: 'editor'
                    },
                },
                {
                    path: '/pages/knowledge-base/category',
                    name: 'page-knowledge-base-category',
                    component: () => import('@/views/pages/KnowledgeBaseCategory.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Pages' },
                            { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
                            { title: 'Category', active: true },
                        ],
                        parent: 'page-knowledge-base',
                        rule: 'editor'
                    },
                },
                {
                    path: '/pages/knowledge-base/category/question',
                    name: 'page-knowledge-base-category-question',
                    component: () => import('@/views/pages/KnowledgeBaseCategoryQuestion.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Pages' },
                            { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
                            { title: 'Category', url: '/pages/knowledge-base/category' },
                            { title: 'Question', active: true },
                        ],
                        parent: 'page-knowledge-base',
                        rule: 'editor'
                    },
                },
                {
                    path: '/pages/search',
                    name: 'page-search',
                    component: () => import('@/views/pages/Search.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Pages' },
                            { title: 'Search', active: true },
                        ],
                        pageTitle: 'Search',
                        rule: 'editor'
                    },
                },
                {
                    path: '/pages/invoice/:id',
                    name: 'page-invoice',
                    component: () => import('@/views/pages/order/invoice.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Pages' },
                            { title: 'Invoice', active: true },
                        ],
                        pageTitle: 'Invoice',
                        rule: 'editor'
                    },
                },

            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================

                {
                    path: '/verifyaccount',
                    name: 'verifyaccount',
                    component: () => import('@/views/pages/user/verifyAccount.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/callback',
                    name: 'auth-callback',
                    component: () => import('@/views/Callback.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/login',
                    name: 'page-login',
                    component: () => import('@/views/pages/Login.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/register',
                    name: 'page-register',
                    component: () => import('@/views/pages/user/Register.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/forgot-password',
                    name: 'page-forgot-password',
                    component: () => import('@/views/pages/ForgotPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {
                    path: '/pages/reset-password',
                    name: 'page-reset-password',
                    component: () => import('@/views/pages/user/ResetPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/resetpassword',
                    name: 'page-reset-password',
                    component: () => import('@/views/pages/user/verifyResetCode.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/lock-screen',
                    name: 'page-lock-screen',
                    component: () => import('@/views/pages/LockScreen.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/comingsoon',
                    name: 'page-coming-soon',
                    component: () => import('@/views/pages/ComingSoon.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () => import('@/views/pages/Error404.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-500',
                    name: 'page-error-500',
                    component: () => import('@/views/pages/Error500.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/not-authorized',
                    name: 'page-not-authorized',
                    component: () => import('@/views/pages/NotAuthorized.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/maintenance',
                    name: 'page-maintenance',
                    component: () => import('@/views/pages/Maintenance.vue'),
                    meta: {
                        rule: 'editor'
                    }
                }
            ]
        },
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

router.beforeEach((to, from, next) => {
    const id = to.path.split("/").slice(-1)[0];
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
    const userType = localStorage.getItem('userType');
    const companyId = localStorage.getItem('companyId');
    if(accessToken!=null){
        axios.defaults.headers.common['Authorization'] =accessToken;
    }


 //Open Access
    if (
        to.path === "/pages/login" ||
        to.path === "/pages/forgot-password" ||
        to.path === "/pages/error-404" ||
        to.path === "/pages/error-500" ||
        to.path === "/pages/register" ||
        to.path === "/callback" ||
        to.path === "/pages/comingsoon" ||
        to.path === "/pages/reset-password"||
        to.path=='/verifyaccount'||
        to.path=='/resetpassword'

    )
    {
            return next();
    }

//If User is Customer
   else if((userId != null && accessToken != null && userType=="Customer")){
         if(true ||
            to.path=='/pages/userProfile' ||
            to.path=='/dashboard/analytics'||
            to.path === "/pages/orders/shop" ||
            to.path === "/pages/order/myOrders" ||
            to.path=='/pages/orders/wish-list' ||
            to.path=='/pages/orders/checkout'||
            to.path == `/pages/invoice/${id}` ||
            to.path == `/pages/order/${id}`
         ){
        return next();
     }
     else{
       return router.push({ path: '/pages/orders/shop', query: { to: to.path }})
     }
    }
      // if user is Customer admin
      else if((userId != null && accessToken != null && userType=="CustomerAdmin" &&companyId!=null && companyId!=0 )){
         if(true||
            to.path=='/pages/userProfile' ||
            to.path === "/pages/my-inventory" ||
            to.path === "/pages/customer/view-customer-inventory" ||
            to.path=='/pages/customer/add-customer-inventory' ||
            to.path=='/pages/customer/view-transaction'||
            to.path == `pages/customer/add-transaction`
         ){
        return next();
     }
     else{
       return router.push({ path: '/pages/orders/shop', query: { to: to.path }})
     }
    }

       //if user is customer finance
      else if((userId != null && accessToken != null && userType=="CustomerSeller" &&companyId!=null && companyId!=0 )){
         if(true||
           to.path == '/pages/userProfile' ||
           to.path === "/pages/customer/view-customer-inventory"||
            to.path=='/pages/customer/add-customer-inventory' ||
            to.path=='/pages/customer/view-transaction'||
           to.path == `pages/customer/add-transaction`

         ){
        return next();
     }
     else{
       return router.push({ path: '/pages/customer/view-customer-inventory', query: { to: to.path }})
     }
    }

//If User is Logistics
else if((userId != null && accessToken != null && userType=="Logistics")){
    if(true ||
       to.path=='/pages/userProfile' ||
       to.path=='/dashboard/analytics'||
       to.path == `/pages/invoice/${id}`||
       to.path == '/pages/order/viewOrders'||
       to.path == `/pages/order/${id}`||
       to.path == '/pages/order/paidOrders' ||
       to.path == '/pages/order/verifiedOrders' ||
       to.path == `/pages/order/manageOrderDeliveryStatus/${id}`

    ){
   return next();
}
else{
  return router.push({ path: '/pages/orders/shop', query: { to: to.path }})
}
}

//If User is Finance
else if((userId != null && accessToken != null && userType=="Finance")){

    if(true ||
       to.path=='/pages/userProfile' ||
       to.path=='/dashboard/analytics'||
       to.path == `/pages/invoice/${id}`||
       to.path == '/pages/order/viewOrders'||
       to.path == `/pages/order/${id}`||
       to.path == '/pages/order/paidOrders'||
       to.path == '/pages/transaction/viewTransaction'

    ){
   return next();
}
else{
  return router.push({ path: '/pages/orders/shop', query: { to: to.path }})
}
}


//If User is Admin
    else if((userId != null && accessToken != null && userType=="Admin") ){

           return next();
    }
    router.push({ path: '/pages/login', query: { to: to.path }})
    // Specify the current path as the customState parameter, meaning it
    // will be returned to the application after auth
    // auth.login({ target: to.path });

});

export default router
