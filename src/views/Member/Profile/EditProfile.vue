<template>
    <div class="flex flex-col min-h-screen">
        <Bar />

        <div>

        </div>

        <Footer />
    </div>
</template>


<script>

import Bar from '@/components/Bar.vue'
import Footer from '@/components/Footer.vue'


export default {
    name: "EditProfile",
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
