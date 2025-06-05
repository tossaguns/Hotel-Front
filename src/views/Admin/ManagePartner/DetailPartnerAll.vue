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
                                <p></p>
                            </div>


                            <div>
                                <p class="block text-sm font-medium">รูปบริษัท</p>
                                <img />
                            </div>
                            <div>
                                <p class="block text-sm font-medium">ชื่อบริษัท</p>
                                <p></p>
                            </div>


                            <div>
                                <div class="block text-sm font-medium mb-1">เบอร์ติดต่อบริษัท</div>
                                <p></p>
                            </div>


                            <div>
                                <div class="block text-sm font-medium mb-1">อีเมลติดต่อบริษัท</div>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">เลขบัญชี</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ธนาคาร</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">รูปบัญชี</p>
                                <img />
                            </div>

                            <div>
                                <p class="block text-sm font-medium">เลขประจำตัวผู้เสียภาษี</p>
                                <p></p>
                            </div>


                            <div>
                                <p class="block text-sm font-medium">บ้านเลขที่</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ตำบล</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">อำเภอ</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">จังหวัด</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">รหัสไปรษณีย์</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ละติจูด</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ลองติจูด</p>
                                <p></p>
                            </div>

                        </div>


                        <hr class="border-2 my-6" />

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="block text-sm font-medium">ชื่อ</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">นามสกุล</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ชื่อเล่น</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">เพศ</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">เบอร์โทร</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">เลขบัตรประชาชน</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">รูปบัตรประชาชน</p>
                                <img />
                            </div>

                            <div>
                                <p class="block text-sm font-medium">บ้านเลขที่ตัวบุคคล</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">ตำบล</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">อำเภอ</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">จังหวัด</p>
                                <p></p>
                            </div>

                            <div>
                                <p class="block text-sm font-medium">รหัสไปรษณีย์</p>
                                <p></p>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />

                        <div>
                            <div>
                                <p class="block text-sm font-medium">วันเวลาที่ยื่นสมัคร</p>
                                <p></p>
                            </div>
                        </div>

                        <hr class="border-2 my-6" />

                        <div>

                            <div>
                                <p class="block text-sm font-medium">โปรโมชั่นที่ใช้</p>
                                <p></p>
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