TODO: เเก้ไขให้สวยกว่านี้
<template>
    <div class="w-full flex bg-gray-200 min-h-screen">
        <!-- Sidebar ด้านซ้าย -->
        <div class="flex-shrink-0">
            <SidebarAdmin />
        </div>

        <div class="w-full mt-8 md:mx-2 flex justify-center items-start">
            <div class="mt-32 flex flex-wrap justify-center gap-6">

                <div @click="navigateToManagePartner('another')"
                    class="group w-[300px] bg-white text-center shadow-lg rounded-lg p-3 cursor-pointer transition duration-300 hover:bg-rose-500 "
                    :class="activeMenu === 'another' ? 'bg-rose-500 ' : ''">
                    <p
                        class="text-2xl md:text-4xl font-semibold transition-transform duration-300 group-hover:scale-110">
                        คำขออนุมัติ
                    </p>
                </div>

                <div @click="navigateToManagePartner('another')"
                    class="group w-[300px] bg-white text-center shadow-lg rounded-lg p-3 cursor-pointer transition duration-300 hover:bg-rose-500 "
                    :class="activeMenu === 'another' ? 'bg-rose-500 ' : ''">
                    <p
                        class="text-2xl md:text-4xl font-semibold transition-transform duration-300 group-hover:scale-110">
                        เพิ่ม/ลบ/เเก้ไข Partner
                    </p>
                </div>


                <div @click="navigateToManagePartner('another')"
                    class="group w-[300px] bg-white text-center shadow-lg rounded-lg p-3 cursor-pointer transition duration-300 hover:bg-rose-500 "
                    :class="activeMenu === 'another' ? 'bg-rose-500 ' : ''">
                    <p
                        class="text-2xl md:text-4xl font-semibold transition-transform duration-300 group-hover:scale-110">

                    </p>
                </div>


                <div @click="navigateToManagePartner('another')"
                    class="group w-[300px] bg-white text-center shadow-lg rounded-lg p-3 cursor-pointer transition duration-300 hover:bg-rose-500 "
                    :class="activeMenu === 'another' ? 'bg-rose-500 ' : ''">
                    <p
                        class="text-2xl md:text-4xl font-semibold transition-transform duration-300 group-hover:scale-110">

                    </p>
                </div>


                <div @click="navigateToManagePartner('another')"
                    class="group w-[300px] bg-white text-center shadow-lg rounded-lg p-3 cursor-pointer transition duration-300 hover:bg-rose-500 "
                    :class="activeMenu === 'another' ? 'bg-rose-500 ' : ''">
                    <p
                        class="text-2xl md:text-4xl font-semibold transition-transform duration-300 group-hover:scale-110">
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'
export default {
    name: "MainManageMember",
    components: {
        SidebarAdmin
    },
    data() {
        return {

        }
    },
}
</script>
<style lang="">

</style>