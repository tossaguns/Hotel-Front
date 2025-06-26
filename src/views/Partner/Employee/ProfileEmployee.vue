<template>
    <div class="w-full min-h-screen bg-gray-200">
        <BarEmployee @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[240px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <!-- หัวข้อ -->
            <div class="bg-gray-800 p-2 text-white text-lg rounded-t-[32px]">
                <h1 class="pl-2">โปรไฟล์</h1>
            </div>
            <div class="flex flex-col w-full bg-white max-h-screen overflow-hidden p-6 md:p-4">

                <!-- ข้อมูลพนักงาน -->
                <div class="flex flex-col md:flex-row items-center mb-3 gap-3 text-black text-sm md:text-base w-full">
                    <div class="md:w-1/3 flex justify-center mb-3 md:mb-0">
                        <img :src="employee.imageUrl" alt="profile image"
                            class="sm:w-32 sm:h-32 w-20 h-20 rounded-full object-cover border" />
                    </div>
                    <div class="w-full md:w-2/3">
                        <div class="flex justify-center md:justify-start mb-2">
                            <span
                                class="inline-block bg-gray-600 text-white rounded-full px-3 py-1 text-xs sm:text-sm">
                                ตำแหน่ง {{ employee.positionEmployee }}
                            </span>
                        </div>
                        <p class="text-xs sm:text-xl font-bold py-1">ชื่อ {{ employee.firstname }}</p>
                        <p class="text-xs sm:text-xl font-bold py-1">นามสกุล {{ employee.lastname }}</p>
                        <div>
                            <div class="flex flex-wrap text-sm">
                                <p><span class="text-gray-400">รหัสพนักงาน : </span>{{ employee.employeeCode }}</p>
                                <p class="ml-5"><span class="text-gray-400">ชื่อเล่น : </span>{{ employee.nickname }}
                                </p>
                            </div>
                            <div class="flex flex-wrap text-sm">
                                <p><span class="text-gray-400">เบอร์โทร : </span>{{ employee.phone }}</p>
                                <p class="ml-5"><span class="text-gray-400">อีเมล : </span>{{ employee.email }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ปุ่มเปลี่ยนโหมด -->
                <div class="flex justify-end mb-4 space-x-2 hidden md:flex">
                    <button @click="viewMode = 'table'"
                        :class="viewMode === 'table' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'"
                        class="px-4 py-2 rounded">
                        ตาราง
                    </button>
                    <button @click="viewMode = 'block'"
                        :class="viewMode === 'block' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'"
                        class="px-4 py-2 rounded">
                        บล็อก
                    </button>
                </div>

                <!-- ตารางข้อมูลเข้างาน -->
                <div class="w-full bg-stone-100 pt-3 overflow-auto border rounded-xl">
                    <div class="rounded-[30px] p-4 bg-gray-400 mx-2">

                        <!-- โหมดตาราง -->
                        <div v-if="viewMode === 'table'" class="flex-1 overflow-auto">
                            <table class="min-w-max border-separate border-spacing-y-1 w-full text-sm text-center">
                                <thead>
                                    <tr class="text-black">
                                        <th class="p-2">วันที่</th>
                                        <th class="p-2">เวลา</th>
                                        <th class="p-2">รหัสพนักงาน</th>
                                        <th class="p-2">ชื่อ-นามสกุล</th>
                                    </tr>
                                </thead>
                                <tbody v-if="paginatedRecords.length > 0">
                                    <tr v-for="(record, index) in paginatedRecords" :key="record.id"
                                        :class="['bg-white', record.justAdded ? 'bounce-glow-animation' : '']">
                                        <td class="p-2">{{ record.dateLogin }}</td>
                                        <td class="p-2">{{ record.timeLogin }}</td>
                                        <td class="p-2">{{ record.numberid }}</td>
                                        <td class="p-2">{{ record.name }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="5" class="text-center text-gray-500 py-6 text-lg">
                                            ไม่มีข้อมูลการเข้างาน
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- โหมดบล็อก -->
                        <div v-if="viewMode === 'block'"
                            class="overflow-auto w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-full px-2">

                            <div v-for="(record, index) in paginatedRecords" :key="record.id"
                                class="bg-white rounded-2xl shadow-md p-4 border border-gray-200 relative transition hover:shadow-lg"
                                :class="record.justAdded ? 'bounce-glow-animation' : ''">

                                <!-- Header -->
                                <div class="flex items-center justify-between mb-2">
                                    <h4 class="text-sm font-semibold text-emerald-800">รหัสพนักงาน: {{ record.numberid }}
                                    </h4>
                                </div>
                                <span class="text-xs text-gray-400">{{ record.dateLogin }} | {{ record.timeLogin
                                    }}</span>

                                <!-- Name -->
                                <p class="text-base font-bold text-gray-800 mb-1">{{ record.name }}</p>

                                <!-- Footer label -->
                                <p class="text-xs text-gray-500">บันทึกการเข้างาน</p>
                            </div>

                            <div v-if="paginatedRecords.length === 0"
                                class="col-span-full text-center text-gray-500 py-6 text-lg">
                                ไม่มีข้อมูลการเข้างาน
                            </div>
                        </div>

                        <div class="mt-4 flex justify-center flex-wrap gap-2 px-2">
                            <!-- ปุ่มย้อนกลับ -->
                            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="border rounded hover:bg-gray-200 disabled:opacity-50
           text-xs sm:text-sm px-2 sm:px-3 py-1">
                                ย้อนกลับ
                            </button>

                            <!-- ปุ่มเลขหน้า -->
                            <button v-for="page in totalPages" :key="'page-button-' + page" @click="goToPage(page)"
                                :class="[
                                    'border rounded text-xs sm:text-sm px-2 sm:px-3 py-1',
                                    page === currentPage
                                        ? 'bg-gray-800 text-white hover:bg-gray-600'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-400'
                                ]">
                                {{ page }}
                            </button>

                            <!-- ปุ่มถัดไป -->
                            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="border rounded hover:bg-gray-200 disabled:opacity-50
           text-xs sm:text-sm px-2 sm:px-3 py-1">
                                ถัดไป
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BarEmployee from '@/components/BarEmployee.vue'

export default {
    name: 'MainHotelForEmployee',
    components: {
        BarEmployee
    },
    data() {
        return {
            isSidebarCollapsed: false,
            employee: {
                imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
                positionEmployee: 'เจ้าหน้าที่ไอที',
                firstname: 'กิตติ',
                lastname: 'ใจดี',
                employeeCode: 'EMP002',
                nickname: 'กิต',
                phone: '0891234567',
                email: 'kitti@example.com',
            },
            allRecords: [
                {
                    id: 1,
                    dateLogin: '2025-06-24',
                    timeLogin: '09:00',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
                {
                    id: 2,
                    dateLogin: '2025-06-23',
                    timeLogin: '09:02',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
                {
                    id: 3,
                    dateLogin: '2025-06-22',
                    timeLogin: '08:59',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
                {
                    id: 4,
                    dateLogin: '2025-06-22',
                    timeLogin: '08:59',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
                {
                    id: 5,
                    dateLogin: '2025-06-22',
                    timeLogin: '08:55',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
                {
                    id: 6,
                    dateLogin: '2025-06-22',
                    timeLogin: '08:40',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
                {
                    id: 7,
                    dateLogin: '2025-06-22',
                    timeLogin: '08:59',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
                {
                    id: 8,
                    dateLogin: '2025-06-22',
                    timeLogin: '08:59',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
                {
                    id: 9,
                    dateLogin: '2025-06-22',
                    timeLogin: '08:59',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
                {
                    id: 10,
                    dateLogin: '2025-06-22',
                    timeLogin: '08:59',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
                {
                    id: 11,
                    dateLogin: '2025-06-22',
                    timeLogin: '08:59',
                    numberid: 'EMP002',
                    name: 'กิตติ ใจดี',
                },
            ],
            viewMode: 'table',
            currentPage: 1,
            perPage: 10,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.allRecords.length / this.perPage);
        },
        paginatedRecords() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.allRecords.slice(start, start + this.perPage);
        },
    },
    methods: {
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
    },
    mounted() {
        // เช็คสถานะ sidebar เริ่มต้นจาก localStorage หรือ default
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
};
</script>
<style scoped>
</style>