<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div>
                <div class="mb-6">
                    <p class="text-2xl font-bold text-gray-800">ไม่อนุมัติ Partner</p>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    ลำดับ</th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    โลโก้</th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    ชื่อบริษัท</th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    ชื่อ</th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    นามสกุล</th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    ชื่อเล่น</th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    อีเมล</th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    เบอร์โทร</th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    จัดการ</th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    วัน/เวลาทำการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- ข้อมูลตัวอย่าง 3 รายการ -->
                            <tr v-for="(partner, index) in partnerApplications" :key="index" class="hover:bg-gray-50">
                                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ index + 1 }}</td>
                                <td class="border border-gray-200 px-4 py-3">
                                    <img :src="partner.logo" :alt="partner.companyName + ' logo'"
                                        class="w-10 h-10 rounded-full object-cover">
                                </td>
                                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{
                                    partner.companyName }}</td>
                                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ partner.firstName
                                }}</td>
                                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ partner.lastName
                                }}</td>
                                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ partner.nickname
                                }}</td>
                                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ partner.email }}
                                </td>
                                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ partner.phone }}
                                </td>
                                <td class="border border-gray-200 px-4 py-3 text-center">
                                    <div class="relative inline-block dropdown-container">
                                        <button @click.stop="toggleDropdown(index)"
                                            class="p-2 hover:bg-gray-100 rounded-full transition-colors" type="button">
                                            <span class="text-gray-600 text-lg font-bold">⋯</span>
                                        </button>
                                        <div v-if="activeDropdown === index"
                                            class="absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                                            :class="getDropdownPosition(index)">
                                            <button @click.stop="viewDetails(partner)"
                                                class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                                ดูข้อมูลเพิ่มเติม
                                            </button>
                                            <button @click.stop="editPartner(partner)"
                                                class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors border-t border-gray-100">
                                                แก้ไข
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{
                                    partner.datetime }}</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-8">
                    <button @click="navigateBackToMainPartner"
                        class="bg-red-300 hover:bg-red-400 text-red-800 px-6 py-2 rounded-lg font-medium transition-colors">
                        ย้อนกลับ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'

export default {
    name: "MainPartner",
    components: {
        SidebarAdmin
    },
    data() {
        return {
            isSidebarCollapsed: false,
            activeDropdown: null,
            partnerApplications: [
                {
                    id: 1,
                    logo: 'https://via.placeholder.com/40x40/007bff/ffffff?text=A',
                    companyName: 'บริษัท เอบีซี จำกัด',
                    firstName: 'สมชาย',
                    lastName: 'ใจดี',
                    nickname: 'ชาย',
                    email: 'somchai@abc.com',
                    phone: '081-234-5678',
                    isApproved: false,
                    status: 'pending',
                    datetime: '6/5/85 13:00',
                },
            ]
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateBackToMainPartner() {
            this.$router.push("/request");
        },
        toggleDropdown(index) {
            this.activeDropdown = this.activeDropdown === index ? null : index
        },
        getDropdownPosition(index) {
            // ตรวจสอบว่าเป็นแถวล่างสุดหรือไม่ (แถวสุดท้าย 2 แถว)
            const isNearBottom = index >= this.partnerApplications.length - 2

            if (isNearBottom) {
                // แสดง dropdown ด้านบน
                return 'bottom-full mb-1'
            } else {
                // แสดง dropdown ด้านล่าง (ปกติ)
                return 'top-full mt-1'
            }
        },
        viewDetails(partner) {
            console.log('ดูข้อมูลเพิ่มเติม:', partner)
            this.activeDropdown = null
            // เพิ่มการนำทางไปหน้าแสดงรายละเอียด
            // this.$router.push(`/partner/${partner.id}/details`)
        },
        editPartner(partner) {
            console.log('แก้ไขข้อมูล:', partner)
            this.activeDropdown = null
            // เพิ่มการนำทางไปหน้าแก้ไข
            // this.$router.push(`/partner/${partner.id}/edit`)
        },
        
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }

        // ปิด dropdown เมื่อคลิกข้างนอก
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                this.activeDropdown = null
            }
        })
    },
    beforeUnmount() {
        // ลบ event listener เมื่อ component ถูกทำลาย
        document.removeEventListener('click', this.handleClickOutside)
    }
}
</script>