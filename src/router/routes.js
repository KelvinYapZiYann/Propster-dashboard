
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Pages/AuthLayout.vue";
import auth from "@/middleware/auth";
import SelectRole from "@/pages/Pages/SelectRole";

const Dashboard = () =>
    import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");

const Calendar = () =>
    import(/* webpackChunkName: "dashboard" */ "@/pages/Calendar.vue");

const Widgets = () =>
    import(/* webpackChunkName: "dashboard" */ "@/pages/Widgets.vue");

const Charts = () =>
    import(/* webpackChunkName: "dashboard" */ "@/pages/Charts.vue");

// Components pages
const Buttons = () =>
    import(/* webpackChunkName: "components" */ "@/pages/Components/Buttons.vue");
const GridSystem = () =>
    import(
        /* webpackChunkName: "components" */ "@/pages/Components/GridSystem.vue"
        );
const Panels = () =>
    import(/* webpackChunkName: "components" */ "@/pages/Components/Panels.vue");
const SweetAlert = () =>
    import(
        /* webpackChunkName: "components" */ "@/pages/Components/SweetAlert.vue"
        );
const Notifications = () =>
    import(/* webpackChunkName: "components" */ "@/pages/Notifications.vue");
const Icons = () =>
    import(/* webpackChunkName: "components" */ "@/pages/Icons.vue");
const Typography = () =>
    import(/* webpackChunkName: "components" */ "@/pages/Typography.vue");

// Forms pages
const RegularForms = () => import("@/pages/Forms/RegularForms.vue");
const ExtendedForms = () => import("@/pages/Forms/ExtendedForms.vue");
const ValidationForms = () => import("@/pages/Forms/ValidationForms.vue");
const Wizard = () => import("@/pages/Forms/Wizard.vue");

// Maps pages
const GoogleMaps = () =>
    import(/* webpackChunkName: "extra" */ "@/pages/Maps/GoogleMaps.vue");
const FullScreenMap = () =>
    import(/* webpackChunkName: "extra" */ "@/pages/Maps/FullScreenMap.vue");
const VectorMaps = () =>
    import(/* webpackChunkName: "extra" */ "@/pages/Maps/VectorMaps.vue");

// TableList pages
const RegularTables = () =>
    import(/* webpackChunkName: "tables" */ "@/pages/Tables/RegularTables.vue");
const ExtendedTables = () =>
    import(/* webpackChunkName: "tables" */ "@/pages/Tables/ExtendedTables.vue");
const PaginatedTables = () =>
    import(/* webpackChunkName: "tables" */ "@/pages/Tables/PaginatedTables.vue");

// Pages
const Profile = () =>
    import(/* webpackChunkName: "pages" */ "@/pages/Profile/Profile.vue");

const Pricing = () =>
    import(/* webpackChunkName: "pages" */ "@/pages/Pages/Pricing.vue");
const TimeLine = () =>
    import(/* webpackChunkName: "pages" */ "@/pages/Pages/TimeLinePage.vue");
const Login = () =>
    import(/* webpackChunkName: "pages" */ "@/pages/Pages/Login.vue");
const ForgotPassword = () =>
    import(/* webpackChunkName: "pages" */ "@/pages/Pages/ForgotPassword.vue");
const Register = () =>
    import(/* webpackChunkName: "pages" */ "@/pages/Pages/Register.vue");
const RTL = () =>
    import(/* webpackChunkName: "pages" */ "@/pages/Pages/RTLPage.vue");
const Lock = () =>
    import(/* webpackChunkName: "pages" */ "@/pages/Pages/Lock.vue");


// Resources
const Assets = () => import("@/pages/Resources/Assets/Assets");
const AssetDetail = () => import("@/pages/Resources/Assets/AssetDetail");
const AssetEdit = () => import("@/pages/Resources/Assets/AssetEdit");
const AssetAdd = () => import("@/pages/Resources/Assets/AssetAdd");

