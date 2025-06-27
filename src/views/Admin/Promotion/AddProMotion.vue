<template>
	<div class="w-full min-h-screen bg-gray-100">
		<SidebarAdmin @toggle-sidebar="handleSidebarToggle" />

		<div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-16 md:mt-0 transition-all duration-300"
			style="top: 1rem; bottom: 1rem; height: auto;" :class="{
				'md:ml-[232px]': !isSidebarCollapsed,
				'md:ml-[72px]': isSidebarCollapsed
			}">

			<div class="bg-white rounded-lg pb-10 min-h-screen">
				<div class="w-full">
					<div class="py-2 bg-emerald-800 rounded-t-lg">
						<p class="text-center md:text-left text-xl text-white px-2">เพิ่มโปรโมชั่น</p>
					</div>

					<div class="md:rounded-b-lg px-4 pt-4 max-w-5xl mx-auto">
						<div class="flex flex-col lg:flex-row justify-between space-x-5 item-center">

							<div class="w-full lg:w-4/6">
								<p class="text-2xl font-bold text-center py-4">
									เพิ่มโปรโมชั่น
								</p>

								<div>
									<p class="mb-2">ชื่อโปรโมชั่น</p>
									<input class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4"
										v-model="promotion.name" />
								</div>
								<div>
									<p class="mb-2">รายละเอียด</p>
									<textarea rows="5" v-model="promotion.detail"
										class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
										placeholder="พิมพ์ทีละบรรทัด เช่น&#10;พื้นที่อีเมล 50GB&#10;พื้นที่ Cloud 1TB..."></textarea>
								</div>
								<div class="mb-4">
									<p class="mb-2">เลือกโทนสี</p>
									<select v-model="promotion.color" class="border border-gray-300 px-3 py-2 rounded w-full">
										<option value="yellow">เหลือง</option>
										<option value="blue">น้ำเงิน</option>
										<option value="green">เขียว</option>
										<option value="red">แดง</option>
										<option value="purple">ม่วง</option>
										<option value="gray">เทา</option>
									</select>
								</div>
								<div>
									<p class="mb-2">วันเริ่มโปรโมชั่น</p>
									<input type="date" v-model="promotion.dateStart"
										class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
								</div>
								<div>
									<p class="mb-2">วันสิ้นสุดโปรโมชั่น</p>
									<input type="date" v-model="promotion.dateFinish"
										class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
								</div>
								<div>
									<p class="mb-2">ราคาเต็ม</p>
									<input v-model="promotion.price"
										class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
								</div>

								<div>
									<p>ต้องการลดราคาหรือไม่</p>
									<div class="flex items-center gap-4 mb-4">
										<label class="flex items-center">
											<input type="radio" value="yesReduced" v-model="promotion.wantToReduce" class="mr-2" />
											ใช่
										</label>
										<label class="flex items-center">
											<input type="radio" value="noReduced" v-model="promotion.wantToReduce" class="mr-2" />
											ไม่
										</label>
									</div>
								</div>

								<div v-if="promotion.wantToReduce === 'yesReduced'">
									<div>
										<p>การลดราคา</p>
										<div class="flex items-center gap-4 mb-4">
											<label class="flex items-center">
												<input type="radio" value="reduced" v-model="promotion.discountType" class="mr-2" />
												ลดราคาบาท
											</label>
											<label class="flex items-center">
												<input type="radio" value="percent" v-model="promotion.discountType" class="mr-2" />
												ลดราคาคิดเป็น %
											</label>
										</div>

										<div v-if="promotion.discountType === 'reduced'">
											<p class="mb-2">ราคาที่ลดแล้ว</p>
											<input v-model="promotion.reducedPrice"
												class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
											<p>วันที่เริ่มลดราคา</p>
											<input type="date" v-model="promotion.datereducedPriceStart"
												class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
											<p>วันสุดท้ายที่ลดราคา</p>
											<input type="date" v-model="promotion.datereducedPriceFinish"
												class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
										</div>

										<div v-if="promotion.discountType === 'percent'">
											<p class="mb-2">คิดเป็น %</p>
											<input v-model="promotion.percentPrice"
												class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
											<p>วันที่เริ่มลดราคา</p>
											<input type="date" v-model="promotion.datereducedPriceStart"
												class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
											<p>วันสุดท้ายที่ลดราคา</p>
											<input type="date" v-model="promotion.datereducedPriceFinish"
												class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
										</div>
									</div>
								</div>

								<div v-if="promotion.wantToReduce === 'noReduced'">
								</div>
							</div>


							<div class="lg:w-3/6 mt-7">
								<div class="w-full md:max-w-xs xl:max-w-md  mx-auto mt-6 rounded-lg shadow-lg border-4">

									<!-- หัวโปรโมชั่น -->
									<div class="py-4 rounded-t-md text-white text-center font-bold text-lg break-all whitespace-pre-wrap">
										{{ promotion.namePromotion || 'ชื่อโปรโมชั่น' }}
									</div>



									<!-- เนื้อหาข้างใน -->
									<div>
										<div class="bg-white px-6 py-6 space-y-2 text-gray-700">
											<div class="text-6xl font-bold text-center text-gray-900">
												{{ promotion.price || '0' }} <br><span class="text-sm">บาท / คน /
													บัญชี</span>
											</div>
											<ul class="list-none space-y-1 mt-4">
												<li v-for="(line, index) in promotion.detailPromotion.split('\n')" :key="index"
													class="flex items-start">
													<span class="mr-2 mt-1">✔</span>
													<span class="break-all whitespace-pre-wrap w-0 flex-1 text-gray-700">{{
														line
													}}</span>
												</li>
												<li class="flex items-start">
													<span class="mr-2 mt-1">📅</span>
													<span class="text-sm">เริ่ม: {{ promotion.dateStart || '-' }}</span>
												</li>
												<li class="flex items-start">
													<span class="mr-2 mt-1">📅</span>
													<span class="text-sm">สิ้นสุด: {{ promotion.dateFinish || '-'
													}}</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="my-6 flex justify-center space-x-3">
							<button @click="navigateBackToMainPromotion"
								class="bg-red-500 py-2 px-3 text-white rounded-lg hover:bg-red-600">ย้อนกลับ</button>
							<button class="bg-gray-400 py-2 px-3 text-white rounded-lg hover:bg-gray-600">รีเซ็ท</button>
							<button class="bg-green-500 py-2 px-3 text-white rounded-lg hover:bg-green-600">บันทึก</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


</template>
<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue'

export default {
	name: "AddProMotion",
	components: {
		SidebarAdmin
	},
	data() {
		return {
			isSidebarCollapsed: false,
			promotion: {
				namePromotion: '',
				detailPromotion: '',
				dateStart: '',
				dateFinish: '',
				price: '',
				tonecolor: '',
				discountType: '',
				PeducedPrice: '',
				PeducedPercent: '',
				wantToReduce: '',
			}
		};
	},
	methods: {
		handleSidebarToggle(isCollapsed) {
			this.isSidebarCollapsed = isCollapsed;
		},
		navigateBackToMainPromotion() {
			this.$router.push("/mainpromotion");
		}
	},
	mounted() {
		const savedState = localStorage.getItem('sidebarCollapsed');
		if (savedState !== null) {
			this.isSidebarCollapsed = JSON.parse(savedState);
		}
	}
}
</script>
