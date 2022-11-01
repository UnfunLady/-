<template>
	<view>
		<view class="content">
			<Swiper :swiperList="swiperList" />
			<u-divider text="分割线" :dot="true"></u-divider>
			<NormalCard :cardList="cardList.slice(3)" />
		</view>
	</view>
</template>

<script>
	import Swiper from '@/components/defaultSwiper/defaultSwiper.vue'
	import NormalCard from '@/components/normalCardInfo/normalCard/normalCard.vue'
	import {
		eventBus
	} from '@/common/utils/utils.js'

	export default {
		components: {
			Swiper,
			NormalCard
		},
		data() {
			return {
				swiperList: [],
				cardList: []
			}
		},
		mounted() {
			this.getBusinessInfo();
			eventBus.$on('reachBottomFinanceBusiness', (size) => {
				this.getBusinessInfo(size);
			})
		},
		destroyed() {
			eventBus.$off('reachBottomFinanceBusiness')
		},
		methods: {
			async getBusinessInfo(size = 0) {
				const res = await this.$API.financeApi.getBusinessInfo(size);
				const data = JSON.parse(res.slice(res.indexOf('(') + 1, res.lastIndexOf(')')));
				this.cardList = [...this.cardList, ...data.BD2C24VCwangning]
				this.swiperList = this.cardList.slice(0, 3);
			}

		}
	}
</script>

<style>

</style>
