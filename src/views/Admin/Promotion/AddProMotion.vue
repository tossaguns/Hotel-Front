<template>
  <div class="w-full min-h-screen bg-gray-100">
    <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

    <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
      style="top: 1rem; bottom: 1rem; height: auto;" :class="{
        'md:ml-[232px]': !isSidebarCollapsed,
        'md:ml-[72px]': isSidebarCollapsed
      }">

      <div class="bg-white rounded-lg pb-10 min-h-screen">
        <div class="w-full">
          <div class="py-2 bg-emerald-800 rounded-t-lg">
            <p class="text-center md:text-left text-xl text-white px-2">เพิ่มโปรโมชั่น</p>
          </div>

          <div class="md:rounded-b-lg px-4 pt-4 max-w-7xl mx-auto">
            <p class="text-2xl font-bold text-center py-4">
              เพิ่มโปรโมชั่น
            </p>

            <div class="flex flex-col xl:flex-row justify-center lg:space-x-5 item-center">

              <div class="w-full lg:w-4/6">
                <div>
                  <p class="mb-2">ชื่อโปรโมชั่น</p>
                  <input class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4"
                    v-model="promotion.name" />
                </div>
                <div>
                  <p class="mb-2">รายละเอียด</p>
                  <textarea rows="5" v-model="promotion.detail"
                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                    placeholder="พิมพ์ทีละบรรทัด เช่น&#10;พื้นที่อีเมล 50GB&#10;พื้นที่ Cloud 1TB..."></textarea>
                </div>

                <div>
                  <p class="mb-2">วันเริ่มโปรโมชั่น</p>
                  <input type="date" v-model="promotion.dateStart"
                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                </div>
                <div>
                  <div>
                    <p>มีวันสิ้นสุดโปรโมชั่นหรือไม่ ?</p>
                    <div class="flex items-center gap-4 mb-4">
                      <label class="flex items-center">
                        <input type="radio" value="yes" v-model="hasEndDate" class="mr-2" />
                        มี
                      </label>
                      <label class="flex items-center">
                        <input type="radio" value="no" v-model="hasEndDate" class="mr-2" />
                        ไม่มี
                      </label>
                    </div>
                  </div>

                  <!-- แสดง input วันสิ้นสุดเฉพาะเมื่อเลือก "มี" -->
                  <div v-if="hasEndDate === 'yes'">
                    <p class="mb-2">วันสิ้นสุดโปรโมชั่น</p>
                    <input type="date" v-model="promotion.dateFinish"
                      class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                  </div>
                </div>

                <div>
                  <p class="mb-2">ราคาเต็ม</p>
                  <input v-model="promotion.price"
                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                </div>

                <div>
                  <p>ต้องการลดราคาหรือไม่ ?</p>
                  <div class="flex items-center gap-4 mb-4">
                    <label class="flex items-center">
                      <input type="radio" value="yesReduced" v-model="promotion.wantToReduce" class="mr-2" />
                      ใช่
                    </label>
                    <label class="flex items-center">
                      <input type="radio" value="noReduced" v-model="promotion.wantToReduce" class="mr-2" />
                      ไม่
                    </label>
                  </div>
                </div>

                <div v-if="promotion.wantToReduce === 'yesReduced'">
                  <div>
                    <p>การลดราคา</p>
                    <div class="flex items-center gap-4 mb-4">
                      <label class="flex items-center">
                        <input type="radio" value="reduced" v-model="promotion.discountType" class="mr-2" />
                        ลดราคาบาท
                      </label>
                      <label class="flex items-center">
                        <input type="radio" value="percent" v-model="promotion.discountType" class="mr-2" />
                        ลดราคาคิดเป็น %
                      </label>
                    </div>

                    <div v-if="promotion.discountType === 'reduced'">
                      <p class="mb-2">ลดราคา</p>
                      <input v-model="promotion.reducedPrice"
                        class="border border- gray-300 px-3 py-2 rounded w-full resize-none mb-4" />

                    </div>

                    <div v-if="promotion.discountType === 'percent'">
                      <p class="mb-2">คิดเป็น %</p>
                      <input v-model="promotion.percentPrice"
                        class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                    </div>
                  </div>
                </div>
              </div>


              <div class="lg:w-3/6">
                <div class="md:max-w-md mx-auto mt-6 rounded-lg shadow-lg border-2">
                  <!-- หัวโปรโมชั่น -->
                  <div class="py-4 text-center font-bold text-lg break-all whitespace-pre-wrap text-gray-400">
                    {{ promotion.name || 'ชื่อโปรโมชั่น' }}
                  </div>

                  <!-- เนื้อหาข้างใน -->
                  <div>
                    <div class="bg-white px-6 pb-6 space-y-2 text-gray-700">
                      <!-- ถ้ามีลดราคา -->
                      <div v-if="promotion.wantToReduce === 'yesReduced' && (
                        (promotion.discountType === 'reduced' && promotion.price && promotion.reducedPrice) ||
                        (promotion.discountType === 'percent' && promotion.price && promotion.percentPrice)
                      )" class="text-center mt-2">
                        <div class="flex flex-col justify-center items-center">
                          <span class="text-xl text-gray-400 line-through mr-2">
                            {{ promotion.price }}
                          </span>
                          <span class="text-6xl font-bold text-red-600 align-middle">
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
                        </div>
                        <div>
                          <span class="text-sm font-thin text-gray-400">บาท / คน / บัญชี</span>
                        </div>
                      </div>
                      <!-- ถ้าไม่มีลดราคา -->
                      <div v-else class="text-6xl font-bold text-center text-gray-900">
                        {{ promotion.price || '0' }} <br>
                        <span class="text-sm font-thin text-gray-400">บาท / คน / บัญชี</span>
                      </div>
                      <ul class="list-none mt-4">
                        <li v-for="(line, index) in promotion.detail.split('\n')" :key="index" class="flex items-start">
                          <span class="mr-2">✔</span>
                          <span class="break-all whitespace-pre-wrap w-0 flex-1 text-gray-700">{{ line }}</span>
                        </li>
                        <li class="flex items-center mt-5">
                          <span class="mr-2 mt-1">📅</span>
                          <span class="text-sm">เริ่ม: {{ promotion.dateStart || '-' }}</span>
                        </li>
                        <li v-if="hasEndDate === 'yes'" class="flex items-center">
                          <span class="mr-2 mt-1">📅</span>
                          <span class="text-sm">สิ้นสุด: {{ promotion.dateFinish || '-' }}</span>
                        </li>
                        <!-- วันที่ลดราคา -->

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-6 flex justify-center space-x-3">
              <button @click="navigateBackToMainPromotion"
                class="bg-red-500 py-2 px-3 text-white rounded-lg hover:bg-red-600">ย้อนกลับ</button>
              <button class="bg-gray-400 py-2 px-3 text-white rounded-lg hover:bg-gray-600">รีเซ็ท</button>
              <button @click="createPromotion"
                class="bg-green-500 py-2 px-3 text-white rounded-lg hover:bg-green-600">บันทึก</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SidebarAdmin from '@/components/SidebarAdmin.vue'

