FIXME: เหลือเชื่อม api googlemap เเล้วลองสมัครดู
<template>
    <div class="relative w-full min-h-screen flex items-center justify-center">

        <div class="absolute inset-0 bg-cover bg-center blur-sm"
            style="background-image: url('/images/hotel-room/room06.jpg'); z-index: 0;">
        </div>

        <div class="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        <div class="flex my-4 max-w-6xl mx-auto border rounded-2xl shadow-lg overflow-hidden md:flex md:h-[80vh] ">
            <div
                class="relative z-10 flex max-w-5xl mx-auto border rounded-2xl shadow-lg overflow-hidden md:flex md:h-[80vh] bg-white bg-opacity-90 backdrop-blur-md ">

                <!-- คอลัมน์ซ้าย (รูปภาพ) -->
                <div class="relative md:w-[40%] h-full sticky top-0 hidden md:block">

                    <img src="/images/hotel-room/room06.jpg" alt="Hotel Icon" class="w-full h-full object-cover">

                    <div
                        class="absolute inset-0 flex flex-col justify-center items-center bottom-auto top-20 text-white text-lg z-20">
                        <div class="text-center">
                            <p>Register</p>
                            <p class="text-4xl font-semibold">PARTNER</p>
                        </div>
                    </div>

                    <div
                        class="absolute inset-0 flex flex-col justify-center items-center top-auto bottom-32 text-white text-lg z-20">
                        <button @click="navigateToLoginPartner"
                            class="bg-stone-500 px-3 py-2 rounded-lg font-bold shadow-xl hover:bg-stone-400 transition">Login
                            Partner</button>
                    </div>

                    <div
                        class="absolute inset-0 flex flex-col justify-center items-center top-auto bottom-16 text-white text-lg z-20">
                        <p class="text-xs">จองที่พักกับ SLEEPGUN || TOSSAGUN</p>
                    </div>

                    <div class="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/40 to-transparent z-10">
                    </div>
                    <div
                        class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/40 to-transparent z-10">
                    </div>
                </div>

                <!-- คอลัมน์ขวา (ฟอร์ม) -->
                <div
                    class="lg:w-[60%] md:w-[70%] overflow-y-auto h-full px-3 md:px-6 custom-scrollbar pb-8 pt-8 shadow-l-lg">
                    <!-- เพิ่ม py-3 ด้านใน -->
                    <div class="py-3">
                        <div class="mt-6 md:mt-0 text-center mb-4">
                            <p class="font-bold text-2xl md:text-2xl text-stone-700">สมัครสมาชิกพาทเนอร์</p>
                            <p class="text-stone-400">Register Partner</p>
                        </div>

                        <div class="flex justify-center my-8">
                            <button
                                class="bg-amber-400 py-4 px-4 rounded-2xl shadow-lg font-bold hover:bg-amber-500 hover:text-white transition">
                                อ่านข้อตกลงการเป็นพาทเนอร์ได้ที่นี่!<br />
                                <span class="text-sm text-stone-500">Read the partnership agreement here!</span>
                            </button>
                        </div>
                        <div class="flex flex-col">
                            <div class="flex items-center mb-8">
                                <div class="flex-grow border-t border-gray-300"></div>
                                <span class="mx-4 text-gray-500 font-medium">ข้อมูลส่วนบุคคล</span>
                                <div class="flex-grow border-t border-gray-300"></div>
                            </div>

                            <div class="mb-5">
                                <div class="flex space-x-1 my-1">
                                    <p class="pl-3">ชื่อ (firstname)</p><!--firstname-->
                                    <p class="text-red-600">*</p>
                                </div>
                                <input v-model="formData.firstname" class="w-full py-2 border rounded-md px-3"
                                    placeholder="ชื่อ" />
                            </div>

                            <div class="mb-5">
                                <div class="flex space-x-1  my-1">
                                    <p class="pl-3">นามสกุล (lastname)</p>
                                    <p class="text-red-600">*</p>
                                </div>
                                <input v-model="formData.lastname" class="w-full py-2 border rounded-md px-3"
                                    placeholder="นามสกุล" />
                            </div>

                            <div class="mb-5">
                                <div class="flex space-x-1  my-1">
                                    <p class="pl-3">เพศ (sex)</p><!--sex-->
                                    <p class="text-red-600">*</p>
                                </div>
                                <select v-model="sex" class="w-full py-2 border rounded-md px-3">
                                    <option value="" disabled selected>เลือกเพศ</option>
                                    <option value="male">เพศชาย</option>
                                    <option value="female">เพศหญิง</option>
                                </select>
                            </div>
                            <div class="mb-5">
                                <div class="flex space-x-1  my-1">
                                    <p class="pl-3">อีเมล (Email)</p><!--email-->
                                    <p class="text-red-600">*</p>
                                </div>
                                <input v-model="formData.email" class="w-full py-2 border rounded-md px-3"
                                    placeholder="aaaa123@gmail.com" />
                            </div>
                            <div class="mb-5">
                                <div class="flex space-x-1 my-1">
                                    <p class="pl-3">เบอร์โทร (Phone)</p><!--phone-->
                                    <p class="text-red-600">*</p>
                                </div>
                                <input v-model="formData.phone" class="w-full py-2 border rounded-md px-3"
                                    placeholder="0xx-xxxxxxx" />
                            </div>

                            <div class="mb-5">
                                <div class="flex space-x-1  my-1">
                                    <p class="pl-3">เลขบัตรประชาชน
                                        <br />
                                        <span>(IDcard number) </span>
                                    </p><!--idenNumber-->
                                    <p class="text-red-600">*</p>
                                </div>
                                <input v-model="formData.idenNumber" class="w-full py-2 border rounded-md px-3"
                                    placeholder="xxx-xxxxxxx-xx-x" />
                            </div>

                            <div class="flex justify-center flex-col items-center mb-4">
                                <div class="flex space-x-1 mb-2">
                                    <p class="pl-3 text-center">รูปเลขบัตรประชาชน
                                        <br />
                                        <span>(Image IDcard number) </span>
                                    </p><!--imageIden-->
                                    <p class="text-red-600">*</p>
                                </div>
                                <input type="file" id="input-imageIden" @change="handleFile($event, 'imageIden')"
                                    accept="image/*" class="hidden" />

                                <div class="relative w-40 h-40">
                                    <label v-if="!previewIden" for="input-imageIden"
                                        class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
                                        <span class="text-4xl text-gray-400 hover:text-yellow-500">+</span>
                                    </label>

                                    <div v-if="previewIden" class="w-full h-full rounded overflow-hidden relative">
                                        <img :src="previewIden" class="object-cover w-full h-full" />
                                        <button @click="removeImageIden"
                                            class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-5">
                            <div class="flex space-x-1  my-1">
                                <p class="pl-3">เลขวีซ่า
                                    <br />
                                    <span>(
                                        Visa number) </span>
                                </p><!--visaNumber-->
                                <p class="text-red-600">*</p>
                            </div>
                            <input v-model="formData.visaNumber" class="w-full py-2 border rounded-md px-3" />
                        </div>


                        <div class="flex justify-center flex-col items-center mb-4">
                            <div class="flex space-x-1 mb-2">
                                <p class="pl-3 text-center">รูปวีซ่า
                                    <br />
                                    <span>(Image Visa number) </span>
                                </p><!--imageVisa-->
                                <p class="text-red-600">*</p>
                            </div>
                            <input type="file" id="input-imageVisa" @change="handleFile($event, 'imageVisa')"
                                accept="image/*" class="hidden" />

                            <div class="relative w-40 h-40">
                                <label v-if="!previewVisa" for="input-imageVisa"
                                    class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
                                    <span class="text-4xl text-gray-400 hover:text-yellow-500">+</span>
                                </label>

                                <div v-if="previewVisa" class="w-full h-full rounded overflow-hidden relative">
                                    <img :src="previewVisa" class="object-cover w-full h-full" />
                                    <button @click="removeImageVisa"
                                        class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                                        ❌
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div class="flex flex-col mt-32">
                            <div class="flex items-center mb-4">
                                <div class="flex-grow border-t border-gray-300"></div>
                                <span class="mx-4 text-gray-500 font-medium">ข้อมูลบริษัท</span>
                                <div class="flex-grow border-t border-gray-300"></div>
                            </div>

                            <div class="mb-6">
                                <label class="font-bold">เลือกประเภทห้องของโรงแรม:</label>
                                <div v-for="type in hotelTypes" :key="type._id" class="mt-2 pl-4">
                                    <label>
                                        <input type="radio" :value="type._id" v-model="selectedHotelType"
                                            name="hotelType" />
                                        {{ type.name }}
                                    </label>
                                </div>
                            </div>

                            <div class="mb-5">
                                <div class="flex space-x-1  my-1">
                                    <p class="pl-3">ชื่อที่พัก (RestName)</p><!--hotelName-->
                                    <p class="text-red-600">*</p>
                                </div>
                                <input v-model="formData.hotelName" class="w-full py-2 border rounded-md px-3"
                                    placeholder="ชื่อโรงเเรม/อพาตร์ทเม้นท์/บ้านพัก/..." />
                            </div>
                            <div class="mb-5">
                                <div class="flex space-x-1  my-1">
                                    <p class="pl-3">ชื่อบริษัท (CompanyName)</p><!--companyName-->
                                    <p class="text-red-600">*</p>
                                </div>
                                <input v-model="formData.companyName" class="w-full py-2 border rounded-md px-3"
                                    placeholder="ชื่อบริษัท" />
                            </div>

                            <div class="flex justify-center flex-col items-center mb-4">
                                <div class="flex space-x-1 mb-2">
                                    <p class="pl-3 text-center">รูปที่พักด้านนอก
                                        <br />
                                        <span>(Image Rest Outdoor) </span>
                                    </p><!--imagehotelOurdoor-->
                                    <p class="text-red-600">*</p>
                                </div>

                                <input type="file" id="input-imagehotelOurdoor"
                                    @change="handleFile($event, 'imagehotelOurdoor')" accept="image/*" class="hidden" />
                                <div class="relative w-40 h-40">
                                    <label v-if="!previewLogo" for="input-imagehotelOurdoor"
                                        class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
                                        <span class="text-4xl text-gray-400 hover:text-yellow-500">+</span>
                                    </label>

                                    <div v-if="previewLogo" class="w-full h-full rounded overflow-hidden relative">
                                        <img :src="previewLogo" class="object-cover w-full h-full" />
                                        <button @click="removeimagehotelOurdoor"
                                            class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                                            ❌
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <div class="flex justify-center flex-col items-center mb-4">
                                <div class="flex space-x-1 mb-2">
                                    <p class="pl-3 text-center">ใบอนุญาติประกอบธุรกิจ
                                        <br />
                                        <span>(Business license) </span>
                                    </p><!--businessLicense-->
                                </div>
                                <!-- ช่อง input file ซ่อน -->
                                <input type="file" id="input-businessLicense"
                                    @change="handleFile($event, 'businessLicense')" accept="application/pdf"
                                    class="hidden" />

                                <div class="relative w-60 h-40">
                                    <label v-if="!selectedPdf" for="input-businessLicense"
                                        class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
                                        <span class="text-center text-gray-500 hover:text-yellow-500">
                                            <div class="text-4xl">+</div>
                                            <div class="text-sm mt-1">อัปโหลดไฟล์ PDF</div>
                                        </span>
                                    </label>

                                    <div v-else
                                        class="w-full h-full flex flex-col justify-center items-center bg-gray-100 rounded p-3 relative">
                                        <p class="text-sm text-gray-700 break-words text-center">{{ selectedPdf.name }}
                                        </p>
                                        <button @click="removePdf"
                                            class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                                            ❌
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>


                        <div class="flex items-center mb-8  mt-32">
                            <div class="flex-grow border-t border-gray-300"></div>
                            <span class="mx-4 text-gray-500 font-medium">ที่ตั้งที่พัก</span>
                            <div class="flex-grow border-t border-gray-300"></div>
                        </div>
                        <div class="mb-5">
                            <div class="flex space-x-1  my-1">
                                <p class="pl-3">บ้านเลขที่ (Address)</p><!--address-->
                                <p class="text-red-600">*</p>
                            </div>
                            <input v-model="address" class="w-full py-2 border rounded-md px-3"
                                placeholder="บ้นเลขที่" />
                        </div>
                        <div class="mb-5">
                            <div class="flex space-x-1  my-1">
                                <p class="pl-3">ตำบล (Subdistrict)</p><!--subdistrict-->
                                <p class="text-red-600">*</p>
                            </div>
                            <input v-model="subdistrict" class="w-full py-2 border rounded-md px-3"
                                placeholder="ตำบล" />
                        </div>
                        <div class="mb-5">
                            <div class="flex space-x-1  my-1">
                                <p class="pl-3">อำเภอ (District)</p>
                                <p class="text-red-600">*</p><!--district-->
                            </div>
                            <input v-model="district" class="w-full py-2 border rounded-md px-3" placeholder="อำเภอ" />
                        </div>
                        <div class="mb-5">
                            <div class="flex space-x-1  my-1">
                                <p class="pl-3">จังหวัด (Province)</p><!--province-->
                                <p class="text-red-600">*</p>
                            </div>
                            <input v-model="province" class="w-full py-2 border rounded-md px-3"
                                placeholder="จังหวัด" />
                        </div>
                        <div class="mb-5">
                            <div class="flex space-x-1  my-1">
                                <p class="pl-3">รหัสไปรษณีย์ (PostNumber)</p><!--postcode-->
                                <p class="text-red-600">*</p>
                            </div>
                            <input v-model="postcode" class="w-full py-2 border rounded-md px-3"
                                placeholder="รหัสไปรษณีย์" />
                        </div>


                        <div>
                            <div id="map" style="height: 400px;"></div>
                            <div class="text-xs flex justify-center space-x-4">
                                <p>Latitude: {{ latitude }}</p>
                                <p>Longitude: {{ longitude }}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="relative mt-8">
                            <div class="relative">
                                <p class="my-1">UserName</p><!--username-->
                                <input v-model="username" placeholder="Username"
                                    class="border w-full py-2 px-3 mb-4 rounded-md" />
                                <p class="my-1">Password</p><!--password-->
                                <div class="relative w-full mb-4 ">
                                    <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                        placeholder="Password" class="border w-full py-2 px-3 pr-10 rounded-md" />
                                    <button type="button" @click="togglePassword"
                                        class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                        <span v-if="showPassword">🙉</span>
                                        <span v-else>🙈</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center space-x-3 mt-20">
                        <button @click="submitForm"
                            class="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-500">สมัครสมาชิกพาร์ทเนอร์</button>
                        <button class="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-500">ย้อนกลับ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

