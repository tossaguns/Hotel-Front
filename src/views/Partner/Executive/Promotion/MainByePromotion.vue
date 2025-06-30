<template>
	<div class="w-full min-h-screen bg-gray-50 flex">
		<Sidebar @toggle-sidebar="handleSidebarToggle" />

		<div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-10 md:mt-0 transition-all duration-300"
			style="top: 1rem; bottom: 1rem; height: auto;" :class="{
				'md:ml-[232px]': !isSidebarCollapsed,
				'md:ml-[72px]': isSidebarCollapsed,

			}">

			<div class="">
				<div class="fixed top-0 left-0 right-0 h-4 z-[40] bg-gray-100"></div>
				<div
					class="sticky top-4 z-30 md:rounded-t-lg bg-amber-400 p-2 text-white text-lg shadow-lg shadow-gray-300">
					<h1>Promotion</h1>
				</div>

				<div class="bg-white min-h-screen ">
					<div>
						<div class="flex lg:justify-between">
							<div class="lg:w-5/6">
								<div class="max-w-7xl mx-auto md:px-4">

									<div class="text-center mb-10 md:mt-20 mt-6">
										<p class="md:text-3xl text-2xl font-bold text-gray-800">
											เลือกใช้ <span class="text-amber-500">บริการที่เหมาะกับคุณ</span>
										</p>
										<p class="text-gray-500 md:text-sm text-xs">
											เลือกโปรโมชั่นที่ตรงใจคุณ และเริ่มใช้งานได้ทันที
										</p>
									</div>

									<div
										class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center justify-center">
										<div v-for="promotion in activePromotions" :key="promotion.promotion_id"
											class="w-full max-w-[285px] rounded-lg bg-white shadow-md border transition hover:scale-105 flex flex-col justify-between min-h-[300px]">
											<div
												class="py-3 text-gray-400 text-center font-bold text-lg break-all whitespace-pre-wrap">
												{{ promotion.namePromotion || 'ชื่อโปรโมชั่น' }}
											</div>

											<div
												class="px-3 pb-6 pt-4 text-gray-700 flex flex-col flex-1 justify-between">
												<div class=" text-center ">
													<p class="font-bold text-3xl text-gray-900">{{ promotion.price ||
														'0' }}
													</p>
													<p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
												</div>

												<div class="list-none space-y-1 mt-4">
													<div class="bg-gray-50 p-3 rounded-md ">
														<div v-for="(line, index) in promotion.detailPromotion.split('\n')"
															:key="index" class="flex items-start ">
															<span class="mr-2 mt-1">✔</span>
															<span
																class="break-all whitespace-pre-wrap flex-1 md:text-sm text-xs ">
																{{ line }}
															</span>
														</div>
													</div>


													<div class="mt-4 md:text-sm text-xs px-6">
														<div class="flex items-start">
															<span class="mr-2 mt-1">📅</span>
															<span>เริ่ม: {{ promotion.dateStart || '-' }}</span>
														</div>
														<div class="flex items-start">
															<span class="mr-2 mt-1">📅</span>
															<span>สิ้นสุด: {{ promotion.dateFinish || '-' }}</span>
														</div>
													</div>

												</div>
												<div class="flex justify-center mt-4">
													<button @click="openPaymentPopup(promotion.promotion_id)"
														class="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-4 py-1 rounded-lg transition">
														ซื้อเลย
													</button>
												</div>
											</div>
										</div>
									</div>

									<div class="pb-20 pt-20">
										<div class="bg-stone-50 py-5 px-4 sm:px-6 lg:px-8 md:rounded-xl shadow-lg">
											<div class="mb-5">
												<p class="text-2xl md:text-3xl font-bold text-center text-amber-500">
													บริการที่กำลังใช้งาน
												</p>
												<p class="text-xs md:text-sm text-center text-gray-500 ">
													บริการที่ใช้งานกับ SLEEPGUN ในปัจจุบัน</p>

											</div>


											<div class="max-w-3xl mx-auto">
												<div v-for="(item, idx) in paginatedHistory" :key="idx"
													class="bg-white rounded-lg shadow p-4 border mb-2 flex flex-col gap-y-2">
													<div class="font-bold text-lg text-rose-600 mb-3">{{ item.name }}
													</div>

													<div class="flex justify-between 2xl:px-8 px-2 items-center mb-2">
														<div>
															<div class="text-sm  text-gray-500 mb-3">
																<p>
																	<span class="md:inline hidden">สถานะ :</span>
																	<span class="md:ml-2" :class="[
																		'md:px-3 px-2 text-xs md:text-sm py-1 rounded-md text-white font-medium',
																		item.status === 'ใช้งานอยู่' ? 'bg-green-500' : 'bg-gray-400'
																	]">
																		{{ item.status }}
																	</span>
																</p>
															</div>
															<div class="text-xs text-gray-400">
																<div>วันเริ่มต้น: <span class="font-medium ">{{
																	item.start }}</span></div>
																<div>วันสิ้นสุด: <span class="font-medium ">{{
																	item.end }}</span></div>
															</div>
														</div>


														<div>
															<div class="text-right md:text-center">
																<div v-if="displayPrice(item).hasDiscount">
																	<p
																		class="text-xs md:text-xl line-through text-gray-500 text-right">
																		{{
																			displayPrice(item).originalPrice }}</p>
																	<p
																		class="text-xl font-bold md:text-3xl text-rose-600">
																		{{
																			displayPrice(item).reducedPrice }}</p>
																	<p class="text-xs md:text-sm text-gray-500">
																		บาท/คน/บัญชี</p>
																</div>

																<div v-else>
																	<p
																		class="text-xl font-bold md:text-3xl text-gray-900">
																		{{ displayPrice(item).originalPrice }}</p>
																	<p class="text-xs md:text-sm text-gray-500">
																		บาท/คน/บัญชี</p>
																</div>
															</div>
														</div>
													</div>

													<div
														class="w-full my-2 py-2 px-2 text-center md:text-base text-xs rounded-md text-gray-400 border">
														<p>{{ item.detail }}</p>
													</div>


													<div class="flex justify-end space-x-2">
														<button
															class="mt-2 px-3 py-1 rounded-md bg-amber-500 text-white text-xs hover:bg-gray-300 transition">
															ใบเสร็จกำกับภาษี
														</button>
														<button
															class="mt-2 px-3 py-1 rounded-md bg-rose-500 text-white text-xs hover:bg-gray-300 transition">
															ใบเสร็จเเบบย่อ
														</button>
														<button
															class="mt-2 px-3 py-1 rounded-md bg-blue-500 text-white text-xs hover:bg-gray-300 transition">
															สลิป
														</button>
													</div>

												</div>
											</div>

											<div v-if="totalPages > 1"
												class="flex justify-center items-center gap-2 mt-6 md:text-base text-xs">
												<button @click="prevPage" :disabled="currentPage === 1"
													class="px-3 py-1 rounded bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition">
													ก่อนหน้า
												</button>

												<span class="px-3 py-1 text-gray-700">
													หน้า {{ currentPage }} จาก {{ totalPages }}
												</span>

												<button @click="nextPage" :disabled="currentPage === totalPages"
													class="px-3 py-1 rounded bg-amber-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-600 transition">
													ถัดไป
												</button>
											</div>

											<div ref="historyContainer"></div>
										</div>
									</div>
								</div>
							</div>























							<div
								class="w-[400px] hidden pl-2 lg:flex justify-center sticky top-0 h-screen overflow-y-auto custom-scrollbar">
								<!--ประวัติการทำรายการ-->
								<div class="w-full">
									<BarServePromotion />
								</div>
							</div>
						</div>

						<div v-if="toggleMobilePromo" ref="mobilePromoContainer"
							class="fixed inset-0 z-50 flex justify-end items-start bg-black bg-opacity-50 lg:hidden overflow-hidden pt-2 pr-2"
							@click.self="closeMobilePromo">
							<div ref="mobilePromoContent"
								class="w-[70%] h-[calc(100vh-1.5rem)] rounded-2xl overflow-y-auto custom-scrollbar bg-white">
								<BarServePromotion @close="closeMobilePromo" />
							</div>
						</div>
						<!-- ปุ่มสำหรับหน้าจอเล็ก -->
						<div v-if="!toggleMobilePromo" class="lg:hidden fixed bottom-4 right-2 z-50">
							<button @click="openMobilePromo"
								class="bg-amber-500 hover:bg-amber-400 text-white rounded-full md:px-4 px-3 py-2 text-xs md:text-md shadow-xl">
								โปรโมชั่นที่กำลังใช้งาน
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>



		<!-- Popup แสดงการจ่ายเงิน -->
		<div v-if="showPaymentPopup" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg md:p-6 p-4 max-w-4xl w-full relative mx-6">
				<button @click="closePaymentPopup" class="absolute top-2 right-2 text-gray-500">✕</button>
				<div class="flex flex-col md:justify-between items-center gap-4">
					<div class="w-full md:w-1/2">
						<div class="flex flex-wrap justify-center gap-4">
							<div
								class="w-full max-w-[300px] rounded-lg shadow-md bg-white border  flex flex-col justify-between min-h-[300px]">
								<div
									class="py-3 text-gray-400 rounded-lg text-center font-bold md:text-lg text-sm break-all whitespace-pre-wrap">
									{{ selectedPromotion.namePromotion || 'ชื่อโปรโมชั่น' }}
								</div>

								<div class="px-3 pb-6 pt-4 text-gray-700 flex flex-col flex-1 justify-between">
									<div class=" text-center ">
										<p class="font-bold text-3xl text-gray-900">{{ selectedPromotion.price ||
											'0' }}
										</p>
										<p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
									</div>

									<div class="list-none space-y-1 mt-4">
										<div class="bg-gray-100 p-3 rounded-md ">
											<div v-for="(line, index) in selectedPromotion.detailPromotion.split('\n')"
												:key="index" class="flex items-start ">
												<span class="mr-2 mt-1">✔</span>
												<span class="break-all whitespace-pre-wrap flex-1 md:text-sm text-xs ">
													{{ line }}
												</span>
											</div>
										</div>


										<div class="mt-4 md:text-sm text-xs md:px-6">
											<div class="flex items-start">
												<span class="mr-2 mt-1">📅</span>
												<span>เริ่ม: {{ selectedPromotion.dateStart || '-' }}</span>
											</div>
											<div class="flex items-start">
												<span class="mr-2 mt-1">📅</span>
												<span>สิ้นสุด: {{ selectedPromotion.dateFinish || '-' }}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>


						<!--เเสดงเมื่อหน้าจอน้อยกว่า md-->
						<div class="md:hidden">
							<div
								class="py-3 text-gray-400 rounded-lg text-center font-bold md:text-lg text-sm break-all whitespace-pre-wrap">
								{{ selectedPromotion.namePromotion || 'ชื่อโปรโมชั่น' }}
							</div>

							<div class="px-3 pb-6 pt-4 text-gray-700 flex flex-col flex-1 justify-between">
								<div class=" text-center ">
									<p class="font-bold text-3xl text-gray-900">{{ selectedPromotion.price ||
										'0' }}
									</p>
									<p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
								</div>
							</div>
							<div class="mt-4 md:text-sm text-xs md:px-6">
								<div class="flex items-start">
									<span class="mr-2 mt-1">📅</span>
									<span>เริ่ม: {{ selectedPromotion.dateStart || '-' }}</span>
								</div>
								<div class="flex items-start">
									<span class="mr-2 mt-1">📅</span>
									<span>สิ้นสุด: {{ selectedPromotion.dateFinish || '-' }}</span>
								</div>
							</div>
						</div>
					</div>





					<div class="w-full md:w-1/2">
						<div>
							<p class="text-center md:text-xl text-sm font-bold mb-3">เลือกวิธีการจ่ายเงิน</p>

							<div class="mb-4 flex flex-col md:text-base text-xs">
								<p>โอนผ่าน TrueMoney</p>
								<input type="text" class="w-full border rounded-sm py-1 px-3" />
								<button class="bg-green-600 px-3 mt-3 py-2 md:py-0 rounded-md text-white">ตกลง</button>
							</div>

							<div class="mb-4 flex flex-col text-xs md:text-base">
								<p>โอนผ่านธนาคาร</p>
								<p>ชื่อ:.........</p>
								<p>เลขบัญชีธนาคาร:.........</p>
								<div>
									<p class="bg-white">ยอดชำระ</p>
								</div>
								<button class="bg-green-600 px-3 rounded-md text-white mt-3 py-2 md:py-0 ">ตกลง</button>
							</div>
							<div class="mb-4 flex flex-col">
								<p>เเสกน QR code</p>
								<img />

								<button class="bg-green-600 px-3 rounded-md text-white mt-3 py-2 md:py-0 ">ไปยังหน้า QR
									code</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import Sidebar from '@/components/SidebarExecutive.vue'
