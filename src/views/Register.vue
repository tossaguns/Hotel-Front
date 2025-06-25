TODO:เสร็จเเล้ว

<template>
  <div class="background-wrapper">
    <div class="backgr w-full min-h-screen flex flex-col items-center justify-center backgr">
      <div class="blur-overlay"></div>
      <div class="container">
        <div class="box">
          <span></span>
          <div class="content">
            <div class="md:text-6xl text-xl font-bold text-center">
              <h2>ยินดีต้อนรับเข้าสู่</h2>
              <h1 class="md:text-8xl text-5xl">Sleepgun Hotel</h1>
            </div>
            <div class="flex space-x-2">
              <div @click="navigateToRegisterPartner" class="btn flex-1"
                :class="activeMenu === 'manageemployee' ? 'bg-amber-400 text-white drop-shadow-lg' : ''">
                <button class="btn-hover color-2 max-[456px]:text-xs">
                  สมัครเป็นพาร์ทเนอร์กับ Sleepgun
                </button>
              </div>
              <div @click="navigateToRegisterMember" class="btn flex-1"
                :class="activeMenu === 'manageemployee' ? 'bg-amber-400 text-white drop-shadow-lg' : ''">
                <button class="btn-hover color-2">สมัครสมาชิก</button>
              </div>
            </div>
          </div>
        </div>
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
    },
  },
}
</script>
<style>
.background-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.backgr {
  background-image: url('https://i.pinimg.com/736x/ee/fa/74/eefa7498eac4d16a10c18e316a276199.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
}

.blur-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 1;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 50px 20px;
  position: relative;
  z-index: 1;
}

.btn-hover {
  width: 100%;
  color: #fff;
  cursor: pointer;
  height: 55px;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color-2 {
  background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
  box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
}

.container .box {
  position: relative;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 30px;
  transition: 0.5s;
}

.container .box::before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 50px;
  width: 50%;
  height: 100%;
  text-decoration: none;
  background: #fff;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
}

.container .box::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50;
  width: 50%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
  filter: blur(30px);
}

.container .box:hover:before,
.container .box:hover:after {
  transform: skewX(0deg);
  left: 20px;
  width: calc(100% - 90px);

}

.container .box:nth-child(1):before,
.container .box:nth-child(1):after {
  background: linear-gradient(315deg, #ffe605, #ff8c00)
}

.container .box span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}

.container .box span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: 0.1s;
  animation: animate 2s ease-in-out infinite;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08)
}

.container .box:hover span::before {
  top: -50px;
  left: 50px;
  width: 100px;
  height: 100px;
  opacity: 1;
}

.container .box span::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: 0.5s;
  animation: animate 2s ease-in-out infinite;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  animation-delay: -1s;
}

.container .box:hover span:after {
  bottom: -50px;
  right: 50px;
  width: 100px;
  height: 100px;
  opacity: 1;
}

@keyframes animate {

  0%,
  100% {
    transform: translateY(10px);
  }

  50% {
    transform: translate(-10px);
  }
}

.container .box .content {
  position: relative;
  left: 0;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1;
  transform: 0.5s;
  color: #fff;
  display: grid;
  gap: 30px;
}

.container .box:hover .content {
  left: -25px;
  padding: 60px 40px;
}

.container .box .content h2 {
  color: #fff;
  margin-bottom: 10px;
}

.container .box .content p {
  font-size: 1.1em;
  margin-bottom: 10px;
  line-height: 1.4em;
}

.container .box .content a {
  display: inline-block;
  font-size: 1.1em;
  color: #111;
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 700;
  margin-top: 5px;
}

.container .box .content a:hover {
  background: #ffcf4d;
  border: 1px solid rgba(255, 0, 88, 0.4);
  box-shadow: 0 1px 15px rgba(1, 1, 1, 0.2);
}
</style>
