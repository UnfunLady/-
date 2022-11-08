<template>
	<view class="content">
		<HotRankCard :cardList="cardList" />
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
				cardList: []
			};
		},
		mounted() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$API.hotRank.getHotNews();
				this.cardList = res.data.items;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 5rpx 15rpx 20rpx 15rpx;
		background-color: #eff1f4;
	}
</style>
