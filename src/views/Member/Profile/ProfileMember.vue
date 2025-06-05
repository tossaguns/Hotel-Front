<template>
    <div class="flex flex-col min-h-screen">
        <Bar />

        <div>
            <div>
                <p>ชื่อ</p>
                <p>{{ firstName }}</p>
            </div>
            <div>
                <p>นามสกุล</p>
                <p>{{ lastName }}</p>
            </div>
            <div>
                <p>ชื่อเล่น</p>
                <p>{{ nickName }}</p>
            </div>
            <div>
                <p>เพศ</p>
                <p>{{ sex }}</p>
            </div>
            <div>
                <p>อีเมล</p>
                <p>{{ personalEmail }}</p>
            </div>
            <div>
                <p>โทร</p>
                <p>{{ personalPhone }}</p>
            </div>
            <div>
                <p>ประเภทบุคคล</p>
                <p>{{ personalType }}</p>
            </div>
            <div>
                <p>บ้านเลขที่</p>
                <p>{{ personalAddress }}</p>
            </div>
            <div>
                <p>ตำบล</p>
                <p>{{ personalSubdistrict }}</p>
            </div>
            <div>
                <p>อำเภอ</p>
                <p>{{ personalDistrict }}</p>
            </div>
            <div>
                <p>จังหวัด</p>
                <p>{{ personalProvince }}</p>
            </div>
            <div>
                <p>รหัสไปรษณีย์</p>
                <p>{{ personalPostalCode }}</p>
            </div>
        </div>

        <Footer />
    </div>
</template>


<script>

import Bar from '@/components/Bar.vue'
import Footer from '@/components/Footer.vue'


export default {
    name: "ProfileMember",
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
