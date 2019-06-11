<template>
	<!--餐厅客户进去后的主页 -->
	<div id="north-index-page">
		<shop-header />
		<shop-search :isStore="true" :showClassify="false" />
		<!-- customer-nav -->
		<section class="page-title min-width flex flex-x-between flex-y-end">
			<shop-btn marginR="0" text="餐厅、企事业单位采购配送" height="32px" width="228px" bgcolor="#CD0011" color="#fff" border="1px #CD0011"></shop-btn>
			<ul class="flex right">
				<li class="click-a">用户须知</li>
				<li class="click-a">客户登记</li>
			</ul>
		</section>
		<!--主体-->
		<section class="shop-content">
			<div class="shop-product flex flex-x-between min-width">
				<div class="left">
					<!-- 商品分类 -->
					<div id="category" v-loading="categoryLoading">
						<ul>
							<li v-for="d in categoryList" @click="thisPageCategoryChange(d.gbgoodsId,d.name)">
								<div class="flex flex-x-between flex-y-center listem">
									<div class="flex flex-y-center">
										<strong>{{d.name}}</strong>
									</div>
									<div class="arrow-r" v-if="d.childList"></div>
								</div>
								<div class="fenlist flex" v-if="d.childList">
									<div v-for="item,index in d.childList">
										<span>{{item.name}}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<!--banner -->
				<div class="center" v-show="!showProduct">
					<div class="flex flex-x-between">
						<div class="banner-left">
							<div class="banner">
								<img src="../../../static/img/northring/home_babner.png" />
							</div>
							<div class="slogan">
								<ul class="flex flex-x-between flex-y-center">
									<li>
										<img src="../../../static/img/icon_baozheng.png" />
										<div>食品安全保障</div>
									</li>
									<li>
										<img src="../../../static/img/icon-wuliu.png" />
										<div>专业物流配送</div>
									</li>
									<li>
										<img src="../../../static/img/iconz-xiadan.png" />
										<div>便捷在线下单</div>
									</li>
									<li>
										<img src="../../../static/img/icon-zhineng.png" />
										<div>智能硬件支持</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="banner-right">
							<div class="title-bg flex flex-x-center flex-y-center">
								<div>
									<div class="h1 tac"><strong>最新采购</strong></div>
									<p class="tac">最新交易 真实可靠</p>
								</div>
							</div>
							<div class="newlist-wrap" id="zxwd_Scroll">
								<ul v-if="northRingNewOrderSkus.length>0">
									<li v-for="d in northRingNewOrderSkus">
										<div class="flex flex-y-center">
											<div class="red-point"></div>
											<p class="pro-name flex-item-4"><strong>{{d.f_product_name}}</strong></p>
											<div class="list-time">{{d.f_created_date}}</div>
										</div>
										<div class="order-info">
											<p>
												<span>￥{{d.f_price / 100}}/斤</span>
												<span>{{d.f_quantity}}斤</span>
											</p>
											<p>
												<span>买方:{{d.f_buyer_name}}</span>
												<span>卖方:{{d.f_seller_name}}</span>
											</p>
										</div>
									</li>
								</ul>
								<div style="height: 100%;color: #999;font-size: 14px;" v-else class="flex flex-x-center flex-y-center">暂无最新交易数据</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 显示商品 -->
				<div class="product-list right" v-show="showProduct">
					<!--分页-->
					<div class="page-num flex flex-y-center flex-x-between">
						<strong class="title">{{categoryText}}</strong>
						<div class="flex flex-y-center">
							<el-pagination background small layout="total,prev, pager, next" :total="productDataCount" @current-change="handleCurrentChange"
							 :page-size="this.pageSize">
							</el-pagination>
						</div>
					</div>
					<div class="pro-list-wrapper" v-loading="proLoading">
						<ul class="pro-list flex" v-if="productList.length>0">
							<li v-for="d in productList">
								<div class="item">
									<div class="pro-img">
										<img v-if="d.productPicUrl" :src="imgURL+d.productPicUrl" />
										<img v-else src="../../../static/img/my_default_img.png" />
									</div>
									<div class="pro-text">
										<div class="pro-price flex flex-x-between flex-y-center">
											<div class="p1">
												<template v-if="isLogin">
													<span v-if="d.productMinPrice != d.productMaxPrice">{{'￥'+d.productMinPrice+'~'+d.productMaxPrice}}</span>
													<span v-else-if="d.productMinPrice == 0 && d.productMaxPrice == 0">暂无参考价</span>
													<span v-else>{{'￥'+d.price}}</span>
												</template>
												<template v-else>
													<span>时价</span>
												</template>
											</div>
											<div class="flex" v-if="d.isPomotion==1">
												<div class="p2">{{'￥'+d.price}}</div>
												<div class="cuxbg flex flex-y-center flex-x-center">
													<span>促销</span>
												</div>
											</div>
										</div>
										<div class="pro-name ellipsis">{{d.name}}</div>
										<div class="flex flex-x-between">
											<div class="pro-ms ellipsis" :title="d.remark">{{d.remark || '暂无描述'}}</div>
											<el-popover placement="top-end" width="203" trigger="hover" @show="queryNorthRingNewOrderSku(d.id)">
												<div class="newlist-wrap">
													<ul v-if="northRingNewOrderSkus.length>0">
														<li v-for="d in northRingNewOrderSkus">
															<div class="flex flex-y-center">
																<div class="red-point"></div>
																<p class="pro-name flex-item-4"><strong>{{d.f_product_name}}</strong></p>
																<div class="list-time">{{d.f_created_date}}</div>
															</div>
															<div class="order-info">
																<p>
																	<span>￥{{d.f_price / 100}}/斤</span>
																	<span>{{d.f_quantity}}斤</span>
																</p>
																<p>
																	<span>买方:{{d.f_buyer_name}}</span>
																	<span>卖方:{{d.f_seller_name}}</span>
																</p>
															</div>
														</li>
													</ul>
													<div v-else class="flex flex-x-center flex-y-center" style="height: 100%;">暂无最新交易数据</div>
												</div>
												<div slot="reference" style="cursor: pointer;"><img src="../../../static/img/northring/icon-jiaoyi.png" /></div>
											</el-popover>
										</div>
										<div class="pro-btns flex flex-y-center">
											<div class="scbtn flex-y-center flex-x-center flex" @click="addShoppingCar(d,'collection')">
												<img src="../../../static/img/icon_xingx.png" alt="" />
												<span>收藏</span>
											</div>
											<div class="addcarbtn flex-y-center flex-x-center flex" @click="addShoppingCar(d)">
												<img src="../../../static/img/icon_gouwuche.png" alt="" />
												<span>加入购物车</span>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
						<div v-else class=" flex flex-x-center flex-y-center" style="height: 444px;color: #d1d1d1;" v-loading="proLoading">
							<div>
								<img src="../../../static/img/my_default_img.png" />
								<p class="tac">暂无商品</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<shop-footer />
		<shopcar-modal v-if="modalShow" :modal="modalShow" @close="modalClose" :params="modalParams" @submitShopCar="submitShopCar"></shopcar-modal>
		<!--加入购物车成功弹出窗-->
		<el-dialog title="添加成功" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
			<shopcar-sumodal @toShoppingCar="toShoppingCar" @closeSuccessModal="closeSuccessModal"></shopcar-sumodal>
		</el-dialog>
	</div>
