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

            <div class="mt-6">
                <div @click="navigateToDashboardEx('dashboard')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-rose-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'dashboard' ? 'bg-rose-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/dashboard_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        Dashboard
                    </p>
                </div>

                <div @click="navigateToManagePartner('managepartner')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-rose-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'managepartner' ? 'bg-rose-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/employee_navAdmin.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        จัดการ Partner
                    </p>
                </div>

                <div @click="navigateToManageMember('managemember')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-rose-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'managemember' ? 'bg-rose-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/people.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        จัดการ member
                    </p>
                </div>

<!--TODO: เดี๋ยวกลับมาทำ
                <div @click="navigateToReserveTossagun('reservetossagun')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-rose-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'reservetossagun' ? 'bg-rose-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/calendartossagun_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        จองกับTossagun
                    </p>
                </div>

                <div @click="navigateToReceipt('receipt')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-rose-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'receipt' ? 'bg-rose-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/receipt_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        รายงาน
                    </p>
                </div>
                -->

                <div @click="navigateToPromotion('promotion')"
                    class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-rose-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
                    :class="[
                        activeMenu === 'promotion' ? 'bg-rose-400 text-white drop-shadow-lg' : '',
                        isCollapsed ? 'justify-center' : 'px-3'
                    ]">
                    <img src="/images/icon/promotion_nav.png" alt="icon"
                        class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        :class="isCollapsed ? '' : 'mr-3'" />
                    <p v-show="!isCollapsed" class="transition-transform duration-300 group-hover:scale-110">
                        โปรโมชั่น
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

                        <div @click="navigateToManagePartner('managepartner')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-rose-400 hover:text-white"
                            :class="activeMenu === 'managepartner' ? 'bg-rose-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">จัดการ Partner</span>
                        </div>

                        <div @click="navigateToManageMember('managemember')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-rose-400 hover:text-white"
                            :class="activeMenu === 'managemember' ? 'bg-rose-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">จัดการ member</span>
                        </div>

                        <!--
                        TODO: เดี๋ยวกับมาทำหน้าจองกับ tossagun เเละ รายงสน 
                        <div @click="navigateToReserveTossagun('reservetossagun')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-rose-400 hover:text-white"
                            :class="activeMenu === 'reservetossagun' ? 'bg-rose-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">จองกับTossagun</span>
                        </div>

                        <div @click="navigateToReceipt('receipt')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-rose-400 hover:text-white"
                            :class="activeMenu === 'receipt' ? 'bg-rose-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">รายงาน</span>
                        </div>-->

                        <div @click="navigateToPromotion('promotion')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-rose-400 hover:text-white"
                            :class="activeMenu === 'promotion' ? 'bg-rose-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">โปรโมชั่น</span>
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
            isCollapsed: false,
            isMobileMenuOpen: false,
            activeMenu: this.getActiveMenuFromRoute(),
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
            // ไม่ต้อง reset sidebar state เมื่อเปลี่ยน route
        }
    },
    methods: {
        // โหลดสถานะ sidebar จาก localStorage
        loadSidebarState() {
            const savedState = localStorage.getItem('sidebarCollapsed');
            if (savedState !== null) {
                this.isCollapsed = JSON.parse(savedState);
                // ส่งสถานะไปยัง parent component
                this.$emit('toggle-sidebar', this.isCollapsed);
            }
        },

        // ฟังก์ชันสำหรับกำหนด active menu จาก route
        getActiveMenuFromRoute() {
            const currentRoute = this.$route?.path || window.location.pathname;

            const routeMenuMap = {
                '/dashboardforadmin': 'dashboard',
                '/approvepartner': 'managepartner',
                '/mainpartner': 'managepartner',
                '/request': 'managepartner',


                '/mainmanagemember': 'managemember',
                '/mainpromotion': 'promotion',
                '/addpromotion': 'promotion',


                
                '/mainemployee': 'manageemployee',
                '/addemployee': 'manageemployee',
                '/editemployee': 'manageemployee',
                '/editprofilecompany': 'editproflie',
                // เพิ่ม route อื่นๆ ตามต้องการ
            };

            return routeMenuMap[currentRoute] || 'dashboard';
        },

        setActiveMenuFromRoute() {
            this.activeMenu = this.getActiveMenuFromRoute();
        },

        toggleSidebar() {
            this.isCollapsed = !this.isCollapsed;
            this.$emit('toggle-sidebar', this.isCollapsed);

            localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isCollapsed));
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
            this.$router.push("/dashboardforadmin");
            this.isMobileMenuOpen = false;
        },

        navigateToManagePartner() {
            this.activeMenu = 'managepartner';
            this.$router.push("/mainpartner");
            this.isMobileMenuOpen = false;
        },

        navigateToManageMember() {
            this.activeMenu = 'managemember';
            this.$router.push("/mainmanagemember");
            this.isMobileMenuOpen = false;
        },

        navigateToPromotion() {
            this.activeMenu = 'promotion';
            this.$router.push("/mainpromotion");
            this.isMobileMenuOpen = false;
        },
    }
}
</script>