<template>
	<view>
		<view class="content">
			<BackTop :isShowBackTop="backTop" :backTop="toTop" />
			<view class="tabs">
				<NormalTabs :list="list1" :change="changeTab" />
			</view>
			<view class="mainContent">
				<swiper :style="'height:'+clientHeight+'px;'" :current="activeIndex" @change="swiperChange"
					:interval="3000" :duration="1000">
					<swiper-item v-for="item in list1" :key="item.id">
						<scroll-view @scroll="scroll" :scroll-top="scrollTop" @scrolltolower="reachBottom(item)"
							:style="'height:'+clientHeight+'px;'" :scroll-y="true">
							<view class="mainView">
								<view v-if="item.id===0&&activeIndex===0">
									<FinanceIndex />
								</view>
								<view v-if="item.id===1&&activeIndex===1">
									<FinanceTicket />
								</view>
								<view v-if="item.id===2&&activeIndex===2">
									<FinanceFund />
								</view>
								<view v-if="item.id===3&&activeIndex===3">
									<FinanceBusiness />
								</view>
							</view>
							<BottomIcon :isLoading="isLoading" />
						</scroll-view>
					</swiper-item>
				</swiper>

			</view>
		</view>

	</view>
</template>
<script>
	import NormalTabs from '@/components/normalTabs/normalTabs.vue'
	import BottomIcon from '@/components/bottomIcon/bottomIcon.vue'
	import FinanceIndex from '@/pages/finance/financeIndex/financeIndex.vue'
	import FinanceTicket from '@/pages/finance/financeTicket/financeTicket.vue'
	import FinanceFund from '@/pages/finance/financeFund/financeFund.vue'
	import FinanceBusiness from '@/pages/finance/financeBusiness/financeBusiness.vue'
	import BackTop from '@/components/backTop/backTop.vue'
	import {
		eventBus
	} from '../../common/utils/utils.js'
	export default {
		components: {
			BackTop,
			NormalTabs,
			FinanceIndex,
			FinanceBusiness,
			FinanceFund,
			FinanceTicket,
			BottomIcon
		},
		data() {
			return {
				list1: [{
					id: 0,
					name: '首页',
				}, {
					id: 1,
					name: '股票',
				}, {
					id: 2,
					name: '基金'
				}, {
					id: 3,
					name: '商业'
				}, ],
				activeIndex: 0,
				clientHeight: 1000,
				ajaxSize: 0,
				isLoading: false,
				backTop: false,
				scrollTop: 0
			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					// rpx转px
					// 获取可视区高度
					// 减去导航栏的高度  通过upx2px转换
					this.clientHeight = res.windowHeight - uni.upx2px(434) + uni.upx2px(50);
				}
			})
		},
		methods: {
			scroll(e) {
				this.scrollTop = e.detail.scrollTop;
				if (this.scrollTop > 1200) {
					this.backTop = true;
				}
			},
			toTop() {
				this.scrollTop = 0
				this.backTop = false;
			},
			changeTab(current) {
				this.activeIndex = current.index;
			},
			swiperChange(current) {
				this.activeIndex = current.detail.current;
				eventBus.$emit('swiperChange', this.activeIndex);

			},
			reachBottom(item) {
				switch (item.id) {
					case 0:
						this.reachFun(20, 'reachBottomFinanceIndex')
						break;
					case 1:
						this.reachFun(20, 'reachBottomFinanceTicket')
					case 2:
						this.reachFun(20, 'reachBottomFinanceFund')
						break;
					case 3:
						this.reachFun(20, 'reachBottomFinanceBusiness')
						break;
				}
			},
			reachFun(size, name) {
				this.ajaxSize += size;
				eventBus.$emit(name, this.ajaxSize)
				this.isLoading = true;
				setTimeout(() => {
					this.isLoading = false;
				}, 2000)
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
	}
</style>
