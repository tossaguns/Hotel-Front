<template>
    <div id="app">

        <!-- Footer ที่จะติดอยู่ล่างสุดเสมอ -->
        <div class="bg-stone-100 mt-auto">
            <footer class="flex flex-col lg:flex-row justify-center items-start py-8 px-4 gap-8">
                <div class="text-black flex-1 max-w-sm">
                    <div>
                        <p class="font-bold mb-4 text-lg">เกี่ยวกับเรา</p>
                    </div>
                    <div class="space-y-2">
                        <p>SLEEPGUN เป็นส่วนหนึ่งของเครือโรงแรมชั้นนำ</p>
                        <p>ที่มุ่งมั่นในการให้บริการที่พักคุณภาพสูง</p>
                        <p>พร้อมด้วยสิ่งอำนวยความสะดวกครบครัน</p>
                        <p>เพื่อประสบการณ์การพักผ่อนที่ดีที่สุด</p>
                    </div>
                </div>

                <div class="text-black flex-1 max-w-sm">
                    <div>
                        <p class="font-bold mb-4 text-lg">ติดต่อ Tossagun Hotel</p>
                    </div>
                    <div class="space-y-2">
                        <p><span class="font-medium">โทร:</span> 02-123-4567</p>
                        <p><span class="font-medium">Email:</span> info@tossagunhotel.com</p>
                        <p><span class="font-medium">Facebook:</span> Tossagun Hotel Official</p>
                        <p><span class="font-medium">Line ID:</span> @tossagunhotel</p>
                        <p><span class="font-medium">ที่ตั้ง:</span> 123 ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110</p>
                    </div>
                </div>

                <div class="text-black flex-1 max-w-sm">
                    <div>
                        <p class="font-bold mb-4 text-lg">เมนูหลัก</p>
                    </div>
                    <div class="space-y-3">
                        <div>
                            <button
                                class="text-left hover:text-blue-600 transition-colors duration-200 w-full">หน้าหลัก</button>
                        </div>
                        <div>
                            <button
                                class="text-left hover:text-blue-600 transition-colors duration-200 w-full">ที่พักแนะนำ</button>
                        </div>
                        <div>
                            <button
                                class="text-left hover:text-blue-600 transition-colors duration-200 w-full">ส่วนลดและสิทธิพิเศษ</button>
                        </div>
                        <div>
                            <button
                                class="text-left hover:text-blue-600 transition-colors duration-200 w-full">จองที่พัก</button>
                        </div>
                        <div>
                            <button
                                class="text-left hover:text-blue-600 transition-colors duration-200 w-full">ที่พักแต่ละจังหวัด</button>
                        </div>
                    </div>
                </div>


            </footer>

            <!-- Copyright section -->
            <div class="border-t border-stone-300 py-4 text-center text-sm text-gray-600">
                <p>&copy; 2024 SLEEPGUN. All rights reserved.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TossagunHotel'
}
</script>

<style>
/* ทำให้ html และ body มีความสูงเต็ม */
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

/* ทำให้ app container เป็น flex container ที่มีความสูงเต็ม */
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* ทำให้ main content ขยายเต็มพื้นที่ที่เหลือ */
main {
    flex: 1;
}
</style>