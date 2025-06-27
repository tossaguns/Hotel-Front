<!--<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div>
                <div>
                    <p>จัดการพนักงาน</p>
                </div>

                <div class="flex justify-center space-x-5 mb-2">
                    <div class="flex space-x-2">
                        <p>วัน</p>
                        <dropdown></dropdown>
                    </div>
                    <div class="flex space-x-2">
                        <p>เดือน</p>
                        <dropdown></dropdown>
                    </div>
                    <div class="flex space-x-2">
                        <p>ปี</p>
                        <dropdown></dropdown>
                    </div>
                </div>

                <div class="flex justify-center space-x-5">
                    <div class="flex space-x-2">
                        <p>ค้นหาด้วยรหัสพนักงาน</p>
                        <input />
                    </div>
                    <div>
                        <button class="bg-red-200"> ค้นหา </button>
                    </div>
                    <div>
                        <button class="bg-green-200"> รายงาน </button>
                    </div>
                </div>

                <div class="flex justify-center mt-5">
                    <button @click="navigateToEmployeeList" class="bg-green-500">ดูข้อมูลพนักงาน</button>
                    <button @click="navigateToAddEmployee" class="bg-blue-200">+ เพิ่มข้อมูลพนักงาน</button>

                </div>

                <div>
                    <table border="1" class="w-full">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รหัสพนักงาน</th>
                                <th>ตำแหน่ง</th>
                                <th>ชื่อ</th>
                                <th>ชื่อเล่น</th>
                                <th>เบอร์โทร</th>
                                <th>อีเมล</th>
                                <th>วันที่ Login</th>
                                <th>เวลา Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(employee, index) in paginatedData" :key="employee.id">
                                <td>{{ index + 1 + (currentPage - 1) * perPage }}</td>
                                <td>{{ employee.code }}</td>
                                <td>{{ employee.position }}</td>
                                <td>{{ employee.name }}</td>
                                <td>{{ employee.nickname }}</td>
                                <td>{{ employee.phone }}</td>
                                <td>{{ employee.email }}</td>
                                <td>{{ employee.loginDate }}</td>
                                <td>{{ employee.loginTime }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="mt-4 flex justify-center gap-2">
                        <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                            :class="{ 'font-bold underline': currentPage === page }">
                            {{ page }}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "MainEmployee",
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarCollapsed: false,
            currentPage: 1,
            perPage: 15,
            employees: [],
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.employees.length / this.perPage)
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage
            return this.employees.slice(start, start + this.perPage)
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateToEmployeeList() {
            this.$router.push("/employeelist")
        },
        navigateToAddEmployee() {
            this.$router.push("/addemployee")
        },
        generateMockData() {
            const mock = []
            for (let i = 0; i < 50; i++) {
                mock.push({
                    id: i + 1,
                    code: `EMP${1000 + i}`,
                    position: 'พนักงาน',
                    name: `ชื่อ ${i + 1}`,
                    nickname: `เล่น ${i + 1}`,
                    phone: `08${Math.floor(10000000 + Math.random() * 89999999)}`,
                    email: `user${i + 1}@email.com`,
                    loginDate: '2025-05-31',
                    loginTime: '09:00',
                })
            }
            this.employees = mock
        }
    },
    watch: {
        isSidebarCollapsed(newVal) {
            localStorage.setItem('sidebarCollapsed', JSON.stringify(newVal))
        }
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            try {
                this.isSidebarCollapsed = JSON.parse(savedState)
            } catch (e) {
                console.error('Failed to parse sidebar state:', e)
            }
        }

        this.generateMockData()
    }
}
</script>-->


<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">
            <div>
                <div class="mt-2 rounded-t-lg bg-amber-400 p-2 text-white text-lg">
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



                <div class="flex justify-center space-x-5 mb-2 bg-white mt-2 py-4 rounded-lg px-2">
                    <div class="flex space-x-2">
                        <p>ค้นหาด้วยรหัสพนักงาน</p>
                        <input class="border rounded-md" />
                    </div>
                    <div>
                        <button class="bg-emerald-700 px-3 py-1 rounded-lg text-white font-bold hover:bg-emerald-500">
                            ค้นหา</button>
                    </div>
                    <div>
                        <button class="bg-red-700 px-3 py-1 rounded-lg text-white font-bold hover:bg-red-500">
                            รายงาน</button>
                    </div>
                </div>

                <div class="bg-white rounded-lg pb-6">
                    <div class="flex justify-center pt-7 mb-5">
                        <button @click="navigateBackToDataEmployee"
                            class="rounded-lg px-2 py- text-lg hover:bg-amber-300 shadow-lg">ดูข้อมูลพนักงาน
                        </button>
                        <p class="text-2xl px-2 text-gray-400 font-bold">|</p>
                        <button @click="navigateBackToAddEmployee"
                            class="rounded-lg px-2 py-1 text-lg hover:bg-amber-300 shadow-lg">เพิ่มข้อมูลพนักงาน</button>
                    </div>

                    <!-- เพิ่ม wrapper -->

                    <div class="overflow-x-auto px-2 ">
                        <table class="w-full border border-collapse text-xs md:text-sm ">
                            <thead>
                                <tr class="bg-gray-200 whitespace-nowrap">
                                    <th class="border px-2 py-1">ลำดับ</th>
                                    <th class="border px-2 py-1">รหัสพนักงาน</th>
                                    <th class="border px-2 py-1">ตำเเหน่ง</th>
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
                                    <td class="border px-2 py-1 break-words">{{ index + 1 + (currentPage - 1) * perPage
                                    }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.code }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.position }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.name }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.nickname }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.phone }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.email }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.loginDate }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.loginTime }}</td>
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
                            :class="{ 'bg-amber-500 text-white': currentPage === page }">
                            {{ page }}
                        </button>
                        <button @click="currentPage++" :disabled="currentPage === totalPages"
                            class="px-3 py-1 border rounded hover:bg-gray-200">
                            ถัดไป
                        </button>
                    </div>
                </div>
            </div>

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
        }
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
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.allData.length / this.perPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.allData.slice(start, end);
        },
        startIndex() {
            return (this.currentPage - 1) * this.perPage;
        }
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
