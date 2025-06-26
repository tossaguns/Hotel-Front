<template>
    <div class="w-full min-h-screen bg-gray-200">
        <BarEmployee @toggle-sidebar="handleSidebarToggle" />

        <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300" :class="{
            'md:ml-[240px]': !isSidebarCollapsed,
            'md:ml-[80px]': isSidebarCollapsed
        }">
    <div class="app-container bg-gray-400">
        <button @click="isCheckinOpen = true" class="checkin-btn">
            เปิดเช็คชื่อ
        </button>
        <div class="app-content">
            <div class="projects-section">
                <div class="flex md:flex-row items-center mb-3 gap-3 profile">
                    <div class="md:w-1/3 flex justify-center imgprofile">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                            alt="profile image" class="sm:w-32 sm:h-32 w-20 h-20 rounded-full object-cover border">
                        <!-- <img :src="getImageUrl(employee.imageIden)" alt="รูปพนักงาน"
                                class="w-32 h-32 rounded-full object-cover border" /> -->
                    </div>
                    <div class="md:w-2/3 w-full">
                        <p class="sm:w-8 text-white mb-1 border bg-gray-700 rounded-md text-center p-1">
                            ตำแหน่ง {{ employee.positionEmployee }}
                        </p>
                        <p class="text-xs sm:text-xl font-bold py-1">ชื่อ{{ employee.firstname }}</p>
                        <p class="text-xs sm:text-xl font-bold py-1">นามสกุล{{ employee.lastname }}</p>
                        <div class="">
                            <div class="flex">
                                <p>
                                    <span class="text-gray-400">รหัสพนักงาน : </span>{{ employee.employeeCode }}
                                </p>
                                <p class="ml-5">
                                    <span class="text-gray-400">ชื่อเล่น : </span>{{ employee.nickname }}
                                </p>
                            </div>
                            <div class="flex">
                                <p><span class="text-gray-400">เบอร์โทร : </span>{{ employee.phone }}</p>
                                <p class="ml-5">
                                    <span class="text-gray-400">อีเมล : </span>{{ employee.email }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="project-boxes">

                    <div class="flex justify-end mb-4 space-x-2 hide-on-mobile">
                        <button @click="viewMode = 'table'"
                            :class="viewMode === 'table' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'"
                            class="px-4 py-2 rounded">
                            ตาราง
                        </button>
                        <button @click="viewMode = 'block'"
                            :class="viewMode === 'block' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'"
                            class="px-4 py-2 rounded">
                            บล็อก
                        </button>
                    </div>

                    <div class="project-box-wrapper w-full md:rounded-bl-lg bg-stone-100 pt-3 border rounded-xl">
                        <div class="project-box bg-gray-400">

                            <!-- แบบตาราง -->
                            <div v-if="viewMode === 'table'" class="table-section max-h-[280px] overflow-auto w-full">
                                <table
                                    class="min-w-max border-separate border-spacing-y-1 w-full text-sm text-center table-auto">
                                    <thead>
                                        <tr class="text-black">
                                            <!-- <th class="p-2">ลำดับ</th> -->
                                            <th class="p-2">วันที่</th>
                                            <th class="p-2">เวลา</th>
                                            <th class="p-2">รหัสพนักงาน</th>
                                            <th class="p-2">ชื่อ-นามสกุล</th>
                                        </tr>
                                    </thead>

                                    <tbody v-if="paginatedRecords.length > 0">
                                        <tr v-for="(record, index) in paginatedRecords" :key="record.id"
                                            :class="['bg-white', record.justAdded ? 'bounce-glow-animation' : '']">
                                            <!-- <td class="p-2">{{ (currentPage - 1) * perPage + index + 1 }}</td> -->
                                            <td class="p-2">{{ record.dateLogin }}</td>
                                            <td class="p-2">{{ record.timeLogin }}</td>
                                            <td class="p-2">{{ record.numberid }}</td>
                                            <td class="p-2">{{ record.name }}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="5" class="text-center text-gray-500 py-6 text-lg">
                                                ไม่มีข้อมูลการเข้างาน
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- แบบบล็อก -->
                            <div v-if="viewMode === 'block'"
                            class="overflow-auto w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-full px-2">

                            <div v-for="(record, index) in paginatedRecords" :key="record.id"
                                class="bg-white rounded-2xl shadow-md p-4 border border-gray-200 relative transition hover:shadow-lg"
                                :class="record.justAdded ? 'bounce-glow-animation' : ''">

                                <!-- Header -->
                                <div class="flex items-center justify-between mb-2">
                                    <h4 class="text-sm font-semibold text-emerald-800">รหัสพนักงาน: {{ record.numberid }}
                                    </h4>
                                </div>
                                <span class="text-xs text-gray-400">{{ record.dateLogin }} | {{ record.timeLogin
                                }}</span>

                                <!-- Name -->
                                <p class="text-base font-bold text-gray-800 mb-1">{{ record.name }}</p>

                                <!-- Footer label -->
                                <p class="text-xs text-gray-500">บันทึกการเข้างาน</p>
                            </div>

                            <div v-if="paginatedRecords.length === 0"
                                class="col-span-full text-center text-gray-500 py-6 text-lg">
                                ไม่มีข้อมูลการเข้างาน
                            </div>
                        </div>

                            <!-- ปุ่มเปลี่ยนหน้า -->
                            <div class="mt-4 flex justify-center space-x-2">
                                <button v-for="page in totalPages" :key="'page-button-' + page" @click="goToPage(page)"
                                    :class="['px-2 rounded ', page === currentPage ? 'bg-gray-800 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-400',]">
                                    {{ page }}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div :class="['checkin-section transition-all duration-300 ease-in-out', checked ? '' : 'bg-transparent-check',
                screenIsSmall ? (isCheckinOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full') : '']"
                v-show="!screenIsSmall || isCheckinOpen">
                <button @click="isCheckinOpen = false" class="checkin-close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-x-circle">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                </button>
                <div class="md:mx-4" style="">
                    <section class="wrapper md:mt-16">
                        <div
                            :class="['textcheck text-4xl lg:text-4xl xl:text-6xl font-bold', checked ? '' : 'text-gray-500']">
                            เช็คชื่อพนักงาน</div>
                    </section>
                    <div>
                        <div @click="checkIn"
                            :class="['mx-auto rounded-full px-6 py-10 text-center font-bold cursor-pointer relative transition transform duration-300 ease-in-out mt-5 mb-10', checked ? 'border-4 border-gray-400 bg-white shadow-gray-300' : 'border bg-white hover:translate-y-2 hover:shadow-2xl']">
                            <p class="text-2xl mb-2">เช็คชื่อ</p>
                            <p class="text-gray-600 font-bold">{{ employee.dateLogin }}</p>
                            <br>
                            <hr>
                            <div class="mt-6 flex justify-center relative">
                                <div v-if="!checked"
                                    class="text-gray-400 text-2xl xl:text-6xl lg:text-4xl font-semibold cursor-pointer transition duration-300 hover:text-shadow-glow my-8">
                                    Check-in
                                </div>

                                <div v-else>
                                    <div
                                        class="absolute w-20 h-20 rounded-full border-4 border-green-300 animate-ping z-0">
                                    </div>
                                    <svg :class="[
                                        'w-20 h-20 z-10 transition-transform duration-300',
                                        'hover:scale-125',
                                        checked ? 'text-green-500' : 'text-gray-400',
                                    ]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <p v-if="checked" class="text-gray-600 mt-4 text-sx lg:text-3xl">เช็คชื่อสำเร็จ</p>
                            <p v-if="checked" class="text-gray-600 text-sx lg:text-xl">เวลา {{ employee.timeLogin }}
                            </p>
                        </div>
                    </div>

                    <div>
                        <transition name="fade">
                            <button v-if="checked" @click="navigateToExecutive"
                                class="w-full bg-gray-800 hover:bg-gray-600 text-white hover:text-white font-bold md:py-2 rounded-lg transition">
                                <p>เข้าใช้งาน</p>
                                <p>SleepHotel by Tossagun</p>
                            </button>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import BarEmployee from '@/components/BarEmployee.vue'
export default {
    name: 'CheckEmployeeLogin',
    components: {
        BarEmployee
    },
    data() {
        return {
            isSidebarCollapsed: false,
            currentPage: 0,
            perPage: 8,
            employee: {
                username: "",
                password: "",
                firstname: "",
                lastname: "",
                nickname: "",
                employeeCode: "",
                positionEmployee: "",
                email: "",
                phone: "",
                imageIden: "",

                sex: "",
                statusByPartner: "",

                dateLogin: "",
                timeLogin: "",
            },
            checked: false,
            isCheckinOpen: false,
            viewMode: 'table',
            screenIsSmall: window.innerWidth <= 880,
            checkInRecords: [
                {
                    id: '',
                    numberid: "",
                    name: "",
                    dateLogin: "",
                    timeLogin: "",
                    justAdded: false,
                },
            ],
            lastId: 0,
        };
    },
    computed: {
        paginatedRecords() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.checkInRecords.slice(start, start + this.perPage);
        },
        totalPages() {
            return Math.ceil(this.checkInRecords.length / this.perPage);
        },
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.checkScreenSize);
    },

    // เปลี่ยนเป็น "block" โดยอัตโนมัติ
    beforeUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },

    mounted() {
        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize);

        // เปลี่ยนเป็น "block" โดยอัตโนมัติ
        this.handleResize();
        window.addEventListener("resize", this.handleResize);

        const today = new Date();
        const formattedDate = today.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        this.employee.dateLogin = formattedDate;

        // เช็คสถานะ sidebar เริ่มต้นจาก localStorage หรือ default
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
            this.isSidebarCollapsed = JSON.parse(savedState)
        }
    },
    methods: {
        handleSidebarToggle(isCollapsed) {
            this.isSidebarCollapsed = isCollapsed
        },
        
        goToPage(page) {
            this.currentPage = page;
        },

        getImageUrl(path) {
            return path;
        },

        navigateToExecutive() {
            this.$router.push("/mainhotelforemployee");
        },

        async checkIn() {
            if (!this.checked) {
                const now = new Date();
                const formattedTime = now.toLocaleTimeString("th-TH", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });

                this.employee.timeLogin = formattedTime;
                this.checked = true;

                // เพิ่มข้อมูลใหม่ในอันดับแรก
                this.checkInRecords.unshift({
                    id: ++this.lastId,
                    numberid: this.employee.employeeCode,
                    name: this.employee.firstname + " " + this.employee.lastname,
                    dateLogin: this.employee.dateLogin,
                    timeLogin: this.employee.timeLogin,
                    justAdded: true,
                });

                // รีเซ็ตไปหน้าแรกเพื่อให้เห็นข้อมูลใหม่
                this.currentPage = 1;

                // ลบ flag justAdded หลังจากอนิเมชั่นเสร็จ
                setTimeout(() => {
                    if (this.checkInRecords[0]) {
                        this.checkInRecords[0].justAdded = false;
                    }
                }, 1000);

                await this.saveCheckIn();
            }
        },

        async saveCheckIn() {
            try {
                const res = await fetch("http://localhost:3000/api/checkin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: this.employee.firstname + " " + this.employee.lastname,
                        dateLogin: this.employee.dateLogin,
                        timeLogin: this.employee.timeLogin,
                    }),
                });

                const result = await res.json();
                console.log("เช็คชื่อสำเร็จ:", result);
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการเช็คชื่อ:", err);
            }
        },
        checkScreenSize() {
            this.screenIsSmall = window.innerWidth <= 880;
            if (!this.screenIsSmall) {
                this.isCheckinOpen = true; // ให้แสดงบนจอใหญ่เสมอ
            } else {
                this.isCheckinOpen = false;
            }
        },

        // เปลี่ยนเป็น block เมื่อจอถึง 500px
        handleResize() {
            if (window.innerWidth <= 500) {
                this.viewMode = "block";
            }
        },
    },
};
</script>
<style>
@keyframes ping {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    75%,
    100% {
        transform: scale(1.75);
        opacity: 0;
    }
}

.animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) 1;
}

.bounce-glow-animation {
    animation: bounceGlow 1s ease forwards;
}

@keyframes bounceGlow {
    0% {
        opacity: 0;
        transform: translateY(100%);
        box-shadow: 0 0 0px rgba(255, 215, 0, 0);
    }

    50% {
    opacity: 1;
    transform: translateY(-30%);
    box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.8); /* White glow */
}

70% {
    transform: translateY(15%);
    box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.6); /* Slightly dimmer white */
}

100% {
    opacity: 1;
    transform: translateY(0%);
    box-shadow: 0 0 10px 0px rgba(255, 255, 255, 0); /* Faded out */
}
}

:root {
    --projects-section: #fff;
    --check-btn: #fff;
    --background-color: black;
    --text-color: hsl(0, 0%, 96%);
}

.app-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: var(--app-container);
    transition: 0.2s;
    /* max-width: 1800px; */
}

.app-content {
    display: flex;
    height: 100%;
    overflow: hidden;
    padding: 16px 24px 24px 0;
    margin: 10px 0 0 0;
}

.wrapper {
    display: grid;
    place-content: center;
    color: var(--text-color);
}

.textcheck {
    color: transparent;
    background: linear-gradient(90deg, #e5e7eb 53%, #9ca3af 65%);
    background-clip: text;
    -webkit-background-clip: text;
}

.projects-section {
    flex: 2;
    background-color: var(--projects-section);
    border-radius: 32px;
    padding: 32px 32px 32px 32px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 30px;

    .project-boxes {
        height: 100%;
        padding-bottom: 60px;
    }
}

.checkin-section {
    transition: transform 0.5s ease, opacity 0.5s ease;
    background: linear-gradient(
  90deg,
  var(--c1, #f3f4f6),         
  var(--c2, #9ca3af) 51%,      
  var(--c1, #f3f4f6)
) var(--x, 0) / 200%;
    margin-left: 24px;
    flex: 1;
    border-radius: 30px;
}

.checkin-section:hover {
    --x: 100%;
}

.bg-transparent-check {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(6px);
    color: black;
}

.checkin-section .checkin-close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 3;
    border: none;
    background-color: transparent;
    color: var(--main-color);
    display: none;
}

.checkin-section.show {
    transform: translateX(0);
    opacity: 1;
    margin-left: 0;
}

.checkin-section .projects-section-header {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 32px 24px 0 24px;
    background-color: var(--projects-section);
}

.check-line {
    font-size: 14px;
    line-height: 20px;
    margin: 8px 0;
    color: var(--secondary-color);
    opacity: 0.7;
}

.check-line.time {
    text-align: right;
    margin-bottom: 0;
}

.project-box {
    /* --main-color-card: #dbf6fd; */
    border-radius: 30px;
    padding: 16px;
    background-color: var(--main-color-card);
    margin: 0 8px 0 8px;
}

.project-box-wrapper {
    height: 100%;
}

.block-section {
    max-height: 300px;
    display: flex;
    justify-content: centrer;
}

.checkin-btn {
    background: linear-gradient(90deg, var(--c1, #f6d365), var(--c2, #fda085) 51%, var(--c1, #f6d365)) var(--x, 0)/ 200%;
    border-radius: 4px 0 0 4px;
    position: absolute;
    right: 0;
    top: 58px;
    background-color: var(--check-btn);
    border: none;
    color: var(--main-color);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    display: none;
}

@media screen and (max-width: 1300px) {
    .block-section {
        max-height: 300px
    }

    .table-section {
        max-height: 280px
    }
}

@media screen and (max-width: 880px) {
    .checkin-section {
        position: absolute;
        top: 0;
        z-index: 2;
        height: 96%;
        width: 450px;
        right: 0;
        margin-top: 20px;
        padding: 0 20px 0 20px;
        display: grid;
        align-items: center;
    }

    .checkin-section .checkin-close {
        display: block;
    }

    .checkin-btn {
        display: flex;
    }
}

@media screen and (max-width: 546px) {
    table {
        font-size: 12px;
    }

    table th,
    table td {
        padding: 6px 4px;
    }

    .project-box {
        padding: 8px;
    }

    .project-box-wrapper {
        padding: 4px;
    }

    .profile {
        font-size: 12px;
    }

    .block-section {
        max-height: 340px;
        padding: 20px;
        display: grid;
    }

    .table-section {
        max-height: 340px
    }
}

@media screen and (max-width: 500px) {
  .hide-on-mobile {
    display: none !important;
  }
}

@media screen and (max-width: 456px) {
    .checkin-section {
        margin-top: 50px;
        width: 350px;
        font-size: small;
    }

    .profile {
        font-size: 13px;
        display: block !important;

        .imgprofile {
            margin-bottom: 20px;
        }
    }

    .projects-section {
        padding: 16px;
    }

    .project-box {
        padding: 8px;
    }

    .project-box-wrapper {
        padding: 4px;
    }

    table {
        font-size: 12px;
    }

    .block-section {
        max-height: 260px;
    }
}

@media screen and (max-width: 431px) and (min-height: 931px) {
    .block-section {
        max-height: 410px;
    }
}

@media screen and (max-width: 415px) and (min-height: 895px) {
    .block-section {
        max-height: 370px;
    }
}

@media screen and (max-width: 391px) and (min-height: 843px) {
    .block-section {
        max-height: 310px;
    }
}

@media screen and (max-width: 376px) and (min-height: 666px) {
    .block-section {
        max-height: 150px;
    }
}

@media screen and (max-width: 346px) and (min-height: 881px) {
    .block-section {
        max-height: 370px;
    }
}

@media screen and (max-width: 378px) {
    .checkin-section {
        width: 250px;

    }
}
</style>