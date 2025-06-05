<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <!-- Main Content - ใช้ dynamic margin-left ตามสถานะของ sidebar -->
        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <!-- Header Section -->
            <div class="mb-6">
                <h1 class="text-xl md:text-2xl font-medium mb-2 md:mb-4">Dashboard Executive</h1>
                <p class="text-sm text-gray-600">รายการของคุณ...</p>
            </div>

            <!-- Stats Cards -->
            <div class="flex flex-col md:flex-row gap-4 md:gap-2 mb-6">
                <div class="w-full md:w-1/3 bg-white text-center rounded-lg p-4 min-h-20 shadow-sm">
                    <div class="text-gray-600 text-sm mb-2">ยอดขายรวม</div>
                    <div class="text-2xl font-bold text-blue-600">฿1,234,567</div>
                </div>
                <div class="w-full md:w-1/3 bg-white text-center rounded-lg p-4 min-h-20 shadow-sm">
                    <div class="text-gray-600 text-sm mb-2">ออเดอร์ใหม่</div>
                    <div class="text-2xl font-bold text-green-600">152</div>
                </div>
                <div class="w-full md:w-1/3 bg-white text-center rounded-lg p-4 min-h-20 shadow-sm">
                    <div class="text-gray-600 text-sm mb-2">ลูกค้าใหม่</div>
                    <div class="text-2xl font-bold text-purple-600">89</div>
                </div>
            </div>

            <!-- Content Area -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h3 class="text-lg font-medium mb-4">กราฟยอดขาย</h3>
                    <div class="h-48 bg-gray-100 rounded flex items-center justify-center">
                        <span class="text-gray-500">Chart Placeholder</span>
                    </div>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h3 class="text-lg font-medium mb-4">รายงานล่าสุด</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span>รายงานรายเดือน</span>
                            <span class="text-blue-600 text-sm">ดูรายละเอียด</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span>รายงานประจำสัปดาห์</span>
                            <span class="text-blue-600 text-sm">ดูรายละเอียด</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Panel - แสดงใต้ main content ในมือถือ -->
            <div class="w-full md:hidden bg-white rounded-lg p-4 mt-4 shadow-sm">
                <h3 class="text-lg font-medium mb-4">การแจ้งเตือน</h3>
                <div class="space-y-2">
                    <div class="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p class="text-sm">มีออเดอร์ใหม่รอการอนุมัติ</p>
                    </div>
                    <div class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                        <p class="text-sm">รายงานประจำเดือนพร้อมแล้ว</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Panel - แสดงข้างขวาในหน้าจอใหญ่ -->
        <div class="hidden md:block fixed top-4 right-2 bg-white rounded-lg p-4 h-[calc(100vh-2rem)] overflow-y-auto shadow-sm transition-all duration-300"
            :class="{
                'w-1/5': !isSidebarCollapsed,
                'w-1/4': isSidebarCollapsed
            }">
            <h3 class="text-lg font-medium mb-4">การแจ้งเตือน</h3>
            <div class="space-y-3">
                <div class="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p class="text-sm font-medium">ออเดอร์ใหม่</p>
                    <p class="text-xs text-gray-600 mt-1">มีออเดอร์ใหม่ 5 รายการรอการอนุมัติ</p>
                </div>
                <div class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <p class="text-sm font-medium">รายงานพร้อม</p>
                    <p class="text-xs text-gray-600 mt-1">รายงานประจำเดือนมีนาคมพร้อมแล้ว</p>
                </div>
                <div class="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                    <p class="text-sm font-medium">เป้าหมายสำเร็จ</p>
                    <p class="text-xs text-gray-600 mt-1">บรรลุเป้าหมายยอดขาย 85%</p>
                </div>
                <div class="p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
                    <p class="text-sm font-medium">ลูกค้าใหม่</p>
                    <p class="text-xs text-gray-600 mt-1">มีลูกค้าใหม่ลงทะเบียน 12 คน</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "DashBoardforExecutive",
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarCollapsed: false
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        }
    },
    mounted() {
        // เช็คสถานะ sidebar เริ่มต้นจาก localStorage หรือ default
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    }
}
</script>