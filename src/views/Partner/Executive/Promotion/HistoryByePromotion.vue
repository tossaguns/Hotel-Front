<template>
    <div class="bg-gray-50 py-5 px-4 sm:px-6 lg:px-8 rounded-xl shadow-md">
        <div>
            <p class="text-3xl font-bold text-amber-600 text-center mb-4">ประวัติการสั่งซื้อ</p>
        </div>


        <div class="max-w-2xl mx-auto">
            <div v-for="(item, idx) in paginatedHistory" :key="idx"
                class="bg-white rounded-lg shadow p-4 border mb-2 flex flex-col gap-y-2">
                <div class="font-bold text-lg text-rose-600">{{ item.name }}</div>

                <div class="flex justify-between">
                    <div class="ml-4">
                        <div class="text-sm text-gray-500 mb-3">
                            <p>สถานะ:
                                <span :class="[
                                    'px-3 py-1 rounded-md text-white font-medium',
                                    item.status === 'ใช้งานอยู่' ? 'bg-green-500' : 'bg-gray-400'
                                ]">
                                    {{ item.status }}
                                </span>
                            </p>
                        </div>
                        <div class="text-xs text-gray-400">
                            <div>วันเริ่มต้น: <span class="font-medium ">{{
                                item.start }}</span></div>
                            <div>วันสิ้นสุด: <span class="font-medium ">{{
                                item.end }}</span></div>
                        </div>
                    </div>


                    <div>
                        <div class="font-bold text-center">
                            <div v-if="displayPrice(item).hasDiscount">
                                <p class="text-sm md:text-xl text-gray-500 line-through">{{
                                    displayPrice(item).originalPrice }}</p>
                                <p class="text-xl md:text-3xl text-rose-600">{{ displayPrice(item).reducedPrice }}</p>
                                <p class="text-xs md:text-sm text-gray-500">บาท / คน / บัญชี</p>
                            </div>

                            <div v-else>
                                <p class="text-xl md:text-3xl text-gray-900">{{ displayPrice(item).originalPrice }}</p>
                                <p class="text-xs md:text-sm text-gray-500">บาท / คน / บัญชี</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="flex justify-end space-x-2">

                    <button
                        class="self-end mt-2 px-3 py-1 rounded bg-amber-400 text-white text-xs hover:bg-gray-300 transition"
                        @click="openReceiptModal(item)">ดูรายละเอียด</button>
                </div>

            </div>
        </div>

        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-6 md:text-base text-xs">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-3 py-1 rounded bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition">
                ก่อนหน้า
            </button>

            <span class="px-3 py-1 text-gray-700">
                หน้า {{ currentPage }} จาก {{ totalPages }}
            </span>

            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-3 py-1 rounded bg-amber-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-600 transition">
                ถัดไป
            </button>
        </div>

        <div ref="historyContainer"></div>
    </div>

    <!-- Receipt Modal -->
    <div v-if="showReceiptModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black bg-opacity-60" @click="closeReceiptModal"></div>
        <div class="relative bg-white rounded-xl m-4 shadow-lg p-8 max-w-lg w-full z-10 flex flex-col items-center">
            <h2 class="text-2xl font-bold mb-4 text-center">ใบเสร็จ</h2>
            <!-- ปุ่ม 3 แบบ -->
            <div class="flex flex-col w-full gap-2 mb-6">
                <button
                    class="bg-amber-500 w-full text-center py-3 rounded-xl text-white font-bold text-xl hover:bg-amber-400 transition">ใบเสร็จกำกับภาษี</button>
                <button
                    class="bg-rose-500 w-full text-center py-3 rounded-xl text-white font-bold text-xl hover:bg-rose-400 transition">ใบเสร็จแบบย่อ</button>
                <button
                    class="bg-blue-500 w-full text-center py-3 rounded-xl text-white font-bold text-xl hover:bg-blue-400 transition">สลิป</button>
            </div>


            <div class="mb-6 w-full">
                <p class="mb-2"><span class="font-semibold">ชื่อแพ็กเกจ:</span> {{ selectedReceipt?.name }}</p>
                <p class="mb-2"><span class="font-semibold">ราคา:</span> {{ displayPrice(selectedReceipt).hasDiscount ?
                    displayPrice(selectedReceipt).reducedPrice : displayPrice(selectedReceipt).originalPrice }} บาท</p>
                <p class="mb-2" v-if="displayPrice(selectedReceipt).hasDiscount">
                    <span class="font-semibold">ส่วนลด:</span>
                    {{ calcDiscount(selectedReceipt) }} บาท
                </p>
                <p class="mb-2"><span class="font-semibold">วันเริ่มต้น:</span> {{ selectedReceipt?.start }}</p>
                <p class="mb-2"><span class="font-semibold">วันสิ้นสุด:</span> {{ selectedReceipt?.end }}</p>
                <p class="mb-2"><span class="font-semibold">สถานะ:</span> {{ selectedReceipt?.status }}</p>
            </div>
            <button @click="closeReceiptModal"
                class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition">ปิด</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const historyList = [
    {
        name: 'Premium',
        start: '2024-06-01',
        end: '2024-12-01',
        price: '200 บาท',
        status: 'ใช้งานอยู่',
        reducedPrice: '180'
    },
    {
        name: 'Premium',
        start: '2024-06-01',
        end: '2024-12-01',
        price: '200 บาท',
        status: 'ใช้งานอยู่',
        reducedPrice: ''
    },
    {
        name: 'Premium',
        start: '2024-06-01',
        end: '2024-12-01',
        price: '200 บาท',
        status: 'หมดเวลาใช้งาน',
        reducedPrice: ''
    },
    {
        name: 'Premium',
        start: '2024-06-01',
        end: '2024-12-01',
        price: '200 บาท',
        status: 'หมดเวลาใช้งาน',
        reducedPrice: '150'
    },
    {
        name: 'Premium',
        start: '2024-06-01',
        end: '2024-12-01',
        price: '200 บาท',
        status: 'ใช้งานอยู่',
        reducedPrice: ''
    },
    {
        name: 'Premium',
        start: '2024-06-01',
        end: '2024-12-01',
        price: '200 บาท',
        status: 'ใช้งานอยู่',
        reducedPrice: '50'
    },
    {
        name: 'Premium',
        start: '2024-06-01',
        end: '2024-12-01',
        price: '200 บาท',
        status: 'ใช้งานอยู่',
        reducedPrice: ''
    },

]

