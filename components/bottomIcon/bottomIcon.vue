<template>
	<view>
		<view class="bottomInfo">
			<u-loading-icon v-if="isLoading" mode="semicircle"></u-loading-icon>
			<u-icon v-else name="hourglass-half-fill" size="40"></u-icon>
			<text style="margin-left: 20rpx;">{{isLoading?"正在加载中":"滑动加载更多"}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['isLoading'],
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.bottomInfo {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #acacac;
		font-size: 26rpx;
	}
</style>
