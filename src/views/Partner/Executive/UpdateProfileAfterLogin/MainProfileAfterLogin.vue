<template>
    <div class="mainprofileafterlogin-bg inset-0 bg-cover bg-center z-[1] md:rounded-lg px-4 min-h-screen">
        <div class="absolute top-0 left-0 w-full h-full backdrop-blur-md z-[1]"></div>
        <div class="relative pt-32 z-[2] px-4">
            <div
                class="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg border border-amber-300 shadow-2xl rounded-3xl p-10 ring-1 ring-amber-400/40">

                <!-- ข้อความแจ้ง -->
                <div class="text-center mb-12 text-3xl font-extrabold text-gray-800 tracking-wide drop-shadow-md">
                    🌟 โปรดกรอกข้อมูลให้ครบถ้วนก่อนเข้าใช้งาน
                    <span class="text-amber-600 font-black">SleepGun</span>
                    <span class="text-red-600 text-3xl align-super">*</span>
                </div>

                <!-- ปุ่มโปรไฟล์บริษัท -->
                <div class="flex justify-center space-x-5">
                    <button @click="navigateBackToMainProfileAfterLogin"
                        class="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white text-2xl px-8 py-4 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 font-bold">
                        🏢 โปรไฟล์บริษัท
                    </button>
                </div>

                <!-- ปุ่มย้อนกลับ -->
                <div class="flex justify-center mt-32">
                    <button @click="navigateBack"
                        class="bg-gray-800 hover:bg-gray-700 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300">
                        ⬅ ย้อนกลับ
                    </button>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const partnerId = ref(null)

onMounted(() => {
    const partner = JSON.parse(localStorage.getItem('partner'))
    if (partner && partner._id) {
        partnerId.value = partner._id
    }
})

function navigateBackToMainProfileAfterLogin() {
    if (partnerId.value) {
        router.push(`/profileafterlogin/${partnerId.value}`)
    } else {
        alert('ไม่พบข้อมูลผู้ใช้ กรุณา login ใหม่')
    }
}


function navigateBack() {
    router.push('/maincompany')
}

</script>
<style>
.mainprofileafterlogin-bg {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.6) 100%),
        url('/public/images/hotel-room/register4.jpg');
}
</style>