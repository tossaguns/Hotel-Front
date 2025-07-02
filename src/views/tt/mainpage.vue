<template>
  <div class="bg-white">
    <div class="border max-w-5xl mx-auto md:px-6 mt-5 md:text-lg text-sm">
      <!-- แบนเนอร์ -->
      <div class="relative">
        <img src="/your-image.jpg" alt="แบนเนอร์" class="w-full md:h-72 h-48 object-cover md:rounded-xl bg-gray-200" />
      </div>

      <!-- เมนูแนวนอน -->
      <div ref="stickyContainer" class="sticky top-0 z-50 bg-white/70 backdrop-blur-md" style="position: relative">
        <div ref="menuBar"
          class="flex py-2 font-bold overflow-x-auto whitespace-nowrap gap-2 scrollbar-hide min-w-0 cursor-grab active:cursor-grabbing select-none relative px-2"
          @mousedown="startDrag" @mousemove="onDrag" @mouseup="stopDrag" @mouseleave="stopDrag" @touchstart="startDrag"
          @touchmove="onDrag" @touchend="stopDrag">
          
          <div v-for="(menu, idx) in menus" :key="idx" class="relative inline-block min-w-max"
            @mouseenter="onMouseEnter(idx)" @mouseleave="onMouseLeave(idx)">
            <button :ref="(el) => (menuButtonRefs[idx] = el)" :class="[
              'rounded-full px-4 py-1 inline-block min-w-max shadow-md text-white text-sm transition-colors',
              idx === activeIndex.value
                ? 'bg-green-900'
                : 'bg-gradient-to-r from-green-700 to-green-500 hover:from-green-900 hover:to-green-900',
            ]" @click="onMenuClick(idx, menu)" type="button" aria-haspopup="true"
              :aria-expanded="dropdownOpen[idx] ? 'true' : 'false'">
              {{ menu.label }}
            </button>

            <teleport to="body">
              <transition name="fade-scale">
                <div v-if="dropdownOpen[idx]"
                  class="w-48 rounded-md shadow-lg z-50 border border-gray-200 bg-white/70 backdrop-blur-md"
                  :style="dropdownPositions[idx]">
                  <ul>
                    <li v-for="(item, i) in menu.dropdown || []" :key="i"
                      class="px-4 py-2 hover:bg-green-100 cursor-pointer text-gray-800"
                      @click="onDropdownItemClick(idx, i)">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </transition>
            </teleport>
          </div>
        </div>
      </div>

      <!-- เนื้อหาแต่ละ Section -->
      <div class="mt-5 relative z-0">
        <div ref="mainRef">
          <Main />
        </div>
        <div ref="aboutRef">
          <About />
        </div>
        <div ref="bsoRef">
          <BSO />
        </div>
        <div ref="bsRef">
          <BS />
        </div>
        <div ref="productRef">
          <Product />
        </div>
        <div ref="newsRef">
          <News />
        </div>
        <div ref="contactRef">
          <Contact />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, onBeforeUnmount } from "vue";
import Main from "@/views/tt/all/main.vue";
import About from "@/views/tt/all/about.vue";
import BSO from "@/views/tt/all/businessopportunity.vue";
import BS from "@/views/tt/all/businessperson.vue";
import Product from "@/views/tt/all/product.vue";
import News from "@/views/tt/all/news.vue";
import Contact from "@/views/tt/all/contact.vue";

const menus = [
  { label: "หน้าหลัก", dropdown: [] },
  {
    label: "เกี่ยวกับเรา",
    dropdown: [
      "ผู้ก่อตั้ง",
      "นโยบายบริษัท",
      "โครงสร้างธุรกิจพันธุ์หมื่นให้",
      "ขยายคลังสินค้าบริษัท",
    ],
  },
  {
    label: "โอกาสทางธุรกิจ",
    dropdown: [
      "เเผนธุรกิจ",
      "เริ่มต้นธุรกิจ",
      "ตำบลในฝัน",
      "กฎระเบียบข้อบังคับ",
      "กองทุน",
      "สิทธิประโยชน์สมาชิก",
    ],
  },
  {
    label: "นักธุรกิจ/ผู้นำตำบลในฝัน",
    dropdown: [
      "สาขาตำบลในฝัน",
      "ข้อตกลง/PDPA",
      "กฎระเบียบว่าด้วยตลาดออนไลน์",
      "ปฏิทินกิจกรรม",
      "โปรโมชั่นสำหรับนักธุรกิจ",
      "คู่มือบรรยาย",
    ],
  },
  { label: "สินค้า", dropdown: ["ช่วยเหลือสังคม", "ทั่วไป", "สมัครนำสินค้าเข้าจำหน่าย"] },
  {
    label: "ข่าวสารและกิจกรรม",
    dropdown: ["โปรโมชั่น", "ตารางการประชุม", "ข่าวสาร", "บทความ", "กิจกรรมเพื่อสังคม"],
  },
  { label: "ติดต่อเรา", dropdown: [] },
];

