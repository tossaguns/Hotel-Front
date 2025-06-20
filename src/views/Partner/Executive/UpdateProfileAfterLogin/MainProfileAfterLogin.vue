<template>
    <div class="bg-white md:rounded-lg mt-2 px-4 min-h-screen">
        <div class="pt-32">
            <div class="text-center mb-12 font-bold text-xl text-stone-500">
                โปรดกรอกข้อมูลให้ครบถ้วนก่อนเข้าใช้งาน Sleep
                Gun<span class="text-red-700 px-2">*</span></div>
            <div class=" flex justify-center  space-x-5">
                <div>
                    <button @click="navigateBackToMainProfileAfterLogin"
                        class="bg-gray-300 py-3 px-4 rounded-lg text-3xl hover:bg-gray-500 hover:text-white font-bold">โปรไฟล์บริษัท</button>

                </div>
            </div>
            <div class="flex justify-center mt-32">
                <button @click="navigateBack"
                    class="bg-red-600 py-2 px-4 rounded-lg font-bold text-white hover:bg-red-500">ย้อนกลับ</button>
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
