<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:px-4  md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[240px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">

            <div class="bg-white md:rounded-lg min-h-screen pb-8">

                <div class="mt-2 rounded-t-lg bg-amber-400 p-2 text-white text-lg">
                    <h1>เเก้ไขโปรไฟล์</h1>
                </div>

                <div class="mt-2 py-2 px-4 ">

                    <div class="relative max-w-5xl mx-auto w-full mt-6">
                        <!--<div class="bg-stone-400 h-8 rounded-t-md"></div>-->

                        <div class="bg-white border rounded-md shadow-md min-h-full px-3 pt-8 pb-8">

                            <div class="md:flex md:justify-between mt-4">
                                <!-- ✅ คอลัมน์แรก: จัดให้อยู่กลางแนวตั้ง -->
                                <div class="md:w-1/2 flex justify-center">
                                    <div
                                        class="relative w-52 h-52 border-2 border-dashed rounded-md bg-white flex items-center overflow-hidden group">
                                        <button type="button"
                                            class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm z-10 hover:bg-black/10"
                                            v-if="!logoPreview" @click="logoInputRef?.click()">
                                            + อัปโหลดรูปโลโก้บริษัท
                                        </button>

                                        <input type="file" accept="image/*" class="hidden" @change="onLogoChange"
                                            ref="logoInputRef" />

                                        <div v-if="logoPreview" class="absolute inset-0 z-0">
                                            <img :src="logoPreview" class="w-full h-full object-cover" />
                                            <button @click.prevent.stop="removeLogo"
                                                class="absolute top-1 right-1 bg-red-700 hover:bg-red-600 bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center z-20">
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- ✅ คอลัมน์ที่สอง -->
                                <div class="lg:w-1/2 md:mt-3 mt-5">
                                    <div class="flex space-x-2 mt-2">
                                        <p class="w-1/3">ชื่อบริษัท </p>
                                        <input class="border w-full py-1 px-3 rounded-md " />
                                    </div>
                                    <div class="flex space-x-2 mt-2">
                                        <p class="w-1/3">เบอร์โทร </p>
                                        <input class="border w-full py-1 px-3 rounded-md" />
                                    </div>
                                    <div class="flex space-x-2 mt-2">
                                        <p class="w-1/3">อีเมล </p>
                                        <input class="border w-full py-1 px-3 rounded-md" />
                                    </div>
                                </div>
                            </div>

                            <hr class="border mt-6" />

                            <div class="md:flex md:justify-between gap-3">
                                <div class="max-w-2xl mx-auto mt-6 w-full">
                                    <div class="px-4 py-3">
                                        <p class="text-center font-bold mb-5 text-2xl text-stone-500">ที่อยู่บริษัท<span
                                                class="text-red-600 px-2">*</span></p>
                                        <div class="flex space-x-2">
                                            <p class="w-1/3">เลขที่ </p>
                                            <input class="border w-full py-1 px-3 rounded-md" />
                                        </div>

                                        <div class="flex space-x-2 mt-2">
                                            <p class="w-1/3">ตำบล </p>
                                            <input class="border w-full py-1 px-3 rounded-md" />
                                        </div>

                                        <div class="flex space-x-2 mt-2">
                                            <p class="w-1/3">อำเภอ </p>
                                            <input class="border w-full py-1 px-3 rounded-md" />
                                        </div>

                                        <div class="flex space-x-2 mt-2">
                                            <p class="w-1/3">จังหวัด </p>
                                            <input class="border w-full py-1 px-3 rounded-md" />
                                        </div>
                                        <div class="flex space-x-2 mt-2">
                                            <p class="w-1/3">รหัสไปรษณีย์ </p>
                                            <input class="border w-full py-1 px-3 rounded-md" />
                                        </div>

                                    </div>
                                </div>

                                <div class="max-w-2xl mx-auto mt-6 w-full border rounded-lg shadow-md">
                                    <div class="px-4 py-3">
                                        <p>เดี๋ยวกลับมาใส่ map</p>
                                        <p>ละติจูด</p>
                                        <input class="border" />
                                        <p>ลองติจูด</p>
                                        <input class="border" />
                                    </div>
                                </div>
                            </div>

                            <div class="bg-yellow-400 shadow-xl rounded-lg p-4 mt-6 w-full space-y-4 ">
                                <div class="flex space-x-2 justify-center">
                                    <p class="font-semibold">เพิ่มชื่อเเละลายเซ็นสำหรับอนุมัติใบเสร็จหรือเอกสารอื่นๆ
                                    </p>
                                    <p class="text-red-700">**</p>
                                </div>

                                <div class="max-w-2xl mx-auto py-3 px-2">
                                    <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                                        <p class="md:w-1/3 mb-1">ชื่อ-นามสกุล</p>
                                        <input type="text" class="w-full border p-2 rounded" />
                                    </div>

                                    <div class="flex flex-col md:flex-row md:items-center md:gap-4 mt-4 ">
                                        <p class="mb-1">ลายเซ็น (ภาพพื้นหลังสีขาวหรือไม่มีพื้นหลังเท่านั้น)</p>

                                        <div
                                            class="relative w-40 h-40 border-2 border-dashed rounded-md bg-white flex items-center justify-center overflow-hidden group">

                                            <button type="button"
                                                class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm z-10 hover:bg-black/10"
                                                v-if="!signaturePreview" @click="signatureInputRef?.click()">
                                                + อัปโหลดรูปลายเซ็น
                                            </button>

                                            <input type="file" accept="image/*" class="hidden"
                                                @change="onSignatureChange" ref="signatureInputRef" />


                                            <div v-if="signaturePreview" class="absolute inset-0 z-0">
                                                <img :src="signaturePreview" class="w-full h-full object-cover" />


                                                <button @click.prevent.stop="removeSignature"
                                                    class="absolute top-1 right-1 bg-red-700 hover:bg-red-600 bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center z-20">
                                                    &times;
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="max-w-xl mx-auto w-full my-8">
                                <p class="text-sm font-bold text-red-600">ข้อมูลไม่สามารถเปลี่ยนเเปลงได้
                                    หากต้องการเปลี่ยนกรุณาเเจ้งเจ้าหน้าที่ **</p>
                                <div class="flex space-x-2 mt-2">
                                    <p class="w-1/3">เลขประจำตัวผู้เสียภาษี </p>
                                    <p>เเค่เเสดงเฉยๆเเต่ยังไม่สามารถเเก้ไขได้</p>
                                </div>
                                <div class="flex space-x-2 mt-2">
                                    <p class="w-1/3">เลขบัญชีธนาคาร </p>
                                    <p></p>
                                </div>
                                <div class="flex space-x-2 mt-2">
                                    <p class="w-1/3">ชื่อธนาคารที่ทำการเปิดบัญชี </p>
                                    <p></p>
                                </div>
                                <div class="flex mb-3 mt-4">
                                    <p class="md:w-1/5 mb-1">รูปหน้าปกบัญชีธนาคาร</p>
                                    <img />
                                </div>
                            </div>


                            <div class="flex justify-center mt-14 space-x-4">
                                <button @click="navigateBackToMainProfileCompany"
                                    class="bg-red-600 hover:bg-red-500 py-2 transition  px-4 text-white font-bold rounded-lg">ย้อนกลับ</button>
                                <button
                                    class="bg-stone-500 hover:bg-stone-400 py-2 transition  px-4 text-white font-bold rounded-lg">รีเซ็ท</button>
                                <button
                                    class="bg-green-600 hover:bg-green-500 py-2 transition  px-4 text-white font-bold rounded-lg">บันทึก</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/SidebarExecutive.vue'

// Sidebar toggle
const isSidebarCollapsed = ref(false)
const router = useRouter()

function handleSidebarToggle(isCollapsed) {
    isSidebarCollapsed.value = isCollapsed
}
function navigateBackToMainProfileCompany() {
    router.push('/profilecompany')
}


const logoFile = ref(null)
const logoPreview = ref(null)
const logoInputRef = ref(null)

function onLogoChange(event) {
    const file = event.target.files[0]
    if (file) {
        logoFile.value = file
        logoPreview.value = URL.createObjectURL(file)
    }
}

function removeLogo() {
    logoFile.value = null
    logoPreview.value = null
    if (logoInputRef.value) {
        logoInputRef.value.value = ''
    }
}

const signatureFile = ref(null)
const signaturePreview = ref(null)
const signatureInputRef = ref(null)

function onSignatureChange(event) {
    const file = event.target.files[0]
    if (file) {
        signatureFile.value = file
        signaturePreview.value = URL.createObjectURL(file)
    }
}

function removeSignature() {
    signatureFile.value = null
    signaturePreview.value = null
    if (signatureInputRef.value) {
        signatureInputRef.value.value = ''
    }
}


const bankFile = ref(null)
const bankPreview = ref(null)
const bankInputRef = ref(null)

function onBankChange(event) {
    const file = event.target.files[0]
    if (file) {
        bankFile.value = file
        bankPreview.value = URL.createObjectURL(file)
    }
}

function removeBank() {
    bankFile.value = null
    bankPreview.value = null
    if (bankInputRef.value) {
        bankInputRef.value.value = ''
    }
}

</script>
