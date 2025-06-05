<template>
  <form @submit.prevent="handleSubmit">
    <div><label>Username: <input v-model="form.username" /></label></div>
    <div><label>รหัสผ่าน: <input v-model="form.password" type="password" /></label></div>
    <button type="submit">เข้าสู่ระบบ</button>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("เข้าสู่ระบบด้วย:", this.form);
    },
  },
};
</script>
