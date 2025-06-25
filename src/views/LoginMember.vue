<template>
    <div class="flex justify-center items-center h-screen loginmember">
        <div class="blur-overlay"></div>
        <div class="" :class="['containerloginmember', { 'right-panel-active': isVerifyOtp }]">
            <div class="form-container verify-otp-container">
                <button
                    class="back-button-custom absolute top-4 left-4 text-black text-sm px-3 py-1 bg-white rounded shadow"
                    @click="isVerifyOtp = false">
                    <i class="fa-solid fa-arrow-left mr-1"></i>
                    ย้อนกลับ
                </button>
                <form class="" @submit.prevent="verifyOtp">
                    <div class="from-address mb-2 md:mb-5">
                        <h1 class="text-center">ยืนยันที่อยู่อีเมลของคุณ</h1>
                        <p class="">
                            เราได้ส่งรหัสยืนยันไปยัง <br>
                            <strong>{{ login.email }}</strong>
                        </p>

                        <div class="form-control otp-inputs">
                            <input v-for="(digit, index) in otp" :key="index" type="text" maxlength="1"
                                v-model="otp[index]" class="otp-digit" />
                        </div>
                        <!-- <p v-if="countdown > 0" class="text-sm text-gray-500">
                        ขอรหัสใหม่ได้ใน {{ countdown }} วินาที
                    </p>
                    <button type="button" :disabled="countdown > 0" @click="resendOtp">
                        ขอรหัสใหม่
                    </button> -->
                    </div>
                    <p v-if="countdown > 0" class="text-sm text-gray-500 mt-3">
                        ขอรหัสใหม่ได้ใน {{ countdown }} วินาที
                    </p>

                    <button v-else type="button" class="text-sm text-indigo-600 underline mt-3" @click="resendOtp">
                        ขอรหัสใหม่
                    </button>

                    <button type="submit">ยืนยันรหัส</button>
                </form>
            </div>

            <!-- Login -->
            <div class="form-container login-container text-center">
                <form class="" @submit.prevent="handleLogin">
                    <div class="form-login">
                        <h1 class="">เข้าสู่ระบบสมาชิก</h1>

                        <div class="form-control2">
                            <input type="email" v-model="login.email" @input="onEmailInput" placeholder="อีเมล" />
                            <small>{{ loginErrors.email }}</small>
                            <span></span>
                        </div>

                        <div class="contentlogin">
                            <div class="checkbox">
                                <input type="checkbox" v-model="login.remember" id="checkbox" />
                                <label for="checkbox">จำรหัสผ่าน</label>
                            </div>
                            <div class="pass-link">
                                <a href="#">รหัสผ่านไม่ถูกต้อง</a>
                            </div>
                        </div>

                        <button class="" type="submit">เข้าสู่ระบบ</button>
                    </div>
                    <span>หรือเลือกใช้หนึ่งในตัวเลือกเหล่านี้</span>
                    <div class="social-container">
                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i class="fa-brands fa-google"></i></a>
                        <a href="#"><i class="fa-brands fa-line"></i></a>
                    </div>
                </form>
            </div>

            <!-- Overlay -->
            <div v-if="isOverlayRegister" class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1 class="title">การยืนยันที่อยู่อีเมล</h1>
                        <button class="ghost" @click="isVerifyOtp = false">
                            <i class="fa-solid fa-arrow-left"></i>
                            ย้อนกลับ
                        </button>
                    </div>

                    <div class="overlay-panel overlay-right">
                        <h1 class="title">สมัครเป็นสมาชิก</h1>
                        <button class="ghost bg-yellow-200 text-black" @click="navigateBackToRegister">
                            สมัครสมาชิก
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

            login: {
                email: '',
            },
            loginErrors: {
                email: '',
            },
            emailVerified: false,
            otp: ['', '', '', '', '', ''],
            countdown: 60,
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

        handleLogin() {
            this.loginErrors = {
                email: ''
            };

            const { email } = this.login;
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

            if (!hasError) {
                this.emailVerified = true;
                this.isVerifyOtp = true;
                this.startCountdown();
            }

            if (this.windowWidth > 660) {
                this.isOverlayRegister = true;
            } else {
                this.isOverlayRegister = false;
            }
        },

        verifyOtp() {
            const code = this.otp.join('');
            if (code.length !== 6) {
                alert('กรุณากรอกรหัสให้ครบ 6 หลัก');
                return;
            }

            // ตรวจสอบรหัส OTP (mock)
            if (code === '123456') {
                alert('ยืนยันสำเร็จ!');
                this.isVerifyOtp = false;
            } else {
                alert('รหัสไม่ถูกต้อง');
            }
        },

        resendOtp() {
            alert('ส่งรหัสใหม่แล้ว!');
            this.startCountdown();
        },

        startCountdown() {
            this.countdown = 60;
            const timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(timer);
                }
            }, 500);
        },

        onEmailInput() {
            this.loginErrors.email = '';
        },

        navigateBackToRegister() {
            this.$router.push("/register");
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 660) {
                // หน้าจอเล็ก hide overlay
                this.isOverlayRegister = false;
            } else {
                // ถ้าแสดง OTP ก็เปิด overlay
                this.isOverlayRegister = true;
            }
        },
    }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

