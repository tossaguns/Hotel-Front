<template>
  <div>
    <!-- Desktop Bar -->
    <div class="hidden xl:flex fixed max-h-screen top-3 bottom-4 right-4 w-[380px] bg-white rounded-xl p-4 z-40 shadow-lg flex-col space-y-4 overflow-y-auto">
      <h2 class="font-semibold text-lg mb-2">บริการที่กำลังใช้งาน</h2>

      <div v-for="(promo, index) in promotions" :key="index" class="bg-gray-200 p-4 rounded-lg shadow space-y-2">
        <p class="text-lg text-red-700 font-bold">{{ promo.title }}</p>
        <div class="text-center space-y-2 mb-4">
          <p class="line-through text-sm text-gray-400">{{ promo.originalPrice }} บาท</p>
          <p class="text-lg font-bold text-black">{{ promo.discountPrice }} บาท / คน / บัญชี</p>
          <p class="text-xs text-gray-500">ถึง {{ promo.date }}</p>
        </div>
        <div class="flex justify-center text-xs">
          <button class="bg-amber-500 px-2 py-1 rounded" @click="openReceiptModal(promo)">ดูรายละเอียด</button>
          <!-- <button class="bg-red-500 px-2 py-1 rounded">ยกเลิกบริการ</button> -->
        </div>
      </div>
    </div>

    <!-- Mobile popup -->
    <div class="xl:hidden">
      <h2 class="font-semibold text-lg mb-4 text-center">บริการที่กำลังใช้งาน</h2>
      <div v-for="(promo, index) in promotions" :key="index" class="bg-gray-100 p-4 rounded-lg shadow mb-4">
        <p class="font-bold text-lg text-red-700">{{ promo.title }}</p>
        <div class="text-center space-y-2 mb-4">
          <p class="line-through text-sm text-gray-400">{{ promo.originalPrice }} บาท</p>
          <p class="text-lg font-bold text-black">{{ promo.discountPrice }} บาท / คน / บัญชี</p>
          <p class="text-xs text-gray-500">ถึง {{ promo.date }}</p>
        </div>
        <div class="flex justify-center text-xs sm:text-sm mt-2 space-x-2">
          <button class="bg-amber-500 px-2 py-1 rounded" @click="openReceiptModal(promo)">ดูรายละเอียด</button>
          <!-- <button class="bg-red-500 px-2 py-1 rounded">ยกเลิกบริการ</button> -->
        </div>
      </div>
    </div>

    <!-- Receipt Modal -->
    <div v-if="showReceiptModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black bg-opacity-60" @click="closeReceiptModal"></div>
      <div class="relative bg-white rounded-xl m-4 shadow-lg p-8 max-w-lg w-full z-10 flex flex-col items-center">
        <h2 class="text-2xl font-bold mb-4 text-center">ใบเสร็จ</h2>

        <div class="flex flex-col w-full gap-2 mb-6">
          <button class="bg-amber-500 w-full text-center py-3 rounded-xl text-white font-bold text-xl hover:bg-amber-400 transition">ใบเสร็จกำกับภาษี</button>
          <button class="bg-rose-500 w-full text-center py-3 rounded-xl text-white font-bold text-xl hover:bg-rose-400 transition">ใบเสร็จแบบย่อ</button>
          <button class="bg-blue-500 w-full text-center py-3 rounded-xl text-white font-bold text-xl hover:bg-blue-400 transition">สลิป</button>
        </div>

        <div class="mb-6 w-full text-left text-sm">
          <p class="mb-2"><span class="font-semibold">ชื่อแพ็กเกจ:</span> {{ selectedReceipt?.name }}</p>
          <p class="mb-2"><span class="font-semibold">ราคา:</span>
            {{ displayPrice(selectedReceipt).hasDiscount ? displayPrice(selectedReceipt).reducedPrice : displayPrice(selectedReceipt).originalPrice }} บาท
          </p>
          <p class="mb-2" v-if="displayPrice(selectedReceipt).hasDiscount">
            <span class="font-semibold">ส่วนลด:</span> {{ calcDiscount(selectedReceipt) }} บาท
          </p>
          <p class="mb-2"><span class="font-semibold">วันเริ่มต้น:</span> {{ selectedReceipt?.start }}</p>
          <p class="mb-2"><span class="font-semibold">วันสิ้นสุด:</span> {{ selectedReceipt?.end }}</p>
          <p class="mb-2"><span class="font-semibold">สถานะ:</span> {{ selectedReceipt?.status }}</p>
        </div>

        <button @click="closeReceiptModal" class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition">ปิด</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const showReceiptModal = ref(false)
const selectedReceipt = ref(null)

const openReceiptModal = (promo) => {
  selectedReceipt.value = promo
  showReceiptModal.value = true
}
const closeReceiptModal = () => {
  selectedReceipt.value = null
  showReceiptModal.value = false
}

// คำนวณราคา
const displayPrice = (promo) => {
  const original = parseFloat(promo.originalPrice)
  const reduced = parseFloat(promo.discountPrice)
  const hasDiscount = reduced < original
  return {
    hasDiscount,
    originalPrice: original,
    reducedPrice: reduced
  }
}
const calcDiscount = (promo) => {
  const price = displayPrice(promo)
  return price.originalPrice - price.reducedPrice
}
const promotions = ref([
  {
    title: 'รักนี้หัวใจมีคืน',
    originalPrice: '200',
    discountPrice: '180',
    date: '11/11/2565',
    name: 'แพ็กเกจหัวใจ',
    start: '10/11/2565',
    end: '20/11/2565',
    status: 'ใช้งานอยู่'
  },
  {
    title: 'โปรลับสุดคุ้ม',
    originalPrice: '150',
    discountPrice: '120',
    date: '31/12/2565',
    name: 'แพ็กเกจลับ',
    start: '20/12/2565',
    end: '30/12/2565',
    status: 'หมดอายุ'
  },
  {
    title: 'โปรลับสุดคุ้ม',
    originalPrice: '150',
    discountPrice: '120',
    date: '31/12/2565',
    name: 'แพ็กเกจลับ',
    start: '20/12/2565',
    end: '30/12/2565',
    status: 'หมดอายุ'
  },
  {
    title: 'โปรลับสุดคุ้ม',
    originalPrice: '150',
    discountPrice: '120',
    date: '31/12/2565',
    name: 'แพ็กเกจลับ',
    start: '20/12/2565',
    end: '30/12/2565',
    status: 'หมดอายุ'
  },
  {
    title: 'โปรลับสุดคุ้ม',
    originalPrice: '150',
    discountPrice: '120',
    date: '31/12/2565',
    name: 'แพ็กเกจลับ',
    start: '20/12/2565',
    end: '30/12/2565',
    status: 'หมดอายุ'
  },
  {
    title: 'โปรลับสุดคุ้ม',
    originalPrice: '150',
    discountPrice: '120',
    date: '31/12/2565',
    name: 'แพ็กเกจลับ',
    start: '20/12/2565',
    end: '30/12/2565',
    status: 'หมดอายุ'
  },
])
</script>