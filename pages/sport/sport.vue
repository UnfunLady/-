<template>
	<view>
		<view class="content">
			<view style="width: 100%;">
				<Swiper :swiperList="swiperList" />
			</view>

			<ActionList :actionsList="actionsList" />

			<view style="width: 100%;">
				<u-divider text="分割线" :dot="true"></u-divider>
			</view>
			<view style="width: 100%;">
				<NormalCard :cardList="cardList.slice(3)" />
			</view>
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
			this.getSportNews(0)
			eventBus.$on("reachBottomLocalSport", (num) => {
				this.getSportNews(num);
			})
		},
		destroyed() {
			eventBus.$off('reachBottomLocalSport');
		},
		data() {
			return {
				swiperList: [],
				cardList: [],
				actionsList: [{
						id: 0,
						title: 'NBA',
						imgsrc: '../../static/images/basketball.svg',
						url: '/pages/sport_NBA/sport_NBA'
					},
					{
						id: 1,
						title: '足球',
						imgsrc: '../../static/images/football.svg',
						url: '/pages/sport_FootBall/sport_FootBall'
					},
					{
						id: 2,
						title: '跑步',
						imgsrc: '../../static/images/run.svg',
						url: "/pages/sport_Run/sport_Run"
					},
				]
			}
		},
		methods: {
			async getSportNews(size = 0) {
				const res = await this.$API.sportApi.getSportNews(size);
				this.swiperList = res.T1348649079062.slice(0, 3);
				this.cardList = [...this.cardList, ...res.T1348649079062];
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
