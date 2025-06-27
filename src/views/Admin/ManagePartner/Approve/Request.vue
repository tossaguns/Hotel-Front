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
                <!-- หัวข้อ -->
                <div class="mt-2 rounded-t-lg bg-emerald-800 p-2 text-white text-lg">
                    <h1>จัดการคำขออนุมัติ</h1>
                </div>

                <!-- ฟิลเตอร์ วัน/เดือน/ปี -->
                <div class="bg-white rounded-b-lg py-4 px-4">
                    <div class="flex flex-col sm:flex-row justify-center sm:space-x-5 gap-2">
                        <div class="flex items-center justify-between sm:justify-start space-x-2">
                            <p>วัน</p>
                            <select class="border rounded px-2 py-1 text-sm w-full sm:w-auto">
                                <option>ทั้งหมด</option>
                            </select>
                        </div>
                        <div class="flex items-center justify-between sm:justify-start space-x-2">
                            <p>เดือน</p>
                            <select class="border rounded px-2 py-1 text-sm w-full sm:w-auto">
                                <option>ทั้งหมด</option>
                            </select>
                        </div>
                        <div class="flex items-center justify-between sm:justify-start space-x-2">
                            <p>ปี</p>
                            <select class="border rounded px-2 py-1 text-sm w-full sm:w-auto">
                                <option>ทั้งหมด</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- ค้นหาด้วยชื่อบริษัท -->
                <div class="bg-white my-2 py-4 rounded-lg px-4">
                    <div class="flex flex-row justify-center space-x-5 gap-2">
                        <div class="search-company flex  sm:flex-row items-center space-x-2">
                            <label class="mb-0 text-xs sm:text-base">ค้นหาด้วยชื่อบริษัท</label>
                            <input class="border rounded-md px-2 py-1 text-sm w-auto" />
                        </div>
                        <div>
                            <button
                                class="w-auto sm:w-auto bg-emerald-700 px-3 py-2 rounded-lg text-white text-xs sm:text-base font-bold hover:bg-emerald-500">
                                ค้นหา
                            </button>
                        </div>
                    </div>
                </div>

                <!-- ปุ่มเลือกสถานะ -->
                <div class="bg-white mt-2 py-4 rounded-lg px-4">
                    <div class="flex justify-center items-center gap-3 mb-3">
                        <button @click="navigateToApprove"
                            class="rounded-lg w-full sm:w-auto px-4 py-2 text-sm sm:text-lg hover:bg-emerald-500 shadow-md">
                            บริษัทที่อนุมัติแล้ว
                        </button>
                        <p class="hidden sm:inline text-2xl text-gray-400 font-bold">|</p>
                        <button @click="navigateToNoApprove"
                            class="rounded-lg w-full sm:w-auto px-4 py-2 text-sm sm:text-lg hover:bg-emerald-500 shadow-md">
                            บริษัทที่ไม่อนุมัติ
                        </button>
                    </div>



                    <!-- เพิ่ม wrapper -->

                    <div class="overflow-x-auto px-2 ">
                        <table class="responsive-table w-full border border-collapse text-xs md:text-sm ">
                            <thead>
                                <tr class="bg-gray-200 whitespace-nowrap">
                                    <th class="border px-2 py-1">ลำดับ</th>
                                    <th class="col-img border px-2 py-1">รูปที่พักด้านนอก</th>
                                    <th class="border px-2 py-1">ชื่อบริษัท</th>
                                    <th class="col-hotel border px-2 py-1">ชื่อที่พัก</th>
                                    <th class="border px-2 py-1">ชื่อผู้สมัคร</th>
                                    <th class="border px-2 py-1">นามสกุลผู้สมัคร</th>
                                    <th class="col-email border px-2 py-1">อีเมล</th>
                                    <th class="col-phone border px-2 py-1">เบอร์โทร</th>
                                    <th class="col-date border px-2 py-1">วัน/เวลาที่สมัคร</th>
                                    <th class="border px-2 py-1">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(partner, index) in paginatedData" :key="partner._id"
                                    class="hover:bg-gray-50 whitespace-nowrap">
                                    <td class="border px-2 py-1 break-words">{{ getRowNumber(index) }}</td>
                                    <td class="col-img border px-2 py-1 break-words">
                                        <img :src="partner.imagehotelOurdoor"
                                            :alt="partner.companyName + 'imagehotelOurdoor'"
                                            class="w-10 h-10 rounded-full object-cover">
                                    </td>
                                    <td class="border px-2 py-1 break-words">{{
                                        partner.companyName }}</td>
                                    <td class="col-hotel border px-2 py-1 break-words">{{
                                        partner.hotelName }}</td>
                                    <td class="border px-2 py-1 break-words">{{ partner.firstname
                                        }}</td>
                                    <td class="border px-2 py-1 break-words">{{ partner.lastname
                                        }}</td>


                                    <td class="col-email border px-2 py-1 break-words">{{ partner.email }}
                                    </td>
                                    <td class="col-phone border px-2 py-1 break-words">{{ partner.phone }}
                                    </td>
                                    <td class="col-date border px-2 py-1 break-words">{{ partner.updatedAt }}
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
                    <div class="mt-3 flex flex-wrap justify-center gap-2 px-4">
                        <button @click="currentPage--" :disabled="currentPage === 1"
                            class="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50">
                            ย้อนกลับ
                        </button>
                        <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                            class="px-3 py-1 border rounded"
                            :class="{ 'bg-emerald-500 text-white': currentPage === page }">
                            {{ page }}
                        </button>
                        <button @click="currentPage++" :disabled="currentPage === totalPages"
                            class="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50">
                            ถัดไป
                        </button>
                    </div>

                    <!-- ปุ่มย้อนกลับ -->
                    <div class="flex justify-center mt-8 px-4">
                        <button @click="navigateBackToMainPartner"
                            class="text-white bg-red-700 px-3 py-2 rounded-lg hover:bg-red-500">
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
<style>
.responsive-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.responsive-table th,
.responsive-table td {
    border: 1px solid #ccc;
    padding: 6px;
    text-align: center;
}

/* ✅ ซ่อนคอลัมน์เมื่อหน้าจอเล็ก */
@media (max-width: 1024px) {
    .col-date {
        display: none;
    }
}

@media (max-width: 900px) {
    .col-phone {
        display: none;
    }

    .col-img {
        display: none;
    }
}

@media (max-width: 768px) {
    .col-email {
        display: none;
    }
}

@media (max-width: 640px) {
    .col-hotel {
        display: none;
    }

    .responsive-table th:nth-child(1),
    .responsive-table td:nth-child(1) {
        display: none;
        /* ซ่อนลำดับ */
    }
}
</style>
