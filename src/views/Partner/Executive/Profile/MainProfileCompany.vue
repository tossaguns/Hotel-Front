<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">

            <div class="bg-white md:rounded-lg mt-2 px-4 min-h-screen flex justify-center pt-32 space-x-5">
                <div>
                    <button @click="navigateBackToEditProfileCompany"
                        class="bg-gray-300 py-3 px-4 rounded-lg text-3xl hover:bg-gray-500 hover:text-white font-bold">โปรไฟล์บริษัท</button>
                </div>
                <div>
                    <button @click="navigateBackToEditDetailHotel"
                        class="bg-amber-300 py-3 px-4 rounded-lg text-3xl hover:bg-amber-500 hover:text-white font-bold">ข้อมูลโรงเเรม</button>
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
        navigateBackToEditDetailHotel() {
            this.$router.push("/detailhotel");
        },
        navigateBackToEditProfileCompany() {
            this.$router.push("/profilecompany");
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