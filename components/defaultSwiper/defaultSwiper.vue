<template>
	<view>
		<!-- 	<swiper class="swiper" indicator-active-color="rgba(0, 0, 0, .3)" indicator-color="#fff" circular
			:indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<view class="swiper-item mainView">
					<view class="mask">
					</view>
					<view class="image">
						<u--image :showLoading="true" width="100%" height="300" :src="item.imgsrc">
						</u--image>
					</view>
					<view class="explain">
						<u--text :linex="2" size="32" color="white" :text="item.title"></u--text>
					</view>
				</view>
			</swiper-item>
		</swiper> -->
		<view class="swiperContainer">
			<u-swiper :list="swiperList" width="100%" showTitle height="350" :keyName="'imgsrc'" indicatorMode="line"
				:autoplay="true" circular></u-swiper>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			isImgsrc: {
				type: Boolean,
				default: true
			},
			swiperList: {
				type: Array,
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 4000
			},
			duration: {
				type: Number,
				default: 2000
			},
			indicatorDots: {
				type: Boolean,
				default: true
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
	.swiper {
		width: 100%;
		height: 300rpx;
	}

	.swiper-item {
		width: 100%;
		display: block;
		height: 300rpx;

		position: relative;
		text-align: center;
	}

	.mainView {


		.mask {
			background-color: gray;
			position: absolute;
			width: 100%;
			z-index: 99;
			opacity: .5;
			height: 100%;
		}

		.explain {
			position: absolute;
			bottom: 12%;
			color: white;

			left: 3%;
			z-index: 999;
			text-align: left;
		}
	}
</style>
