<template>
  <div class="w-full min-h-screen bg-gray-50 flex">
    <Sidebar @toggle-sidebar="handleSidebarToggle" />

    <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-10 md:mt-0 transition-all duration-300"
      style="top: 1rem; bottom: 1rem; height: auto;" :class="{
        'md:ml-[232px]': !isSidebarCollapsed,
        'md:ml-[72px]': isSidebarCollapsed,

      }">

      <div class="">
        <div class="fixed top-0 left-0 right-0 h-4 z-[40] bg-gray-100"></div>
        <div class="sticky top-4 z-30 md:rounded-t-lg bg-amber-400 p-2 text-white text-lg shadow-lg shadow-gray-300">
          <h1>เพิ่มห้องพัก</h1>
        </div>

        <div class="bg-white min-h-screen">
          <div class="max-w-7xl mx-auto">
            <div class="flex flex-col lg:flex-row justify-between gap-2 mx-2 md:pt-4 pb-4">
              <!-- Left Column -->
              <div class="w-full lg:w-1/2 md:rounded-lg px-2 md:px-4">
                <div class="text-center pt-4">
                  <h>รายละเอียด</h>
                </div>

                <div class="w-full space-y-4 md:text-base text-xs mt-4 py-4">
                  <div class="flex flex-col">
                    <p class="text-gray-500">เลขที่ห้อง</p>
                    <input v-model="room.numberRoom" type="text" required placeholder="เลขที่ห้อง"
                      class="mt-1 py-2 px-3 border rounded-md" />
                  </div>

                  <div class="flex flex-col">
                    <p class="text-gray-500">ประเภทห้องพัก</p>
                    <input v-model="room.type" type="text" id="typeInput" required placeholder="ประเภทห้องพัก"
                      class="mt-1 py-2 px-3 border rounded-md" />

                  </div>

                  <div class="flex flex-col">
                    <p class="text-gray-500">ราคา</p>
                    <input v-model="room.price" type="text" required placeholder="ราคา"
                      class="mt-1 py-2 px-3 border rounded-md">
                  </div>

                  <div class="flex flex-col">
                    <p class="text-gray-500">จำนวนที่เข้าพักได้สูงสุด</p>
                    <input v-model="room.capacity" type="text" required placeholder="จำนวนคนที่สามารถเข้าพักได้"
                      class="mt-1 py-2 px-3 border rounded-md" />

                  </div>


                  <div class="flex flex-col">
                    <p class="text-gray-500">รายละเอียดเพิ่มเติมเกี่ยวกับห้องพัก</p>
                    <textarea v-model="room.note" rows="4" placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับห้องพัก"
                      class="mt-1 py-2 px-3 border rounded-md"></textarea>
                  </div>
                </div>
              </div>

              <!-- Right Column (Image Upload) -->
              <div class="flex w-full lg:w-1/2 md:border md:rounded-lg py-4 px-4">
                <div class="w-full">
                  <h2 class=" mb-5 text-base md:text-lg text-center">อัปโหลดรูปภาพเพิ่มเติม (สูงสุด 10 รูป)</h2>
                  <div @click="$refs.fileInput.click()" @dragover.prevent @drop.prevent="handleDrop">
                    <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" multiple class="hidden"
                      :disabled="imagePreviews.length >= 10" />
                  </div>

                  <div class="flex flex-wrap justify-center md:gap-4 gap-2">
                    <div v-for="(img, index) in imagePreviews" :key="index"
                      class="relative w-32 h-32 border rounded shadow overflow-hidden">
                      <img :src="img" class="w-full h-full object-cover rounded" />
                      <button @click="removeImage(index)"
                        class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                        title="ลบรูปนี้">
                        ✕
                      </button>
                    </div>
                    <!-- ปุ่ม + แสดงแค่ 1 อัน -->
                    <div v-if="imagePreviews.length < 10" @click="$refs.fileInput.click()"
                      class="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-yellow-500 transition">
                      <span class="text-3xl text-gray-400 hover:text-yellow-500">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-6 flex justify-center mx-4 my-2">
              <div class="w-full max-w-6xl py-6">
                <p class="text-lg md:mb-8 mb-4 text-center">กรุณาเลือกลักษณะห้องพัก</p>
                <div class="flex flex-wrap justify-center gap-2 text-xs md:text-base">
                  <button v-for="type in roomTypes" :key="type._id" @click="toggleRoomType(type._id)" :class="[
                    'flex items-center gap-2 px-3 md:px-4 py-2 rounded border transition',
                    selectedRoomTypes.includes(type._id)
                      ? 'bg-amber-400 text-white border-amber-400'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-amber-100'
                  ]" type="button">
                    <img v-if="type.icon" :src="getIconUrl(type.icon)" alt="icon" class="w-6 h-6 object-contain" />
                    {{ type.name }}
                  </button>
                </div>
              </div>
            </div>


            <div class="flex flex-col md:flex-row px-4 gap-1 md:space-x-2 pt-5 justify-center text-xs md:text-base">
              <button class="bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 px-4">
                บันทึก
              </button>
              <button class=" bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-500 px-4" @click="reseatall">
                รีเซ็ต
              </button>
              <button class=" bg-red-600 text-white py-3 rounded-lg hover:bg-red-500 px-4"
                @click="navigateToBackMainRoom">
                ย้อนกลับ
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
import { useRouter } from 'vue-router'
import Sidebar from '@/components/SidebarExecutive.vue'

const isSidebarCollapsed = ref(false)
const imagePreviews = ref([])
const room = ref({
  numberRoom: '',
  type: '',
  price: '',
  capacity: '',
  note: '',
  roomImg: []
})
const fileInput = ref(null)
const router = useRouter()

const roomTypes = ref([])
const selectedRoomTypes = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:9999/SleepGun/typeRoomHotel/getAll')
    const data = await res.json()
    roomTypes.value = data
  } catch (e) {
    console.error('โหลดข้อมูล room type ไม่สำเร็จ:', e)
  }
})

function handleSidebarToggle(isCollapsed) {
  isSidebarCollapsed.value = isCollapsed
}

function navigateToBackMainRoom() {
  router.push("/roomlist")
}

function onFileChange(event) {
  const files = Array.from(event.target.files)
  const remainingSlots = 10 - imagePreviews.value.length
  const selectedFiles = files.slice(0, remainingSlots)

  selectedFiles.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result)
        room.value.roomImg.push(file)
      }
      reader.readAsDataURL(file)
    }
  })

  fileInput.value.value = null
}

function handleDrop(event) {
  const files = Array.from(event.dataTransfer.files)
  const remainingSlots = 10 - imagePreviews.value.length
  const selectedFiles = files.slice(0, remainingSlots)

  selectedFiles.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result)
        room.value.roomImg.push(file)
      }
      reader.readAsDataURL(file)
    }
  })
}

function removeImage(index) {
  imagePreviews.value.splice(index, 1)
  room.value.roomImg.splice(index, 1)
}

function toggleRoomType(id) {
  const idx = selectedRoomTypes.value.indexOf(id)
  if (idx === -1) {
    selectedRoomTypes.value.push(id)
  } else {
    selectedRoomTypes.value.splice(idx, 1)
  }
}

function getIconUrl(icon) {
  if (!icon) return ''
  if (icon.startsWith('http')) return icon

  return `http://localhost:9999/uploads/icons/${icon}`
}
</script>
