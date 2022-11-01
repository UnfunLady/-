<template>
	<view>
		<view class="backTop" v-show="isShowBackTop" @click="backTop">
			<u-icon name="arrow-up"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isShowBackTop:{
				type: Boolean,
				default: false
			},
			backTop: {
				type: Function
			}
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.backTop {
		width: 80rpx;
		height: 80rpx;
		background-color: #faf9f9;
		position: absolute;
		border-radius: 50%;
		bottom: 20%;
		z-index: 99999;
		right: 5%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
