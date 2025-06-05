<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div>   
                <div>
                    <p>โปรโมชั่น</p>
                </div>
                <div>
                    <div class="my-8">
                        <button @click="navigateBackToAddPromotion">+ เพิ่มโปรโมชั่น</button>
                    </div>

                    <div>
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อ Promotion</th>
                                <th>ระยะเวลา</th>
                                <th>ราคา</th>
                                <th>วันเวลาที่อัปเดต</th>
                                <th>ผู้ทำการอัปเดต</th>
                                <th>จัดการ</th>
                            </tr>
                        </table>
                    </div>
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
        navigateBackToAddPromotion() {
            this.$router.push("/addpromotion");
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