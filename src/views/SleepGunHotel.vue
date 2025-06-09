<template>
    <div class="flex flex-col min-h-screen">
        <Bar />

        <div class="flex-grow flex flex-col">
            <Sleepgun />

            <div class="px-2 md:px-16">
                <Offer />
                <Province />
                <Recommend />
            </div>

        </div>

        <Footer />
    </div>
</template>


<script>

import Bar from '@/components/Bar.vue'
import Footer from '@/components/Footer.vue'
import Offer from '@/views/MainPage/Offer.vue'
import Sleepgun from '@/views/MainPage/Sleepgun.vue'
import Province from '@/views/MainPage/Province.vue'
import Recommend from '@/views/MainPage/Recommend.vue'



export default {
    name: "sleepgunhotel",
    components: {
        Bar,
        Footer,
        Offer,
        Sleepgun,
        Province,
        Recommend
    },
    data() {
        return {

        }
    },

}
</script>

<style scoped></style>
