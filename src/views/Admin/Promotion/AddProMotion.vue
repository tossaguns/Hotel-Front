<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1 flex bg-white rounded-lg pb-10 mt-2 ">
                    <div class="w-full">
                        <div class="py-2 bg-rose-400 rounded-t-lg">
                            <p class="text-center md:text-left text-xl text-white px-2">เพิ่มโปรโมชั่น</p>
                        </div>

                        <div class="bg-white md:rounded-b-lg px-4 min-h-screen mt-4">
                            <p class="text-2xl font-bold text-center py-4">
                                เพิ่มโปรโมชั่น
                            </p>

                            <div>
                                <p class="mb-2">ชื่อโปรโมชั่น</p>
                                <input class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4"
                                    v-model="promotion.namePromotion" />
                            </div>
                            <div>
                                <p class="mb-2">รายละเอียด</p>
                                <textarea rows="5" v-model="promotion.detailPromotion"
                                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
                                    placeholder="พิมพ์ทีละบรรทัด เช่น&#10;พื้นที่อีเมล 50GB&#10;พื้นที่ Cloud 1TB..."></textarea>
                            </div>
                            <div class="mb-4">
                                <p class="mb-2">เลือกโทนสี</p>
                                <select v-model="promotion.tonecolor"
                                    class="border border-gray-300 px-3 py-2 rounded w-full">
                                    <option value="yellow">เหลือง</option>
                                    <option value="blue">น้ำเงิน</option>
                                    <option value="green">เขียว</option>
                                    <option value="red">แดง</option>
                                    <option value="purple">ม่วง</option>
                                </select>
                            </div>
                            <div>
                                <p class="mb-2">วันเริ่มโปรโมชั่น</p>
                                <input type="date" v-model="promotion.dateStart"
                                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                            </div>
                            <div>
                                <p class="mb-2">วันสิ้นสุดโปรโมชั่น</p>
                                <input type="date" v-model="promotion.dateFinish"
                                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                            </div>
                            <div>
                                <p class="mb-2">ราคา</p>
                                <input v-model="promotion.price"
                                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                            </div>

                            <div class="my-6 flex justify-center space-x-3">
                                <button
                                    class="bg-green-500 py-2 px-3 text-white rounded-lg hover:bg-green-600">บันทึก</button>
                                <button
                                    class="bg-gray-400 py-2 px-3 text-white rounded-lg hover:bg-gray-600">รีเซ็ท</button>
                                <button @click="navigateBackToMainPromotion"
                                    class="bg-red-500 py-2 px-3 text-white rounded-lg hover:bg-red-600">ย้อนกลับ</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full max-w-md mx-auto h-full mt-6 rounded-lg shadow-lg border-4" :class="{
                    'border-yellow-300': promotion.tonecolor === 'yellow',
                    'border-blue-300': promotion.tonecolor === 'blue',
                    'border-green-300': promotion.tonecolor === 'green',
                    'border-red-300': promotion.tonecolor === 'red',
                    'border-purple-300': promotion.tonecolor === 'purple'
                }">

                    <!-- หัวโปรโมชั่น -->
                    <div class="py-3 rounded-t-md text-white text-center font-bold text-lg break-all whitespace-pre-wrap" :class="{
                        'bg-yellow-300': promotion.tonecolor === 'yellow',
                        'bg-blue-300': promotion.tonecolor === 'blue',
                        'bg-green-300': promotion.tonecolor === 'green',
                        'bg-red-300': promotion.tonecolor === 'red',
                        'bg-purple-300': promotion.tonecolor === 'purple'
                    }">
                        {{ promotion.namePromotion || 'ชื่อโปรโมชั่น' }}
                    </div>

                    <!-- เนื้อหาข้างใน -->
                    <div class="bg-white px-6 py-6 space-y-2 text-gray-700">
                        <div class="text-6xl font-bold text-center text-gray-900">
                            {{ promotion.price || '0' }} <br><span class="text-sm">บาท / คน / บัญชี</span>
                        </div>
                        <ul class="list-none space-y-1 mt-4">
                            <li v-for="(line, index) in promotion.detailPromotion.split('\n')" :key="index"
                                class="flex items-start">
                                <span class="mr-2 mt-1">✔</span>
                                <span class="break-all whitespace-pre-wrap w-0 flex-1 text-gray-700">{{ line
                                    }}</span>
                            </li>
                            <li class="flex items-start">
                                <span class="mr-2 mt-1">📅</span>
                                <span class="text-sm">เริ่ม: {{ promotion.dateStart || '-' }}</span>
                            </li>
                            <li class="flex items-start">
                                <span class="mr-2 mt-1">📅</span>
                                <span class="text-sm">สิ้นสุด: {{ promotion.dateFinish || '-' }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'

export default {
    name: "AddProMotion",
    components: {
        SidebarAdmin
    },
    data() {
        return {
            isSidebarCollapsed: false,
            promotion: {
                namePromotion: '',
                detailPromotion: '',
                dateStart: '',
                dateFinish: '',
                price: '',
                tonecolor: '',
            }
        };
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed;
        },
        navigateBackToMainPromotion() {
            this.$router.push("/mainpromotion");
        }
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState);
        }
    }
}
</script>
