import jwtDecode from "jwt-decode";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import App from "./App.vue";
import { createGAuth } from "vue3-google-oauth2";
// import html2canvas from 'html2canvas';

// store/index.js

//import routerAdmin from './router/admin.js'; // นำมาใช้ Router ที่เราสร้าง
import router from "./router/index.js"; // นำมาใช้ Router ที่เราสร้าง
import "./assets/main.css";
import store from "./store";

import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Rating from "primevue/rating";
import mitt from "mitt";
import { gapi } from "gapi-script";
// import html2pdf from "html2pdf.js";

const bus = mitt();

import "primeicons/primeicons.css"; //icons
import "primevue/resources/primevue.min.css"; //core css
import "primevue/resources/themes/lara-light-blue/theme.css"; //theme

const app = createApp(App); // สร้างแอปพลิเคชัน Vue ที่เป็นที่ต้องการ
app.config.globalProperties.$gapi = gapi;

import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Chip from "primevue/chip";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import ProgressSpinner from "primevue/progressspinner";
import Row from "primevue/row";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Sidebar from "primevue/sidebar";
import Password from "primevue/password";
import Textarea from "primevue/textarea";
import FileUpload from "primevue/fileupload";
import Image from "primevue/image";
import Galleria from "primevue/galleria";
import Checkbox from "primevue/checkbox";
import SelectButton from "primevue/selectbutton";
import InputMask from "primevue/inputmask";
import OverlayPanel from "primevue/overlaypanel";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import Slider from "primevue/slider";

// google map api //
import VueGoogleMaps from "@fawmi/vue-google-maps";
import * as GAuth from "vue3-google-oauth2";

// Attach EventBus to the app instance
app.config.globalProperties.$bus = bus;

app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(store);
app.directive("badge", BadgeDirective);

app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDqEaHeKU1gJeKG9BZKlWs0iqva4aG_FJc",
    libraries: "places",
  },
});

// app.use(GAuth, {
//   clientId:"508535666294-1btbvdk9ipqdq0779pu8qsp5d1shmn33.apps.googleusercontent.com",
//   scope: "email",
//   prompt: "consent",
//   fetch_basic_profile: false,
// });
const gAuthOptions = {
  clientId:
    "508535666294-1btbvdk9ipqdq0779pu8qsp5d1shmn33.apps.googleusercontent.com",
  scope: "email",
  prompt: "consent",
  fetch_basic_profile: false,
};
app.use(GAuth, gAuthOptions);

try {
  const token = localStorage.getItem("token");
  const jwt_decode = jwtDecode(token);
  console.log("jwt_decode:", jwt_decode); // เพิ่มบรรทัดนี้

  if (jwt_decode.roles == "admin") {
    console.log("admin");
  } else if (jwt_decode.roles == "partner") {
    console.log("partner");
  } else if (jwt_decode.roles == "member") {
    console.log("member");
  } else {
    console.log("ยังไม่ได้ล็อคอิน");
  }
} catch (err) {
  // กรณีที่มีข้อผิดพลาด
  console.error("Error decoding JWT:", err.message);
}
app.use(router);
//prime flex
import "primeflex/primeflex.css";
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Card", Card);
app.component("Dropdown", Dropdown);
app.component("Menubar", Menubar);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Chip", Chip);
app.component("Calendar", Calendar);
app.component("Toast", Toast);
app.component("ConfirmDialog", ConfirmDialog);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Dialog", Dialog);
app.component("Sidebar", Sidebar);
app.component("Password", Password);
app.component("Textarea", Textarea);
app.component("InputNumber", InputNumber);
app.component("InputSwitch", InputSwitch);
app.component("Rating", Rating);
app.component("SelectButton", SelectButton);
app.component("FileUpload", FileUpload);
app.component("Image", Image);
app.component("Galleria", Galleria);
app.component("Checkbox", Checkbox);
app.component("InputMask", InputMask);
app.component("OverlayPanel", OverlayPanel);
app.component("Badge", Badge);
app.component("Slider", Slider);

app.mount("#app"); // นำแอปพลิเคชัน Vue ลงใน DOM
