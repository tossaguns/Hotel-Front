<template>
    <!-- Desktop Sidebar -->
    <div class="hidden md:flex flex-col fixed top-0 left-0 h-screen bg-white ml-2 my-4 rounded-lg transition-all duration-300 ease-in-out z-40"
        :class="isCollapsed ? 'w-[80px]' : 'w-[240px]'">
        <nav class="flex flex-col space-y-1 p-2 overflow-y-auto">
            <div class="m-2" :class="isCollapsed ? 'flex justify-center' : ''">
                <img v-if="!isCollapsed" src="/images/icon/closeopenbar.png" @click="toggleSidebar" alt="ไอคอนปิดบาร์"
                    class="w-2 h-5 cursor-pointer hover:opacity-70 ml-auto" />
                <img v-if="isCollapsed" src="/images/icon/closeopenbar.png" @click="toggleSidebar" alt="ไอคอนเปิดบาร์"
                    class="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
            </div>

            <div class="flex flex-col items-center mt-5 mb-4">
                <img :src="nav.logocompany" alt="โลโก้บริษัท"
                    class="object-contain mb-2 shadow-lg rounded-full transition-all duration-300"
                    :class="isCollapsed ? 'w-11 h-11' : 'w-20 h-20'" />
                <p v-show="!isCollapsed" class="text-center text-sm text-gray-300 transition-opacity duration-300">
                    {{ nav.companyname }}
                </p>
            </div>

            <div class="mt-6">
                <div @click="navigateToDashboardEx('dashboard')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-amber-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'dashboard' ? 'bg-amber-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/dashboard_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        Dashboard
                    </p>
                </div>

                <div @click="navigateToStayRoom('satyroom')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-amber-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'stayroom' ? 'bg-amber-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/calendar_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        เข้าพัก
                    </p>
                </div>

                <div @click="navigateToReserveTossagun('reservetossagun')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-amber-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'reservetossagun' ? 'bg-amber-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/calendartossagun_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        จองกับSleepGun
                    </p>
                </div>

                <div @click="navigateToReport('report')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-amber-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'report' ? 'bg-amber-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/receipt_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        รายงาน
                    </p>
                </div>
                <div @click="navigateToPromotion('promotion')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-amber-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'promotion' ? 'bg-amber-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/promotion_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        ใช้งานโปรโมชั่น
                    </p>
                </div>

                <div @click="navigateToManageRoom('manageroom')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-amber-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'manageroom' ? 'bg-amber-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/room_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        จัดการห้องพัก
                    </p>
                </div>

                <div @click="navigateToManageEmployee('manageemployee')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-amber-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'manageemployee' ? 'bg-amber-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/people_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        จัดการพนักงาน
                    </p>
                </div>

                <div @click="navigateToEditProflie('editproflie')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-amber-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'editproflie' ? 'bg-amber-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/profile.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        แก้ไขโปรไฟล์
                    </p>
                </div>


                <div class="flex justify-center mt-6 space-x-2 text-sm">
                    <p>Partner</p>
                    <p v-show="!isCollapsed"
                        class="transition-transform duration-300 group-hover:scale-110 text-rose-500">
                        {{ namePartner }}
                    </p>
                </div>



                <div @click="navigateTologout('logout')"
                    class="mt-20 group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-red-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'logout' ? 'bg-red-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/logout.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        Logout
                    </p>
                </div>
            </div>
        </nav>
    </div>

    <!-- Mobile Top Tab Bar -->
    <div class="md:hidden">
        <!-- Mobile Top Bar -->
        <div class="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
            <div class="flex items-center justify-center px-4 py-3 h-16 ">
                <button @click="toggleMobileMenu" class="p-2 rounded-lg hover:bg-gray-100 transition-colors w-full">
                    รายการ
                </button>
            </div>
        </div>

        <div v-if="isMobileMenuOpen" @click="toggleMobileMenu" class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 bg-white">
            <div class="flex flex-col h-full">

                <div class="flex items-center justify-center px-4 py-3 border-b shadow-sm h-16 w-full">
                    <button @click="toggleMobileMenu" class="p-2 rounded-lg hover:bg-gray-100 transition-colors w-full">
                        ปิด
                    </button>
                </div>

                <!-- Menu Items -->
                <div class="flex-1 overflow-y-auto px-4 py-6">
                    <div class="space-y-2">
                        <div @click="navigateToDashboardEx('dashboard')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'dashboard' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">Dashboard</span>
                        </div>

                        <div @click="navigateToStayRoom('stayroom')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'stayroom' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">เข้าพัก</span>
                        </div>

                        <div @click="navigateToReserveTossagun('reservetossagun')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'reservetossagun' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">จองกับTossagun</span>
                        </div>

                        <div @click="navigateToReport('report')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'report' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">รายงาน</span>
                        </div>

                        <div @click="navigateToPromotion('promotion')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'promotion' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">ใช้งานโปรโมชั่น</span>
                        </div>

                        <div @click="navigateToManageRoom('manageroom')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'manageroom' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">จัดการห้องพัก</span>
                        </div>

                        <div @click="navigateToManageEmployee('manageemployee')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'manageemployee' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">จัดการพนักงาน</span>
                        </div>

                        <div @click="navigateToEditProflie('editproflie')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'editproflie' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">แก้ไขโปรไฟล์</span>
                        </div>

                        <div class="flex justify-center mt-6 space-x-2 text-sm">
                            <p>Partner :</p>
                            <p v-show="!isCollapsed"
                                class="transition-transform duration-300 group-hover:scale-110 text-amber-500">
                                {{ namePartner }}
                            </p>
                        </div>

                        <div class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-red-400 hover:text-white flex justify-center"
                            :class="activeMenu === '' ? 'bg-red-400 text-white' : 'text-gray-700'">
                            <span class="text-lg hover:text-white">LogOut</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapsed: this.getSidebarStateFromStorage(), // เปลี่ยนจาก false เป็นการโหลดจาก localStorage
            isMobileMenuOpen: false,
            activeMenu: this.getActiveMenuFromRoute(),
            nav: {
                logocompany: '/ImgTossagun/Tosdrink.jpg',
                companyname: 'ชื่อบริษัท',
                namePartner: 'Agfdii 9e8wfr',
            }
        }
    },
    created() {
        this.setActiveMenuFromRoute();
        // โหลดสถานะ sidebar จาก localStorage เมื่อ component ถูกสร้าง
        this.loadSidebarState();
    },
    watch: {
        '$route'() {
            this.setActiveMenuFromRoute();
        }
    },
    methods: {
        // ฟังก์ชันใหม่สำหรับโหลดสถานะ sidebar จาก localStorage
        getSidebarStateFromStorage() {
            try {
                const saved = localStorage.getItem('sidebarCollapsed');
                return saved ? JSON.parse(saved) : false;
            } catch (error) {
                console.warn('Could not load sidebar state from localStorage:', error);
                return false;
            }
        },

        // ฟังก์ชันใหม่สำหรับโหลดสถานะ sidebar
        loadSidebarState() {
            const savedState = this.getSidebarStateFromStorage();
            this.isCollapsed = savedState;
            // ส่ง event ไปยัง parent component เพื่ออัปเดตสถานะ
            this.$emit('toggle-sidebar', this.isCollapsed);
        },

        // ฟังก์ชันสำหรับกำหนด active menu จาก route
        getActiveMenuFromRoute() {
            const currentRoute = this.$route?.path || window.location.pathname;

            const routeMenuMap = {
                '/dashboardforexecutive': 'dashboard',
                '/mainemployee': 'manageemployee',
                '/addemployee': 'manageemployee',
                '/employeelist': 'manageemployee',
                '/editemployee': 'manageemployee',
                '/editprofilecompany': 'editproflie',
                '/roomlist': 'manageroom',
                '/addroom': 'manageroom',
                '/editroom': 'manageroom',

                '/mainhotelroom': 'stayroom',
                '/maincheckincheckout': 'stayroom',
                '/checkin': 'stayroom',
                '/checkout': 'stayroom',

                '/mainhoteldetailroom': 'stayroom',

                '/maindetailbookingtossagun': 'reservetossagun',

                '/mainreport': 'report',
                '/editprofilecompany': 'editproflie',
                '/mainprofilecompany': 'editproflie',
                '/editdetailhotel': 'editproflie',

                '/profilecompany': 'editproflie',
                '/detailhotel': 'editproflie',



                '/mainbyepromotion': 'promotion',
                '/mainbookingtossagun': 'reservetossagun',



                // เพิ่ม route อื่นๆ ตามต้องการ
            };

            return routeMenuMap[currentRoute] || 'dashboard';
        },

        setActiveMenuFromRoute() {
            this.activeMenu = this.getActiveMenuFromRoute();
        },

        toggleSidebar() {
            this.isCollapsed = !this.isCollapsed
            this.$emit('toggle-sidebar', this.isCollapsed)
            // บันทึกสถานะใหม่ลง localStorage
            try {
                localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isCollapsed))
            } catch (error) {
                console.warn('Could not save sidebar state to localStorage:', error);
            }
        },

        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },

        setActiveMobile(menu) {
            this.activeMenu = menu;
            this.isMobileMenuOpen = false;
        },

        navigateToDashboardEx() {
            this.activeMenu = 'dashboard';
            this.$router.push("/dashboardforexecutive");
            this.isMobileMenuOpen = false;
        },

        navigateToStayRoom() {
            this.activeMenu = 'stayroom';
            this.$router.push("/mainhotelroom");
            this.isMobileMenuOpen = false;
        },

        navigateToReserveTossagun() {
            this.activeMenu = 'reservetossagun';
            this.$router.push("/mainbookingtossagun");
            this.isMobileMenuOpen = false;
        },

        navigateToReport() {
            this.activeMenu = 'report';
            this.$router.push("/mainreport");
            this.isMobileMenuOpen = false;
        },

        navigateToPromotion() {
            this.activeMenu = 'promotion';
            this.$router.push("/mainbyepromotion");
            this.isMobileMenuOpen = false;
        },

        navigateToManageRoom() {
            this.activeMenu = 'manageroom';
            this.$router.push("/roomlist");
            this.isMobileMenuOpen = false;
        },

        navigateToManageEmployee() {
            this.activeMenu = 'manageemployee';
            this.$router.push("/mainemployee");
            this.isMobileMenuOpen = false;
        },

        navigateToEditProflie() {
            this.activeMenu = 'editproflie';
            this.$router.push("/mainprofilecompany");
            this.isMobileMenuOpen = false;
        },
    }
}
</script>