import BarServePromotion from '@/views/Partner/Executive/Promotion/BarServePromotion.vue'



const historyList = [
	{
		name: 'Premium',
		start: '2024-06-01',
		end: '2024-12-01',
		price: '200',
		status: 'ใช้งานอยู่',
		reducedPrice: '180',
		detail: 'shuysrtujlkiopoi kguilo oyp809uuuu uuuuuuuuu uuuuuuuuu klgvjkhlkkkkkkk kkkkkkk hdsry hrdty u768 i67i uy56'
	},
	{
		name: 'Premium',
		start: '2024-06-01',
		end: '2024-12-01',
		price: '200',
		status: 'ใช้งานอยู่',
		reducedPrice: '',
		detail: 'shuysrtujlkiopoi'
	},
	{
		name: 'Premium',
		start: '2024-06-01',
		end: '2024-12-01',
		price: '200',
		status: 'หมดเวลาใช้งาน',
		reducedPrice: '',
		detail: 'shtujlkiopoi',
	},
	{
		name: 'Premium',
		start: '2024-06-01',
		end: '2024-12-01',
		price: '200',
		status: 'หมดเวลาใช้งาน',
		reducedPrice: '150',
	},
	{
		name: 'Premium',
		start: '2024-06-01',
		end: '2024-12-01',
		price: '200',
		status: 'ใช้งานอยู่',
		reducedPrice: ''
	},
	{
		name: 'Premium',
		start: '2024-06-01',
		end: '2024-12-01',
		price: '200',
		status: 'ใช้งานอยู่',
		reducedPrice: '50'
	},
	{
		name: 'Premium',
		start: '2024-06-01',
		end: '2024-12-01',
		price: '200',
		status: 'ใช้งานอยู่',
		reducedPrice: ''
	},

]

