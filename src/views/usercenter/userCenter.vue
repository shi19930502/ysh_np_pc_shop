<template>
	<div id="userCenter">
		<shop-header />
		<!--搜索-->
		<shop-search :showClassify="false" pageName="个人中心" />

		<!--主体-->
		<section class="user-content">
			<div class="min-width flex flex-x-between">
				<div class="user-content-l">
					<ul>
						<li>
							<strong>订单中心</strong>
							<router-link to="/userCenter/orderList">我的订单</router-link>
							<router-link to="/userCenter/orderEvaluate">订单评价</router-link>
							<router-link to="/userCenter/orderPay">订单付款</router-link>
							<router-link to="/userCenter/ofenBuy">我常买的商品</router-link>
						</li>
						<li>
							<strong>收藏中心</strong>
							<router-link to="/userCenter/collectionPro">收藏的商品</router-link>
							<router-link to="/userCenter/collectionStore">收藏的商家</router-link>
							</p>
						</li>
						<li>
							<strong>客户服务</strong>
							<!--<router-link to="/userCenter/feedback">意见反馈</router-link>-->
							<router-link to="/userCenter/contactService">联系客服</router-link>
						</li>
						<li>
							<strong>设置</strong>
							<router-link to="/userCenter/userSetting">个人信息</router-link>
							<router-link to="/userCenter/address">收货地址</router-link>
						</li>
					</ul>
				</div>
				<div class="user-content-r">
					<router-view></router-view>
				</div>
			</div>
		</section>

		<shop-footer />

	</div>
</template>
<script>
	import ShopTop from '../components/header.vue'
	import ShopFooter from '../components/footer.vue'
	import btn from '../components/shopbtn.vue'
	import Search from '../components/search.vue'

	import { Badge, Dialog, Table, TableColumn, InputNumber } from 'element-ui'
	import mixin from '../../utils/mixin.js'
	export default {
		mixins: [mixin],
		components: {
			[ShopTop.name]: ShopTop,
			[ShopFooter.name]: ShopFooter,
			[btn.name]: btn,
			[Search.name]: Search,

			// element component
			[Badge.name]: Badge,
			[Dialog.name]: Dialog,
			[Table.name]: Table,
			[TableColumn.name]: TableColumn,
			[InputNumber.name]: InputNumber,

		},
		data() {
			return {
				navbarText: '我的订单'
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
	@import '../../assets/css/userCenter.scss';
	.router-link-active {
		color: #00C65D !important;
	}
</style>