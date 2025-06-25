<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">
            <div>
                <div class="mt-2 rounded-t-lg bg-amber-400 p-2 text-white text-lg">
                    <h1>รายงาน</h1>
                </div>

                <div class="bg-white rounded-b-lg pt-4 pb-6 px-2">
                    <div
                        class="flex flex-col justify-center items-center shadow-md rounded-lg md:mx-5 mx-2 mt-3 py-4 bg-neutral-100">
                        <div>
                            <button
                                class="bg-white py-2 px-4 mb-3 rounded-lg border-2 hover:bg-gray-100">รายงานเข้าพักทั้งหมด</button>
                        </div>
                        <div>
                            <button
                                class="bg-white py-2 px-4 mb-3 rounded-lg border-2 hover:bg-gray-100">รายงานการจองกับ
                                Tossagun</button>
                        </div>
                        <div class="space-x-3">
                            <button
                                class="bg-green-300 py-2 px-4 mb-3 rounded-lg border-2 hover:bg-green-400">รายงานCheckIn</button>
                            <button
                                class="bg-red-300 py-2 px-4 mb-3 rounded-lg border-2 hover:bg-red-400">รายงานCheckOut</button>
                        </div>
                    </div>


                    <div
                        class="flex flex-col justify-center items-center shadow-md rounded-lg md:mx-5 mx-2 mt-3 py-4 bg-yellow-50">
                        <div>
                            <button
                                class="bg-white py-2 px-4 mb-3 rounded-lg border-2 hover:bg-gray-100">รายการห้องพัก</button>
                        </div>
                    </div>

                    <div
                        class="flex flex-col justify-center items-center shadow-md rounded-lg md:mx-5 mx-2 mt-3 py-4 bg-neutral-100">
                        <div>
                            <button
                                class="bg-white py-2 px-4 mb-3 rounded-lg border-2 hover:bg-gray-100">รายชื่อพนักงาน</button>
                        </div>
                        <div>
                            <button
                                class="bg-amber-300 py-2 px-4 mb-3 rounded-lg border-2 hover:bg-amber-400">รายงานการเข้างานของพนักงาน
                                login</button>
                        </div>
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