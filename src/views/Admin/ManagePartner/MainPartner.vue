<template>

    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <!-- Main Content - ใช้ dynamic margin-left ตามสถานะของ sidebar -->
        <div class="flex-1 px-4 py-4  md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div>
                <button @click="navigateToApprovePartner" class="bg-orange-400">คำขอสมัคร Partner</button>
            </div>

            <div>
                <button @click="navigateToPartner" class="bg-green-400">Promotion ที่ Partner ใช้</button>
            </div>
        </div>
    </div>

</template>


<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'

export default {
    name: "MainPartner",
    components: {
        SidebarAdmin
    },
    data() {
        return {
            isSidebarCollapsed: false
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateToApprovePartner() {
            this.$router.push("/request");
        },
    },
    mounted() {

        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    }
}
</script>