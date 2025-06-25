<template>
    <!-- <div class="backgr w-full min-h-screen bg-gray-50">
        <div class="frommember container mx-auto py-8">

            <div class="bg-white rounded-lg shadow-md p-8">

                <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">สมัครสมาชิก</h1>

                <form @submit.prevent="submitForm" class="form-group space-y-6">
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            ชื่อ <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.member" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.firstName }" required />
                        <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            นามสกุล <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.lastName" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.lastName }" required />
                        <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            เพศ <span class="text-red-500">*</span>
                        </label>
                        <select v-model="form.sex"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.sex }" required>
                            <option value="">เลือกเพศ</option>
                            <option value="เพศชาย">เพศชาย</option>
                            <option value="เพศหญิง">เพศหญิง</option>
                        </select>
                        <p v-if="errors.sex" class="text-red-500 text-sm mt-1">{{ errors.sex }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            ชื่อเล่น <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.nickName" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.nickName }" required />
                        <p v-if="errors.nickName" class="text-red-500 text-sm mt-1">{{ errors.nickName }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            อีเมล <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.personalEmail" type="email"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.personalEmail }" placeholder="Enter your email"  required />
                        <p v-if="errors.personalEmail" class="text-red-500 text-sm mt-1">{{ errors.personalEmail }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            เบอร์โทร <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.personalPhone" type="tel" maxlength="10"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.personalPhone }" placeholder="0812345678" required />
                        <p v-if="errors.personalPhone" class="text-red-500 text-sm mt-1">{{ errors.personalPhone }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            เป็นบุคคลประเภทใด <span class="text-red-500">*</span>
                        </label>
                        <select v-model="form.personalType"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.personalType }" required>
                            <option value="">เลือกประเภทบุคคล</option>
                            <option value="บุคคลธรรมดา">บุคคลธรรมดา</option>
                            <option value="นิติบุคคล">นิติบุคคล</option>
                        </select>
                        <p v-if="errors.personalType" class="text-red-500 text-sm mt-1">{{ errors.personalType }}</p>
                    </div>

                    <div class="space-y-4">
                        <label class="block text-sm font-medium text-gray-700">
                            ที่อยู่ <span class="text-red-500">*</span>
                        </label>

                        <div>
                            <label class="block text-sm text-gray-600 mb-1">บ้านเลขที่</label>
                            <input v-model="form.personalAddress" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="{ 'border-red-500': errors.personalAddress }" required />
                            <p v-if="errors.personalAddress" class="text-red-500 text-sm mt-1">{{ errors.personalAddress
                                }}</p>
                        </div>

                        <div>
                            <label class="block text-sm text-gray-600 mb-1">ตำบล</label>
                            <input v-model="form.personalSubdistrict" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="{ 'border-red-500': errors.personalSubdistrict }" required />
                            <p v-if="errors.personalSubdistrict" class="text-red-500 text-sm mt-1">{{
                                errors.personalSubdistrict }}</p>
                        </div>

                        <div>
                            <label class="block text-sm text-gray-600 mb-1">อำเภอ</label>
                            <input v-model="form.personalDistrict" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="{ 'border-red-500': errors.personalDistrict }" required />
                            <p v-if="errors.personalDistrict" class="text-red-500 text-sm mt-1">{{
                                errors.personalDistrict }}</p>
                        </div>

                        <div>
                            <label class="block text-sm text-gray-600 mb-1">จังหวัด</label>
                            <input v-model="form.personalProvince" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="{ 'border-red-500': errors.personalProvince }" required />
                            <p v-if="errors.personalProvince" class="text-red-500 text-sm mt-1">{{
                                errors.personalProvince }}</p>
                        </div>

                        <div>
                            <label class="block text-sm text-gray-600 mb-1">รหัสไปรษณีย์</label>
                            <input v-model="form.personalPostalCode" type="text" maxlength="5"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :class="{ 'border-red-500': errors.personalPostalCode }" placeholder="12345" required />
                            <p v-if="errors.personalPostalCode" class="text-red-500 text-sm mt-1">{{
                                errors.personalPostalCode }}</p>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Username <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.username" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.username }" required />
                        <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
                    </div>

                    <div v-if="form.personalEmail">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            รหัสผ่าน <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.password" type="password"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.password }" minlength="8" placeholder="Enter your password" required />
                        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
                        <p class="text-gray-500 text-sm mt-1">รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร</p>
                    </div>

                    
                    <div class="flex justify-center space-x-2 pt-6">
                        <button type="submit"
                            class="buttonsum flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="isSubmitting">
                            <span v-if="isSubmitting">กำลังสมัครสมาชิก...</span>
                            <span v-else>สมัครสมาชิก</span>
                        </button>
                        <button type="button"
                            class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 rounded-md transition duration-200"
                            :disabled="isSubmitting">
                            รีเซ็ต
                        </button>
                        <button type="button" @click="navigateBackToRegister"
                            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition duration-200"
                            :disabled="isSubmitting">
                            ย้อนกลับ
                        </button>
                    </div>
                </form>

                <div v-if="successMessage"
                    class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    {{ successMessage }}
                </div>

                <div v-if="errorMessage" class="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </div> -->
    <!-- <div class="background-wrapper">
    <div class="backgr w-full min-h-screen flex flex-col items-center justify-center">
      <div class="blur-overlay"></div>
      <div class="container">
            <div class="flex justify-center mb-6">
                <div class="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
            </div>

            <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">สมัครสมาชิก</h1>
            <form @submit.prevent="submitForm" class="form-group space-y-6">
                <div class="space-y-4">

                    <input v-model="form.member" type="text" placeholder="User name"
                        class="w-full px-4 py-2 rounded-md bg-white/30 text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        :class="{ 'border-red-500': errors.firstName }" required />
                    <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>

                    <input v-model="form.personalEmail" type="email" placeholder="Email ID"
                        class="w-full px-4 py-2 rounded-md bg-white/30 text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        :class="{ 'border-red-500': errors.personalEmail }" required />

                    <input v-model="form.password" type="password" placeholder="Password"
                        class="w-full px-4 py-2 rounded-md bg-white/30 text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        :class="{ 'border-red-500': errors.password }" minlength="8" required />
                    <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
                    <p class="text-gray-500 text-sm mt-1">รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร</p>

                    <button type="submit"
                        class="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
                        :disabled="isSubmitting">
                        <span v-if="isSubmitting">กำลังสมัครสมาชิก...</span>
                        <span v-else>สมัครสมาชิก</span>
                    </button>

                    <button type="button" @click="navigateBackToRegister"
                        class="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
                        :disabled="isSubmitting">
                        ย้อนกลับ
                    </button>
                </div>
            </form>
        </div>
        </div>
    </div> -->
    <div class="background-wrapper">
        <div class="backgr w-full min-h-screen flex flex-col items-center justify-center backgr">
            <div class="blur-overlay"></div>
            <div class="containermemeber">
                <div class="boxmember" v-if="!emailVerified">
                    <span></span>
                    <div class="">
                        <div class="flex justify-center">
                            <div
                                class="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                        </div>
                        <div class="sm:text-xl text-sm font-bold text-center mb-5 mt-5">
                            <h1 class="sm:text-3xl text-xl font-bold text-center mb-5 mt-5">สมัครสมาชิก</h1>
                            <p class="text-l text-start font-normal">คุณสามารถเข้าสู่ระบบโดยใช้บัญชี Sleepgun.com
                                ของคุณเพื่อเข้าใช้บริการของเราได้</p>
                        </div>
                        <form @submit.prevent="submitForm" class="form-group space-y-6">
                            <div class="space-y-4">

                                <!-- <input v-model="form.member" type="text" placeholder="User name"
                                    class="w-full px-4 py-2 rounded-md bg-white/30 text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    :class="{ 'border-red-500': errors.firstName }" required />
                                <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p> -->

                                <label class="text-l font-medium text-gray-700">อีเมล</label>
                                <input v-model="form.personalEmail" type="email" placeholder="Email ID"
                                    class="w-full px-4 py-2 rounded-md bg-white/30 text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    :class="{ 'border-red-500': errors.personalEmail }" required />

                                <!-- <input v-model="form.password" type="password" placeholder="Password"
                                    class="w-full px-4 py-2 rounded-md bg-white/30 text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    :class="{ 'border-red-500': errors.password }" minlength="8" required />
                                <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
                                <p class="text-gray-500 text-sm mt-1">รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร</p> -->

                                <button type="submit"
                                    class="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
                                    :disabled="isSubmitting">
                                    <span v-if="isSubmitting">กำลังสมัครสมาชิก...</span>
                                    <span v-else>สมัครสมาชิก</span>
                                </button>

                                <button type="button" @click="navigateBackToRegister"
                                    class="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
                                    :disabled="isSubmitting">
                                    ย้อนกลับ
                                </button>
                            </div>
                            <div class="access-panel">
                                <hr class="linehr">
                                <span class="text">หรือเลือกใช้หนึ่งในตัวเลือกเหล่านี้</span>
                                <hr class="linehr">
                            </div>
                            <ul class="wrapper">
                                <li class="icon facebook">
                                    <span class="tooltip">Facebook</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 512" width="20" height="20"
                                        fill="#000">
                                        <path
                                            d="M279.14 288l14.22-92.66h-88.91V127.7c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S293.06 0 259.36 0c-73.22 0-121.36 44.38-121.36 124.72V195.3H89.09V288h48.91v224h100.2V288z" />
                                    </svg>
                                </li>
                                <li class="icon line">
                                    <span class="tooltip">Line</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 350" width="20" height="20"
                                        fill="#000">
                                        <path
                                            d="M407.3 64H104.7C46.9 64 0 108.6 0 163.2c0 39.3 25.8 74.2 63.5 94.5v76.1c0 5.9 6.6 9.4 11.4 6.2l75.3-53.4h257.1c57.8 0 104.7-44.6 104.7-99.2S465.1 64 407.3 64z" />
                                    </svg>
                                </li>
                                <li class="icon gmail">
                                    <span class="tooltip">Gmail</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16"
                                        height="16">
                                        <path fill="#000"
                                            d="M502.3 190.8v230.3c0 16.4-13.3 29.7-29.7 29.7H362.7V302.5L256 378.2 149.3 302.5v148.3H39.4c-16.4 0-29.7-13.3-29.7-29.7V190.8L0 156.1 256 328.4 512 156.1z" />
                                        <path fill="#000"
                                            d="M512 156.1v-97.3c0-16.4-13.3-29.7-29.7-29.7H362.7v132.1L512 156.1z" />
                                        <path fill="#000"
                                            d="M0 156.1l149.3 105.1V29.1H39.4C23 29.1 9.7 42.4 9.7 58.8v97.3z" />
                                        <path fill="#000" d="M149.3 29.1h213.3v132.1L256 226.7 149.3 161.2z" />
                                    </svg>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                <div v-else class="boxotp">
                    <!-- กล่อง OTP -->
                    <h2 class="text-2xl font-bold mb-4">ยืนยันที่อยู่อีเมลของคุณ</h2>
                    <p class="text-lg mb-6">
                        เราได้ส่งรหัสยืนยันไปยัง <strong>{{ form.personalEmail }}</strong>.
                    </p>

                    <div class="flex gap-2 justify-center flex-nowrap overflow-x-auto mb-5">

                        <input v-for="(digit, index) in 6" :key="index" maxlength="1"
                            class="xs:w-12 xs:h-12 text-3xl sm:text-2xl xs:text-xl text-center border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            v-model="otp[index]" :style="{
                                width: 'clamp(36px, 10vw, 80px)',
                                height: 'clamp(36px, 10vw, 80px)',
                                fontSize: 'clamp(16px, 3vw, 28px)'
                            }" />
                    </div>

                    <button class="w-full bg-yellow-400 text-white py-3 text-xl rounded-xl font-semibold" disabled>
                        ยืนยันที่อยู่อีเมล
                    </button>

                    <p class="text-base text-gray-600 mt-4 max-w-md">
                        ยังไม่ได้รับอีเมลใช่ไหม? ลองตรวจสอบโฟลเดอร์สแปม หรือลองขอรหัสใหม่อีกครั้งใน {{ countdown }}
                        วินาที
                    </p>

                    <button class="mt-6 text-blue-600 underline text-lg font-medium" @click="goBackToEmail">
                        กลับไปที่หน้าลงชื่อเข้าใช้
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "RegisterMember",
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                sex: '',
                nickName: '',
                personalEmail: '',
                personalPhone: '',
                personalType: '',
                personalAddress: '',
                personalSubdistrict: '',
                personalDistrict: '',
                personalProvince: '',
                personalPostalCode: '',
                username: '',
                password: '',

            },
            errors: {},
            isSubmitting: false,
            successMessage: '',
            errorMessage: '',
            emailVerified: false,
            otp: ['', '', '', '', '', ''],
            countdown: 60,
        };
    },
    methods: {
        async submitForm() {
            // ใส่ตรงนี้
            const response = await axios.post('/api/member/register', formData);
        },
        validateForm() {
            this.errors = {};
            let isValid = true;
            const requiredFields = {
                firstName: 'กรุณากรอกชื่อ',
                lastName: 'กรุณากรอกนามสกุล',
                sex: 'กรุณาเลือกเพศ',
                nickName: 'กรุณากรอกชื่อเล่น',
                personalEmail: 'กรุณากรอกอีเมล',
                personalPhone: 'กรุณากรอกเบอร์โทร',
                personalType: 'กรุณาเลือกประเภทบุคคล',
                personalAddress: 'กรุณากรอกที่อยู่',
                personalSubdistrict: 'กรุณากรอกตำบล',
                personalDistrict: 'กรุณากรอกอำเภอ',
                personalProvince: 'กรุณากรอกจังหวัด',
                personalPostalCode: 'กรุณากรอกรหัสไปรษณีย์',
                username: 'กรุณากรอก Username',
                password: 'กรุณากรอกรหัสผ่าน',

            };

            for (const [field, message] of Object.entries(requiredFields)) {
                if (!this.form[field] || this.form[field].trim() === '') {
                    this.errors[field] = message;
                    isValid = false;
                }
            }

            // Email validation
            if (this.form.personalEmail) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.form.personalEmail)) {
                    this.errors.personalEmail = 'รูปแบบอีเมลไม่ถูกต้อง';
                    isValid = false;
                }
            }

            // Phone validation (10 digits)
            if (this.form.personalPhone) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(this.form.personalPhone)) {
                    this.errors.personalPhone = 'เบอร์โทรต้องเป็นตัวเลข 10 หลัก';
                    isValid = false;
                }
            }

            // Postal code validation (5 digits)
            if (this.form.personalPostalCode) {
                const postalRegex = /^[0-9]{5}$/;
                if (!postalRegex.test(this.form.personalPostalCode)) {
                    this.errors.personalPostalCode = 'รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก';
                    isValid = false;
                }
            }

            // Password validation
            if (this.form.password && this.form.password.length < 8) {
                this.errors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
                isValid = false;
            }



            // Username validation (no spaces, special characters)
            if (this.form.username) {
                const usernameRegex = /^[a-zA-Z0-9_]+$/;
                if (!usernameRegex.test(this.form.username)) {
                    this.errors.username = 'Username ควรประกอบด้วยตัวอักษร ตัวเลข และ _ เท่านั้น';
                    isValid = false;
                }
                if (this.form.username.length < 3) {
                    this.errors.username = 'Username ต้องมีอย่างน้อย 3 ตัวอักษร';
                    isValid = false;
                }
            }

            return isValid;
        },

        async submitForm() {
            this.clearMessages();

            if (!this.form.personalEmail.includes('@')) {
                this.errors.personalEmail = true;
                return;
            }

            this.errors.personalEmail = false;
            this.emailVerified = true;
            this.startCountdown();

            if (!this.validateForm()) {
                this.errorMessage = 'กรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง';
                return;
            }

            this.isSubmitting = true;

            try {
                const response = await axios.post('/api/member/register', formData);

                if (response.data.success) {
                    this.successMessage = `สมัครสมาชิกสำเร็จ! รหัสสมาชิก: ${response.data.memberId}`;

                    // Reset form
                    this.resetForm();

                    // Navigate to main member page after 2 seconds
                    setTimeout(() => {
                        this.navigateToMainMember();
                    }, 2000);
                }
            } catch (error) {
                console.error('Registration error:', error);

                if (error.response && error.response.data) {
                    const errorData = error.response.data;

                    if (errorData.conflictNames && errorData.conflictNames.length > 0) {
                        this.errorMessage = `ข้อมูลซ้ำกับในระบบ: ${errorData.conflictNames.join(', ')}`;
                    } else {
                        this.errorMessage = errorData.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
                    }
                } else {
                    this.errorMessage = 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์';
                }
            } finally {
                this.isSubmitting = false;
            }
        },

        startCountdown() {
            this.countdown = 60;
            const timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(timer);
                }
            }, 1500);
        },
        
        goBackToEmail() {
            this.emailVerified = false;
        },

        resetForm() {
            this.form = {
                firstName: '',
                lastName: '',
                sex: '',
                nickName: '',
                personalEmail: '',
                personalPhone: '',
                personalType: '',
                personalAddress: '',
                personalSubdistrict: '',
                personalDistrict: '',
                personalProvince: '',
                personalPostalCode: '',
                username: '',
                password: '',
            };
            this.errors = {};
        },

        clearMessages() {
            this.successMessage = '';
            this.errorMessage = '';
        },

        navigateToMainMember() {
            this.$router.push("/mainmember");
        },

        navigateBackToRegister() {
            this.$router.push("/register");
        },
        beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.resetForm() // รีเซ็ตข้อมูลทุกครั้งที่เข้าหน้านี้
    })
  },
    },
    mounted() {
  this.resetForm();
},
};
</script>

