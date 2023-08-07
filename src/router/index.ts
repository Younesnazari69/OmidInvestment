import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "داشبورد",
          breadcrumbs: ["داشبورد"],
        },
      },
      {
        path: "/builder",
        name: "builder",
        component: () => import("@/views/LayoutBuilder.vue"),
        meta: {
          pageTitle: "تنظیمات",
          breadcrumbs: ["تنظیمات"],
        },
      },
      {
        path: "/Region/RegionList",
        name: "RegionList",
        component: () => import("@/views/Pages/BaseInfo/Location/Region/RegionList.vue"),
        meta: {
          pageTitle: "کشور",
          breadcrumbs: ["کشور", "لیست کشور"],
        },
      },
      {
        path: "/Region/RegionForm/:id",
        name: "RegionForm",
        component: () => import("@/views/Pages/BaseInfo/Location/Region/RegionForm.vue"),
        meta: {
          pageTitle: "کشور",
          breadcrumbs: ["کشور", "ویرایش/افزودن کشور"],
        },
      },
      {
        path: "/Location/LocationList",
        name: "LocationList",
        component: () => import("@/views/Pages/BaseInfo/Location/LocationList.vue"),
        meta: {
          pageTitle: "استان/شهر",
          breadcrumbs: ["استان/شهر", "لیست استان/شهر"],
        },
      },
      {
        path: "/Location/LocationForm/:id",
        name: "LocationForm",
        component: () => import("@/views/Pages/BaseInfo/Location/LocationForm.vue"),
        meta: {
          pageTitle: "استان/شهر",
          breadcrumbs: ["استان/شهر", "ویرایش/افزودن استان/شهر"],
        },
      },
      {
        path: "/Company/CompanyList",
        name: "CompanyList",
        component: () => import("@/views/Pages/Company/CompanyList.vue"),
        meta: {
          pageTitle: "شرکت",
          breadcrumbs: ["شرکت", "لیست شرکت"],
        },
      },
      {
        path: "/Company/CompanyForm/:id",
        name: "CompanyForm",
        component: () => import("@/views/Pages/Company/CompanyForm.vue"),
        meta: {
          pageTitle: "شرکت",
          breadcrumbs: ["شرکت", "ویرایش/افزودن شرکت"],
        },
      },    
      {
        path: "/EquipmentAndMachinery/EquipmentAndMachineryList",
        name: "EquipmentAndMachineryList",
        component: () => import("@/views/Pages/Forms/EquipmentAndMachinery/EquipmentAndMachineryList.vue"),
        meta: {
          pageTitle: "ماشین آلات و تجهزات",
          breadcrumbs: ["ماشین آلات و تجهزات", "لیست ماشین آلات و تجهزات"],
        },
      },
      {
        path: "/EquipmentAndMachinery/EquipmentAndMachineryForm/:id",
        name: "EquipmentAndMachineryForm",
        component: () => import("@/views/Pages/Forms/EquipmentAndMachinery/EquipmentAndMachineryForm.vue"),
        meta: {
          pageTitle: "ماشین آلات و تجهزات",
          breadcrumbs: ["ماشین آلات و تجهزات", "ویرایش/افزودن ماشین آلات و تجهزات"],
        },
      },
      {
        path: "/RealEstate/RealEstateList",
        name: "RealEstateList",
        component: () => import("@/views/Pages/Forms/RealEstate/RealEstateList.vue"),
        meta: {
          pageTitle: "املاک",
          breadcrumbs: ["املاک", "لیست املاک"],
        },
      },
      {
        path: "/RealEstate/RealEstateForm/:id",
        name: "RealEstateForm",
        component: () => import("@/views/Pages/Forms/RealEstate/RealEstateForm.vue"),
        meta: {
          pageTitle: "املاک",
          breadcrumbs: ["املاک", "ویرایش/افزودن املاک"],
        },
      },

      {
        path: "/Vehicle/VehicleList",
        name: "VehicleList",
        component: () => import("@/views/Pages/Forms/Vehicle/VehicleList.vue"),
        meta: {
          pageTitle: "وسایل نقلیه",
          breadcrumbs: ["وسایل نقلیه", "لیست وسایل نقلیه"],
        },
      },
      {
        path: "/Vehicle/VehicleForm/:id",
        name: "VehicleForm",
        component: () => import("@/views/Pages/Forms/Vehicle/VehicleForm.vue"),
        meta: {
          pageTitle: "وسایل نقلیه",
          breadcrumbs: ["وسایل نقلیه", "ویرایش/افزودن وسایل نقلیه"],
        },
      },
      {
        path: "/Files/FilesList/:id&:type",
        name: "FilesList",
        component: () => import("@/views/Pages/Forms/Files/FilesList.vue"),
        meta: {
          pageTitle: "فایلها",
          breadcrumbs: ["فایلها", "لیست فایلها"],
        },
      },

      {
        path: "/User/UserList",
        name: "UserList",
        component: () => import("@/views/Pages/User/UserList.vue"),
        meta: {
          pageTitle: "کاربران",
          breadcrumbs: ["کاربران", "لیست کاربران"],
        },
      },
      {
        path: "/User/UserForm/:guid",
        name: "UserForm",
        component: () => import("@/views/Pages/User/UserForm.vue"),
        meta: {
          pageTitle: "ویرایش/افزودن کاربر",
          breadcrumbs: ["کاربران", "ویرایش/افزودن کاربر"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      // {
      //   path: "/password-reset",
      //   name: "password-reset",
      //   component: () =>
      //     import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      //   meta: {
      //     pageTitle: "Password reset",
      //   },
      // },
    ],
  },
   {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory('/Forms'),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;
  // verify auth token before each page change
  authStore.verifyAuth();
  // reset config to initial state
  configStore.resetLayoutConfig();
  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
