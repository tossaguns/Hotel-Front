<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div>
                <!-- หัวข้อ -->
                <div class="mt-2 rounded-t-lg bg-rose-400 p-2 text-white text-lg">
                    <h1>อนุมัติแล้ว</h1>
                </div>

                <!-- ตัวกรองวัน/เดือน/ปี -->
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

                <!-- ตัวกรองชื่อบริษัท -->
                <div class="bg-white my-2 py-4 rounded-lg px-4">
                    <div class="flex flex-row justify-center space-x-5 gap-2">
                        <div class="search-company flex  sm:flex-row items-center space-x-2">
                            <label class="mb-0 text-xs sm:text-base">ค้นหาด้วยชื่อบริษัท</label>
                            <input class="border rounded-md px-2 py-1 text-sm w-auto" />
                        </div>
                        <div>
                            <button
                                class="w-auto sm:w-auto bg-green-500 px-3 py-2 rounded-lg text-white text-xs sm:text-base font-bold hover:bg-green-600">
                                ค้นหา
                            </button>
                        </div>
                    </div>
                </div>

                <!-- ตาราง -->
                <div class="bg-white rounded-lg pb-6 pt-4">
                    <div class="flex justify-center py-4 px-2 text-center">
                        <p class="text-2xl md:text-4xl font-bold text-green-600">รายชื่อ partner</p>
                    </div>
                    <div class="overflow-x-auto px-2">
                        <table class="responsive-table w-full border border-collapse text-xs md:text-sm">
                            <thead>
                                <tr class="bg-gray-200 whitespace-nowrap">
                                    <th class="border px-2 py-1">ลำดับ</th>
                                    <th class="col-logo border px-2 py-1">โลโก้</th>
                                    <th class="border px-2 py-1">ชื่อบริษัท</th>
                                    <th class="border px-2 py-1">ชื่อ</th>
                                    <th class="border px-2 py-1">นามสกุล</th>
                                    <th class="col-email border px-2 py-1">อีเมล</th>
                                    <th class="col-phone border px-2 py-1">เบอร์โทร</th>
                                    <th class="border px-2 py-1">จัดการ</th>
                                    <th class="col-date border px-2 py-1">วัน/เวลาที่อนุมัติ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(partner, index) in paginatedData" :key="partner._id"
                                    class="hover:bg-gray-50 whitespace-nowrap">
                                    <td class="border px-2 py-1 text-center">{{ getRowNumber(index) }}</td>
                                    <td class="col-logo border px-2 py-1 text-center">
                                        <img :src="partner.imagehotelOurdoor"
                                            :alt="partner.companyName + ' imagehotelOurdoor'"
                                            class="w-10 h-10 rounded-full object-cover mx-auto" />
                                    </td>
                                    <td class="border px-2 py-1">{{ partner.companyName }}</td>
                                    <td class="border px-2 py-1">{{ partner.firstname }}</td>
                                    <td class="border px-2 py-1">{{ partner.lastname }}</td>
                                    <td class="col-email border px-2 py-1">{{ partner.email }}</td>
                                    <td class="col-phone border px-2 py-1">{{ partner.phone }}</td>
                                    <td class="border px-2 py-1 text-center">
                                        <button @click="navigateToDetailPartner(partner._id, index + 1, 'approved')"
                                            class="text-blue-600 hover:underline">
                                            ดูข้อมูลเพิ่มเติม
                                        </button>
                                    </td>
                                    <td class="col-date border px-2 py-1 text-center">
                                        {{ partner.approvedAt ? new Date(partner.approvedAt).toLocaleString() : '-' }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="mt-3 flex flex-wrap justify-center gap-2 px-2">
                        <button @click="currentPage--" :disabled="currentPage === 1"
                            class="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50">
                            ย้อนกลับ
                        </button>
                        <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                            class="px-3 py-1 border rounded"
                            :class="{ 'bg-blue-500 text-white': currentPage === page }">
                            {{ page }}
                        </button>
                        <button @click="currentPage++" :disabled="currentPage === totalPages"
                            class="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50">
                            ถัดไป
                        </button>
                    </div>

                    <!-- ปุ่มย้อนกลับ -->
                    <div class="flex justify-center mt-8 px-4">
                        <button @click="navigateBack"
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
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import axios from 'axios'

// Router
const router = useRouter()

// Sidebar
const isSidebarCollapsed = ref(false)
const activeDropdown = ref(null)

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Data
const partnerApplications = ref([])

function getRowNumber(index) {
    return (currentPage.value - 1) * itemsPerPage.value + index + 1
}


// คำนวณจำนวนทั้งหมด
const totalItems = computed(() => partnerApplications.value.length)

// ✅ ป้องกัน NaN หรือค่าไม่ถูกต้อง
const totalPages = computed(() => {
    const pages = Math.ceil(totalItems.value / itemsPerPage.value)
    return isFinite(pages) && pages > 0 ? pages : 1
})

// Pagination: แสดงเฉพาะข้อมูลในหน้านั้น ๆ
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return partnerApplications.value.slice(start, end)
})

// Pagination: ปุ่มเลขหน้า
const visiblePages = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value

    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i)
    } else {
        pages.push(1)
        if (current > 4) pages.push('...')
        const start = Math.max(2, current - 1)
        const end = Math.min(total - 1, current + 1)
        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i)
        }
        if (current < total - 3) pages.push('...')
        if (!pages.includes(total)) pages.push(total)
    }

    return pages
})

// API เรียกข้อมูล partner ที่อนุมัติแล้ว
const getApprovedPartners = async () => {
    try {
        const res = await axios.get('http://localhost:9999/SleepGun/adminApprovePartner/getAllStatus/approved')
        console.log("Approved:", res.data)
        partnerApplications.value = Array.isArray(res.data) ? res.data : []
    } catch (err) {
        console.error("โหลด approved partners ไม่สำเร็จ:", err)
        partnerApplications.value = []
    }
}



function navigateToDetailPartner(id, rowNumber, status) {
    router.push({
        path: `/detailpartnerapprove/${id}`,
        query: {
            index: rowNumber,
            status: status
        }
    })
}


// ปุ่มย้อนกลับ
const navigateBack = () => {
    if (window.history.length > 1) {
        router.go(-1)
    } else {
        router.push('/mainpartner')
    }
}

// Sidebar toggle handler
const handleSidebarToggle = (collapsed) => {
    isSidebarCollapsed.value = collapsed
}

// Lifecycle
onMounted(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
        isSidebarCollapsed.value = JSON.parse(savedState)
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-container')) {
            activeDropdown.value = null
        }
    })

    getApprovedPartners()
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
}

@media (max-width: 768px) {
    .col-email {
        display: none;
    }
}

@media (max-width: 640px) {
    .col-logo {
        display: none;
    }

    .responsive-table th:nth-child(1),
    .responsive-table td:nth-child(1) {
        display: none;
        /* ซ่อนลำดับ */
    }
}
</style>
