<template>
    <div class="w-full flex flex-col md:flex-row min-h-screen bg-gray-200">
        <SidebarAdmin />

        <div class="flex-1 px-4 py-4 md:px-2 md:py-4 mt-16 md:mt-0">
            <!-- Header Section -->
            <div class="mb-6">
                <h1 class="text-xl md:text-2xl font-medium mb-2 md:mb-4">Dashboard Admin</h1>
                <p class="text-sm text-gray-600">รายการของคุณ...</p>
            </div>

            <!-- Stats Cards -->
            <div class="flex flex-col md:flex-row gap-4 md:gap-2 mb-6">
                <div class="w-full md:w-1/3 bg-white text-center rounded-lg p-4 min-h-20">
                    <div>Box 1</div>
                </div>
                <div class="w-full md:w-1/3 bg-white text-center rounded-lg p-4 min-h-20">
                    <div>Box 2</div>
                </div>
                <div class="w-full md:w-1/3 bg-white text-center rounded-lg p-4 min-h-20">
                    <div>Box 3</div>
                </div>
            </div>

            <!-- Right Panel - แสดงใต้ main content ในมือถือ -->
            <div class="w-full md:hidden bg-white rounded-lg p-4 mt-4">
                <div>
                    huyigtki
                </div>
            </div>
        </div>

        <!-- Right Panel - แสดงข้างขวาในหน้าจอใหญ่ -->
        <div class="hidden md:block md:w-1/5 bg-white mx-2 mb-4 mt-4 rounded-lg p-4">
            <div>
                huyigtki
            </div>
        </div>
    </div>
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'

export default {
    name: "DashBoardforAdmin",
    components: {
        SidebarAdmin
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>