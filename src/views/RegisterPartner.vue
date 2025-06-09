<template>
    <div class="w-full min-h-screen p-6 bg-gray-100">
        <h2 class="text-xl font-bold mb-4">สมัครสมาชิกพาร์ทเนอร์</h2>

        <!-- ข้อมูลส่วนบุคคล -->
        <div class="border-2 bg-white p-3 space-x-3 space-y-3 rounded-lg">
            <p class="font-semibold">ข้อมูลบุคคล</p>
            <input v-model="partner.firstname" placeholder="ชื่อ" />
            <input v-model="partner.lastname" placeholder="นามสกุล" />
            <input v-model="partner.nickname" placeholder="ชื่อเล่น" />
            <input v-model="partner.sex" placeholder="เพศ" />
            <input type="email" v-model="partner.email" placeholder="อีเมล" />
            <input v-model="partner.phone" placeholder="เบอร์โทร" />
            <input v-model="partner.idenNumber" placeholder="เลขบัตรประชาชน" />
            <input type="file" @change="handleFile($event, 'imageIden')" />
            <img v-if="partner.imageIdenPreview" :src="partner.imageIdenPreview" class="w-32 mt-2 rounded" />
        </div>

        <!-- ข้อมูลบริษัท -->
        <div class="border-2 bg-white p-3 space-x-3 space-y-3 rounded-lg mt-6">
            <p class="font-semibold">ข้อมูลบริษัท</p>
            <input v-model="partner.companyName" placeholder="ชื่อบริษัท" />
            <input type="file" @change="handleFile($event, 'imageLogo')" />
            <img v-if="partner.imageLogoPreview" :src="partner.imageLogoPreview" class="w-32 mt-2 rounded" />
        </div>

        <!-- ปุ่ม -->
        <div class="mt-6 space-x-4 flex justify-center">
            <button @click="submitForm" class="bg-green-500 text-white px-4 py-2 rounded">สมัครสมาชิก</button>
            <button @click="navigateBack" class="bg-red-400 text-white px-4 py-2 rounded">ย้อนกลับ</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "RegisterPartner",
    data() {
        return {
            partner: {
                firstname: "",
                lastname: "",
                nickname: "",
                sex: "",
                email: "",
                phone: "",
                idenNumber: "",
                imageIden: null,
                imageIdenPreview: null,
                companyName: "",
                imageLogo: null,
                imageLogoPreview: null,
            },
        };
    },
    methods: {
        handleFile(event, field) {
            const file = event.target.files[0];
            if (file) {
                this.partner[field] = file;
                this.partner[field + "Preview"] = URL.createObjectURL(file);
            }
        },

        toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });
        },

        async submitForm() {
            try {
                // ... ตรวจสอบฟิลด์ required ตามเดิม

                // แปลงไฟล์เป็น base64
                const imageIdenBase64 = this.partner.imageIden
                    ? await this.toBase64(this.partner.imageIden)
                    : "";
                const imageLogoBase64 = this.partner.imageLogo
                    ? await this.toBase64(this.partner.imageLogo)
                    : "";

                const data = {
                    firstname: this.partner.firstname,
                    lastname: this.partner.lastname,
                    nickname: this.partner.nickname,
                    sex: this.partner.sex,
                    email: this.partner.email,
                    phone: this.partner.phone,
                    idenNumber: this.partner.idenNumber,
                    imageIden: imageIdenBase64,
                    companyName: this.partner.companyName,
                    imageLogo: imageLogoBase64,
                };

                const res = await axios.post(
                    "http://localhost:9999/SleepGun/partner/register",
                    data,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );

                alert("สมัครสำเร็จ");
                this.$router.push("/waitforapprove");
            } catch (err) {
                console.error("Error response from server:", err.response);

                // ดึงข้อความ error จาก backend มาแสดง หรือถ้าไม่มี ให้แสดงข้อความทั่วไป
                let errorMsg = "ไม่สามารถสมัครสมาชิกได้";

                if (err.response && err.response.data) {
                    if (typeof err.response.data.message === "string") {
                        errorMsg = err.response.data.message;
                    } else if (typeof err.response.data.message === "object") {
                        // กรณี backend ส่ง validation error หลายตัวมาเป็น object
                        errorMsg = Object.values(err.response.data.message).join(", ");
                    }
                }

                alert(errorMsg);
            }
        },



        navigateBack() {
            this.$router.push("/register");
        },
    },
};
</script>
