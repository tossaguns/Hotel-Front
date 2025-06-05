<template>
    <div class="flex flex-col min-w-screen">
        <Bar />
        <Search />

        <div class=" mx-2 md:mx-6 mt-6">
            <div class="flex justify-start">
                <div class="w-5/6">
                    <div>TODO: กลับมาทำคะเเนนดาว/คะเเนนตัวเลข</div>
                    <div class="text-3xl font-bold w-1/2 mt-4">
                        <h1>{{ HotelName }}</h1>
                    </div>
                </div>
                <div class="w-1/6 bg-red-500">
                    <div>
                        <!--//TODO:ใส่รูปเื่อกดเลืกไว้ในคอเล็กชั่น-->
                    </div>
                </div>
            </div>

            <div class="flex justify-between mt-2">
                <div class="w-2/6 border">
                    <div>
                        <p>
                            TODO: ใส่ที่อยู่
                        </p>
                        <p>
                            TODO: ใส่เเผนที่โดยดึงมาจากละติจูด ลองติจูด
                        </p>
                    </div>
                </div>
                <div class="w-4/6 border">
                    <div>
                        TODO: ใส่รูปภาพต่างๆ
                    </div>
                </div>
            </div>

            <div class="mt-4 border">
                <div>
                    TODO: ใส่รายละเอียดโรงเเรม
                    {{ HotelDetail }}
                </div>
            </div>

            <div class="border pt-2 ">
                <p class=" font-bold">อธิบายที่พัก : </p>
                <div class="text-sm">
                    //TODO:
                </div>
            </div>
            <div class="border pt-2 ">
                <p class="font-bold">ทำเล ที่ตั้ง : </p>
                <div class="text-sm">
                    //TODO:
                </div>
            </div>
            <div class="border pt-2 ">
                <p class=" font-bold">สิ่งอำนวยความสะดวก : </p>
                <div class="text-sm">
                    //TODO:
                </div>
            </div>
            <div class="border pt-2 ">
                <p class=" font-bold">สถานที่ท่องเที่ยวใกล้เคียง : </p>
                <div class="text-sm">
                    //TODO:
                </div>
            </div>


            <div class="border pt-4 ">
                <p class="text-3xl font-bold">Facilities within the hotel</p>
                <div>
                    //TODO: ใส่ icon เเละหัวข้อที่ทำการเลือกตอนในหน้า profile
                </div>
            </div>

            <!--TODO: บล๊อกนี้ให้เเสดงโชว์เเค่ตอน user ยังไม่ได้ Login-->
            <div
                class="flex justify-between border rounded-md mt-5 p-3 md:px-7 md:mx-20 lg:mx-40 xl:mx-80 hover:bg-gray-50">
                <div class=" md:w-11/12 w-2/3 ">
                    <p class="text-3xl font-bold pb-2 text-stone-700">
                        Sign in
                    </p>
                    <p class="mb-3 text-yellow-800">
                        ลงชื่อเข้าใช้งานเพื่อทำการจอง เเละรับสิทธิพิเศษอื่นๆมากมาย
                    </p>
                    <div class="pt-2 space-x-6">
                        <a target="_blank" @click="navigateToRegister"
                            class="border py-2 px-3 rounded-lg font-semibold hover:bg-stone-200  transition text-stone-700 ">Sign
                            in</a>
                        <a target="_blank" @click="navigateToLogin"
                            class="hover:text-yellow-600 text-stone-700 transition">Log in</a>
                    </div>
                </div>

                <div class="w1/3 md:w-2/12">
                    <img src="/images/icon/Register.jpg" width="150" />
                </div>
            </div>

            <!--วนลูปเเสดงห้องพักตามที่มีในดาต้าเบส-->
            <div class="pt-4 mt-6">
                <p class="text-3xl font-bold">เลือกห้องพัก</p>
                <div class="mt-4">
                    <div class="flex flex-col md:flex-row border rounded-lg overflow-hidden ">

                        <div class="w-full md:w-1/4 flex justify-center items-center p-2 mt-3">
                            <img alt="Room Image"
                                class="w-[150px] h-[100px] object-cover rounded-md"><!--ดึงรูปมาจาก database-->
                        </div>

                        <div class="w-full md:w-2/4 p-4">
                            <h2 class="text-xl font-semibold">TODO: ประเภทห้องพัก</h2>
                            <p class="text-gray-600 mt-2">จำนวนเข้าพักสูงสุด : //TODO: </p>
                            <p class="text-gray-600 mt-2">//TODO: ลักษณะห้องที่ทำการตอ๊กไว้ใน addroom</p>

                        </div>

                        <div class="w-full md:w-1/4 flex flex-col items-center justify-center p-4">
                            <!--วนลูปเเสดง promotion-->
                            <p class="text-sm bg-green-600 text-white rounded-lg px-2 mb-3">TODO: promotion</p>
                            <div>
                                <!--มีให้เลือกใน addhotel เเสดงตัวเลือก รวมภาษี เเละไม่รวมภาษี -->
                                <p class="text-sm text-yellow-800 text-center"> TODO: รวมภาษี เเละไม่รวมภาษี</p>
                                <p class="text-sm text-left text-red-600">TODO: ตัวเลขโดนขีดฆ่า</p>
                                <p class="text-3xl font-bold  text-center mt-4 mb-2">TODO:/วัน</p>


                            </div>
                            <div>
                                <button
                                    class="border-2 border-zinc-300 mt-2 py-1 px-4 rounded-lg hover:bg-zinc-100">เลือก</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="border rounded-md mt-2 bg-yellow-200 py-4 px-3 md:px-8 md:flex md:justify-between items-center">
                <div class="">
                    <p class="font-bold">จำนวน TODO: ดึงจำนวนห้องที่เลือก ห้อง</p>
                    <p class="font-bold ">ราคา : TODO: คำนวนราคารวมทั้งหมด</p>
                    <p class="mt-3 text-sm text-stone-600">ราคา : TODO: รวมภาษีหรือไม่รวม</p>
                </div>
                <div class="mt-5 md:mt-0 transition-all">
                    <p class="text-2xl font-bold text-center">TODO: ราคารวม ... บาท</p>
                    <button @click="navigateToPayment"
                        class="mt-2 bg-yellow-600 text-xl font-bold w-full py-2 rounded-lg text-white hover:bg-yellow-700 ">จ่ายเงิน</button>
                </div>
            </div>

            <div class="mt-8">
                <p class="text-3xl font-bold">รีวิว</p>

                <div class="mt-4">
                    <!-- Container แสดงรีวิว 3 อัน -->
                    <div class="flex flex-col md:flex-row md:justify-between md:space-x-3 space-y-4 md:space-y-0">

                        <!-- กล่องรีวิว -->
                        <div class="border md:w-1/3 rounded-lg shadow-md px-3 py-2">
                            <p class="font-bold text-right text-yellow-900">TODO: ชื่อ</p>
                            <p class="font-bold text-right text-yellow-400">TODO: จำนวนดาว ⭐⭐⭐⭐⭐</p>
                            <p class="text-sm text-stone-400 px-2 break-words line-clamp-3">
                                TODO: รายละเอียดความคิดเห็น
                                frs8u9durtoiyhujfgklhjkhfdhidurityjuhgfdxhgfibjbngrieityygyui80789ujhyuijkh
                            </p>
                        </div>

                        <div class="border md:w-1/3 rounded-lg shadow-md px-3 py-2">
                            <p class="font-bold text-right text-yellow-900">TODO: ชื่อ</p>
                            <p class="font-bold text-right text-yellow-400">TODO: จำนวนดาว ⭐⭐⭐⭐☆</p>
                            <p class="text-sm text-stone-400 px-2 break-words line-clamp-3">
                                TODO: รายละเอียดความคิดเห็น
                                frs8u9durtoiyhujfgklhjkhfdhidurityjuhgfdxhgfibjbngrieityygyui80789ujhyuijkh
                            </p>
                        </div>

                        <div class="border md:w-1/3 rounded-lg shadow-md px-3 py-2">
                            <p class="font-bold text-right text-yellow-900">TODO: ชื่อ</p>
                            <p class="font-bold text-right text-yellow-400">TODO: จำนวนดาว ⭐⭐⭐☆☆</p>
                            <p class="text-sm text-stone-400 px-2 break-words line-clamp-3">
                                TODO: รายละเอียดความคิดเห็น
                                frs8u9durtoiyhujfgklhjkhfdhidurityjuhgfdxhgfibjbngrieityygyui80789ujhyuijkh
                            </p>
                        </div>
                    </div>
                </div>

                <button class="text-sm text-right text-yellow-800 hover:text-yellow-600 mt-2"
                    target="_blank">ดูเพิ่มเติม >></button>
            </div>

        </div>
        <Footer />
    </div>
</template>


<script>

import Bar from '@/components/Bar.vue'
import Footer from '@/components/Footer.vue'
import Search from '@/components/Search.vue'

export default {
    name: "RoomdetailMember",
    components: {
        Bar,
        Footer,
        Search,
        rating: 0,

    },
    data() {
        return {
            HotelName: 'WWWHOtel',
            HotelDetail: 'ytiuyoliu',
        }
    },
    methods: {
        //เปิดหน้าใหม่ใช้ตัวนี้เลย
        navigateToRegister() {
            const url = `${window.location.origin}/register`;
            window.open(url, "_blank", "noopener");
        },
        navigateToLogin() {
            const url = `${window.location.origin}/login`;
            window.open(url, "_blank", "noopener");
        },
        navigateToPayment() {
            const url = `${window.location.origin}/payment`;
            window.open(url, "_blank", "noopener");
        },
    },
}
</script>

<style scoped></style>
