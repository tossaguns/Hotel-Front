// router.js
/*
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Homepage.vue";
import About from "@/views/Aboutpage.vue";
import DashBoard from "@/views/DashBoardPage.vue";
import PopularSection from "@/views/section/PopularSection.vue";
import Footer from "@/components/Footer/footer.vue";
import DashBoardAdmin from "@/views/admin/DashBoardAdmin";
import ManageAdmin from "@/views/admin/manageadmin/ManageAdmin.vue";
import CreateAccount from "@/views/CreateAccount.vue";
// import  CreateAccount from '@/views/CreateAccount.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashBoard,
    },
    {
      path: "/popular",
      name: "popular",
      component: PopularSection,
    },
    {
      path: "/footer",
      name: "footer",
      component: Footer,
    },
    {
      path: "/dashboardadmin",
      name: "dashboardadmin",
      component: DashBoardAdmin,
    },
    {
      path: "/manageadmin",
      name: "manageadmin",
      component: ManageAdmin,
    },
    //TODO:เพิ่มตรงนี้ขึ้นมา execution/employee/addhotel1/edithotel
    {
      path: "/executive",
      name: "executive",
      component: () => import("@/views/partner/MainPartner/Executive.vue"),
    },
    {
      path: "/employee",
      name: "employee",
      component: () => import("@/views/partner/MainPartner/Employee.vue"),
    },
    {
      path: "/addhotel1",
      name: "addhotel1",
      component: () => import("@/views/partner/ManageHotel1/AddHotel1.vue"),
    },
    {
      path: "/mainhotel",
      name: "mainhotel",
      component: () => import("@/views/partner/ManageHotel1/MainHotel.vue"),
    },
    {
      path: "/edithotel/:id",
      name: "edithotel",
      component: () => import("@/views/partner/ManageHotel1/EditHotel.vue"),
    },

    //TODO: เพิ่ม MainEmployee/AddEmployee/editprofilecompan
    {
      path: "/mainemployee",
      name: "mainemployee",
      component: () =>
        import("@/views/partner/ManageEmployee/MainEmployee.vue"),
    },
    {
      path: "/addemployee",
      name: "addemployee",
      component: () => import("@/views/partner/ManageEmployee/AddEmployee.vue"),
    },
    {
      path: "/editprofilecompany",
      name: "editprofilecompany",
      component: () => import("@/views/partner/EditProfileCompany.vue"),
    },
    //TODO: เพิ่ม Checkin/CheckOut
    {
      path: "/checkin",
      name: "checkin",
      component: () => import("@/views/partner/CheckIn_CheckOut/CheckIn.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("@/views/partner/CheckIn_CheckOut/CheckOut.vue"),
    },
    {
      path: "/maincheckin-out",
      name: "maincheckin-out",
      component: () =>
        import("@/views/partner/CheckIn_CheckOut/MainCheckIn-Out.vue"),
    },
    //TODO: เพิ่ม MainPayment/allItemPay/WaitPay/SucceedPay/NoSucceedPay
    {
      path: "/mainpayment",
      name: "mainpayment",
      component: () => import("@/views/partner/Payment/MainPayment.vue"),
    },
    {
      path: "/allitempay",
      name: "allitempay",
      component: () => import("@/views/partner/Payment/AllItemPay.vue"),
    },
    {
      path: "/waitpay",
      name: "waitpay",
      component: () => import("@/views/partner/Payment/WaitPay.vue"),
    },
    {
      path: "/succeedpay",
      name: "succeedpay",
      component: () => import("@/views/partner/Payment/SucceedPay.vue"),
    },
    {
      path: "/nosucceedpay",
      name: "nosucceedpay",
      component: () => import("@/views/partner/Payment/NoSucceedPay.vue"),
    },
    //TODO: slip/receipt/receiptvat
    {
      path: "/slip",
      name: "slip",
      component: () => import("@/views/partner/Receipt/Slip.vue"),
    },
    {
      path: "/receipt",
      name: "receipt",
      component: () => import("@/views/partner/Receipt/Receipt.vue"),
    },
    {
      path: "/receiptvat",
      name: "receiptvat",
      component: () => import("@/views/partner/Receipt/Receiptvat.vue"),
    },
    {
      path: "/addadmin",
      name: "addadmin",
      component: () => import("@/views/admin/manageadmin/AddAdmin.vue"),
    },
    {
      path: "/editadmin/:id",
      name: "editadmin",
      component: () => import("@/views/admin/manageadmin/EditAdmin.vue"),
    },
    {
      path: "/editpartner",
      name: "editpartner",
      component: () => import("@/views/partner/managepartner/EditPartner.vue"),
    },
    {
      path: "/roomdetail",
      name: "roomdetail",
      component: () => import("@/views/admin/manageRoom/RoomDetail.vue"),
    },
    {
      path: "/popular",
      name: "popular",
      component: () => import("@/views/section/PopularSection.vue"),
    },
    {
      path: "/createaccount",
      name: "createaccount",
      component: CreateAccount,
    },
    {
      path: "/hotel/:id",
      name: "hotel", // เพิ่ม name เพื่อให้สามารถใช้ router-link ไปยังนั้นได้
      component: () => import("@/views/singlepage/Page_One.vue"),
      props: true,
    },
    ,
    {
      path: "/register",
      name: "register",
      component: CreateAccount,
    },
    {
      path: "/dashboardpartner",
      name: "dashboardpartner",
      component: () => import("@/views/partner/DashBoardPartner.vue"),
    },
    {
      path: "/contractmodal",
      name: "contractmodal",
      component: () => import("@/components/Contract_Modal.vue"),
    },
    {
      path: "/managepartner",
      name: "managepartner",
      component: () =>
        import("@/views/partner/managepartner/ManagePartner.vue"),
    },
    {
      path: "/approvepartner",
      name: "approvepartner",
      component: () => import("@/views/admin/ApprovePartner.vue"),
    },
    {
      path: "/managemember",
      name: "managemember",
      component: () => import("@/views/member/managemember/ManageMember.vue"),
    },
    // {
    //   path: "/managehotel",
    //   name: "managehotel",
    //   component:  () => import('@/views/partner/managehotel/ManageHotel.vue') ,
    // },
    {
      path: "/addhotel",
      name: "addhotel",
      component: () => import("@/views/partner/managehotel/AddHotel.vue"),
    },
    {
      path: "/approveroom",
      name: "approveroom",
      component: () => import("@/views/admin/ApproveRoom.vue"),
    },
    {
      path: "/roomadmin",
      name: "roomadmin",
      component: () => import("@/views/admin/manageRoom/RoomAdmin.vue"),
    },
    {
      path: "/manageroom",
      name: "manageroom",
      component: () => import("@/views/partner/managehotel/ManageRoom.vue"),
    },
    {
      path: "/managebooking",
      name: "managebooking",
      component: () =>
        import("@/views/partner/managebooking/ApproveBooking.vue"),
    },
    {
      path: "/bookingmember",
      name: "bookingmember",
      component: () => import("@/views/member/booking/BookingMember.vue"),
    },
    {
      path: "/approvepayment",
      name: "approvepayment",
      component: () =>
        import("@/views/partner/managebooking/ApprovePayment.vue"),
    },
    ,
    {
      path: "/checkin-out",
      name: "checkin-out",
      component: () => import("@/views/member/booking/Checkinout.vue"),
    },
    {
      path: "/addroomtype",
      name: "addroomtype",
      component: () => import("@/views/admin/manageRoom/AddRoomtype.vue"),
    },
    ,
    {
      path: "/bookingall",
      name: "bookingall",
      component: () => import("@/views/admin/booking/allbooking.vue"),
    },
    {
      path: "/editadminuser",
      name: "editadminuser",
      component: () => import("@/views/admin/manageadmin/EditAdminuser.vue"),
    },
    {
      path: "/editmember",
      name: "editmember",
      component: () => import("@/views/member/managemember/EditMember.vue"),
    },
    {
      path: "/contractmanage",
      name: "contractmanage",
      component: () => import("@/views/admin/ContractManage.vue"),
    },
    {
      path: "/contractmembermanage",
      name: "contractmembermanage",
      component: () => import("@/views/member/ContractMemberManage.vue"),
    },
    ///// timeline login admin,partner,member //////
    {
      path: "/admintimeline",
      name: "admintimeline",
      component: () => import("@/views/admin/timeLineLogin/adminTimeLine.vue"),
    },
    {
      path: "/partnertimeline",
      name: "partnertimeline",
      component: () =>
        import("@/views/admin/timeLineLogin/partnerTimeLine.vue"),
    },
    {
      path: "/membertimeline",
      name: "membertimeline",
      component: () => import("@/views/admin/timeLineLogin/memberTimeLine.vue"),
    },
    ////////// ADS ///////////
    {
      path: "/manageAds",
      name: "manageAds",
      component: () => import("../views/admin/managementAds/ManagementAds.vue"),
    },
    ////////// Review ///////////
    {
      path: "/manageReview",
      name: "managereviw",
      component: () => import("../views/member/manageReview/ManageReview.vue"),
    },
  ],
});

export default router;
*/
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
  ],
});

export default router;
