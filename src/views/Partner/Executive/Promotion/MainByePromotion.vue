<template>
    <div class="w-full min-h-screen bg-gray-100 flex">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 flex flex-row md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed,
                'xl:pr-[300px]': true
            }">
            <div class="">
                <div class="fixed top-0 left-0 right-0 h-4 z-[40] bg-gray-100 pointer-events-none"></div>
                <div
                    class="sticky top-4 z-30 rounded-t-lg bg-amber-400 p-2 text-white text-lg shadow-lg shadow-gray-300 overflow-t-hidden">
                    <h1>Promotion</h1>
                </div>
                <div class="bg-white min-h-screen py-14 px-4 sm:px-6 lg:px-8 ">
                    <!-- <div class="text-3xl font-bold">
                    Promotion
                </div> -->

                    <div class="max-w-7xl mx-auto ">

                        <div class="mb-40 mt-6">
                            <div class="flex justify-center">
                                <button
                                    class="bg-amber-500 rounded-md px-4 py-2 text-white hover:bg-amber-400 transition"
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
                                <div
                                    class="py-3 text-gray-400 text-center font-bold text-lg break-all whitespace-pre-wrap">
                                    {{ promotion.namePromotion || 'ชื่อโปรโมชั่น' }}
                                </div>

                                <div class="px-3 pb-6 pt-4 text-gray-700 flex flex-col flex-1 justify-between">
                                    <div class=" text-center ">
                                        <p class="font-bold text-3xl text-gray-900">{{ promotion.price || '0' }}</p>
                                        <p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
                                    </div>

                                    <div class="list-none space-y-1 mt-4">
                                        <div class="bg-gray-50 p-3 rounded-md ">
                                            <div v-for="(line, index) in promotion.detailPromotion.split('\n')"
                                                :key="index" class="flex items-start ">
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

                        <div class="bg-gray-50 max-w-3xl mx-auto rounded-2xl p-4 mt-8">
                            <div class="flex justify-between item-center">
                                <div class="w-1/2">
                                    <div class="flex flex-wrap justify-center gap-4">
                                        <div v-for="promotion in activePromotions" :key="promotion.promotion_id"
                                            class="w-full max-w-[300px] rounded-lg shadow-md bg-white border transition hover:scale-105 flex flex-col justify-between min-h-[300px]">
                                            <div
                                                class="py-3 text-gray-400 rounded-lg text-center font-bold text-lg break-all whitespace-pre-wrap">
                                                {{ promotion.namePromotion || 'ชื่อโปรโมชั่น' }}
                                            </div>

                                            <div
                                                class="px-3 pb-6 pt-4 text-gray-700 flex flex-col flex-1 justify-between">
                                                <div class=" text-center ">
                                                    <p class="font-bold text-3xl text-gray-900">{{ promotion.price ||
                                                        '0' }}
                                                    </p>
                                                    <p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
                                                </div>

                                                <div class="list-none space-y-1 mt-4">
                                                    <div class="bg-gray-100 p-3 rounded-md ">
                                                        <div v-for="(line, index) in promotion.detailPromotion.split('\n')"
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
                                                            <span>เริ่ม: {{ promotion.dateStart || '-' }}</span>
                                                        </div>
                                                        <div class="flex items-start">
                                                            <span class="mr-2 mt-1">📅</span>
                                                            <span>สิ้นสุด: {{ promotion.dateFinish || '-' }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/2 ">
                                    <div>
                                        <p class="text-center text-xl font-bold mb-3">เลือกวิธีการจ่ายเงิน</p>

                                        <div class="mb-4 flex flex-col">
                                            <p>โอนผ่าน TrueMoney</p>
                                            <input type="text" class="w-full border rounded-sm py-1 px-3" />
                                            <button class="bg-green-600 px-3 mt-3 rounded-md text-white">ตกลง</button>
                                        </div>

                                        <div class="mb-4 flex flex-col">
                                            <p>โอนผ่านธนาคาร</p>
                                            <p>ชื่อ:.........</p>
                                            <p>เลขบัญชีธนาคาร:.........</p>
                                            <div>
                                                <p class="bg-white">ยอดชำระ</p>
                                            </div>
                                            <button class="bg-green-600 px-3 rounded-md text-white mt-3">ตกลง</button>
                                        </div>
                                        <div class="mb-4 flex flex-col">
                                            <p>เเสกน QR code</p>
                                            <img />

                                            <button class="bg-green-600 px-3 rounded-md text-white mt-3">ไปยังหน้า QR
                                                code</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fixed bottom-0 left-0 right-0 h-4 z-[40] bg-gray-100 pointer-events-none"></div>
            </div>
        </div>
        <div class="hidden xl:block w-[300px] pr-4">
            <BarServePromotion />
        </div>
        <div class="xl:hidden fixed bottom-4 right-4 z-50">
            <button @click="toggleMobilePromo = true"
                class="bg-amber-500 hover:bg-amber-400 text-white rounded-full px-4 py-2 shadow-lg">
                โปรโมชั่นที่กำลังใช้งาน
            </button>
        </div>

        <!-- Popup mobile -->
        <div v-if="toggleMobilePromo"
            class="fixed inset-0 z-50 flex justify-end items-end bg-black bg-opacity-50 xl:hidden"
            @click.self="toggleMobilePromo = false">
            <div class="bg-white min-w-[40%] max-h-full rounded-t-2xl p-4 overflow-y-auto">
                <BarServePromotion @close="toggleMobilePromo = false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/SidebarExecutive.vue'
import HistoryByePromotion from "@/views/Partner/Executive/Promotion/HistoryByePromotion.vue";
import BarServePromotion from '@/views/Partner/Executive/Promotion/BarServePromotion.vue'

const isSidebarCollapsed = ref(false)
const allPromotions = ref([])
const showHistory = ref(false)
const toggleMobilePromo = ref(false)

const handleSidebarToggle = (isCollapsed) => {
    isSidebarCollapsed.value = isCollapsed
}

const buyPromotion = (promotion) => {
    console.log('ซื้อโปรโมชั่น:', promotion)
}

const toggleHistory = () => {
    showHistory.value = !showHistory.value
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
