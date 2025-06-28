<template>
  <div class="w-full min-h-screen bg-gray-100">
    <Sidebar @toggle-sidebar="handleSidebarToggle" />

    <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
      style="top: 1rem; bottom: 1rem; height: auto;" :class="{
        'md:ml-[232px]': !isSidebarCollapsed,
        'md:ml-[72px]': isSidebarCollapsed
      }">
      <div class="fixed top-0 left-0 right-0 h-4 z-[100] bg-white pointer-events-none"></div>
      <div class="sticky top-4 z-30 rounded-t-lg bg-amber-400 p-2 text-white text-lg">
        <h1>จัดการการจองกับ SleepGun</h1>
      </div>

      <div class="w-full bg-gradient-to-br from-[#f9fafb] via-white to-[#f1f5f9] py-4 px-4">
        <div class="max-w-5xl mx-auto bg-gray-200 px-10 py-3 rounded-3xl shadow-2xl ring-1 ring-gray-100">
          <h2 class="text-3xl font-semibold text-center text-gray-800 mb-5 tracking-wide">
            ข้อมูลการจองกับ SleepGun
          </h2>

          <form class="block space-y-4">

            <!-- ลำดับ -->
            <div class="text-center w-[30px]">
              <label class="block text-sm font-medium text-gray-700 mb-1">ลำดับ</label>
              <small class="text-gray-500">1</small>
            </div>

            <!-- เลขที่ห้อง -->
            <div class="w-1/3">
              <label class="block text-sm font-medium text-gray-700 mb-1">เลขที่ห้อง</label>
              <input type="text" class="w-full rounded-md border border-gray-300 px-4 py-2 bg-white" />
            </div>

            <!-- บุคคล -->
            <div class="flex flex-col sm:flex-row gap-2 w-2/3">
              <!-- ชื่อ -->
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
                <input type="text" class="w-full rounded-md border border-gray-300 px-4 py-2 bg-white" />
              </div>

              <!-- นามสกุล -->
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
                <input type="text" class="w-full rounded-md border border-gray-300 px-4 py-2 bg-white" />
              </div>
            </div>

            <!-- สถานะ -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">สถานะ</label>
              <div class="flex items-center space-x-6">
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio text-amber-500" name="status" value="Tossagun" checked />
                  <span class="ml-2">Tossagun</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio text-amber-500" name="status" value="Walk-in" />
                  <span class="ml-2">Walk-in</span>
                </label>
              </div>
            </div>

            <!-- สถานะการเงิน -->
            <div class="flex flex-col lg:flex-row gap-2 w-full">
              <!-- ราคา -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">ราคา</label>
                <input type="text" class="w-full rounded-md border border-gray-300 px-4 py-2 bg-white" />
              </div>

              <!-- วิธีการชำระเงิน -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">วิธีการชำระเงิน</label>
                <input type="text" class="w-full rounded-md border border-gray-300 px-4 py-2 bg-white" />
              </div>
            </div>

            <!-- วันที่จอง -->
            <div class="flex flex-col sm:flex-row gap-4 w-2/3">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-600 mb-1">วันที่จอง</label>
                <div class="flex flex-col sm:flex-row gap-2">
                  <input type="date" class="rounded-md border border-gray-300 px-4 py-2 bg-white w-full" />
                  <input type="time" class="rounded-md border border-gray-300 px-4 py-2 bg-white w-full" />
                </div>
              </div>
            </div>

            <!-- วันเวลาพัก -->
            <div class="w-full flex flex-col xl:flex-row gap-2">
              <!-- วันที่และเวลาเข้าพัก -->
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-600 mb-1">วันที่เข้าพัก</label>
                <div class="flex flex-col sm:flex-row gap-2">
                  <input type="date" class="rounded-md border border-gray-300 px-4 py-2 bg-white w-full" />
                  <input type="time" class="rounded-md border border-gray-300 px-4 py-2 bg-white w-full" />
                </div>
              </div>

              <!-- วันที่และเวลาออก -->
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-600 mb-1">วันที่ออก</label>
                <div class="flex flex-col sm:flex-row gap-2">
                  <input type="date" class="rounded-md border border-gray-300 px-4 py-2 bg-white w-full" />
                  <input type="time" class="rounded-md border border-gray-300 px-4 py-2 bg-white w-full" />
                </div>
              </div>
            </div>

            <!-- หมายเหตุ -->
            <div class="md:col-span-3 w-full">
              <label class="block text-sm font-medium text-gray-600 mb-1">หมายเหตุ</label>
              <textarea rows="4" class="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white"></textarea>
            </div>
          </form>

          <!-- ปุ่ม -->
          <div class="flex flex-col sm:flex-row justify-center mt-5 gap-4">
            <button
              class="bg-emerald-700 text-white px-4 lg:px-6 py-2 rounded-xl font-medium shadow hover:bg-emerald-500 transition">
              ยืนยัน
            </button>
            <button
              class="bg-gray-600 text-white px-4 lg:px-6 py-2 rounded-xl font-medium shadow hover:bg-gray-400 transition">
              รีเซ็ท
            </button>
            <button
              class="bg-red-700 text-white px-4 lg:px-6 py-2 rounded-xl font-medium shadow hover:bg-red-500 transition"
              @click="navigateBackToMainBookingTossagun">
              ย้อนกลับ
            </button>
          </div>
        </div>
      </div>
      <div class="fixed bottom-0 left-0 right-0 h-4 z-[40] bg-gray-100 pointer-events-none"></div>

    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
  name: "MainHotelRoom",
  components: {
    Sidebar
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
    navigateBackToMainBookingTossagun() {
      this.$router.push("/mainbookingtossagun");
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