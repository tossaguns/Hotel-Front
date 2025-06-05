<template>
    <div class="w-full flex bg-gray-200">
        <div class="flex-shrink-0">
            <SidebarAdmin />
        </div>

        <div class="bg-green-200 w-full mt-4 mx-2 rounded-lg p-4">
            <div>
                <p class="font-bold">Logo</p>
            </div>

            <div class="mt-4">
                <p>ใช้สำหรับออกเอกสาร/ใบเสร็จ</p>
                <div class="mt-2">
                    <p>ชื่อ</p>
                </div>
                <div class="mt-2">
                    <p>นามสกุล</p>
                </div>
                <div class="mt-2">
                    <p>ลายเซ็น</p>
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