</template>

<script>
	
	import ShopTop from '../components/header.vue'
	import ShopFooter from '../components/footer.vue'
	import Search from '../components/search.vue'
	import btn from '../components/shopbtn.vue'
	import shopcarModal from '../product/addShopCarModal.vue'
	import shopcarSuModal from '../product/addCarSuccessModal.vue'

	import {
		Pagination,
		Rate,
		Dialog,
		Popover
	} from 'element-ui'
	import mixin from '../../utils/mixin.js'
	import category_mixin from './mixins/category.js'
	import product_mixin from './mixins/product.js'
	export default {
		mixins: [mixin, category_mixin, product_mixin],
		components: {
			[ShopTop.name]: ShopTop,
			[ShopFooter.name]: ShopFooter,
			[Search.name]: Search,
			[btn.name]: btn,
			[Pagination.name]: Pagination,
			[Rate.name]: Rate,
			[Dialog.name]: Dialog,
			[shopcarModal.name]: shopcarModal,
			[shopcarSuModal.name]: shopcarSuModal,
			[Popover.name]: Popover,
		},
		data() {
			return {
				dialogTableVisible: false,
				showProduct: false,
				categoryText: '',
				northRingNewOrderSkus: [],
				timer: null
			}
		},
		watch: {
			showProduct(val) {
				console.log(val)
			}
		},
		created() {
			this.getSellers()
			this.getCategoryList()
			this.queryNorthRingNewOrderSku()
		},
		mounted() {
			$(document).on('click', '#category ul li', function() {
				$(this).addClass('active').siblings().removeClass('active')
			})

			// 最新交易滚动效果
			// 			$('#zxwd_Scroll').myScroll({
			// 				speed: 40, //数值越大，速度越慢
			// 				rowHeight: 30 //li的高度
			// 			});


			// 每隔5s刷新一次最新交易商品
			// 			this.timer = setInterval(() => {
			// 				this.queryNorthRingNewOrderSku()
			// 			}, 3000)
		},
		methods: {
			/**
			 * 商品分页 
			 */
			handleCurrentChange(val) {
				this.pageNum = val
				this.getProductList()
			},
			thisPageCategoryChange(gbgoodsId, name) {
				this.showProduct = true
				this.categoryChange(gbgoodsId, name)
			},
			/**
			 * 选择商品规格
			 */
			addShoppingCar(d, type) {
				if (!this.isLogin) {
					this.$alert.confirm('还没有登录，是否马上登录?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push({
							name: 'login'
						})
					}).catch(() => {});
					return false
				}
				if (type == 'collection') {
					this.postRequest('productsku/getSkuByQuotation', {
						productId: d.id,
						purchaserId: this.userInfo.typeCode,
						supplierId: this.sellerId,
						buyerId: this.userInfo.typeCode
					}).then(resp => {
						if (resp.data && resp.data.state == 0) {
							for (var i in resp.data.aaData) {
								// console.log(resp.data.aaData[i].isCollection)
							}
						}
					})
				}

				var param = {
					productId: d.id,
					sellerId: this.sellerId,
					sellerName: this.sellerName,
					type: type,
				}
				if (this.sellerId == '') {
					param.sellerId = d.customerId
					param.sellerName = d.createdPersonName
					// param.type = 'search'
				}

				this.modalEdit(param)
			},
			/**
			 * 提交购物车
			 */
			submitShopCar() {
				this.modalClose()
				this.dialogTableVisible = true
			},
			/**
			 * 添加成功提示框跳转购物车
			 */
			toShoppingCar() {
				this.$router.push({
					name: 'shoppingCar',
				})
			},
			/**
			 * 关闭继续购物
			 */
			closeSuccessModal() {
				this.dialogTableVisible = false
			},
			/**
			 * 获取团采直营店最新交易商品
			 */
			queryNorthRingNewOrderSku(productId) {
				this.postRequest('order/queryNorthRingNewOrderSku', {
					productId: productId,
					// sellerId: this.sellerId
				}).then(resp => {
					if (resp.data && resp.data.state == 0) {

						for (let item of resp.data.aaData) {
							// 隐藏买卖方
							let s_startStr = item.f_seller_name.substring(0, 1)
							let s_endStr = item.f_seller_name.substr(item.f_seller_name.length - 1, 1)

							let b_startStr = item.f_buyer_name.substring(0, 1)
							let b_endStr = item.f_buyer_name.substr(item.f_buyer_name.length - 1, 1)

							item.f_seller_name = `${s_startStr}****${s_endStr}`
							item.f_buyer_name = `${b_startStr}****${b_endStr}`

							// 时间转换时间差
							item.f_created_date = this.getDateDiff(item.f_created_date)
						}
						this.northRingNewOrderSkus = resp.data.aaData

					}
				})
			},
			/**
			 * 将订单时间转化为时间差
			 */
			getDateDiff(dateStr) {
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;


				var now = new Date().getTime();
				var diffValue = now - this.getDateTimeStamp(dateStr);
				if (diffValue < 0) {
					//若日期不符则弹出窗口告之
					//alert("结束日期不能小于开始日期！");
				}
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				var result;

				if (monthC >= 1) {
					result = parseInt(monthC) + "个月前";
				} else if (weekC >= 1) {
					result = parseInt(weekC) + "周前";
				} else if (dayC >= 1) {
					result = parseInt(dayC) + "天前";
				} else if (hourC >= 1) {
					result = parseInt(hourC) + "小时前";
				} else if (minC >= 1) {
					result = parseInt(minC) + "分钟前";
				} else
					result = "刚刚";
				return result;

			},
			/**
			 * 字符串转时间撮
			 */
			getDateTimeStamp(dateStr) {
				return Date.parse(dateStr.replace(/-/gi, "/"));
			}
		}
	}
