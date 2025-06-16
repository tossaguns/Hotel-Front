FIXME: ถ้าสถานะกำลังเเก้ไข ให้ปุ่มอนุมัติเป็นสีเทาซึ่งไม่สามารถกดได้ ที่สามารถกดได้มีเเค่ปุ่มเเก้ไข
กับปุ่มไม่อนุมัติเท่านั้น //เมื่อกดปุ่มเเก้ไขซ้ำจะเป็นการส่งข้อความไปยังอีเมลเพิ่ม

<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div>
                <div class="mt-2 rounded-t-lg bg-rose-400 p-2 text-white text-lg">
                    <h1>ข้อมูลบริษัท</h1>
                </div>

                <div class="min-h-screen bg-gray-100 py-6 px-2 md:px-4">
                    <div class="mx-auto bg-white md:p-6 p-3 rounded-lg shadow-md">
                        <h2 class="text-xl font-bold mb-8 text-center">ข้อมูลบริษัทที่ต้องการเข้าร่วม SLEEP GUN</h2>

                        <div class="flex md:justify-end justify-center space-x-3 mr-4 mb-2 items-center">
                            <p class="block text-sm text-stone-400">ลำดับ</p>
                            <p class="text-xl bg-rose-100 px-3 py-1 rounded-full shadow-md">{{ index }}</p>
                        </div>

                        <hr class="border-2 mb-6 " />

                        <div class="mb-4 flex space-x-4">
                            <p class="font-bold">ประเภทที่พัก :</p>
                            <p class="bg-rose-200 rounded-md shadow-lg">
                                <template v-if="partner.hotelType && partner.hotelType.name">
                                    <p class=" px-4 py-1">{{ partner.hotelType.name }}</p>
                                </template>
                                <template v-else>
                                    <span
                                        class="text-red-500 bg-white px-4 py-1 rounded-md">ไม่มีข้อมูลประเภทที่พัก</span>
                                </template>
                            </p>


                        </div>

                        <hr class="border-2 mb-6 " />


                        <div class="mb-4 ">
                            <p class="text-green-600">1. รูปเเละข้อมูล PDF</p>
                        </div>

                        <div class="flex justify-center">
                            <!-- รูปบัตรประชาชน -->
                            <div class="max-w-7xl flex flex-col md:flex-row md:gap-2 xl:gap-4 justify-center">
                                <div class="mt-4">
                                    <p class="block text-sm font-medium mb-2 text-center">รูปบัตรประชาชน</p>
                                    <div class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                                        @click="partner.imageIden && openImageModal(partner.imageIden)">
                                        <img v-if="partner.imageIden" :src="partner.imageIden"
                                            class="w-full h-full object-cover" alt="รูปบัตรประชาชน" />
                                        <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
                                    </div>
                                </div>

                                <!-- รูปวีซ่า -->
                                <div class="mt-4">
                                    <p class="block text-sm font-medium mb-2 text-center">รูปวีซ่า</p>
                                    <div class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                                        @click="partner.imageVisa && openImageModal(partner.imageVisa)">
                                        <img v-if="partner.imageVisa" :src="partner.imageVisa"
                                            class="w-full h-full object-cover" alt="รูปวีซ่า" />
                                        <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
                                    </div>
                                </div>

                                <!-- รูปที่อยู่ด้านนอก -->
                                <div class="mt-4">
                                    <p class="block text-sm font-medium mb-2 text-center">รูปที่พักด้านนอก</p>
                                    <div class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                                        @click="partner.imagehotelOurdoor && openImageModal(partner.imagehotelOurdoor)">
                                        <img v-if="partner.imagehotelOurdoor" :src="partner.imagehotelOurdoor"
                                            class="w-full h-full object-cover" alt="รูปที่อยู่ด้านนอก" />
                                        <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
                                    </div>
                                </div>

                                <!-- หลักฐานใบอนุญาต (PDF) -->
                                <div class="mt-4">
                                    <p class="block text-sm font-medium mb-2 text-center">หลักฐานใบอนุญาต (PDF)</p>
                                    <div v-if="partner.businessLicense">
                                        <a :href="partner.businessLicense" target="_blank" rel="noopener noreferrer"
                                            class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                            เปิดไฟล์ใบอนุญาต
                                        </a>
                                    </div>
                                    <span v-else class="text-xs text-gray-400 ">ไม่มีไฟล์ใบอนุญาต</span>
                                </div>

                                <!-- Modal แสดงรูปขนาดใหญ่ -->
                                <div v-if="showImage"
                                    class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                                    @click.self="closeImageModal">
                                    <img :src="modalImageSrc" alt="รูปขยาย"
                                        class="max-w-3xl max-h-[90vh] rounded shadow-lg" />
                                    <button @click="closeImageModal"
                                        class="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
                                        aria-label="Close modal">&times;</button>
                                </div>
                            </div>
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


                        <div class="flex flex-col text-stone-500 text-sm">
                            <div class="flex  space-x-3">
                                <p class="block font-medium">วันเวลาที่ยื่นสมัคร :</p>
                                <p v-if="partner">{{ partner.createdAt }}</p>
                            </div>
                        </div>


                        <hr class="border-2 my-6" />


                        <div class="flex justify-center space-x-3">
                            <button @click="approvePartner"
                                class="bg-green-500 py-2 px-4 rounded-lg text-white font-bold hover:bg-green-600">อนุมัติ</button>

                            <button @click="requestEditPartner"
                                class="bg-yellow-500 py-2 px-4 rounded-lg text-white font-bold hover:bg-yellow-600">เเก้ไข</button>

                            <button @click="rejectPartner"
                                class="bg-orange-500 py-2 px-4 rounded-lg text-white font-bold hover:bg-orange-600">ไม่อนุมัติ</button>
                        </div>
                    </div>



                    <div @click="navigateBack" class="flex justify-center my-6">
                        <button class="bg-red-500 p-2 rounded-lg hover:bg-red-600 text-white ">ย้อนกลับ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SidebarAdmin from '@/components/SidebarAdmin.vue'

