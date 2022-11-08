<template>
	<view class="content">
		<HotRankCard :cardList="dataList" />
	</view>
</template>

<script>
	import HotRankCard from '@/components/hotRankCard/hotRankCard.vue'
	export default {
		components: {
			HotRankCard
		},
		data() {
			return {
				dataList: []
			};
		},
		mounted() {
			this.getData();
		},
		methods: {
			async getData() {
				const res = await this.$API.hotRank.getHotRepry()
				this.dataList = res.data.cmtDocs
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 5rpx 15rpx 20rpx 15rpx;
		background-color: #eff1f4;
	}
</style>
