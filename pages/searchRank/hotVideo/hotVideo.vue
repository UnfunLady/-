<template>
	<view>
		<view class="content">
			<HotRankCard :cardList="videoList" />
		</view>

	</view>
</template>

<script>
	import HotRankCard from '@/components/hotRankCard/hotRankCard.vue'
	export default {
		components: {
			HotRankCard
		},
		mounted() {
			this.getData()
		},
		data() {
			return {
				videoList: []
			};
		},
		methods: {
			async getData() {
				const res = await this.$API.hotRank.getHotVideo()
				this.videoList = res.data.items;
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #eff1f4;
		padding: 4rpx 16rpx 20rpx 16rpx
	}
</style>
