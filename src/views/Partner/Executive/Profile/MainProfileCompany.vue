<template>
    <div class="w-full min-h-screen bg-gray-100">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[232px]': !isSidebarCollapsed,
            'md:ml-[72px]': isSidebarCollapsed
        }">
            <div class="fixed top-0 left-0 right-0 h-4 z-[100] bg-white pointer-events-none"></div>
            <div
                class="sticky top-4 z-30 rounded-t-lg bg-amber-400 p-2 text-white text-lg shadow-lg shadow-gray-200 overflow-t-hidden">
                <h1>โปรไฟล์บริษัท</h1>
            </div>

            <div class="bg-white min-h-screen rounded-b-lg py-4">

                <div class="flex justify-center max-h-screen space-x-2 mx-2">

                    <div class="w-1/2 pl-6 pr-3 py-5">
                        <a class="relative group cursor-pointer" @click="navigateBackToEditProfileCompany">
                            <div class="absolute inset-0 rounded-lg transition-all duration-200 bg-center bg-cover filter brightness-75 saturate-120 contrast-85 group-hover:scale-105 group-hover:filter-none"
                                :style="'background-image: url(https://www.bworkreit.com/storage/content/management/property-manager/profile-and-experience/bg-parallax.jpg)'">
                            </div>
                            <div class="relative p-6 z-10">
                                <p
                                    class="uppercase text-amber-600 font-bold mb-2 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                                    Profile Company</p>
                                <h3
                                    class="uppercase text-black text-2xl md:text-3xl drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                                    โปรไฟล์บริษัท</h3>
                            </div>
                            <span class="block pb-[100%] w-full"></span>
                        </a>
                    </div>

                    <div class="w-1/2 pr-6 pl-3 py-5">
                        <!-- Card: Detail Hotel -->
                        <a class="relative group cursor-pointer" @click="navigateBackToEditDetailHotel">
                            <div class="absolute inset-0 rounded-lg transition-all duration-200 bg-center bg-cover filter brightness-75 saturate-120 contrast-85 group-hover:scale-105 group-hover:filter-none"
                                :style="'background-image: url(/images/hotel-room/room01.jpg)'">
                            </div>
                            <div class="relative p-6 z-10">
                                <p
                                    class="uppercase text-amber-600 font-bold  mb-2 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                                    Detail Hotel</p>
                                <h3
                                    class="uppercase text-black text-2xl md:text-3xl drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                                    ข้อมูลโรงเเรม</h3>
                            </div>
                            <span class="block pb-[100%] w-full"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="fixed bottom-0 left-0 right-0 h-4 z-[40] bg-gray-100 pointer-events-none"></div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/SidebarExecutive.vue'

export default {
    name: "EmployeeList",
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarCollapsed: false,
            images: [
                '/images/hotel-room/room06.jpg',
                '/images/hotel-room/room02.jpg',
                '/images/hotel-room/room03.jpg',
                '/images/hotel-room/room04.jpg',
                '/images/hotel-room/room05.jpg',
            ],
            currentIndex: 0,
            intervalId: null,
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        navigateBackToEditDetailHotel() {
            this.$router.push("/detailhotel");
        },
        navigateBackToEditProfileCompany() {
            this.$router.push("/profilecompany");
        },

        startSlideShow() {
            this.intervalId = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.images.length;
            }, 5000);
        },
        stopSlideShow() {
            clearInterval(this.intervalId);
        },

    },
    mounted() {
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }

        this.startSlideShow();
    },

    beforeUnmount() {
        this.stopSlideShow();
    },
}
</script>