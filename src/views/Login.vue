<template>
  <form @submit.prevent="handleSubmit" autocomplete="off">
    <div>
      <label for="username">Username:</label>
      <input id="username" name="username" v-model="form.username" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input id="password" name="password" v-model="form.password" type="password" required />
    </div>

    <!-- เลือกประเภทผู้ใช้ -->
    <div>
      <label for="role">เข้าสู่ระบบในบทบาท:</label>
      <select id="role" v-model="form.role">
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
        <option value="member">Member</option>
        <option value="partner">Partner</option>
      </select>
    </div>

    <button type="submit">เข้าสู่ระบบ</button>

    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
  </form>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        role: "admin", // ค่าเริ่มต้น
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      let url = "";

      // เลือก URL login ตาม role
      switch (this.form.role) {
        case "admin":
          url = "http://localhost:9999/SleepGun/adminLogin/login";
          break;
        case "employee":
          url = "http://localhost:9999/SleepGun/employeeLogin/login";
          break;
        case "member":
          url = "http://localhost:9999/SleepGun/memberLogin/login";
          break;
        case "partner":
          url = "http://localhost:9999/SleepGun/partnerLogin/login";
          break;
        default:
          this.errorMessage = "ไม่สามารถเข้าสู่ระบบได้: ไม่รู้จักบทบาทผู้ใช้";
          return;
      }

      try {
        const response = await axios.post(url, {
          username: this.form.username,
          password: this.form.password,
        });

        const token = response.data.token;

        if (token) {
          localStorage.setItem("token", token);

          // ✅ เปลี่ยนหน้าตาม role
          if (this.form.role === "admin") {
            this.$router.push("/addemployee");
          } else if (this.form.role === "employee") {
            this.$router.push("/checkemployeelogin");
          } else if (this.form.role === "member") {
            this.$router.push("/");
          } else if (this.form.role === "partner") {
            this.$router.push("/register");
          }
        } else {
          this.errorMessage = "เข้าสู่ระบบไม่สำเร็จ: ไม่มี token";
        }
      } catch (err) {
        this.errorMessage =
          err.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ";
        console.error("Login error:", err);
      }
    },
  },
};
</script>
