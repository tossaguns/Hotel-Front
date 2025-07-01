<template>
  <div class="bg-white">
    <div class="border max-w-5xl mx-auto px-6 mt-5">
      <div class="relative">
        <img src="/your-image.jpg" alt="แบนเนอร์" class="w-full h-72 object-cover rounded-xl bg-gray-200" />
      </div>

      <!-- เมนูแนวนอน เลื่อนด้วย mouse drag ได้ และ touch ในมือถือ -->
      <div ref="menuBar"
        class="flex mt-5 font-bold text-lg overflow-x-auto whitespace-nowrap gap-2 scrollbar-hide min-w-0 cursor-grab active:cursor-grabbing select-none relative"
        @mousedown="startDrag" @mousemove="onDrag" @mouseup="stopDrag" @mouseleave="stopDrag" @touchstart="startDrag"
        @touchmove="onDrag" @touchend="stopDrag">
        <div v-for="(menu, idx) in menus" :key="idx" class="relative inline-block min-w-max">
          <button class="bg-gray-200 rounded-full px-4 py-1 inline-block min-w-max hover:bg-gray-300 transition-colors"
            @click.stop="toggleDropdown(idx)">
            {{ menu.label }}
          </button>
          <!-- Dropdown -->
          <div v-if="openDropdown === idx"
            class="absolute left-1/2 -translate-x-1/2 mt-2 z-[9999] bg-white border rounded shadow-lg min-w-[150px] border-gray-300"
            @click.stop>
            <button v-for="(item, itemIdx) in menu.items" :key="itemIdx"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-normal transition-colors first:rounded-t last:rounded-b"
              @click="selectDropdown(idx, item)">
              {{ item }}
            </button>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <Conteact />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Main from "@/views/tt/all/main.vue";
import About from "@/views/tt/all/about.vue";
import BSO from "@/views/tt/all/businessopportunity.vue";
import BS from "@/views/tt/all/businessperson.vue";
import Product from "@/views/tt/all/product.vue";
import News from "@/views/tt/all/news.vue";
import Conteact from "@/views/tt/all/contact.vue";

const menuBar = ref(null)
let isDown = false
let startX
let scrollLeft

function startDrag(e) {
  isDown = true
  if (menuBar.value) {
    menuBar.value.classList.add('active')
    // รองรับทั้ง mouse และ touch events
    const clientX = e.touches ? e.touches[0].clientX : e.pageX
    startX = clientX - menuBar.value.offsetLeft
    scrollLeft = menuBar.value.scrollLeft
  }
}

function onDrag(e) {
  if (!isDown || !menuBar.value) return
  e.preventDefault()
  // รองรับทั้ง mouse และ touch events
  const clientX = e.touches ? e.touches[0].clientX : e.pageX
  const x = clientX - menuBar.value.offsetLeft
  const walk = (x - startX) * 1 // scroll speed
  menuBar.value.scrollLeft = scrollLeft - walk
}

function stopDrag() {
  if (isDown && menuBar.value) {
    isDown = false
    menuBar.value.classList.remove('active')
  }
}

// เมนูหลักพร้อม dropdown items แต่ละเมนู
const menus = [
  {
    label: 'หน้าหลัก',//Main
    items: ['ข้อมูลทั่วไป', 'ข่าวประชาสัมพันธ์', 'แนะนำระบบ']
  },
  {
    label: 'เกี่ยวกับเรา',//About
    items: ['โครงสร้าง', 'วันที่', 'ตรวจสอบ']
  },
  {
    label: 'โอกาสทางธุรกิจ',//BSO
    items: ['แผนธุรกิจ', 'การลงทุน', 'พันธมิตร']
  },
  {
    label: 'นักธุรกิจ/ผู้นำตำบลในฝัน',//BS
    items: ['สมัครสมาชิก', 'เกณฑ์คุณสมบัติ', 'ผลประโยชน์']
  },
  {
    label: 'สินค้า',//Product
    items: ['หมวดหมู่สินค้า', 'ราคาสินค้า', 'การสั่งซื้อ']
  },
  {
    label: 'ข่าวสารและกิจกรรม',//News
    items: ['ข่าวประชาสัมพันธ์', 'กิจกรรมที่จัด', 'ปฏิทินกิจกรรม']
  }
]

const openDropdown = ref(null)

function toggleDropdown(idx) {
  openDropdown.value = openDropdown.value === idx ? null : idx
}

function selectDropdown(menuIdx, item) {
  alert(`เลือกเมนู ${menus[menuIdx].label} > ${item}`)
  openDropdown.value = null
}

// ฟังก์ชันสำหรับปิด dropdown เมื่อคลิกข้างนอก
function handleClickOutside(e) {
  if (menuBar.value && !menuBar.value.contains(e.target)) {
    openDropdown.value = null
  }
}

// เพิ่มและลบ event listener เมื่อ component mount/unmount
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>