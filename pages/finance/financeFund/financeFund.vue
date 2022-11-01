<template>
	<view>
		<view class="content">
			<NormalCard :cardList="cardList.slice(3)" />
		</view>
	</view>
</template>

<script>
	import NormalCard from '@/components/normalCardInfo/normalCard/normalCard.vue'
	import {
		eventBus
	} from '@/common/utils/utils.js'

	export default {
		components: {

			NormalCard
		},
		data() {
			return {

				cardList: []
			}
		},
		mounted() {
			this.getFundInfo();
			eventBus.$on('reachBottomFinanceFund', (size) => {
				this.getFundInfo(size);
			})
		},
		destroyed() {
			eventBus.$off('reachBottomFinanceFund')
		},
		methods: {
			async getFundInfo(size = 0) {
				const res = await this.$API.financeApi.getFundInfo(size);
				const data = JSON.parse(res.slice(res.indexOf('(') + 1, res.lastIndexOf(')')));
				this.cardList = [...this.cardList, ...data.BD2C1904wangning]

			}

		}
	}
</script>

<style>

</style>