const itemsPerPage = 5
const currentPage = ref(1)
const historyContainer = ref(null)
const showReceiptModal = ref(false)
const selectedReceipt = ref(null)

// คำนวณข้อมูลที่แสดงในหน้าปัจจุบัน
const paginatedHistory = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return historyList.slice(start, end)
})

// คำนวณจำนวนหน้าทั้งหมด
const totalPages = computed(() => {
    return Math.ceil(historyList.length / itemsPerPage)
})

// ฟังก์ชันเปลี่ยนหน้า
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
        // เลื่อนขึ้นบนสุด
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
        // เลื่อนขึ้นบนสุด
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const displayPrice = computed(() => {
    return (promotion) => {
        if (promotion.reducedPrice) {
            return {
                originalPrice: promotion.price || '0',
                reducedPrice: promotion.reducedPrice,
                hasDiscount: true
            }
        } else {
            return {
                originalPrice: promotion.price || '0',
                reducedPrice: null,
                hasDiscount: false
            }
        }
    }
})

const openReceiptModal = (item) => {
    selectedReceipt.value = item
    showReceiptModal.value = true
}
const closeReceiptModal = () => {
    showReceiptModal.value = false
    selectedReceipt.value = null
}

// ฟังก์ชันคำนวณส่วนลด (ส่วนน้ำ)
const calcDiscount = (item) => {
    if (!item || !item.reducedPrice) return 0
    // แปลงราคาต้นทางเป็นตัวเลข (ตัด ' บาท' ออกถ้ามี)
    const original = parseFloat((item.price || '0').replace(/[^\d.]/g, ''))
    const reduced = parseFloat(item.reducedPrice)
    return original - reduced
}
</script>