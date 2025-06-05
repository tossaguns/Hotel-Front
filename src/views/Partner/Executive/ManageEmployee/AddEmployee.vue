<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <!-- เพิ่ม flex-1 เพื่อให้ขยายเต็มพื้นที่ -->
            <div class="flex-1 flex flex-col">
                <div class="md:mt-4 mt-28 text-center md:text-left">
                    <h class="text-3xl  sm:text-4xl pl-3 text-gray-500">
                        เพิ่มรายชื่อพนักงาน</h>
                </div>
                <div class="z-10 bg-white mt-4 pb-5 mx-2 rounded-lg">

                    //FIXME: เเก้ให้เพิ่มสถานะได้ มี admin / Employee
                    <div class="flex justify-center">
                        <p>สถานะ</p>
                        <!--role นี้ Partner เป็นคนทำ โดย adminPartner มีสถานะเทียบเท่า Partner เเละ employee มีสถานะเป็นเพียง employee ซึ่งสามารถเข้าใช้งานได้เเค่บางอย่าง-->
                        <dropdown></dropdown>
                    </div>

                    <div class="flex justify-center mt-2">
                        <p>เพศ</p>
                        <dropdown></dropdown><!--sex-->
                    </div>

                    <div class="flex justify-center">
                        <div class="flex px-3">
                            <p>รหัสพนักงาน</p><!--employeeId-->
                            <p class="text-red-500 ml-2">*</p>
                        </div>
                        <input type="text" class="border mt-1 px-2 py-2 rounded" />
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 mt-4 px-4">
                        <div class="w-full sm:w-1/2">
                            <div>
                                <div>
                                    <p>ตำเเหน่ง</p><!--position-->

                                </div>
                                <input type="text" class="border mt-1 px-2 py-2 w-full rounded" />
                            </div>

                            <div class="mt-4">
                                <div class="flex">
                                    <p>ชื่อ</p><!--firstName-->
                                    <p class="text-red-500 ml-2">*</p>
                                </div>
                                <input type="text" class="border mt-1 px-2 py-2 w-full rounded" />
                            </div>

                            <div class="mt-4">
                                <div class="flex">
                                    <p>นามสกุล</p><!--lastName-->
                                    <p class="text-red-500 ml-2">*</p>
                                </div>
                                <input type="text" class="border mt-1 px-2 py-2 w-full rounded" />
                            </div>

                            <div class="mt-4">
                                <p>ชื่อเล่น</p><!--nickName-->
                                <input type="text" class="border mt-1 px-2 py-2 w-full rounded" />
                            </div>
                        </div>

                        <div class="w-full sm:w-1/2">
                            <div>
                                <p>เบอร์ติดต่อ</p><!--personalPhone-->
                                <input type="text" class="border mt-1 px-2 py-2 w-full rounded"
                                    placeholder="0XX-XXXXXXX" />
                            </div>

                            <div class="mt-4">
                                <p>อีเมล</p><!--personalEmail-->
                                <input type="text" class="border mt-1 px-2 py-2 w-full rounded"
                                    placeholder="Email@email.com" />
                            </div>
                            <div class="mt-4">
                                <div class="flex">
                                    <p class="font-bold">Username :</p><!-- username-->
                                    <p class="text-red-500 ml-2">*</p>
                                </div>
                                <input type="text" class="border mt-1 px-2 py-2 w-full rounded"
                                    placeholder="กรอกยูเซอร์เนม" />
                            </div>

                            <div class="mt-4 relative">
                                <div class="flex">
                                    <p class="font-bold">Password :</p><!--password-->
                                    <p class="text-red-500 ml-2 mt-1">*</p>
                                </div>
                                <input :type="showPassword ? 'text' : 'password'"
                                    class="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="กรอกรหัสผ่าน" />
                                <button type="button" class="w-1 absolute right-3 top-9 text-gray-600"
                                    @click="togglePassword">

                                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>

                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.943-9.544-7a10.052 10.052 0 012.504-4.172m3.206-2.123A9.956 9.956 0 0112 5c4.478 0 8.27 2.943 9.544 7a9.978 9.978 0 01-1.249 2.527M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.363 6.363L3 21m0 0l3.75-3.75M3 21l3.75-3.75" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <div>
                            <p class="text-center mb-1">อัปโหลดรูปภาพ</p><!--profile_img-->
                        </div>
                        <label v-if="!imageUrl" for="fileInput"
                            class="cursor-pointer w-full max-w-xs mx-auto flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 hover:border-blue-400 hover:text-blue-500 transition">
                            <span class="text-4xl font-bold mb-1">+</span>
                            <span class="text-sm">อัปโหลดไฟล์</span>
                            <input id="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
                        </label>


                        <div v-else class="relative w-full max-w-xs mx-auto">

                            <button @click="removeImage"
                                class="absolute top-1 right-1 bg-white text-red-500 rounded-full shadow p-1 hover:bg-red-100 transition z-10"
                                title="ลบภาพ">
                                ✕
                            </button>

                            <img :src="imageUrl" alt="Preview" class="rounded-lg shadow object-cover w-full h-64" />
                        </div>
                    </div>

                    <div>
                        <div class="flex flex-col sm:flex-row gap-4 mb-3 mt-6 px-5">
                            <button class="flex-1 bg-lime-500 text-white py-3 rounded-lg hover:bg-lime-700 shadow-xl">
                                บันทึก
                            </button>
                            <button class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-700 shadow-xl"
                                @click="reseatall">
                                รีเซ็ต
                            </button>
                            <button class="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-700 shadow-xl"
                                @click="navigateToBackMainemployee">
                                ย้อนกลับ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/SidebarExecutive.vue'
export default {
    name: "AddEmployee",
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarCollapsed: false,
            uploadimg: null,
            imageUrl: null,
            showPassword: false,

        };
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateToBackMainemployee() {
            this.$router.push("/mainemployee");
        },
        getImageUrl(path) {
            return path;
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
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
};
</script>
<style></style>
