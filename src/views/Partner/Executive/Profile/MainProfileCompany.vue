<template>
    <div class="w-full min-h-screen bg-gray-200">
        <Sidebar @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
            style="top: 1rem; bottom: 1rem; height: auto;" :class="{
                'md:ml-[232px]': !isSidebarCollapsed,
                'md:ml-[72px]': isSidebarCollapsed
            }">

            <!-- Slides -->
            <div class="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
                <div v-for="(img, index) in images" :key="index"
                    class="absolute inset-0 transition-opacity duration-1000"
                    :class="currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'" style="z-index: 1;">
                    <img :src="img" alt="slide" class="w-full h-full object-cover brightness-50" />
                </div>

                <div class="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
                <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4"
                    style="z-index: 2;">
                    <h1 class="text-2xl md:text-4xl font-bold mb-3">การแก้ไขโปรไฟล์</h1>
                    <p class="max-w-xl text-sm md:text-base">
                        ปรับปรุงข้อมูลส่วนตัวของคุณในระบบ สามารถเปลี่ยนแปลงรายละเอียดต่าง ๆ <br />
                        การดูแลข้อมูลโปรไฟล์ที่ถูกต้องและครบถ้วน จะช่วยให้คุณสามารถใช้งานระบบได้อย่างเต็มประสิทธิภาพ
                    </p>
                </div>
            </div>

            <div class="m-5 text-xl font-bold">เลือกการแก้ไข</div>

            <!-- Detel Hotel and Company -->
            <div class="flex justify-center max-h-screen">

                <div class="card-grid m-5">

                    <a class="card" @click="navigateBackToEditProfileCompany">
                        <div class="background detail-company">
                        </div>
                        <div class="content">
                            <p class="heading-eng">Profile Company</p>
                            <h3 class="heading-th">โปรไฟล์บริษัท</h3>
                        </div>
                    </a>

                    <a class="card" @click="navigateBackToEditDetailHotel">
                        <div class="background detail-hotel">
                        </div>
                        <div class="content">
                            <p class="heading-eng">Detail Hotel</p>
                            <h3 class="heading-th">ข้อมูลโรงเเรม</h3>
                        </div>
                    </a>

                </div>

            </div>
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
<style>
.detail-company {
    background: url('https://www.bworkreit.com/storage/content/management/property-manager/profile-and-experience/bg-parallax.jpg');
}

.detail-hotel {
    background: url('/public/images/hotel-room/room01.jpg');
}

.card-grid {
    display: grid;
    grid-column-gap: 42px;
    grid-row-gap: 42px;
    max-width: 1200px;
    width: 50%;
}

@media(min-width: 540px) {
    .card-grid {
        grid-template-columns: repeat(1, 1fr);
    }
}

@media(min-width: 960px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.card {
    position: relative;
}

.card:before {
    content: '';
    display: block;
    padding-bottom: 100%;
    width: 100%;
}

.background {
    background-position: center;
    background-size: cover;
    border-radius: 24px;
    bottom: 0;
    filter: brightness(0.75) saturate(1.2) contrast(0.85);
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition:
        filter 200ms linear,
        transform 200ms linear;
}

.card:hover .background {
    transform: scale(1.05);
    filter: none;
}

.card-grid:hover>.card:not(:hover) .background {
    filter: brightness(0.6) saturate(1) contrast(1.2) blur(5px);
}

.card-grid:hover>.card:not(:hover) .content {
    filter: brightness(0.8) blur(2px);
}

.content {
    padding: 24px;
    position: absolute;
    top: 0;
}

.heading-eng {
    color: #000000;
    font-size: 0.9rem;
    margin-bottom: 8px;
    text-transform: uppercase;
    text-transform: uppercase;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.5); /* เพิ่มแสงขาวเรืองๆ */
}

.heading-th {
    color: #000000;
    font-size: 1.8rem;
    text-transform: uppercase;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.5); /* เพิ่มแสงขาวเรืองๆ */
}

@media screen and (max-width: 1220px){
    .heading-eng{
        font-size: 0.7rem;
    }
    .heading-th{
        font-size: 1.1rem;
    }
}
</style>