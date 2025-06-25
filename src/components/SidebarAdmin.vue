<template>
    <!-- Desktop Sidebar -->
    <div class="hidden ml-2 md:flex flex-col fixed left-0 bg-white rounded-lg transition-all duration-300 ease-in-out z-40"
        style="top: 1rem; bottom: 1rem; height: auto;" :class="isCollapsed ? 'w-[80px]' : 'w-[240px]'">
        <nav class="flex flex-col space-y-1 p-2 overflow-y-auto custom-scrollbar">
            <div class="m-2" :class="isCollapsed ? 'flex justify-center' : ''">
                <img v-if="!isCollapsed" src="/images/icon/closeopenbar.png" @click="toggleSidebar" alt="ไอคอนปิดบาร์"
                    class="w-2 h-5 cursor-pointer hover:opacity-70 ml-auto" />
                <img v-if="isCollapsed" src="/images/icon/closeopenbar.png" @click="toggleSidebar" alt="ไอคอนเปิดบาร์"
                    class="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
            </div>

            <div class="mt-6">
                <div @click="navigateTo('/dashboardforadmin', 'dashboard')"
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

                <div @click="navigateTo('/mainpartner', 'managepartner')"
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

                <div @click="navigateTo('/mainmanagemember', 'managemember')"
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

                <div @click="navigateTo('/mainpromotion', 'promotion')"
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

                <div class="flex justify-center mt-6 space-x-2 text-sm">
                    <p>Admin </p>
                    <p v-show="!isCollapsed"
                        class="transition-transform duration-300 group-hover:scale-110 text-rose-500">
                        {{ nameAdmin }}
                    </p>
                </div>

                <div @click="navigateTo('/logout', 'logout')"
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
                        <div @click="navigateTo('/dashboardforadmin', 'dashboard')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-rose-400 hover:text-white"
                            :class="activeMenu === 'dashboard' ? 'bg-rose-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">Dashboard</span>
                        </div>

                        <div @click="navigateTo('/mainpartner', 'managepartner')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-rose-400 hover:text-white"
                            :class="activeMenu === 'managepartner' ? 'bg-rose-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">จัดการ Partner</span>
                        </div>

                        <div @click="navigateTo('/mainmanagemember', 'managemember')"
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

                        <div @click="navigateTo('/mainpromotion', 'promotion')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-rose-400 hover:text-white"
                            :class="activeMenu === 'promotion' ? 'bg-rose-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">โปรโมชั่น</span>
                        </div>

                        <div class="flex justify-center mt-6 space-x-2 text-sm">
                            <p>Admin :</p>
                            <p v-show="!isCollapsed"
                                class="transition-transform duration-300 group-hover:scale-110 text-rose-500">
                                {{ nameAdmin }}
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

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const user = ref(null)
const admin = ref({
    firstname: '',
    lastname: '',
    role: ''
})

const router = useRouter()
const route = useRoute()

const emit = defineEmits(['toggle-sidebar'])
const isCollapsed = ref(getSidebarStateFromStorage())
const isMobileMenuOpen = ref(false)
const activeMenu = ref(getActiveMenuFromRoute())

function loadSidebarState() {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
        isCollapsed.value = JSON.parse(savedState)
        emitToggleSidebar()
    }
}
watch(route, () => {
    activeMenu.value = getActiveMenuFromRoute()
})

function getSidebarStateFromStorage() {
    try {
        const saved = localStorage.getItem('sidebarCollapsed')
        return saved && saved !== 'undefined' ? JSON.parse(saved) : false
    } catch (error) {
        console.warn('Could not load sidebar state from localStorage:', error)
        return false
    }
}
function emitToggleSidebar() {
    emit('toggle-sidebar', isCollapsed.value)
}


function getActiveMenuFromRoute() {
    const currentRoute = route?.path || window.location.pathname
    const routeMenuMap = {
        '/dashboardforadmin': 'dashboard',
        '/approvepartner': 'managepartner',
        '/mainpartner': 'managepartner',
        '/request': 'managepartner',
        '/rejectpartner': 'managepartner',
        '/mainpartnersleepgun': 'managepartner',
        '/detailpartnerall': 'managepartner',
        '/mainmanagemember': 'managemember',
        '/mainpromotion': 'promotion',
        '/addpromotion': 'promotion',
        // เพิ่ม route อื่นๆ ตามต้องการ
    }
    return routeMenuMap[currentRoute] || 'dashboard'
}



function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed.value))
    emitToggleSidebar()
}

function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function setActiveMobile(menu) {
    activeMenu.value = menu
    isMobileMenuOpen.value = false
}
function navigateTo(path, menuKey) {
    activeMenu.value = menuKey
    router.push(path)
    isMobileMenuOpen.value = false
}



onMounted(() => {
    isCollapsed.value = getSidebarStateFromStorage()
    emitToggleSidebar()

    const rawadmin = localStorage.getItem('admin')
    if (rawadmin && rawadmin !== 'undefined') {
        try {
            admin.value = JSON.parse(rawadmin)
            if (!admin.value.role) {
                admin.value.role = 'adm'
            }
        } catch (err) {
            console.error("❌ Failed to parse admin JSON:", err.message)
            admin.value = {
                firstname: '',
                lastname: '',
                companyName: '',
                role: 'admin'
            }
        }
    }
})
</script>


<style scoped>
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #dfdfdf #f8f8f9;
    /* thumb, track */
}

/* Chrome, Edge, Safari */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
    background: #f3f4f6;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(0, 0%, 68%);
    border-radius: 8px;
    transition: background 0.2s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #f59e42;
}
</style>