.loginmember {
    background: url('/public/images/hotel-room/room07.jpg');
}

.blur-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
    z-index: 1;
}

h1.title {
    font-size: 25px;
    margin: 0;
}

span {
    font-size: 14px;
    margin-top: 20px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
    transition: 0.3s ease-in-out;
}

a:hover {
    color: #4bb6b7;
}

.contentlogin {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
    font-family: 'Prompt', sans-serif;
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

#login i {
    position: absolute;
    left: 50px;
}

.form-container form {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

input {
    background-color: #fff;
    outline: none;
    border: none;
    border-bottom: 2px solid #adadad;
    padding: 12px 0px;
    margin: 8px 0;
    width: 100%;
}

.containerloginmember {
    border-radius: 25px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 0px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 60%;
    max-width: 100%;
    min-height: 80%;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    transition: all 0.6s ease-in-out;
    overflow: hidden;
}

.form-control {
    width: 100%;
    position: relative;
}

.form-control2 span {
    position: absolute;
    border-bottom: 3px solid #2691d9;
    left: 0;
    bottom: 8px;
    width: 0%;
    transition: all 0.3s ease;
}

.form-control small {
    color: red;
    position: absolute;
    top: 50px;
    left: 0;
    font-size: 12px;
    z-index: 100;
}

.form-control span {
    position: absolute;
    border-bottom: 3px solid #2691d9;
    left: 0;
    bottom: 8px;
    width: 0%;
    transition: all 0.3s ease;
}

.form-control input:focus~span {
    width: 100%;
}

.form-control2 small {
    color: red;
    font-size: 12px;
    margin-top: 10px;
    display: flex;
}

.form-control2 span {
    position: absolute;
    border-bottom: 3px solid #2691d9;
    left: 0;
    bottom: 8px;
    width: 0%;
    transition: all 0.3s ease;
}

.login-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.containerloginmember.right-panel-active .login-container {
    transform: translateX(100%);
}

.containerloginmember.right-panel-active .verify-otp-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
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

.containerloginmember.right-panel-active .overlay-container {
    transform: translate(-100%);
}

.overlay {
    background: url('/public/images/hotel-room/room07.jpg');
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

.containerloginmember.right-panel-active .overlay {
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

.containerloginmember.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.containerloginmember.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.social-container {
    margin: 20px 0;
    display: flex;
    gap: 16px;
    justify-content: center;
}

.social-container a {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #000;
    background-color: #f3f3f3;
    transition: background 0.2s, transform 0.2s;
}

.social-container a:hover {
    border: 1px solid #4bb6b7;
}

.otp-inputs {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.otp-digit {
    width: 40px;
    height: 50px;
    text-align: center;
    font-size: 24px;
    border: 2px solid #2691d9;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s ease;
}

.otp-digit:focus {
    border-color: #4bb6b7;
}

.verify-otp-container form {
    gap: 20px;
    padding: 0;
}

.otp-resend-message {
    font-size: 14px;
    color: #aaa;
    margin-top: 10px;
}

button.resend-otp {
    background-color: transparent;
    color: #333;
    font-size: 14px;
    padding: 8px 16px;
    border: 1px solid #333;
    margin-top: 10px;
}

button.resend-otp:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.form-container h1 {
    font-family: 'Prompt', sans-serif;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 50px;
}

.form-control2 input[type="email"] {
    font-family: 'Prompt', sans-serif;
    padding: 14px 12px;
    margin-bottom: 12px;
    outline: none;
}

button[type="submit"] {
    font-family: 'Prompt', sans-serif;
    font-weight: 500;
    padding: 12px 32px;
    background-color: #fff89a;
    border: none;
    color: #000;
    margin-bottom: 50px;
}

button[type="submit"]:hover {
    background-color: #ffe44d;
}

.form-container span {
    font-size: 12px;
    margin-bottom: 16px;
    color: #555;
}

@media (min-width: 660px) {
    .back-button-custom {
        display: none;
    }
}

@media (max-width: 1124px) {
    .containerloginmember {
        min-height: 60%;

        button {
            padding: 12px 30px;
        }

        .form-container p,
        .form-container label,
        .form-container small,
        .form-container span,
        .form-container a {
            font-size: 12px;
        }
    }

    .overlay-panel {
        h1 {
            font-size: 20px;
        }

        button {
            font-size: 13px;
        }
    }

    .otp-inputs {
        gap: 5px;

        .otp-digit {
            font-size: 16px;
            width: 25px;
            height: 36px;
            border: 2px solid #cbd5e1;
            text-align: center;
        }
    }
}


@media (max-width: 864px) {
    .form-container form {
        padding: 0 20px;
    }

    .form-container h1{
        margin: 0;
    }

    .form-login{
        margin-top: 50px;   
    }

    .contentlogin{
        margin-bottom: 0;
    }
}

@media (max-width: 660px) {
    .overlay-container {
        display: none !important;
    }

    .form-container {
        width: 100%;
    }

    .containerloginmember {
        width: 90%;
        background: linear-gradient(to bottom right, #ffffff, #f0f4ff);
        border-radius: 1.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        border: 2px solid #a5b4fc;
        transition: all 0.3s ease;
    }

    .containerloginmember.right-panel-active .verify-otp-container {
        transform: translateX(0%);
        opacity: 1;
        z-index: 5;
        animation: show 0.9s;
    }

    .loginmember button {
        font-size: 10px;
        padding: 12px 30px;
    }

    .form-container p,
    .form-container label,
    .form-container small,
    .form-container span,
    .form-container a {
        font-size: 12px;
    }

    .form-container input[type="email"] {
        font-size: 14px;
        padding: 12px 16px;
        border: 2px solid #c7d2fe;
        border-radius: 10px;
        outline: none;
        width: 100%;
        margin: 8px 0;
        transition: border-color 0.2s;
    }

    .form-container input[type="text"] {
        border: 2px solid #c7d2fe;
    }

    .form-container input:focus {
        border-color: #6366f1;
        box-shadow: 0 0 5px rgba(99, 102, 241, 0.3);
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


    .social-container {
        gap: 12px;
        margin-top: 10px;
    }

    .social-container a {
        width: 36px;
        height: 36px;
        background-color: #f3f4f6;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
    }

    .social-container a:hover {
        transform: scale(1.1);
        background-color: #e0e7ff;
    }

    .social-container i {
        font-size: 16px;
        color: #4b5563;
    }

    .checkbox label {
        font-size: 13px;
        color: #6b7280;
    }

    .otp-digit {
        font-size: 16px;
        width: 36px;
        height: 36px;
        border: 2px solid #cbd5e1;
        border-radius: 0.5rem;
        text-align: center;
    }

    .verify-otp-container form{
        gap: 0px;
    }
}
</style>