<template>

<!--addemployee เพิ่ม model/controller/routes/index เรียบร้อยเเล้ว (สมัครหน้าเว็บได้)-->


    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4  transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div class="flex-1 flex flex-col">
                <div class="mt-28 md:mt-0 text-center md:text-left">
                    <h1 class="text-3xl sm:text-4xl pl-3 text-gray-500">เพิ่มรายชื่อพนักงาน</h1>
                </div>

                <div class="z-10 bg-white mt-4 pb-5 mx-2 rounded-lg">
                    <div class="flex justify-center gap-4 mt-4">
                        <div>
                            <label>สถานะ</label>
                            <select v-model="form.statusByPartner" class="border px-2 py-2 rounded">
                                <option disabled value="">เลือกสถานะ</option>
                                <option value="adminPartner">adminPartner</option>
                                <option value="employee">employee</option>
                            </select>
                        </div>

                        <div>
                            <label>เพศ</label>
                            <select v-model="form.sex" class="border px-2 py-2 rounded">
                                <option disabled value="">เลือกเพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex justify-center mt-4">
                        <label class="px-3">รหัสพนักงาน <span class="text-red-500">*</span></label>
                        <input v-model="form.employeeCode" type="text" class="border px-2 py-2 rounded" />
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 mt-4 px-4">
                        <div class="w-full sm:w-1/2">
                            <div>
                                <p>ตำแหน่ง</p>
                                <input v-model="form.positionEmployee" type="text"
                                    class="border px-2 py-2 w-full rounded" />
                            </div>

                            <div class="mt-4">
                                <p>ชื่อ <span class="text-red-500">*</span></p>
                                <input v-model="form.firstname" type="text" class="border px-2 py-2 w-full rounded" />
                            </div>

                            <div class="mt-4">
                                <p>นามสกุล <span class="text-red-500">*</span></p>
                                <input v-model="form.lastname" type="text" class="border px-2 py-2 w-full rounded" />
                            </div>

                            <div class="mt-4">
                                <p>ชื่อเล่น</p>
                                <input v-model="form.nickname" type="text" class="border px-2 py-2 w-full rounded" />
                            </div>
                        </div>

                        <div class="w-full sm:w-1/2">
                            <div>
                                <p>เบอร์ติดต่อ</p>
                                <input v-model="form.phone" type="text" class="border px-2 py-2 w-full rounded" />
                            </div>

                            <div class="mt-4">
                                <p>อีเมล</p>
                                <input v-model="form.email" type="email" class="border px-2 py-2 w-full rounded" />
                            </div>

                            <div class="mt-4">
                                <p>Username <span class="text-red-500">*</span></p>
                                <input v-model="form.username" type="text" class="border px-2 py-2 w-full rounded" />
                            </div>

                            <div class="mt-4 relative">
                                <p>Password <span class="text-red-500">*</span></p>
                                <input :type="showPassword ? 'text' : 'password'" v-model="form.password"
                                    class="w-full px-3 py-2 rounded border" placeholder="กรอกรหัสผ่าน" />
                                <button type="button" class="absolute right-3 top-9" @click="togglePassword">
                                    👁️
                                </button>
                            </div>
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
                        <button class="flex-1 bg-gray-500 text-white py-3 rounded-lg" @click="resetForm">
                            รีเซ็ต
                        </button>
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
        }

    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState);
        }
    }
};
</script>
