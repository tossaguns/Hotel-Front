<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div>
                <div class="mb-6">
                    <p class="text-2xl font-bold text-gray-800">คำขอสมัคร Partner</p>
                </div>

                <div class="space-x-5">
                    <button @click="navigateToApprove" class="bg-green-300">อนุมัติเเล้ว</button>
                    <button @click="navigateToNoApprove" class="bg-red-300">ไม่อนุมัติ</button>
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
                                    วัน/เวลาที่สมัคร</th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    </th>
                                <th
                                    class="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(partner, index) in paginatedData" :key="partner.id" class="hover:bg-gray-50">
                                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ getRowNumber(index) }}</td>
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
                                <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ partner.datetime }}
                                </td>
                                <td class="border border-gray-200 px-4 py-3 text-center">
                                    <div class="relative inline-block dropdown-container">
                                        <button @click.stop="toggleDropdown(partner.id)"
                                            class="p-2 hover:bg-gray-100 rounded-full transition-colors" type="button">
                                            <span class="text-gray-600 text-lg font-bold">⋯</span>
                                        </button>
                                        <div v-if="activeDropdown === partner.id"
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
                                <td class="border border-gray-200 px-4 py-3 text-center">
                                    <div class="flex gap-2 justify-center">
                                        <button @click="approvePartner(partner)"
                                            class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                                            อนุมัติ
                                        </button>
                                        <button @click="disapprovePartner(partner)"
                                            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                                            ไม่อนุมัติ
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="totalPages > 1" class="mt-6 flex justify-center items-center space-x-2">
                    <!-- Previous Button -->
                    <button 
                        @click="changePage(currentPage - 1)"
                        :disabled="currentPage === 1"
                        class="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        ก่อนหน้า
                    </button>

                    <!-- Page Numbers -->
                    <template v-for="page in visiblePages" :key="page">
                        <button 
                            v-if="page !== '...'"
                            @click="changePage(page)"
                            :class="{
                                'bg-blue-500 text-white border-blue-500': page === currentPage,
                                'bg-white text-gray-700 border-gray-300 hover:bg-gray-50': page !== currentPage
                            }"
                            class="px-3 py-2 rounded-md border text-sm font-medium transition-colors">
                            {{ page }}
                        </button>
                        <span v-else class="px-3 py-2 text-gray-500">...</span>
                    </template>

                    <!-- Next Button -->
                    <button 
                        @click="changePage(currentPage + 1)"
                        :disabled="currentPage === totalPages"
                        class="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        ถัดไป
                    </button>
                </div>

                <!-- Results Info -->
                <div v-if="totalPages > 1" class="mt-4 text-center text-sm text-gray-600">
                    แสดง {{ startItem }} - {{ endItem }} จาก {{ totalItems }} รายการ
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
            currentPage: 1,
            itemsPerPage: 10,
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
                    datetime: '5/6/2024 12:00',
                    isApproved: false,
                },
                {
                    id: 2,
                    logo: 'https://via.placeholder.com/40x40/28a745/ffffff?text=X',
                    companyName: 'บริษัท เอ็กซ์วายซี จำกัด',
                    firstName: 'สมหญิง',
                    lastName: 'รักงาน',
                    nickname: 'หญิง',
                    email: 'somying@xyz.com',
                    phone: '082-345-6789',
                    datetime: '5/6/2024 12:00',
                    isApproved: false,
                },
                {
                    id: 3,
                    logo: 'https://via.placeholder.com/40x40/dc3545/ffffff?text=T',
                    companyName: 'บริษัท เทคโนโลยี จำกัด',
                    firstName: 'สมศักดิ์',
                    lastName: 'มั่นใจ',
                    nickname: 'โอ๋',
                    email: 'somsak@tech.com',
                    phone: '083-456-7890',
                    datetime: '5/6/2024 12:00',
                    isApproved: false,
                },
                ...Array.from({ length: 12 }, (_, i) => ({
                    id: i + 1,
                    logo: `https://via.placeholder.com/40x40/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${String.fromCharCode(65 + (i % 26))}`,
                    companyName: `บริษัท ตัวอย่าง ${i + 1} จำกัด`,
                    firstName: `ชื่อ${i + 1}`,
                    lastName: `นามสกุล${i + 1}`,
                    nickname: `เล่น${i + 1}`,
                    email: `example${i + 1}@company.com`,
                    phone: `08${i + 1}-000-0000`,
                    datetime: '5/6/2024 12:00',
                    isApproved: false,
                }))
            ]
        }
    },
    computed: {
        totalItems() {
            return this.partnerApplications.length
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage)
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage
            const end = start + this.itemsPerPage
            return this.partnerApplications.slice(start, end)
        },
        startItem() {
            return (this.currentPage - 1) * this.itemsPerPage + 1
        },
        endItem() {
            const end = this.currentPage * this.itemsPerPage
            return end > this.totalItems ? this.totalItems : end
        },
        visiblePages() {
            const pages = []
            const totalPages = this.totalPages
            const current = this.currentPage
            
            if (totalPages <= 7) {
                // แสดงทุกหน้าถ้ามีน้อยกว่าหรือเท่ากับ 7 หน้า
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                // แสดงหน้าแรก
                pages.push(1)
                
                if (current > 4) {
                    pages.push('...')
                }
                
                // แสดงหน้าใกล้เคียงกับหน้าปัจจุบัน
                const start = Math.max(2, current - 1)
                const end = Math.min(totalPages - 1, current + 1)
                
                for (let i = start; i <= end; i++) {
                    if (!pages.includes(i)) {
                        pages.push(i)
                    }
                }
                
                if (current < totalPages - 3) {
                    pages.push('...')
                }
                
                // แสดงหน้าสุดท้าย
                if (!pages.includes(totalPages)) {
                    pages.push(totalPages)
                }
            }
            
            return pages
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateToApprove() {
            this.$router.push("/approvepartner");
        },
        navigateToNoApprove() {
            this.$router.push("/noapprovepartner");
        },
        navigateBackToMainPartner() {
            this.$router.push("/mainpartner");
        },
        toggleDropdown(id) {
            this.activeDropdown = this.activeDropdown === id ? null : id
        },
        getDropdownPosition(index) {
            const isNearBottom = index >= this.paginatedData.length - 2

            if (isNearBottom) {
                return 'bottom-full mb-1'
            } else {
                return 'top-full mt-1'
            }
        },
        getRowNumber(index) {
            return (this.currentPage - 1) * this.itemsPerPage + index + 1
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page
                this.activeDropdown = null // ปิด dropdown เมื่อเปลี่ยนหน้า
            }
        },
        viewDetails(partner) {
            console.log('ดูข้อมูลเพิ่มเติม:', partner)
            this.activeDropdown = null
        },
        editPartner(partner) {
            console.log('แก้ไขข้อมูล:', partner)
            this.activeDropdown = null
        },
        approvePartner(partner) {
            partner.isApproved = true
            partner.status = 'approved'
            console.log('อนุมัติ Partner:', partner.companyName)
        },
        disapprovePartner(partner) {
            partner.isApproved = false
            partner.status = 'disapproved'
            console.log('ไม่อนุมัติ Partner:', partner.companyName)
        }
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                this.activeDropdown = null
            }
        })
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }
}
</script>