<template>
	<div id="feedback">
		<div class="navbar flex flex-y-center">联系客服</div>
		<div class="main">
			<div class="group">
				<strong>客服邮箱</strong>
				<div class="sinput">
					<p>Email：yuanshenghuii@163.com</p>
				</div>
			</div>
			<div class="group">
				<strong>客服电话</strong>
				<div class="sinput">
					<p>Tel：400-8558-783</p>
					<p>工作时间：工作日9:00-17:30</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ShopTop from '../../components/header.vue'
	import ShopFooter from '../../components/footer.vue'
	import btn from '../../components/shopbtn.vue'
	import {
		Input,
	} from 'element-ui'

	export default {
		components: {
			[ShopTop.name]: ShopTop,
			[ShopFooter.name]: ShopFooter,
			[btn.name]: btn,

			// element component
			[Input.name]: Input,

		},
		data() {
			return {

			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			handleClick(tab, event) {
			}
		}
	}
</script>

<style lang="scss">
	.main {
		.sinput {
			padding-left: 18px;
			p{
				color: #666;
				padding: 5px 0;
			}
		}
		.group {
			strong {
				display: block;
				font-size: 14px;
				margin-bottom: 20px;
				margin-top: 30px;
			}
		}
	}
</style>