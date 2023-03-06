<template>
	<view class="actionCard">
		<view class="cardContent">
			<view class="cardItem" v-for="item in list" :key="item.id">
				<view class="cardIcon">
					<u-icon :name="item.iconPath" size="60"></u-icon>
				</view>
				<view class="cardText">
					{{item.detailText}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
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

<style scoped lang="scss">
	.actionCard {
		padding: 0rpx 0 40rpx 0;
		
		.cardContent {

			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.cardItem {
				width: 20%;
				display: flex;
				flex-direction: column;
				align-items: center;

				margin-top: 18rpx;

				.cardText {
					margin-top: 15rpx;
					font-size: 28rpx;
					color: #717173;
				}
			}
		}

	}
</style>
