<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">

            <div class="rounded-t-lg bg-amber-400 p-2 text-white text-lg">
                <h1>รายชื่อพนักงาน</h1>
            </div>
            <div
                class="flex flex-col xl:flex-row py-5 p-2 gap-3 items-center xl:items-start justify-center xl:justify-between bg-white"
            >
                <div class="flex items-center gap-3 mb-2">
                    <div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z" />
                        </svg>
                        <input type="text" placeholder="ค้นหา..." class="outline-none text-sm w-32 sm:w-40 md:w-60" />
                    </div>

                    <div class="flex items-center gap-2">
                        <label class="text-sm text-gray-600">Showing</label>
                        <select v-model.number="itemsPerPage" @change="currentPage = 1"
                            class="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white focus:outline-none hover:border-yellow-400">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>

                <button @click="navigateToAddEmployee"
                    class="bg-emerald-800 px-4 py-2 rounded-lg text-white hover:bg-emerald-600 text-sm shadow-md">
                    + เพิ่มรายชื่อพนักงาน
                </button>
            </div>

            <!-- ตารางแบบ MainEmployee.vue -->
            <div class="bg-white rounded-lg p-4 mt-2">
                <div class="hidden xl:block overflow-x-auto">
                    <table class="w-full border border-collapse text-xs md:text-sm overflow-x-auto">
                        <thead>
                            <tr class="bg-gray-200 whitespace-nowrap">
                                <th class="border px-2 py-1">ลำดับ</th>
                                <th class="border px-2 py-1">รูป</th>
                                <th class="border px-2 py-1">รหัสพนักงาน</th>
                                <th class="border px-2 py-1">ตำแหน่ง</th>
                                <th class="border px-2 py-1">ชื่อ</th>
                                <th class="border px-2 py-1">เบอร์โทร</th>
                                <th class="border px-2 py-1">อีเมล</th>
                                <th class="border px-2 py-1">Username</th>
                                <th class="border px-2 py-1">Password</th>
                                <th class="border px-2 py-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(employee, index) in paginatedEmployees" :key="employee.id"
                                class="hover:bg-gray-50 whitespace-nowrap">
                                <td class="border px-2 py-1">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                <td class="border px-2 py-1 text-center">
                                    <img :src="employee.avatar" class="w-10 h-10 rounded-full object-cover mx-auto" />
                                </td>
                                <td class="border px-2 py-1">{{ employee.id }}</td>
                                <td class="border px-2 py-1 text-center">
                                    <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full" :class="{
                                        'bg-green-100 text-green-700': employee.position === 'พนักงานขาย',
                                        'bg-purple-100 text-purple-700': employee.position === 'ผู้จัดการ',
                                        'bg-yellow-100 text-yellow-700': employee.position === 'พนักงานต้อนรับ',
                                        'bg-blue-100 text-blue-700': employee.position === 'พนักงานครัว',
                                        'bg-red-100 text-red-600': employee.position === 'รปภ.',
                                        'bg-cyan-100 text-cyan-600': employee.position === 'แม่บ้าน'
                                    }">
                                        {{ employee.position }}
                                    </span>
                                </td>
                                <td class="border px-2 py-1">{{ employee.name }}</td>
                                <td class="border px-2 py-1">{{ employee.phone }}</td>
                                <td class="border px-2 py-1">{{ employee.email }}</td>
                                <td class="border px-2 py-1">{{ employee.username }}</td>
                                <td class="border px-2 py-1 select-none text-center align-middle">
                                    <span>{{ showPasswordIndex === index ? employee.password : '••••••' }}</span>
                                    <button type="button" @click.stop="togglePassword(index)"
                                        class="text-gray-600 hover:text-gray-900 focus:outline-none ml-2 align-middle inline-flex items-center justify-center">
                                        <svg v-if="showPasswordIndex === index" xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.455-4.277m1.45-1.45A9.969 9.969 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.976 9.976 0 01-4.186 5.15M15 12a3 3 0 00-4.33-2.782M3 3l18 18" />
                                        </svg>
                                    </button>
                                </td>
                                <td class="border px-2 py-1">
                                    <button @click="editEmployee(employee)"
                                        class="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">แก้ไข</button>
                                    <button @click="deleteEmployee(employee)"
                                        class="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 ml-2">ลบ</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- การ์ดแบบ MainEmployee.vue (คงคอลัมน์รูป) -->
                <div class="xl:hidden grid grid-cols-1 gap-4 px-4 bg-white py-4 rounded-lg">
                    <div v-for="(employee, index) in paginatedEmployees" :key="employee.id"
                        class="w-full rounded-xl border bg-gray-100 px-4 pt-2 pb-4 shadow-md">
                        <div class="flex items-center mb-2 space-x-2">
                            <img :src="employee.avatar" class="w-16 h-16 rounded-full object-cover mr-2" />
                            <span class="font-semibold text-sm sm:text-lg">{{ employee.name }}</span>
                            <span class="text-sm">({{ employee.username }})</span>
                        </div>
                        <div
                            class="flex flex-col-2 text-gray-700 border border-gray-200 rounded-md overflow-hidden text-center">
                            <div class="flex flex-col items-center border-r border-b border-gray-200 p-3 flex-1">
                                <div class="text-sm font-semibold text-black border-b border-gray-300 w-full pb-1 mb-2">
                                    รหัสพนักงาน
                                </div>
                                <div class="">
                                    <span
                                        class="font-semibold bg-blue-600 text-white text-sm sm:text-lg rounded px-2 py-0.5">
                                        {{
                                            employee.id }}</span>
                                </div>
                            </div>
                            <div class="flex flex-col items-center border-b border-gray-200 p-3 flex-1">
                                <div class="text-sm font-semibold text-black border-b border-gray-300 w-full pb-1 mb-2">
                                    ตำแหน่ง
                                </div>
                                <div class="">
                                    <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full" :class="{
                                        'bg-green-100 text-green-700': employee.position === 'พนักงานขาย',
                                        'bg-purple-100 text-purple-700': employee.position === 'ผู้จัดการ',
                                        'bg-yellow-100 text-yellow-700': employee.position === 'พนักงานต้อนรับ',
                                        'bg-blue-100 text-blue-700': employee.position === 'พนักงานครัว',
                                        'bg-red-100 text-red-600': employee.position === 'รปภ.',
                                        'bg-cyan-100 text-cyan-600': employee.position === 'แม่บ้าน'
                                    }">
                                        {{ employee.position }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex flex-col-2 text-gray-700 border border-gray-200 rounded-md overflow-hidden text-center">
                            <div class="flex flex-col items-center border-r border-b border-gray-200 p-3 flex-1">
                                <div class="text-sm font-semibold text-black border-b border-gray-300 w-full pb-1 mb-2">
                                    Username
                                </div>
                                <div class="text-base text-gray-800">
                                    {{ employee.username }}
                                </div>
                            </div>
                            <div class="flex flex-col items-center border-b border-gray-200 p-3 flex-1">
                                <div class="text-sm font-semibold text-black border-b border-gray-300 w-full pb-1 mb-2">
                                    Password
                                </div>
                                <div class="flex items-center justify-center">
                                    <span>{{ showPasswordIndex === index ? employee.password : '••••••' }}</span>
                                    <button type="button" @click.stop="togglePassword(index)"
                                        class="text-gray-600 hover:text-gray-900 focus:outline-none ml-2 flex items-center justify-center">
                                        <svg v-if="showPasswordIndex === index" xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.455-4.277m1.45-1.45A9.969 9.969 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.976 9.976 0 01-4.186 5.15M15 12a3 3 0 00-4.33-2.782M3 3l18 18" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 text-sm text-gray-600">เบอร์โทร: {{ employee.phone }}</div>
                        <div class="mt-1 text-sm text-gray-600">Email: {{ employee.email }}
                        </div>
                        <div class="mt-2 flex gap-2 justify-end">
                            <button @click="editEmployee(employee)"
                                class="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">แก้ไข</button>
                            <button @click="deleteEmployee(employee)"
                                class="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600">ลบ</button>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="flex justify-center items-center gap-1 my-6 text-sm select-none">
                    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                        class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-300 bg-white disabled:opacity-50">
                        ย้อนกลับ
                    </button>

                    <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
                        'px-3 py-1 rounded-md',
                        page === currentPage
                            ? 'bg-amber-500 text-white'
                            : 'bg-white hover:bg-gray-300 text-gray-700'
                    ]">
                        {{ page.toString().padStart(2, '0') }}
                    </button>

                    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-300 bg-white disabled:opacity-50">
                        ถัดไป
                    </button>
                </div>

                <div class="flex justify-center my-4">
                    <button @click="navigateBackToMainEmployee"
                        class="bg-red-700 px-3 py-2 rounded-lg text-white hover:bg-red-500">ย้อนกลับ</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "EmployeeList",
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarCollapsed: false,
            dropdownIndex: null,
            dropdownX: 0,
            dropdownY: 0,
            showPasswordIndex: null,
            employees: [
                {
                    id: "E001",
                    name: "สมชาย ใจดี",
                    position: "ผู้จัดการ",
                    phone: "0812345678",
                    email: "somchai@example.com",
                    username: "somchai",
                    password: "password123",
                    avatar: "https://i.pravatar.cc/50?img=1",
                },
                {
                    id: "E002",
                    name: "สมหญิง มีสุข",
                    position: "พนักงานขาย",
                    phone: "0898765432",
                    email: "somying@example.com",
                    username: "somying",
                    password: "mysecret",
                    avatar: "https://i.pravatar.cc/50?img=2",
                },

            ],

            windowWidth: window.innerWidth,
            currentPage: 1,
            itemsPerPage: 10,
        };
    },

    computed: {
        dropdownStyle() {
            return {
                top: this.dropdownY + "px",
                left: this.dropdownX + "px",
                minWidth: "120px",
            };
        },
        paginatedEmployees() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.employees.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.employees.length / this.itemsPerPage);
        },
    },

    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateToAddEmployee() {
            this.$router.push("/addemployee");
        },
        navigateBackToMainEmployee() {
            this.$router.push("/mainemployee");
        },
        toggleDropdown(index, event) {
            if (this.dropdownIndex === index) {
                this.dropdownIndex = null;
            } else {
                this.dropdownIndex = index;
                const rect = event.target.getBoundingClientRect();
                this.dropdownX = rect.right - 120;
                this.dropdownY = rect.bottom + window.scrollY;
            }
        },
        closeDropdown() {
            this.dropdownIndex = null;
            this.showPasswordIndex = null;
        },
        togglePassword(index) {
            if (this.showPasswordIndex === index) {
                this.showPasswordIndex = null;
            } else {
                this.showPasswordIndex = index;
            }
        },
        editEmployee(employee) {
            alert(`แก้ไข: ${employee.name}`);
            this.closeDropdown();
            this.$router.push("/editemployee");

        },
        deleteEmployee(employee) {
            alert(`ลบ: ${employee.name}`);
            this.closeDropdown();
        },
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
    },

    directives: {
        outside: {
            beforeMount(el, binding) {
                el.clickOutsideEvent = function (event) {
                    if (!(el === event.target || el.contains(event.target))) {
                        binding.value(event);
                    }
                };
                document.body.addEventListener("click", el.clickOutsideEvent);
            },
            unmounted(el) {
                document.body.removeEventListener("click", el.clickOutsideEvent);
            },
        },
    },

    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
};
</script>