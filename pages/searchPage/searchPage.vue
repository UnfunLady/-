<template>
	<view>
		<view class="topContent">
			<view class="inputContent">
				<u--input prefixIcon="search" fontSize="28rpx" prefixIconStyle="font-size:20px;margin-left:15rpx"
					:clearable="true" color="#939495" shape="circle" :placeholder="keyWord.length>0?keyWord:'请输入感兴趣的内容'"
					border="none" v-model="searchKeyWord" @input="inputKeyWord" @click="showMask"></u--input>
			</view>
			<view class="cancelText">
				<u--text size="28" text="取消" @click="cancelSearch"></u--text>
			</view>
		</view>
		<view class="searchMask" v-if="searchKeyWord.length>0&&showMaskBoolean">
			<view class="searchItem" v-for="(keyText,index) in keyWordTextList" :key='index'>
				<view class="icon">
					<u-icon name="search" size="40"></u-icon>
				</view>
				<view class="text">
					<text ref="searchTextWord" v-html="keyText.suggestion"
						@click="goToSearchResultBySearch(index)"></text>
				</view>
			</view>

		</view>
		<view class="historySearch">
			<view class="topInfo">
				<view class="title">
					<h5>搜索历史</h5>
				</view>
				<view class="deleteHistory">
					<u-icon name="trash" color="#838383" size="34"></u-icon>
				</view>
			</view>
			<view class="mainView">
				<view class="history">
					<view class="text">
						<u--text :lines="1" text="55发射梦天实验舱发射梦天实验舱发射梦天实验舱发射" align="center" size="24"></u--text>
					</view>
				</view>
				<view class="history">
					<view class="text">
						<u--text :lines="1" text="梦天实验舱发射梦天实验舱发射梦天实验舱发射梦天实验舱发射" align="center" size="24"></u--text>
					</view>
				</view>
				<view class="history">
					<view class="text">
						<u--text :lines="1" text="333梦天实验舱发射梦天实验舱发射梦天实验舱发射梦天实验舱发射" align="center" size="24"></u--text>
					</view>
				</view>
				<view class="history">
					<view class="text">
						<u--text :lines="1" text="123舱发射梦天实验舱发射" align="center" size="24"></u--text>
					</view>
				</view>
			</view>
		</view>
		<u-divider text="分割线" lineColor="#ececec" :dot="true"></u-divider>
		<view class="hotSearchRank">
			<view class="topInfo">
				<view class="hotTitle">
					<text>热搜榜</text>

				</view>
				<span class="explain"> 每30分钟更新一次</span>
			</view>
			<view class="hotKeyWord">
				<view class="iconOrNum" v-for="(hot,index) in hotKeyList" :key="index">
					<view class="oneRank">
						<view class="leftSquare"
							:class="index===0?'oneText':(index===1?'twoText':(index===2?'threeText':null))">
							{{index+1}}
						</view>
						<view class="rightText" @click="goToSearchResult(hot.searchWord)">
							<u--text :lines="1" :text="hot.hotWord" size="26"></u--text>
						</view>
						<view class="tag " v-if="hot.tag!==''"
							:class="hot.tag==='Boil'?'tag_boil':(hot.tag==='New'?'tag_new':(hot.tag==='Hot'?'tag_hot':null))">
							{{hot.tag==='Boil'?'沸':(hot.tag==='New'?'新':(hot.tag==='Hot'?'热':null))}}
						</view>
						<view class="explain">
							{{hot.exp}}热度
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {

		data() {
			return {
				keyWord: '',
				searchKeyWord: '',
				hotKeyList: [],
				keyWordTextList: [],
				showMaskBoolean: false
			}
		},
		onLoad(e) {
			if (e.keyword) {
				this.keyWord = e.keyword;
			}
		},
		mounted() {
			this.getSearchHotKeys()
		},
		methods: {
			async getSearchHotKeys() {
				const res = await this.$API.searchApi.getHotKeys();
				this.hotKeyList = res.data.hotWordList;

			},
			// 点击热搜榜
			goToSearchResult(searchWord) {
				console.log(searchWord);
			},
			// 点击搜查的关键字
			goToSearchResultBySearch(index) {
				// 获取refs对应的关键字跳转
				console.log(this.$refs.searchTextWord[index].$el.innerText);
			},
			// 是否显示遮挡的搜索
			showMask() {
				if (this.searchKeyWord.length > 0) {
					this.showMaskBoolean = true;
				} else {
					this.showMaskBoolean = false;
				}
			},
			// 获取输入的关键字相关
			inputKeyWord: _.throttle(async function() {
				if (this.searchKeyWord.length > 0) {
					this.showMask();
					const res = await this.$API.searchApi.keyWordSearch(this.searchKeyWord)
					this.keyWordTextList = res.data.text;

				}
			}, 600),
			// 点击取消
			cancelSearch() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	em {
		color: red;
		font-style: normal;
	}

	.topContent {

		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;

		.inputContent {
			flex: 1;
			margin: 20rpx 30rpx 20rpx 30rpx;
			background-color: #f5f7f9;
			border-radius: 30rpx;
			display: flex;
			height: 60rpx;
		}

		.cancelText {
			width: 80rpx;
		}
	}

	.searchMask {
		background-color: white;
		bottom: 0;
		left: 0;
		right: 0;
		top: 80rpx;
		position: absolute;
		z-index: 9999;

		.searchItem {
			display: flex;
			margin: 30rpx 30rpx 25rpx 50rpx;
			align-items: center;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #f7f7f7;

			.icon {
				margin: 0 20rpx 0 0;
			}

			.text {
				font-size: 28rpx;

				em {
					color: #d9133e !important;
					font-style: normal;
				}
			}
		}
	}

	.historySearch {
		display: flex;
		margin: 25rpx;
		flex-direction: column;

		.topInfo {
			display: flex;
			width: 100%;
			justify-content: space-between;

			.title {
				color: #939495;
			}
		}

		.mainView {
			width: 100%;
			overflow: hidden;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.history {
				border-radius: 32rpx;
				min-height: 60rpx;
				margin: 25rpx 0 0 25rpx;
				background-color: #f5f7f9;

				width: 33.33% !important;
				line-height: 60rpx;

				.text {
					max-width: 600rpx;
					padding: 0 20rpx 0 30rpx;
				}
			}
		}

	}

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

				.tag_Boil {

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
