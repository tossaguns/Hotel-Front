<template>
    <div class="w-full min-h-screen bg-gray-50">
        <div class="container mx-auto py-8">
            <div class="bg-white rounded-lg shadow-md p-8">
                <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">สมัครสมาชิก</h1>

                <form @submit.prevent="submitForm" class="space-y-6">
                    <!-- ชื่อ -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            ชื่อ <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.member" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.firstName }" required />
                        <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>
                    </div>

                    <!-- นามสกุล -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            นามสกุล <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.lastName" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.lastName }" required />
                        <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</p>
                    </div>

                    <!-- เพศ -->
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

                    <!-- ชื่อเล่น -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            ชื่อเล่น <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.nickName" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.nickName }" required />
                        <p v-if="errors.nickName" class="text-red-500 text-sm mt-1">{{ errors.nickName }}</p>
                    </div>

                    <!-- อีเมล -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            อีเมล <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.personalEmail" type="email"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.personalEmail }" required />
                        <p v-if="errors.personalEmail" class="text-red-500 text-sm mt-1">{{ errors.personalEmail }}</p>
                    </div>

                    <!-- เบอร์โทร -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            เบอร์โทร <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.personalPhone" type="tel" maxlength="10"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.personalPhone }" placeholder="0812345678" required />
                        <p v-if="errors.personalPhone" class="text-red-500 text-sm mt-1">{{ errors.personalPhone }}</p>
                    </div>

                    <!-- เป็นบุคคลประเภทใด -->
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

                    <!-- ที่อยู่ -->
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

                    <!-- Username -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Username <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.username" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.username }" required />
                        <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
                    </div>

                    <!-- รหัสผ่าน -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            รหัสผ่าน <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.password" type="password"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.password }" minlength="8" required />
                        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
                        <p class="text-gray-500 text-sm mt-1">รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร</p>
                    </div>

                    <!-- ยืนยันรหัสผ่าน -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            ยืนยันรหัสผ่าน <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.confirmPassword" type="password"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': errors.confirmPassword }" required />
                        <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}
                        </p>
                    </div>

                    <!-- ปุ่ม -->
                    <div class="flex space-x-2 pt-6">
                        <button type="submit"
                            class="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

                <!-- Success/Error Messages -->
                <div v-if="successMessage"
                    class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    {{ successMessage }}
                </div>

                <div v-if="errorMessage" class="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {{ errorMessage }}
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
                confirmPassword: ''
            },
            errors: {},
            isSubmitting: false,
            successMessage: '',
            errorMessage: ''
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
                confirmPassword: 'กรุณายืนยันรหัสผ่าน'
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

            // Confirm password validation
            if (this.form.password !== this.form.confirmPassword) {
                this.errors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
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

            if (!this.validateForm()) {
                this.errorMessage = 'กรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง';
                return;
            }

            this.isSubmitting = true;

            try {
                // Prepare data for API (exclude confirmPassword)
                const { confirmPassword, ...formData } = this.form;

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
                confirmPassword: ''
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
        }
    }
};
</script>

<style scoped>
/* Additional custom styles if needed */
.transition {
    transition: all 0.2s ease-in-out;
}
</style>