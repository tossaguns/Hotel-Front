<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div>
                <div class="mt-2 rounded-t-lg bg-rose-400 p-2 text-white text-lg">
                    <h1>จัดการคำขออนุมัติ</h1>
                </div>

                <div class="bg-white rounded-b-lg py-4 px-2">

                    <div class="flex justify-center space-x-5 mb-2">
                        <div class="flex space-x-2">
                            <p>วัน</p>
                            <dropdown class="border "></dropdown>
                        </div>
                        <div class="flex space-x-2">
                            <p>เดือน</p>
                            <dropdown class="border "></dropdown>
                        </div>
                        <div class="flex space-x-2">
                            <p>ปี</p>
                            <dropdown class="border "></dropdown>
                        </div>
                    </div>
                </div>



                <div class="flex justify-center space-x-5 mb-2 bg-white mt-2 py-4 rounded-lg px-2">
                    <div class="flex space-x-2">
                        <p>ค้นหาด้วยชื่อบริษัท</p>
                        <input class="border rounded-md" />
                    </div>
                    <div>
                        <button class="bg-green-500 px-3 py-1 rounded-lg text-white font-bold hover:bg-green-600">
                            ค้นหา</button>
                    </div>

                </div>

                <div class="bg-white rounded-lg pb-6">
                    <div class="flex justify-center pt-7 mb-5">
                        <button @click="navigateToApprove"
                            class="rounded-lg px-2 py- text-lg hover:bg-rose-300 shadow-lg">บริษัทที่อนุมัติเเล้ว
                        </button>
                        <p class="text-2xl px-2 text-gray-400 font-bold">|</p>
                        <button @click="navigateToNoApprove"
                            class="rounded-lg px-2 py-1 text-lg hover:bg-rose-300 shadow-lg">บริษัทที่ไม่อนุมัติ</button>
                    </div>

                    <!-- เพิ่ม wrapper -->

                    <div class="overflow-x-auto px-2 ">
                        <table class="w-full border border-collapse text-xs md:text-sm ">
                            <thead>
                                <tr class="bg-gray-200 whitespace-nowrap">
                                    <th class="border px-2 py-1">ลำดับ</th>
                                    <th class="border px-2 py-1">โลโก้บริษัท</th>
                                    <th class="border px-2 py-1">ชื่อบริษัท</th>
                                    <th class="border px-2 py-1">ชื่อ</th>
                                    <th class="border px-2 py-1">นามสกุล</th>
                                    <th class="border px-2 py-1">ชื่อเล่น</th>
                                    <th class="border px-2 py-1">อีเมล</th>
                                    <th class="border px-2 py-1">เบอร์โทร</th>
                                    <th class="border px-2 py-1">วัน/เวลาที่สมัคร</th>
                                    <th class="border px-2 py-1">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(partner, index) in paginatedData" :key="partner.id"
                                    class="hover:bg-gray-50 whitespace-nowrap">
                                    <td class="border px-2 py-1 break-words">{{ getRowNumber(index) }}</td>
                                    <td class="border px-2 py-1 break-words">
                                        <img :src="partner.logo" :alt="partner.companyName + ' logo'"
                                            class="w-10 h-10 rounded-full object-cover">
                                    </td>
                                    <td class="border px-2 py-1 break-words">{{
                                        partner.companyName }}</td>
                                    <td class="border px-2 py-1 break-words">{{ partner.firstName
                                    }}</td>
                                    <td class="border px-2 py-1 break-words">{{ partner.lastName
                                    }}</td>
                                    <td class="border px-2 py-1 break-words">{{ partner.nickname
                                    }}</td>
                                    <td class="border px-2 py-1 break-words">{{ partner.email }}
                                    </td>
                                    <td class="border px-2 py-1 break-words">{{ partner.phone }}
                                    </td>
                                    <td class="border px-2 py-1 break-words">{{ partner.updatedAt }}
                                    </td>

                                    <td class="border px-2 py-1 break-words">
                                        <div class="flex gap-2 justify-center">
                                            <button @click="toggleApproveForm(partner.id)"
                                                class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                                                อนุมัติ
                                            </button>
                                            <button @click="disapprovePartner(partner)"
                                                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                                                ไม่อนุมัติ
                                            </button>
                                            <button @click="navigateToDetailPartnerAdmin"
                                                class="bg-blue-300 rounded-full text-sm px-2">ข้อมูลเพิ่มเติม</button>
                                        </div>

                                        <div v-if="activeApproveId === partner.id" class="mt-2 space-y-1 text-left">
                                            <label class="block">
                                                <span class="text-sm">Username:</span>
                                                <input type="text" v-model="credentials.username"
                                                    class="border px-2 py-1 rounded w-full text-sm" />
                                            </label>
                                            <label class="block">
                                                <span class="text-sm">Password:</span>
                                                <input type="password" v-model="credentials.password"
                                                    class="border px-2 py-1 rounded w-full text-sm" />
                                            </label>
                                            <button @click="submitApprove(partner)"
                                                class="bg-blue-500 hover:bg-blue-600 text-white mt-1 px-3 py-1 rounded text-sm">
                                                ยืนยันการอนุมัติ
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            </tbody>

                        </table>

                    </div>

                    <!-- Pagination -->
                    <div class="mt-3 flex justify-center gap-2">
                        <button @click="currentPage--" :disabled="currentPage === 1"
                            class="px-3 py-1 border rounded hover:bg-gray-200">
                            ย้อนกลับ
                        </button>
                        <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                            class="px-3 py-1 border rounded"
                            :class="{ 'bg-blue-500 text-white': currentPage === page }">
                            {{ page }}
                        </button>
                        <button @click="currentPage++" :disabled="currentPage === totalPages"
                            class="px-3 py-1 border rounded hover:bg-gray-200">
                            ถัดไป
                        </button>
                    </div>

                    <div class="flex justify-center mt-8">
                        <button @click="navigateBackToMainPartner"
                            class="text-white bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600">
                            ย้อนกลับ
                        </button>
                    </div>
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
                    id: '',
                    logo: '',
                    companyName: '',
                    firstName: '',
                    lastName: '',
                    nickname: '',
                    email: '',
                    phone: '',
                    datetime: '',
                    isApproved: null,
                },
            ],
            activeApproveId: null,
            credentials: {
                username: '',
                password: ''
            }
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
        navigateToDetailPartnerAdmin() {
            this.$router.push("/detailpartnerall");
        },
        navigateBackToMainPartner() {
            this.$router.push("/mainpartner");
        },

        getRowNumber(index) {
            return (this.currentPage - 1) * this.itemsPerPage + index + 1
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page
            }
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
        },
        toggleApproveForm(partnerId) {
            this.activeApproveId = this.activeApproveId === partnerId ? null : partnerId
            this.credentials = { username: '', password: '' }
        },

        submitApprove(partner) {
            if (!this.credentials.username || !this.credentials.password) {
                alert('กรุณากรอก Username และ Password')
                return
            }
            partner.isApproved = true
            partner.status = 'approved'

            console.log('อนุมัติ Partner:', partner.companyName)
            console.log('Username:', this.credentials.username)
            console.log('Password:', this.credentials.password)


            this.activeApproveId = null
            this.credentials = { username: '', password: '' }
        }

    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }
}
</script>