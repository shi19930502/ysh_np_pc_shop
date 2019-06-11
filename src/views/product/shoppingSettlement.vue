<template>
	<div id="shoppingSettlement">
		<shop-header />
		<!--搜索-->
		<section class="shop-search flex flex-y-center">
			<div class="min-width">
				<ul class="flex flex-x-between flex-y-center">
					<li class="logo flex flex-y-end">
						<div class="logoimg" @click="toIndex" v-show="cityName=='ysh'">
							<img src="../../../static/img/img_logo.png" />
						</div>
						<strong>结算页</strong>
					</li>
					<li>
						<div class="step"></div>
					</li>
				</ul>
			</div>
		</section>
		<section class="pege-title min-width flex flex-y-center">
			<div>填写并核对订单信息</div>
		</section>
		<section class="content">
			<div class="min-width">
				<ul>
					<!--自提的时候不显示 -->
					<li v-if="isShowAdd">
						<strong>收货人信息</strong>
						<div class="li-item">
							<template v-if="AddressList.length==0">
								<div class="flex flex-y-center">
									<shop-btn marginR="10px" height="18px" text="暂无地址" width="56px" fontsize="12px" bgcolor="#F64811" border="1px #F64811"
									 color="#fff" />
									</shop-btn>
									<span class="noaddress">抱歉，你当前没有地址可供配送</span>
								</div>
								<div style="margin-top: 23px;">
									<shop-btn @click.native="toaddAddress" marginR="10px" height="30px" text="添加地址" width="144px" fontsize="14px"
									 bgcolor="#fff" border="1px #00C65D" color="#00C65D" />
									</shop-btn>
								</div>
							</template>
							<template v-else>
								<div class="flex flex flex-y-center" style="color: #666;" v-for="d in AddressList">
									<div class="li-btns flex flex-y-center">
										<div class="btn active">
											<shop-btn v-if="d.contacts.length>5" marginR="0" :title="d.contacts" height="30px" :text="d.contacts.substring(0,5)+'...'" width="98px" fontsize="14px" />
											</shop-btn>
											<shop-btn v-else marginR="0" height="30px" :text="d.contacts" width="98px" fontsize="14px" />
											</shop-btn>
											<div class="icon_duidui"></div>
										</div>
									</div>
									<div>
										<!--<span>{{d.contacts}}</span>-->
										<p>地址：{{d.completeAddress}}</p>
										<p>电话：{{d.phoneNumber}}</p>
									</div>
								</div>
							</template>
						</div>
					</li>
					<!--<li id="payType">
						<strong>支付方式</strong>
						<div class="li-item">
							<div class="li-btns flex flex-y-center">
								<template v-for="d,index in payType">
									<div :class="index == 0 ? 'btn active' : 'btn'" :data-type="d.type">
										<shop-btn marginR="0" height="30px" :text="d.name" width="98px" fontsize="14px" /></shop-btn>
										<div class="icon_duidui"></div>
									</div>
								</template>
							</div>
						</div>
					</li>-->
					<li>
						<strong>配送方式</strong>
						<div class="li-item">
							<div class="li-btns flex flex-y-center" style="margin-bottom: 30px;" id="logisticsType">
								<template v-for="d,index in logisticsType">
									<div :class="index == 0 ? 'btn active' : 'btn'" :data-type="d.type" @click="selectAdd(d.type)">
										<shop-btn marginR="0" height="30px" :text="d.name" width="98px" fontsize="14px" />
										</shop-btn>
										<div class="icon_duidui"></div>
									</div>
								</template>
							</div>
							<!--<div class="li-item-tiele">配送时间</div>
							<div class="li-btns">
								<div class="flex">
									<div class="psdate">
										<div class="flex">
											<div class="btn active">
												<shop-btn marginR="0" height="30px" text="2018-07-16" width="98px" fontsize="14px" /></shop-btn>
												<div class="icon_duidui"></div>
											</div>
										</div>
									</div>
								</div>
							</div>-->
						</div>
					</li>
					<!--商品清单-->
					<li>
						<strong>商品清单</strong>
						<div class="li-item" v-for="d,index in settlementPros" v-show="d.sellerProducts.length>0">
							<div class="li-item-tiele">{{d.storeInfo.storeName}}</div>
							<div class="order-table flex flex-x-between">
								<div class="left">
									<div>订单{{index+1}}：</div>
									<template v-if="isShowAdd">
										<div>选择配送时间</div>
										<div class="li-btns">
											<div class="flex">
												<div class="psdate" style="padding-top: 10px;">
													<div class="flex">
														<!--<div class="btn active">-->
														<div class="btn active" @click="gettime(d)">
															<shop-btn marginR="0" height="30px" :text="d.psdate" width="200px" fontsize="14px" />
															</shop-btn>
															<div class="icon_duidui"></div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</template>
								</div>
								<div class="right">
									<table style="width: 100%;">
										<thead>
											<tr>
												<th style="text-align: left;padding-left: 20px;">商品</th>
												<th width="100px">数量</th>
												<th width="100px">单价</th>
												<th width="100px">金额</th>
												<th width="283px">备注</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="pro in d.sellerProducts">
												<td style="text-align: left;padding-left: 20px;">
													<div class="flex">
														<div class="pro-img">
															<img v-if="pro.skuPicUrl" :src="imgURL+pro.skuPicUrl" />
															<img v-else-if="pro.proPicUrl" :src="imgURL+pro.proPicUrl" />
															<img v-else src="../../../static/img/my_default_img.png" />
														</div>
														<div>
															<div class="pro-name">{{pro.productName}}</div>
															<div class="pro-sku">{{pro.skuName}}</div>
															<div class="cuxbg flex flex-y-center flex-x-center" v-if="pro.promotionPrice-0 < pro.price-0">
																<span>促销</span>
															</div>
														</div>
													</div>
												</td>
												<td>{{pro.quantity}}</td>
												<template v-if="pro.promotionPrice>0 && pro.promotionBasePrice>0">
													<td>
														<span>{{'￥'+pro.promotionPrice+'/'+pro.skuMeasureName}}</span>
														<p style="text-decoration: line-through;" v-if="pro.promotionPrice-0 < pro.price-0">{{'￥'+pro.price}}</p>
													</td>
													<td style="border-right: 1px solid #D5DEE2;">
														<strong>{{'￥'+(pro.quantity*pro.promotionPrice).toFixed(2)}}</strong>
													</td>
												</template>
												<template v-else>
													<td v-if="pro.price==0">{{'￥时价'+'/'+pro.skuMeasureName}}</td>
													<td v-else>{{'￥'+pro.price+'/'+pro.skuMeasureName}}</td>

													<td style="border-right: 1px solid #D5DEE2;">
														<strong v-if="pro.price==0">{{'￥时价'}}</strong>
														<strong v-else>{{'￥'+(pro.quantity*pro.price).toFixed(2)}}</strong>

													</td>
												</template>
												<td>
													<div class="bzinput" :id="'bzinput'+pro.id">
														<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="备注" v-model="pro.remark"
														 maxlength="200">
														</el-input>
													</div>
													<span class="bzbtn" :id="'bzbtn'+pro.id" @click="showRemark(pro.id)">
														<i class="el-icon-edit"></i>
														<span>备注</span>
													</span>
												</td>
											</tr>
											<tr>
												<td colspan="5">
													<div class="tbfoot flex flex-x-between flex-y-center">
														<div class="tbfoot-l flex flex-y-center">
															<span>
																<strong>订单备注：</strong>
															</span>
															<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="d.comment"
															 maxlength="200">
															</el-input>
														</div>
														<div class="tbfoot-r">商品总金额：
															<span>{{'￥'+d.orderTotal}}</span>
														</div>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<!--总计-->
				<div class="total flex flex-y-center flex-x-between">
					<div>
						<span>总计：</span>
						<span>商家数量：{{settlementPros.length}}</span>
						<span>商品数量：{{quanityTotal.toFixed(2)}}</span>
					</div>
					<div>
						<span>
							<strong>商品金额总计:</strong>
						</span>
						<span class="price">{{'￥'+priceTotal.toFixed(2)}}</span>
					</div>
				</div>
			</div>

		</section>
		<section class="shop-settlement-footer">
			<ul class="min-width flex flex-y-center flex-x-between">
				<li class="flex flex-y-center">
					<div class="back" @click="backShopCar">返回购物车</div>
				</li>
				<li class="flex-item-6 flex-x-end flex flex-y-center">
					<div class="flex-y-center flex">
						<span>商品金额总计：</span>
						<strong>{{'￥'+priceTotal.toFixed(2)}}</strong>
					</div>
				</li>
				<li>
					<shop-btn width="160px" height="60px" text="确定" bgcolor="#F64811" color="#fff" border="#F64811" marginR="0"
					 fontsize="24px" @click.native="toCheckoutSuccess" />
				</li>
			</ul>
		</section>
		<datetime-modal @getTimeCallback="getTimeCallback" v-if="modalShow" :modal="modalShow" @close="modalClose" :params="modalParams"></datetime-modal>
	</div>
