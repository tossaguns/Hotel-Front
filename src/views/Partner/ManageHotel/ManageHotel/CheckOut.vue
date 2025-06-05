<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div>
                <div class="mt-2 rounded-t-lg bg-amber-400 p-2 text-white text-lg">
                    <h1>หน้าหลัก Checkin-CheckOut</h1>
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
                        <p>ค้นหาด้วยเลขห้อง</p>
                        <input class="border rounded-md" />
                    </div>
                    <div>
                        <button class="bg-green-500 px-3 py-1 rounded-lg text-white font-bold hover:bg-green-600">
                            ค้นหา</button>
                    </div>
                </div>


                <div class="bg-white rounded-lg pb-6">

                    <div class="text-center pt-4 text-4xl font-bold text-red-600 rounded-t-lg">
                        <p> Check Out </p>
                    </div>
                    TODO: เเก้ไขจัดการให้เเก้ได้ในตารางนี้เลย


                    <!-- เพิ่ม wrapper -->
                    <div class="overflow-x-auto px-2 mt-6 ">
                        <table class="w-full border border-collapse text-xs md:text-sm ">
                            <thead>
                                <tr class="bg-gray-200 whitespace-nowrap">
                                    <th class="border px-2 py-1">ลำดับ</th>
                                    <th class="border px-2 py-1">เลขที่ห้อง</th>
                                    <th class="border px-2 py-1">ราคา</th>
                                    <th class="border px-2 py-1">การจ่ายเงิน</th>
                                    <th class="border px-2 py-1">ชื่อ</th>
                                    <th class="border px-2 py-1">วันที่ออกจริง</th>
                                    <th class="border px-2 py-1">เวลาที่ออกจริง</th>
                                    <th class="border px-2 py-1">สถานะออก</th>
                                    <th class="border px-2 py-1">ราคาที่ต้องจ่ายเพิ่ม</th>
                                    <th class="border px-2 py-1">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in paginatedData" :key="index"
                                    class="hover:bg-gray-50 whitespace-nowrap">
                                    <td class="border px-2 py-1 break-words">{{ startIndex + index + 1 }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.roomNumber }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.price }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.payment }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.name }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.actualCheckoutDate }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.actualCheckoutTime }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.checkoutStatus }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.note }}</td>
                                    <td class="border px-2 py-1 text-center">
                                        <button class="bg-rose-400 hover:bg-rose-500 text-white px-3 py-1 rounded">
                                            แก้ไข
                                        </button>
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
                </div>

                <div class="flex justify-center mt-5 mb-5 ">
                    <button @click="navigateBackToMain"
                        class="text-white bg-red-500 py-2 px-3 rounded-lg hover:bg-red-600">ย้อนกลับ</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "CheckOut",
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
        navigateBackToMain() {
            this.$router.push("/maincheckincheckout");
        },


    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
    computed: {
        // จำนวนหน้าทั้งหมด
        totalPages() {
            return Math.ceil(this.allData.length / this.perPage);
        },
        // ข้อมูลที่แสดงในหน้านี้
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.allData.slice(start, end);
        },
        // ลำดับเริ่มต้นของแถว
        startIndex() {
            return (this.currentPage - 1) * this.perPage;
        }
    },
    created() {
        // จำลองข้อมูล 20 รายการ
        this.allData = Array.from({ length: 20 }, (_, i) => ({
            roomNumber: `A${i + 101}`,
            status: i % 2 === 0 ? "checkin" : "checkout",
            price: `${1000 + i * 50} บาท`,
            payment: ["เงินสด", "บัตรเครดิต", "โอน"][i % 3],
            name: `คุณสมชาย ${i + 1}`,
            bookingDate: "2025-06-01",
            bookingTime: "13:00",
            checkinDate: "2025-06-05",
            checkinTime: "14:00",
            actualCheckinDate: "2025-06-05",
            actualCheckinTime: "14:10",
            checkoutDate: "2025-06-06",
            checkoutTime: "11:00",
            actualCheckoutDate: "2025-06-06",
            actualCheckoutTime: "10:50",
            checkinStatus: ["ตรงเวลา", "เลท", "ห้องมีปัญหา"][i % 3],
            checkoutStatus: ["ตรงเวลา", "เลท", "ห้องมีปัญหา"][i % 2],
            note: i % 4 === 0 ? "400" : "-"
        }));
    }

}
</script>