<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div>
                <div class="mt-2 rounded-t-lg bg-rose-400 p-2 text-white text-lg">
                    <h1>โปรโมชั่น</h1>
                </div>

                <div class="bg-white rounded-b-lg pb-6 ">
                    <div class="flex justify-center pt-7 mb-5">
                        <button @click="navigateToAddPromotion"
                            class="rounded-lg px-2 py- text-lg hover:bg-rose-300 shadow-lg">
                            + เพิ่มโปรโมชั่น
                        </button>

                    </div>

                    <!-- เพิ่ม wrapper -->

                    <div class="overflow-x-auto px-2 ">
                        <table class="w-full border border-collapse text-xs md:text-sm ">
                            <thead>
                                <tr class="bg-gray-200 whitespace-nowrap">
                                    <th class="border px-2 py-1">ลำดับ</th>
                                    <th class="border px-2 py-1">ชื่อ โปรโมชั่น</th>
                                    <th class="border px-2 py-1">รายละเอียด</th>
                                    <th class="border px-2 py-1">วันเริ่มโปรโมชั่น</th>
                                    <th class="border px-2 py-1">วันสิ้นสุดโปรโมชั่น</th>
                                    <th class="border px-2 py-1">ราคา</th>
                                    <th class="border px-2 py-1">วันเวลาที่อัปเดต</th>
                                    <th class="border px-2 py-1">ผู้ทำการอัปเดต</th>
                                    <th class="px-2 py-2 border sm:px-3 sm:py-3">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(promotion, index) in filteredpromotion" :key="promotion.promotion_id"
                                    class="hover:bg-gray-50 whitespace-nowrap">
                                    <td class="border px-2 py-1 break-words">{{ index + 1 }}</td>
                                    <td class="border px-2 py-1 break-words">{{ promotion.namePromotion }}</td>
                                    <td class="border px-2 py-1 break-words">{{ promotion.detailPromotion }}</td>
                                    <td class="border px-2 py-1 break-words">{{ promotion.dateStart }}</td>
                                    <td class="border px-2 py-1 break-words">{{ promotion.dateFinish }}</td>
                                    <td class="border px-2 py-1 break-words">
                                        {{ promotion.price }}
                                    </td>
                                    <td class="border px-2 py-1 break-words">{{ promotion.updateDate }}</td>
                                    <td class="border px-2 py-1 break-words">{{ promotion.updateName }}</td>


                                    <td class="border px-2 py-1 break-words space-x-2">
                                        <button @click="editRoom(room.promotion_id)"
                                            class="text-white bg-blue-400 px-2 py-2 rounded-lg hover:bg-blue-700 shadow-lg transition">
                                            แก้ไข
                                        </button>
                                        <button @click="deleteRoom(room.promotion_id)"
                                            class="text-white bg-red-400 px-2 py-2 rounded-lg hover:bg-red-700 shadow-lg transition">
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
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
        navigateToAddPromotion() {
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