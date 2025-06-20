<template>
    FIXME: เพิ่มช่องสถานะ โดยจะเก็บสถานนะของ partner ที่ทำการเเก้ไข เเสดงว่า กำลังเเก้ไข/เเก้ไขเสร็จสิ้น เวลา... เมื่อ
    Partner เเก้ไขเสร็จ

    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 transition-all duration-300 pt-16 md:pt-3 md:pl-3" :class="{
            'md:ml-[240px]': !isSidebarCollapsed,
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
                                    <th class="border px-2 py-1">รูปที่พักด้านนอก</th>
                                    <th class="border px-2 py-1">ชื่อบริษัท</th>
                                    <th class="border px-2 py-1">ชื่อที่พัก</th>
                                    <th class="border px-2 py-1">ชื่อผู้สมัคร</th>
                                    <th class="border px-2 py-1">นามสกุลผู้สมัคร</th>
                                    <th class="border px-2 py-1">อีเมล</th>
                                    <th class="border px-2 py-1">เบอร์โทร</th>
                                    <th class="border px-2 py-1">วัน/เวลาที่สมัคร</th>
                                    <th class="border px-2 py-1">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(partner, index) in paginatedData" :key="partner._id"
                                    class="hover:bg-gray-50 whitespace-nowrap">
                                    <td class="border px-2 py-1 break-words">{{ getRowNumber(index) }}</td>
                                    <td class="border px-2 py-1 break-words">
                                        <img :src="partner.imagehotelOurdoor"
                                            :alt="partner.companyName + 'imagehotelOurdoor'"
                                            class="w-10 h-10 rounded-full object-cover">
                                    </td>
                                    <td class="border px-2 py-1 break-words">{{
                                        partner.companyName }}</td>
                                    <td class="border px-2 py-1 break-words">{{
                                        partner.hotelName }}</td>
                                    <td class="border px-2 py-1 break-words">{{ partner.firstname
                                        }}</td>
                                    <td class="border px-2 py-1 break-words">{{ partner.lastname
                                        }}</td>


                                    <td class="border px-2 py-1 break-words">{{ partner.email }}
                                    </td>
                                    <td class="border px-2 py-1 break-words">{{ partner.phone }}
                                    </td>
                                    <td class="border px-2 py-1 break-words">{{ partner.updatedAt }}
                                    </td>

                                    <td class="border px-2 py-1 break-words">
                                        <div class="flex gap-2 justify-center">

                                            <button @click="navigateToDetailPartnerAdmin(partner._id, index + 1)"
                                                class="bg-blue-300 rounded-full text-sm px-2 py-2">ข้อมูลเพิ่มเติม</button>
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SidebarAdmin from '@/components/SidebarAdmin.vue'

const router = useRouter()
const isSidebarCollapsed = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10
const partnerApplications = ref([])

function handleSidebarToggle(value) {
    isSidebarCollapsed.value = value
}

function getRowNumber(index) {
    return (currentPage.value - 1) * itemsPerPage + index + 1
}

function navigateToDetailPartnerAdmin(id, index) {
    router.push({
        path: `/detailpartnerall/${id}`,
        query: { index }
    })
}

function navigateBackToMainPartner() {
    router.push('/mainpartner')
}

const totalItems = computed(() => partnerApplications.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return partnerApplications.value.slice(start, start + itemsPerPage)
})

onMounted(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
        isSidebarCollapsed.value = JSON.parse(savedState)
    }

    axios.get('http://localhost:9999/SleepGun/adminApprovePartner/getAllPendingPartners')
        .then(res => {
            partnerApplications.value = res.data
        })
        .catch(err => {
            console.error('โหลดข้อมูล partner ล้มเหลว:', err)
        })
})
</script>
