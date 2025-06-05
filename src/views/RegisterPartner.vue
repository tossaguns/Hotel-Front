<template>
    <div class="w-full min-h-screen">
        <div>
            <p>สมัครสมาชิกพาร์ทเนอร์</p>
        </div>

        <div>

        </div>

        <div class="m-6">
            <div>
                <p>ข้อมูลบุคคล</p>
                <div>
                    <label>ชื่อ: <input /></label><!--fristName-->
                </div>
                <div>
                    <label>นามสกุล: <input /></label><!--lastName-->
                </div>
                <div>
                    <label>ชื่อเล่น: <input /></label><!--nickName-->
                </div>
                <div>
                    <label>เพศ: </label><!--sex-->
                    <dropdown></dropdown>
                </div>
                <div>
                    <label>อีเมล: <input type="email" /></label><!--personalEmail-->
                </div>
                <div>
                    <label>เบอร์โทร: <input /></label><!--personalPhone-->
                </div>
                <div>
                    <label>เลขบัตรประชาชน: <input /></label><!--personalId-->
                </div>
                <div>
                    <label>รูปบัตรประชาชน: <input type="file" @change="handleIdCardImage" /></label><!--idCardImage-->
                </div>
                <div>
                    <label>ที่อยู่:</label>
                    <p>บ้านเลขที่</p><input /><!--personalAddress-->
                    <p>ตำบล</p><input /><!--personalSubdistrict-->
                    <p>อำเภอ</p><input /><!--personalDistrict-->
                    <p>จังหวัด</p><input /><!--personalProvince-->
                    <p>รหัสไปรษณีย์</p><!--personalPostalCode-->
                </div>
            </div>


            <div class="mt-8">
                <p>ข้อมูลบริษัท</p>

                <div>
                    <label>ชื่อบริษัท: <input /></label><!-- companyName-->
                </div>
                <div>
                    <label>รูปโลโก้บริษัท: <input type="file" @change="handleIdCardImage" /></label><!--companyLogo -->
                </div>
                <div>
                    <label>เบอร์ติดต่อบริษัท: <input /></label><!--companyPhone-->
                </div>
                <div>
                    <label>อีเมลติดต่อบริษัท: <input /></label><!--companyEmail-->
                </div>
                <div>
                    <label>เลขที่บัญชี: <input /></label><!--bankNumber-->
                </div>
                <div>
                    <label>ธนาคาร: <input /></label><!--bankName-->
                </div>
                <div>
                    <label>รูปบัญชี: <input type="file" @change="handleBankImage" /></label><!--bankImage-->
                </div>


                <div>
                    <label>เลขประจำตัวผู้เสียภาษี: <input /></label><!--companyTaxId-->
                </div>

                <div>
                    <label>ที่อยู่:</label>
                    <p>บ้านเลขที่</p><input /><!--companyAddress-->
                    <p>ตำบล</p><input /><!--companySubdistrict-->
                    <p>อำเภอ</p><input /><!--companyDistrict-->
                    <p>จังหวัด</p><input /><!--companyProvince-->
                    <p>รหัสไปรษณีย์</p><!--companyPostalCode-->
                </div>
                <div>
                    <label>ละติจูด: <input /></label><!--hotelLatitude-->
                </div>
                <div>
                    <label>ลองติจูด: <input /></label><!--companyTaxId-->
                </div>

            </div>

            <button type="submit" @click="navigateToWaitforApprove" class="bg-green-500 mt-3">สมัครสมาชิก</button>
            <button @click="navigateBackToRegister" class="bg-red-400 mt-3">ย้อนกลับ</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "RegisterPartner",
    data() {
        return {
           
        };
    },
    methods: {
        handleIdCardImage(event) {
            this.form.idCardImage = event.target.files[0];
        },
        handleBankImage(event) {
            this.form.bankImage = event.target.files[0];
        },
        navigateToWaitforApprove() {
            this.$router.push("/waitforapprove")
        },
        navigateBackToRegister() {
            this.$router.push("/register")
        }

    },
};
</script>
