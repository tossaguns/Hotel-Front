<template>
    <div class="w-full min-h-screen bg-gray-100">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">
            <div>
                <div class="mt-2 rounded-t-lg bg-amber-400 p-2 text-white text-lg">
                    <h1>จัดการการจองกับ Sleep Gun</h1>
                </div>

                <div class="w-full bg-gradient-to-br from-[#f8fafc] via-white to-[#e2e8f0] py-16 px-4">
  <div class="max-w-5xl mx-auto bg-white/80 backdrop-blur-md p-12 rounded-[2rem] shadow-2xl ring-1 ring-gray-200">
    <h2 class="text-center text-4xl font-light text-gray-800 tracking-wide mb-14">
      ข้อมูลการจองกับ SleepGun
    </h2>

    <form class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- กลุ่มข้อมูลทั่วไป -->
      <div>
        <label class="block text-sm text-gray-500 mb-2">ลำดับ</label>
        <input type="number" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-2">เลขที่ห้อง</label>
        <input type="text" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
      </div>

      <div>
        <label class="block text-sm text-gray-500 mb-2">สถานะ</label>
        <select class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition">
          <option>จองผ่าน Tossagun</option>
          <option>ยกเลิก</option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-2">ราคา</label>
        <input type="text" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
      </div>

      <div>
        <label class="block text-sm text-gray-500 mb-2">การจ่ายเงิน</label>
        <select class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition">
          <option>เงินสด</option>
          <option>บัตรเครดิต</option>
          <option>โอนเงิน</option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-2">ชื่อ</label>
        <input type="text" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
      </div>

      <!-- แบ่งโซนด้วยเส้นบาง -->
      <div class="md:col-span-2 border-t pt-6 border-gray-200" />

      <!-- วันที่และเวลา -->
      <div>
        <label class="block text-sm text-gray-500 mb-2">วันที่จอง</label>
        <input type="date" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-2">เวลาที่จอง</label>
        <input type="time" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
      </div>

      <div>
        <label class="block text-sm text-gray-500 mb-2">วันที่เข้าพัก</label>
        <input type="date" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-2">เวลาที่เข้าพัก</label>
        <input type="time" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
      </div>

      <div>
        <label class="block text-sm text-gray-500 mb-2">วันที่ออก</label>
        <input type="date" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-2">เวลาที่ออก</label>
        <input type="time" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
      </div>

      <!-- หมายเหตุ -->
      <div class="md:col-span-2">
        <label class="block text-sm text-gray-500 mb-2">หมายเหตุ</label>
        <textarea rows="4" class="w-full bg-white/60 backdrop-blur-md shadow-inner border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"></textarea>
      </div>
    </form>

    <div class="mt-12 flex flex-col sm:flex-row justify-center gap-4">
      <button class="bg-black text-white px-8 py-3 rounded-xl font-light tracking-wide hover:bg-gray-900 transition">
        บันทึก
      </button>
      <button class="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-light tracking-wide hover:bg-gray-100 transition">
        รีเซ็ท
      </button>
      <button @click="navigateBackToMainBookingTossagun"
        class="bg-red-500 text-white px-8 py-3 rounded-xl font-light tracking-wide hover:bg-red-400 transition">
        ย้อนกลับ
      </button>
    </div>
  </div>
</div>

            </div>
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