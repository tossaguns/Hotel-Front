<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[240px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div>
                <div class="mt-2 rounded-t-lg bg-rose-400 p-2 text-white text-lg">
                    <h1>ข้อมูลบริษัท</h1>
                </div>

                <div class="min-h-screen bg-gray-100 py-6 px-2 md:px-4">
                    <div class="mx-auto bg-white md:p-6 p-3 rounded-lg shadow-md">
                        <div class="max-w-7xl mx-auto">
                            <h2 class="text-xl font-bold mb-8 text-center">ข้อมูลบริษัทที่ต้องการเข้าร่วม SLEEP GUN</h2>

                            <div class="flex md:justify-end justify-center space-x-3 mr-4 mb-2 items-center">
                                <p class="block text-sm text-stone-400">ลำดับ</p>
                                <p class="text-xl bg-rose-100 px-3 py-1 rounded-full shadow-md">{{ index }}</p>
                            </div>

                            <hr class="border-2 mb-6 " />

                            <div class="mb-4">
                                <div class="flex">
                                    <p class="font-bold">ประเภทที่พัก :</p>
                                    <p class="bg-rose-200 rounded-md shadow-lg ml-4">
                                        <template v-if="partner.hotelType && partner.hotelType.name">
                                            <p class=" px-4 py-1">{{ partner.hotelType.name }}</p>
                                        </template>
                                        <template v-else>
                                            <span
                                                class="text-red-500 bg-white px-4 py-2 rounded-md">ไม่มีข้อมูลประเภทที่พัก</span>
                                        </template>
                                    </p>
                                </div>


                                <div class="flex space-x-4 mt-3">
                                    <p class="font-bold">สถานะ :</p>
                                    <div :class="{
                                        'bg-green-200': status === 'approved',
                                        'bg-gray-200': status !== 'approved'
                                    }" class="rounded-md shadow-lg">
                                        <p :class="{
                                            'text-green-800': status === 'approved',
                                            'text-gray-800': status !== 'approved'
                                        }" class="px-4 py-1">
                                            {{ status }}
                                        </p>
                                    </div>
                                </div>


                            </div>

                            <hr class="border-2 mb-6 " />


                            <div class="mb-4 ">
                                <p class="text-green-600">1. รูปเเละข้อมูล PDF</p>
                            </div>

                            <div class="flex justify-center">
                                <!-- รูปบัตรประชาชน -->
                                <div class=" flex flex-col lg:flex-row lg:gap-4 justify-center items-center">
                                    <!-- รูปบัตรประชาชน -->
                                    <div class="mt-4">
                                        <p class="block text-sm font-medium mb-2 text-center">รูปบัตรประชาชน</p>
                                        <div class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                                            @click="partner.imageIden && openImageModal(`http://localhost:9999${partner.imageIden}`)">
                                            <img v-if="partner.imageIden"
                                                :src="`http://localhost:9999${partner.imageIden}`"
                                                class="w-full h-full object-cover" alt="รูปบัตรประชาชน" />
                                            <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
                                        </div>
                                    </div>

                                    <!-- รูปวีซ่า -->
                                    <div class="mt-4">
                                        <p class="block text-sm font-medium mb-2 text-center">รูปวีซ่า</p>
                                        <div class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                                            @click="partner.imageVisa && openImageModal(`http://localhost:9999${partner.imageVisa}`)">
                                            <img v-if="partner.imageVisa"
                                                :src="`http://localhost:9999${partner.imageVisa}`"
                                                class="w-full h-full object-cover" alt="รูปวีซ่า" />
                                            <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
                                        </div>
                                    </div>

                                    <!-- รูปที่พักด้านนอก -->
                                    <div class="mt-4">
                                        <p class="block text-sm font-medium mb-2 text-center">รูปที่พักด้านนอก</p>
                                        <div class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                                            @click="partner.imageHotelOurDoor && openImageModal(`http://localhost:9999${partner.imageHotelOurDoor}`)">
                                            <img v-if="partner.imageHotelOurDoor"
                                                :src="`http://localhost:9999${partner.imageHotelOurDoor}`"
                                                class="w-full h-full object-cover" alt="รูปที่พักด้านนอก" />
                                            <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
                                        </div>
                                    </div>

                                    <!-- หลักฐานใบอนุญาต (PDF) -->
                                    <div class="mt-4">
                                        <p class="block text-sm font-medium mb-2 text-center">หลักฐานใบอนุญาต (PDF)</p>
                                        <div v-if="partner.businessLicense">
                                            <a :href="`http://localhost:9999${partner.businessLicense}`" target="_blank"
                                                rel="noopener noreferrer"
                                                class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                                เปิดไฟล์ใบอนุญาต
                                            </a>
                                        </div>
                                        <span v-else class="text-xs text-gray-400">ไม่มีไฟล์ใบอนุญาต</span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-center">
                                <div class=" flex flex-col lg:flex-row md:gap-2 justify-center">
                                    <div class="mt-4">
                                        <p class="block text-sm font-medium mb-2 text-center">รูปลายเซ็น</p>
                                        <div class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                                            @click="partner.imageSignature && openImageModal(`http://localhost:9999/uploads/partners/${partner.imageSignature}`)">
                                            <img v-if="partner.imageSignature"
                                                :src="`http://localhost:9999/uploads/partners/${partner.imageSignature}`"
                                                class="w-full h-full object-cover" alt="รูปลายเซ็น" />
                                            <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
                                        </div>
                                    </div>
                                    <div class="mt-4">
                                        <p class="block text-sm font-medium mb-2 text-center">รูปโลโก้บริษัท</p>
                                        <div class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                                            @click="partner.imageLogoCompany && openImageModal(`http://localhost:9999/uploads/partners/${partner.imageLogoCompany}`)">
                                            <img v-if="partner.imageLogoCompany"
                                                :src="`http://localhost:9999/uploads/partners/${partner.imageLogoCompany}`"
                                                class="w-full h-full object-cover" alt="รูปโลโก้บริษัท" />
                                            <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Modal แสดงรูปขนาดใหญ่ -->
                            <div v-if="showImage"
                                class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                                @click.self="closeImageModal">
                                <img :src="modalImageSrc" alt="รูปขยาย"
                                    class="max-w-3xl max-h-[90vh] rounded shadow-lg border-4 border-white" />
                                <button @click="closeImageModal"
                                    class="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
                                    aria-label="Close modal">&times;</button>
                            </div>

                            <div class="max-w-md mx-auto mt-4 ">
                                <p>ลายเซ็น(ชื่อ)</p>
                                <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                    partner.nameSignature }}</p>
                            </div>

                            <hr class="border my-6" />

                            <div class="mb-4 ">
                                <p class="text-amber-600">2. ข้อมูลบริษัท</p>
                            </div>

                            <div class="flex flex-col md:flex-row justify-between items-start gap-6 pb-4">
                                <!-- คอลัมน์ข้อมูลบริษัท -->
                                <div class="md:w-1/2 w-full xl:ml-20">
                                    <div class="mb-3 w-full">
                                        <p class="block text-sm font-medium mb-1">ชื่อบริษัท</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.companyName }}</p>
                                    </div>

                                    <div class="mb-3">
                                        <p class="block text-sm font-medium mb-1">บ้านเลขที่</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.address }}</p>
                                    </div>

                                    <div class="mb-3">
                                        <p class="block text-sm font-medium mb-1">ตำบล</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.subdistrict }}</p>
                                    </div>

                                    <div class="mb-3">
                                        <p class="block text-sm font-medium mb-1">อำเภอ</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.district }}</p>
                                    </div>

                                    <div class="mb-3">
                                        <p class="block text-sm font-medium mb-1">จังหวัด</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.province }}</p>
                                    </div>

                                    <div class="mb-3">
                                        <p class="block text-sm font-medium mb-1">รหัสไปรษณีย์</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.postcode }}</p>
                                    </div>
                                </div>

                                <!-- คอลัมน์แผนที่ -->
                                <div class="md:w-1/2 w-full xl:mr-20">
                                    <p class="block text-sm font-medium mb-2">ตำแหน่งโรงแรมบนแผนที่</p>
                                    <iframe v-if="partner.hotelLatitude && partner.hotelLongitude"
                                        :src="`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${partner.hotelLatitude},${partner.hotelLongitude}`"
                                        width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade" class="rounded-lg shadow">
                                    </iframe>
                                    <div class="flex space-x-3 text-xs justify-center mt-2">
                                        <p v-if="partner">Latitude : {{ partner.hotelLatitude }}</p>
                                        <p v-if="partner">Longitude : {{ partner.hotelLongitude }}</p>
                                    </div>
                                </div>
                            </div>

                            <hr class="border-1 my-6" />

                            <div class="mb-4 ">
                                <p class="text-red-600">3. ข้อมูลส่วนบุคคล</p>
                            </div>

                            <div class="flex flex-col justify-center items-center max-w-4xl mx-auto pb-4">
                                <div class="w-full">
                                    <div class="mt-3">
                                        <p class="block text-sm font-medium mb-1">ชื่อ</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.firstname }}</p>
                                    </div>

                                    <div class="mt-3">
                                        <p class="block text-sm font-medium mb-1">นามสกุล</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.lastname }}</p>
                                    </div>

                                    <div class="mt-3">
                                        <p class="block text-sm font-medium mb-1">เพศ</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.sex }}</p>
                                    </div>

                                    <div class="mt-3">
                                        <p class="block text-sm font-medium mb-1">เบอร์โทร</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.phone }}</p>
                                    </div>

                                    <div class="mt-3">
                                        <p class="block text-sm font-medium mb-1">อีเมล</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.email }}</p>
                                    </div>

                                    <div class="mt-3">
                                        <p class="block text-sm font-medium mb-1">เลขบัตรประชาชน</p>
                                        <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                                            partner.idenNumber }}</p>
                                    </div>
                                </div>
                            </div>

                            <hr class="border-1 my-6" />



                            <div>
                                <p>เเสดงข้อมูลโรงเเรมคำอธิบายอื่นๆ</p>
                                <p>ทำเป็นปุ่มให้กดดูข้อมูล</p>
                            </div>

                            <hr class="border-1 my-6" />

                            <div>
                                <p>เเสดงข้อมูลห้องที่จองกับ tossagun</p>
                                <p>ทำเป็นปุ่มให้กดดูข้อมูล(เเสดงราคาที่ได้ เเสดงวันเวลาที่จอง/ยกเลิก จองเเล้วกี่ครั้ง
                                    ทำกราฟเเสดงรายวันเดือนปี)</p>
                            </div>


                            <hr class="border-1 my-6" />

                            <div>
                                <p>โปรโมชั่นที่ใช้งาน</p>
                                <p>เเสดงโปรโมชั่นทั้งหมดเเละโปรโมชั่นที่กำลังใช้งานอยู่(บอกด้วยว่ากำลังใช้งานอยู่)</p>
                            </div>



                            <hr class="border-2 my-6" />

                            <div class="flex flex-col text-stone-500 text-sm">
                                <div class="flex  space-x-3">
                                    <p class="block font-medium">วันเวลาที่ยื่นสมัคร :</p>
                                    <p v-if="partner">{{ partner.createdAt }}</p>
                                </div>
                                <div class="flex  space-x-3">
                                    <p>วันเวลาที่อนุมัติ :</p>
                                    <p v-if="partner">{{ partner.approveAt }}</p>
                                </div>
                            </div>

                            <hr class="border-1 my-6" />

                            <div>
                                <p>รหัสเข้าเว็บของ partner</p>
                                <p>username/password</p>

                                <p>ส่วนรหัสที่จะเข้า dashboard เเละ employee ก็ใช้รหัสของ superAdmin เข้าได้เลย/ admin
                                    ธรรมดาเข้าไม่ได้</p>
                            </div>

                            <hr class="border-2 my-6" />

                            <div class="flex justify-center flex-col">
                                <button
                                    class="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600">เยี่ยมชมเว็บไซต์</button>
                                <p>
                                    superadmin สามารถเข้าไปปรับเปลี่ยนอะไรก็ได้ในเว็บนี้
                                </p>
                            </div>
                        </div>



                        <div @click="navigateBack" class="flex justify-center my-6">
                            <button class="bg-red-500 p-2 rounded-lg hover:bg-red-600 text-white ">ย้อนกลับ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import SidebarAdmin from '@/components/SidebarAdmin.vue'

