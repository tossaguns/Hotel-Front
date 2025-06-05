<template>
    <div class=" 2xl:px-80">
        <div class="flex justify-end">
            <button @click="navigateToMoreProvinceHotel"
                class="text-stone-400 hover:text-stone-700 mb-2 px-2">ดูทั้งหมด>></button>
        </div>

        <div class="flex flex-row gap-2 md:gap-2 mb-6 rounded-lg">
            <div @click="navigateToBangkokHotel" class="relative w-full md:w-1/3 shadow-sm ">
                <img src="/images/ImgProvince/Bangkok.jpg"
                    class="absolute inset-0 w-full h-full object-cover rounded-md" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 rounded-md">
                </div>
                <div class="relative z-10 p-4 md:pb-8 text-white">
                    <div class="md:text-3xl md:font-bold mb-2 md:text-right text-center">Bangkok
                        กรุงเทพ</div>
                </div>
            </div>

            <div @click="navigateToChingMaiHotel" class="relative w-full md:w-1/3 shadow-sm ">
                <img src="/images/ImgProvince/ChiangMai.jpg"
                    class="absolute inset-0 w-full h-full object-cover rounded-md" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 rounded-md">
                </div>
                <div class="relative z-10 p-4 md:pb-8 text-white">
                    <div class="md:text-3xl md:font-bold mb-2 md:text-right text-center">ChingMai เชียงใหม่</div>
                </div>
            </div>


            <div @click="navigateToKraBiHotel" class="relative w-full md:w-1/3 shadow-sm ">
                <img src="/images/ImgProvince/Krabi.jpg"
                    class="absolute inset-0 w-full h-full object-cover rounded-md" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 rounded-md">
                </div>
                <div class="relative z-10 p-4 md:pb-8 text-white">
                    <div class="md:text-3xl md:font-bold mb-2 md:text-right text-center">Krabi กระบี่</div>
                </div>
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
        navigateToMoreProvinceHotel() {
            this.$router.push("/moreprovincehotel")
        },
        navigateToBangkokHotel() {
            this.$router.push("/bangkokhotel")
        },
        navigateToChingMaiHotel() {
            this.$router.push("/chingmaihotel")
        },
        navigateToKraBiHotel() {
            this.$router.push("/krabihotel")
        }

    },
}

</script>
<style></style>