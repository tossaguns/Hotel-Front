<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div>
                <div class="mt-2 rounded-t-lg bg-rose-400 p-2 text-white text-lg">
                    <h1>จัดการ Partner</h1>
                </div>

                <div class="bg-white rounded-b-lg pb-6 ">
                    <div class="flex justify-center pt-7 mb-5 space-x-3">
                        <div>
                            <button @click="navigateToApprovePartner"
                                class="bg-stone-300 text-2xl rounded-lg px-3 py-2 hover:bg-stone-400">คำขอสมัคร
                                Partner</button>
                        </div>

                        <div>
                            <button @click="navigateToPartner"
                                class="bg-green-400  text-2xl rounded-lg px-3 py-2 hover:bg-green-500">เป็น Partner
                                กับเราเเล้ว</button>
                        </div>
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
        navigateToApprovePartner() {
            this.$router.push("/request");
        },
        navigateToPartner() {
            this.$router.push("/mainpartnersleepgun");
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