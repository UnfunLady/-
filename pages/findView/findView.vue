<template>
	<view class="container">
		<view class="bigBox">
			<view class="topBox" >
				<view class="searchInput" @click="toSearch">
					<u--input style="background-color: #fff;" fontSize="28rpx" placeholder="发现新事物" suffixIcon="search"
						suffixIconStyle="font-size: 50rpx;color: #909399">
					</u--input>
				</view>
				<view class="swiperContainer">
					<u-swiper height="280" :list="list" radius="10" indicator indicatorMode="line" circular></u-swiper>
				</view>
			</view>
			<FindCard :list="iconList" />
			<LeftRightCard />
			<view class="">
				<u--image radius="10" style="margin-top: 30rpx;" height="180" width="100%"
					src="../../static/images/find_big.png"></u--image>
			</view>
		</view>

	</view>
</template>

<script>
	import LeftRightCard from "@/components/leftRightCard/leftRightCard.vue"
	import FindCard from "@/components/findCard/findCard.vue";
	export default {
		components: {
			FindCard,
			LeftRightCard
		},
		data() {
			return {
				list: ['../../static/images/redian.png',
					'../../static/images/fangyi.png',
					'../../static/images/china.jpg',
				],
				iconList: [{
						id: 1,
						iconPath: "../../static/images/find_2.svg",
						detailText: "历史"
					},
					{
						id: 2,
						iconPath: "../../static/images/find_1.svg",
						detailText: "科技"
					},
					{
						id: 3,
						iconPath: "../../static/images/find_3.svg",
						detailText: "新闻"
					},
					{
						id: 4,
						iconPath: "../../static/images/find_4.svg",
						detailText: "疫情"
					},
					{
						id: 5,
						iconPath: "../../static/images/find_5.svg",
						detailText: "体育"
					},
					{
						id: 6,
						iconPath: "../../static/images/find_6.svg",
						detailText: "游戏"
					},
					{
						id: 7,
						iconPath: "../../static/images/find_7.svg",
						detailText: "音乐"
					},
					{
						id: 8,
						iconPath: "../../static/images/find_8.svg",
						detailText: "汽车"
					},
					{
						id: 9,
						iconPath: "../../static/images/find_9.svg",
						detailText: "教育"
					},
					{
						id: 10,
						iconPath: "../../static/images/find_10.svg",
						detailText: "好物"
					},
				]
			}

		},
		methods: {
			toSearch() {
				console.log(1);
				uni.navigateTo({
					url: "/pages/searchPage/searchPage",
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {

		background: linear-gradient(to bottom, #fbfafc, #fff);

		.bigBox {
			padding: 20rpx;
			background: linear-gradient(to bottom, #efecf7, #fff);

			.topBox {

				padding: 40rpx 0rpx 20rpx;

				.searchInput {}

				.swiperContainer {

					margin-top: 40rpx;

					box-shadow: 0 0 15rpx #c2c2c2;
				}
			}
		}
	}
</style>