// ✅ ตัวแปรประกอบ
const isSidebarCollapsed = ref(false)
const partner = ref({})
const index = ref(null)
const status = ref('-') // เพิ่มสถานะ
const showImage = ref(false)
const modalImageSrc = ref(null)

// ✅ use router
const route = useRoute()
const router = useRouter()

// ✅ เปิด modal ดูรูป
function openImageModal(imageUrl) {
    modalImageSrc.value = imageUrl
    showImage.value = true
}

// ✅ ปิด modal รูป
function closeImageModal() {
    showImage.value = false
    modalImageSrc.value = null
}

// ✅ toggle sidebar
function handleSidebarToggle(collapsed) {
    isSidebarCollapsed.value = collapsed
}

// ✅ ย้อนกลับหน้าเดิม
function navigateBack() {
    router.go(-1)
}

// ✅ โหลดข้อมูลเมื่อเปิดหน้า
onMounted(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
        isSidebarCollapsed.value = JSON.parse(savedState)
    }

    index.value = route.query.index || null
    status.value = route.query.status || '-'

    const partnerId = route.params.id
    if (partnerId) {
        axios.get(`http://localhost:9999/SleepGun/partner/get/${partnerId}`)
            .then((res) => {
                partner.value = res.data
                console.log("✅ imageIden:", partner.value.imageIden);
                console.log('✅ response.data:', res.data)
            })
            .catch((err) => {
                console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูล partner:', err)
            })
    } else {
        console.error('❌ ไม่พบ ID ใน route params')
    }
})
</script>
