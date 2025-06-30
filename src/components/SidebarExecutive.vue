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

            <div class="flex flex-col items-center mt-5 mb-4">
                <img alt="โลโก้บริษัท" class="object-contain mb-2 shadow-lg rounded-full transition-all duration-300"
                    :class="isCollapsed ? 'w-11 h-11' : 'w-20 h-20'" />
                <p v-show="!isCollapsed" class="text-center text-sm text-stone-500 transition-opacity duration-300">
                    {{ partner.companyName }}
                </p>
            </div>

            <div class="mt-3">
                <div @click="navigateTo('dashboardforexecutive', 'dashboard')"
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

                <div @click="navigateTo('/mainhotelroom', 'stayroom')"
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

                <div @click="navigateTo('/mainbookingtossagun', 'reservetossagun')"
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

                <div @click="navigateTo('/mainreport', 'report')"
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
                <div @click="navigateTo('/mainbyepromotion', 'promotion')"
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

                <div @click="navigateTo('/roomlist', 'manageroom')"
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

                <div @click="navigateTo('/mainemployee', 'manageemployee')"
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

                <div @click="navigateTo('/mainprofilecompany', 'editproflie')"
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


                <div class="flex flex-col justify-center mt-6 space-x-2 text-sm">
                    <p class="text-center text-stone-400">role <span class=" text-lg text-amber-500 font-bold">{{
                        partner.role }}</span></p>
                    <div v-show="!isCollapsed"
                        class="text-center mt-1 transition-transform duration-300 group-hover:scale-110 text-stone-500 bg-amber-100 py-1 rounded-lg mx-4">
                        <div class="flex space-x-2 justify-center">
                            <p>{{ partner.firstname }}</p>
                            <p> {{ partner.lastname }}</p>
                        </div>
                    </div>
                </div>

                <div @click="navigateTo('/logout', 'logout')"
                    class="mt-12 group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-red-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
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
        <!-- Mobile Hamburger Button (small, top-left, floating) -->
        <button
            @click="toggleMobileMenu"
            class="fixed top-3 right-4 z-50 rounded-full flex items-center justify-center w-[40px] h-6 transition"
            aria-label="Open menu"
        >
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
        </button>

        <!-- Overlay -->
        <div v-if="isMobileMenuOpen" @click="toggleMobileMenu" class="fixed inset-0 bg-black bg-opacity-40 z-[105]"></div>

        <!-- Slide-in Menu (from left) -->
        <transition name="slide">
            <div v-if="isMobileMenuOpen" class="fixed top-0 left-0 bottom-0 w-56 bg-white z-[110] shadow-lg flex flex-col">
                <div class="flex items-center justify-between px-4 py-3 border-b h-14">
                    <span class="font-bold text-base">เมนู</span>
                    <button @click="toggleMobileMenu" class="p-1 rounded hover:bg-gray-100 transition" aria-label="Close menu">
                        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="6" y1="6" x2="18" y2="18" />
                            <line x1="6" y1="18" x2="18" y2="6" />
                        </svg>
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto px-3 py-4">
                    <div class="space-y-2">
                        <div @click="navigateTo('dashboardforexecutive', 'dashboard')"
                            class="w-full p-2 rounded text-left font-semibold transition hover:bg-amber-400 hover:text-white cursor-pointer"
                            :class="activeMenu === 'dashboard' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            Dashboard
                        </div>
                        <div @click="navigateTo('/mainhotelroom', 'stayroom')"
                            class="w-full p-2 rounded text-left font-semibold transition hover:bg-amber-400 hover:text-white cursor-pointer"
                            :class="activeMenu === 'stayroom' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            เข้าพัก
                        </div>
                        <div @click="navigateTo('/mainbookingtossagun', 'reservetossagun')"
                            class="w-full p-2 rounded text-left font-semibold transition hover:bg-amber-400 hover:text-white cursor-pointer"
                            :class="activeMenu === 'reservetossagun' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            จองกับTossagun
                        </div>
                        <div @click="navigateTo('/mainreport', 'report')"
                            class="w-full p-2 rounded text-left font-semibold transition hover:bg-amber-400 hover:text-white cursor-pointer"
                            :class="activeMenu === 'report' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            รายงาน
                        </div>
                        <div @click="navigateTo('/mainbyepromotion', 'promotion')"
                            class="w-full p-2 rounded text-left font-semibold transition hover:bg-amber-400 hover:text-white cursor-pointer"
                            :class="activeMenu === 'promotion' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            ใช้งานโปรโมชั่น
                        </div>
                        <div @click="navigateTo('/roomlist', 'manageroom')"
                            class="w-full p-2 rounded text-left font-semibold transition hover:bg-amber-400 hover:text-white cursor-pointer"
                            :class="activeMenu === 'manageroom' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            จัดการห้องพัก
                        </div>
                        <div @click="navigateTo('/mainemployee', 'manageemployee')"
                            class="w-full p-2 rounded text-left font-semibold transition hover:bg-amber-400 hover:text-white cursor-pointer"
                            :class="activeMenu === 'manageemployee' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            จัดการพนักงาน
                        </div>
                        <div @click="navigateTo('/mainprofilecompany', 'editproflie')"
                            class="w-full p-2 rounded text-left font-semibold transition hover:bg-amber-400 hover:text-white cursor-pointer"
                            :class="activeMenu === 'editproflie' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            แก้ไขโปรไฟล์
                        </div>
                        <div class="flex flex-col justify-center mt-6 text-xs my-2">
                            <p class="text-center">Partner: <span class="text-amber-500 font-bold">{{ partner.role }}</span></p>
                            <div class="text-center text-stone-500">
                                <p>{{ partner.firstname }} {{ partner.lastname }}</p>
                            </div>
                        </div>
                        <div @click="navigateTo('/logout', 'logout')"
                            class="w-full p-2 rounded text-center font-semibold transition hover:bg-red-400 hover:text-white cursor-pointer mt-4"
                            :class="activeMenu === '' ? 'bg-red-400 text-white' : 'text-gray-700'">
                            LogOut
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const partner = ref({
    firstname: '',
    lastname: '',
    companyName: '',
    role: ''
})

