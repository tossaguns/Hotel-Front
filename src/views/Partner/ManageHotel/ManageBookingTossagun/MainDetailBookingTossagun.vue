<template>
    <div class="w-full min-h-screen bg-gray-100">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">
            <div>
                <div class="mt-2 rounded-t-lg bg-amber-400 p-2 text-white text-lg">
                    <h1>จัดการการจองกับ Sleep Gun</h1>
                </div>

                <div class="w-full min-h-screen bg-gray-100 py-6 px-2 md:px-4">
                    <div class="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-xl font-bold mb-8 text-center">ข้อมูลการจองกับ SleepGun</h2>
                        <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- ลำดับ -->
                            <div>
                                <label class="block text-sm font-medium">ลำดับ</label>
                                <input type="number" class="w-full border rounded px-2 py-1" />
                            </div>

                            <!-- เลขที่ห้อง -->
                            <div>
                                <label class="block text-sm font-medium">เลขที่ห้อง</label>
                                <input type="text" class="w-full border rounded px-2 py-1" />
                            </div>

                            <!-- สถานะ -->
                            <div>
                                <div class="block text-sm font-medium mb-1">สถานะ</div>
                                <select class="w-full border rounded px-2 py-1">
                                    <option>จองผ่าน Tossagun</option>
                                    <option>ยกเลิก</option>
                                </select>
                            </div>

                            <!-- ราคา -->
                            <div>
                                <label class="block text-sm font-medium">ราคา</label>
                                <input type="text" class="w-full border rounded px-2 py-1" />
                            </div>

                            <!-- การจ่ายเงิน -->
                            <div>
                                <label class="block text-sm font-medium">การจ่ายเงิน</label>
                                <select class="w-full border rounded px-2 py-1">
                                    <option>เงินสด</option>
                                    <option>บัตรเครดิต</option>
                                    <option>โอนเงิน</option>
                                </select>
                            </div>

                            <!-- ชื่อ -->
                            <div>
                                <div class="block text-sm font-medium mb-1">ชื่อ</div>
                                <input type="text" class="w-full border rounded px-2 py-1" />
                            </div>

                            <!-- วันที่จอง -->
                            <div>
                                <div class="block text-sm font-medium mb-1">วันที่จอง</div>
                                <input type="date" class="w-full border rounded px-2 py-1" />
                            </div>

                            <!-- เวลาที่จอง -->
                            <div>
                                <label class="block text-sm font-medium">เวลาที่จอง</label>
                                <input type="time" class="w-full border rounded px-2 py-1" />
                            </div>

                            <!-- วันที่เข้าพัก -->
                            <div>
                                <div class="block text-sm font-medium mb-1">วันที่เข้าพัก</div>
                                <input type="date" class="w-full border rounded px-2 py-1" />
                            </div>

                            <!-- เวลาที่เข้าพัก -->
                            <div>
                                <label class="block text-sm font-medium">เวลาที่เข้าพัก</label>
                                <input type="time" class="w-full border rounded px-2 py-1" />
                            </div>


                            <!-- วันที่ออก -->
                            <div>
                                <div class="block text-sm font-medium mb-1">วันที่ออก</div>
                                <input type="date" class="w-full border rounded px-2 py-1" />
                            </div>

                            <!-- เวลาที่ออก -->
                            <div>
                                <label class="block text-sm font-medium">เวลาที่ออก</label>
                                <input type="time" class="w-full border rounded px-2 py-1" />
                            </div>

                            <!-- หมายเหตุ -->
                            <div class="md:col-span-2">
                                <div class="block text-sm font-medium mb-1">หมายเหตุ</div>
                                <textarea class="w-full border rounded px-2 py-1" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="flex justify-center mt-5 space-x-3">
                        <button class="bg-emerald-600 p-2 rounded-lg hover:bg-emerald-400">บันทึก</button>
                        <button class="bg-gray-500 p-2 rounded-lg hover:bg-gray-300">รีเซ็ท</button>
                        <button @click="navigateBackToMainBookingTossagun"
                            class="bg-red-600 p-2 rounded-lg hover:bg-red-400">ย้อนกลับ</button>
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

        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateBackToMainBookingTossagun() {
            this.$router.push("/mainbookingtossagun");
        },


    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
}
</script>