<template>
  <div class="w-full min-h-screen bg-yellow-400 text-center flex items-center pl-10 pr-10">
    <div class="bg-white p-3">
      <div class="sm:text-6xl text-2xl font-bold textanima">
        Tossagun Hotel
      </div>
      <div class="m-6 flex justify-center">
        <img src="/ImgTossagun/Tosrun.jpg" alt="icon" class="sm:w-3 w-9 object-contain runner" />
      </div>
      <div class="text-xl">
        <p>ขณะนี้เจ้าหน้าที่กำลังทำการตรวจสอบ</p>
        <p>หากการอนุมัติสำเร็จ ทางเราจะส่งข้อความเเจ้งให้ท่านทราบผ่านทาง Email ภายใน 1-3 วัน</p>
      </div>

      <div class="font-bold mt-5 text-yellow-600">
        <p>
          ขอบคุณทุกท่านที่สนใจเป็นพาทเนอร์กับเรา
        </p>
      </div>

      <div class="mt-20 ">
        <button @click="navigateToTassagunHotel"
          class="bg-red-600 p-2 text-white rounded-md hover:bg-red-800">กลับหน้าหลัก</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    navigateToTassagunHotel() {
      this.$router.push("/")
    }
  },

}
</script>
<style>
.runner {
  width: 100%;
  animation: bounce 0.4s infinite ease-in-out;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.textanima {
  position: relative;
  text-transform: uppercase;
  font-size: 50px;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(90deg, #000, #fff, #000);
  background-repeat: no-repeat;
  background-size: 80%;
  animation: animate 5s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}

@keyframes animate {
  0% {
    background-position: -500%;
  }

  80% {
    background-position: 500%;
    /* ค่อยๆ หาย */
  }

  100% {
    background-position: -500%;
    /* กลับมาเร็ว */
  }
}
</style>