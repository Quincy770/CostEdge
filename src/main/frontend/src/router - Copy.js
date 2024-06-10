

import Vue from 'vue'
import Router from 'vue-router'
// import auth from "@/auth/authService";
// import firebase from 'firebase/app'
// import 'firebase/auth'
import axios from 'axios'
var redirectionPath = '/pages/eCommerce/shop';

// if(localStorage.getItem('userType')=='Admin' || localStorage.getItem('userType')=='Customer')
//     redirectionPath = '/pages/eCommerce/shop';

// if(localStorage.getItem('userType')=='Finance')
//     redirectionPath = '/pages/order/viewOrders';
// if(localStorage.getItem('userType')=='Logistics')
//     redirectionPath = '/pages/order/viewOrders';

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
                    path: 'pages/add-customer-inventory',
                    name: 'addCustomerInventory',
                    component: () => import('./views/pages/customer/sellInventory.vue'),
                    meta: {
                        rule: 'editor'
                    }
              },

               {
                    path: 'pages/edit-customer-inventory/:id',
                    name: 'editCustomerInventory',
                    component: () => import('./views/pages/customer/editInventory.vue'),
                    meta: {
                        rule: 'editor'
                    }
              },

               {
                    path: 'pages/view-customer-inventory',
                    name: 'viewCustomerInventory',
                    component: () => import('./views/pages/customer/viewSoldInventory.vue'),
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
                    path: '/pages/order/uploadOrderDocuments/:id',
                    name: 'uploadOrderDocuments',
                    component: () => import('./views/pages/order/uploadOrderDocuments.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/order/editUploadOrderDocuments/:id',
                    name: 'editUploadOrderDocuments',
                    component: () => import('./views/pages/order/editUploadOrderDocuments.vue'),
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
                    path: '/pages/eCommerce/shop',
                    name: 'ecommerce-shop',
                    component: () => import('./views/pages/eCommerce/ECommerceShop.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'eCommerce'},
                            { title: 'Shop', active: true },
                        ],
                        pageTitle: 'Shop',
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/eCommerce/wish-list',
                    name: 'ecommerce-wish-list',
                    component: () => import('./views/pages/eCommerce/ECommerceWishList.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'eCommerce', url:'/pages/eCommerce/shop'},
                            { title: 'Wish List', active: true },
                        ],
                        pageTitle: 'Wish List',
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/eCommerce/checkout',
                    name: 'ecommerce-checkout',
                    component: () => import('./views/pages/eCommerce/ECommerceCheckout.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'eCommerce', url:'/pages/eCommerce/shop'},
                            { title: 'Checkout', active: true },
                        ],
                        pageTitle: 'Checkout',
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/order/verifiedOrders',
                    name: 'verifiedOrders',
                    component: () => import('./views/pages/order/verifiedOrders.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/order/manageOrderDeliveryStatus/:id',
                    name: 'manageOrderDeliveryStatus',
                    component: () => import('./views/pages/order/manageOrderDeliveryStatus.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/order/paidOrders',
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
                    path: '/pages/upload-receipt',
                    name: 'upload-receipt',
                    component: () => import('./views/pages/order/uploadReceipt.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/add-site',
                    name: 'add-site',
                    component: () => import('./views/pages/stockSite/addSite.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/edit-site/:siteId',
                    name: 'edit-site',
                    component: () => import('./views/pages/stockSite/editSite.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/view-stock-sites',
                    name: 'view-site',
                    component: () => import('./views/pages/stockSite/viewSite.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {
                    path: '/pages/add-order-type',
                    name: 'add-order-type',
                    component: () => import('./views/pages/orderType/addOrderType.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/edit-order-type/:orderTypeId',
                    name: 'edit-order-type',
                    component: () => import('./views/pages/orderType/editOrderType.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/view-order-type',
                    name: 'view-order-type',
                    component: () => import('./views/pages/orderType/viewOrderType.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/add-order-status-type',
                    name: 'add-order-status-type',
                    component: () => import('./views/pages/orderStatusType/addOrderStatusType.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/edit-order-status-type/:orderStatusTypeId',
                    name: 'edit-order-status-type',
                    component: () => import('./views/pages/orderStatusType/editOrderStatusType.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/view-order-status-type',
                    name: 'view-order-status-type',
                    component: () => import('./views/pages/orderStatusType/viewOrderStatusType.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/order-type-status-type',
                    name: 'order-type-status-type',
                    component: () => import('./views/pages/orderStatusType/orderTypeStatusType.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/add-order-type-status-type',
                    name: 'add-order-type-status-type',
                    component: () => import('./views/pages/orderStatusType/addOrderTypeStatusType.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/edit-order-type-status-type/:id',
                    name: 'edit-order-type-status-type',
                    component: () => import('./views/pages/orderStatusType/editOrderTypeStatusType.vue'),
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
                    component: () => import('@/views/pages/Region/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/add-region',
                    name: 'addRegion',
                    component: () => import('@/views/pages/Region/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-regions/:id',
                    name: 'editRegion',
                    component: () => import('@/views/pages/Region/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },

                  {
                    path: 'pages/view-zones',
                    name: 'viewZones',
                    component: () => import('@/views/pages/Zone/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/add-zone',
                    name: 'addZone',
                    component: () => import('@/views/pages/Zone/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-zones/:id',
                    name: 'editZone',
                    component: () => import('@/views/pages/Zone/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/view-woredas',
                    name: 'viewWoredas',
                    component: () => import('@/views/pages/Woreda/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/add-woreda',
                    name: 'addWoreda',
                    component: () => import('@/views/pages/Woreda/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-woredas/:id',
                    name: 'editWoreda',
                    component: () => import('@/views/pages/Woreda/edit.vue'),
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

                  {
                    path: 'pages/view-privileges',
                    name: 'viewPrivileges',
                    component: () => import('@/views/pages/Privilege/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },

                  {
                    path: 'pages/add-privilege',
                    name: 'addPrivilege',
                    component: () => import('@/views/pages/Privilege/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-privilege/:id',
                    name: 'editPrivilege',
                    component: () => import('@/views/pages/Privilege/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },


        // =============================================================================
        // Application Routes
        // =============================================================================

                {
                    path: '/pages/eCommerce/shop',
                    name: 'ecommerce-shop',
                    component: () => import('./views/pages/eCommerce/ECommerceShop.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'eCommerce'},
                            { title: 'Shop', active: true },
                        ],
                        pageTitle: 'Shop',
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/eCommerce/wish-list',
                    name: 'ecommerce-wish-list',
                    component: () => import('./views/pages/eCommerce/ECommerceWishList.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'eCommerce', url:'/pages/eCommerce/shop'},
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
        // Redirect to 404 page, if no match found
        // {
        //     path: '*',
        //     redirect: '/pages/error-404'
        // }
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
            to.path === "/pages/eCommerce/shop" ||
            to.path === "/pages/order/myOrders" ||
            to.path=='/pages/eCommerce/wish-list' ||
            to.path=='/pages/eCommerce/checkout'||
            to.path == `/pages/invoice/${id}` ||
            to.path == `/pages/order/uploadOrderDocuments/${id}` ||
            to.path == `/pages/order/${id}`
         ){
        return next();
     }
     else{
       return router.push({ path: '/pages/eCommerce/shop', query: { to: to.path }})
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
  return router.push({ path: '/pages/eCommerce/shop', query: { to: to.path }})
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
  return router.push({ path: '/pages/eCommerce/shop', query: { to: to.path }})
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
