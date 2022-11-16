<template>
	<view class="container">
		<view class="content">
			<Swiper :swiperList="swiperList" />
		</view>
		<ActionList :actionsList="actionsList" />
		<view class="" style="width: 100%;">
			<u-divider text="分割线" :dot="true"></u-divider>
		</view>
		<view class="cardInfo">
			<NormalCard :cardList="cardList.slice(5)" />
		</view>
	</view>
</template>

<script>
	import Swiper from '@/components/defaultSwiper/defaultSwiper.vue'
	import NormalCard from '@/components/normalCardInfo/normalCard/normalCard.vue'
	import ActionList from '@/components/actions/actions.vue'
	import {
		eventBus
	} from '../../common/utils/utils.js'

	export default {
		components: {
			Swiper,
			NormalCard,
			ActionList
		},
		mounted() {
			this.getFunNews(0)
			eventBus.$on("reachBottomLocalFun", (num) => {
				this.getFunNews(num);
			})

		},
		destroyed() {
			eventBus.$off('reachBottomLocalFun');
		},
		data() {
			return {
				swiperList: [],
				cardList: [],
				actionsList: [{
						id: 0,
						title: '影视一线',
						imgsrc: '../../static/images/movie.svg',
						url: '/pages/funNews_movieTv/funNews_movieTv'
					},
					{
						id: 1,
						title: '热播剧场',
						imgsrc: '../../static/images/tvshow.svg',
						url: '/pages/funNews_TVshow/funNews_TVshow'
					},
					{
						id: 2,
						title: '音娱天地',
						imgsrc: '../../static/images/music.svg',
						url: '/pages/funNews_Music/funNews_Music'
					},
				]
			}
		},
		methods: {

			async getFunNews(num = 0) {
				const res = await this.$API.funApi.getFunNewsInfo(num);
				this.cardList = [...this.cardList, ...res.T1348648517839];
				this.swiperList = this.cardList.slice(0, 5);
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.content {
			width: 100%;
		}
	}
</style>
