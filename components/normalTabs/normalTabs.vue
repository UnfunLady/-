<template>
	<view class="content">
		<u-sticky>
			<u-tabs keyName="name" :activeStyle="{
            color: '#303133',
            
            transform: 'scale(1.1)'
        }" :inactiveStyle="{
            color: '#606266',
            transform: 'scale(1)'
        }" :current="current" @change="change" :scrollable="true" lineWidth="20" :list="list">
			</u-tabs>
		</u-sticky>
	</view>
</template>

<script>
	import {
		eventBus
	} from '../../common/utils/utils.js'
	export default {
		props: {
			list: {
				type: Array,
			},
			change: {
				type: Function
			},
		},
		mounted() {
			eventBus.$on('swiperChange', (current) => {
				this.current = current;
			})
		},
		destroyed() {
			eventBus.$off('swiperChange')
		},
		data() {
			return {
				current: 0
			}
		},
		methods: {


		}
	}
</script>

<style scoped lang="scss">
	.content {
		max-width: 400rpx;


	}
</style>
