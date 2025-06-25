<template>
  <div class="flex justify-center items-center h-screen loginmember">
   
    <!-- พื้นหลังเบลอ -->
    <div class="absolute inset-0 z-0">
      <div class="w-full h-full backdrop-blur-sm bg-black/30"></div>
    </div>
    
    <!-- ปุ่มเปลี่ยน role -->
    <button v-if="windowWidth <= 700" @click="isVerifyOtp = !isVerifyOtp" class="absolute top-3 right-3 z-20
         px-3 py-1.5 text-xs font-medium
         bg-white/90 backdrop-blur border border-gray-300 text-gray-700
         rounded-full shadow-md
         hover:bg-white hover:shadow-lg
         active:scale-95 transition-all duration-200">
      {{ isVerifyOtp ? '👤Partner' : '🧑‍💼Employee' }}
    </button>

    <div
      :class="['relative z-10 transform overflow-hidden w-[80%] md:w-[60%] max-w-full min-h-[70%] md:min-h-[80%] rounded-[25px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_0px_10px_rgba(0,0,0,0.22)] transition-all duration-500', { 'right-panel-active': isVerifyOtp }]">

      <!-- LoginEmployee -->
      <div class="form-container text-center absolute top-0 h-full w-1/2 transition-all duration-500"
        :class="{ 'translate-x-full z-10 opacity-100': isVerifyOtp, 'opacity-0 z-0': !isVerifyOtp }">
        
        <form class="bg-white flex flex-col h-full tems-center justify-center px-6 md:px-10"
          @submit.prevent="handleLoginEmployee">
          <div class="w-full max-w-md">
            <h1 class="text-center text-2xl font-semibold mb-6">เข้าสู่ระบบ Employee</h1>

            <!-- email -->
            <div class="form-control mt-4">
              <input type="email" v-model="employeeLogin.email" @input="onEmployeeEmailInput" placeholder="อีเมล"
                class="w-full px-4 py-3 text-base border-b-2 border-gray-400 focus:outline-none focus:border-yellow-400 placeholder-gray-500" />
              <small class="text-red-500 text-sm mt-1 block">{{ loginErrors.email }}</small>
            </div>

            <!-- password -->
            <div class="form-control mt-4">
              <input :type="showPassword ? 'text' : 'password'" v-model="employeeLogin.password" placeholder="รหัสผ่าน"
                class="w-full px-4 py-3 text-base border-b-2 border-gray-400 focus:outline-none focus:border-yellow-400 placeholder-gray-500" />
              <small class="text-red-500 text-sm mt-1 block">{{ loginErrors.password }}</small>
            </div>

            <!-- ตัวเลือกผู้ใช้ -->
            <div class="contentlogin my-10">
              <div class="checkbox">
                <input type="checkbox" @click="togglePassword" id="checkbox" />
                <label for="checkbox">เปิดรหัสผ่าน</label>
              </div>
              <div class="pass-link">
                <a class="text-xs md:text-sm text-gray-500" href="#">รหัสผ่านไม่ถูกต้อง</a>
              </div>
            </div>

            <button
              class="relative rounded-full text-[15px] font-bold px-5 lg:px-8 py-3 tracking-wide capitalize transition-all duration-300 hover:tracking-wider active:scale-95 focus:outline-none bg-[#fff89a] text-black"
              type="submit">เข้าสู่ระบบ
            </button>

          </div>
        </form>

      </div>

      <!-- LoginPatrner -->
      <div class="form-container text-center absolute top-0 h-full w-1/2 transition-all duration-500"
        :class="{ 'translate-x-full opacity-0 z-0': isVerifyOtp, 'z-10 opacity-100': !isVerifyOtp }">
        
        <form class="bg-white flex flex-col h-full tems-center justify-center px-6 md:px-10"
          @submit.prevent="handleLoginPartner">
          <div class="w-full max-w-md">
            <h1 class="text-center text-2xl font-semibold mb-6">เข้าสู่ระบบ Partner</h1>

            <!-- email -->
            <div class="form-control mt-4">
              <input type="email" v-model="login.email" @input="onEmailInput" placeholder="อีเมล"
                class="w-full px-4 py-3 text-base border-b-2 border-gray-400 focus:outline-none focus:border-yellow-400 placeholder-gray-500" />
              <small class="text-red-500 text-sm mt-1 block">{{ loginErrors.email }}</small>
            </div>

            <!-- password -->
            <div class="form-control mt-4">
              <input :type="showPassword ? 'text' : 'password'" v-model="login.password" placeholder="รหัสผ่าน"
                class="w-full px-4 py-3 text-base border-b-2 border-gray-400 focus:outline-none focus:border-yellow-400 placeholder-gray-500" />
              <small class="text-red-500 text-sm mt-1 block">{{ loginErrors.password }}</small>
            </div>

            <!-- ตัวเลือกผู้ใช้ -->
            <div class="contentlogin my-10">
              <div class="checkbox">
                <input type="checkbox" @click="togglePassword" id="checkbox" />
                <label for="checkbox">เปิดรหัสผ่าน</label>
              </div>
              <div class="pass-link">
                <a class="text-xs md:text-sm text-gray-500" href="#">รหัสผ่านไม่ถูกต้อง</a>
              </div>
            </div>

            <button
              class="relative rounded-full text-[15px] font-bold px-5 lg:px-8 py-3 tracking-wide capitalize transition-all duration-300 hover:tracking-wider active:scale-95 focus:outline-none bg-[#fff89a] text-black"
              type="submit">เข้าสู่ระบบ
            </button>

          </div>
        </form>

      </div>

      <!-- เปลี่ยนหน้า Login -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 class="title">เข้าสู่ระบบ Partner</h1>
            <button class="bg-white/20 border-2 border-white rounded-full text-white px-3 lg:px-8 py-2"
              @click="isVerifyOtp = false">
              <i class="fa-solid fa-arrow-left"></i>
              Partner Login
            </button>
          </div>

          <div class="overlay-panel overlay-right">
            <h1 class="title">เข้าสู่ระบบ Employee</h1>
            <button class="border-2 border-white rounded-full px-3 lg:px-8 py-2 bg-yellow-200 text-black text-center"
              @click="isVerifyOtp = true">
              Employee Login
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isVerifyOtp: false,
      isOverlayRegister: false,
      windowWidth: window.innerWidth,
      showPassword: false,

      login: {
        email: '',
        password: '',
        remember: false
      },

      employeeLogin: {
        email: '',
        password: '',
        remember: false
      },

      loginErrors: {
        email: '',
        password: ''
      },
    };
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // เช็คตอนเริ่มต้น
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    validateEmail(email) {
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(email);
    },

    handleLoginEmployee() {
      this.loginErrors = {
        email: '',
        password: ''
      };

      const { email, password } = this.employeeLogin;
      let hasError = false;

      if (!email) {
        this.loginErrors.email = '*กรุณากรอกอีเมล';
        hasError = true;
      } else if (!email.includes('@')) {
        this.loginErrors.email = '*อีเมลต้องมีเครื่องหมาย @';
        hasError = true;
      } else if (!this.validateEmail(email)) {
        this.loginErrors.email = '*รูปแบบอีเมลไม่ถูกต้อง';
        hasError = true;
      }

      if (!password) {
        this.loginErrors.password = '*กรุณากรอกรหัสผ่าน';
        hasError = true;
      }

      if (!hasError) {
        alert('เข้าสู่ระบบ Employee สำเร็จ');
        this.$router.push({ name: 'CheckEmployeeLogin' });
      }
    },

    handleLoginPartner() {
      this.loginErrors = {
        email: '',
        password: ''
      };

      const { email, password } = this.login;
      let hasError = false;

      if (!email) {
        this.loginErrors.email = '*กรุณากรอกอีเมล';
        hasError = true;
      } else if (!email.includes('@')) {
        this.loginErrors.email = '*อีเมลต้องมีเครื่องหมาย @';
        hasError = true;
      } else if (!this.validateEmail(email)) {
        this.loginErrors.email = '*รูปแบบอีเมลไม่ถูกต้อง';
        hasError = true;
      }

      if (!password) {
        this.loginErrors.password = '*กรุณากรอกรหัสผ่าน';
        hasError = true;
      }

      if (!hasError) {
        alert('เข้าสู่ระบบ Partner สำเร็จ');
        this.$router.push({ name: 'DashBoardforAdmin' });
      }
    },

    onEmailInput() {
      this.loginErrors.email = '';
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 700) {
        // หน้าจอเล็ก hide overlay
        this.isOverlayRegister = false;
      } else {
        this.isOverlayRegister = true;
      }
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

