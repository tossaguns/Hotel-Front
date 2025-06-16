TODO: เสร็จเเล้ว
<template>
    <div class="relative w-full min-h-screen flex items-center justify-center">

        <div class="absolute inset-0 bg-cover bg-center blur-sm"
            style="background-image: url('/images/hotel-room/room04.jpg'); z-index: 0;">
        </div>

        <div class="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        <div class="flex my-4 max-w-6xl mx-auto border rounded-2xl shadow-lg overflow-hidden md:flex md:h-[80vh] ">
            <div
                class="relative z-10 flex max-w-5xl mx-auto border rounded-2xl shadow-lg overflow-hidden md:flex md:h-[80vh] bg-white bg-opacity-90 backdrop-blur-md ">

                <div
                    class="lg:w-[60%] md:w-[70%] overflow-y-auto h-full px-3 md:px-6 custom-scrollbar pb-8 pt-8 shadow-l-lg">
                    <!-- เพิ่ม py-3 ด้านใน -->
                    <div class="py-3">
                        <div class="mt-6 md:mt-0 text-center mb-4">
                            <p class="font-bold text-2xl md:text-2xl text-stone-700">เข้าสู่ระบบพาทเนอร์</p>
                            <p class="text-stone-400">Login Partner</p>
                        </div>

                        <div class="flex flex-col">
                            <div>
                                <div class="relative mt-8">
                                    <div class="relative">
                                        <p class="my-1">UserName</p><!--username-->
                                        <input v-model="username" placeholder="Username"
                                            class="border w-full py-2 px-3 mb-4 rounded-md" />
                                        <p class="my-1">Password</p><!--password-->
                                        <div class="relative w-full mb-4 ">
                                            <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                                placeholder="Password"
                                                class="border w-full py-2 px-3 pr-10 rounded-md" />
                                            <button type="button" @click="togglePassword"
                                                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                                <span v-if="showPassword">🙉</span>
                                                <span v-else>🙈</span>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-center space-x-3 mt-32">
                                <button @click="submitForm"
                                    class="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-500">Login
                                    Partner</button>
                                <button
                                    class="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-500">ย้อนกลับ</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative md:w-[40%] h-full top-0 hidden md:block">

                    <img src="/images/hotel-room/room04.jpg" alt="Hotel Icon" class="w-full h-full object-cover">

                    <div
                        class="absolute inset-0 flex flex-col justify-center items-center bottom-auto top-20 text-white text-lg z-20">
                        <div class="text-center">
                            <p>Login</p>
                            <p class="text-4xl font-semibold">PARTNER</p>
                        </div>
                    </div>

                    <div
                        class="absolute inset-0 flex flex-col justify-center items-center top-auto bottom-32 text-white text-lg z-20">
                        <button @click="navigateToRegisterPartner"
                            class="bg-amber-500 px-3 py-2 rounded-lg font-bold shadow-xl hover:bg-amber-400 transition">Register
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

            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateToRegisterPartner() {
    router.push('/registerpartner')
}

// ======= toggle password =======
const togglePassword = () => {
    showPassword.value = !showPassword.value
}
</script>
