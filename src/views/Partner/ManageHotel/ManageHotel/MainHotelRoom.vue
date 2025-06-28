<template>
    <div class="w-full min-h-screen bg-gray-100">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">
            <div class="fixed top-0 left-0 right-0 h-4 z-[100] bg-white pointer-events-none"></div>
            <div class="sticky top-4 z-30 rounded-t-lg bg-amber-400 p-2 text-white text-lg">
                <h1>ดูข้อมูลการเข้าพัก</h1>
            </div>

            <div class="bg-white rounded-b-lg py-4 px-4">
                <div class="flex justify-center space-x-5 mb-3">
                    <div class="flex items-center justify-between sm:justify-start space-x-2">
                        <p>เลือกสถานะ</p>
                        <select class="border rounded px-2 py-1 text-sm w-full sm:w-auto">
                            <option>ทั้งหมด</option>
                            <option>{{ StatusBooking }}</option>
                        </select>
                    </div>

                    <div class="flex items-center justify-between sm:justify-start space-x-2">
                        <p>เลือกสถานะเข้าพัก</p>
                        <select class="border rounded px-2 py-1 text-sm w-full sm:w-auto">
                            <option>ทั้งหมด</option>
                            <option>{{ StatusCheckIn }}</option>
                        </select>
                    </div>

                    <div class="flex items-center justify-between sm:justify-start space-x-2">
                        <p>เลือกสถานะออก</p>
                        <select class="border rounded px-2 py-1 text-sm w-full sm:w-auto">
                            <option>ทั้งหมด</option>
                            <option>{{ StatusCheckOut }}</option>
                        </select>
                    </div>
                </div>
                
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

            <!-- ค้นหา -->
            <div class="flex justify-center space-x-5 mb-2 bg-white mt-2 py-4 rounded-lg px-2">
                <div class="flex space-x-2">
                    <p>ค้นหาด้วยเลขห้อง</p>
                    <input class="border rounded-md" />
                </div>
                <div>
                    <button class="bg-emerald-600 px-3 py-1 rounded-lg text-white font-bold hover:bg-emerald-400">
                        ค้นหา</button>
                </div>
            </div>

            <!-- ข้อมูลการเข้าพัก -->
            <div class="bg-white md:min-h-[70vh] rounded-lg pb-6">

                <div class="flex justify-center pt-7 mb-5">
                    <button @click="navigateBackToTossagunbooking"
                        class="rounded-lg px-2 py- text-lg hover:bg-amber-300 shadow-lg">ดูข้อมูลห้องพัก
                        กับSleep Gun</button>
                    <p class="text-2xl px-2 text-gray-400 font-bold">|</p>
                    <button @click="navigateBackToMainCheckInCheckOut"
                        class="rounded-lg px-2 py-1 text-lg hover:bg-amber-300 shadow-lg">ข้อมูลห้องพัก</button>
                </div>

                <!-- Card view (mobile/sm) -->
                <div class="block lg:hidden px-2">
                    <div v-for="(item, index) in paginatedData" :key="index"
                        class="bg-white rounded-xl shadow p-4 border mb-4 flex flex-col gap-y-2">
                        <!-- Room Info -->
                        <div class="mb-2">
                            <div class="flex flex-wrap justify-between gap-x-2 gap-y-1 text-sm items-center">

                                <!-- เลขห้อง -->
                                <div class="block bg-blue-600 p-2 rounded-lg text-center"><span
                                        class="text-black">เลขห้อง</span> <br><span
                                        class="text-white font-semibold text-lg text-shadow">{{ item.roomNumber
                                        }}</span>
                                </div>

                                <!-- ราคา -->
                                <div class="block text-center">
                                    <span class="text-emerald-600 text-lg font-semibold">{{ item.price }}</span>
                                </div>
                            </div>
                        </div>

                        <hr class="my-1 border-gray-200">

                        <!-- Booking Info -->
                        <div class="mb-2">

                            <div class="flex flex-col gap-y-1 text-xs">

                                <!-- ชื่อผู้เข้าพัก -->
                                <div class="text-lg font-medium space-x-2"><span>{{ item.name }}</span><span>{{
                                    item.lastname }}</span></div>
                                <div><span class="font-semibold">วันที่จอง:</span> {{ item.bookingDate }}</div>

                                <div
                                    class="flex flex-col-2 text-gray-700 border border-gray-200 rounded-md overflow-hidden text-center">
                                    
                                    <!-- วันที่และเวลาเข้าพัก -->
                                    <div
                                        class="flex flex-col items-center border-r border-b border-gray-200 p-3 flex-1">
                                        <div
                                            class="text-sm font-semibold text-black border-b border-gray-300 w-full pb-1 mb-2">
                                            วันที่เข้าพัก
                                        </div>
                                        <div class="text-base text-gray-800">
                                            {{ item.checkinDate }} <br> {{ item.checkinTime }}
                                        </div>
                                    </div>

                                    <!-- วันที่และเวลาออก -->
                                    <div class="flex flex-col items-center border-b border-gray-200 p-3 flex-1">
                                        <div
                                            class="text-sm font-semibold text-black border-b border-gray-300 w-full pb-1 mb-2">
                                            วันที่ออก
                                        </div>
                                        <div class="text-base text-gray-800">
                                            {{ item.checkoutDate }} <br> {{ item.checkoutTime }}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <hr class="my-1 border-gray-200">

                        <!-- Status Info -->
                        <div class="flex flex-col-2 mb-2">
                            <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs flex-1">
                                
                                <!-- สถานะการจอง -->
                                <div class="space-x-1">
                                    <span class="font-semibold">สถานะ:</span>
                                    <div class="inline-block px-2 py-0.5 rounded text-white"
                                        :class="item.status === 'จองผ่าน Tossagun' ? 'bg-emerald-700' : 'bg-gray-700'">
                                        <span>{{ item.status }}</span>
                                    </div>
                                </div>

                                <!-- สถานะการเข้าพัก -->
                                <div class="space-x-1">
                                    <span class="font-semibold">สถานะเข้าพัก:</span>
                                    <span class="inline-block px-2 py-0.5 rounded text-white" :class="{
                                        'bg-emerald-700': item.checkinStatus === 'ตรงเวลา',
                                        'bg-red-700': item.checkinStatus === 'เลท',
                                        'bg-blue-700': item.checkinStatus === 'ห้องมีปัญหา',
                                    }">{{ item.checkinStatus }}</span>
                                </div>

                                <!-- สถานะออก -->
                                <div class="space-x-1">
                                    <span class="font-semibold">สถานะออก:</span>
                                    <span class="inline-block px-2 py-0.5 rounded text-white" :class="{
                                        'bg-emerald-700': item.checkoutStatus === 'ตรงเวลา',
                                        'bg-red-700': item.checkoutStatus === 'เลท',
                                        'bg-blue-700': item.checkoutStatus === 'ห้องมีปัญหา',
                                    }">{{ item.checkoutStatus }}</span>
                                </div>

                            </div>

                            <!-- ราคาที่ต้องจ่ายเพิ่ม -->
                            <div class="mb-2 flex-1 text-center">
                                <span class="font-semibold text-red-700">ราคาที่ต้องจ่ายเพิ่ม</span><br>
                                <span class="text-red-700 font-bold text-xl">
                                    {{ item.note && item.note !== '-' ? item.note : '0' }}
                                </span>
                            </div>

                        </div>

                        <!-- Action Button -->
                        <div class="flex justify-end mt-2">
                            <button @click="navigateToDetail"
                                class="bg-blue-600 hover:bg-blue-400 text-white px-3 py-1 rounded text-xs">
                                แก้ไข
                            </button>
                        </div>
                        
                    </div>
                </div>

                <!-- Table view (lg up) -->
                <div class="overflow-x-auto px-2 hidden lg:block">
                    <table class="responsive-table w-full border border-collapse text-xs md:text-sm ">
                        <thead>
                            <tr class="bg-gray-200 whitespace-nowrap">
                                <th class="col-no border px-2 py-1">ลำดับ</th>
                                <th class="border px-2 py-1">เลขที่ห้อง</th>
                                <th class="border px-2 py-1">สถานะ</th>
                                <th class="col-price border px-2 py-1">ราคา</th>
                                <!--<th class="border px-2 py-1">การจ่ายเงิน</th>-->
                                <th class="border px-2 py-1">ชื่อ</th>
                                <th class="border px-2 py-1">วันที่จอง</th>
                                <!--<th class="border px-2 py-1">เวลาที่จอง</th>-->
                                <th class="border px-2 py-1">วันที่เข้าพัก</th>
                                <th class="col-date border px-2 py-1">เวลาที่เข้าพัก</th>
                                <!--<th class="border px-2 py-1">วันที่เข้าพักจริง</th>
                                    <th class="border px-2 py-1">เวลาที่เข้าพักจริง</th>-->
                                <th class="border px-2 py-1">วันที่ออก</th>
                                <th class="col-date border px-2 py-1">เวลาที่ออก</th>
                                <!--<th class="border px-2 py-1">วันที่ออกจริง</th>
                                    <th class="border px-2 py-1">เวลาที่ออกจริง</th>-->
                                <th class="border px-2 py-1">สถานะเข้าพัก</th>
                                <th class="border px-2 py-1">สถานะออก</th>
                                <th class="border px-2 py-1">ราคาที่ต้องจ่ายเพิ่ม</th>
                                <th class="border px-2 py-1">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in paginatedData" :key="index"
                                class="hover:bg-gray-50 whitespace-nowrap">
                                <td class="col-no border px-2 py-1 break-words">{{ startIndex + index + 1 }}</td>
                                <td class="border px-2 py-1 break-words">{{ item.roomNumber }}</td>
                                <td class="border px-2 py-1 break-words">{{ item.status }}</td>
                                <td class="col-price border px-2 py-1 break-words">{{ item.price }}</td>
                                <!--<td class="border px-2 py-1 break-words">{{ item.payment }}</td>-->
                                <td class="border px-2 py-1 break-words">{{ item.name }}</td>
                                <td class="border px-2 py-1 break-words">{{ item.bookingDate }}</td>
                                <!--<td class="border px-2 py-1 break-words">{{ item.bookingTime }}</td>-->
                                <td class="border px-2 py-1 break-words">{{ item.checkinDate }}</td>
                                <td class="col-date border px-2 py-1 break-words">{{ item.checkinTime }}</td>
                                <!--<td class="border px-2 py-1 break-words">{{ item.actualCheckinDate }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.actualCheckinTime }}</td>-->
                                <td class="border px-2 py-1 break-words">{{ item.checkoutDate }}</td>
                                <td class="col-date border px-2 py-1 break-words">{{ item.checkoutTime }}</td>
                                <!--<td class="border px-2 py-1 break-words">{{ item.actualCheckoutDate }}</td>
                                    <td class="border px-2 py-1 break-words">{{ item.actualCheckoutTime }}</td>-->
                                <td class="border px-2 py-1 break-words">{{ item.checkinStatus }}</td>
                                <td class="border px-2 py-1 break-words">{{ item.checkoutStatus }}</td>
                                <td class="border px-2 py-1 break-words">{{ item.note }}</td>
                                <td class="border px-2 py-1 text-center">
                                    <button @click="navigateToDetail"
                                        class="bg-blue-600 hover:bg-blue-400 text-white px-3 py-1 rounded">
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
                        class="px-3 py-1 border rounded" :class="{ 'bg-amber-400 text-white': currentPage === page }">
                        {{ page }}
                    </button>
                    <button @click="currentPage++" :disabled="currentPage === totalPages"
                        class="px-3 py-1 border rounded hover:bg-gray-200">
                        ถัดไป
                    </button>
                </div>
                <div class="fixed bottom-0 left-0 right-0 h-4 z-[40] bg-gray-100 pointer-events-none"></div>
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
        navigateBackToTossagunbooking() {
            this.$router.push("/mainbookingtossagun");
        },
        navigateBackToMainCheckInCheckOut() {
            this.$router.push("/maincheckincheckout");
        },
        navigateToDetail() {
            this.$router.push("/mainhoteldetailroom");
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
            status: i % 2 === 0 ? "จองผ่าน Tossagun" : "Walk-in",
            price: `${1000 + i * 50} บาท`,
            payment: ["เงินสด", "บัตรเครดิต", "โอน"][i % 3],
            name: `คุณสมชาย ${i + 1}`,
            lastname: `สมมติ`,
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
<style>
.responsive-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.responsive-table td {
    padding: 6px;
    text-align: center;
}

/* ✅ ซ่อนคอลัมน์เมื่อหน้าจอเล็ก */
@media (max-width: 1400px) {
    .col-date {
        display: none;
    }
}

@media (max-width: 1240px) {
    .col-price {
        display: none;
    }

    .col-no {
        display: none;
    }
}

@media (max-width: 640px) {

    .responsive-table th:nth-child(1),
    .responsive-table td:nth-child(1) {
        display: none;
        /* ซ่อนลำดับ */
    }
}
</style>