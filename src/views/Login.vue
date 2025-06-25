<template>
  <div class="login-container">
    <div class="selection-screen" v-if="!selectedRole">

      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>

      <div class="container-pagelogin">

        <div class="partner">
          <div class="partner-content">
            <div class="partner-bar"></div>
            <div class="text-content text-right w-7">
              <h2>Partner</h2>
              <p>
                เข้าสู่ระบบสำหรับเจ้าของโรงแรมที่ต้องการนำโรงแรมของท่านเข้าร่วมกับแพลตฟอร์มของเรา
                เพื่อให้ลูกค้าสามารถค้นหาและจองห้องพักผ่านเว็บไซต์ได้อย่างสะดวก<br>หากยังไม่ได้เป็น Partner สามารถสมัครสมาชิกได้เลย
              </p>
              <div class="flex flex-col sm:flex-row sm:justify-between gap-2">
                <button class="partner-button" @click="selectRole('partner')">เข้าสู่ระบบ Partner</button>
                <button class="partner-button" @click="selectRole('registerpartner')">
                  สมัครสมาชิก Partner
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="center-wrapper">
          <div class="center-text">
            <h2>Login</h2>
          </div>
          <div class="center-image">
            <img class="" src="/ImgTossagun/Tossagunwelcom.png" alt="login icon" />
          </div>
        </div>

        <div class="member">
          <div class="member-content">
            <div class="text-member w-7 ml-0 md:ml-auto">
              <h2>Member</h2>
              <p>
                สำหรับลูกค้าที่ต้องการจองโรงแรมผ่านระบบของเรา
                เข้าสู่ระบบเพื่อดูประวัติการจอง ชำระเงิน และรับสิทธิพิเศษต่าง ๆ<br>หากยังไม่ได้เป็น Member สามารถสมัครสมาชิกได้เลย
              </p>
              <div class="flex flex-col sm:flex-row sm:justify-between gap-2">
                <button class="member-button" @click="selectRole('member')">เข้าสู่ระบบ Member</button>
                <button class="member-button" @click="selectRole('registermember')">สมัครสมาชิก Member</button>
              </div>
            </div>
            <div class="member-bar"></div>
          </div>
        </div>

      </div>
    </div>

    <transition name="slide-fade">
      <LoginMember v-if="showLogin && selectedRole === 'member'" @back="resetRole" />
    </transition>
    <transition name="slide-fade">
      <RegisterMember v-if="showLogin && selectedRole === 'registermember'" @back="resetRole" />
    </transition>

    <transition name="slide-partner">
      <LoginPartner v-if="showLogin && selectedRole === 'partner'" @back="resetRole" />
    </transition>
    <transition name="slide-partner">
      <RegisterPartner v-if="showLogin && selectedRole === 'registerpartner'" @back="resetRole" />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginMember from './LoginMember.vue'
import LoginPartner from './LoginPartner.vue'
import RegisterMember from './RegisterMember.vue'
import RegisterPartner from './RegisterPartner.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedRole = ref(null)
const expanded = ref(false);
const showLogin = ref(false);

function selectRole(role) {
  selectedRole.value = role;

  if (role === 'member') {
    expanded.value = true;
    showLogin.value = true;

    setTimeout(() => {
      router.push('/loginmember');
    }, 1000);
  }
  else if (role === 'registermember') {
    expanded.value = true;
    showLogin.value = true;

    setTimeout(() => {
      router.push('/registermember');
    }, 1000);
  }
  else if (role === 'partner') {
    expanded.value = true;
    showLogin.value = true;

    setTimeout(() => {
      router.push('/loginpartner');
    }, 1000);
  }
  else {
    expanded.value = true;
    showLogin.value = true;

    setTimeout(() => {
      router.push('/registerpartner');
    }, 1000);
  }
}

function resetRole() {
  selectedRole.value = null;
  expanded.value = false;
  showLogin.value = false;
}
</script>

<style scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.selection-screen {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background: linear-gradient(to top right, #FFA500, #FFF176);
  position: relative;
}

.bubble {
  position: absolute;
  bottom: -100px;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: floatUp 10s linear infinite;
  z-index: 2;
}

.bubble:nth-child(1) {
  left: 10%;
  animation-duration: 8s;
  width: 50px;
  height: 50px;
}

.bubble:nth-child(2) {
  left: 50%;
  animation-duration: 9s;
  width: 60px;
  height: 60px;
}

.bubble:nth-child(3) {
  left: 75%;
  animation-duration: 7s;
  width: 35px;
  height: 35px;
}

.bubble:nth-child(4) {
  left: 90%;
  animation-duration: 10s;
  width: 45px;
  height: 45px;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    transform: translateY(-110vh) scale(1.2);
    opacity: 0;
  }
}