const Tenants = () => import("@/pages/Resources/Tenants/Tenants");
const TenantDetail = () => import("@/pages/Resources/Tenants/TenantDetail");
const TenantEdit = () => import("@/pages/Resources/Tenants/TenantEdit");
const TenantAdd = () => import("@/pages/Resources/Tenants/TenantAdd");

const TenureContracts = () => import("@/pages/Resources/TenureContracts/TenureContracts");
const TenureContractDetail = () => import("@/pages/Resources/TenureContracts/TenureContractDetail");
const TenureContractEdit = () => import("@/pages/Resources/TenureContracts/TenureContractEdit");
const TenureContractAdd = () => import("@/pages/Resources/TenureContracts/TenureContractAdd");

const AssetExpenses = () => import("@/pages/Resources/AssetExpenses/AssetExpenses");
const AssetExpensesDetail = () => import("@/pages/Resources/AssetExpenses/AssetExpensesDetail");

const PaymentRecords = () => import("@/pages/Resources/PaymentRecords/PaymentRecords");
const PaymentRecordsDetail = () => import("@/pages/Resources/PaymentRecords/PaymentRecordsDetail");
const PaymentRecordsAdd = () => import("@/pages/Resources/PaymentRecords/PaymentRecordsAdd");

let resources = {
  path: "/",
  component: DashboardLayout,
  name: "Resources",
  children: [
    {
      path: "assets",
      name: "Assets",
      components: { default: Assets },
      meta: { middleware: auth }
    },
    {
      path: "assets/add",
      name: "Add Assets",
      components: { default: AssetAdd },
      meta: { middleware: auth },
      props: {
        default: true
      }
    },
    {
      path: "assets/:assetId",
      name: "Asset Detail",
      components: { default: AssetDetail },
      meta: { middleware: auth }
    },
    {
      path: "assets/:assetId/edit",
      name: "Edit Assets",
      components: { default: AssetEdit },
      meta: { middleware: auth },
      props: {
        default: true
      }
    },
    {
      path: "tenants",
      name: "Tenants",
      components: { default: Tenants },
      meta: { middleware: auth }
    },
    {
      path: "tenants/add",
      name: "Add Tenant",
      components: { default: TenantAdd },
      meta: { middleware: auth },
      props: {
        default: true
      }
    },
    {
      path: "tenants/:tenantId",
      name: "Tenant Detail",
      components: { default: TenantDetail },
      meta: { middleware: auth }
    },
    {
      path: "tenants/:tenantId/edit",
      name: "Edit Tenant",
      components: { default: TenantEdit },
      meta: { middleware: auth },
      props: {
        default: true
      }
    },
    {
      path: "tenure-contracts",
      name: "Tenure Contracts",
      components: { default: TenureContracts },
      meta: { middleware: auth }
    },
    {
      path: "tenure-contracts/:tenureContractId",
      name: "Tenure Contract Detail",
      components: { default: TenureContractDetail },
      meta: { middleware: auth }
    },
    {
      path: "tenure-contracts/add",
      name: "Add Tenure Contract",
      components: { default: TenureContractAdd },
      meta: { middleware: auth },
      props: {
        default: true
      }
    },
    {
      path: "tenure-contracts/:tenureContractId/edit",
      name: "Edit Tenure Contract",
      components: { default: TenureContractEdit },
      meta: { middleware: auth },
      props: {
        default: true
      }
    },
    {
      path: "asset-expenses",
      name: "Asset Expenses",
      components: { default: AssetExpenses },
      meta: { middleware: auth }
    },
    {
      path: "asset-expenses/:assetExpenseId",
      name: "Asset Expenses Detail",
      components: { default: AssetExpensesDetail },
      meta: { middleware: auth }
    },
    {
      path: "payment-records",
      name: "Payment Record",
      components: { default: PaymentRecords },
      meta: { middleware: auth }
    },
    {
      path: "payment-records/add",
      name: "Add Payment Record",
      components: { default: PaymentRecordsAdd },
      meta: { middleware: auth },
      props: {
        default: true
      }
    },
    {
      path: "payment-records/:paymentRecordsId",
      name: "Payment Record Detail",
      components: { default: PaymentRecordsDetail },
      meta: { middleware: auth }
    }
  ]
};

