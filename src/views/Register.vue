TODO:เสร็จเเล้ว

<template>
  <div class="w-full min-h-screen flex flex-col items-center justify-center backgr">
    <div class="md:text-6xl text-xl font-bold text-center">
      <h1>ยินดีต้อนรับเข้าสู่</h1>
      <h1 class="md:text-8xl text-5xl">Sleepgun Hotel</h1>
    </div>

    <div class="pt-20 flex flex-col md:flex-row md:space-x-6 mb-10">
      <div @click="navigateToRegisterPartner"
        class="buttompart group backdrop-blur-sm rounded-lg transition duration-300 shadow-xl py-4 px-3 md:py-3 md:px-4 hover:bg-amber-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
        :class="activeMenu === 'manageemployee' ? 'bg-amber-400 text-white drop-shadow-lg' : ''">
        <p class="transition-transform duration-300 group-hover:scale-110">
          สมัครเป็นพาร์ทเนอร์กับ Sleepgun</p>
      </div>
      <div @click="navigateToRegisterMember"
        class="buttommember group backdrop-blur-sm rounded-lg transition duration-300 shadow-xl py-4 px-3 md:py-3 md:px-4 hover:bg-blue-500 hover:text-white hover:drop-shadow-lg flex items-center justify-center cursor-pointer mt-4 md:mt-0"
        :class="activeMenu === 'manageemployee' ? 'bg-amber-400 text-white drop-shadow-lg' : ''">
        <p class="transition-transform duration-300 group-hover:scale-110">
          สมัครสมาชิก
        </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {

    }
  },
  methods: {
    navigateToRegisterPartner() {
      this.$router.push("/registerpartner")
    },
    navigateToRegisterMember() {
      this.$router.push("/registermember")
    }
  },

}
</script>
<style>
  .backgr {
      margin: 0;
      height: 100vh;
      background: linear-gradient(to bottom, yellow, blue);
    }

    .buttompart{
      background-color: #fff9b0;
    }

    .buttommember{
      background-color: #a0c4ff;
    }

</style>
