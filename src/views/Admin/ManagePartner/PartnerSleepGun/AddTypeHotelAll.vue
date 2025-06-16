TODO: เสร็จ เหลือออกเเบบ font ให้สวย
<template>
    <div class="w-full min-h-screen bg-gray-200">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4 px-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[240px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div>

                <div class="mt-2 rounded-t-lg bg-rose-400 p-2 text-white text-lg">
                    <h1>เพิ่มตัวเลือกห้องพัก</h1>
                </div>

                <div class="bg-white rounded-b-lg">
                    <div class="max-w-7xl mx-auto px-3 md:px-4 py-6">
                        <div class="text-center">
                            <p class="text-3xl font-bold">ตัวเลือกห้องพัก</p>
                        </div>
                        <hr class="border-2 my-4" />

                        <div v-for="box in boxes" :key="box.id" :ref="el => { if (el) boxRefs[box.id] = el }"
                            class="scroll-smooth rounded-xl mb-2 transition-all duration-300" :class="{
                                'border-cyan-500 bg-cyan-50 text-cyan-800': box.id === 'typeHotel',
                                'border-lime-500 bg-lime-50 text-lime-800': box.id === 'typeFacility',
                                'border-stone-500 bg-stone-50 text-stone-800': box.id === 'typeRoom',
                                'border-amber-500 bg-amber-50 text-amber-800': box.id === 'typeFood',
                                'border-indigo-500 bg-indigo-50 text-indigo-800': box.id === 'typeFor',
                                'border-fuchsia-500 bg-fuchsia-50 text-fuchsia-800': box.id === 'typeNear',
                                'border-slate-500 bg-slate-50 text-slate-800': box.id === 'typePayment',
                            }">
                            <!-- ส่วนหัวของกล่อง -->
                            <div class="w-full h-32 cursor-pointer flex flex-col items-center justify-center text-2xl font-semibold rounded-t-xl transition-all duration-300 hover:brightness-95"
                                @click="toggleBox(box.id)">
                                <div class="text-sm mb-1 opacity-70">หมวดหมู่</div>
                                {{ box.label }}
                            </div>

                            <!-- เนื้อหาภายใน -->
                            <div v-if="activeBox === box.id"
                                class="mt-0 p-4 border-t border-gray-300 bg-white rounded-b-xl shadow-inner">
                                <component :is="components[box.component]" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import { ref, nextTick } from 'vue'

import { useRouter } from "vue-router";
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import AddTypeHotel from "@/views/Admin/ManagePartner/PartnerSleepGun/typeHotel/AddTypeHotel.vue";
import AddTypeFacilityHotel from "@/views/Admin/ManagePartner/PartnerSleepGun/typeHotel/AddTypeFacilityHotel.vue";
import AddTypeRoomHotel from "@/views/Admin/ManagePartner/PartnerSleepGun/typeHotel/AddTypeRoomHotel.vue";
import AddTypeFoodHotel from "@/views/Admin/ManagePartner/PartnerSleepGun/typeHotel/AddTypeFoodHotel.vue";
import AddTypeHotelFor from "@/views/Admin/ManagePartner/PartnerSleepGun/typeHotel/AddTypeHotelFor.vue";
import AddTypeHotelNear from "@/views/Admin/ManagePartner/PartnerSleepGun/typeHotel/AddTypeHotelNear.vue";
import AddTypePaymentPolicy from "@/views/Admin/ManagePartner/PartnerSleepGun/typeHotel/AddTypePaymentPolicy.vue";

const boxRefs = ref({})
const activeBox = ref(null)

const components = {
    AddTypeHotel,
    AddTypeFacilityHotel,
    AddTypeRoomHotel,
    AddTypeFoodHotel,
    AddTypeHotelFor,
    AddTypeHotelNear,
    AddTypePaymentPolicy
}

const boxes = [
    { id: 'typeHotel', label: 'ประเภทโรงแรม', component: 'AddTypeHotel' },
    { id: 'typeFacility', label: 'สิ่งอำนวยความสะดวก', component: 'AddTypeFacilityHotel' },
    { id: 'typeRoom', label: 'ประเภทห้องพัก', component: 'AddTypeRoomHotel' },
    { id: 'typeFood', label: 'อาหารในโรงแรม', component: 'AddTypeFoodHotel' },
    { id: 'typeFor', label: 'เหมาะสำหรับ', component: 'AddTypeHotelFor' },
    { id: 'typeNear', label: 'สถานที่ใกล้เคียง', component: 'AddTypeHotelNear' },
    { id: 'typePayment', label: 'นโยบายการจ่ายเงิน', component: 'AddTypePaymentPolicy' }
]


function toggleBox(id) {
    activeBox.value = activeBox.value === id ? null : id

    nextTick(() => {
        setTimeout(() => {
            const el = boxRefs.value[id]
            if (el && activeBox.value === id) {
                const rect = el.getBoundingClientRect()
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                const top = rect.top + scrollTop - window.innerHeight / 2 + rect.height / 2

                window.scrollTo({
                    top,
                    behavior: 'smooth'
                })
            }
        }, 100)
    })
}
























const router = useRouter();

//======= Sidebar ===========
const isSidebarCollapsed = ref(false);

// เมื่อ Sidebar toggle
function handleSidebarToggle(isCollapsed) {
    isSidebarCollapsed.value = isCollapsed;
}

</script>


<style scoped>
.container {
    scroll-behavior: smooth;
}
</style>