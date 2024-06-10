export default [
  {
    header: "",
    i18n: "",
  },
  {
    url: '/dashboard/analytics',
    name: "dashboardAnalytics",
    slug: "dashboardAnalytics",
    i18n: "Dashboard",
    icon: "GridIcon",
  },
  {
    url: null,
    name: "Cost Edge",
    icon: "ShoppingCartIcon",
    i18n: "Orders",
    submenu: [
      {
        url: '/pages/orders/shop',
        name: "Shop",
        slug: "ecommerce-shop",
        i18n: "Products To Order",
      },

      {
        url: '/pages/orders/checkout',
        name: "Checkout",
        slug: "ecommerce-checkout",
        i18n: "Checkout",
      },

      {
        url: '/pages/order/orders',
        name: "Paid",
        slug: "Paid",
        i18n: "Order List",
        icon: "UserIcon"
      },
    ]
  },

  {
    url: null,
    name: "Accounts",
    icon: "UsersIcon",
    i18n: "Accounts",
    submenu: [
      {
        url: '/pages/view-user',
        name: "Users",
        slug: "Users",
        i18n: "Users",
        icon: "UserIcon"
      },
      {
        url: '/pages/view-company',
        name: "Companies",
        slug: "Companies",
        i18n: "Companies",
        icon: "BriefcaseIcon"
      },
      {
        url: '/pages/view-customer',
        name: "Customers",
        slug: "Customers",
        i18n: "Customers",
        icon: "UsersIcon"
      },

      {
        url: '/pages/view-roles',
        name: "viewRoles",
        slug: "viewRoles",
        i18n: "Roles",
        icon: "BriefcaseIcon",
      },
    ]
  },
  {
    url: '/pages/view-supplier',
    name: "Suppliers",
    slug: "Suppliers",
    i18n: "Suppliers",
    icon: "UserIcon",
  },

  {
    url: '/pages/view-employee',
    name: "Employee",
    slug: "Employee",
    i18n: "Employee",
    icon: "UsersIcon",
  },
  {
    url: null,
    name: "Settings",
    icon: "SettingsIcon",
    i18n: "Settings",
    submenu: [



      {
        url: '/pages/view-department',
        name: "Department",
        slug: "Department",
        i18n: "Department",
        icon: "No",
      },

      {
        url: '/pages/view-region',
        name: "Region",
        slug: "Region",
        i18n: "Region",
        icon: "No",
      },
      {
        url: '/pages/view-region-price',
        name: "Region Price",
        slug: "Region Price",
        i18n: "Region Price",
        icon: "No",
      },

      {
        url: '/pages/view-countries',
        name: "viewCountries",
        slug: "viewCountries",
        i18n: "Countries",
        icon: "BriefcaseIcon",
      },

    ]
  },

  {
    url: null,
    name: "Products",
    slug: "Products",
    i18n: "Products",
    icon: "PackageIcon",
    submenu:[
      {
        url: '/pages/view-inventory',
        name: "Products",
        slug: "Products",
        i18n: "Products",
        icon: "PackageIcon",

      },
      {
        url: '/pages/insert-inventory-item-list',
        name: "Insert Products",
        slug: "Insert Products",
        i18n: "Insert Products",
        icon: "PlusCircleIcon",
      },
      {
        url: '/pages/view-categories',
        name: "viewCategories",
        slug: "viewCategories",
        i18n: "Categories",
        icon: "BriefcaseIcon",
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
