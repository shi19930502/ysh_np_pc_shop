<template>
	<div id="checkoutSuccess">
		<shop-header />
		<!--搜索-->
		<section class="shop-search flex flex-y-center">
			<div class="min-width">
				<ul class="flex flex-x-between flex-y-center">
					<li class="logo flex flex-y-end">
						<div class="logoimg" @click="toIndex" v-show="cityName=='ysh'">
							<img src="../../../static/img/img_logo.png" />
						</div>
						<strong>下单成功</strong>
					</li>
					<li>
						<div class="step"></div>
					</li>
				</ul>
			</div>
		</section>
		<div class="min-width">
			<div class="flex-x-center flex" style="border: 1px solid #DFDFDF;">
				<div class="wraper">
					<div class="sutips flex flex-y-center">
						<img src="../../../static/img/icon_gou.png" />
						<span>商品已成功下单！</span>
					</div>
					<!--<p class="carsl">订单编号：454646464646464</p>
					<p class="carsl">订单金额：￥770.00</p>
					<p class="carsl">送货时间：2018-06-18 8:00-9:00</p>-->

					<div class="flex flex-x-center">
						<shop-btn text="查看订单" bgcolor="#FF541F" color="#fff" border="1px #FF541F" @click.native="toUserCenter" />
						<shop-btn text="继续购物" height="36px" @click.native="toProductList" />
					</div>
				</div>
			</div>
			<div class="youcan">
				<p>您现在还可以：</p>
				<ul class="flex">
					<li @click="toUserCenter">查看我的订单</li>
					<li @click="toIndex">前往首页</li>
					<li @click="toShopCar">我的购物车</li>
				</ul>
			</div>
		</div>
		<shop-footer />
	</div>
</template>
<script>
	import ShopTop from '../components/header.vue'
	import ShopFooter from '../components/footer.vue'
	import btn from '../components/shopbtn.vue'
	import mixin from '../../utils/mixin.js'

	export default {
		mixins: [mixin],
		name: 'checkoutSuccess',
		components: {

			[ShopTop.name]: ShopTop,
			[ShopFooter.name]: ShopFooter,
			[btn.name]: btn,

		},
		props: {

		},
		data() {
			return {
				orderId: '',
				orderUmber: ''
			}
		},
		created() {
			this.orderId = this.$route.query
		},
		mounted() {

		},
		methods: {
			/**
			 * 查看订单详情
			 */
			findOrderDetails() {
				this.$router.push({
					name: 'orderDetails',
					query: {
						orderId: this.orderId,
						orderUmber: this.orderUmber
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	#checkoutSuccess {
		.step {
			width: 483px;
			height: 40px;
			background: url(../../../static/img/step.png);
		}
		.wraper {
			padding: 60px 52px;
			.sutips {
				margin-bottom: 30px;
				img {
					margin-right: 19px;
				}
			}
			.carsl {
				padding-left: 59px;
				margin-bottom: 20px;
			}
		}
		.youcan {
			margin-bottom: 70px;
			p {
				padding: 20px 0 10px;
			}
			ul {
				li {
					color: #265C8F;
					font-size: 14px;
					margin-right: 20px;
					cursor: pointer;
				}
				li:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>