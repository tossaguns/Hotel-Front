<template>
    <div class="flex flex-col min-w-screen">
        <div class="flex-grow flex flex-col">
            <div class="bg-amber-400 md:pt-32 pt-28">
                <div class="text-center mb-4">
                    <p class="text-2xl text-white ">จองที่พักกับ SLEEP GUN</p>
                </div>
                <div class="px-3 md:px-6 mt-2">
                    <div class="flex flex-col md:flex-row gap-2 md:gap-1 mb-5 bg-yellow-200 p-1 rounded-lg">

                        <!-- จังหวัด -->
                        <select v-model="selectedProvince" class="md:w-4/12 rounded-md px-3 py-2 bg-white">
                            <option disabled value="">เลือกจังหวัด</option>
                            <option v-for="province in provinces" :key="province" :value="province">{{ province }}
                            </option>
                        </select>

                        <!-- จำนวนคนที่เข้าพัก -->
                        <div class="relative md:w-4/12">
                            <input @click="openPopup('guest')" :value="guestSummary" readonly
                                class="w-full rounded-md px-3 py-2 bg-white cursor-pointer" />
                            <div v-if="showGuestPopup"
                                class="absolute top-full left-0 z-40 w-full bg-white p-4 mt-1 rounded-md shadow-lg">
                                <div class="flex justify-between items-center mb-4">
                                    <span>ผู้เข้าพัก</span>
                                    <div class="flex gap-2">
                                        <button @click="decreaseGuest" :disabled="guests <= 1"
                                            class="px-2 bg-gray-200 rounded">-</button>
                                        <span>{{ guests }}</span>
                                        <button @click="increaseGuest" class="px-2 bg-gray-200 rounded">+</button>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2 mb-2">
                                    <input type="checkbox" id="withPet" v-model="withPet" />
                                    <label for="withPet">ไปกับสัตว์เลี้ยง</label>
                                </div>
                                <button @click="toggleGuestPopup"
                                    class="px-3 py-1 bg-gray-700 text-white rounded">ตกลง</button>
                            </div>
                        </div>

                        <!-- วันที่เข้าพัก -->
                        <div class="relative md:w-3/12">
                            <input @click="openPopup('date')" :value="dateSummary" readonly
                                class="w-full rounded-md px-3 py-2 bg-white cursor-pointer" />

                            <div v-if="showDatePicker"
                                class="absolute top-full left-0 z-40 w-full bg-white mt-1 p-4 rounded-md shadow-lg">
                                <div class="">
                                    <div>
                                        <p>วันที่เข้าพัก :</p>
                                        <input type="date" v-model="checkInDate" class="border rounded px-2" />
                                    </div>
                                    <div class="py-3 ">
                                        <p>วันที่ออก :</p>
                                        <input type="date" v-model="checkOutDate" class="border rounded px-2" />
                                    </div>
                                </div>
                                <button @click="activePopup = null"
                                    class="mt-2 px-3 py-1 bg-gray-700 text-white rounded">ตกลง</button>
                            </div>
                        </div>

                        <!-- ปุ่มค้นหา -->
                        <button
                            class="relative md:w-1/12 rounded-md px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white font-bold">
                            ค้นหา
                        </button>

                    </div>
                </div>

            </div>

        </div>
    </div>
</template>


<script>


export default {
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
