<template>
    <div>
        <div class="flex justify-end">
            <button @click="navigateToMoreProvinceHotel"
                class="text-stone-400 hover:text-stone-700 mb-2 px-2">ดูทั้งหมด>></button>
        </div>

        <div class="relative mb-6 rounded-lg 2xl:px-80">
            <div class="flex gap-2 md:gap-4">
                <div v-for="(hotel, index) in hotels" :key="index"
                    class="flex-shrink-0 w-[calc(50%-0.25rem)] md:w-[calc(20%-0.8rem)]">
                    <button
                        class="bg-white shadow-md rounded-lg border p-2 w-full h-full hover:shadow-lg transition-shadow min-h-[280px] md:min-h-[320px]">
                        <div class="relative w-full shadow-sm flex justify-center mb-2">
                            <img :src="hotel.image" class="w-full h-32 md:h-40 object-cover rounded-md" />
                        </div>
                        <div class="text-left">
                            <div class="flex justify-center space-x-2 mb-1">
                                <p class="text-xs md:text-sm">{{ hotel.rating }}</p>
                                <p class="text-xs md:text-sm text-blue-500">{{ hotel.province }}</p>
                            </div>
                            <p class="text-xs text-gray-400 mb-1">{{ hotel.reviewCount }}</p>
                            <p class="bg-green-500 text-white rounded-md px-2 py-1 text-xs mb-2 inline-block">{{
                                hotel.promotion }}</p>
                            <p class="text-2xl md:text-4xl font-bold text-red-600 mb-1">{{ hotel.price }}</p>
                            <p class="text-xs text-gray-400">{{ hotel.taxInfo }}</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            canScrollLeft: false,
            canScrollRight: true,
            hotels: [
                {
                    image: '/images/ImgProvince/Bangkok.jpg',
                    rating: 'review *****',
                    province: 'กรุงเทพฯ',
                    reviewCount: '1,234 รีวิว',
                    promotion: 'Promotion',
                    price: '2,500 บาท',
                    taxInfo: 'รวม tax ค่าธรรมเนียม'
                },
                {
                    image: '/images/ImgProvince/Bangkok.jpg',
                    rating: 'review ****',
                    province: 'เชียงใหม่',
                    reviewCount: '856 รีวิว',
                    promotion: 'Hot Deal',
                    price: '1,800 บาท',
                    taxInfo: 'ไม่รวม tax ค่าธรรมเนียม'
                },
                {
                    image: '/images/ImgProvince/Bangkok.jpg',
                    rating: 'review *****',
                    province: 'ภูเก็ต',
                    reviewCount: '2,156 รีวิว',
                    promotion: 'Best Price',
                    price: '3,200 บาท',
                    taxInfo: 'รวม tax ค่าธรรมเนียม'
                },
                {
                    image: '/images/ImgProvince/Bangkok.jpg',
                    rating: 'review ****',
                    province: 'พัทยา',
                    reviewCount: '967 รีวิว',
                    promotion: 'Special',
                    price: '2,100 บาท',
                    taxInfo: 'รวม tax ค่าธรรมเนียม'
                },
                {
                    image: '/images/ImgProvince/Bangkok.jpg',
                    rating: 'review *****',
                    province: 'หัวหิน',
                    reviewCount: '1,543 รีวิว',
                    promotion: 'Weekend Deal',
                    price: '2,800 บาท',
                    taxInfo: 'ไม่รวม tax ค่าธรรมเนียม'
                },
                {
                    image: '/images/ImgProvince/Bangkok.jpg',
                    rating: 'review ****',
                    province: 'เกาะสมุย',
                    reviewCount: '745 รีวิว',
                    promotion: 'Limited Time',
                    price: '4,500 บาท',
                    taxInfo: 'รวม tax ค่าธรรมเนียม'
                },
                {
                    image: '/images/ImgProvince/Bangkok.jpg',
                    rating: 'review *****',
                    province: 'กระบี่',
                    reviewCount: '1,876 รีวิว',
                    promotion: 'Super Deal',
                    price: '3,600 บาท',
                    taxInfo: 'รวม tax ค่าธรรมเนียม'
                }
            ]
        }
    },

    methods: {
        navigateToMoreProvinceHotel() {
            this.$router.push("/moreprovincehotel")
        },

    }
}
</script>
