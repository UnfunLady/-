<template>
	<view>
		<view class="content">
			<scroll-view class="scroll-view_H" scroll-y="true" @scrolltolower="reachBottom"
				:style="'height:'+clientHeight+'px;'" v-if="searchResultList.length>0">
				<view>
					<SearchResultCard :searchResultList="searchResultList" />
				</view>
				<view v-if="searchResultList.length>0&&hasMore">
					<BottomIcon :isLoading="isLoading" />
				</view>
				<view class="bottomContent" v-if="searchResultList.length>0&&!hasMore">
					<span>已无更多数据...</span>
				</view>
			</scroll-view>

			<view class="empty" v-else>
				<u-empty mode="list" icon="../../static/images/empty.svg" width="400" height="400" text="暂无搜索结果">
				</u-empty>
			</view>


		</view>
	</view>
</template>

<script>
	import SearchResultCard from '@/components/searchResultCard/searchResultCard.vue'
	import BottomIcon from '@/components/bottomIcon/bottomIcon'
	export default {
		components: {
			SearchResultCard,
			BottomIcon
		},

		data() {
			return {
				keyWord: '',
				searchResultList: [],
				hasMore: false,
				clientHeight: 0,
				isLoading: false,
				page: 0,
				queryId: 0,
				nowPage: 0

			};
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					// rpx转px
					// 获取可视区高度
					// 减去导航栏的高度  通过upx2px转换
					this.clientHeight = res.windowHeight - uni.upx2px(20);
				}
			})
		},
		mounted() {
			this.getCardInfoByKeyWord();
		},
		methods: {
			async getCardInfoByKeyWord(size = 20) {
				const res = await this.$API.searchApi.searchResult(this.keyWord, size)
				this.searchResultList = res.data.result;
				this.hasMore = res.data.has_more;
				this.queryId = res.data.query_id
			},
			async reachBottom() {
				if (this.hasMore) {
					this.isLoading = true;
					this.page = this.nowPage + 1;
					const res = await this.$API.searchApi.searchResultHasMore(this.keyWord, this.page, this.queryId,
						20)
					if (res.data.total > 0) {
						this.nowPage += 1;
						this.queryId = res.data.query_id;
						this.hasMore = res.data.has_more;
						this.searchResultList = [...this.searchResultList, ...res.data.result]
						setTimeout(() => {
							this.isLoading = false;
						}, 2000)
					} else {
						setTimeout(() => {
							this.reachBottom()
						}, 1000)

					}
				}
			}
		},
		onLoad(e) {
			this.keyWord = e.keyWord;
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #eef1f4;
		min-height: calc(100vh - (105rpx));
		padding-top: 30rpx;
	}

	.empty {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.bottomContent {
		padding: 40rpx;
		text-align: center;
		color: #96989a;
		font-size: 28rpx;
	}
</style>