.loginmember {
  background: url('/public/images/hotel-room/room05.jpg');
  background-size: cover;
  background-attachment: fixed;
}

h1.title {
  font-size: 25px;
  margin: 0;
}

.contentlogin {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 50px; */
}

.contentlogin input {
  accent-color: #333;
  width: 12px;
  height: 12px;
}

.contentlogin label {
  font-size: 14px;
  user-select: none;
  padding: 5px;
}

.loginmember button {
  position: relative;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 80px;
  letter-spacing: 1px;
  text-transform: capitalize;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

.loginmember button:hover {
  letter-spacing: 3px;
}

.loginmember button:active {
  transform: scale(0.95);
}

.loginmember button:focus {
  outline: none;
}

.loginmember button.ghost {
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid #fff;
}

.overlay {
  background: url('/public/images/hotel-room/room05.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent 40%, transparent 70%, rgba(0, 0, 0, 0.6));
  z-index: 1;
  pointer-events: none;
}

.form-control small {
  color: red;
  font-size: 12px;
  margin-top: 10px;
  display: flex;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.right-panel-active .overlay-container {
  transform: translate(-100%);
}

.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  gap: 20px;
  z-index: 1;
}

.overlay-panel h1 {
  margin-top: 50px;
}

.overlay-panel button {
  margin-bottom: 50px
}

.overlay-left {
  transform: translateX(-20%);
}

.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.right-panel-active .overlay-right {
  transform: translateX(20%);
}

@media (max-width: 1124px) {

  .overlay-panel {
    h1 {
      font-size: 20px;
    }

    button {
      font-size: 13px;
    }
  }
}


@media (max-width: 864px) {

  .form-login {
    margin-top: 50px;
  }

  .contentlogin {
    margin-bottom: 0;
  }
}

@media (max-width: 700px) {
  .overlay-container {
    display: none !important;
  }

  .form-container {
    width: 100%;
  }

  .loginmember .form-container:nth-of-type(1) {
    transform: none !important;
    opacity: 1 !important;
    z-index: 5 !important;
  }

  .right-panel-active .verify-otp-container {
    transform: translateX(0%);
    opacity: 1;
    z-index: 5;
    animation: show 0.9s;
  }

  .loginmember button {
    font-size: 10px;
    padding: 12px 30px;
  }

  .loginmember button {
    font-size: 14px;
    padding: 12px 30px;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 12px 0;
  }

  .form-container input[type="email"],
  .form-container input[type="password"] {
    font-size: 14px;
    padding: 12px 16px;
    width: 100%;

    border: 1px solid #c7d2fe;
    border-radius: 10px;
    background-color: #f9fafb;
    color: #333;

    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
  }

  .form-container input[type="email"]:focus,
  .form-container input[type="password"]:focus {
    border-color: #818cf8;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
    background-color: #fff;
  }

  .checkbox label {
    font-size: 13px;
    color: #6b7280;
  }
}
</style>