const user = ref(null)

try {
    const raw = localStorage.getItem('user')
    if (raw && raw !== 'undefined') {
        user.value = JSON.parse(raw)
    } else {
        console.warn("⚠️ localStorage ไม่มี user หรือเป็น undefined")
        user.value = null
    }
} catch (err) {
    console.error("❌ Failed to parse user JSON:", err.message)
    user.value = null
}

const emit = defineEmits(['toggle-sidebar'])
const router = useRouter()
const route = useRoute()

const isCollapsed = ref(getSidebarStateFromStorage())
const isMobileMenuOpen = ref(false)
const activeMenu = ref(getActiveMenuFromRoute())

// โหลดสถานะ sidebar เมื่อ component ถูก mount
onMounted(() => {
    isCollapsed.value = getSidebarStateFromStorage()
    emitToggleSidebar()

    const rawPartner = localStorage.getItem('partner')
    if (rawPartner && rawPartner !== 'undefined') {
        try {
            partner.value = JSON.parse(rawPartner)
            if (!partner.value.role) {
                partner.value.role = 'partner'
            }
        } catch (err) {
            console.error("❌ Failed to parse partner JSON:", err.message)
            partner.value = {
                firstname: '',
                lastname: '',
                companyName: '',
                role: 'partner'
            }
        }
    }
})

// เปลี่ยนเมนูที่ active เมื่อ route เปลี่ยน
watch(route, () => {
    activeMenu.value = getActiveMenuFromRoute()
})

// ===== METHODS =====
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
    const currentRoute = route.path || window.location.pathname

    const routeMenuMap = {
        '/dashboardforexecutive': 'dashboard',
        '/mainemployee': 'manageemployee',
        '/addemployee': 'manageemployee',
        '/employeelist': 'manageemployee',
        '/editemployee': 'manageemployee',

        '/editprofilecompany': 'editproflie',
        '/mainprofilecompany': 'editproflie',
        '/profilecompany': 'editproflie',
        '/editdetailhotel': 'editproflie',
        '/detailhotel': 'editproflie',

        '/roomlist': 'manageroom',
        '/addroom': 'manageroom',
        '/editroom': 'manageroom',
        '/mainhotelroom': 'stayroom',
        '/maincheckincheckout': 'stayroom',
        '/checkin': 'stayroom',
        '/checkout': 'stayroom',
        '/mainhoteldetailroom': 'stayroom',
        '/mainbookingtossagun': 'reservetossagun',
        '/maindetailbookingtossagun': 'reservetossagun',
        '/mainreport': 'report',
        '/mainbyepromotion': 'promotion',
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
