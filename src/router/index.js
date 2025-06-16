import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //TODO: เปิดช่่วคราวเท่านั้น
    {
      path: "/detailregisterpartner",
      name: "DetailRegisterPartner",
      component: () => import("@/views/Detail/DetailRegisterPartner.vue"),
    },

    //TODO:
    {
      path: "/",
      name: "sleepgunhotel",
      component: () => import("@/views/SleepGunHotel.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/registerpartner",
      name: "RegisterPartner",
      component: () => import("@/views/RegisterPartner.vue"),
    },
    {
      path: "/registermember",
      name: "RegisterMember",
      component: () => import("@/views/RegisterMember.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/Register.vue"),
    },
    {
      path: "/waitforapprove",
      name: "WaitforApprove",
      component: () => import("@/views/WaitforApprove.vue"),
    },
    {
      path: "/mainhotel",
      name: "MainHotel",
      component: () => import("@/views/Member/MainMember.vue"),
    },

    {
      path: "/mainmember",
      name: "MainMember",
      component: () => import("@/views/Member/MainMember.vue"),
    },
    {
      path: "/dashboardforexecutive",
      name: "DashBoardforExecutive",
      component: () =>
        import("@/views/Partner/Executive/DashBoardforExecutive.vue"),
    },
    {
      path: "/checkemployeelogin",
      name: "CheckEmployeeLogin",
      component: () =>
        import("@/views/Partner/Employee/CheckEmployeeLogin.vue"),
    },
    {
      path: "/mainemployee",
      name: "MainEmployee",
      component: () =>
        import("@/views/Partner/Executive/ManageEmployee/MainEmployee.vue"),
    },
    {
      path: "/addemployee",
      name: "AddEmployee",
      component: () =>
        import("@/views/Partner/Executive/ManageEmployee/AddEmployee.vue"),
    },
    {
      path: "/editemployee",
      name: "EditEmployee",
      component: () =>
        import("@/views/Partner/Executive/ManageEmployee/EditEmployee.vue"),
    },
    {
      path: "/employeelist",
      name: "EmployeeList",
      component: () =>
        import("@/views/Partner/Executive/ManageEmployee/EmployeeList.vue"),
    },
    {
      path: "/editprofilecompany",
      name: "EditProfileCompany",
      component: () =>
        import("@/views/Partner/Executive/Profile/EditProfileCompany.vue"),
    },
    {
      path: "/dashboardforadmin",
      name: "DashBoardforAdmin",
      component: () => import("@/views/Admin/DashBoardforAdmin.vue"),
    },
    {
      path: "/mainmanagemember",
      name: "MainManageMember",
      component: () =>
        import("@/views/Admin/ManageMember/MainManageMember.vue"),
    },
    {
      path: "/mainmanagepartner",
      name: "MainManagepartner",
      component: () =>
        import("@/views/Admin/ManagePartner/MainManagePartner.vue"),
    },
    {
      path: "/addroom",
      name: "AddRoom",
      component: () => import("@/views/Partner/Room/AddRoom.vue"),
    },
    {
      path: "/editroom/:id",
      name: "EditRoom",
      component: () => import("@/views/Partner/Room/EditRoom.vue"),
    },
    {
      path: "/editroom/:id",
      name: "EditRoom",
      component: () => import("@/views/Partner/Room/EditRoom.vue"),
    },
    {
      path: "/roomlist",
      name: "roomList",
      component: () => import("@/views/Partner/Room/RoomList.vue"),
    },
    {
      path: "/approvepartner",
      name: "ApprovePartner",
      component: () =>
        import("@/views/Admin/ManagePartner/Approve/ApprovePartner.vue"),
    },
    {
      path: "/mainpartner",
      name: "MainPartner",
      component: () => import("@/views/Admin/ManagePartner/MainPartner.vue"),
    },
    {
      path: "/request",
      name: "Request",
      component: () =>
        import("@/views/Admin/ManagePartner/Approve/Request.vue"),
    },
    {
      path: "/noapprovepartner",
      name: "NoApprovePartner",
      component: () =>
        import("@/views/Admin/ManagePartner/Approve/NoApprovePartner.vue"),
    },
    {
      path: "/mainbyepromotion",
      name: "MainByeProMotion",
      component: () =>
        import("@/views/Partner/Executive/Promotion/MainByePromotion.vue"),
    },
    {
      path: "/mainpromotion",
      name: "MainPromotion",
      component: () => import("@/views/Admin/Promotion/MainPromotion.vue"),
    },
    {
      path: "/addpromotion",
      name: "AddProMotion",
      component: () => import("@/views/Admin/Promotion/AddProMotion.vue"),
    },
    {
      path: "/mainbookingtossagun",
      name: "MainBookingTossagun",
      component: () =>
        import(
          "@/views/Partner/ManageHotel/ManageBookingTossagun/MainBookingTossagun.vue"
        ),
    },
    {
      path: "/mainhotelroom",
      name: "MainHotelRoom",
      component: () =>
        import("@/views/Partner/ManageHotel/ManageHotel/MainHotelRoom.vue"),
    },
    {
      path: "/maincheckincheckout",
      name: "Maincheckincheckout",
      component: () =>
        import(
          "@/views/Partner/ManageHotel/ManageHotel/MainCheckinCheckOut.vue"
        ),
    },
    {
      path: "/checkin",
      name: "CheckIn",
      component: () =>
        import("@/views/Partner/ManageHotel/ManageHotel/CheckIn.vue"),
    },
    {
      path: "/checkout",
      name: "CheckOut",
      component: () =>
        import("@/views/Partner/ManageHotel/ManageHotel/CheckOut.vue"),
    },
    {
      path: "/mainreport",
      name: "MainReport",
      component: () =>
        import("@/views/Partner/Executive/Report/MainReport.vue"),
    },
    {
      path: "/bangkokhotel",
      name: "BangkokHotel",
      component: () => import("@/views/Member/Province/BangkokHotel.vue"),
    },
    {
      path: "/chingmaihotel",
      name: "chingMaiHotel",
      component: () => import("@/views/Member/Province/ChingMaiHotel.vue"),
    },
    {
      path: "/krabihotel",
      name: "KrabiHotel",
      component: () => import("@/views/Member/Province/KrabiHotel.vue"),
    },
    {
      path: "/moreprovincehotel",
      name: "MoreProvinceHotel",
      component: () => import("@/views/Member/Province/MoreProvinceHotel.vue"),
    },
    {
      path: "/roomdetailmember",
      name: "RoomDetailMember",
      component: () => import("@/views/Member/RoomDetailMember.vue"),
    },
    {
      path: "/mainhoteldetailroom",
      name: "MainHotelDetailRoom",
      component: () =>
        import(
          "@/views/Partner/ManageHotel/ManageHotel/MainHotelDetailRoom.vue"
        ),
    },
    {
      path: "/maindetailbookingtossagun",
      name: "MainDetailBookingTossagun",
      component: () =>
        import(
          "@/views/Partner/ManageHotel/ManageBookingTossagun/MainDetailBookingTossagun.vue"
        ),
    },
    {
      path: "/editdetailhotel",
      name: "EditDetailHotel",
      component: () =>
        import("@/views/Partner/Executive/Profile/EditDetailHotel.vue"),
    },
    {
      path: "/mainprofilecompany",
      name: "MainProfileCompany",
      component: () =>
        import("@/views/Partner/Executive/Profile/MainProfileCompany.vue"),
    },
    {
      path: "/profilecompany",
      name: "ProfileCompany",
      component: () =>
        import("@/views/Partner/Executive/Profile/ProfileCompany.vue"),
    },
    {
      path: "/detailhotel",
      name: "DetailHotel",
      component: () =>
        import("@/views/Partner/Executive/Profile/DetailHotel.vue"),
    },
    {
      path: "/payment",
      name: "Payment",
      component: () => import("@/views/Member/Payment.vue"),
    },
    {
      path: "/hotelall",
      name: "HotelAll",
      component: () => import("@/views/Member/HotelAll.vue"),
    },
    {
      path: "/mainprofile",
      name: "MainProfile",
      component: () => import("@/views/Member/Profile/MainProfile.vue"),
    },
    {
      path: "/detailpartnerall",
      name: "DetailPartnerAll",
      component: () =>
        import("@/views/Admin/ManagePartner/DetailPartnerAll.vue"),
    },
    {
      path: "/mainpartnersleepgun",
      name: "MainPartnerSleepGun",
      component: () =>
        import(
          "@/views/Admin/ManagePartner/PartnerSleepGun/MainPartnerSleepGun.vue"
        ),
    },
    {
      path: "/detailmemberall",
      name: "DetailMemberAll",
      component: () => import("@/views/Admin/ManageMember/DetailMemberAll.vue"),
    },

    {
      path: "/registermemberemail",
      name: "RegisterMemberEmail",
      component: () => import("@/views/RegisterMemberEmail.vue"),
    },
    {
      path: "/addtypehotelall",
      name: "AddTypeHotelAll",
      component: () =>
        import(
          "@/views/Admin/ManagePartner/PartnerSleepGun/AddTypeHotelAll.vue"
        ),
    },
    {
      path: "/loginpartner",
      name: "LoginPartner",
      component: () => import("@/views/LoginPartner.vue"),
    },

    {
      path: "/detailpartnerall/:id",
      name: "DetailPartnerAll",
      component: () => import("@/views/Admin/ManagePartner/DetailPartnerAll.vue"),
    },
  ],
});

export default router;
