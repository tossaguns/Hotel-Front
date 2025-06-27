<template>
    <div class="w-full min-h-screen bg-gray-100">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">


            <div>
                <div class="mt-2 rounded-t-lg bg-emerald-800 p-2 text-white text-lg">
                    <h1>โปรโมชั่น</h1>
                </div>

                <div class="bg-white rounded-b-lg pb-6 ">
                    <div class="flex justify-center pt-7 mb-5">
                        <button @click="navigateToAddPromotion"
                            class="rounded-lg px-2 py- text-lg hover:bg-emerald-500 shadow-lg">
                            + เพิ่มโปรโมชั่น
                        </button>

                    </div>

                    <!-- เพิ่ม wrapper -->

                    <div class="overflow-x-auto px-2 ">
                        <table
                            class="responsive-table-mainpromotion w-full table-auto border-separate border-spacing-0 text-xs md:text-sm ">
                            <thead>
                                <tr class="bg-gray-200 whitespace-nowrap">
                                    <th class="col-index border px-2 py-1 rounded-tl-xl">ลำดับ</th>
                                    <th class="border px-2 py-1">ชื่อ โปรโมชั่น</th>
                                    <th class="col-detail border px-2 py-1">รายละเอียด</th>
                                    <th class="col-datestart border px-2 py-1">วันเริ่มโปรโมชั่น</th>
                                    <th class="col-datefinish border px-2 py-1">วันสิ้นสุดโปรโมชั่น</th>
                                    <th class="border px-2 py-1">ราคา</th>
                                    <th class="col-createAt border px-2 py-1">วันเวลาที่อัปเดต</th>
                                    <th class="border px-2 py-1">ผู้ทำการอัปเดต</th>
                                    <th class="px-2 py-2 border sm:px-3 sm:py-3 rounded-tr-xl">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(promotion, index) in promotion" :key="promotion.promotion_id"
                                    class="hover:bg-gray-50 whitespace-nowrap">
                                    <td class="col-index border px-2 py-1 break-words">{{ index + 1 }}</td>
                                    <td class="border px-2 py-1 break-words">{{ promotion.namePromotion }}</td>
                                    <td
                                        class="col-detail border px-2 py-1 max-w-[340px] truncate overflow-hidden whitespace-nowrap">
                                        {{ promotion.detailPromotion }}
                                    </td>
                                    <td class="col-datestart border px-2 py-1 break-words">{{ promotion.dateStart }}
                                    </td>
                                    <td class="col-datefinish border px-2 py-1 break-words">{{ promotion.dateFinish }}
                                    </td>
                                    <td class="border px-2 py-1 break-words">
                                        {{ promotion.price }}
                                    </td>
                                    <td class="col-createAt border px-2 py-1 break-words">{{ promotion.createAt }}</td>
                                    <td class="border px-2 py-1 break-words">{{ promotion.nameUpdate }}</td>


                                    <td class="border px-2 py-1 break-words space-x-2">
                                        <button @click="editRoom(room.promotion_id)"
                                            class="text-white bg-emerald-700 px-2 py-2 rounded-lg hover:bg-emerald-500 shadow-lg transition">
                                            ✏️
                                        </button>
                                        <button @click="detailRoom(promotion.promotion_id)"
                                            class="text-white bg-emerald-700 px-2 py-2 rounded-lg hover:bg-emerald-500 shadow-lg transition">
                                            👁️
                                        </button>
                                        <button @click="deleteRoom(room.promotion_id)"
                                            class="text-white bg-red-600 px-2 py-2 rounded-lg hover:bg-red-400 shadow-lg transition">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div v-if="showPreviewModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 relative overflow-auto max-h-[90vh]"
                    :class="{
                        'border-yellow-300 border-4': selectedPromotion?.tonecolor === 'yellow',
                        'border-blue-300 border-4': selectedPromotion?.tonecolor === 'blue',
                        'border-green-300 border-4': selectedPromotion?.tonecolor === 'green',
                        'border-red-300 border-4': selectedPromotion?.tonecolor === 'red',
                        'border-purple-300 border-4': selectedPromotion?.tonecolor === 'purple'
                    }">

                    <!-- ปุ่มปิด -->
                    <button @click="showPreviewModal = false"
                        class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold">✖</button>

                    <!-- หัว -->
                    <div class="py-3 rounded-t-md text-white text-center font-bold text-lg break-all whitespace-pre-wrap"
                        :class="{
                            'bg-yellow-300': selectedPromotion?.tonecolor === 'yellow',
                            'bg-blue-300': selectedPromotion?.tonecolor === 'blue',
                            'bg-green-300': selectedPromotion?.tonecolor === 'green',
                            'bg-red-300': selectedPromotion?.tonecolor === 'red',
                            'bg-purple-300': selectedPromotion?.tonecolor === 'purple'
                        }">
                        {{ selectedPromotion?.namePromotion || 'ชื่อโปรโมชั่น' }}
                    </div>

                    <!-- เนื้อหา -->
                    <div class="bg-white px-6 py-6 space-y-2 text-gray-700">
                        <div class="text-5xl font-bold text-center text-gray-900">
                            {{ selectedPromotion?.price || '0' }} <br><span class="text-sm">บาท / คน / บัญชี</span>
                        </div>
                        <ul class="list-none space-y-1 mt-4">
                            <li v-for="(line, index) in selectedPromotion?.detailPromotion?.split('\n')" :key="index"
                                class="flex items-start">
                                <span class="mr-2 mt-1">✔</span>
                                <span class="break-all whitespace-pre-wrap w-0 flex-1 text-gray-700">{{ line }}</span>
                            </li>
                            <li class="flex items-start">
                                <span class="mr-2 mt-1">📅</span>
                                <span class="text-sm">เริ่ม: {{ selectedPromotion?.dateStart || '-' }}</span>
                            </li>
                            <li class="flex items-start">
                                <span class="mr-2 mt-1">📅</span>
                                <span class="text-sm">สิ้นสุด: {{ selectedPromotion?.dateFinish || '-' }}</span>
                            </li>
                        </ul>
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
        SidebarAdmin,
        // promotion: {
        //     promotion_id: '',
        //     namePromotion: '',
        //     detailPromotion: '',
        //     dateStart: '',
        //     dateFinish: '',
        //     createAt: '',
        //     nameUpdate: '',
        //     tonecolor: '',
        // },
    },
    data() {
        return {
            isSidebarCollapsed: false,
            showPreviewModal: false, // สำหรับควบคุม popup
            selectedPromotion: null,
            promotion: [ //ตัวอย่าง Promotion
                {
                    promotion_id: 1,
                    namePromotion: "Business Basic",
                    tonecolor: "yellow",
                    detailPromotion: "พื้นที่ 50GB\nCloud 1TB\n...",
                    price: "980",
                    dateStart: "2025-07-01",
                    dateFinish: "2025-12-31",
                    createAt: '',
                    nameUpdate: '',
                },
                {
                    promotion_id: 2,
                    namePromotion: "หมดอายุ",
                    tonecolor: "red",
                    detailPromotion: "ไม่ควรแสดง",
                    price: "500",
                    dateStart: "2023-01-01",
                    dateFinish: "2023-12-31"
                },
                {
                    promotion_id: 3,
                    namePromotion: "Business Basic",
                    tonecolor: "blue",
                    detailPromotion: "พื้นที่ 50GB\nCloud 1TB\n...",
                    price: "980",
                    dateStart: "2025-07-01",
                    dateFinish: "2025-12-31",
                    createAt: '',
                    nameUpdate: '',
                },
                {
                    promotion_id: 4,
                    namePromotion: "Premium Plan",
                    tonecolor: "green",
                    detailPromotion: "พื้นที่ไม่จำกัด\nCloud 5TB\nทีมงานดูแล 24/7\nฟีเจอร์ครบครัน",
                    price: "1,890",
                    dateStart: "2025-07-01",
                    dateFinish: "2025-12-31",
                    createAt: '',
                    nameUpdate: '',
                },
                {
                    promotion_id: 5,
                    namePromotion: "Startup Pack",
                    tonecolor: "purple",
                    detailPromotion: "พื้นที่ 20GB\nCloud 500GB\nเหมาะสำหรับเริ่มต้นธุรกิจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจจ",
                    price: "490",
                    dateStart: "2025-07-01",
                    dateFinish: "2025-12-31",
                    createAt: '',
                    nameUpdate: '',
                }
            ],
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateToAddPromotion() {
            this.$router.push("/addpromotion");
        },

        detailRoom(promotionId) {
            // สมมุติคุณมีรายการโปรโมชั่นใน this.promotionList
            const found = this.promotion.find(p => p.promotion_id === promotionId)
            if (found) {
                this.selectedPromotion = { ...found } // Clone data
                this.showPreviewModal = true
            }
        }

    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }

        localStorage.setItem('adminPromotions', JSON.stringify(this.promotion))
    },
}
</script>
<style>
.responsive-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.responsive-table th,
.responsive-table td {
    border: 1px solid #ccc;
    padding: 6px;
    text-align: center;
}

/* ✅ ซ่อนคอลัมน์เมื่อหน้าจอเล็ก */
@media (max-width: 1188px) {
    .col-detail {
        display: none;
    }
}

@media (max-width: 1024px) {
    .col-datefinish {
        display: none;
    }
}

@media (max-width: 900px) {
    .col-datestart {
        display: none;
    }
}

@media (max-width: 768px) {
    .col-createAt {
        display: none;
    }
}

@media (max-width: 640px) {
    .col-index {
        display: none;
    }

    .responsive-table th:nth-child(1),
    .responsive-table td:nth-child(1) {
        display: none;
        /* ซ่อนลำดับ */
    }
}
</style>