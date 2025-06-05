<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div class="bg-white rounded-lg pb-10 mt-2 ">
                <div class="py-2 bg-rose-400 rounded-t-lg">
                    <p class="text-center md:text-left text-xl text-white px-2">เพิ่มโปรโมชั่น</p>
                </div>

                <div class="bg-white md:rounded-b-lg px-4 min-h-screen mt-4">
                    <p class="text-2xl font-bold text-center py-4">
                        เพิ่มโปรโมชั่น
                    </p>

                    <div>
                        <p class="mb-2">ชื่อโปรโมชั่น</p>
                        <input class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" v-model="promotion.namePromotion" />
                    </div>
                    <div>
                        <p class="mb-2">รายละเอียด</p>
                        <textarea rows="3" v-model="promotion.detailPromotion"  class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                            placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
                    </div>
                    <div>
                        <p class="mb-2">วันเริ่มโปรโมชั่น</p>
                        <input type="date" v-model="promotion.dateStart"  class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                    </div>
                    <div>
                        <p class="mb-2">วันสิ้นสุดโปรโมชั่น</p>
                        <input type="date" v-model="promotion.dateFinish"  class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                    </div>
                    <div>
                        <p class="mb-2">ราคา</p>
                        <input v-model="promotion.price"  class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                    </div>

                    <div class="my-6 flex justify-center space-x-3">
                        <button class="bg-green-500 py-2 px-3 text-white rounded-lg hover:bg-green-600">บันทึก</button>
                        <button class="bg-gray-400 py-2 px-3 text-white rounded-lg hover:bg-gray-600">รีเซ็ท</button>
                        <button @click="navigateBackToMainPromotion"
                            class="bg-red-500 py-2 px-3 text-white rounded-lg hover:bg-red-600">ย้อนกลับ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'

export default {
    name: "DetailPartnerWaitApprove",
    components: {
        SidebarAdmin,
        promotion: {
            namePromotion: '',
            detailPromotion: '',
            dateStart: '',
            dateFinish: '',
            price: '',
        }
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
        navigateBackToMainPromotion() {
            this.$router.push("/mainpromotion");
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