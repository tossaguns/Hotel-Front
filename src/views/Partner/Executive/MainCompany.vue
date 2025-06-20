<template>
    <div class="flex justify-center mt-32 space-x-12">
        <button @click="handleNavigation('partner')" class="bg-green-300">partner</button>
        <button @click="handleNavigation('employee')" class="bg-orange-300">employee</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const partnerId = localStorage.getItem('partnerId')

const handleNavigation = async (type) => {
    try {
        const res = await axios.get(`http://localhost:9999/SleepGun/partner/get/${partnerId}`)
        const partner = res.data

        console.log('📦 partner data:', partner)  // 👉 log ข้อมูลทั้งหมด
        console.log('✅ isProfileComplete:', partner.isProfileComplete)  // 👉 log ค่านี้โดยตรง

        if (!partner.isProfileComplete) {
            console.log('⛔ ไม่ครบข้อมูล ไปหน้า mainprofileAfterLogin')
            router.push('/mainprofileAfterLogin')
            return
        }

        // ➤ กรอกครบแล้ว ไปตาม role
        if (type === 'partner') {
            console.log('➡ ไปหน้า detailhotel')
            router.push('/detailhotel')
        } else if (type === 'employee') {
            console.log('➡ ไปหน้า waitforapprove')
            router.push('/waitforapprove')
        }
    } catch (err) {
        console.error('❌ ไม่สามารถตรวจสอบข้อมูลพาร์ทเนอร์ได้:', err)
    }
}

</script>
