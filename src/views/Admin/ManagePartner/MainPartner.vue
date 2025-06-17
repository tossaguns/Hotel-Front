<template>
    TODO: ให้เป็ฯ partner กับเราเเล้วเด่นสุด อยู่ข้างล่างสุด
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[240px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div>
                <div class="mt-2 rounded-t-lg bg-rose-400 p-2 text-white text-lg">
                    <h1>จัดการ Partner</h1>
                </div>

                <div class="bg-white rounded-b-lg pb-6 ">
                    <div class="flex justify-center pt-7 mb-5 space-x-3">
                        <div>
                            <button @click="navigateToRequest"
                                class="bg-stone-300 text-2xl rounded-lg px-3 py-2 hover:bg-stone-400">คำขอสมัคร
                                Partner</button>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-b-lg pb-6 ">
                    <div class="flex justify-center pt-7 mb-5 space-x-3">

                        <button @click="navigateToApprovePartner"
                            class="bg-green-400  text-2xl rounded-lg px-3 py-2 hover:bg-green-500">เป็น Partner
                            กับเราเเล้ว
                        </button>

                        <button @click="navigateToWaitEditPartner"
                            class="bg-amber-400  text-2xl rounded-lg px-3 py-2 hover:bg-amber-500">ให้กลับไปเเก้ไข
                        </button>

                        <button @click="navigateToNoApprovePartner"
                            class="bg-red-400  text-2xl rounded-lg px-3 py-2 hover:bg-red-500">ปฎิเสธ
                        </button>

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
        navigateToRequest() {
            this.$router.push("/request");
        },
        navigateToApprovePartner() {
            this.$router.push("/approvepartner");
        },
        navigateToNoApprovePartner() {
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