const isSidebarCollapsed = ref(false)
const hasEndDate = ref(null)
const router = useRouter()

const promotion = ref({
  name: '',
  detail: '',
  dateStart: '',
  dateFinish: '',
  price: '',
  wantToReduce: '',
  reducedPrice: '',
  dateReducedPercentPriceStart: '',
  dateReducedPercentPriceFinish: '',
  percentPrice: '',
  discountType: '',
})

function handleSidebarToggle(isCollapsed) {
  isSidebarCollapsed.value = isCollapsed
}

function navigateBackToMainPromotion() {
  router.push('/mainpromotion')
}

// ฟังก์ชันสำหรับบันทึกโปรโมชั่น
async function createPromotion() {
  try {
    // ดึงชื่อผู้ใช้จาก localStorage
    const username = localStorage.getItem('username') || '';
    // เตรียมข้อมูลที่จะส่ง
    const payload = {
      ...promotion.value,
      nameUpdate: username, // เพิ่มผู้ที่ทำการอัปเดต
      percentPrice: promotion.value.percentPrice // ได้จาก input "คิดเป็น %"
    };
    const res = await fetch('http://localhost:9999/SleepGun/promotion/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('เกิดข้อผิดพลาดในการบันทึก')
    router.push('/mainpromotion')
  } catch (err) {
    alert(err.message)
  }
}

onMounted(() => {
  const savedState = localStorage.getItem('sidebarCollapsed')
  if (savedState !== null) {
    isSidebarCollapsed.value = JSON.parse(savedState)
  }
})
</script>
