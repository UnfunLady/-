<template>
	<view>
		<view class="content">
			<view class="topInfo">
				<view class="topImg">
					<u--image :showLoading="true" width="100%" height="125"
						src="../../../static/images/fakeNewSearch.png">
					</u--image>
				</view>
				<view class="searchInput">
					<u-search v-model="keyword" inputAlign="left" placeholder="请输入想要查找的内容" bgColor="#fff"
						:actionStyle="{color:'white',fontSize:'34rpx'}" margin="30rpx" searchIconSize="44"
						@search="searchKeyWord" @custom="searchKeyWord" @change="changeSearchWord" height="70">
					</u-search>
				</view>
			</view>
			<view class="searchRank" v-show="!showResult">
				<view class="topTitle">
					网友热搜榜
				</view>
				<view class="mainRank" v-for="(item,index) in rankList " :key="index">
					<view class="leftBox "
						:class="index===0?'oneText':(index===1?'twoText':(index===2?'threeText':''))">
						{{index+1}}
					</view>
					<view class="title">
						<u--text :lines="1" size="26" :text="item.title"></u--text>
					</view>
				</view>

			</view>
			<view class="searchResult" v-if="showResult">
				<view class="mainRank">
					<view class="topExplain">
						{{searchResult.length>0?`为您找到以下${searchResult.length}条相关消息`:'没有找到相关信息'}}
					</view>
					<u-divider text="分割线" :dot="true"></u-divider>
					<view class="title" v-for="(i,index) in searchResult" :key="index">
						<u--text :lines="1" size="26" :text="i.title"></u--text>
						<view class="type" v-show="i.digest!=null">
							<u-tag :text="i.digest" size="mini" plain :type="i.digest=='谣言'?'error':'warning'"
								:icon="i.digest=='谣言'?'error':'error-circle'">></u-tag>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rankList: [],
				searchResult: [],
				showResult: false,
				keyword: ''
			};
		},
		mounted() {
			this.getSearcRank()
		},
		methods: {
			async getSearcRank() {
				const res = await this.$API.defenseEvilFakeNewsApi.getRankList();
				if (res.data.items) {
					this.rankList = res.data.items
				}
			},
			changeSearchWord(keyword) {
				if (keyword.length === 0) {
					this.showResult = false;
				}
			},
			async searchKeyWord(keyword) {
				if (keyword.trim().length === 0) {
					uni.showToast({
						title: '请输入合法字符!',
						icon: 'none',
						duration: 2000
					})
				} else {
					this.showResult = true;
					const res = await this.$API.defenseEvilFakeNewsApi.searchKeyWordList(keyword);
					this.searchResult = res.data.items;
				}

			}
		}
	}
</script>

<style lang="scss">
	.content {

		.topInfo {
			position: relative;
			width: 100%;

			.searchInput {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				border-radius: 10rpx;
				display: flex;
				width: 100vw;
				align-items: center;


			}
		}

		.searchRank {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.topTitle {
				width: 90%;
				border-bottom: 1px solid #eeeeee;
				padding: 20rpx;
				font-weight: 700;
				background: linear-gradient(to right, #c63d44, #ff8d02);
				color: transparent;
				background-clip: text;
			}

			.mainRank {
				width: 90%;
				padding: 30rpx;
				display: flex;
				border-bottom: 1px solid #eeeeee;

				.leftBox {
					width: 35rpx;
					height: 35rpx;
					text-align: center;
					line-height: 35rpx;
					font-size: 26rpx;


				}

				.oneText {
					color: white;
					background-color: #d9133e;
				}

				.twoText {
					color: white;
					background-color: #e96811;
				}

				.threeText {
					color: white;
					background-color: #ffaa00;
				}

				.title {

					margin-left: 20rpx;


				}
			}


		}

		.searchResult {
			position: absolute;
			top: 125rpx;
			background-color: white;
			width: 100vw;
			bottom: 0;

			display: flex;
			border-bottom: 1px solid #eeeeee;

			.mainRank {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 0 30rpx 30rpx;

				.topExplain {
					text-align: center;
					margin-top: 40rpx;
					font-size: 30rpx;
					color: #767676;
				}

				.title {
					padding: 20rpx 10rpx 30rpx;
					border-bottom: 1px solid #eeeeee;
					width: inherit;
					display: flex;

					.type {

						transform: scale(.8);
					}
				}
			}


		}
	}
</style>
