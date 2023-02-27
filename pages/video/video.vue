<template>
	<view>
		<BackTop :backTop="toTop" :isShowBackTop="isShowBackTop" />
		<scroll-view @refresherrefresh="refresh" refresher-background="#eef1f4" :refresher-triggered="isRefresh"
			refresher-enabled="true" :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+clientHeight+'px;'"
			scroll-y="true" @scrolltolower="reachBottom">
			<VideoCard :videoList="videoList" />
			<view style="padding: 20rpx;">
				<BottomInfo :isLoading="isLoading" />
			</view>
		</scroll-view>

		<u-toast ref="uToast"></u-toast>

	</view>
</template>

<script>
	import BottomInfo from "../../components/bottomIcon/bottomIcon.vue"
	import VideoCard from '../../components/videoCard/videoCard.vue'
	import BackTop from '@/components/backTop/backTop.vue'
	export default {
		components: {
			VideoCard,
			BottomInfo,
			BackTop
		},
		data() {
			return {
				videoList: [],
				isLoading: false,
				clientHeight: 0,
				scrollTop: 0,
				isShowBackTop: false,
				isRefresh: false,
				refreshCount: 0
			}
		},

		mounted() {
			this.getPageHeight()
			// this.getVideoInfo()

		},
		onReady() {

		},
		methods: {
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {

						// rpx转px
						// 获取可视区高度
						// 减去导航栏的高度  通过upx2px转换
						this.clientHeight = res.windowHeight - uni.upx2px(20);
						this.getVideoFirstInfo()

					},
					fail: (err) => {
						console.log(err);
					}
				})
			},

			async getVideoFirstInfo() {
				const res = await this.$API.videoApi.getVideosInfo()
				if (res && res.视频) {
					this.videoList = res.视频
					this.$refs.uToast.show({
						type: 'success',
						icon: "success",
						title: '获取成功',
						message: this.videoList[0].prompt ? this.videoList[0].prompt : "为您获取最新视频",
					})
					this.isRefresh = false;
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						title: '获取视频失败',
						message: "获取视频失败",
					})
					this.isRefresh = false;
				}
			},
			async getVideoMoreInfo() {
				this.refreshCount++;
				if (this.refreshCount % 2 !== 0) {
					const res = await this.$API.videoApi.getVideosInfo()
					this.isLoading = true;
					if (res && res.视频) {
						const newVideosList = res.视频;
						this.videoList = this.videoList.concat(newVideosList);
						console.log(this.videoList);
						this.isLoading = false;
					} else {
						this.$refs.uToast.show({
							type: 'error',
							icon: false,
							title: '获取视频失败',
							message: "获取视频失败",
						})
						this.isLoading = false;
					}
				} else {
					this.isLoading = true;
					const res = await this.$API.videoApi.getOldVideosInfo()
					if (res) {
						const data = JSON.parse(res.slice(res.indexOf('(') + 1, res.lastIndexOf(')')));
						if (data.Video_Recom && data.Video_Recom.length > 0) {
							this.videoList = this.videoList.concat(data.Video_Recom);
							console.log(this.videoList);
							this.isLoading = false;
						} else {
							this.$refs.uToast.show({
								type: 'success',
								icon: false,
								title: '获取成功',
								message: "获取视频失败",
							})
							this.isLoading = false;
						}
					}
				}

			},
			reachBottom() {
				this.getVideoMoreInfo()
			},
			scroll(e) {
				this.scrollTop = e.detail.scrollTop
				if (this.scrollTop > 1200) {
					this.isShowBackTop = true;
				} else {
					this.isShowBackTop = false;
				}
			},
			toTop() {
				this.scrollTop = 0;
				this.isShowBackTop = false;
			},
			async getNewVideosInfo() {
				this.isRefresh = true;
				const res = await this.$API.videoApi.getOldVideosInfo()
				if (res) {
					const data = JSON.parse(res.slice(res.indexOf('(') + 1, res.lastIndexOf(')')));
					if (data.Video_Recom && data.Video_Recom.length > 0) {
						this.videoList = data.Video_Recom;
						console.log(data.Video_Recom);
						console.log(this.videoList);
						this.$refs.uToast.show({
							type: 'success',
							icon: "success",
							title: '获取成功',
							message: "为您获取最新视频",
						})
						this.isRefresh = false;
					} else {
						this.$refs.uToast.show({
							type: 'error',
							title: '获取失败',
							message: "获取视频失败",
						})
						this.isLoading = false;
					}
				}
			},
			refresh() {
				this.isRefresh = true;
				// this.getPageHeight()
				this.getNewVideosInfo()
			}
		}
	}
</script>

<style>

</style>