export default {
    name: "DetailPartnerWaitApprove",
    components: {
        SidebarAdmin,
    },
    data() {
        return {
            isSidebarCollapsed: false,
            partner: {},
            index: null,
            showImage: false,
            modalImageSrc: null,
        }
    },
    methods: {
        openImageModal(imageUrl) {
            this.modalImageSrc = imageUrl
            this.showImage = true
        },
        closeImageModal() {
            this.showImage = false
            this.modalImageSrc = null
        },

        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateBack() {
            this.$router.go(-1)
        },

        async approvePartner() {
            try {
                const res = await axios.put(`http://localhost:9999/SleepGun/partner/approve/${this.partner._id}`)
                alert("✅ อนุมัติเรียบร้อย")
                this.$router.push("/admin/partnerlist")
            } catch (err) {
                console.error("❌ Error approving partner:", err)
                alert("เกิดข้อผิดพลาดในการอนุมัติ")
            }
        },

        async rejectPartner() {
            const reason = prompt("กรุณาระบุเหตุผลที่ไม่อนุมัติ:")
            if (!reason) return

            try {
                const res = await axios.put(`http://localhost:9999/SleepGun/partner/reject/${this.partner._id}`, {
                    reason: reason
                })
                alert("❌ ปฏิเสธเรียบร้อย")
                this.$router.push("/admin/partnerlist")
            } catch (err) {
                console.error("❌ Error rejecting partner:", err)
                alert("เกิดข้อผิดพลาดในการปฏิเสธ")
            }
        },

        async requestEditPartner() {
            const reason = prompt("กรุณาระบุสิ่งที่ต้องการให้แก้ไข:")
            if (!reason) return

            try {
                const res = await axios.post(`http://localhost:9999/SleepGun/partner/request-edit/${this.partner._id}`, {
                    reason: reason
                })
                alert("📩 ส่งคำขอแก้ไขเรียบร้อย")
                this.$router.push("/admin/partnerlist")
            } catch (err) {
                console.error("❌ Error requesting edit:", err)
                alert("เกิดข้อผิดพลาดในการขอแก้ไขข้อมูล")
            }
        }
    },

    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }

        // ✅ รับ index ที่ส่งมาจาก query
        this.index = this.$route.query.index || null

        const partnerId = this.$route.params.id
        if (partnerId) {
            axios.get(`http://localhost:9999/SleepGun/partner/get/${partnerId}`)
                .then(response => {
                    this.partner = response.data
                    console.log('✅ response.data:', response.data)
                })
                .catch(error => {
                    console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูล partner:', error)
                })
        } else {
            console.error('❌ ไม่พบ ID ใน route params')
        }
    }

}
</script>
