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
            sectionTitle: "OccasionTypes",
            route: "/OccasionTypes",
            sub: [
              {
                heading: "OccasionTypeList",
                route: "/crafted/pages/profile/overview",
              },
              {
                heading: "OccasionTypeForm",
                route: "/crafted/pages/profile/projects",
              }
            ],
          },
          {
            sectionTitle: "OccasionImages",
            route: "/OccasionImages",
            sub: [
              {
                heading: "OccasionImageList",
                route: "/crafted/pages/wizards/horizontal",
              },
              {
                heading: "OccasionImageForm",
                route: "/crafted/pages/wizards/vertical",
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
        sectionTitle: "PublicUsers",
        route: "/PublicUsers",
        keenthemesIcon: "profile-circle",
        bootstrapIcon: "bi-person",
        sub: [
          {
            heading: "PublicUserList",
            route: "/PublicUsers/PublicUserList",
          }, 
          {
            heading: "EditUser",
            route: "/PublicUsers/EditUser/null"
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
