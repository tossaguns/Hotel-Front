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
                <img alt="โลโก้บริษัท" class="object-contain mb-2 shadow-lg rounded-full transition-all duration-300"
                    :class="isCollapsed ? 'w-11 h-11' : 'w-20 h-20'" />
                <p v-show="!isCollapsed" class="text-center text-sm text-stone-500 transition-opacity duration-300">
                    {{ partner.companyName }}
                </p>
            </div>

            <div class="mt-6">
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
                        <div @click="navigateTo('dashboardforexecutive', 'dashboard')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'dashboard' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">Dashboard</span>
                        </div>

                        <div @click="navigateTo('/mainhotelroom', 'stayroom')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'stayroom' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">เข้าพัก</span>
                        </div>

                        <div @click="navigateTo('/mainbookingtossagun', 'reservetossagun')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'reservetossagun' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">จองกับTossagun</span>
                        </div>

                        <div @click="navigateTo('/mainreport', 'report')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'report' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">รายงาน</span>
                        </div>

                        <div @click="navigateTo('/mainbyepromotion', 'promotion')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'promotion' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">ใช้งานโปรโมชั่น</span>
                        </div>

                        <div @click="navigateTo('/roomlist', 'manageroom')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'manageroom' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">จัดการห้องพัก</span>
                        </div>

                        <div @click="navigateTo('/mainemployee', 'manageemployee')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'manageemployee' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">จัดการพนักงาน</span>
                        </div>

                        <div @click="navigateTo('/mainprofilecompany', 'editproflie')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-amber-400 hover:text-white"
                            :class="activeMenu === 'editproflie' ? 'bg-amber-400 text-white' : 'text-gray-700'">
                            <span class="text-lg">แก้ไขโปรไฟล์</span>
                        </div>

                        <div class="flex flex-col justify-center mt-6 space-x-2 text-sm my-4">
                            <p class="text-center">Partner : <span class="text-amber-500 font-bold text-lg">{{
                                partner.role }}</span></p>
                            <div
                                class="transition-transform duration-300 group-hover:scale-110 text-stone-500 space-x-2">
                                <div class="flex space-x-2 justify-center">
                                    <p>{{ partner.firstname }}</p>
                                    <p> {{ partner.lastname }}</p>
                                </div>
                            </div>
                        </div>



                        <div @click="navigateTo('/logout', 'logout')"
                            class="flex items-center w-full p-3 rounded-lg text-left font-semibold transition duration-300 hover:bg-red-400 hover:text-white  justify-center"
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

const partner = ref({
    firstname: '',
    lastname: '',
    companyName: '',
    role: ''
})

const emit = defineEmits(['toggle-sidebar'])
const router = useRouter()
const route = useRoute()



const isCollapsed = ref(getSidebarStateFromStorage())
const isMobileMenuOpen = ref(false)
const activeMenu = ref(getActiveMenuFromRoute())



// ✅ โหลดสถานะ sidebar เมื่อ component ถูก mount
onMounted(() => {
    isCollapsed.value = getSidebarStateFromStorage()
    emitToggleSidebar()

    const savedPartner = localStorage.getItem('partner')
    if (savedPartner) {
        partner.value = JSON.parse(savedPartner)
        if (!partner.value.role) {
            partner.value.role = 'partner'
        }
    }
})

// ✅ เปลี่ยนเมนูที่ active เมื่อ route เปลี่ยน
watch(route, () => {
    activeMenu.value = getActiveMenuFromRoute()
})

// ===== METHODS =====
function getSidebarStateFromStorage() {
    try {
        const saved = localStorage.getItem('sidebarCollapsed')
        return saved ? JSON.parse(saved) : false
    } catch (error) {
        console.warn('Could not load sidebar state from localStorage:', error)
        return false
    }
}

function emitToggleSidebar() {
    // ถ้า component นี้ emit event ออกไป ต้องกำหนด defineEmits
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


// ========= EXPORT TO TEMPLATE =========
</script>