const itemsPerPage = 5
const currentPage = ref(1)
const historyContainer = ref(null)
const showReceiptModal = ref(false)
const selectedReceipt = ref(null)

// คำนวณข้อมูลที่แสดงในหน้าปัจจุบัน
const paginatedHistory = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage
	const end = start + itemsPerPage
	return historyList.slice(start, end)
})

// คำนวณจำนวนหน้าทั้งหมด
const totalPages = computed(() => {
	return Math.ceil(historyList.length / itemsPerPage)
})

// Pagination functions
function nextPage() {
	if (currentPage.value < totalPages.value) {
		currentPage.value++
		// เลื่อนมาที่ส่วน "บริการที่กำลังใช้งาน"
		const serviceSection = document.querySelector('.bg-stone-50')
		if (serviceSection) {
			serviceSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}
}

function prevPage() {
	if (currentPage.value > 1) {
		currentPage.value--
		// เลื่อนมาที่ส่วน "บริการที่กำลังใช้งาน"
		const serviceSection = document.querySelector('.bg-stone-50')
		if (serviceSection) {
			serviceSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}
}

const displayPrice = computed(() => {
	return (promotion) => {
		if (promotion.reducedPrice) {
			return {
				originalPrice: promotion.price || '0',
				reducedPrice: promotion.reducedPrice,
				hasDiscount: true
			}
		} else {
			return {
				originalPrice: promotion.price || '0',
				reducedPrice: null,
				hasDiscount: false
			}
		}
	}
})

const openReceiptModal = (item) => {
	selectedReceipt.value = item
	showReceiptModal.value = true
}
const closeReceiptModal = () => {
	showReceiptModal.value = false
	selectedReceipt.value = null
}

// ฟังก์ชันคำนวณส่วนลด (ส่วนน้ำ)
const calcDiscount = (item) => {
	if (!item || !item.reducedPrice) return 0
	// แปลงราคาต้นทางเป็นตัวเลข (ตัด ' บาท' ออกถ้ามี)
	const original = parseFloat((item.price || '0').replace(/[^\d.]/g, ''))
	const reduced = parseFloat(item.reducedPrice)
	return original - reduced
}










const isSidebarCollapsed = ref(false)
const allPromotions = ref([])
const showHistory = ref(false)
const showBuyModal = ref(false)
const selectedPromotion = ref(null)
const toggleMobilePromo = ref(false)
const showPaymentPopup = ref(false)

// Refs สำหรับ GSAP animation
const mobilePromoContainer = ref(null)
const mobilePromoContent = ref(null)

const handleSidebarToggle = (isCollapsed) => {
	isSidebarCollapsed.value = isCollapsed
}

const buyPromotion = (promotion) => {
	selectedPromotion.value = promotion
	showBuyModal.value = true
}

const toggleHistory = () => {
	showHistory.value = !showHistory.value
}

const closeBuyModal = () => {
	showBuyModal.value = false
	selectedPromotion.value = null
}

const activePromotions = computed(() => {
	const today = new Date()
	return allPromotions.value.filter((promo) => {
		const finish = new Date(promo.dateFinish)
		return finish >= today
	})
})

function openPaymentPopup(promotionId) {
	// ดึงข้อมูลจาก activePromotions ที่มีอยู่แล้ว
	const found = activePromotions.value.find(p => p.promotion_id === promotionId)
	if (found) {
		selectedPromotion.value = found
		showPaymentPopup.value = true
	}
}

function closePaymentPopup() {
	showPaymentPopup.value = false
	selectedPromotion.value = {}
}

// GSAP Animation functions
function openMobilePromo() {
	toggleMobilePromo.value = true
	nextTick(() => {
		// เริ่มต้นจากขวา
		gsap.set(mobilePromoContent.value, { x: '100%' })
		gsap.set(mobilePromoContainer.value, { opacity: 0 })

		// Animate เข้ามา
		gsap.to(mobilePromoContainer.value, {
			opacity: 1,
			duration: 0.3,
			ease: 'power2.out'
		})
		gsap.to(mobilePromoContent.value, {
			x: '0%',
			duration: 0.4,
			ease: 'power2.out'
		})
	})
}

function closeMobilePromo() {
	// Animate ออกไป
	gsap.to(mobilePromoContent.value, {
		x: '100%',
		duration: 0.3,
		ease: 'power2.in'
	})
	gsap.to(mobilePromoContainer.value, {
		opacity: 0,
		duration: 0.3,
		ease: 'power2.in',
		onComplete: () => {
			toggleMobilePromo.value = false
		}
	})
}

// ควบคุม scroll ของ body เมื่อ popup แสดง
watch(toggleMobilePromo, (newValue) => {
	if (newValue) {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = 'auto'
	}
})

onMounted(() => {
	const saved = localStorage.getItem('adminPromotions')
	if (saved) {
		try {
			allPromotions.value = JSON.parse(saved)
		} catch (e) {
			console.error('ไม่สามารถอ่าน promotion จาก localStorage ได้:', e)
		}
	}
})
</script>

<style scoped>
.custom-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: #d1d5db #f3f4f6;
}

.custom-scrollbar::-webkit-scrollbar {
	width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: #f3f4f6;
	border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #d1d5db;
	border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #9ca3af;
}
</style>
