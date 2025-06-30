<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">
            <div class="fixed top-0 left-0 right-0 h-4 z-[100] bg-white pointer-events-none"></div>
            <div class="sticky top-4 z-30 rounded-t-lg bg-amber-400 p-2 text-white text-lg">
                <h1>จัดการพนักงาน</h1>
            </div>

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

            <div
                class="flex  flex-row justify-center sm:space-x-5 mb-2 bg-white mt-2 py-4 rounded-lg px-2 gap-2 sm:gap-0">
                <div class="flex items-center space-x-2 text-xs sm:text-sm">
                    <p>ค้นหาด้วยรหัสพนักงาน</p>
                    <input class="border rounded-md px-2 py-1 w-28 sm:w-auto text-xs sm:text-sm" />
                </div>
                <div>
                    <button
                        class="bg-emerald-700 px-3 py-1 rounded-lg text-white font-bold hover:bg-emerald-500 text-xs sm:text-sm">
                        ค้นหา
                    </button>
                </div>
                <div>
                    <button
                        class="bg-red-700 px-3 py-1 rounded-lg text-white font-bold hover:bg-red-500 text-xs sm:text-sm">
                        รายงาน
                    </button>
                </div>
            </div>

            <div class="bg-white rounded-lg pb-6">
                <!-- ปุ่มด้านบน -->
                <div class="flex justify-center pt-7 mb-5 gap-1 sm:gap-3">
                    <button @click="navigateBackToDataEmployee"
                        class="rounded-lg px-2 py-1 text-sm sm:text-lg hover:bg-amber-300 shadow-lg">ดูข้อมูลพนักงาน</button>
                    <p class="text-2xl px-0 sm:px-2 text-gray-400 font-bold">|</p>
                    <button @click="navigateBackToAddEmployee"
                        class="rounded-lg px-2 py-1 text-sm sm:text-lg hover:bg-amber-300 shadow-lg">เพิ่มข้อมูลพนักงาน</button>
                    <p class="text-2xl px-0 sm:px-2 text-gray-400 font-bold">|</p>
                    <button @click="showTable = !showTable"
                        class="rounded-lg px-3 py-1 text-sm sm:text-lg bg-gray-200 hover:bg-amber-300 shadow-lg">
                        {{ showTable ? 'แสดงแบบบล็อก' : 'แสดงแบบตาราง' }}
                    </button>
                </div>

                <!-- ตาราง -->
                <div v-if="showTable" class="overflow-x-auto px-2">
                    <table ref="employeeTable" class="w-full border border-collapse text-xs md:text-sm"
                        :style="tableMinWidthStyle">
                        <thead>
                            <tr class="bg-gray-200 whitespace-nowrap">
                                <th class="border px-2 py-1">ลำดับ</th>
                                <th class="border px-2 py-1">รหัสพนักงาน</th>
                                <th class="border px-2 py-1 relative text-center cursor-pointer select-none"
                                    @click.stop="toggleDropdown($event)" tabindex="0">
                                    ตำแหน่ง
                                    <svg class="w-3 h-3 inline ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.1 1.02l-4.25 4.65a.75.75 0 01-1.1 0L5.25 8.29a.75.75 0 01-.02-1.06z"
                                            clip-rule="evenodd" />
                                    </svg>

                                    <!-- Dropdown Filter -->
                                    <div v-if="showPositionDropdown" ref="positionDropdown"
                                        class="position-dropdown z-50 mt-1 bg-white border shadow-md rounded"
                                        :style="{ position: 'fixed', left: dropdownPosition.left + 'px', top: dropdownPosition.top + 'px', minWidth: dropdownPosition.width + 'px' }"
                                        @click.stop>
                                        <ul>
                                            <li>
                                                <button @click.stop="setPositionFilter('')"
                                                    class="w-full text-left px-3 py-1 text-sm hover:bg-gray-100">ทั้งหมด</button>
                                            </li>
                                            <li v-for="pos in uniquePositions" :key="pos">
                                                <button @click.stop="setPositionFilter(pos)"
                                                    class="w-full text-left px-3 py-1 text-sm hover:bg-gray-100">{{ pos
                                                    }}</button>
                                            </li>
                                        </ul>
                                    </div>
                                </th>
                                <th class="border px-2 py-1">ชื่อ</th>
                                <th class="border px-2 py-1">ชื่อเล่น</th>
                                <th class="border px-2 py-1">เบอร์โทร</th>
                                <th class="border px-2 py-1">อีเมล</th>
                                <th class="border px-2 py-1">วันที่</th>
                                <th class="border px-2 py-1">เวลา</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in paginatedData" :key="index"
                                class="hover:bg-gray-50 whitespace-nowrap">
                                <td class="border px-2 py-1">{{ index + 1 + (currentPage - 1) * perPage }}</td>
                                <td class="border px-2 py-1">{{ item.code }}</td>
                                <td class="border py-1 text-center"><span
                                        class="inline-block px-3 py-1 text-xs font-semibold rounded-full" :class="{
                                            'bg-green-100 text-green-700': item.position === 'พนักงานขาย',
                                            'bg-purple-100 text-purple-700': item.position === 'ผู้จัดการ',
                                            'bg-yellow-100 text-yellow-700': item.position === 'พนักงานต้อนรับ',
                                            'bg-blue-100 text-blue-700': item.position === 'พนักงานครัว',
                                            'bg-red-100 text-red-600': item.position === 'รปภ.',
                                            'bg-cyan-100 text-cyan-600': item.position === 'แม่บ้าน'
                                        }">
                                        {{ item.position }}
                                    </span></td>
                                <td class="border px-2 py-1">{{ item.name }}</td>
                                <td class="border px-2 py-1">{{ item.nickname }}</td>
                                <td class="border px-2 py-1">{{ item.phone }}</td>
                                <td class="border px-2 py-1">{{ item.email }}</td>
                                <td class="border px-2 py-1">{{ item.loginDate }}</td>
                                <td class="border px-2 py-1">{{ item.loginTime }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- บล็อกการ์ด -->
                <div v-else class="grid grid-cols-1 gap-4 px-4">
                    <div v-for="(item, index) in paginatedData" :key="index"
                        class="w-full rounded-xl border bg-gray-100 px-4 pt-2 pb-4 shadow-md">
                        <div class="flex justify-between items-center mb-2">
                            <div class="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2">
                                <span
                                    class="font-semibold bg-blue-600 text-white text-sm sm:text-lg rounded px-2 py-0.5">
                                    {{
                                        item.code }}</span>
                                <span class="text-sm sm:text-lg">{{ item.name }}</span>
                                <span class="text-sm">({{ item.nickname }})</span>
                            </div>
                            <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full" :class="{
                                'bg-green-100 text-green-700': item.position === 'พนักงานขาย',
                                'bg-purple-100 text-purple-700': item.position === 'ผู้จัดการ',
                                'bg-yellow-100 text-yellow-700': item.position === 'พนักงานต้อนรับ',
                                'bg-blue-100 text-blue-700': item.position === 'พนักงานครัว',
                                'bg-red-100 text-red-600': item.position === 'รปภ.',
                                'bg-cyan-100 text-cyan-600': item.position === 'แม่บ้าน'
                            }">
                                {{ item.position }}
                            </span>
                        </div>
                        <div
                            class="flex flex-col-2 text-gray-700 border border-gray-200 rounded-md overflow-hidden text-center">

                            <!-- วันที่ -->
                            <div class="flex flex-col items-center border-r border-b border-gray-200 p-3 flex-1">
                                <div class="text-sm font-semibold text-black border-b border-gray-300 w-full pb-1 mb-2">
                                    วันที่
                                </div>
                                <div class="text-base text-gray-800">
                                    {{ item.loginDate }}
                                </div>
                            </div>

                            <!-- เวลา -->
                            <div class="flex flex-col items-center border-b border-gray-200 p-3 flex-1">
                                <div class="text-sm font-semibold text-black border-b border-gray-300 w-full pb-1 mb-2">
                                    เวลา
                                </div>
                                <div class="text-base text-gray-800">
                                    {{ item.loginTime }}
                                </div>
                            </div>

                        </div>
                        <div class="mt-2 text-sm text-gray-600">ข้อมูลติดต่อ</div>
                        <div class="flex sm:flex-col space-x-2 mt-1">
                            <div class="text-sm text-gray-500">{{ item.phone }}</div>
                            <div class="text-sm text-gray-500">{{ item.email }}</div>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="mt-3 flex justify-center gap-2">
                    <button @click="currentPage--" :disabled="currentPage === 1"
                        class="px-3 py-1 border rounded hover:bg-gray-200">ย้อนกลับ</button>
                    <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                        class="px-3 py-1 border rounded" :class="{ 'bg-amber-500 text-white': currentPage === page }">{{
                            page }}</button>
                    <button @click="currentPage++" :disabled="currentPage === totalPages"
                        class="px-3 py-1 border rounded hover:bg-gray-200">ถัดไป</button>
                </div>
            </div>
            <div class="fixed bottom-0 left-0 right-0 h-4 z-[40] bg-gray-100 pointer-events-none md:hidden"></div>
        </div>

    </div>
</template>
<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "MainHotelRoom",
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarCollapsed: false,
            allData: [],
            currentPage: 1,
            perPage: 10,
            showTable: true,
            positionFilter: '',
            showPositionDropdown: false,
            tableMinWidth: null,
            dropdownPosition: { left: 0, top: 0, width: 0 },
        }
    },
    computed: {
        tableMinWidthStyle() {
            return this.tableMinWidth ? { minWidth: this.tableMinWidth + 'px' } : {};
        },
        totalPages() {
            // return Math.ceil(this.allData.length / this.perPage);
            return Math.ceil(this.filteredData.length / this.perPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            // return this.allData.slice(start, end);
            return this.filteredData.slice(start, end);
        },
        startIndex() {
            return (this.currentPage - 1) * this.perPage;
        },

        uniquePositions() {
            const positions = this.allData.map(item => item.position);
            return [...new Set(positions)];
        },
        filteredData() {
            if (!this.positionFilter) return this.allData;
            return this.allData.filter(item => item.position === this.positionFilter);
        },
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateBackToDataEmployee() {
            this.$router.push("/employeelist");
        },
        navigateBackToAddEmployee() {
            this.$router.push("/addemployee");
        },
        toggleDropdown(event) {
            this.showPositionDropdown = !this.showPositionDropdown;
            this.$nextTick(() => {
                if (this.showPositionDropdown) {
                    // คำนวณตำแหน่ง header cell
                    const th = event ? event.currentTarget : this.$el.querySelector('th[tabindex="0"]');
                    if (th) {
                        const rect = th.getBoundingClientRect();
                        this.dropdownPosition = {
                            left: rect.left,
                            top: rect.bottom,
                            width: rect.width
                        };
                    }
                    document.addEventListener('click', this.handleOutsideClick);
                } else {
                    document.removeEventListener('click', this.handleOutsideClick);
                }
            });
        },
        handleOutsideClick(e) {
            if (!this.$refs.positionDropdown || !this.$refs.employeeTable) return;
            if (!this.$refs.positionDropdown.contains(e.target) && !this.$refs.employeeTable.contains(e.target)) {
                this.showPositionDropdown = false;
                this.resetTableMinWidth();
                document.removeEventListener('click', this.handleOutsideClick);
            }
        },
        adjustTableMinWidth() {
            this.$nextTick(() => {
                const dropdown = this.$refs.positionDropdown;
                const table = this.$refs.employeeTable;
                if (dropdown && table) {
                    const dropdownWidth = dropdown.offsetWidth;
                    const tableWidth = table.offsetWidth;
                    if (dropdownWidth > tableWidth) {
                        this.tableMinWidth = dropdownWidth;
                    }
                }
            });
        },
        resetTableMinWidth() {
            this.tableMinWidth = null;
        },
        setPositionFilter(position) {
            this.positionFilter = position
            this.showPositionDropdown = false
            this.currentPage = 1
        },
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    created() {
        this.allData = [
            {
                code: "EMP001",
                position: "พนักงานต้อนรับ",
                name: "สมชาย ใจดี",
                nickname: "ชาย",
                phone: "0812345678",
                email: "somchai@example.com",
                loginDate: "2025-06-01",
                loginTime: "09:00"
            },
            {
                code: "EMP002",
                position: "แม่บ้าน",
                name: "สมหญิง นุ่มนวล",
                nickname: "หญิง",
                phone: "0823456789",
                email: "somying@example.com",
                loginDate: "2025-06-01",
                loginTime: "09:15"
            },
            {
                code: "EMP003",
                position: "รปภ.",
                name: "สายฟ้า ปลอดภัย",
                nickname: "ฟ้า",
                phone: "0834567890",
                email: "saifa@example.com",
                loginDate: "2025-06-01",
                loginTime: "08:50"
            },
            {
                code: "EMP004",
                position: "ผู้จัดการ",
                name: "พรเทพ บริหารดี",
                nickname: "เทพ",
                phone: "0845678901",
                email: "porntep@example.com",
                loginDate: "2025-06-01",
                loginTime: "08:30"
            },
            {
                code: "EMP005",
                position: "พนักงานต้อนรับ",
                name: "อรุณรุ่ง ยิ้มแย้ม",
                nickname: "รุ่ง",
                phone: "0856789012",
                email: "arun@example.com",
                loginDate: "2025-06-01",
                loginTime: "09:10"
            },
            {
                code: "EMP006",
                position: "พนักงานครัว",
                name: "จันทร์เพ็ญ ทำอาหาร",
                nickname: "จัน",
                phone: "0867890123",
                email: "janpen@example.com",
                loginDate: "2025-06-01",
                loginTime: "08:45"
            },
            {
                code: "EMP007",
                position: "แม่บ้าน",
                name: "นภาพร ขยัน",
                nickname: "พร",
                phone: "0878901234",
                email: "napaporn@example.com",
                loginDate: "2025-06-01",
                loginTime: "09:05"
            },
            {
                code: "EMP008",
                position: "พนักงานต้อนรับ",
                name: "ธนพล ใจเย็น",
                nickname: "พล",
                phone: "0889012345",
                email: "thanapon@example.com",
                loginDate: "2025-06-01",
                loginTime: "09:20"
            },
            {
                code: "EMP009",
                position: "รปภ.",
                name: "เดชา แกร่งกล้า",
                nickname: "เด",
                phone: "0890123456",
                email: "decha@example.com",
                loginDate: "2025-06-01",
                loginTime: "08:55"
            },
            {
                code: "EMP010",
                position: "แม่บ้าน",
                name: "สายใจ สะอาด",
                nickname: "ใจ",
                phone: "0801234567",
                email: "saijai@example.com",
                loginDate: "2025-06-01",
                loginTime: "09:00"
            }
        ];
    }
}
</script>
