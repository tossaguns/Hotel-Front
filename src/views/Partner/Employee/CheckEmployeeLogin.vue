<template>
    <div class="min-h-fit w-full bg-gray-200">
        <div class="flex flex-col-reverse md:flex-row justify-between md:mx-4 md:my-20 shadow-lg rounded-lg bg-white">
            <div class="w-4/5 flex flex-col">
                <div>
                    <div class="flex flex-col rounded-tl-lg md:flex-row md:h-[200px]">
                        <div class="md:w-1/3 flex flex-col items-center justify-center pl-12">
                            <img :src="getImageUrl(employee.imageIden)" alt="รูปพนักงาน"
                                class="w-32 h-32 rounded-full object-cover border" />
                        </div>

                        <div class="md:w-2/3 mt-6 w-full px-4 md:mt-6">
                            <p class="text-white mb-1 border w-[300px] bg-green-600 rounded-md text-xs text-center p-1">
                                ตำแหน่ง {{ employee.positionEmployee }}
                            </p>
                            <p class="text-3xl font-bold py-1">{{ employee.firstname }}</p>
                            <p class="text-3xl font-bold py-1">{{ employee.lastname }}</p>
                            <div class="text-xs">
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
                </div>

                <div class="w-full md:rounded-bl-lg md:h-[500px] bg-stone-100 pt-5 border">
                    <div class="px-3">
                        <table class="border-separate border-spacing-y-1 w-full text-sm text-center table-auto">
                            <thead>
                                <tr class="text-gray-400 text-xs">
                                    <th class="p-2">ลำดับ</th>
                                    <th class="p-2">รหัสพนักงาน</th>
                                    <th class="p-2">ชื่อ-นามสกุล</th>
                                    <th class="p-2">วันที่</th>
                                    <th class="p-2">เวลา</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(record, index) in paginatedRecords" :key="record.id"
                                    :class="['bg-white', record.justAdded ? 'bounce-glow-animation' : '']">
                                    <td class="p-2">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                                    <td class="p-2">{{ record.numberid }}</td>
                                    <td class="p-2">{{ record.name }}</td>
                                    <td class="p-2">{{ record.dateLogin }}</td>
                                    <td class="p-2">{{ record.timeLogin }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="mt-4 flex justify-center space-x-2">
                            <button v-for="page in totalPages" :key="'page-button-' + page" @click="goToPage(page)"
                                :class="[
                                    'px-2 rounded ',
                                    page === currentPage
                                        ? 'bg-green-600 text-white hover:bg-green-800'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-400',
                                ]">
                                {{ page }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:w-1/3 rounded-r-lg p-4 h-[700px]" style="box-shadow: -8px 0 6px -6px rgba(0, 0, 0, 0.1)">
                <div class="text-center md:mt-16">
                    <h1 class="text-4xl font-bold text-gray-500">เช็คชื่อพนักงาน</h1>
                </div>
                <div>
                    <div @click="checkIn"
                        class="mx-auto border rounded-lg bg-white px-6 py-10 text-center text-bold cursor-pointer relative transition transform duration-300 ease-in-out hover:translate-y-2 hover:shadow-2xl mt-5 mb-10">
                        <p class="text-2xl mb-2">เช็คชื่อ</p>
                        <p class="text-gray-600 font-bold">{{ employee.dateLogin }}</p>

                        <div class="mt-6 flex justify-center relative">
                            <div v-if="checked"
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
                        <p v-if="checked" class="text-green-600 mt-4 text-3xl">เช็คชื่อสำเร็จ</p>
                        <p v-if="checked" class="text-green-600 text-xl">เวลา {{ employee.timeLogin }}</p>
                    </div>
                </div>

                <div>
                    <transition name="fade">
                        <button v-if="checked" @click="navigateToExecutive"
                            class="w-full bg-amber-400 hover:bg-amber-500 text-stone-700 hover:text-white font-bold md:py-2 rounded-lg transition">
                            <p>เข้าใช้งาน</p>
                            <p>SleepHotel by Tossagun</p>
                        </button>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,
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
    mounted() {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        this.employee.dateLogin = formattedDate;
    },
    methods: {
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

/* เปลี่ยนชื่อ class และลบส่วนที่ไม่ใช้ */
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
        box-shadow: 0 0 20px 5px rgba(0, 255, 26, 0.881);
    }

    70% {
        transform: translateY(15%);
        box-shadow: 0 0 15px 3px rgba(102, 247, 69, 0.931);
    }

    100% {
        opacity: 1;
        transform: translateY(0%);
        box-shadow: 0 0 10px 0px rgba(255, 215, 0, 0);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