let pagesMenu = {
  path: "/",
  component: DashboardLayout,
  name: "Pages",
  children: [
    {
      path: "rtl",
      name: "rtl",
      component: RTL
    },
    {
      path: "timeline",
      name: "timeline",
      component: TimeLine
    }
  ]
};

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "pricing",
      name: "pricing",
      component: Pricing
    },
    {
      path: "login",
      name: "login",
      component: Login
    },
    {
      path: "forgot-password",
      name: "Forgot Password",
      component: ForgotPassword
    },
    {
      path: "register",
      name: "register",
      component: Register
    },
    {
      path: "lock",
      name: "lock",
      component: Lock
    }
  ]
};

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      components: { default: Buttons },
    },
    {
      path: "grid-system",
      name: "Grid System",
      components: { default: GridSystem }
    },
    {
      path: "panels",
      name: "Panels",
      component: Panels
    },
    {
      path: "sweet-alert",
      name: "Sweet Alert",
      components: { default: SweetAlert }
    },
    {
      path: "notifications",
      name: "Notifications",
      components: { default: Notifications }
    },
    {
      path: "icons",
      name: "Icons",
      components: { default: Icons }
    },
    {
      path: "typography",
      name: "Typography",
      components: { default: Typography }
    }
  ]
};

let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/regular",
  name: "Forms",
  children: [
    {
      path: "regular",
      name: "Regular Forms",
      components: { default: RegularForms }
    },
    {
      path: "extended",
      name: "Extended Forms",
      components: { default: ExtendedForms }
    },
    {
      path: "validation",
      name: "Validation Forms",
      components: { default: ValidationForms }
    },
    {
      path: "wizard",
      name: "Wizard",
      components: { default: Wizard }
    }
  ]
};

let tablesMenu = {
  path: "/table-list",
  component: DashboardLayout,
  redirect: "/table-list/regular",
  name: "Tables",
  children: [
    {
      path: "regular",
      name: "Regular Tables",
      components: { default: RegularTables }
    },
    {
      path: "extended",
      name: "Extended Tables",
      components: { default: ExtendedTables }
    },
    {
      path: "paginated",
      name: "Paginated Tables",
      components: { default: PaginatedTables }
    }
  ]
};

let mapsMenu = {
  path: "/maps",
  component: DashboardLayout,
  name: "Maps",
  redirect: "/maps/google",
  children: [
    {
      path: "google",
      name: "Google Maps",
      components: { default: GoogleMaps }
    },
    {
      path: "full-screen",
      name: "Full Screen Map",
      meta: {
        hideContent: true,
        hideFooter: true
      },
      components: { default: FullScreenMap }
    },
    {
      path: "vector-map",
      name: "Vector Map",
      components: { default: VectorMaps }
    }
  ]
};

let middlewarePages = {
  path: "/",
  component: AuthLayout,
  name: "Middleware Pages",
  redirect: "/",
  children: [
    {
      path: "select-role",
      name: "Select Role",
      components: { default: SelectRole },
      meta: { middleware: auth }
    },
  //   {
  //     path: "full-screen",
  //     name: "Full Screen Map",
  //     meta: {
  //       hideContent: true,
  //       hideFooter: true
  //     },
  //     components: { default: FullScreenMap }
  //   },
  //   {
  //     path: "vector-map",
  //     name: "Vector Map",
  //     components: { default: VectorMaps }
  //   }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home"
  },
  pagesMenu,
  authPages,
  middlewarePages,
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  resources,
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "profile",
        name: "User Profile",
        component: Profile
      },
      {
        path: "Calendar",
        name: "Calendar",
        component: Calendar
      },
      {
        path: "Widgets",
        name: "Widgets",
        components: { default: Widgets }
      },
      {
        path: "charts",
        name: "charts",
        component: Charts
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
