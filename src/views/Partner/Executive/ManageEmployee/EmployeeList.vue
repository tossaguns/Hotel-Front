<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">

            <div class="md:mt-4 mt-20 flex-1">
                <div class="flex flex-col xl:flex-row justify-between md:mb-6 mb-8 mx-3 md:mx-6">
                    <h1 class="text-2xl md:text-3xl font-semibold text-stone-600 mb-4 xl:mb-0">รายชื่อพนักงาน</h1>

                    <div class="flex flex-col gap-3 items-start lg:flex-row justify-end">
                        <div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z" />
                            </svg>
                            <input type="text" placeholder="ค้นหา..."
                                class="outline-none text-sm w-32 sm:w-40 md:w-60" />
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

                        <button @click="navigateToAddEmployee"
                            class="bg-lime-600 px-4 py-2 rounded-lg text-white hover:bg-lime-800 text-sm shadow-md">
                            + เพิ่มรายชื่อพนักงาน
                        </button>
                    </div>
                </div>

                <!-- ตารางสำหรับหน้าจอ md ขึ้นไป -->
                <div class="hidden md:block border overflow-visible overflow-x-auto px-2">
                    <table class="w-full border-separate border-spacing-y-1 text-sm">
                        <thead>
                            <tr class="bg-white text-stone-400 text-sm text-left ">
                                <th class="py-3 pl-4 rounded-tl-xl">#</th>
                                <th class="px-2"></th>
                                <th class="px-2">ID</th>
                                <th class="px-2">ชื่อ-นามสกุล</th>
                                <th class="px-2">ตำแหน่ง</th>
                                <th class="px-2">โทร</th>
                                <th class="px-2">Email</th>
                                <th class="px-2">Username</th>
                                <th class="px-2">Password</th>
                                <th class="pr-2 rounded-tr-xl"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(employee, index) in paginatedEmployees" :key="employee.id"
                                class="bg-white shadow-sm hover:shadow-lg transition-all">
                                <td class="py-4 pl-4 font-medium text-gray-700">{{ (currentPage - 1) * itemsPerPage +
                                    index + 1 }}</td>

                                <td class="py-4 w-14 min-w-[56px] max-w-[56px]">
                                    <img :src="employee.avatar" class="w-10 h-10 rounded-full object-cover" />
                                </td>

                                <td class="py-4 px-2 text-gray-700 font-medium">{{ employee.id }}</td>
                                <td class="py-4 px-2 text-gray-800">{{ employee.name }}</td>

                                <!-- ตำแหน่ง -->
                                <td class="py-4 px-2">
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

                                <td class="py-4 px-2 text-gray-700">{{ employee.phone }}</td>
                                <td class="py-4 px-2 text-gray-700">{{ employee.email }}</td>
                                <td class="py-4 px-2 text-gray-700">{{ employee.username }}</td>

                                <td class="py-3 px-3 flex items-center space-x-2 select-none mt-3">
                                    <span>
                                        {{ showPasswordIndex === index ? employee.password : "••••••" }}
                                    </span>
                                    <button type="button" @click.stop="togglePassword(index)"
                                        class="text-gray-600 hover:text-gray-900 focus:outline-none w-8 h-8 min-w-[30px] max-w-[30px]"
                                        :aria-label="showPasswordIndex === index ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'
                                            ">
                                        <svg v-if="showPasswordIndex === index" xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <!-- ตาเปิด -->
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>

                                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <!-- ตาปิด -->
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.455-4.277m1.45-1.45A9.969 9.969 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.976 9.976 0 01-4.186 5.15M15 12a3 3 0 00-4.33-2.782M3 3l18 18" />
                                        </svg>
                                    </button>
                                </td>

                                <td class="py-4 pr-4 text-right">
                                    <button @click.stop="toggleDropdown(index, $event)"
                                        class="text-2xl font-bold text-gray-400 hover:text-gray-600">
                                        &#8230;
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <!-- การ์ดสำหรับหน้าจอเล็ก (sm และ xs) -->
                <div class="md:hidden space-y-4 px-5">
                    <div v-for="(employee, index) in paginatedEmployees" :key="employee.id"
                        class="bg-white rounded-lg shadow p-4 flex flex-col space-y-2">
                        <div class="flex items-center space-x-4">
                            <img :src="employee.avatar" alt="avatar" class="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <p class="font-bold text-lg">{{ employee.name }}</p>
                                <p class="text-sm text-gray-500">{{ employee.position }}</p>
                            </div>
                            <button @click.stop="toggleDropdown(index, $event)"
                                class="ml-auto text-3xl font-bold focus:outline-none">
                                &#8230;
                            </button>
                        </div>

                        <div class="text-sm text-gray-700 space-y-1 mt-4 ml-3">
                            <p><span class="font-semibold">รหัสพนักงาน:</span> {{ employee.id }}</p>
                            <p><span class="font-semibold">โทร:</span> {{ employee.phone }}</p>
                            <p><span class="font-semibold">Email:</span> {{ employee.email }}</p>
                            <p><span class="font-semibold">Username:</span> {{ employee.username }}</p>
                            <p class="font-semibold flex items-center space-x-2">
                                <span>Password:</span>
                                <span>
                                    {{ showPasswordIndex === index ? employee.password : "••••••" }}
                                </span>
                                <button type="button" @click.stop="togglePassword(index)"
                                    class="text-gray-600 hover:text-gray-900 focus:outline-none" :aria-label="showPasswordIndex === index ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'
                                        ">
                                    <svg v-if="showPasswordIndex === index" xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <!-- ตาเปิด -->
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>

                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <!-- ตาปิด -->
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.455-4.277m1.45-1.45A9.969 9.969 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.976 9.976 0 01-4.186 5.15M15 12a3 3 0 00-4.33-2.782M3 3l18 18" />
                                    </svg>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                <teleport to="body" v-if="dropdownIndex !== null">
                    <div class="absolute bg-white border rounded shadow-md z-50" :style="dropdownStyle"
                        v-outside="closeDropdown">
                        <button @click="editEmployee(employees[dropdownIndex])"
                            class="block w-full text-left px-4 py-2 hover:bg-yellow-100">
                            แก้ไข
                        </button>
                        <button @click="deleteEmployee(employees[dropdownIndex])"
                            class="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">
                            ลบ
                        </button>
                    </div>
                </teleport>

                <!-- Pagination -->
                <div class="flex justify-center items-center gap-1 my-6 text-sm select-none">
                    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                        class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-300 bg-white disabled:opacity-50">
                        Previous
                    </button>

                    <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
                        'px-3 py-1 rounded-md',
                        page === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'bg-white hover:bg-gray-300 text-gray-700'
                    ]">
                        {{ page.toString().padStart(2, '0') }}
                    </button>

                    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-300 bg-white disabled:opacity-50">
                        Next
                    </button>
                </div>

                <div class="flex justify-center my-4">
                    <button @click="navigateBackToMainEmployee"
                        class="bg-red-500 px-3 py-2 rounded-lg text-white hover:bg-red-600">ย้อนกลับ</button>
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