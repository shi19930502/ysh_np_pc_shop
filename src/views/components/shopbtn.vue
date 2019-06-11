<template>
	<div id="shop-btn">
		<div :style="style" class="flex flex-x-center flex-y-center shopbtn">
			<span>{{text}}</span>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'shop-btn',
		props: {
			text: {
				default: 'shopbtn'
			},
			width: {
				default: '120px'
			},
			height: {
				default: '36px'
			},
			bgcolor: {
				default: '#F9F9F9'
			},
			border: {
				default: '1px #ddd'
			},
			color: {
				default: '#232321'
			},
			marginR: {
				default: '30px'
			},
			fontsize: {
				default: '16px'
			}
		},
		data() {
			return {
				style: `line-height:2;font-size:${this.fontsize};width:${this.width};height:${this.height};background:${this.bgcolor};border: ${this.border} solid;color:${this.color};cursor: pointer;margin-right:${this.marginR}`
			}
		},
		created() {},
		mounted() {

		},
		methods: {

		}
	}
</script>
<style lang="scss">
	#shop-btn {}
</style>