<template>

    <div class="flex flex-col">
        <main
            class="flex-grow flex flex-col justify-center pt-32 md:pt-32 md:mb-32 items-center bg-amber-400 text-center px-3 md:rounded-b-3xl rounded-b-xl">
            <p class="text-2xl md:text-6xl font-semibold text-white min-h-[2.5rem] mb-10">
                {{ displayText }}
                <span class="animate-ping text-white">|</span>
            </p>
            <p class="hidden md:block md:mb-8 mt-6 mb-4 text-amber-800 text-sm md:text-lg px-4">
                เว็บไซต์จองโรงแรม ที่รวมที่พักคุณภาพจากทั่วประเทศไว้ในที่เดียว
            </p>
        </main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            lines: [
                'ยินดีต้อนรับเข้าสู่',
                'Sleep Gun',
                'จองห้องพักง่ายในไม่กี่คลิ๊ก',
                'รองรับหลายจังหวัดทั่วไทย',
                'รับสิทธิพิเศษเมื่อสมัครสมาชิกวันนี้',
            ],
            currentLineIndex: 0,
            displayText: '',
            isDeleting: false,
            typingSpeed: 100,
            pauseAfterTyping: 1500,
            pauseAfterDeleting: 500
        }
    },
    methods: {
        navigateTologin() {
            this.$router.push("/login")
        },
        navigateToregister() {
            this.$router.push("/register")
        },
        typeLine() {
            const fullText = this.lines[this.currentLineIndex]
            if (this.isDeleting) {
                this.displayText = fullText.substring(0, this.displayText.length - 1)
            } else {
                this.displayText = fullText.substring(0, this.displayText.length + 1)
            }

            let delay = this.typingSpeed

            if (!this.isDeleting && this.displayText === fullText) {
                delay = this.pauseAfterTyping
                this.isDeleting = true
            } else if (this.isDeleting && this.displayText === '') {
                delay = this.pauseAfterDeleting
                this.isDeleting = false
                this.currentLineIndex = (this.currentLineIndex + 1) % this.lines.length
            }

            setTimeout(this.typeLine, delay)

        }
    },
    mounted() {
        this.typeLine()
    },
}
</script>

<style scoped>
@keyframes ping {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

.animate-ping {
    animation: ping 1s infinite;
}
</style>