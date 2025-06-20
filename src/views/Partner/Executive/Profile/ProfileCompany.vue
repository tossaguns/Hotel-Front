<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4  md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div class="bg-white md:rounded-lg mt-2 px-4 min-h-screen pb-8">
                <div class="mb-10 pt-3">
                    <p class="text-center md:text-left text-3xl">เเก้ไขข้อมูลบริษัท</p>
                </div>

                <div class="flex flex-col  max-w-5xl mx-auto">
                    <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                        <p class="md:w-1/3">โลโก้บริษัท</p>
                        <img />
                    </div>

                    <div class="flex flex-col md:flex-row md:items-center md:gap-4  mt-3">
                        <p class="md:w-1/3">ชื่อบริษัท</p>
                        <p class="w-full border p-2 rounded text-amber-700">{{ }}</p>
                    </div>

                    <div class="bg-yellow-400 shadow-xl rounded-lg p-4 mt-6 w-full space-y-4">
                        <div class="flex space-x-2">
                            <p class="text-red-700">**</p>
                            <p class="font-semibold">เพิ่มชื่อเเละลายเซ็นสำหรับอนุมัติใบเสร็จหรือเอกสารอื่นๆ</p>
                        </div>

                        <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                            <p class="md:w-1/3">ชื่อ-นามสกุล</p>
                            <p class="w-full border p-2 rounded text-amber-700 bg-white">{{ }}</p>
                        </div>

                        <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                            <p class="md:w-1/3">ลายเซ็น (ภาพพื้นหลังสีขาวหรือไม่มีพื้นหลังเท่านั้น)</p>
                            <img class="w-full border p-2 rounded bg-white" />
                        </div>
                    </div>


                    <div class="max-w-2xl mx-auto mt-6 w-full">
                        <div class="px-4 py-3">
                            <div class="flex space-x-2">
                                <p class="w-1/3">บ้านเลขที่ </p>
                                <p class="border w-full py-1 px-3 rounded-md">{{ }}</p>
                            </div>

                            <div class="flex space-x-2 mt-2">
                                <p class="w-1/3">ตำบล </p>
                                <p class="border w-full py-1 px-3 rounded-md">{{ }}</p>
                            </div>

                            <div class="flex space-x-2 mt-2">
                                <p class="w-1/3">อำเภอ </p>
                                <p class="border w-full py-1 px-3 rounded-md">{{ }}</p>
                            </div>

                            <div class="flex space-x-2 mt-2">
                                <p class="w-1/3">จังหวัด </p>
                                <p class="border w-full py-1 px-3 rounded-md">{{ }}</p>
                            </div>

                            <div class="flex space-x-2 mt-2">
                                <p class="w-1/3">รหัสไปรษณีย์ </p>
                                <p class="border w-full py-1 px-3 rounded-md">{{ }}</p>
                            </div>


                            <hr class="border my-4" />

                            <div class="mt-6">
                                <div class="flex space-x-2 mt-2">
                                    <p class="w-1/3">เบอร์โทร </p>
                                    <p class="border w-full py-1 px-3 rounded-md">{{ }}</p>
                                </div>

                                <div class="flex space-x-2 mt-2">
                                    <p class="w-1/3">อีเมล </p>
                                    <p class="border w-full py-1 px-3 rounded-md">{{ }}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="mt-8 space-x-4 flex justify-center">
                        <button @click="navigateBackToMainProfileCompany"
                            class="bg-red-600 py-2 px-4 text-white font-bold hover:bg-red-500 rounded-lg">ย้อนกลับ</button>
                        <button @click="navigateToEditProfileCompany"
                            class="bg-stone-500 py-2 px-4 text-white font-bold hover:bg-stone-400 rounded-lg">เเก้ไข</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "EmployeeList",
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarCollapsed: false,

        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateBackToMainProfileCompany() {
            this.$router.push("/mainprofilecompany");
        },
        navigateToEditProfileCompany() {
            this.$router.push("/editprofilecompany");
        },


    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
}
</script>