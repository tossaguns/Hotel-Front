<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <!-- Main Content - ใช้ dynamic margin-left ตามสถานะของ sidebar -->
        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div class=" md:mt-4 mt-20 flex-1">
                <h1 class="text-3xl md:text-4xl ml-3 mb-8 md:mb-2 text-stone-600">
                    รายชื่อพนักงาน
                </h1>

                <div
                    class="mb-12 flex flex-col items-center space-y-4 md:flex-row md:justify-end md:space-y-0 md:space-x-4 md:mr-20">
                    <input class="border-2 rounded-xl md:w-3 w-6 p-3 md:py-2 hover:border-yellow-400"
                        placeholder="ค้นหา..." />
                    <button class="bg-lime-600 py-3 px-3 md:py-2  rounded-xl text-white hover:bg-lime-800 shadow-2xl"
                        @click="navigateToAddEmployee">
                        + เพิ่มรายชื่อพนักงาน
                    </button>
                </div>



                <div class="h-px bg-stone-300 mx-5 mb-5"></div>

                <!-- ตารางสำหรับหน้าจอ md ขึ้นไป -->
                <div class="hidden md:block border overflow-visible">
                    <table class="border-separate border-spacing-y-3 w-full">
                        <thead>
                            <tr class="text-stone-400 text-sm">
                                <th></th>
                                <th></th>
                                <th>ID</th>
                                <th>ชื่อ-นามสกุล</th>
                                <th>ตำแหน่ง</th>
                                <th>โทร</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr class="bg-white transition transform hover:-translate-y-1 hover:shadow-lg rounded-lg text-sm"
                                v-for="(employee, index) in employees" :key="employee.id">
                                <td class="rounded-l-md py-3 px-4">{{ index + 1 }}</td>
                                <td class="py-3">
                                    <img :src="employee.avatar" alt="avatar" width="50" height="50"
                                        style="border-radius: 50%" />
                                </td>
                                <td class="py-3 px-3">{{ employee.id }}</td>
                                <td class="py-3 px-3">{{ employee.name }}</td>
                                <td class="py-3 px-3">{{ employee.position }}</td>
                                <td class="py-3 px-3">{{ employee.phone }}</td>
                                <td class="py-3 px-3">{{ employee.email }}</td>
                                <td class="py-3 px-3">{{ employee.username }}</td>
                                <td class="py-3 px-3 flex items-center space-x-2 select-none mt-3">
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
                                </td>

                                <td class="rounded-r-md px-2 md:pr-4 py-3 relative">
                                    <button @click.stop="toggleDropdown(index, $event)"
                                        class="text-2xl font-bold focus:outline-none">
                                        &#8230;
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- การ์ดสำหรับหน้าจอเล็ก (sm และ xs) -->
                <div class="md:hidden space-y-4 px-5">
                    <div v-for="(employee, index) in employees" :key="employee.id"
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

};
</script>