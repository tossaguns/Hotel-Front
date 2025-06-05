<template>
    <div class="flex flex-col min-h-screen">
        <Bar />
        <Search />





        <Footer />
    </div>
</template>


<script>

import Bar from '@/components/Bar.vue'
import Footer from '@/components/Footer.vue'
import Search from '@/components/Search.vue'


export default {
    name: "MoreProvinceHotel",
    components: {
        Bar,
        Footer,
        Search

    },
    data() {
        return {
            provinces: ['กรุงเทพ', 'เชียงใหม่', 'กระบี่', 'ภูเก็ต'],
            selectedProvince: '',
            guests: 1,
            withPet: false,
            showGuestPopup: false,
            checkInDate: '',
            checkOutDate: '',
            activePopup: null,
        }
    },
    computed: {
        guestSummary() {
            return `${this.guests} คน${this.withPet ? ' + สัตว์เลี้ยง' : ''}`
        },
        dateSummary() {
            if (!this.checkInDate || !this.checkOutDate) return ''
            return `${this.checkInDate} - ${this.checkOutDate}`
        },
        showGuestPopup() {
            return this.activePopup === 'guest'
        },
        showDatePicker() {
            return this.activePopup === 'date'
        }
    },

    methods: {
        openPopup(popupName) {
            this.activePopup = this.activePopup === popupName ? null : popupName
        },
        increaseGuest() {
            this.guests++
        },
        decreaseGuest() {
            if (this.guests > 1) this.guests--
        },
    }

}
</script>

<style scoped></style>