function navigateToLoginPartner() {
    router.push('/loginpartner')
}

// ======= ฟอร์มข้อมูลหลัก (reactive) =======
const formData = reactive({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    idenNumber: '',
    visaNumber: '',
    hotelName: '',
    companyName: '',
    hotelType: ''
})

const sex = ref('')
const address = ref('')
const subdistrict = ref('')
const district = ref('')
const province = ref('')
const postcode = ref('')
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const selectedHotelType = ref(null)
const hotelTypes = ref([])



// ======= toggle password =======
const togglePassword = () => {
    showPassword.value = !showPassword.value
}

// ======= ไฟล์รูปและเอกสาร (reactive + preview) =======
const imageFiles = reactive({
    imageIden: null,
    imageVisa: null,
    imagehotelOurdoor: null,
    businessLicense: null
})

const previewIden = ref(null)
const previewVisa = ref(null)
const previewLogo = ref(null)
const selectedPdf = ref(null)


const submitForm = async () => {
    try {
        const formDataToSend = new FormData()
        formDataToSend.append('firstname', formData.firstname)
        formDataToSend.append('lastname', formData.lastname)
        formDataToSend.append('email', formData.email)
        formDataToSend.append('phone', formData.phone)
        formDataToSend.append('idenNumber', formData.idenNumber)
        formDataToSend.append('visaNumber', formData.visaNumber)
        formDataToSend.append('hotelName', formData.hotelName)
        formDataToSend.append('companyName', formData.companyName)

        formDataToSend.append('sex', sex.value)
        formDataToSend.append('hotelLatitude', latitude.value)
        formDataToSend.append('hotelLongitude', longitude.value)
        formDataToSend.append('hotelType', selectedHotelType.value)

        if (imageFiles.imagehotelOurdoor) formDataToSend.append('imagehotelOurdoor', imageFiles.imagehotelOurdoor)
        if (imageFiles.imageIden) formDataToSend.append('imageIden', imageFiles.imageIden)
        if (imageFiles.imageVisa) formDataToSend.append('imageVisa', imageFiles.imageVisa)
        if (imageFiles.businessLicense) formDataToSend.append('pdfLegalDocument', imageFiles.businessLicense)


        const response = await fetch('http://localhost:9999/SleepGun/partner/register', {
            method: 'POST',
            body: formDataToSend,
        })

        if (!response.ok) {
            throw new Error('Failed to submit form')
        }

        const result = await response.json()
        console.log('Response:', result)
        alert('ลงทะเบียนสำเร็จ!')

    } catch (error) {
        console.error(error)
        alert('เกิดข้อผิดพลาดในการส่งข้อมูล')
    }
}

