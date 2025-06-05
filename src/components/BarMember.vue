<template>
    <div>
        <div class="fixed top-0 left-0 w-full h-20 bg-amber-400  flex items-center justify-between px-4 z-50">


            <div class="flex items-center space-x-2">
                <p class="md:text-4xl text-2xl font-bold">SLEEP</p>
                <p class="md:text-xl font-bold text-white">||</p>
                <p class="md:text-4xl text-2xl font-bold text-yellow-800">GUN</p>
            </div>

            <div class="hidden md:flex gap-2">
                <button class="px-4 py-1 rounded-lg hover:bg-yellow-200 text-yellow-800 ">จังหวัด</button>
                <button class="px-4 py-1 rounded-lg hover:bg-yellow-200 text-yellow-800">แนะนำ</button>
                <button class="px-4 py-1 rounded-lg hover:bg-yellow-200 text-yellow-800">ส่วนลด</button>
                <button @click="navigateToProfile"
                    class="px-4 py-1 rounded-lg hover:bg-yellow-200 font-bold text-white">โปรไฟล์</button>
            </div>
            <div class="hidden md:block space-x-2">
                <button @click="navigateToLogOut"
                    class="px-4 py-1 bg-white text-amber-400 text-bold rounded hover:bg-gray-50">LogOut</button>
            </div>



            <div class="md:hidden">
                <button @click="toggleMobileMenu">
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2"
                        viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>

        <div v-if="isMobileMenuOpen" class="md:hidden fixed top-20 left-0 w-full bg-white shadow z-50">
            <button class="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">จังหวัด</button>
            <button class="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">แนะนำ</button>
            <button class="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">ส่วนลด</button>
            <button @click="navigateToProfile"
                class="block w-full text-left px-4 py-2 text-yellow-700 font-bold rounded hover:bg-gray-100">โปรไฟล์</button>

            <button @click="navigateToLogOut"
                class="block w-full text-left px-4 py-2 text-amber-600 rounded hover:bg-amber-100">LogOut</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMobileMenuOpen: false
        }
    },
    methods: {
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen
        },
        navigateToLogOut() {
            this.$router.push("")
        },
        navigateToProfile() {
            this.$router.push("/mainprofile")
        },

    }
}
</script>