</template>

<script>
	import ShopTop from '../components/header.vue'
	import ShopFooter from '../components/footer.vue'
	import btn from '../components/shopbtn.vue'
	import datetimeModal from './getdateTimeModal.vue'

	import {
		Badge,
		Dialog,
		Table,
		TableColumn,
		InputNumber,
		Input
	} from 'element-ui'
	import mixin from '../../utils/mixin.js'
	export default {
		components: {

			// element component
			[Badge.name]: Badge,
			[Dialog.name]: Dialog,
			[Table.name]: Table,
			[TableColumn.name]: TableColumn,
			[InputNumber.name]: InputNumber,
			[Input.name]: Input,
			[datetimeModal.name]: datetimeModal,

			[btn.name]: btn,
			[ShopTop.name]: ShopTop,
			[ShopFooter.name]: ShopFooter,

		},
		mixins: [mixin],
		data() {
			return {
				settlementPros: [],
				priceTotal: 0,
				quanityTotal: 0,
				AddressList: [],
				addressInfo: null,
				distributionTime: [], //配送时间
				isShowAdd: true
			}
		},
		async created() {
			this.server_date = await this.getServerTime()
			// 从本地获取购物车选择结算的商品
			let settlementPros = JSON.parse(localStorage.getItem('settlementPros'))
			for (let i of settlementPros) {
				if (i.sellerProducts.length > 0) {
					this.settlementPros.push(i)
				}
			}
			// 计算总金额
			for (let i of this.settlementPros) {
				// 添加订单备注
				i.comment = ''
				this.priceTotal += (i.orderTotal - 0)
				// 计算总数量
				let quanityTotal = i.sellerProducts.length
				for (let pro of i.sellerProducts) {
					// 					quanityTotal += pro.quantity
					// 					quanityTotal += pro.quantity

					// 添加商品备注字段
					pro.remark = ''
					pro.showRemarks = false
				}
				this.quanityTotal += quanityTotal
				// 封装配送时间
				this.setpsTime(i, i.storeInfo)
			}

			// 获取收货地址
			this.getAddress()

		},
		mounted() {
			$(document).on('click', '.btn', function() {
				$(this).addClass('active').siblings().removeClass('active')
			})
		},
		methods: {
			/**
			 * 选择收货地址
			 */
			selectAdd(type) {
				// 选择自提的时候隐藏收货地址
				type == 0 ? this.isShowAdd = false : this.isShowAdd = true
			},
			/**
			 * 初始化配送参数
			 */
			setpsTime(i, storeInfo) {
				let nowTime = new Date(this.server_date)
				// let nowTime = this.server_date
				let nt = nowTime.getHours()
				
				if (storeInfo.distributionToday == 0) { // 如果店铺不支持当天配送distributionType == 0，只能选择第二天的日期
					let pdate = `${this.GetDateStr(1,this.server_date).date}`
					let ptstart = storeInfo.distributionStart < 10 ? `0${storeInfo.distributionStart}:00` :
						`${storeInfo.distributionStart}:00`
					let ptend = storeInfo.distributionStart + 1 < 10 ? `0${storeInfo.distributionStart+1}:00` :
						`${storeInfo.distributionStart+1}:00`
					i.psdate = `${pdate} ${ptstart}~${ptend}`

				} else {
					if (nt + 1 >= storeInfo.distributionEnd) { // 如果店铺支持当天配送distributionType == 1，但是超过结束配送时间，只能选择第二天的日期
						let pdate = `${this.GetDateStr(1,this.server_date).date}`
						let ptstart = storeInfo.distributionStart < 10 ? `0${storeInfo.distributionStart}:00` :
							`${storeInfo.distributionStart}:00`
						let ptend = storeInfo.distributionStart + 1 < 10 ? `0${storeInfo.distributionStart+1}:00` :
							`${storeInfo.distributionStart+1}:00`
						i.psdate = `${pdate} ${ptstart}~${ptend}`

					} else if (nt + 1 <= storeInfo.distributionStart) {
						let pdate = `${this.GetDateStr(0,this.server_date).date}`
						let ptstart = storeInfo.distributionStart < 10 ? `0${storeInfo.distributionStart}:00` :
							`${storeInfo.distributionStart}:00`
						let ptend = storeInfo.distributionStart + 1 < 10 ? `0${storeInfo.distributionStart+1}:00` :
							`${storeInfo.distributionStart+1}:00`
						i.psdate = `${pdate} ${ptstart}~${ptend}`
					} else {
						let pdate = `${this.GetDateStr(0,this.server_date).date}`
						let start = nt + 1
						let ptstart = start < 10 ? `0${start}:00` : `${start}:00`
						let ptend = start + 1 < 10 ? `0${start+1}:00` : `${start+1}:00`
						i.psdate = `${pdate} ${ptstart}~${ptend}`
					}
				}
			},
			/**
			 * 选择时间回调
			 */
			getTimeCallback(result) {
				this.modalClose()
				for (let i of this.settlementPros) {
					if (i.sellerInfo.sellerId == result.sellerId) {
						i.psdate = result.result
					}
				}
			},
			/**
			 * 到添加地址页面
			 */
			toaddAddress() {
				this.$router.push({
					name: 'address'
				})
			},
			/**
			 * 选择商品规格
			 */
			gettime(d, psdate) {
				this.modalEdit({
					param: d,
				})
			},
			/**
			 * 获取收货地址列表
			 */
			getAddress() {
				this.postRequest('address/queryByCustomerId', {
					customerId: this.userInfo.typeCode
				}).then(d => {
					if (d.data && d.data.state == 0) {
						if (d.data.aaData) {
							this.AddressList = [d.data.aaData]
							this.addressInfo = d.data.aaData
						}
					} 
				})
			},
			/**
			 * 结算页
			 */
			toCheckoutSuccess() {
				if (this.AddressList.length == 0 && this.isShowAdd == true) {
					this.$message('还没有收货地址，请先添加收货地址！')
					return false;
				}
				// 获取支付方式
				//				let payType
				//				$.each($('#payType .btn'), function() {
				//					if($(this).hasClass('active')) {
				//						payType = $(this).data('type')
				//					}
				//				})
				// 获取配送方式
				let distributionType
				$.each($('#logisticsType .btn'), function() {
					if ($(this).hasClass('active')) {
						distributionType = $(this).data('type')
					}
				})

				for (var i of this.settlementPros) {
					let createOrderObj = {
						buyerId: this.userInfo.typeCode,
						buyerName: this.userInfo.loginName,
						sellerId: i.sellerInfo.sellerId,
						sellerName: i.sellerInfo.sellerName || i.sellerInfo.name,
						comment: i.comment
					}
					if (this.addressInfo && this.isShowAdd == true) {
						createOrderObj.shippingAdd = this.addressInfo.completeAddress
						createOrderObj.shippingAddId = this.addressInfo.id
					} else {
						createOrderObj.shippingAdd = ''
						createOrderObj.shippingAddId = ''
					}

					// 默认为现金支付
					createOrderObj.payType = 0
					createOrderObj.distributionType = distributionType
					// 配送时间
					createOrderObj.distributionTimeBegin = `${i.psdate.split(' ')[0]} ${i.psdate.split(' ')[1].split('~')[0]}:00`
					createOrderObj.distributionTimeEnd = `${i.psdate.split(' ')[0]} ${i.psdate.split(' ')[1].split('~')[1]}:00`

					// 封装商品信息
					let arr = []
					for (let pro of i.sellerProducts) {
						var o = {
							productId: pro.productId,
							productName: pro.productName,
							skuId: pro.skuId,
							skuName: pro.skuName,
							skuMeasure: pro.skuMeasure,
							skuMeasureName: pro.skuMeasureName,

							quantity: pro.quantity,
							comment: pro.remark,
							chargingModel: pro.chargingModel
						}
						o.oriPrice = pro.basePrice.mul(100)
						o.price = pro.price.mul(100)
						arr.push(o)
					}
					createOrderObj.orderitems = JSON.stringify(arr)

					// 如果为自提 配送地址和配送时间不用存入数据库 
					if (createOrderObj.distributionType == 0) {
						delete createOrderObj.distributionTimeBegin
						delete createOrderObj.distributionTimeEnd
						delete createOrderObj.shippingAddId
						delete createOrderObj.shippingAdd
					}
					this.createOrder(createOrderObj)
				}
			},
			/**
			 * 创建订单
			 */
			createOrder(params) {
				this.postRequest('order/orderCreateByWebChatMall', params).then(resp => {
					if (resp.data && resp.data.state == 0) {
						for (var i in this.settlementPros) {
							if (resp.data.aaData[0].sellerId == this.settlementPros[i].sellerInfo.sellerId) {
								// 删除购物车中的商品
								for (var j of this.settlementPros[i].sellerProducts) {
									this.deleteShopCarById(j.id)
								}
								this.settlementPros.splice(i, 1)
							}
						}
						localStorage.setItem('settlementPros', JSON.stringify(this.settlementPros))
						this.$router.push({
							name: 'checkoutSuccess'
						})
					} else {
						this.$message.error(resp.data.msg)
					}
				})
			},
			/**
			 * 返回购物车
			 */
			backShopCar() {
				this.$router.back();
			},
			/**
			 * 商品备注
			 */
			showRemark(id) {
				$(`#bzbtn${id}`).hide()
				$(`#bzinput${id}`).show()
			}
		}
	}
</script>

<style lang="scss">
	@import '../../assets/css/shoppingSettlement.scss';
</style>
