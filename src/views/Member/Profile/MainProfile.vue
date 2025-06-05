<template>
    <div class="min-h-screen bg-gray-100">
        <Bar />

        <div class="flex justify-between mt-20">
            <div class="w-1/4 bg-white shadow-r-lg px-4">

                <div>
                    <p>โปรไฟล์</p>
                </div>
                <div>
                    <p>จองห้องพัก</p>
                </div>
                <div>
                    <p>ประวัติการโอนเงิน</p>
                </div>
                <div>
                    <p>รีวิว</p>
                </div>

            </div>
            <div class="w-3/4 px-4">
                <p>โปรไฟล์</p>
                <div class="bg-white px-5 py-3 flex justify-between">
                    <div class="flex space-x-3">
                        <p>ชื่อ</p>
                        <p>....</p>
                    </div>
                    <div class="flex space-x-3">
                        <p>นามสกุล</p>
                        <p>....</p>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>


<script>

import Bar from '@/components/BarMember.vue'
import Footer from '@/components/Footer.vue'


export default {
    name: "MainProfile",
    components: {
        Bar,
        Footer,

    },
    data() {
        return {

        }
    },

}
</script>

<style scoped></style>
