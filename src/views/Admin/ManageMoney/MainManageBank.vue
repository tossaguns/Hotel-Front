<template>
    <div class="w-full min-h-screen bg-gray-100">
        <SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">

            <div class="bg-white rounded-lg pb-10 min-h-screen">
                <div class="rounded-t-lg bg-emerald-800 py-3 px-6 text-white text-lg shadow-xl">
                    <h1>การชำระเงิน</h1>
                </div>

                <div class="max-w-7xl mx-auto ">

                    <div>
                        <div class="mx-4 mt-4 cursor-pointer select-none" @click="toggleShowTrueMoney">
                            <div class="text-2xl w-full rounded-2xl shadow-md border">
                                <p class="pt-4 px-6 text-sm">
                                    <span class="px-4 py-1 rounded-lg font-bold ml-2"
                                        :class="status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'">
                                        {{ status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
                                    </span>
                                </p>
                                <div class="pb-7 flex justify-center items-center">
                                    <img src="/images/iconpayment/truemoney.png" alt="TrueMoney Logo"
                                        class="inline-block h-16 mr-3 align-middle" />
                                </div>
                            </div>
                        </div>
                        <transition name="slide-fade">
                            <div v-show="showTrueMoney">
                                <div class="border mx-6 rounded-b-lg py-4">
                                    <div class="flex justify-end space-x-2 px-5 text-sm text-gray-400">
                                        <p>กำหนดสถานะ :</p>
                                        <div class="flex items-center gap-3">
                                            <label class="flex items-center cursor-pointer">
                                                <input type="radio" class="form-radio accent-green-500" value="active"
                                                    v-model="status" />
                                                <span class="ml-2">เปิดใช้งาน</span>
                                            </label>
                                            <label class="flex items-center cursor-pointer">
                                                <input type="radio" class="form-radio accent-red-500" value="inactive"
                                                    v-model="status" />
                                                <span class="ml-2">ปิดใช้งาน</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="max-w-xl mx-auto">
                                        <div class="flex justify-center items-center mt-4">
                                            <div v-if="!isSaved || isEditing">
                                                <div class="mb-2">
                                                    <label>ชื่อบัญชี:</label>
                                                    <input v-model="editAccountName"
                                                        class="border py-2 rounded-lg px-2 w-full" />
                                                </div>
                                                <div class="mb-2">
                                                    <label>หมายเลขโทรศัพท์:</label>
                                                    <input v-model="editPhoneNumber"
                                                        class="border py-2 rounded-lg px-2  w-full" />
                                                </div>
                                                <div class="mt-4 flex gap-2 justify-center">
                                                    <button
                                                        class="bg-green-600 py-2 px-4 rounded-lg text-white font-bold hover:bg-green-500"
                                                        @click="save">
                                                        บันทึก
                                                    </button>
                                                    <button v-if="isEditing"
                                                        class="bg-gray-400 py-2 px-4 rounded-lg text-white font-bold hover:bg-gray-500"
                                                        @click="cancelEdit">
                                                        ยกเลิก
                                                    </button>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <p>ชื่อบัญชี: {{ accountName }}</p>
                                                <p>หมายเลขโทรศัพท์: {{ phoneNumber }}</p>
                                                <button
                                                    class="bg-yellow-500 py-2 px-4 rounded-lg text-white font-bold hover:bg-yellow-400 mt-2"
                                                    @click="edit">
                                                    แก้ไข
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <div>
                        <div class="mx-4 mt-4 cursor-pointer select-none" @click="toggleShowBank">
                            <div class="text-2xl w-full rounded-2xl shadow-md border">
                                <p class="pt-4 px-6 text-sm">
                                    <span class="px-4 py-1 rounded-lg font-bold ml-2"
                                        :class="status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'">
                                        {{ status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
                                    </span>
                                </p>
                                <div class="pb-3 flex justify-center items-center">
                                    <img src="/images/iconpayment/bank.png" alt="Bank Logo" class="object-cover h-52" />
                                </div>
                            </div>
                        </div>
                        <transition name="slide-fade">
                            <div v-show="showBank">
                                <div class="border mx-6 rounded-b-lg py-4 shadow-md">
                                    <div
                                        class="mt-6 flex flex-col md:flex-row md:justify-between items-center md:mx-4 gap-3">
                                        <div class="w-full md:w-1/2 px-4 md:border rounded-lg py-5">
                                            <p class="text-center font-bold text-xl">เพิ่มธนาคารในการชำระเงิน</p>
                                            <div>
                                                <div>
                                                    <p class="text-gray-500">ชื่อ-นามสกุล</p>
                                                    <input class="border w-full mb-3 py-2 rounded-md px-3" />
                                                </div>

                                                <div>
                                                    <p class="text-gray-500">ชื่อธนาคาร</p>
                                                    <input class="border w-full mb-3 py-2 rounded-md px-3" />
                                                </div>

                                                <div>
                                                    <p class="text-gray-500">เลขที่บัญชี</p>
                                                    <input class="border w-full mb-3 py-2 rounded-md px-3" />
                                                </div>

                                                <div>
                                                    <p class="text-gray-500 mb-2">รูปโลโก้</p>
                                                    <div
                                                        class="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">

                                                        <img v-if="bankLogo" :src="bankLogo" alt="Bank Logo"
                                                            class="w-full h-full object-cover rounded-lg" />


                                                        <div v-else class="text-center">
                                                            <svg class="mx-auto h-8 w-8 text-gray-400"
                                                                stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                                <path
                                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                    stroke-width="2" stroke-linecap="round"
                                                                    stroke-linejoin="round" />
                                                            </svg>
                                                            <p class="mt-1 text-xs text-gray-500">อัปโหลดรูป</p>
                                                        </div>


                                                        <button v-if="bankLogo" @click="removeLogo"
                                                            class="absolute -top-0 -right-0 bg-red-500 text-white rounded-full w-4 h-6 flex items-center justify-center hover:bg-red-600 transition-colors z-10">
                                                            <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                                viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                            </svg>
                                                        </button>

                                                        <input type="file" ref="fileInput" @change="handleFileUpload"
                                                            accept="image/*"
                                                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-5 flex justify-center gap-2">
                                                <button
                                                    class="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-500 font-bold">ยกเลิก</button>
                                                <button
                                                    class="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-500 font-bold">บันทึก</button>
                                            </div>
                                        </div>
                                        <div class="w-full md:w-1/2 px-4 py-5 rounded-lg">
                                            <p class="text-center font-bold text-xl">เเสดงรายการธนาคารที่ใช้งานอยู่</p>
                                            <div class="mt-4">
                                                <div class="border py-2 px-4 rounded-md shadow-md">
                                                    <div class="flex justify-between">
                                                        <div>
                                                            <img v-if="bankLogo" :src="bankLogo" alt="Bank Logo"
                                                                class="w-6 h-6 object-cover rounded-lg" />
                                                        </div>
                                                        <div class="w-5/6">
                                                            <div class="text-right text-xs">
                                                                <p>สถานะ</p>

                                                            </div>
                                                            <p class="text-gray-400">ธนาคาร: <span class="text-black">{{
                                                                    }}11111111</span></p>
                                                            <p class="text-gray-400">ชื่อบัญชี: <span
                                                                    class="text-black">{{
                                                                    }}11111111</span></p>
                                                            <p class="text-gray-400">เลขที่บัญชี: <span
                                                                    class="text-black text-xl font-bold">{{
                                                                    }}11111111</span></p>
                                                            <div class="text-right text-xs text-gray-400">
                                                                <p>วันที่อัปเดต: {{ }}</p>
                                                                <p>ชื่อคนที่ทำการอัปเดต: {{ }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>














                    <div>
                        fcugj
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import axios from 'axios'

const isSidebarCollapsed = ref(false)
const router = useRouter()
const bankLogo = ref(null)
const fileInput = ref(null)

const status = ref('active')
const accountName = ref('บริษัท ทรูมันนี่ จำกัด')
const phoneNumber = ref('0812345678')

const isSaved = ref(false)
const isEditing = ref(false)
const showTrueMoney = ref(false)
const showBank = ref(false)

const editAccountName = ref('')
const editPhoneNumber = ref('')

function handleSidebarToggle(isCollapsed) {
    isSidebarCollapsed.value = isCollapsed
}

function handleFileUpload(event) {
    const file = event.target.files[0]
    if (file) {
        // สร้าง URL สำหรับแสดงรูป
        bankLogo.value = URL.createObjectURL(file)
    }
}

function removeLogo(event) {
    event.preventDefault() // ป้องกันการเปิดโฟลเดอร์
    event.stopPropagation() // ป้องกันการ bubble ไปยัง input file

    // ลบรูป preview
    if (bankLogo.value) {
        URL.revokeObjectURL(bankLogo.value) // ล้าง memory
        bankLogo.value = null
    }

    // รีเซ็ต input file
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

// ฟังก์ชันบันทึกและดึงสถานะล่าสุดจาก backend
async function saveBankStatus() {
    try {
        // ส่งข้อมูลไป backend (POST หรือ PUT)
        await axios.post('/api/bank/status', {
            status: status.value,
            accountName: accountName.value,
            phoneNumber: phoneNumber.value
        })

        // ดึงสถานะล่าสุดจาก backend (GET)
        const res = await axios.get('/api/bank/status')
        status.value = res.data.status // สมมติ backend ส่ง { status: 'active' } หรือ 'inactive'
        // สามารถอัปเดตข้อมูลอื่น ๆ ได้ตาม response
    } catch (err) {
        alert('เกิดข้อผิดพลาดในการบันทึกหรือดึงสถานะ')
    }
}

function save() {
    accountName.value = editAccountName.value
    phoneNumber.value = editPhoneNumber.value
    isSaved.value = true
    isEditing.value = false
}

function edit() {
    editAccountName.value = accountName.value
    editPhoneNumber.value = phoneNumber.value
    isEditing.value = true
}

function cancelEdit() {
    isEditing.value = false
}

function toggleShowTrueMoney() {
    showTrueMoney.value = !showTrueMoney.value
}

function toggleShowBank() {
    showBank.value = !showBank.value
}

onMounted(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
        isSidebarCollapsed.value = JSON.parse(savedState)
    }
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    max-height: 0;
    opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
    max-height: 500px;
    opacity: 1;
}
</style>