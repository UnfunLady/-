<template>
	<view>
		<HotRankCard :cardList="videoList" />
	</view>
</template>

<script>
	import HotRankCard from '@/components/hotRankCard/hotRankCard.vue'
	export default {
		components: {
			HotRankCard
		},
		mounted() {
			this.getData()
		},
		data() {
			return {
				videoList: []
			};
		},
		methods: {
			async getData() {
				const res = await this.$API.hotRank.getHotVideo()
				this.videoList = res.data.items;
			}
		}
	}
</script>

<style lang="scss">

</style>
