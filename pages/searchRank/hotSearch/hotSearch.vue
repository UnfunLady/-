<template>
	<view>
		<view class="hotSearchRank">
		
			<view class="hotKeyWord">
				<view class="iconOrNum" v-for="(hot,index) in hotKeyList" :key="index">
					<view class="oneRank">
						<view class="leftSquare"
							:class="index===0?'oneText':(index===1?'twoText':(index===2?'threeText':null))">
							{{index+1}}
						</view>
						<view class="rightText">
							<u--text :lines="1" :text="hot.hotWord" size="26"></u--text>
						</view>
						<view class="tag " v-if="hot.tag!==''"
							:class="hot.tag==='Boil'?'tag_boil':(hot.tag==='New'?'tag_new':(hot.tag==='Hot'?'tag_hot':null))">
							{{hot.tag==='Boil'?'沸':(hot.tag==='New'?'新':(hot.tag==='Hot'?'热':null))}}
						</view>
						<view class="explain">
							{{transformNumber(hot.exp)}}热度
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import NTM from '@/common/utils/numbetTomillion.js'
	export default {
		data() {
			return {
				hotKeyList: []
			};
		},
		mounted() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$API.hotRank.getHotSearch()
				this.hotKeyList = res.data.hotRank
			},
			transformNumber(number) {
				return NTM(number)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hotSearchRank {
		width: 100%;
		display: flex;
		padding-bottom: 20rpx;
		flex-direction: column;


		.topInfo {
			display: flex;
			margin: 0 0 0 35rpx;
			align-items: center;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #f7f7f7;

			.hotTitle {
				font-weight: 700;
				background: linear-gradient(to right, #84272d, #d9133e);
				color: transparent;
				background-clip: text;
			}

			.explain {
				font-size: 24rpx;
				margin-left: 30rpx;
				color: #717171;
			}
		}

		.hotKeyWord {
			display: flex;
			flex-direction: column;
			margin: 20rpx 0 15rpx 40rpx;

			.iconOrNum {
				width: 100%;
				padding: 20rpx 0 25rpx 0rpx;
				border-bottom: 1px solid #f5f5f5;

				.oneText {
					color: white;
					background-color: #d4113f !important;
				}

				.twoText {
					color: white;
					background-color: #f56b1b;
				}

				.threeText {
					color: white;
					background-color: #ffaa00;
				}

				.tag_boil {
					background-color: #d4113f !important;
				}

				.tag_new {
					background-color: #f5a623 !important;
				}

				.tag_hot {
					background-color: #fe5d10 !important;
				}

				.oneRank {
					display: flex;
					align-items: center;
					position: relative;

					.leftSquare {
						width: 35rpx;
						height: 35rpx;
						border-radius: 7rpx;
						text-align: center;
						line-height: 35rpx;
						font-size: 24rpx;

					}

					.rightText {
						font-size: 26rpx;
						margin-left: 30rpx;
						min-width: 35%;
						max-width: 65%;
					}

					.tag {
						width: 35rpx;
						height: 35rpx;
						border-radius: 7rpx;
						text-align: center;
						line-height: 35rpx;
						font-size: 26rpx;
						margin-left: 15rpx;
						transform: scale(.9);
						color: white;
					}

					.explain {
						font-size: 24rpx;
						color: #717171;
						flex: 1;
						right: 20rpx;
						position: absolute;
						transform: scale(.8);
					}
				}

			}


		}
	}
</style>