.container-pagelogin {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 100%;
  width: 100%;
}

.partner:hover {
  transform: scale(1.03);
}

.partner {
  background: #fff8b3;
  border-top-right-radius: 500px;
  border-bottom-right-radius: 500px;
  height: 100%;
  transition: transform 0.3s;
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.partner-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 100%;
}

.partner h2 {
  font-size: 28px;
  font-weight: bold;
  font-family: 'Prompt', sans-serif;
}

.partner p {
  font-size: 16px;
  line-height: 1.5;
}

.partner-bar {
  width: 4px;
  height: 100px;
  background-color: #ff6a00;
  border-radius: 5px;
  transition: height 0.4s ease;
}

.partner:hover .partner-bar {
  height: 100%;
}

.partner-button {
  background-color: white;
  color: #1a1a1a;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
  margin-left: auto;
  display: block;
}

.member {
  background: #a6a6a6;
  color: white;
  border-top-left-radius: 500px;
  border-bottom-left-radius: 500px;
  height: 100%;
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.8s ease;
}

.member:hover {
  transform: scale(1.03);
}

.member-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 100%;
}

.member h2 {
  font-size: 28px;
  font-weight: bold;
  text-align: left;
  font-family: 'Prompt', sans-serif;
}

.member p {
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
}

.member-bar {
  width: 5px;
  height: 100px;
  background-color: #ffffff;
  border-radius: 5px;
  transition: height 0.4s ease;
}

.member:hover .member-bar {
  height: 100%;
}

.member-button {
  background-color: white;
  color: #1a1a1a;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
}

.center-wrapper {
  width: 100%;
  max-width: 600px;
  z-index: 1;
  margin: 0 -300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.center-text {
  font-size: 50px;
  font-weight: bold;
  transform: translateY(-100px);
  margin-bottom: -40px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.center-text h2 {
  font-size: 1em;
  background: linear-gradient(45deg, #00f5ff, #ff00ff, #ffff00, #00ff00, #ff4500);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 4s ease-in-out infinite;
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.center-image {
  width: clamp(150px, 32vw, 500px);
  aspect-ratio: 1 / 1;
  background: linear-gradient(to top right, #FFA500, #FFF176);
  border-radius: 9999px;
  display: grid;
  place-items: center;
  text-align: center;
  align-items: baseline;
}

.center-image img {
  width: 80%;
  height: auto;
  display: block;
  object-fit: contain;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s ease;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-partner-enter-active,
.slide-partner-leave-active {
  transition: all 0.8s ease;
}

.slide-partner-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-partner-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-partner-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-partner-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 1024px) {

  .partner h2,
  .member h2 {
    font-size: 24px;
  }

  .partner p,
  .member p {
    font-size: 14px;
  }

  .partner,
  .member {
    padding: 1.5rem;
    gap: 1rem;
  }

  .center-text {
    font-size: 40px;
    transform: translateY(-200px);
  }
}

@media (max-width: 768px) {
  .selection-screen {
    flex-direction: column;
    padding: 1rem;
    justify-content: center;
    gap: 1.5rem;
  }

  .container-pagelogin {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .partner,
  .member {
    width: 100%;
    border-radius: 1.5rem !important;
    padding: 1rem;
  }

  .partner-content,
  .member-content {
    justify-content: center;
  }

  .partner h2,
  .member h2 {
    font-size: 22px;
    text-align: center;
    width: 100%;
    margin: 0 auto;
  }

  .partner p,
  .member p {
    font-size: 14px;
    text-align: center;
    width: 90%;
    margin: 0 auto;
  }

  .center-wrapper {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    flex-direction: column;
  }

  .center-text {
    display: none;
  }

  .center-image {
    width: 100%;
    max-width: 280px;
  }

  .center-image img {
    width: 90%;
  }
}

@media screen and (max-width: 375px) and (max-height: 667px) {
  .center-image {
    width: 100%;
    max-width: 140px;
  }
}
</style>
