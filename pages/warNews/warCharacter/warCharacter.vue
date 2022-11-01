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
			this.getCharInfo();
			eventBus.$on('reachBottomWarChar', (size) => {
				this.getCharInfo(size);
			})
		},
		destroyed() {
			eventBus.$off('reachBottomWarChar')
		},
		methods: {
			async getCharInfo(size = 0) {
				const res = await this.$API.warApi.getCharInfo(size);
				const data = JSON.parse(res.slice(res.indexOf('(') + 1, res.lastIndexOf(')')));
				this.cardList = [...this.cardList, ...data.DE0CE1U2wangning]
				this.swiperList = this.cardList.slice(0, 3);
			}

		}
	}
</script>

<style>

</style>
