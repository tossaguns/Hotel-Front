<template>
    <div class="w-full min-h-screen">
        <div class="text-center md:rounded-xl md:mt-20 md:mx-80 py-20 md:shadow-lg">
            <div class="text-6xl font-bold">
                Tossagun Hotel
            </div>
            <div class="m-6">
                <img src="/ImgTossagun/Tosrun.jpg" alt="icon" class="mx-auto w-6 object-contain" />
            </div>
            <div class="text-xl">
                <p>ขณะนี้เจ้าหน้าที่กำลังทำการตรวจสอบ</p>
                <p>หากการอนุมัติสำเร็จ ทางเราจะส่งข้อความเเจ้งให้ท่านทราบผ่านทาง Email</p>
            </div>

            <div class="font-bold mt-5 text-yellow-600">
                <p>
                    ขอบคุณทุกท่านที่สนใจเป็นพาทเนอร์กับเรา
                </p>
            </div>

            <div class="mt-20 ">
                <button @click="navigateToTassagunHotel"
                    class="bg-red-600 p-2 text-white rounded-md hover:bg-red-800">กลับหน้าหลัก</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        navigateToTassagunHotel() {
            this.$router.push("/")
        }
    },

}
</script>
<style></style>