<template>
	<view>
		<BackTop :backTop="toTop" :isShowBackTop="isShowBackTop" />
		<Swiper :swiperList="swiperList" />
		<u-divider text="分割线" :dot="true"></u-divider>
		<scroll-view :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+clientHeight+'px;'" scroll-y="true"
			@scrolltolower="reachBottom">
			<NormalCard :cardList="dataInfo.slice(1)" />
			<view style="padding: 20rpx;">
				<BottomInfo :isLoading="isLoading" />
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import Swiper from '@/components/defaultSwiper/defaultSwiper.vue'
	import NormalCard from '@/components/normalCardInfo/normalCard/normalCard.vue'
	import BottomInfo from '@/components/bottomIcon/bottomIcon.vue'
	import BackTop from '@/components/backTop/backTop.vue'
	export default {
		components: {
			NormalCard,
			Swiper,
			BottomInfo,
			BackTop
		},
		mounted() {
			this.getData();
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					// rpx转px
					// 获取可视区高度
					// 减去导航栏的高度  通过upx2px转换
					this.clientHeight = res.windowHeight;
				}
			})
		},
		data() {
			return {
				dataInfo: [],
				swiperList: [],
				num: 0,
				isLoading: false,
				clientHeight: 0,
				isShowBackTop: false,
				scrollTop: 0
			};
		},
		methods: {
			reachBottom() {
				this.isLoading = true;
				this.num += 20;
				this.getData(this.num)

			},
			async getData(num = 0) {
				const res = await this.$API.sportApi.getFootBallData(num);
				this.dataInfo = [...this.dataInfo, ...res.T1348649503389];
				this.swiperList = this.dataInfo.slice(0, 1);
				this.isLoading = false;
			},
			scroll(e) {
				this.scrollTop = e.detail.scrollTop
				if (this.scrollTop > 1200) {
					this.isShowBackTop = true;
				} else {
					this.isShowBackTop = false;
				}
			},
			toTop() {
				this.scrollTop = 0;
				this.isShowBackTop = false;
			},
		}
	}
</script>

<style lang="scss">

</style>
