<template>
	<view>
		<view class="toTop">
			<ToTop />
			<NormalCardInfo />
		</view>
	</view>
</template>

<script>
	import ToTop from '@/components/toTop/toTop.vue'
	import NormalCardInfo from "@/components/normalCardInfo/normalCardInfo.vue"
	export default {
		components: {
			ToTop,
			NormalCardInfo
		},
		data() {
			return {

			}
		},
		methods: {

		},


	}
</script>

<style>

</style>
