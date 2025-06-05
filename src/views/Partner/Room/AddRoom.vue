//TODO: เเก้ไขให้ upload รูปได้เเค่รูปเดียว สำหรับรูปปกหน้าโรงเเรม/ ในลักษณะห้องพักให้กลับมาใส่ icon ทีหลัง/เเก้ style
ให้เข้าธีม
<template>

    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 px-4 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[260px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
            <div class="text-center border mx-1 mt-2 mb-12 rounded-md shadow-xl bg-white">
                <div
                    class="text-center text-4xl sm:text-6xl font-bold mb-20 text-white bg-stone-500 pt-20 pb-10 rounded-t-lg">
                    <h1>เพิ่มห้องพัก</h1>
                </div>

                <div class="flex flex-wrap items-center gap-2 mx-5 pb-1 text-sm justify-center text-center">
                    <span>ที่อยู่โรงแรม ที่พัก กรุงเทพ, 52000 /</span>
                    <span>{{ currentDate }} /</span>
                    <span> รายชื่อพนักงาน เดี๋ยวไปต่อกับดาต้าเบส </span>
                </div>

                <div class="flex flex-col lg:flex-row justify-between gap-4 mx-2 px-3">
                    <!-- Left Column -->
                    <div class="flex flex-col items-center text-center w-full lg:w-1/2 border rounded-lg py-8 px-4">
                        <div class="mb-6 text-2xl sm:text-3xl">
                            <h>รายละเอียด</h>
                        </div>



                        <div class="w-full space-y-4">
                            <div class="relative">
                                <input v-model="numberroom" type="text" id="roomInput" required
                                    class="peer h-14 w-full border-2 rounded-xl px-4 text-xl text-black placeholder-transparent hover:border-yellow-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
                                    placeholder="เลขที่ห้อง" />
                                <label for="roomInput"
                                    class="absolute left-4 text-lg bg-white px-1 pointer-events-none text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-yellow-500 peer-valid:-top-2 peer-valid:text-sm peer-valid:text-yellow-500">
                                    เลขที่ห้อง
                                </label>
                            </div>

                            <div class="relative">
                                <input v-model="typeroom" type="text" id="typeInput" required
                                    class="peer h-14 w-full border-2 rounded-xl px-4 text-xl text-black placeholder-transparent hover:border-yellow-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
                                    placeholder="ประเภทห้องพัก" />
                                <label for="typeInput"
                                    class="absolute left-4 text-lg bg-white px-1 pointer-events-none text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-yellow-500 peer-valid:-top-2 peer-valid:text-sm peer-valid:text-yellow-500">
                                    ประเภทห้องพัก
                                </label>
                            </div>

                            <div class="relative">
                                <input v-model="price" type="text" id="priceInput" required
                                    class="peer h-14 w-full border-2 rounded-xl px-4 text-xl text-black placeholder-transparent hover:border-yellow-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
                                    placeholder="ราคา" />
                                <label for="priceInput"
                                    class="absolute left-4 text-lg bg-white px-1 pointer-events-none text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-yellow-500 peer-valid:-top-2 peer-valid:text-sm peer-valid:text-yellow-500">
                                    ราคา
                                </label>
                            </div>

                            <div class="relative">
                                <input v-model="peopleperroom" type="text" id="peopleInput" required
                                    class="peer h-14 w-full border-2 rounded-xl px-4 text-xl text-black placeholder-transparent hover:border-yellow-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
                                    placeholder="จำนวนคนที่สามารถเข้าพักได้" />
                                <label for="peopleInput"
                                    class="absolute left-4 text-lg bg-white px-1 pointer-events-none text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-yellow-500 peer-valid:-top-2 peer-valid:text-sm peer-valid:text-yellow-500">
                                    จำนวนคนเข้าพัก
                                </label>
                            </div>



                            <div class="relative">
                                <textarea v-model="note" id="noteInput" rows="4"
                                    class="peer w-full border-2 rounded-xl px-4 pt-4 text-xl text-black placeholder-transparent hover:border-yellow-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition resize-none"
                                    placeholder="หมายเหตุ"></textarea>
                                <label for="noteInput"
                                    class="absolute left-4 text-lg bg-white px-1 text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-yellow-500 peer-valid:-top-2 peer-valid:text-sm peer-valid:text-yellow-500">
                                    หมายเหตุ
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column (Image Upload) -->
                    <div class="flex w-full lg:w-1/2 border rounded-lg py-8 px-4">
                        <div class="w-full">
                            <h2 class="mb-6 text-2xl sm:text-3xl">อัปโหลดรูปภาพเพิ่มเติม (สูงสุด 10 รูป)</h2>
                            <div class="w-full border-2 border-dashed border-yellow-500 rounded-lg p-4 text-center text-gray-500 cursor-pointer hover:bg-yellow-50 transition"
                                @click="$refs.fileInput.click()" @dragover.prevent @drop.prevent="handleDrop">
                                <p class="mb-2">ลากและวางรูปภาพที่นี่ หรือคลิกเพื่อเลือก</p>
                                <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" multiple
                                    class="hidden" :disabled="imagePreviews.length >= 10" />
                            </div>

                            <div class="flex flex-wrap justify-start gap-4 mt-4">
                                <div v-for="(img, index) in imagePreviews" :key="index"
                                    class="relative w-32 h-32 border rounded shadow">
                                    <img :src="img" class="w-full h-full object-cover rounded" />
                                    <button @click="removeImage(index)"
                                        class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                                        title="ลบรูปนี้">
                                        ✕
                                    </button>
                                </div>

                                <div v-if="imagePreviews.length < 10" @click="$refs.fileInput.click()"
                                    class="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500 transition">
                                    <span class="text-3xl text-gray-400 hover:text-yellow-500">+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Room Features -->

                <!--เเก้-->
                <div class="mb-6 flex justify-center border rounded-lg mx-4 my-3">
                    <div class="w-full max-w-6xl py-8">
                        <p class="text-2xl sm:text-3xl mb-8 text-center">กรุณาเลือกลักษณะห้องพัก</p>

                        <div class="text-xl">
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
                                <div class="text-left" v-for="(section, typeOption) in features" :key="typeOption">
                                    <p class="font-bold mb-2">{{ section.title }}</p>
                                    <div v-for="(item, i) in section.items" :key="index + '-' + i">
                                        <label><input type="checkbox" v-model="item.selected" />
                                            {{ item.label }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 py-6 px-3">
                    <button class="flex-1 bg-lime-500 text-white py-3 rounded-lg hover:bg-lime-700 shadow-xl">
                        บันทึก
                    </button>
                    <button class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-700 shadow-xl"
                        @click="reseatall">
                        รีเซ็ต
                    </button>
                    <button class="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-700 shadow-xl"
                        @click="navigateToBackMainRoom">
                        ย้อนกลับ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "AddRoom",
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarCollapsed: false,
            currentDate: "",
            statusRoom: "",
            numberroom: "",
            typeroom: "",
            price: "",
            peopleperroom: "",
            province: "",
            uploadimg: null,
            imageUrl: null,
            detail: "",
            markdetail: "",
            note: "",
            imagePreviews: [],

            typeOption: [
                {
                    title: "กิจกรรม",
                    items: [
                        { label: "สนามเด็กเล่น", selected: false },
                        { label: "สวน", selected: false },
                        { label: "ส่วนกลาง", selected: false },
                        { label: "ยิม", selected: false },
                        { label: "สระน้ำ", selected: false },
                    ],
                },
                {
                    title: "ลักษณะห้อง",
                    items: [
                        { label: "ระเบียง", selected: false },
                        { label: "ห้องครัว", selected: false },
                        { label: "เครื่องซักผ้า", selected: false },
                        { label: "เครื่องอบผ้า", selected: false },
                        { label: "ไมโครเวฟ", selected: false },
                    ],
                },
                {
                    title: "ลักษณะเตียง",
                    items: [
                        { label: "คิงไซต์", selected: false },
                        { label: "ควีนไซต์", selected: false },
                        { label: "เตียงเล็ก", selected: false },
                        { label: "เตียงเดี่ยว", selected: false },
                        { label: "เตียงคู่", selected: false },
                    ],
                },
                {
                    title: "ข้อห้าม",
                    items: [
                        { label: "ห้ามเลี้ยงสัตว์", selected: false },
                        { label: "ห้ามสูบบุหรี่", selected: false },
                        { label: "ห้ามเสียงดัง", selected: false },
                        { label: "ห้ามดื่มสุรา", selected: false },
                        { label: "ห้ามนำทุเรียนเข้ามา", selected: false },
                    ],
                },
            ],
        };
    },

    mounted() {
        const today = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        this.currentDate = today.toLocaleDateString("th-TH", options);
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateToBackMainRoom() {
            this.$router.push("/roomlist");
        },
        reseatall() {
            this.statusRoom = "";
            this.numberroom = "";
            this.typeroom = "";
            this.price = "";
            this.peopleperroom = "";
            this.uploadimg = null;
            this.imageUrl = null;
            this.detail = "";
            this.markdetail = "";

            this.$refs.fileInput.value = null;

            this.activities.forEach((item) => (item.selected = false));
            this.roomFeatures.forEach((item) => (item.selected = false));
            this.bedTypes.forEach((item) => (item.selected = false));
            this.restrictions.forEach((item) => (item.selected = false));
            this.imagePreviews = [];
        },
        onFileChange(event) {
            const files = Array.from(event.target.files);
            const remainingSlots = 10 - this.imagePreviews.length;

            const selectedFiles = files.slice(0, remainingSlots);

            selectedFiles.forEach((file) => {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.imagePreviews.push(e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            });

            this.$refs.fileInput.value = null;
        },
        removeImage(index) {
            this.imagePreviews.splice(index, 1);
        },
        onFileChange(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length && this.imagePreviews.length < 10; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreviews.push(e.target.result);
                };
                reader.readAsDataURL(files[i]);
            }
            event.target.value = ""; // reset input
        },
        handleDrop(event) {
            const files = event.dataTransfer.files;
            for (let i = 0; i < files.length && this.imagePreviews.length < 10; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreviews.push(e.target.result);
                };
                reader.readAsDataURL(files[i]);
            }
        },
        removeImage(index) {
            this.imagePreviews.splice(index, 1);
        },
    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
};
</script>