const mainRef = ref(null);
const aboutRef = ref(null);
const bsoRef = ref(null);
const bsRef = ref(null);
const productRef = ref(null);
const newsRef = ref(null);
const contactRef = ref(null);

const activeIndex = ref(0);
const menuButtonRefs = reactive({});
const dropdownPositions = reactive({});
const dropdownOpen = reactive({});


const stickyContainer = ref(null);

function scrollToSection(index) {
  activeIndex.value = index;
  const sections = [
    mainRef.value,
    aboutRef.value,
    bsoRef.value,
    bsRef.value,
    productRef.value,
    newsRef.value,
    contactRef.value,
  ];

  if (index === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    sections[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function openDropdown(idx) {
  dropdownOpen[idx] = true
  nextTick(() => {
    const btn = menuButtonRefs[idx]
    if (btn) {
      const rect = btn.getBoundingClientRect()
      const dropdownWidth = 192 // ความกว้าง dropdown ปรับตามของจริง
      const viewportWidth = window.innerWidth

      let left = rect.left

      // ตรวจสอบไม่ให้ dropdown เลยขอบขวา
      if (left + dropdownWidth > viewportWidth) {
        left = viewportWidth - dropdownWidth - 10
      }

      // ตรวจสอบไม่ให้ dropdown เลยขอบซ้าย
      if (left < 10) {
        left = 10
      }

      dropdownPositions[idx] = {
        position: 'fixed',
        top: `${rect.bottom + 4}px`,
        left: `${left}px`
      }
    }
  })
}



function onMouseEnter(idx) {
  if (window.innerWidth >= 768) {
    openDropdown(idx);
  }
}

function onMouseLeave(idx) {
  if (window.innerWidth >= 768) {
    dropdownOpen[idx] = false;
  }
}

function onMenuClick(idx, menu) {
  if (window.innerWidth < 768) {
    const wasOpen = dropdownOpen[idx];

    // ปิดทั้งหมดก่อน
    Object.keys(dropdownOpen).forEach((key) => {
      dropdownOpen[key] = false;
    });

    if (!wasOpen) {
      dropdownOpen[idx] = true;
      openDropdown(idx);
    } else {
      // ถ้าเปิดอยู่ แล้วกดซ้ำ = ปิด
      dropdownOpen[idx] = false;
    }

    if (!menu.dropdown || menu.dropdown.length === 0 || !dropdownOpen[idx]) {
      scrollToSection(idx);
    }
  } else {
    scrollToSection(idx);
  }
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});

function onClickOutside(e) {
  const clickedInMenu = menuBar.value?.contains(e.target);

  const clickedInDropdown = Object.values(menuButtonRefs)
    .filter(Boolean) // ✅ กรอง el ที่ไม่ใช่ null
    .some((el) => el.contains(e.target));

  if (!clickedInMenu && !clickedInDropdown) {
    Object.keys(dropdownOpen).forEach((key) => {
      dropdownOpen[key] = false;
    });
  }
}


function onDropdownItemClick(menuIdx, itemIdx) {
  alert(`เลือก "${menus[menuIdx].dropdown[itemIdx]}" ในเมนู "${menus[menuIdx].label}"`);
  dropdownOpen[menuIdx] = false;
}

const menuBar = ref(null);
let isDown = false;
let startX;
let scrollLeft;

function startDrag(e) {
  isDown = true;
  if (menuBar.value) {
    const clientX = e.touches ? e.touches[0].clientX : e.pageX;
    startX = clientX - menuBar.value.offsetLeft;
    scrollLeft = menuBar.value.scrollLeft;
  }
}

function onDrag(e) {
  if (!isDown || !menuBar.value) return;
  e.preventDefault();
  const clientX = e.touches ? e.touches[0].clientX : e.pageX;
  const x = clientX - menuBar.value.offsetLeft;
  const walk = (x - startX) * 1;
  menuBar.value.scrollLeft = scrollLeft - walk;
}

function stopDrag() {
  isDown = false;
}
</script>

<style>
/* ซ่อน scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* animation fade + scale dropdown */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.15s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
