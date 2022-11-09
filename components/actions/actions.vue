<template>
	<view>
		<view class="topActions">
			<view class="action" v-for="item in actionsList" :key="item.id">
				<view class="icon">
					<u-icon :showLoading="true" size="70" :name="item.imgsrc">
					</u-icon>
				</view>
				<view class="explain" @click="toActionPage(item)">
					{{item.title}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: ['actionsList'],
		data() {
			return {

			}
		},
		methods: {
			toActionPage(item) {

				uni.navigateTo({
					url: item.url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.topActions {
		width: 90vw;
		margin-top: 20rpx;
		min-height: 100rpx;
		border: 1px solid #eeeeee;
		background-color: #fdfdfd;
		border-radius: 8rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.action {

			margin: 10rpx;
			display: flex;

			align-items: center;
			color: #1f4163;

			.icon {
				padding-right: 8rpx;
			}

			.explain {
				font-size: 24rpx;
			}
		}

	}
</style>