// ======= ฟังก์ชันอัปโหลดไฟล์และแสดงพรีวิว =======
const handleFile = (event, type) => {
    const file = event.target.files[0]
    if (!file) return

    imageFiles[type] = file

    if (type === 'businessLicense') {
        selectedPdf.value = file
    } else {
        const reader = new FileReader()
        reader.onload = e => {
            if (type === 'imageIden') previewIden.value = e.target.result
            if (type === 'imageVisa') previewVisa.value = e.target.result
            if (type === 'imagehotelOurdoor') previewLogo.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}



// ======= ฟังก์ชันลบรูปและเอกสาร =======
const removeImageIden = () => {
    imageFiles.imageIden = null
    previewIden.value = null
}

const removeImageVisa = () => {
    imageFiles.imageVisa = null
    previewVisa.value = null
}

const removeimagehotelOurdoor = () => {
    imageFiles.imagehotelOurdoor = null
    previewLogo.value = null
}

const removePdf = () => {
    imageFiles.businessLicense = null
    selectedPdf.value = null
}

// ======= latitude, longitude =======
const latitude = ref(null)
const longitude = ref(null)


// ======= โหลด Google Map และจับตำแหน่ง =======
onMounted(async () => {
    fetchHotelTypes();

    const defaultLat = 13.7563
    const defaultLng = 100.5018

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: defaultLat, lng: defaultLng },
        zoom: 13
    })

    let marker = new google.maps.Marker({
        position: { lat: defaultLat, lng: defaultLng },
        map: map,
        draggable: true
    })

    latitude.value = defaultLat
    longitude.value = defaultLng

    marker.addListener('dragend', (e) => {
        latitude.value = e.latLng.lat()
        longitude.value = e.latLng.lng()
    })
})

async function fetchHotelTypes() {
    try {
        const res = await axios.get("http://localhost:9999/SleepGun/typeHotel/getAll");
        console.log('hotelTypes data:', res.data);
        hotelTypes.value = res.data;
    } catch (error) {
        console.error(error);
    }
}

/*
function loadGoogleMapsScript() {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve(window.google)
            return
        }
        const script = document.createElement('script')
        script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places'
        script.async = true
        script.defer = true
        script.onload = () => resolve(window.google)
        script.onerror = () => reject(new Error('Google Maps script load error'))
        document.head.appendChild(script)
    })
}
*/
</script>




<style>
#map {
    width: 100%;
    height: 400px;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cfcfcf;
    border-radius: 4px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: #a8a8a8;
}
</style>