<style scoped>
/* Additional custom styles if needed */
.transition {
    transition: all 0.2s ease-in-out;
}

.frommember {
    width: 30%;
}

.buttonsum {
    padding: 10px;
}

.background-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.backgr {
    background-image: url('https://i.pinimg.com/736x/ee/fa/74/eefa7498eac4d16a10c18e316a276199.jpg');
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
}

.blur-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.2);
    z-index: 1;
}

.containermemeber {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 50px 20px;
    position: relative;
    z-index: 1;
}

.boxmember {
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5%;
    width: 80%;
}

.boxotp {
    backdrop-filter: blur(12px);
    background-color: rgba(255, 255, 255, 0.3);
    padding: 3rem;
    margin: 0 auto;
    border-radius: 1.5rem;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.access-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    /* ระยะห่างระหว่างเส้นกับข้อความ */
    margin: 1rem 0;
}

.linehr {
    flex: 1;
    height: 1px;
    background-color: #000000;
    border: none;
}

.text {
    white-space: nowrap;
    color: #555;
    font-size: 0.9rem;
}

.wrapper {
    display: inline-flex;
    list-style: none;
    font-family: "Poppins", sans-serif;
    justify-content: center;
    display: flex;
}

.wrapper .icon {
    position: relative;
    background: #fff;
    border-radius: 50%;
    margin: 10px;
    width: 50px;
    height: 50px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip {
    position: absolute;
    top: 0;
    font-size: 14px;
    background: #fff;
    color: #fff;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background: #fff;
    bottom: -3px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
    top: -45px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

.wrapper .facebook:hover,
.wrapper .facebook:hover .tooltip,
.wrapper .facebook:hover .tooltip::before {
    background: #1877f2;
    color: #fff;
}

.wrapper .line:hover,
.wrapper .line:hover .tooltip,
.wrapper .line:hover .tooltip::before {
    background: #20b50c;
    color: #fff;
}

.wrapper .gmail:hover,
.wrapper .gmail:hover .tooltip,
.wrapper .gmail:hover .tooltip::before {
    background: #e4405f;
    color: #fff;
}
</style>