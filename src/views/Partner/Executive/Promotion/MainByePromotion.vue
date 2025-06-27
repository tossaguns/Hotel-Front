<template>
    <div class="w-full min-h-screen bg-gray-100">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">

            <div class="bg-white min-h-screen py-14 px-4 sm:px-6 lg:px-8 rounded-lg">
                <div class="text-3xl font-bold">
                    Promotion
                </div>

                <div class="max-w-7xl mx-auto ">

                    <div class=" mt-12 max-w-2xl mx-auto">
                        <p class="font-bold text-gray-500 mb-2 ml-">
                            บริการที่กำลังใช้งาน
                        </p>
                        <table class="w-full border text-xs md:text-base xl:text-lg">
                            <thead class="bg-gray-200">
                                <tr>
                                    <th class="border-white border px-2 py-1 rounded-tl-lg">ชื่อบริการ</th>
                                    <th class="border-white border px-2 py-1">วันเริ่มต้น</th>
                                    <th class="border-white border px-2 py-1">วันสิ้นสุด</th>
                                    <th class="border-white border px-2 py-1">ราคา</th>
                                    <th class="border-white border px-2 py-1">สถานะ</th>
                                    <th class="border-white border px-2 py-1 rounded-tr-lg">ดูรายละเอียด</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border px-2 py-1 rounded-bl-lg">111.</td>
                                    <td class="border px-2 py-1">..</td>
                                    <td class="border px-2 py-1">..</td>
                                    <td class="border px-2 py-1">..</td>
                                    <td class="border px-2 py-1">..</td>
                                    <td class="border px-2 py-1 rounded-br-lg">..</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="mb-40 mt-6">
                        <div class="flex justify-center">
                            <button class="bg-amber-500 rounded-md px-4 py-2 text-white hover:bg-amber-400 transition"
                                @click="toggleHistory">
                                {{ showHistory ? 'ปิดประวัติการสั่งซื้อ' : 'ดูประวัติการสั่งซื้อ' }}
                            </button>
                        </div>

                        <div class="mt-4 max-w-5xl mx-auto">
                            <HistoryByePromotion v-if="showHistory" @close="showHistory = false" />
                        </div>
                    </div>

                    <div class="text-center mb-10">
                        <p class="text-3xl font-bold text-gray-800">
                            เลือกใช้ <span class="text-amber-500">บริการที่เหมาะกับคุณ</span>
                        </p>
                        <p class="text-gray-500 text-sm">
                            เลือกโปรโมชั่นที่ตรงใจคุณ และเริ่มใช้งานได้ทันที
                        </p>
                    </div>

                    <div class="flex flex-wrap justify-center gap-4">
                        <div v-for="promotion in activePromotions" :key="promotion.promotion_id"
                            class="w-full max-w-[300px] rounded-lg bg-white shadow-md border transition hover:scale-105 flex flex-col justify-between min-h-[300px]">
                            <div class="py-3 text-gray-400 text-center font-bold text-lg break-all whitespace-pre-wrap">
                                {{ promotion.namePromotion || 'ชื่อโปรโมชั่น' }}
                            </div>

                            <div class="px-3 pb-6 pt-4 text-gray-700 flex flex-col flex-1 justify-between">
                                <div class=" text-center ">
                                    <p class="font-bold text-3xl text-gray-900">{{ promotion.price || '0' }}</p>
                                    <p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
                                </div>

                                <div class="list-none space-y-1 mt-4">
                                    <div class="bg-gray-50 p-3 rounded-md ">
                                        <div v-for="(line, index) in promotion.detailPromotion.split('\n')" :key="index"
                                            class="flex items-start ">
                                            <span class="mr-2 mt-1">✔</span>
                                            <span class="break-all whitespace-pre-wrap flex-1 md:text-sm text-xs ">
                                                {{ line }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="mt-4 md:text-sm text-xs px-6">
                                        <div class="flex items-start">
                                            <span class="mr-2 mt-1">📅</span>
                                            <span>เริ่ม: {{ promotion.dateStart || '-' }}</span>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="mr-2 mt-1">📅</span>
                                            <span>สิ้นสุด: {{ promotion.dateFinish || '-' }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-center mt-4">
                                    <button @click="buyPromotion(promotion)"
                                        class="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-4 py-1 rounded-lg transition">
                                        ซื้อเลย
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div v-if="showBuyModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div>
                <div class="bg-white rounded-lg p-6 max-w-5xl w-full relative">
                    <button @click="closeBuyModal" class="absolute top-2 right-2 text-gray-500">✕</button>

                    <div class="flex item-center">
                        <div class="md:w-1/2 md:mr-2">
                            <div class="flex flex-wrap justify-center">
                                <div
                                    class="w-full max-w-[300px] rounded-lg shadow-md bg-white border  flex flex-col justify-between min-h-[300px]">
                                    <div
                                        class="py-3 text-gray-400 rounded-lg text-center font-bold text-lg break-all whitespace-pre-wrap">
                                        {{ selectedPromotion?.namePromotion || 'ชื่อโปรโมชั่น' }}
                                    </div>

                                    <div class="px-3 pb-6 pt-4 text-gray-700 flex flex-col flex-1 justify-between">
                                        <div class=" text-center ">
                                            <p class="font-bold text-3xl text-gray-900">{{ selectedPromotion?.price ||
                                                '0'
                                                }}
                                            </p>
                                            <p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
                                        </div>

                                        <div class="list-none space-y-1 mt-4">
                                            <div class="bg-gray-100 p-3 rounded-md ">
                                                <div v-for="(line, index) in selectedPromotion?.detailPromotion.split('\n')"
                                                    :key="index" class="flex items-start ">
                                                    <span class="mr-2 mt-1">✔</span>
                                                    <span
                                                        class="break-all whitespace-pre-wrap flex-1 md:text-sm text-xs ">
                                                        {{ line }}
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="mt-4 md:text-sm text-xs px-6">
                                                <div class="flex items-start">
                                                    <span class="mr-2 mt-1">📅</span>
                                                    <span>เริ่ม: {{ selectedPromotion?.dateStart || '-' }}</span>
                                                </div>
                                                <div class="flex items-start">
                                                    <span class="mr-2 mt-1">📅</span>
                                                    <span>สิ้นสุด: {{ selectedPromotion?.dateFinish || '-' }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md:w-1/2 md:ml-2">
                            <div>
                                <p class="text-center text-xl font-bold mb-3 mt-7 md:mt-0">เลือกวิธีการจ่ายเงิน</p>


                                <div class="mb-4 flex flex-col">
                                    <p>โอนผ่าน TrueMoney</p>
                                    <input type="text" class="w-full border rounded-md py-1 px-3" />
                                    <button class="bg-green-600 px-3 mt-3 py-1 rounded-md text-white">ตกลง</button>
                                </div>

                                <div class="mb-4 flex flex-col">
                                    <p>โอนผ่านธนาคาร(เลือกธนาคารที่ทำการโอน)</p>
                                    <button class="border px-3 py-2 rounded-md mt-3 text-left">ตกลง</button>
                                </div>
                                <div class="mb-4 flex flex-col">
                                    <p>เเสกน QR code</p>
                                    <img />

                                    <button class="bg-green-600 px-3 py-1 rounded-md text-white mt-3">ไปยังหน้า QR
                                        code</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/SidebarExecutive.vue'
import HistoryByePromotion from "@/views/Partner/Executive/Promotion/HistoryByePromotion.vue";

const isSidebarCollapsed = ref(false)
const allPromotions = ref([])
const showHistory = ref(false)
const showBuyModal = ref(false)
const selectedPromotion = ref(null)

const handleSidebarToggle = (isCollapsed) => {
    isSidebarCollapsed.value = isCollapsed
}

const buyPromotion = (promotion) => {
    selectedPromotion.value = promotion
    showBuyModal.value = true
}

const toggleHistory = () => {
    showHistory.value = !showHistory.value
}

const closeBuyModal = () => {
    showBuyModal.value = false
    selectedPromotion.value = null
}

const activePromotions = computed(() => {
    const today = new Date()
    return allPromotions.value.filter((promo) => {
        const finish = new Date(promo.dateFinish)
        return finish >= today
    })
})

onMounted(() => {
    const saved = localStorage.getItem('adminPromotions')
    if (saved) {
        try {
            allPromotions.value = JSON.parse(saved)
        } catch (e) {
            console.error('ไม่สามารถอ่าน promotion จาก localStorage ได้:', e)
        }
    }
})
</script>
