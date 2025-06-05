<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4  md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div class="bg-white md:rounded-lg mt-2 px-4 min-h-screen">
                <div class="mb-10 pt-3">
                    <p class="text-center md:text-left text-3xl">ข้อมูลบริษัท</p>
                </div>

                <div class="flex flex-col items-center">
                    <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                        <p class="md:w-1/3">โลโก้บริษัท</p>
                        <img />{{companyLogo}}
                    </div>

                    <div class="flex flex-col md:flex-row md:items-center md:gap-4 mt-3 md:mt-6">
                        <p class="md:w-1/3">ชื่อบริษัท</p>
                        <p>{{ Namecompany }}</p>
                    </div>

                    <div class="bg-yellow-400 shadow-xl rounded-lg p-4 mt-6 w-full max-w-2xl mx-auto space-y-4">
                        <div class="flex space-x-2">
                            <p class="text-red-700">**</p>
                            <p class="font-semibold">เพิ่มชื่อเเละลายเซ็นสำหรับอนุมัติใบเสร็จหรือเอกสารอื่นๆ</p>
                        </div>

                        <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                            <p class="md:w-1/3">ชื่อ-นามสกุล</p>
                            <p>{{ NameApprove }}</p>
                        </div>

                        <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                            <p class="md:w-1/3">ลายเซ็น (ภาพพื้นหลังสีขาวหรือไม่มีพื้นหลังเท่านั้น)</p>
                            <img />TODO: ภาพลายเซ็น

                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row md:items-center md:gap-4 mt-6">
                        <p class="md:w-1/3">บ้านเลขที่</p>
                        <p></p>
                    </div>

                    <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                        <p class="md:w-1/3">ตำบล</p>
                        <p></p>
                    </div>

                    <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                        <p class="md:w-1/3">อำเภอ</p>
                        <p></p>
                    </div>

                    <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                        <p class="md:w-1/3">จังหวัด</p>
                        <p></p>
                    </div>

                    <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                        <p class="md:w-1/3">รหัสไปรษณีย์</p>
                        <p></p>
                    </div>

                    <div class="mt-6">
                        <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                            <p class="md:w-1/3">เบอร์โทร</p>
                            <p></p>
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                            <p class="md:w-1/3">อีเมล</p>
                            <p></p>
                        </div>
                    </div>


                    <div class="mt-8 space-x-4">
                        <button @click="navigateToEditProfileCompany"
                            class="bg-stone-400 p-2 rounded-lg">เเก้ไข</button>
                        <button @click="navigateBackToMainProfileCompany"
                            class="bg-red-400 p-2 rounded-lg">ย้อนกลับ</button>
                    </div>

                    <div>
                        <p></p>
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