</script>

<style lang="scss">
	@import './styles/store-list.scss';
	@import './styles/category.scss';


	.el-popover {
		padding: 0;

		.newlist-wrap {
			height: 208px;
			overflow-y: auto;
		}

		.newlist-wrap::-webkit-scrollbar {
			width: 6px;
			height: 6px;
		}

		.newlist-wrap::-webkit-scrollbar-track {
			background: #f6f6f6;
			border-radius: 2px;
		}

		.newlist-wrap::-webkit-scrollbar-thumb {
			background: #aaa;
			border-radius: 2px;
		}

		.newlist-wrap::-webkit-scrollbar-thumb:hover {
			background: #747474;
		}

		.newlist-wrap::-webkit-scrollbar-corner {
			background: #f6f6f6;
		}
	}

	.newlist-wrap {
		overflow: hidden;
		height: 430px;

		ul {
			li {
				padding: 10px;
				font-size: 12px;

				.red-point {
					width: 6px;
					height: 6px;
					background: rgba(255, 94, 38, 1);
					border-radius: 50%;
				}

				.pro-name {
					color: #5B5B5B;
					padding: 0 10px;
				}

				.list-time {
					color: #909090;
				}

				.order-info {
					p {
						padding-top: 8px;
						padding-left: 16px;
					}

					p:nth-child(1) {
						span {
							display: inline-block;
							padding: 0 12px;
							height: 16px;
							line-height: 16px;
							background: rgba(67, 58, 59, 0.08);
							border-radius: 8px;
							color: #909090;
						}
					}

					p:nth-child(2) {
						span:last-child {
							padding-left: 5px;
						}
					}

					p:last-child {
						color: #909090;
					}
				}
			}
		}
	}

	#north-index-page {


		// 主体
		.page-title {
			ul.right {
				font-size: 16px;
				color: #999;

				li {
					padding: 17px 30px;
					cursor: pointer;
				}
			}
		}

		.shop-content {
			width: 100%;
			padding-top: 10px;
			background: #F1F1F1;

			.shop-product {
				position: relative;

				.left {
					width: 230px;

					.store-title {
						height: 46px;
						background: #CD0011;
						color: #fff;
					}

					height: 530px;
					overflow-y: auto;

					#category {
						background: #fff;

						ul {
							padding: 8px 22px;

							li {
								border: none;
								padding: 12px 0;

								.fenlist {
									padding-left: 0;

									div span {
										padding: 0;
										margin-right: 10px;
									}
								}
							}
						}
					}
				}

				.center {
					width: 950px;

					.banner-left {
						width: 700px;
					}

					.banner-right {
						width: 240px;
						background: #fff;
						height: 530px;

						.title-bg {
							width: 100%;
							height: 100px;
							background: #433A3B;
							color: #fff;

							p {
								color: #999;
								font-size: 14px;
								margin-top: 14px;
							}
						}
					}

					.banner {
						height: 420px;
						background: #DBFBCE;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.slogan {
						width: 100%;
						height: 110px;
						background: #48A136;
						color: #fff;
						font-size: 18px;

						ul {
							height: 100%;

							li {
								width: 25%;
								text-align: center;
							}
						}
					}
				}

				.product-list.right {
					width: 950px;

					ul.pro-list {
						li {
							margin-bottom: 15px;
						}

						li:not(:nth-child(4n)) {
							margin-right: 15px;
						}
					}

					.page-num {
						background: #fff;
						padding: 10px 20px;

						strong.title {
							color: #666666;
						}

						.pagebtn {
							margin-right: 20px;

							.cpage {
								color: #FF4400;
							}
						}

						.arrowout {
							cursor: pointer;
							height: 25px;
							width: 48px;
							border: 1px solid #FF4400;

							.arrow-r,
							.arrow-l {
								border-color: #FF4400;
							}
						}

						.arrowout.brn {
							border-right: none;
						}
					}
				}
			}
		}
	}
</style>
