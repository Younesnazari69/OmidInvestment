
export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}
const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "layoutBuilder",
        route: "/builder",
        keenthemesIcon: "switch",
        bootstrapIcon: "bi-layers",
      },
    ],
  },
  {
    pages: [
      {
        sectionTitle: "BaseInfo",
        route: "/BaseInfo",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            sectionTitle: "Region",
            route: "/Region",
            sub: [
              {
                heading: "RegionList",
                route: "/Region/RegionList",
              },
              {
                heading: "RegionForm",
                route: "/Region/RegionForm/null"
              }
            ],
          },
          {
            sectionTitle: "Location",
            route: "/Location",
            sub: [
              {
                heading: "LocationList",
                route: "/Location/LocationList",
              },
              {
                heading: "LocationForm",
                route: "/Location/LocationForm/null"
              },
            ],
          },
          {
            sectionTitle: "Company",
            route: "/Company",
            sub: [
              {
                heading: "CompanyList",
                route: "/Company/CompanyList",
              },
              {
                heading: "CompanyForm",
                route: "/Company/CompanyForm/null"
              },
            ],
          },
        ],
      },
      {
        sectionTitle: "Forms",
        route: "/Forms",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            sectionTitle: "EquipmentAndMachinery",
            route: "/EquipmentAndMachinery",
            sub: [
              {
                heading: "EquipmentAndMachineryList",
                route: "/EquipmentAndMachinery/EquipmentAndMachineryList",
              },
              {
                heading: "EquipmentAndMachineryForm",
                route: "/EquipmentAndMachinery/EquipmentAndMachineryForm/null"
              }
            ],
          },
          {
            sectionTitle: "RealEstate",
            route: "/RealEstate",
            sub: [
              {
                heading: "RealEstateList",
                route: "/RealEstate/RealEstateList",
              },
              {
                heading: "RealEstateForm",
                route: "/RealEstate/RealEstateForm/null"
              },
            ],
          },
          {
            sectionTitle: "Vehicle",
            route: "/Vehicle",
            sub: [
              {
                heading: "VehicleList",
                route: "/Vehicle/VehicleList",
              },
              {
                heading: "VehicleForm",
                route: "/Vehicle/VehicleForm/null"
              },
            ],
          },
        ],
      },
      
      {
        sectionTitle: "Posts",
        route: "/Posts",
        keenthemesIcon: "profile-circle",
        bootstrapIcon: "bi-person",
        sub: [
          {
            heading: "PostList",
            route: "/crafted/account/overview",
          }
        ],
      },
      {
        sectionTitle: "User",
        route: "/User",
        keenthemesIcon: "profile-circle",
        bootstrapIcon: "bi-person",
        sub: [
          {
            heading: "UserList",
            route: "/User/UserList",
          }, 
          {
            heading: "UserForm",
            route: "/User/UserForm/null"
          }
        ],
      },
    ],
  },
  // {
  //   heading: "apps",
  //   route: "/apps",
  //   pages: [
  //     {
  //       sectionTitle: "customers",
  //       route: "/customers",
  //       keenthemesIcon: "abstract-38",
  //       bootstrapIcon: "bi-printer",
  //       sub: [
  //         {
  //           heading: "gettingStarted",
  //           route: "/apps/customers/getting-started",
  //         },
  //         {
  //           heading: "customersListing",
  //           route: "/apps/customers/customers-listing",
  //         },
  //         {
  //           heading: "customerDetails",
  //           route: "/apps/customers/customer-details",
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "subscriptions",
  //       route: "/subscriptions",
  //       keenthemesIcon: "basket",
  //       bootstrapIcon: "bi-cart",
  //       sub: [
  //         {
  //           heading: "getStarted",
  //           route: "/apps/subscriptions/getting-started",
  //         },
  //         {
  //           heading: "subscriptionList",
  //           route: "/apps/subscriptions/subscription-list",
  //         },
  //         {
  //           heading: "addSubscription",
  //           route: "/apps/subscriptions/add-subscription",
  //         },
  //         {
  //           heading: "viewSubscription",
  //           route: "/apps/subscriptions/view-subscription",
  //         },
  //       ],
  //     },
  //     {
  //       heading: "calendarApp",
  //       route: "/apps/calendar",
  //       keenthemesIcon: "calendar-8",
  //       bootstrapIcon: "bi-calendar3-event",
  //     },
  //     {
  //       sectionTitle: "chat",
  //       route: "/chat",
  //       keenthemesIcon: "message-text-2",
  //       bootstrapIcon: "bi-chat-left",
  //       sub: [
  //         {
  //           heading: "privateChat",
  //           route: "/apps/chat/private-chat",
  //         },
  //         {
  //           heading: "groupChat",
  //           route: "/apps/chat/group-chat",
  //         },
  //         {
  //           heading: "drawerChat",
  //           route: "/apps/chat/drawer-chat",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default MainMenuConfig;
