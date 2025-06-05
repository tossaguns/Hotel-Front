<template>
    <div class="relative w-full overflow-hidden" :style="{ height: imageHeight + 'px' }">
        <transition-group name="fade" tag="div"
            class="absolute inset-0 w-full h-full flex transition-all duration-1000">
            <img v-for="(img, index) in hotel.image" :key="index" v-show="currentImageIndex === index" :src="img"
                class="w-full h-full object-cover absolute top-0 left-0" alt="hotel image" />
        </transition-group>


        <transition name="fade-up" appear>
            <div class="absolute inset-0 flex justify-center z-20 mt-24 space-x-2">
                <h1 class="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                    จัดการห้องพักกับ
                </h1>
                <h1 class="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                    TOSSAGUN
                </h1>
            </div>
        </transition>


        <transition name="fade-up" appear>
            <div class="absolute inset-0 flex items-center justify-center z-20">
                <div
                    class="flex border items-center justify-center space-x-8 px-4 py-4 rounded-full shadow-2xl bg-white mt-60 transition transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
                    <div>
                        <img :src="hotel.imagecompany" alt="Company Image" width="60" height="60" />
                    </div>
                    <div>
                        <h1 class="font-bold text-3xl">{{ hotel.companyname }}</h1>
                        <p class="text-xs">อัปเดตล่าสุด {{ hotel.updatedate }}</p>
                    </div>
                    <div>

                        <button @click="navigateToEditprofile"
                            class="bg-red-600 px-3 py-1 rounded-lg text-white font-bold hover:bg-red-700 shadow-md">
                            แก้ไข
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <div
            class="absolute top-0 left-0 w-full h-60 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none">
        </div>

        <div
            class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/60 to-transparent z-10 pointer-events-none">
        </div>
    </div>


    <transition name="fade-up" appear>
        <div class="flex flex-col md:flex-row w-full gap-2 px-4 py-6 mt-12 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            <button @click="navigateToManagehotel"
                class="flex flex-col flex-1 border px-2 pt-2 pb-8 rounded-lg shadow-xl items-center justify-center transition transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:bg-blue-100">
                <p
                    class="font-bold bg-blue-700 w-full mb-4 py-3 rounded-md text-2xl text-white text-center flex items-center justify-center gap-2">
                    จัดการห้องพัก
                </p>
                <img src="/images/icon/bedroom.png" alt="staff" class="h-20 object-cover rounded-md my-4" />
                <p>จัดการเพิ่มห้องพัก / เปิด-ปิดทำการ</p>
            </button>

            <button @click="navigateToManaemployee"
                class="flex flex-col flex-1 border px-2 pt-2 pb-8 rounded-lg shadow-xl items-center justify-center transition transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:bg-rose-100 ">
                <p
                    class="font-bold bg-rose-700 w-full mb-4 py-3 rounded-md text-2xl text-white text-center flex items-center justify-center gap-2 ">
                    จัดการพนักงาน
                </p>
                <img src="/images/icon/people.png" alt="staff" class="h-20 object-cover rounded-md my-4" />
                <p>จัดการเพิ่มลดพนักงาน</p>
            </button>

            <button @click="navigateToCheckinout"
                class="flex flex-col flex-1 border px-2 pt-2 pb-8 rounded-lg shadow-xl items-center justify-center transition transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:bg-gray-200">
                <p
                    class="font-bold bg-stone-700 w-full mb-4 py-3 rounded-md text-2xl text-white text-center flex items-center justify-center gap-2">
                    จัดการการจอง
                </p>
                <img src="/images/icon/calendar.png" alt="staff" class="h-20 object-cover rounded-md my-4" />
                <p>จัดการการจองโรงเเรมกับ Tossagun</p>
            </button>
        </div>
    </transition>
</template>

<script>

export default {
    name: "mainmanagehotel",
    data() {
        return {
            currentImageIndex: 0,
            imageHeight: 400,
            hotel: {
                imagecompany: "/ImgTossagun/LINE_ALBUM_5.jpg",
                companyname: "TTHGroup",
                updatedate: "25/5/2025",
                image: [
                    "/images/hotel-room/register2.png",
                    "/images/hotel-room/room06.jpg",
                    "/images/hotel-room/register3.jpg",
                    "/images/hotel-room/room07.jpg",
                    "/images/hotel-room/register4.jpg",
                    "/images/hotel-room/room04.jpg",
                ],
            },
        };
    },



    mounted() {
        this.startCarousel();
    },
    methods: {
        startCarousel() {
            setInterval(() => {
                this.currentImageIndex =
                    (this.currentImageIndex + 1) % this.hotel.image.length;
            }, 8000);
        },
        navigateToEditprofile() {
            this.$router.push("/editprofilecompany");
        },
        navigateToManagehotel() {
            this.$router.push("/mainhotel");
        },
        navigateToManaemployee() {
            this.$router.push("/mainemployee");
        },
        navigateToCheckinout() {
            this.$router.push("/mainecheckin-out");
        }
    },
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.animate-initial {
    animation: fadeInDown 1.2s ease-out forwards;
}

.fade-up-enter-active {
    transition: all 0.8s ease-out;
}

.fade-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.fade-up-enter-to {
    opacity: 1;
    transform: translateY(0);
}
</style>