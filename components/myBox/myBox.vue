<template>
	<view class="myBox">
		<view class="actionTitle" v-if="title!=''?true:false">
			{{title}}
		</view>
		<view class="actions" v-if="actionsList.length>0">
			<view class="detail" v-for="item in actionsList" :key="item.id">
				<view class="detailIcon">
					<u-icon :name="item.iconPath" :size="size"></u-icon>
				</view>
				<view class="detailText">
					{{item.detailText}}
				</view>
			</view>
		</view>
		<slot name="clock">
		</slot>
		<slot name="userDetail"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			actionsList: {
				type: Array,
				required: false
			},
			title: String,
			size: {
				type: String | Number,

				default: 88,
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped lang="scss">
	.myBox {
		display: flex;
		margin: 40rpx 20rpx 20rpx;
		border-radius: 8rpx;
		background-color: #fff;
		flex-direction: column;

		.actionTitle {
			margin: 20rpx 0 0 30rpx;
			font-size: 30rpx;


		}

		.actions {
			display: flex;
			justify-content: space-around;

			.detail {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 20rpx;

				.detailText {
					margin-top: 10rpx;
					font-size: 24rpx;

				}
			}
		}



	}
</style>
