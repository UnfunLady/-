<template>
	<view>
		<view class="content">
			<Swiper :swiperList="swiperList" />
		</view>
		<u-divider text="分割线" :dot="true"></u-divider>
		<view class="cardInfo">
			<NormalCard :cardList="cardList.slice(5)" />
		</view>
	</view>
</template>

<script>
	import Swiper from '@/components/defaultSwiper/defaultSwiper.vue'
	import NormalCard from '@/components/normalCardInfo/normalCard/normalCard.vue'
	import {
		eventBus
	} from '../../common/utils/utils.js'

	export default {
		components: {
			Swiper,
			NormalCard
		},
		mounted() {
			this.getWarNews(0)
			eventBus.$on("reachBottomLocalFun", (num) => {
				this.getWarNews(num);
			})
		},
		destroyed() {
			eventBus.$off('reachBottomLocalFun');
		},
		data() {
			return {
				swiperList: [],
				cardList: []
			}
		},
		methods: {
			async getWarNews(num = 0) {
				const res = await this.$API.funApi.getFunNewsInfo(num);
				this.swiperList = res.T1348648517839.slice(0, 5);
				this.cardList = [...this.cardList, ...res.T1348648517839];
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
	
	}
</style>
