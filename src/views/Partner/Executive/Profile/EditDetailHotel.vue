<template>

    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div class="bg-white rounded-lg pb-10 ">
                <div class="py-2 bg-amber-400 rounded-t-lg">
                    <p class="text-center md:text-left text-xl text-white px-2">เเก้ไขข้อมูลเกี่ยวกับโรงเเรมของคุณ</p>
                </div>

                <div class="bg-white md:rounded-b-lg px-4 min-h-screen mt-4">
                    <div>
                        <p class="mb-2">อธิบายเกี่ยวกับโรงเเรมของคุณ</p>
                        <textarea rows="3" class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                            placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
                    </div>

                    <div>
                        <p class="mb-2">อธิบายเกี่ยวกับทำเลที่ตั้งของคุณ</p>
                        <textarea rows="3" class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                            placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
                    </div>

                    <div>
                        <p class="mb-2">อธิบายเกี่ยวกับสิ่งอำนวยความสะดวกของคุณ</p>
                        <textarea rows="3" class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                            placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
                    </div>

                    <div>
                        <p class="mb-2">สถานที่ท่องเที่ยวใกล้เคียง</p>
                        <textarea rows="3" class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                            placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
                    </div>

                    <div>
                        <div>
                            TODO: ดึงข้อมูลของ checkbox ของโรงเเรม
                        </div>
                    </div>









                    <div class="flex flex-col mt-32">
                        <p class="text-xl text-yellow-800 font-bold text-center">
                            คำถามที่มักพบบ่อย
                        </p>
                        <div class="flex flex-col md:flex-row md:items-center md:gap-4 mt-3 ">
                            <p class="md:w-1/3">1. โรงเเรมคุณมีอาหารเช้าหรือไม่?</p>
                            <input type="text" class="w-full border p-2 rounded md:w-2/3" />
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center md:gap-4 mt-3">
                            <p class="md:w-1/3">2. มีกำหนดเวลา CheckIn-CheckOut หรือไม่?</p>
                            <input type="text" class="w-full border p-2 rounded md:w-2/3" />
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center md:gap-4 mt-3">
                            <p class="md:w-1/3">3. ส่วนกลางมีกิจกรรมหรือสิ่งอำนวยสะดวกใดบ้าง?</p>
                            <input type="text" class="w-full border p-2 rounded md:w-2/3" />
                        </div>
                        <div class="flex flex-col md:flex-row md:items-center md:gap-4 mt-3">
                            <p class="md:w-1/3">4. การเดินทางมาเข้าพักสามารถทำยังไงได้บ้าง?</p>
                            <input type="text" class="w-full border p-2 rounded md:w-2/3" />
                        </div>

                    </div>

                    <div class="flex justify-center mt-8 mb-6 space-x-3">
                        <button class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">บันทึก</button>
                        <button class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500">รีเซต</button>
                        <button @click="navigateToDetailHotel"
                            class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">กลับ</button>
                    </div>
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

        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateToDetailHotel() {
            this.$router.push("/detailhotel");
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