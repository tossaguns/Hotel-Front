<template>

<div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">

            <div class="bg-white rounded-lg pb-10 ">
                <div class="py-2 bg-amber-400 rounded-t-lg">
                    <p class="text-center md:text-left text-xl text-white px-2">เเก้ไขข้อมูลเกี่ยวกับโรงเเรมของคุณ</p>
                </div>


                <div class="max-w-5xl mx-auto">
                    <p class="text-center mt-6 text-2xl font-bold">เเก้ไขข้อมูลเกี่ยวกับโรงเเรมของคุณ</p>

                    <div class="bg-white md:rounded-b-lg px-4 min-h-screen mt-8">
                        <div>
                            <p class="font-bold">1. ระยะเวลาในการเข้าพัก</p>

                            <div class="max-w-3xl mx-auto px-5 pt-4 pb-6 text-center">
                                <div class="mb-6">
                                    <p class="mb-2 font-semibold text-sm text-stone-500">เวลา Check-in <span
                                            class="text-red-600">*</span></p>
                                    <div class="flex justify-center items-center space-x-3">
                                        <p>จาก :</p>
                                        <input v-model="checkInForm"
                                            class="border rounded-md px-3 py-1 w-24 text-center" placeholder="00:00" />
                                        <p>ถึง :</p>
                                        <input class="border rounded-md px-3 py-1 w-24 text-center"
                                            placeholder="00:00" />
                                    </div>
                                    <div class="max-w-xl mx-auto">
                                        <input v-model="VerifyIden_checkIn"
                                            class="border mt-3 text-xs md:text-sm  p-3 rounded-md w-full"
                                            placeholder="กรอกสิ่งที่ต้องเเสดงในการ check-in เช่น เเสดงวีซ่าหรือเลขบัตรประชาชน..." />
                                    </div>
                                </div>


                                <div>
                                    <p class="mb-2 font-semibold text-sm text-stone-500">เวลา Check-out <span
                                            class="text-red-600">*</span></p>
                                    <div class="flex justify-center items-center space-x-3">
                                        <p>จาก :</p>
                                        <input v-model="checkOutForm"
                                            class="border rounded-md px-3 py-1 w-24 text-center" placeholder="00:00" />
                                        <p>ถึง :</p>
                                        <input class="border rounded-md px-3 py-1 w-24 text-center"
                                            placeholder="00:00" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />

                        <div>
                            <p class="font-bold">2. เตียงเสริม</p>

                            <div class="max-w-3xl mx-auto px-5 pt-4 pb-2 text-center">
                                <!-- คำถาม -->
                                <div class="mb-6 space-x-8 space-y-2">
                                    <p>ที่พักของคุณมีให้เพิ่มเตียงเสริมหรือไม่<span class="text-red-600 px-1">*</span>
                                    </p>
                                    <label>
                                        <input type="radio" value="yes" v-model="hasExtraBed" />
                                        มี
                                    </label>
                                    <label>
                                        <input type="radio" value="no" v-model="hasExtraBed" />
                                        ไม่มี
                                    </label>
                                </div>


                                <transition name="fade-slide" mode="out-in">
                                    <div v-if="hasExtraBed === 'yes'" class="mb-6 shadow-md rounded-lg p-4">
                                        <p class="mb-2 font-semibold text-sm text-stone-500">
                                            ลักษณะเตียงเเละราคา (หากไม่มีเตียงเเบบไหนทำเครื่องหมาย - ) <span
                                                class="text-red-600 px-1">*</span>
                                        </p>

                                        <div class="flex flex-col justify-center items-center space-y-3">
                                            <div class="flex space-x-3">
                                                <p>เตียงเด็ก :</p>
                                                <input v-model="extraBed.child"
                                                    class="border rounded-md px-3 py-1 w-24 text-center"
                                                    placeholder="ราคา" /><span>บาท</span>
                                            </div>
                                            <div class="flex space-x-3">
                                                <p>เตียงปกติ :</p>
                                                <input v-model="extraBed.normal"
                                                    class="border rounded-md px-3 py-1 w-24 text-center"
                                                    placeholder="ราคา" /><span>บาท</span>
                                            </div>

                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />

                        <div>
                            <p class="font-bold">3. นโยบายการเก็บเงินมัดจำ</p>

                            <div class="max-w-3xl mx-auto px-5 pt-4 pb-2 text-center">
                                <!-- คำถาม -->
                                <div class="mb-6 space-x-8 space-y-2">
                                    <p>ที่พักขอคุณมีนโยบายเรียกเก็บเงินมัดจำหรือไม่<span
                                            class="text-red-600 px-1">*</span>
                                    </p>
                                    <label>
                                        <input type="radio" value="yes" v-model="hasExtraCashPledge" />
                                        มี
                                    </label>
                                    <label>
                                        <input type="radio" value="no" v-model="hasExtraCashPledge" />
                                        ไม่มี
                                    </label>
                                </div>


                                <transition name="fade-slide" mode="out-in">
                                    <div v-if="hasExtraCashPledge === 'yes'" class="mb-6 shadow-md rounded-lg p-4">
                                        <p class="mb-2 font-semibold text-sm text-stone-500">
                                            นโยบายการเก็บเงินมัดจำ<span class="text-red-600 px-1">*</span>
                                        </p>
                                        <div class="flex space-x-3">
                                            <p>ค่ามัดจำต่อห้องราคา :</p>
                                            <input class="border rounded-md px-3 py-1 w-24 "
                                                placeholder="ราคา" /><span>บาท</span>
                                        </div>
                                        <div class="flex-col mt-2">
                                            <p class="text-left">ราคาที่ต้องจ่ายของค่ามัดจำมีอะไรบ้าง :</p>
                                            <input class="border rounded-md px-3 py-2 w-full mt-2"
                                                placeholder="ค่ากุญเเจ ค่าคีย์การ์ด..." />
                                        </div>




                                    </div>
                                </transition>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />

                        <p class="font-bold">4. เกี่ยวกับที่พัก</p>

                        <div class="mt-5">
                            <div class="mx-5">
                                <p class="mb-2 text-lime-700">4.1 อธิบายเกี่ยวกับที่พัก</p>
                                <textarea v-model="AboutFacilityHotel" rows="3"
                                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                                    placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
                            </div>
                            <div>
                                <p class="text-center my-4 text-lime-600">
                                    โปรดคลิ๊กกล่องข้อความให้ตรงกับที่พักของท่าน</p>
                                <div class="max-w-3xl mx-auto">
                                    <div
                                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-lg shadow-md bg-lime-50">
                                        <div v-for="facility in facilities" :key="facility._id"
                                            class="flex items-center border p-3 space-x-2 rounded shadow bg-white">
                                            <input type="checkbox" v-model="selectedFacilities" :value="facility._id" />
                                            <img :src="`http://localhost:9999/uploads/icons/${facility.icon}`"
                                                alt="icon" class="h-5 object-contain pl-2" />

                                            <span class="text-gray-700">{{ facility.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div class="mt-5">
                            <div class="mx-5">
                                <p class="mb-2 text-fuchsia-700">4.2 อธิบายเกี่ยวกับทำเลที่ตั้ง</p>
                                <textarea v-model="AboutHotelLocation" rows="3"
                                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                                    placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
                            </div>
                            <div>
                                <p class="text-center my-4 text-fuchsia-400">
                                    โปรดคลิ๊กกล่องข้อความให้ตรงกับทำเลที่พักของท่าน</p>
                                <div class="max-w-3xl mx-auto">
                                    <div
                                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-lg shadow-md bg-fuchsia-50">
                                        <div v-for="hotelLocation in hotelLocation" :key="hotelLocation._id"
                                            class="flex items-center border p-3 space-x-2 rounded shadow bg-white">
                                            <input type="checkbox" v-model="selectedHotelLocation"
                                                :value="hotelLocation._id" />
                                            <img :src="`http://localhost:9999/uploads/icons/${hotelLocation.icon}`"
                                                alt="icon" class="h-5 object-contain pl-2" />

                                            <span class="text-gray-700">{{ hotelLocation.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />

                        <div class="mt-5">
                            <div class="mx-5">
                                <p class="mb-2 text-stone-700">4.3 อธิบายเกี่ยวกับสิ่งอำนวยความสะดวกภายในที่พัก</p>
                                <textarea v-model="AboutRoomHotel" rows="3"
                                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                                    placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
                            </div>
                            <div>
                                <p class="text-center my-4 text-stone-400">
                                    โปรดคลิ๊กกล่องข้อความให้ตรงกับสิ่งอำนวยความสะดวกภายในที่พักของท่าน</p>
                                <div class="max-w-3xl mx-auto">
                                    <div
                                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-lg shadow-md bg-stone-50">
                                        <div v-for="roomHotel in roomHotel" :key="roomHotel._id"
                                            class="flex items-center border p-3 space-x-2 rounded shadow bg-white">
                                            <input type="checkbox" v-model="selectedRoomHotel" :value="roomHotel._id" />
                                            <img :src="`http://localhost:9999/uploads/icons/${roomHotel.icon}`"
                                                alt="icon" class="h-5 object-contain pl-2" />

                                            <span class="text-gray-700">{{ roomHotel.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />

                        <div class="mt-5">
                            <div class="mx-5">
                                <p class="mb-2 text-indigo-700">4.4 ที่พักของท่านรองรับสัตว์เลี้ยงหรือไม่</p>
                                <textarea v-model="AboutHotelFor" rows="3"
                                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                                    placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
                            </div>
                            <div>
                                <p class="text-center my-4 text-indigo-400">
                                    โปรดคลิ๊กกล่องข้อความให้ตรงกับการรองรับสัตว์เลี้ยงของที่พัก</p>
                                <div class="max-w-3xl mx-auto">
                                    <div
                                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-lg shadow-md bg-indigo-50">
                                        <div v-for="hotelFor in hotelFor" :key="hotelFor._id"
                                            class="flex items-center border p-3 space-x-2 rounded shadow bg-white">
                                            <input type="checkbox" v-model="selectedHotelFor" :value="hotelFor._id" />
                                            <img :src="`http://localhost:9999/uploads/icons/${hotelFor.icon}`"
                                                alt="icon" class="h-5 object-contain pl-2" />

                                            <span class="text-gray-700">{{ hotelFor.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />

                        <div class="mt-5">
                            <div class="mx-5">
                                <p class="mb-2 text-amber-600">4.5 มื้ออาหาร</p>
                                <textarea v-model="AboutFoodHotel" rows="3"
                                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                                    placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
                            </div>
                            <div>
                                <p class="text-center my-4 text-amber-500">
                                    โปรดคลิ๊กกล่องข้อความให้ตรงกับการรับประทานอาหารของที่พัก</p>
                                <div class="max-w-3xl mx-auto">
                                    <div
                                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-lg shadow-md bg-amber-50">
                                        <div v-for="foodHotel in foodHotel" :key="foodHotel._id"
                                            class="flex items-center border p-3 space-x-2 rounded shadow bg-white">
                                            <input type="checkbox" v-model="selectedFoodHotel" :value="foodHotel._id" />
                                            <img :src="`http://localhost:9999/uploads/icons/${foodHotel.icon}`"
                                                alt="icon" class="h-5 object-contain pl-2" />

                                            <span class="text-gray-700">{{ foodHotel.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />



                        <div class="mt-8">

                        </div>



                        <div class="flex justify-center mt-8 mb-6 space-x-3">
                            <button @click="navigateToDetailHotel"
                                class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">ย้อนกลับ
                            </button>
                            <button @click="resetForm"
                                class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500">รีเซต
                            </button>
                            <button @click="saveAboutHotel"
                                class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">บันทึก
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
import { useRouter, useRoute } from 'vue-router'
import Sidebar from '@/components/SidebarExecutive.vue'
import axios from 'axios'

const router = useRouter()


const isSidebarCollapsed = ref(false)
const hasExtraBed = ref(null)
const hasExtraCashPledge = ref(null)

const facilities = ref([])
const hotelLocation = ref([])
const roomHotel = ref([])
const hotelFor = ref([])
const foodHotel = ref([])

const selectedFacilities = ref([])
const selectedHotelLocation = ref([])
const selectedRoomHotel = ref([])
const selectedHotelFor = ref([])
const selectedFoodHotel = ref([])



function handleSidebarToggle(collapsed) {
    isSidebarCollapsed.value = collapsed
}

function navigateToDetailHotel() {
    router.push("/detailhotel")
}




// Load dropdown data
async function fetchFacilities() {
    const res = await axios.get('http://localhost:9999/SleepGun/typeFacilityHotel/getAll')
    facilities.value = res.data
}

async function fetchHotelLocation() {
    const res = await axios.get('http://localhost:9999/SleepGun/typeHotelLocation/getAll')
    hotelLocation.value = res.data
}

async function fetchRoomHotel() {
    const res = await axios.get('http://localhost:9999/SleepGun/typeRoomHotel/getAll')
    roomHotel.value = res.data
}

async function fetchHotelFor() {
    const res = await axios.get('http://localhost:9999/SleepGun/typeHotelFor/getAll')
    hotelFor.value = res.data
}

async function fetchFoodHotel() {
    const res = await axios.get('http://localhost:9999/SleepGun/typeFoodHotel/getAll')
    foodHotel.value = res.data
}



onMounted(async () => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
        isSidebarCollapsed.value = JSON.parse(savedState)
    }

});

</script>



<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>