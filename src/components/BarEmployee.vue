<template>
  <!-- Desktop Sidebar -->
  <div class="hidden md:flex flex-col fixed left-0 bg-white rounded-lg transition-all duration-300 ease-in-out z-40"
    style="top: 1rem; bottom: 1rem; height: auto;" :class="[
      isCollapsed ? 'w-[80px]' : 'w-[240px]',
      'ml-2'
    ]">
    <nav class="flex flex-col space-y-1 p-2 overflow-y-auto custom-scrollbar">
      <div class="m-2" :class="isCollapsed ? 'flex justify-center' : ''">
        <img v-if="!isCollapsed" src="/images/icon/closeopenbar.png" @click="toggleSidebar" alt="ไอคอนปิดบาร์"
          class="w-2 h-5 cursor-pointer hover:opacity-70 ml-auto" />
        <img v-if="isCollapsed" src="/images/icon/closeopenbar.png" @click="toggleSidebar" alt="ไอคอนเปิดบาร์"
          class="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
      </div>

      <div class="mt-6">
        <SidebarEmployee to="/mainhotelforemployee" icon="/images/icon/room_nav.png" label="หน้าหลัก" keyName="home"
          :isCollapsed="isCollapsed" :activeMenu="activeMenu" @navigate="navigateTo" />

        <SidebarEmployee to="/profileemployee" icon="/images/icon/profile.png" label="โปรไฟล์" keyName="profile"
          :isCollapsed="isCollapsed" :activeMenu="activeMenu" @navigate="navigateTo" />

        <SidebarEmployee to="/dashboardforemployee" icon="/images/icon/dashboard_nav.png" label="แดชบอร์ด"
          keyName="dashboard" :isCollapsed="isCollapsed" :activeMenu="activeMenu" @navigate="navigateTo" />

        <SidebarEmployee to="/checkemployeelogin" icon="/images/icon/calendar_nav.png" label="เช็คอิน" keyName="checkin"
          :isCollapsed="isCollapsed" :activeMenu="activeMenu" @navigate="navigateTo" />

        <div class="flex flex-col items-center mt-6 mb-6 space-y-2 text-sm">
          <p class="text-center">
            พนักงาน :
            <span class="text-gray-800 font-semibold text-base">
              {{ employee.role }}
            </span>
          </p>

          <div class="text-stone-600">
            <div class="flex flex-col items-center space-y-1">
              <p class="font-medium">{{ employee.firstname }} {{ employee.lastname }}</p>
            </div>
          </div>
        </div>

        <SidebarEmployee to="/logout" icon="/images/icon/logout.png" label="เช็คเอ้าท์" keyName="logout"
          :isCollapsed="isCollapsed" :activeMenu="activeMenu" :logout="true" @navigate="navigateTo" />
      </div>
    </nav>
  </div>

  <div class="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
    <div class="flex items-center justify-center px-4 py-3 h-16">
      <button @click="toggleMobileMenu" class="p-2 rounded-lg hover:bg-gray-100 transition-colors w-full">
        รายการ
      </button>
    </div>
  </div>

  <!-- พื้นหลังมืดเมื่อเปิดเมนู -->
  <div v-if="isMobileMenuOpen" @click="closeMobileMenu" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
  </div>

  <!-- เมนูรายการแบบดรอปดาวน์ -->
  <div v-if="isMobileMenuOpen" class="md:hidden fixed top-16 left-0 right-0 z-50 bg-white shadow-lg rounded-b-lg">
    <nav class="flex flex-col space-y-1 p-4">
      <SidebarEmployee to="/mainhotelforemployee" icon="/images/icon/room_nav.png" label="หน้าหลัก" keyName="home"
        :isCollapsed="false" :activeMenu="activeMenu" @navigate="navigateToMobile" />
      <SidebarEmployee to="/profileemployee" icon="/images/icon/profile.png" label="โปรไฟล์" keyName="profile"
        :isCollapsed="false" :activeMenu="activeMenu" @navigate="navigateToMobile" />
      <SidebarEmployee to="/dashboardforemployee" icon="/images/icon/dashboard_nav.png" label="แดชบอร์ด"
        keyName="dashboard" :isCollapsed="false" :activeMenu="activeMenu" @navigate="navigateToMobile" />
      <SidebarEmployee to="/checkemployeelogin" icon="/images/icon/calendar_nav.png" label="เช็คอิน" keyName="checkin"
        :isCollapsed="false" :activeMenu="activeMenu" @navigate="navigateToMobile" />
      <div class="flex flex-col items-center mt-6 mb-6 space-y-2 text-sm">
        <p class="text-center">
          พนักงาน :
          <span class="text-gray-600 font-semibold text-base">
            {{ employee.role }}
          </span>
        </p>

        <div class="text-stone-600">
          <div class="flex flex-col items-center space-y-1">
            <p class="font-medium">{{ employee.firstname }} {{ employee.lastname }}</p>
          </div>
        </div>
      </div>
      <SidebarEmployee to="/logout" icon="/images/icon/logout.png" label="เช็คเอ้าท์" keyName="logout"
        :isCollapsed="false" :activeMenu="activeMenu" :logout="true" @navigate="navigateToMobile" />
    </nav>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SidebarEmployee from './SidebarEmployee.vue'

export default {
  components: { SidebarEmployee },
  emits: ['toggle-sidebar'],
  setup(_, { emit }) {
    const router = useRouter()
    const route = useRoute()

    const isCollapsed = ref(false)
    const activeMenu = ref('')
    const isMobileMenuOpen = ref(false)

    const employee = ref({
      firstname: 'สมปอง',
      lastname: 'ตั้งใจดี',
      role: 'Employee'
    })

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value
      localStorage.setItem('sidebarEmployeeCollapsed', JSON.stringify(isCollapsed.value))
      emit('toggle-sidebar', isCollapsed.value)
    }

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    const navigateTo = (path, menuKey) => {
      activeMenu.value = menuKey

      // จัดการ logout
      if (path === '/logout') {
        // ล้างข้อมูลใน localStorage
        localStorage.removeItem('sidebarEmployeeCollapsed')
        // ไปยังหน้า login
        router.push('/login')
        return
      }

      router.push(path)
    }

    const navigateToMobile = (path, menuKey) => {
      activeMenu.value = menuKey
      closeMobileMenu()

      // จัดการ logout
      if (path === '/logout') {
        localStorage.removeItem('sidebarEmployeeCollapsed')
        router.push('/login')
        return
      }

      router.push(path)
    }

    onMounted(() => {
      const saved = localStorage.getItem('sidebarEmployeeCollapsed')
      if (saved !== null) {
        isCollapsed.value = JSON.parse(saved)
      }

      const raw = localStorage.getItem('employee')
      if (raw && raw !== 'undefined') {
        try {
          employee.value = JSON.parse(raw)
        } catch (e) {
          console.warn('Error parsing employee:', e)
        }
      }

      const routeMap = {
        '/mainhotelforemployee': 'home',
        '/profileemployee': 'profile',
        '/dashboardforemployee': 'dashboard',
        '/checkemployeelogin': 'checkin',
        '/logout': 'logout'
      }
      activeMenu.value = routeMap[route.path] || ''
    })

    return {
      isCollapsed,
      activeMenu,
      isMobileMenuOpen,
      toggleSidebar,
      toggleMobileMenu,
      closeMobileMenu,
      navigateTo,
      navigateToMobile,
      employee,
    }
  },
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #1f2937; /* bg-gray-800 */
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #111827; /* hover เข้มกว่า -> ใกล้ bg-gray-900 */
}
</style>