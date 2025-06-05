<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
        <div>
            <p>เเก้ไขห้องพัก</p>
        </div>
                
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "EditRoom",
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
        /*navigateBackToMainPartner() {
            this.$router.push("/request");
        },*/
       
       
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
}
</script>