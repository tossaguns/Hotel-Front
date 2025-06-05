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

                <div class="w-full min-h-screen bg-gray-100 py-6 px-2 md:px-4">
                    <div class="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-xl font-bold mb-8 text-center">ข้อมูลบริษัทที่ต้องการเข้าร่วม SLEEP GUN</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- ลำดับ -->
                            <div>
                                <p class="block text-sm font-medium">ลำดับ</p>
                                <p>{{ partner.id }}</p>
                            </div>
                            <div>
                                <p class="block text-sm font-medium">รูปบริษัท</p>
                                <img v-if="partner.companyLogo" :src="partner.companyLogo"
                                    class="w-32 h-auto rounded border" />
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ชื่อบริษัท</p>
                                <p>{{ partner.companyName }}</p>
                            </div>


                            <div>
                                <div class="block text-sm font-medium mb-1">เบอร์ติดต่อบริษัท</div>
                                <p>{{ partner.companyPhone }}</p>
                            </div>


                            <div>
                                <div class="block text-sm font-medium mb-1">อีเมลติดต่อบริษัท</div>
                                <p>{{ partner.companyEmail }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">เลขบัญชี</p>
                                <p>{{ partner.bankNumber }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ธนาคาร</p>
                                <p>{{ partner.bankName }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">รูปบัญชี</p>
                                <img v-if="partner.bankImage" :src="partner.bankImage"
                                    class="w-32 h-auto rounded border" />
                            </div>

                            <div>
                                <p class="block text-sm font-medium">เลขประจำตัวผู้เสียภาษี</p>
                                <p>{{ partner.companyTaxId }}</p>
                            </div>


                            <div>
                                <p class="block text-sm font-medium">บ้านเลขที่</p>
                                <p>{{ partner.companyAddress }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ตำบล</p>
                                <p>{{ partner.companySubdistrict }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">อำเภอ</p>
                                <p>{{ partner.companyDistrict }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">จังหวัด</p>
                                <p>{{ partner.companyProvince }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">รหัสไปรษณีย์</p>
                                <p>{{ partner.companyPostalCode }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ละติจูด</p>
                                <p>{{ partner.hotelLatitude }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ลองติจูด</p>
                                <p>{{ partner.hotelLongitude }}</p>
                            </div>

                        </div>


                        <hr class="border-2 my-6" />

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="block text-sm font-medium">ชื่อ</p>
                                <p>{{ partner.fristName }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">นามสกุล</p>
                                <p>{{ partner.lastName }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ชื่อเล่น</p>
                                <p>{{ partner.nickName }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">เพศ</p>
                                <p>{{ partner.sex }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">เบอร์โทร</p>
                                <p>{{ partner.personalPhone }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">เลขบัตรประชาชน</p>
                                <p>{{ partner.personalId }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">รูปบัตรประชาชน</p>
                                <img v-if="partner.personalIdImg" :src="partner.personalIdImg"
                                    class="w-32 h-auto rounded border" />
                            </div>

                            <div>
                                <p class="block text-sm font-medium">บ้านเลขที่ตัวบุคคล</p>
                                <p>{{ partner.personalAddress }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ตำบล</p>
                                <p>{{ partner.personalSubdistrict }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">อำเภอ</p>
                                <p>{{ partner.personalDistrict }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">จังหวัด</p>
                                <p>{{ partner.personalProvince }}</p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">รหัสไปรษณีย์</p>
                                <p>{{ partner.personalPostalCode }}</p>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />

                        <div>
                            <div>
                                <p class="block text-sm font-medium">วันเวลาที่ยื่นสมัคร</p>
                                <p>{{ partner.createdAt }}</p>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />

                        <div>

                            <div>
                                <p class="block text-sm font-medium">โปรโมชั่นที่ใช้</p>
                                <p>{{ partner.promotionName }}</p>
                            </div>
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
import SidebarAdmin from '@/components/SidebarAdmin.vue'

export default {
    name: "DetailPartnerWaitApprove",
    components: {
        SidebarAdmin
    },
    data() {
        return {
            isSidebarCollapsed: false,
            partner: {
                fristName: '',
                lastName: '',
                nickName: '',
                sex: '',
                personalEmail: '',
                personalPhone: '',
                personalId: '',
                personalAddress: '',
                personalSubdistrict: '',
                personalDistrict: '',
                personalProvince: '',
                personalPostalCode: '',

                companyName: '',
                companyPhone: '',
                companyEmail: '',
                bankNumber: '',
                bankName: '',
                companyAddress: '',
                companySubdistrict: '',
                companyDistrict: '',
                companyProvince: '',
                companyPostalCode: '',
                hotelLatitude: '',
                hotelLongitude: '',
                companyTaxId: '',
                personalIdImg: null,
                companyLogo: null,
                bankImage: null,

                promotionName: '',
                createdAt: '',

            }

        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },

        navigateBack() {
            this.$router.go(-1)
        }



    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
}
</script>