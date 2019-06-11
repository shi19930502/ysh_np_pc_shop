<template>
	<div id="ofenBuy">
		<div class="navbar flex flex-y-center">常买商品</div>
		<div class="main">
			<!--商品列表-->
			<ul class="pro-list flex" v-if="productcollection.length>0">
				<li v-for="d in productcollection">
					<div class="item">
						<div class="pro-img">
							<img v-if="d.skuPicUrl" :src="imgURL+d.skuPicUrl" />
							<img v-else  src="../../../../static/img/my_default_img.png"  />
						</div>
						<div class="pro-text">
							<div class="pro-price flex flex-x-between flex-y-center">
								<div class="p1" v-if="d.promotionPrice>0 && d.promotionBasePrice>0">{{'￥'+d.promotionPrice}}</div>
								<div class="p1" v-else>{{d.price==0?'￥时价':d.price}}</div>
								<div class="flex" v-if="d.promotionPrice < d.price">
									<div class="p2">{{d.price==0?'￥时价':d.price}}</div>
									<div class="cuxbg flex flex-y-center flex-x-center">
										<span>促销</span>
									</div>
								</div>
							</div>
							<div class="pro-name" v-if="d.proMeasureName != d.skuMeasureName">{{d.productName+'['+d.skuWeight+d.proMeasureName+'/'+d.skuMeasureName+']'}}</div>
							<div class="pro-name" v-else>{{d.productName+'['+d.proMeasureName+']'}}</div>
							<div class="pro-ms ellipsis">{{d.remark || '暂无描述'}}</div>
							<div class="pro-ms">计量方式：{{d.skuMethodType == 1 ?'计重':'计件'}}</div>
							<!--不限制库存量了-->
							<!--<div class="pro-ms">规格量库存：{{d.stockLimit == '0' ? '充足' : d.canUseQuantity>0 ? d.canUseQuantity/100 : '不足'}}</div>-->
						</div>
						<div class="pro-btns flex flex-y-center flex-x-center" @click="createShippingcarBySku(d)">
							<img src="../../../../static/img/home_icon_shop.png" alt="" />
							<span>加入购物车</span>
						</div>
					</div>
				</li>
			</ul>
			<div v-else class="nodata flex flex-x-center flex-y-center" style="height: 512px;color: #d1d1d1;">
				<div>
					<img src="../../../../static/img/my_default_img.jpg" />
					<p class="tac">暂无订单</p>
				</div>
			</div>
			<div class="flex flex-x-end">
				<el-pagination background layout="total, prev, pager, next, jumper" :total="dataCount" :page-size="pageSize" @current-change="handleCurrentChange" :current-page="currentPage">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import ShopTop from '../../components/header.vue'
	import ShopFooter from '../../components/footer.vue'
	import {
		Pagination,
	} from 'element-ui'

	import mixin from '../../../utils/mixin.js'

	export default {
		mixins: [mixin],
		components: {
			[ShopTop.name]: ShopTop,
			[ShopFooter.name]: ShopFooter,

			// element component
			[Pagination.name]: Pagination,

		},
		data() {
			return {
				productcollection: [],
				dataCount: 0,
				pageNum: 1,
				pageSize: 8,
				currentPage: 1
			}
		},
		created() {
			this.getOfenBuyPro()
		},
		mounted() {

		},
		methods: {
			getOfenBuyPro() {
				this.postRequest('productsku/getSkuByOftenBuy', {
					code: '',
					purchaserId: this.userInfo.typeCode,
					supplierId: this.sellerId,
					keyWord: '',
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(resp => {
					if(resp.data && resp.data.state == 0) {
						this.productcollection = resp.data.aaData
						this.dataCount = resp.data.dataCount
					}
				})
			},
			/**
			 * 分页改变
			 */
			handleCurrentChange(val) {
				this.pageNum = val
				this.getOfenBuyPro()
			}
		}
	}
</script>

<style lang="scss">
	#ofenBuy {
		ul.pro-list {
			li {
				position: relative;
				height: 316px;
				width: 238px;
				border: 1px solid #ddd;
				margin-right: 26px;
				.pro-name {
					margin: 0 0 5px;
				}
				.cuxbg{
					position: absolute;
					top: 0;
					right: 0;
				}
				.item .pro-btns {
					border: none;
					border-radius: 0;
					background: #F9F9F9;
					color: #666;
					height: 36px;
					width: 100%;
					margin-top: 12px;
					img {
						margin-right: 7px;
					}
				}
			}
			li:nth-child(4n) {
				margin-right: 0;
			}
		}
	}
</style>