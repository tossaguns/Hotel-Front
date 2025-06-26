<template>
    <div class="w-full min-h-screen bg-gray-200">
        <BarEmployee @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[240px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div>
                <h1 class="text-2xl font-bold mb-4">แดชบอร์ดสำหรับพนักงาน</h1>
                <p>ยินดีต้อนรับสู่ระบบจัดการโรงแรม</p>
            </div>
        </div>
    </div>
</template>
<script>
import BarEmployee from '@/components/BarEmployee.vue'

export default {
    name: 'DashBoardforEmployee',
    components: {
        BarEmployee
    },
    data() {
        return {
            isSidebarCollapsed: false
        }
    },
    mounted() {
        // เช็คสถานะ sidebar เริ่มต้นจาก localStorage หรือ default
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        }
    }
}
</script>
<style lang="">

</style>
