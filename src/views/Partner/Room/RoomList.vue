<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div>
                <div class="mt-2 rounded-t-lg bg-amber-400 p-2 text-white text-lg">
                    <h1>จัดการห้องพัก</h1>
                </div>

                <div class="bg-white rounded-b-lg py-4 px-2">

                    <div class="flex flex-col justify-center items-center space-x-5">
                        <div class="flex space-x-2 mb-5">
                            <select v-model="statusFilter" class="border-2 rounded-lg px-2 ">
                                <option value="">สถานะทั้งหมด</option>
                                <option value="ใช้งานได้">ใช้งานได้</option>
                                <option value="ปิดใช้งาน">ปิดใช้งาน</option>
                                <option value="ใช้งานกับTossagun">ใช้งานกับTossagun</option>
                            </select>
                        </div>

                        <div class="flex space-x-3">
                            <button class="border bg-green-400 rounded-lg py-2 px-3 hover:bg-green-500"
                                @click="setAllRoomsStatus('ใช้งานได้')">
                                เปิดใช้งานทั้งหมด
                            </button>
                            <button class="border bg-red-400 rounded-lg py-2 px-3 hover:bg-red-500"
                                @click="setAllRoomsStatus('ปิดใช้งาน')">
                                ปิดใช้งานทั้งหมด
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg pb-6  mt-2">
                    <div class="flex justify-center pt-7 mb-5">
                        <button @click="navigateToAddHotel"
                            class="rounded-lg px-2 py- text-lg hover:bg-amber-300 shadow-lg"> + เพิ่มห้องพัก
                        </button>

                    </div>

                    <!-- เพิ่ม wrapper -->

                    <div class="overflow-x-auto px-2 ">
                        <table class="w-full border border-collapse text-xs md:text-sm ">
                            <thead>
                                <tr class="bg-gray-200 whitespace-nowrap">
                                    <th class="border px-2 py-1">ลำดับ</th>
                                    <th class="border px-2 py-1">เลขห้อง</th>
                                    <th class="border px-2 py-1">ประเภทห้องพัก</th>
                                    <th class="border px-2 py-1">รายละเอียด</th>
                                    <th class="border px-2 py-1">จำนวนคนเข้าพัก/ห้อง</th>
                                    <th class="border px-2 py-1">ราคา</th>
                                    <th class="border px-2 py-1">สถานะห้องพัก</th>
                                    <th class="border px-2 py-1">หมายเหตุ</th>
                                    <th class="border px-2 py-1">วันที่อัปเดตล่าสุด</th>
                                    <th class="border px-2 py-1">รายชื่อผู้อัปเดต</th>
                                    <th class="px-2 py-2 border sm:px-3 sm:py-3">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(room, index) in filteredRooms" :key="room.Room_id"
                                    class="hover:bg-gray-50 whitespace-nowrap">
                                    <td class="border px-2 py-1 break-words">{{ index + 1 }}</td>
                                    <td class="border px-2 py-1 break-words">{{ room.Room_number }}</td>
                                    <td class="border px-2 py-1 break-words">{{ room.Room_type }}</td>
                                    <td class="border px-2 py-1 break-words">
                                        {{ room.Room_description }}
                                    </td>
                                    <td class="border px-2 py-1 break-words">
                                        {{ room.Room_capacity }}
                                    </td>
                                    <td class="border px-2 py-1 break-words">
                                        {{ room.Room_price }}
                                    </td>
                                    <td class="border px-2 py-1 break-words" :class="{
                                        'bg-lime-600 text-white': room.Room_status === 'ใช้งานได้',
                                        'bg-red-600 text-white': room.Room_status === 'ปิดใช้งาน',
                                        'bg-yellow-400 text-black': room.Room_status === 'ใช้งานกับTossagun',
                                    }">
                                        {{ room.Room_status }}
                                    </td>
                                    <td class="border px-2 py-1 break-words">{{ room.Room_note }}</td>
                                    <td class="border px-2 py-1 break-words">
                                        {{ room.Room_lastUpdated }}
                                    </td>
                                    <td class="border px-2 py-1 break-words">
                                        {{ room.Room_updatedBy }}
                                    </td>
                                    <td class="border px-2 py-1 break-words space-x-2">
                                        <button @click="editRoom(room.Room_id)"
                                            class="text-white bg-blue-400 px-2 py-2 rounded-lg hover:bg-blue-700 shadow-lg transition">
                                            แก้ไข
                                        </button>
                                        <button @click="deleteRoom(room.Room_id)"
                                            class="text-white bg-red-400 px-2 py-2 rounded-lg hover:bg-red-700 shadow-lg transition">
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
// FIXME: ครีเอทข้อมูลมาเอง กลับมาลบด้วย
import Sidebar from '@/components/SidebarExecutive.vue'
export default {
    name: "RoomList",
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarCollapsed: false,
            statusFilter: "",
            rooms: [
                {
                    Room_id: 1,
                    Room_number: "101",
                    Room_type: "ห้องเดี่ยว",
                    Room_description: "ห้องเดี่ยวพร้อมวิวทะเล",
                    Room_capacity: 2,
                    Room_price: 1200,
                    Room_status: "ใช้งานได้",
                    Room_note: "ห้องใหม่",
                    Room_lastUpdated: "2025-05-19",
                    Room_updatedBy: "คุณสมชาย",
                },
                {
                    Room_id: 2,
                    Room_number: "102",
                    Room_type: "ห้องคู่",
                    Room_description: "ห้องกว้างพร้อมอ่างอาบน้ำ",
                    Room_capacity: 4,
                    Room_price: 2000,
                    Room_status: "ใช้งานกับTossagun",
                    Room_note: "-",
                    Room_lastUpdated: "2025-05-18",
                    Room_updatedBy: "คุณสมหญิง",
                },
                {
                    Room_id: 3,
                    Room_number: "103",
                    Room_type: "ห้องคู่",
                    Room_description: "ห้องกว้างพร้อมอ่างอาบน้ำ",
                    Room_capacity: 4,
                    Room_price: 2000,
                    Room_status: "ปิดใช้งาน",
                    Room_note: "-",
                    Room_lastUpdated: "2025-05-18",
                    Room_updatedBy: "คุณสมหญิง",
                },
                {
                    Room_id: 4,
                    Room_number: "104",
                    Room_type: "ห้องคู่",
                    Room_description: "ห้องกว้างพร้อมอ่างอาบน้ำ",
                    Room_capacity: 4,
                    Room_price: 2000,
                    Room_status: "ใช้งานได้",
                    Room_note: "-",
                    Room_lastUpdated: "2025-05-18",
                    Room_updatedBy: "คุณสมหญิง",
                },
            ],
        };
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
        },
        filteredRooms() {
            return this.rooms.filter((room) => {
                const matchStatus = !this.statusFilter || room.Room_status === this.statusFilter;
                return matchStatus;
            });
        },
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateToAddHotel() {
            this.$router.push("/addroom");
        },
        editRoom(id) {
            alert("แก้ไขห้อง ID: " + id);
            this.$router.push(`/editroom/${id}`);
        },
        deleteRoom(id) {
            if (confirm("คุณแน่ใจว่าต้องการลบห้องนี้?")) {
                this.rooms = this.rooms.filter((room) => room.Room_id !== id);
            }
        },
        setAllRoomsStatus(newStatus) {
            const today = new Date().toISOString().split("T")[0];
            const updatedBy = "admin";

            this.rooms = this.rooms.map((room) => ({
                ...room,
                Room_status: newStatus,
                Room_lastUpdated: today,
                Room_updatedBy: updatedBy,
            }));
        },
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
};
</script>
