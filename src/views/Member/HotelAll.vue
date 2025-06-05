<template>
    <div class="flex flex-col min-h-screen">
        <Bar />
        <Search />

        <div>

            TODO:
            //ทำเลือกเรทราคาได้ / ทำเลือก checkbox ได้ / ทำดรอปดาวให้เลือก
            เรียงตามราคามากไปน้อย.น้อยไปมาก.รีวิวดีสุด.รีวิวน้อยสุด.

        </div>

        <diV>
            TODO: เหลือ หน้าหลักทั้งหมดเลยของ member
        </diV>

        <diV>
            TODO: member เหลือ ประวัติการโอนเงิน ประวัติการจอง/ editprofile / หน้านี้ หมวดหมู่
        </diV>

        <diV>
            TODO: ทั้งหมดเหลือ Promotion ใน Partner เเละ ใส่ promotion ในทุกช่องที่ต้องใช้ของ partner
        </diV>

        <diV>
            TODO: เหลือ admin
        </diV>

        <diV>
            TODO: เหลือ ตกเเต่ง partner/ ตกเเต่ง register
        </diV>

        <diV>
            TODO: เหลือ backend
        </diV>

        <Footer />
    </div>
</template>


<script>

import Bar from '@/components/Bar.vue'
import Footer from '@/components/Footer.vue'
import Search from '@/components/Search.vue'


export default {
    name: "HotelAll",
    components: {
        Bar,
        Footer,
        Search

    },
    data() {
        return {

        }
    },

}
</script>

<style scoped></style>
