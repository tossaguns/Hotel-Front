<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">

            <div class="bg-stone-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 rounded-lg">
                <div class="max-w-7xl mx-auto text-center mb-10">
                    <h1 class="text-3xl font-bold text-gray-800 mb-3">
                        โปรโมชั่น <span class="text-rose-500">บริการที่เหมาะกับคุณ</span>
                    </h1>
                    <p class="text-gray-600 text-sm md:text-base">
                        เลือกโปรโมชั่นที่ตรงใจคุณ และเริ่มใช้งานได้ทันที
                    </p>
                </div>

                <!-- Promotion -->
                <div class="flex flex-wrap justify-center gap-6">
                    <div v-for="promotion in activePromotions" :key="promotion.promotion_id"
                        class="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[300px] rounded-lg shadow-lg border-4 transition hover:scale-105 flex flex-col justify-between min-h-[500px]" :class="{
                            'border-yellow-300': promotion.tonecolor === 'yellow',
                            'border-blue-300': promotion.tonecolor === 'blue',
                            'border-green-300': promotion.tonecolor === 'green',
                            'border-red-300': promotion.tonecolor === 'red',
                            'border-purple-300': promotion.tonecolor === 'purple'
                        }">
                        <div class="py-3 rounded-t-md text-white text-center font-bold text-lg break-all whitespace-pre-wrap" :class="{
                            'bg-yellow-300': promotion.tonecolor === 'yellow',
                            'bg-blue-300': promotion.tonecolor === 'blue',
                            'bg-green-300': promotion.tonecolor === 'green',
                            'bg-red-300': promotion.tonecolor === 'red',
                            'bg-purple-300': promotion.tonecolor === 'purple'
                        }">
                            {{ promotion.namePromotion || 'ชื่อโปรโมชั่น' }}
                        </div>

                        <div class="bg-white px-6 py-6 space-y-2 text-gray-700 flex flex-col flex-1 justify-between">
                            <div class="text-4xl font-bold text-center text-gray-900">
                                {{ promotion.price || '0' }}
                                <br />
                                <span class="text-sm">บาท / คน / บัญชี</span>
                            </div>
                            <ul class="list-none space-y-1 mt-4">
                                <li v-for="(line, index) in promotion.detailPromotion.split('\n')" :key="index"
                                    class="flex items-start">
                                    <span class="mr-2 mt-1">✔</span>
                                    <span class="break-all whitespace-pre-wrap flex-1">
                                        {{ line }}
                                    </span>
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
                            <div class="flex justify-center mt-4">
                                <button @click="buyPromotion(promotion)"
                                    class="bg-rose-400 hover:bg-rose-500 text-white font-semibold px-4 py-2 rounded-lg transition">
                                    ซื้อเลย
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "MainByePromotion",
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarCollapsed: false,
            allPromotions: [],
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        /*navigateBackToMainPartner() {
            this.$router.push("/request");
        },*/
    },
    mounted() {
        // const savedState = localStorage.getItem('sidebarCollapsed')
        // if (savedState !== null) {
        //     this.isSidebarCollapsed = JSON.parse(savedState)
        // }
        const saved = localStorage.getItem('adminPromotions')
        if (saved) {
            try {
                this.allPromotions = JSON.parse(saved)
            } catch (e) {
                console.error('ไม่สามารถอ่าน promotion จาก localStorage ได้:', e)
            }
        }
    },

    computed: {
        activePromotions() {
            const today = new Date()
            return this.allPromotions.filter((promo) => {
                const finish = new Date(promo.dateFinish)
                return finish >= today
            })
        },
    },
}
</script>