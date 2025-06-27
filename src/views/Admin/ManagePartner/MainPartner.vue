<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[240px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div class="mt-3 relative bg-gradient-to-b from-emerald-400 via-white to-white rounded-xl overflow-hidden">

                <div class="rounded-t-lg bg-emerald-800 p-2 text-white text-lg">
                    <h1>จัดการ Partner</h1>
                </div>

                <!-- Header -->
                <div class="relative z-10 text-center py-6">
                    <h1 class="text-3xl sm:text-4xl font-extrabold text-emerald-800 drop-shadow">
                        ระบบจัดการ Partner
                    </h1>
                    <p class="text-gray-600 mt-2 text-base sm:text-lg max-w-md mx-auto">
                        ดูแลและจัดการคำขอเป็นพาร์ทเนอร์ของโรงแรมคุณ<br> อย่างมืออาชีพ
                    </p>
                </div>

                <!-- คำขอสมัคร -->
                <div class="relative z-10 flex justify-center pb-4">
                    <button @click="navigateToRequest"
                        class="bg-white border-2 border-emerald-800 text-emerald-800 text-lg sm:text-xl font-medium rounded-full px-6 py-3 hover:bg-emerald-100 transition duration-300 shadow">
                        📄 คำขอสมัคร Partner
                    </button>
                </div>

                <!-- การจัดการสถานะ -->
                <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 py-10 justify-center">

                    <!-- แก้ไข -->
                    <div class="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                        <p class="text-sm text-gray-800 mb-2">รีวิวข้อมูลพาร์ทเนอร์</p>
                        <button @click="navigateToWaitEditPartner"
                            class="bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-xl w-full px-4 py-3 hover:bg-amber-300 transition">
                            ✏️ ให้กลับไปแก้ไข
                        </button>
                    </div>

                    <!-- ปฏิเสธ -->
                    <div class="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                        <p class="text-sm text-gray-800 mb-2">กรณีไม่ผ่านการตรวจสอบ</p>
                        <button @click="navigateToRejectPartner"
                            class="bg-red-800 text-white text-base sm:text-lg font-semibold rounded-xl w-full px-4 py-3 hover:bg-red-800 transition">
                            ❌ ปฏิเสธ
                        </button>
                    </div>

                    <!-- ผ่านแล้ว -->
                    <div class="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                        <p class="text-sm text-gray-800 mb-2">พาร์ทเนอร์ที่ผ่านแล้ว</p>
                        <button @click="navigateToApprovePartner"
                            class="bg-emerald-800 text-white text-base sm:text-lg font-semibold rounded-xl w-full px-4 py-3 hover:bg-emerald-600 transition">
                            ✅ ผ่านแล้ว
                        </button>
                    </div>
                </div>

                <!-- เป็น Partner กับเราแล้ว -->
                <div class="relative z-10 flex justify-center pb-12">
                    <button @click="navigateToApprovePartner"
                        class="bg-gradient-to-r from-green-500 via-emerald-800 to-green-600 text-white text-sm sm:text-2xl font-bold rounded-full px-6 py-3 sm:py-5 hover:scale-105 hover:shadow-2xl transition duration-500 ease-in-out shadow-lg animate-pulse  text-center">
                        🌟 เป็น Partner กับเราแล้ว 🌟
                    </button>
                </div>

            </div>

        </div>
    </div>
</template>


<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'

export default {
    name: "Promotion",
    components: {
        SidebarAdmin
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
        navigateToRequest() {
            this.$router.push("/request");
        },
        navigateToApprovePartner() {
            this.$router.push("/approvepartner");
        },
        navigateToRejectPartner() {
            this.$router.push("/rejectpartner");
        },
        navigateToWaitEditPartner() {
            this.$router.push("/requesteditpartner");
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