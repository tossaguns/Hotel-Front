<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div>
                <div class="mt-2 rounded-t-lg bg-rose-400 p-2 text-white text-lg">
                    <h1>ข้อมูล Member</h1>
                </div>

                <div class="w-full min-h-screen bg-gray-100 py-6 px-2 md:px-4">
                    <div class="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-xl font-bold mb-8 text-center">ข้อมูลพนักงาน</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- ลำดับ -->
                            <div>
                                <p class="block text-sm font-medium">ลำดับ</p>
                                <p></p>
                            </div>


                            <div>
                                <p class="block text-sm font-medium">ชื่อ</p>
                                <p>{{ member.firstName }}</p>
                            </div>
                            <div>
                                <p class="block text-sm font-medium">นามสกุล</p>
                                <p>{{ member.lastName }}</p>
                            </div>


                            <div>
                                <div class="block text-sm font-medium mb-1">เพศ</div>
                                <p>{{ member.sex }}</p>
                            </div>


                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    ชื่อเล่น
                                </div>
                                <p>{{ member.nickName }}</p>
                            </div>

                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    อีเมล
                                </div>
                                <p>{{ member.personalEmail }}</p>
                            </div>

                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    เบอร์โทร
                                </div>
                                <p>{{ member.personalPhone }}</p>
                            </div>

                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    เป็นบุคคลประเภท
                                </div>
                                <p>{{ member.personalType }}</p>
                            </div>

                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    บ้านเลขที่
                                </div>
                                <p>{{ member.personalAddress }}</p>
                            </div>


                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    ตำบล
                                </div>
                                <p>{{ member.personalSubdistrict }}</p>
                            </div>

                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    อำเภอ
                                </div>
                                <p>{{ member.personalDistrict }}</p>
                            </div>

                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    จังหวัด
                                </div>
                                <p>{{ member.personalProvince }}</p>
                            </div>

                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    รหัสไปรษณีย์
                                </div>
                                <p>{{ member.personalPostalCode }}</p>
                            </div>

                            <hr class="border-2 my-6" />

                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    Username
                                </div>
                                <p>{{ member.username }}</p>
                            </div>
                            <div>
                                <div class="block text-sm font-medium mb-1">
                                    Password
                                </div>
                                <p>{{ member.password }}</p>
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
            member: {
                firstName: '',
                lastName: '',
                sex: '',
                nickName: '',
                personalEmail: '',
                personalPhone: '',
                personalType: '',
                personalAddress: '',
                personalSubdistrict: '',
                personalDistrict: '',
                personalProvince: '',
                personalPostalCode: '',
                username: '',
                password: '',
            },

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