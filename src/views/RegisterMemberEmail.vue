<template>
    <div>
        <Bar />
        <div class="lg:w-1/4 mx-auto mt-40 flex flex-col border sm:w-1/2">
            <p class="mb-6">เข้าสู่ระบบหรือสร้างเเอคเคาท์</p>
            <div>
                <p>ระบุ Email</p>
                <input class="border mb-2" placeholder="กรอก email" v-model="form.email" />
                <input class="border mb-2" placeholder="กรอก username" v-model="form.username" />
                <input type="password" class="border mb-2" placeholder="กรอก password" v-model="form.password" />
                <div>
                    <button @click="register" class="bg-amber-400 rounded-lg py-2 w-full">
                        สมัครสมาชิก
                    </button>
                </div>
                <!-- แสดงข้อความ error -->
                <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
                <!-- แสดงข้อความ success -->
                <p v-if="success" class="text-green-600 mt-2">{{ success }}</p>
            </div>
        </div>
    </div>
</template>



<script>
import Bar from '@/components/Bar.vue'

export default {
    name: "RegisterEmail",
    components: { Bar },
    data() {
        return {
            form: {                                                                                                                            
                email: '',
                username: '',
                password: '',
            },
            error: '',
            success: '',
        };
    },
    methods: {
        navigateToLogin() {
            this.$router.push("/login");
        },
        async register() {
            this.error = '';
            this.success = '';

            // ตรวจว่ากรอกครบหรือยัง
            if (!this.form.email || !this.form.username || !this.form.password) {
                this.error = 'กรุณากรอกข้อมูลให้ครบ';
                return;
            }

            try {
                const response = await fetch("http://localhost:9999/SleepGun/member/register", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.form)
                });

                const result = await response.json();

                if (!response.ok) {
                    this.error = result.message || 'เกิดข้อผิดพลาด';
                } else {
                    this.success = 'สมัครสมาชิกสำเร็จ!';
                    this.form.email = '';
                    this.form.username = '';
                    this.form.password = '';
                }
            } catch (err) {
                this.error = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์';
                console.error(err);
            }
        }
    }
}
</script>

<style lang="">

</style>