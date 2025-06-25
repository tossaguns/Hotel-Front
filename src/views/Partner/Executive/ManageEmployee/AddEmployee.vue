<template>

    <!--addemployee เพิ่ม model/controller/routes/index เรียบร้อยเเล้ว (สมัครหน้าเว็บได้)-->
    <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
        style="top: 1rem; bottom: 1rem; height: auto;" :class="{
            'md:ml-[232px]': !isSidebarCollapsed,
            'md:ml-[72px]': isSidebarCollapsed
        }">

        <div class="flex flex-col md:flex-row gap-4">
            <div class="md:w-1/3 bg-white shadow rounded-lg p-6 m-4 hide-between-768-and-997">
                <div class="flex flex-col items-center">
                    <img :src="imageUrl || 'https://via.placeholder.com/150'"
                        class="w-28 h-28 rounded-full object-cover border" />
                    <h2 class="text-xl font-bold mt-4">
                        {{ form.firstname || 'ชื่อ' }} {{ form.lastname || 'นามสกุล' }}
                    </h2>
                    <p class="mt-1 text-gray-600">
                        {{ form.statusByPartner || 'สถานะ' }}
                    </p>
                    <div class="mt-2 text-sm font-semibold px-3 py-1 rounded-full text-center" :class="{
                        'bg-green-100 text-green-700': form.positionEmployee === 'พนักงานขาย',
                        'bg-purple-100 text-purple-700': form.positionEmployee === 'ผู้จัดการ',
                        'bg-yellow-100 text-yellow-700': form.positionEmployee === 'พนักงานต้อนรับ',
                        'bg-blue-100 text-blue-700': form.positionEmployee === 'พนักงานครัว',
                        'bg-red-100 text-red-600': form.positionEmployee === 'รปภ.',
                        'bg-cyan-100 text-cyan-600': form.positionEmployee === 'แม่บ้าน',
                        'bg-gray-200 text-gray-600': !['พนักงานขาย', 'ผู้จัดการ', 'พนักงานต้อนรับ', 'พนักงานครัว', 'รปภ.', 'แม่บ้าน'].includes(form.positionEmployee)
                    }">
                        {{ form.positionEmployee || 'ตำแหน่ง' }}
                    </div>

                    <!-- Preview Sidebar-style Text -->
                    <div class="w-full mt-6 space-y-2">
                        <div class="bg-orange-100 text-orange-800 rounded-lg py-2 px-4">
                            {{ form.employeeCode || 'รหัสพนักงาน' }}
                        </div>
                        <div class="bg-gray-100 text-gray-600 rounded-lg py-2 px-4">
                            {{ formattedPhone || 'เบอร์ติดต่อ' }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-1 flex flex-col">
                <div class="z-10 bg-white mt-4 pb-5 mx-2 rounded-lg">
                    <div class="text-left p-3 bg-amber-400 text-white rounded-t-lg">
                        <h1 class="text-xl sm:text-lg pl-3">เพิ่มรายชื่อพนักงาน</h1>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 px-4">
                        <div class="flex flex-col">
                            <label class="mb-1 font-medium">สถานะ</label>
                            <select v-model="form.statusByPartner" class="border px-2 py-2 rounded">
                                <option disabled value="">เลือกสถานะ</option>
                                <option value="adminPartner">adminPartner</option>
                                <option value="employee">employee</option>
                            </select>
                        </div>

                        <div class="flex flex-col">
                            <label class="mb-1 font-medium">เพศ</label>
                            <select v-model="form.sex" class="border px-2 py-2 rounded">
                                <option disabled value="">เลือกเพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                            </select>
                        </div>
                    </div>

                    <!-- รหัสพนักงาน -->
                    <div class="flex gap-2 mt-4 px-4 justify-center items-center">
                        <label>รหัสพนักงาน <span class="text-red-500">*</span></label>
                        <input v-model="form.employeeCode" type="text" class="border px-2 py-2 rounded" />
                    </div>

                    <!-- ตำแหน่ง + เบอร์ติดต่อ -->
                    <div class="flex flex-col sm:flex-row gap-4 mt-4 px-4">
                        <div class="w-full sm:w-1/2">
                            <p>ตำแหน่ง</p>
                            <input v-model="form.positionEmployee" type="text"
                                class="border px-2 py-2 w-full rounded" />
                        </div>
                        <div class="w-full sm:w-1/2">
                            <p>เบอร์ติดต่อ</p>
                            <input v-model="form.phone" type="text" class="border px-2 py-2 w-full rounded" />
                        </div>
                    </div>

                    <!-- ชื่อ + นามสกุล -->
                    <div class="flex flex-col sm:flex-row gap-4 mt-4 px-4">
                        <div class="w-full sm:w-1/2">
                            <p>ชื่อ <span class="text-red-500">*</span></p>
                            <input v-model="form.firstname" type="text" class="border px-2 py-2 w-full rounded" />
                        </div>
                        <div class="w-full sm:w-1/2">
                            <p>นามสกุล <span class="text-red-500">*</span></p>
                            <input v-model="form.lastname" type="text" class="border px-2 py-2 w-full rounded" />
                        </div>
                    </div>

                    <!-- ชื่อเล่น + Username -->
                    <div class="flex flex-col sm:flex-row gap-4 mt-4 px-4">
                        <div class="w-full sm:w-1/2">
                            <p>ชื่อเล่น <span class="text-red-500">*</span></p>
                            <input v-model="form.nickname" type="text" class="border px-2 py-2 w-full rounded" />
                        </div>
                        <div class="w-full sm:w-1/2">
                            <p>Username <span class="text-red-500">*</span></p>
                            <input v-model="form.username" type="text" class="border px-2 py-2 w-full rounded" />
                        </div>
                    </div>

                    <!-- Email + Password -->
                    <div class="flex flex-col sm:flex-row gap-4 mt-4 px-4">
                        <div class="w-full sm:w-1/2">
                            <p>อีเมล</p>
                            <input v-model="form.email" type="email" class="border px-2 py-2 w-full rounded" />
                        </div>
                        <div class="w-full sm:w-1/2 relative">
                            <p>Password <span class="text-red-500">*</span></p>
                            <input :type="showPassword ? 'text' : 'password'" v-model="form.password"
                                class="w-full px-3 py-2 rounded border" placeholder="กรอกรหัสผ่าน" />
                            <button type="button" class="absolute right-3 top-9" @click="togglePassword">👁️</button>
                        </div>
                    </div>

                    <div class="mt-6 text-center">
                        <p class="mb-2">อัปโหลดรูปภาพ</p>
                        <label v-if="!imageUrl" for="fileInput"
                            class="cursor-pointer border-2 border-dashed p-4 rounded-lg">
                            <span class="text-4xl font-bold">+</span>
                            <input id="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
                        </label>

                        <div v-else class="relative max-w-xs mx-auto">
                            <button @click="removeImage" class="absolute top-1 right-1 bg-white text-red-500">✕</button>
                            <img :src="imageUrl" alt="Preview" class="rounded-lg shadow object-cover w-full h-64" />
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 mb-3 mt-6 px-5">
                        <button class="flex-1 bg-lime-500 text-white py-3 rounded-lg hover:bg-lime-700"
                            @click="submitForm">
                            บันทึก
                        </button>
                        <button class="flex-1 bg-gray-500 text-white py-3 rounded-lg" @click="resetForm">รีเซ็ต</button>
                        <button class="flex-1 bg-red-500 text-white py-3 rounded-lg"
                            @click="navigateToBackMainemployee">
                            ย้อนกลับ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "AddEmployee",
    components: { Sidebar },
    data() {
        return {
            isSidebarCollapsed: false,
            uploadimg: null,
            imageUrl: null,
            showPassword: false,
            form: {
                username: "",
                password: "",
                firstname: "",
                lastname: "",
                nickname: "",
                employeeCode: "",
                positionEmployee: "",
                email: "",
                phone: "",
                sex: "",
                statusByPartner: ""
            }
        };
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateToBackMainemployee() {
            this.$router.push("/mainemployee");
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith("image/")) {
                this.uploadimg = file;
                this.imageUrl = URL.createObjectURL(file);
            } else {
                alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
                this.uploadimg = null;
                this.imageUrl = null;
            }
        },
        removeImage() {
            this.uploadimg = null;
            this.imageUrl = null;
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        resetForm() {
            this.form = {
                username: "", password: "", firstname: "", lastname: "",
                nickname: "", employeeCode: "", positionEmployee: "",
                email: "", phone: "", sex: "", statusByPartner: ""
            };
            this.uploadimg = null;
            this.imageUrl = null;
        },
        async submitForm() {
            try {
                const formData = new FormData();
                for (const key in this.form) {
                    formData.append(key, this.form[key]);
                }
                if (this.uploadimg) {
                    formData.append("image", this.uploadimg);
                }

                const response = await axios.post("http://localhost:9999/SleepGun/employee/create", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                alert("เพิ่มพนักงานสำเร็จ!");
                this.resetForm();
            } catch (err) {
                // ✅ เพิ่มการแสดงผล error จาก backend
                console.error("Error submitting form:", err);

                if (err.response) {
                    // Backend ตอบกลับมาพร้อม status code เช่น 400, 500
                    alert(`เกิดข้อผิดพลาด: ${err.response.data.message || JSON.stringify(err.response.data)}`);
                } else if (err.request) {
                    // ไม่มี response กลับมา (network error หรือ server ตาย)
                    alert("ไม่สามารถติดต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่อ");
                } else {
                    // ผิดพลาดจากฝั่ง client เช่น axios syntax
                    alert(`Error: ${err.message}`);
                }
            }
        },
    },

    computed: {
        formattedPhone() {
            const digits = this.form.phone.replace(/\D/g, ''); // เอาเฉพาะตัวเลข
            if (digits.length <= 3) return digits;
            if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
            return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
        }
    },

    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState);
        }
    },
};
</script>
<style scoped>
@media (max-width: 996px) and (min-width: 769px) {
    .hide-between-768-and-997 {
        display: none;
    }
}
</style>