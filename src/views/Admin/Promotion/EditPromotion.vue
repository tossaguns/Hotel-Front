<template>
  <div>
    <div class="text-center mb-10 md:mt-20 mt-6">
      <p class="md:text-3xl text-2xl font-bold text-gray-800">
        เลือกใช้ <span class="text-amber-500">บริการที่เหมาะกับคุณ</span>
      </p>
      <p class="text-gray-500 md:text-sm text-xs">
        เลือกโปรโมชั่นที่ตรงใจคุณ และเริ่มใช้งานได้ทันที
      </p>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center justify-center">
      <div
        class="w-full max-w-[285px] rounded-lg bg-white shadow-md border transition hover:scale-105 flex flex-col justify-between min-h-[300px]"
        v-for="promotion in allPromotions" :key="promotion._id">
        <div class="py-3 text-gray-400 text-center font-bold text-lg break-all whitespace-pre-wrap">
          {{ promotion.name || 'ชื่อโปรโมชั่น' }}
        </div>

        <div class="px-3 pb-6 pt-4 text-gray-700 flex flex-col flex-1 justify-between">
          <div class=" text-center ">
            <div class="text-center">
              <template v-if="promotion.wantToReduce === 'yesReduced' && (
                (promotion.discountType === 'reduced' && promotion.price && promotion.reducedPrice) ||
                (promotion.discountType === 'percent' && promotion.price && promotion.percentPrice)
              )">
                <span class="text-gray-400 line-through mr-2">
                  {{ promotion.price }}
                </span>
                <br/>
                <span class="text-3xl font-bold text-red-600 align-middle">
                  <!-- ลดราคาบาท -->
                  <template v-if="promotion.discountType === 'reduced'">
                    {{ Number(promotion.price) - Number(promotion.reducedPrice) }}
                  </template>
                  <!-- ลดราคาคิดเป็น % -->
                  <template v-else-if="promotion.discountType === 'percent'">
                    {{ (Number(promotion.price) - (Number(promotion.price) * Number(promotion.percentPrice) /
                    100)).toFixed(2) }}
                  </template>
                </span>
              </template>
              <template v-else>
                <span class="font-bold text-3xl text-gray-900">
                  {{ promotion.price || '0' }}
                </span>
              </template>
              <p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
            </div>

            <div class="list-none space-y-1 mt-4">
              <div class="bg-gray-50 p-3 rounded-md ">
                <div v-for="(line, index) in (promotion.detail ? promotion.detail.split('\n') : [])" :key="index"
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
              <button @click="openPaymentPopup(promotion._id)"
                class="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-4 py-1 rounded-lg transition">
                ซื้อเลย
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const allPromotions = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:9999/SleepGun/promotion/getAll')
    const data = await res.json()
    allPromotions.value = data
  } catch (e) {
    console.error('โหลดโปรโมชั่นไม่สำเร็จ:', e)
  }
})

// ตัวอย่างฟังก์ชันปุ่ม
function openPaymentPopup(promotionId) {
  alert('คุณเลือกโปรโมชัน id: ' + promotionId)
}
</script>
