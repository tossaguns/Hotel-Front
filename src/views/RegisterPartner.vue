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
                    <label>ชื่อ: <input v-model="partner.fristName" /></label><!--fristName-->
                </div>
                <div>
                    <label>นามสกุล: <input v-model="partner.lastName" /></label><!--lastName-->
                </div>
                <div>
                    <label>ชื่อเล่น: <input v-model="partner.nickName" /></label><!--nickName-->
                </div>
                <div>
                    <label>เพศ: </label><!--sex-->
                    <dropdown v-model="partner.sex"></dropdown>
                </div>
                <div>
                    <label>อีเมล: <input type="email" v-model="partner.personalEmail" /></label><!--personalEmail-->
                </div>
                <div>
                    <label>เบอร์โทร: <input v-model="partner.personalPhone" /></label><!--personalPhone-->
                </div>
                <div>
                    <label>เลขบัตรประชาชน: <input v-model="partner.personalId" /></label><!--personalId-->
                </div>
                <div>
                    <label>
                        รูปบัตรประชาชน:
                        <input type="file" @change="handleIdCardImage" />
                    </label>

                    <div v-if="partner.personalIdPreview">
                        <p>Preview:</p>
                        <img :src="partner.personalIdPreview" class="w-40 mt-2 rounded" />
                    </div>
                </div>
                <div>
                    <label>ที่อยู่:</label>
                    <p>บ้านเลขที่</p><input v-model="partner.personalAddress" /><!--personalAddress-->
                    <p>ตำบล</p><input v-model="partner.personalSubdistrict" /><!--personalSubdistrict-->
                    <p>อำเภอ</p><input v-model="partner.personalDistrict" /><!--personalDistrict-->
                    <p>จังหวัด</p><input v-model="partner.personalProvince" /><!--personalProvince-->
                    <p>รหัสไปรษณีย์</p><input v-model="partner.personalPostalCode" /><!--personalPostalCode-->
                </div>
            </div>


            <div class="mt-8">
                <p>ข้อมูลบริษัท</p>

                <div>
                    <label>ชื่อบริษัท: <input v-model="partner.companyName" /></label><!-- companyName-->
                </div>
                <div>
                    <label>
                        รูปโลโก้บริษัท:
                        <input type="file" @change="handleCompanyLogo" />
                    </label>

                    <div v-if="partner.companyLogoPreview">
                        <p>Preview โลโก้:</p>
                        <img :src="partner.companyLogoPreview" class="w-40 mt-2 rounded" />
                    </div>
                </div>
                <div>
                    <label>เบอร์ติดต่อบริษัท: <input v-model="partner.companyPhone" /></label><!--companyPhone-->
                </div>
                <div>
                    <label>อีเมลติดต่อบริษัท: <input v-model="partner.companyEmail" /></label><!--companyEmail-->
                </div>
                <div>
                    <label>เลขที่บัญชี: <input v-model="partner.bankNumber" /></label><!--bankNumber-->
                </div>
                <div>
                    <label>ธนาคาร: <input v-model="partner.bankName" /></label><!--bankName-->
                </div>
                <div>
                    <label>
                        รูปบัญชี:
                        <input type="file" @change="handleBankImage" />
                    </label>

                    <div v-if="partner.bankImagePreview">
                        <p>Preview:</p>
                        <img :src="partner.bankImagePreview" class="w-40 mt-2 rounded" />
                    </div>
                </div>


                <div>
                    <label>เลขประจำตัวผู้เสียภาษี: <input v-model="partner.companyTaxId" /></label><!--companyTaxId-->
                </div>

                <div>
                    <label>ที่อยู่:</label>
                    <p>บ้านเลขที่</p><input v-model="partner.companyAddress" /><!--companyAddress-->
                    <p>ตำบล</p><input v-model="partner.companySubdistrict" /><!--companySubdistrict-->
                    <p>อำเภอ</p><input v-model="partner.companyDistrict" /><!--companyDistrict-->
                    <p>จังหวัด</p><input v-model="partner.companyProvince" /><!--companyProvince-->
                    <p>รหัสไปรษณีย์</p><input v-model="partner.companyPostalCode" /><!--companyPostalCode-->
                </div>
                <div>
                    <label>ละติจูด: <input v-model="partner.hotelLatitude" /></label><!--hotelLatitude-->
                </div>
                <div>
                    <label>ลองติจูด: <input v-model="partner.companyTaxId" /></label><!--companyTaxId-->
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
            partner: {
                bankImage: null,
                companyLogo: null,
                personalId: null,


                fristName: '',
                lastName: '',
                nickName: '',
                partner: '',
                personalEmail: '',
                personalPhone: '',
                personalId: '',
                personalAddress: '',
                personalSubdistrict: '',
                personalDistrict: '',
                personalProvince: '',
                personalPostalCode: '',
                companyName: '',
                companyPhone: '',
                companyEmail: '',
                bankNumber: '',
                bankName: '',
                companyTaxId: '',
                companyAddress: '',
                companySubdistrict: '',
                companyDistrict: '',
                companyProvince: '',
                companyPostalCode: '',
                hotelLatitude: '',
                companyTaxId: '',
                personalIdPreview: null,
                companyLogoPreview: null,
                bankImagePreview: null
            }
        }
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
        },

        handleBankImage(event) {
            const file = event.target.files[0]
            if (file) {
                this.partner.bankImage = file
                this.partner.bankImagePreview = URL.createObjectURL(file)
            } else {
                this.partner.bankImage = null
                this.partner.bankImagePreview = null
            }
        },
        handleCompanyLogo(event) {
            const file = event.target.files[0]
            if (file) {
                this.partner.companyLogo = file
                this.partner.companyLogoPreview = URL.createObjectURL(file)
            } else {
                this.partner.companyLogo = null
                this.partner.companyLogoPreview = null
            }
        },
        handleIdCardImage(event) {
            const file = event.target.files[0]
            if (file) {
                this.partner.personalId = file
                this.partner.personalIdPreview = URL.createObjectURL(file)
            } else {
                this.partner.personalId = null
                this.partner.personalIdPreview = null
            }
        }
    },
};
</script>
