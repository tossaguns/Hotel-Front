<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
        <Bar />

        <div class="mt-40 md:mx-32 rounded-lg md:shadow-lg md:px-32 px-2 py-10 bg-white">
            <div class="mb-6">
                <p class="text-center font-bold text-3xl md:text-4xl text-yellow-500">
                    TODO: จำนวนเงิน บาท
                </p>
                <p class="text-sm text-center text-stone-400">TODO: รวมไม่รวมภาษี</p>
            </div>

            <!-- กล่องเลือกการจ่ายเงิน -->
            <div class="flex flex-col justify-center items-center border md:mx-20 mx-4 p-3 rounded-lg">
                <p class="text-center font-bold mb-4 text-2xl">เลือกการจ่ายเงิน</p>

                <div class="space-y-2">
                    <label class="flex items-center space-x-2">
                        <input type="radio" value="promptpay" v-model="paymentMethod" />
                        <span class="text-xl">PromptPay</span>
                    </label>

                    <label class="flex items-center space-x-2">
                        <input type="radio" value="bank" v-model="paymentMethod" />
                        <span class="text-xl">โอนผ่านธนาคาร</span>
                    </label>
                </div>

                <!-- ตัวเลือกย่อยเมื่อเลือก bank -->
                <div v-if="paymentMethod === 'bank'" class="mt-4 pl-4 space-y-2 bg-yellow-200 px-10 py-1 rounded-md">
                    <label class="flex items-center space-x-2">
                        <input type="radio" value="kbank" v-model="bankOption" />
                        <span>ธนาคารกสิกรไทย</span>
                    </label>

                    <label class="flex items-center space-x-2">
                        <input type="radio" value="ktb" v-model="bankOption" />
                        <span>ธนาคารกรุงไทย</span>
                    </label>

                    <label class="flex items-center space-x-2">
                        <input type="radio" value="bbl" v-model="bankOption" />
                        <span>ธนาคารกรุงเทพ</span>
                    </label>
                </div>
            </div>

            <div class="flex justify-center mt-3 py-2 rounded-lg">
                <button
                    class="bg-yellow-500 mx-4  text-xl font-bold text-white hover:bg-yellow-600 py-2 rounded-lg w-full transition">จ่ายเงิน</button>
            </div>
        </div>

        <div class="flex justify-center md:mt-16 mt-6 mb-20">
            <button @click="navigateToRoomDetailMember"
                class="bg-red-400 px-8 py-3 text-white font-bold rounded-lg hover:bg-red-600 transition">ย้อนกลับ</button>
        </div>
        <Footer />
    </div>
</template>

<script>
import Bar from '@/components/Bar.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: "Payment",
    components: {
        Bar,
        Footer,
    },
    data() {
        return {
            paymentMethod: '',     // 'promptpay' หรือ 'bank'
            bankOption: '',        // 'kbank', 'ktb', 'bbl' (ถ้าเลือก bank)
        }
    },
    methods: {
        navigateToRoomDetailMember() {
            this.$router.push("/roomdetailmember")
        },
    },
}
</script>

<style scoped></style>
