<template>
	<div id="shopcar-successmodal">
		<div class="flex flex-x-center">
			<div>
				<div class="sutips flex flex-y-center">
					<img src="../../../static/img/icon_gou.png" />
					<span>商品已添加成功！</span>
				</div>
				<p class="carsl">当前购物车共{{shippingcarCount}}件商品</p>
				<div class="flex flex-x-center">
					<shop-btn text="查看购物车" bgcolor="#FF541F" color="#fff" border="1px #FF541F" @click.native="toShoppingCar" />
					<shop-btn text="继续购物" @click.native="closeSuccessModal" />
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import btn from '../components/shopbtn.vue'
	import { mapGetters } from 'vuex'
	export default {
		name: 'shopcar-sumodal',
		computed: mapGetters({
			shippingcarCount: 'shippingcarCount'
		}),
		components: {

			[btn.name]: btn,

		},
		props: {

		},
		data() {
			return {}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			/**
			 * 购物车
			 */
			toShoppingCar() {
				this.$emit('toShoppingCar');
			},
			/**
			 * 关闭继续购物
			 */
			closeSuccessModal() {
				this.$emit('closeSuccessModal');
			}
		}
	}
</script>
<style lang="scss">
	#shopcar-successmodal {
		.sutips {
			img {
				margin-right: 19px;
			}
		}
		.carsl {
			padding-left: 59px;
			margin-bottom: 30px;
		}
	}
</style>