<template>
	<div id="index-page-new">
		<!-- banner -->
		<section class="banner">
			<div class="fixed-nav">
				<div class="nav min-width flex flex-x-between flex-y-center">
					<div class="logo"></div>
					<div class="flex">
						<ul class="nav-list flex flex-y-center">
							<li>首页</li>
							<li @click="goAnchor('#pif')">批发中心</li>
							<li @click="goAnchor('#group')">团体采购</li>
							<li @click="goAnchor('#personal')">个人家庭</li>
							<li @click="goAnchor('#todays')">今日行情</li>
						</ul>
						<shop-btn @click.native="toLogin()" width="80px" height="26px" marginR="0" border="1px #00A460" bgcolor="none"
						 color="#00A460" text="登录"></shop-btn>
					</div>
				</div>
			</div>
			<div class="navline"></div>
			<div class="banner-conten min-width flex flex-x-center">
				<div class="left">
					<img src="../../../static/img/northring/markhome/banner_title.png" alt="">
					<p>塞上农鲜汇是宁夏农鲜汇农业科技发展有限公司倾力打造的生鲜网上批发市场品牌，
						以银川北环批发市场为依托，以”互联网+”及新零售思想为载体，以信息化技术为手段，
						通过线上线下融合模式，实现从一批到餐桌的全流程溯源管理。</p>
				</div>
				<div class="right">
					<p><strong>扫描二维码</strong></p>
					<p><img src="../../../static/img/northring/markhome/img_erweima.png" /></p>
					<p><span>关注微信公众号</span></p>
				</div>
			</div>
			<div class="navline"></div>
			<ul class="banner-slogans flex flex-x-center">
				<li>
					<p><strong>配送高效</strong></p>
					<p>专业配送，精准高效</p>
				</li>
				<!-- <li><div class="fengeline"></div></li> -->
				<li>
					<p><strong>食品安全</strong></p>
					<p>严格监控，层层把关</p>
				</li>
				<!-- <li><div class="fengeline"></div></li> -->
				<li>
					<p><strong>可追溯</strong></p>
					<p>来源可追溯，去向可查证</p>
				</li>
			</ul>
		</section>
		<!-- 宣传标语 -->
		<section class="slogans flex flex-x-center flex-y-center">
			<div class="tac">
				<img src="../../../static/img/northring/markhome/icon-ship.png" alt="">
				<p><strong>食品安全保障</strong></p>
			</div>
			<div class="tac">
				<img src="../../../static/img/northring/markhome/icon_wuliu.png" alt="">
				<p><strong>专业物流配送</strong></p>
			</div>
			<div class="tac">
				<img src="../../../static/img/northring/markhome/icon_bianjie.png" alt="">
				<p><strong>便捷在线下单</strong></p>
			</div>
			<div class="tac">
				<img src="../../../static/img/northring/markhome/icon_zhineng.png" alt="">
				<p><strong>智能硬件支持</strong></p>
			</div>
		</section>
		<!-- 批发中心 -->
		<section class="wholesale-center" id="pif">
			<div class="min-width">
				<div class="title-text">
					<div class="h1">批发中心</div>
					<p>以市场监管为依托，严格控制入场交易的商品来源信息。将一批的商品交易行情在平台展示，为一批和二批提供撮合服务，线上线下均可交易。
						为二级批，其它配送中心、早市、农贸市场、小区菜店提供可靠的进货渠道。</p>
				</div>
				<ul class="wholesale-slogans flex flex-x-center">
					<li>
						<img src="../../../static/img/northring/markhome/icon_zishikekao.png" />
						<p class="h1"><strong>资质可靠</strong></p>
						<p>所有一级批发商必须提交资质
							证明方可入驻平台
						</p>
					</li>
					<li>
						<img src="../../../static/img/northring/markhome/icon_laiyuan.png" />
						<p class="h1"><strong>来源可塑</strong></p>
						<p>所有纳入平台的商品必须有
							来源证明
						</p>
					</li>
					<li>
						<img src="../../../static/img/northring/markhome/icon_jiage.png" />
						<p class="h1"><strong>价格透明</strong></p>
						<p>线上线下统一价，线下可扫码购买
							线上可远程订购
						</p>
					</li>
					<li>
						<img src="../../../static/img/northring/markhome/icon_dianzi.png" />
						<p class="h1"><strong>电子结算</strong></p>
						<p>农批交易电子化，多种支付方式集成
							告别手工记账，告别手抄单据
						</p>
					</li>
					<li>
						<img src="../../../static/img/northring/markhome/icon_peis.png" />
						<p class="h1"><strong>配送服务</strong></p>
						<p>平台为采购商提供配送服务
							再也不用凌晨跑批发市场拉货
						</p>
					</li>
				</ul>
				<div class="regbtn flex flex-x-center flex-y-center" @click="toReg()">立即注册</div>
			</div>
		</section>
		<!-- 团体采购 -->
		<section class="group-buyer" id="group">
			<div class="min-width">
				<div class="title-text">
					<div class="h1">团体采购</div>
					<p>为餐饮店、机关食堂、学校食堂提供一站式的采购及配送服务，平台将场内交易的行情在平台发布，
						让团体单位也能享受到一批的价格。</p>
				</div>
				<ul class="group-slogans flex flex-x-center">
					<li>
						<img src="../../../static/img/northring/markhome/img_canting.png" alt="">
						<p class="h1"><strong>餐厅</strong></p>
						<p>RESTAURANT</p>
					</li>
					<li>
						<img src="../../../static/img/northring/markhome/img_qiye.png" alt="">
						<p class="h1"><strong>企业单位</strong></p>
						<p>ENTERPRISE UNIT</p>
					</li>
					<li>
						<img src="../../../static/img/northring/markhome/img_shiye.png" alt="">
						<p class="h1"><strong>事业单位</strong></p>
						<p>GOVERNMENT-AFFILATED INSTITUTIONS</p>
					</li>
				</ul>
				<div class="regbtn flex flex-x-center flex-y-center" @click="toReg()">立即注册</div>
			</div>
		</section>
		<!-- 个人采购 -->
		<section class="personal-buyer" id="personal">
			<div class="min-width">
				<div class="title-text">
					<div class="h1">个人采购</div>
					<p>平台纳入优质社区门店为个人及家庭用户服务，社区门店入驻平台，可在线销售从批发中心采购的商品，</p>
					<p>并为个人及家庭用户提供最后一公里的配送服务。</p>
				</div>
			</div>
			<div class="regbtn flex flex-x-center flex-y-center" @click="toReg()">立即注册</div>
		</section>
		<!-- 今日行情 -->
		<section class="todays-pagination" id="todays">
			<div class="h1">今日行情</div>
			<div class="min-width flex flex-x-between">
				<div class="left">
					<ul id="muen-list">
						<template v-for="d,index in categoryList">
							<li v-if="index == 0" class="active" @click="categoryChange(d.gbgoodsId,'',true)">{{d.name}}</li>
							<li v-else @click="categoryChange(d.gbgoodsId,'',true)">{{d.name}}</li>
						</template>
					</ul>
				</div>
				<div class="right">
					<div id="priceChart"></div>
				</div>
			</div>
		</section>
		<section class="todays-table1">
			<div class="min-width">
				<el-table :data="tableData" stripe style="width: 100%">
					<!-- <el-table-column prop="date" label="序号">
				</el-table-column> -->
					<el-table-column prop="productName" label="商品">
					</el-table-column>
					<el-table-column prop="minPrice" label="最低价(元)">
					</el-table-column>
					<el-table-column prop="avgPrice" label="平均价(元)">
					</el-table-column>
					<el-table-column prop="maxPrice" label="最高价(元)">
					</el-table-column>
					<el-table-column label="趋势">
						<template slot-scope="scope">
							<img v-show="scope.row.status==-1" src="../../../static/img/northring/down.png" alt="">
							<img v-show="scope.row.status==1" src="../../../static/img/northring/up.png" alt="">
							<span v-show="scope.row.status==0">-</span>
						</template>
					</el-table-column>
					<el-table-column prop="times" label="更新时间">
					</el-table-column>
				</el-table>
				<div class="flex flex-x-end" style="padding: 10px;">
					<el-pagination background small layout="total,prev, pager, next,jumper" :total="tableDataCount" @current-change="handleCurrentChange"
					 :page-size="pageSize">
					</el-pagination>
				</div>
			</div>
		</section>
		<section class="index-footer flex flex-x-center flex-y-center">版权所有：宁夏农鲜汇农业科技发展有限公司</section>
		<!-- <shop-footer /> -->
	</div>
</template>

<script>
	import ShopTop from '../components/header.vue'
	import ShopFooter from '../components/footer.vue'
	import Search from '../components/search.vue'
	import btn from '../components/shopbtn.vue'

	import echarts from 'echarts'

	import {
		Table,
		TableColumn,
		Pagination
	} from 'element-ui'

	import mixin from '../../utils/mixin.js'
	import category_mixin from './mixins/category.js'

	export default {
		mixins: [mixin, category_mixin],
		components: {
			[ShopTop.name]: ShopTop,
			[ShopFooter.name]: ShopFooter,
			[Search.name]: Search,


			[btn.name]: btn,
			[Table.name]: Table,
			[TableColumn.name]: TableColumn,
			[Pagination.name]: Pagination,
		},
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				tableDataCount: 0,
				tableData: [],
				pageTatol: 0,
				// 客户类型 个人005
				customerProperty: '',
				stores: []
			}
		},
		watch: {
			gbgoodsId: 'renderPriceChart'
		},
		created() {
			this.queryMoreProductPrice()
			this.getCategoryList()

		},
		mounted() {
			this.renderPriceChart()
			$(document).on('click', '#muen-list li', function() {
				$(this).addClass('active').siblings().removeClass('active')
			})
		},
		methods: {
			//锚点跳转
			goAnchor(selector) {
				this.$el.querySelector(selector).scrollIntoView()
			},
			/**
			 * 登录
			 */
			toLogin() {
				this.$router.push({
					name: 'login'
				})
			},
			/**
			 * 注册
			 */
			toReg() {
				this.$router.push({
					name: 'reg'
				})
			},
			/**
			 * 今日行情表单数据
			 */
			queryMoreProductPrice() {
				this.postRequest('productsku/queryMoreProductPrice', {
					channelCode: this.channelCode,
					productType: this.gbgoodsId || '0',
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then((resp) => {
					if (resp.data && resp.data.state == 0) {
						if (resp.data.aaData) {
							this.tableData = resp.data.aaData
							this.tableDataCount = resp.data.dataCount
						}
					}
				})
			},
			/**
			 * 表格分页
			 */
			handleCurrentChange(val) {
				this.pageNum = val
				this.queryMoreProductPrice()
			},
			/**
			 * 价格走势
			 */
			queryProductPrice() {
				let params = {
					channelCode: this.channelCode,
					productType: this.gbgoodsId || '0',
					startTime: this.GetDateStr(-30).date,
					endTime: this.GetDateStr(0).date
				}
				return new Promise((resolve, reject) => {
					this.postRequest('productsku/queryProductPrice', params).then((resp) => {
						if (resp.data && resp.data.state == 0) {
							if (resp.data.aaData) {
								resolve(resp.data.aaData)
							} else {
								resolve(resp.data.msg)
							}
						}
					})
				})
			},
			/**
			 * 渲染价格图表
			 */
			async renderPriceChart() {
				// 基于准备好的dom，初始化echarts实例
				let priceData = await this.queryProductPrice()
				let legendData = []
				let xAxisData = []
				let seriesData = []
				for (let i in priceData) {
					let obj = {
						name: i,
						type: 'line',
						stack: '价格',
						data: priceData[i][1]
					}
					seriesData.push(obj)
					legendData.push(i)
					xAxisData = priceData[i][0]
				}


				let myChart = echarts.init(document.getElementById('priceChart'));
				let option = {
					title: {
						text: '商品价格走势'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						// data: ['邮件营销', '联盟广告', '视频广告']
						data: legendData
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						// data: ['周一', '周二', '周三']
						data: xAxisData
					},
					yAxis: {
						type: 'value'
					},
					series: seriesData
					// 					[{
					//               name: '羊肉',
					//               type: 'line',
					//               stack: '总量',
					//               data: [120, 132, 101]
					//             }
					//           ]
				};
				myChart.setOption(option);
			},
		}
	}
</script>

<style lang="scss">
	@import './styles/store-list.scss';
	@import './styles/index-page-new.scss';
	// ::-webkit-scrollbar{width:14px;}
	// ::-webkit-scrollbar-track{background-color:#bee1eb;}
	// ::-webkit-scrollbar-thumb{background-color:#00aff0;}
	// ::-webkit-scrollbar-thumb:hover {background-color:#9c3}
	// ::-webkit-scrollbar-thumb:active {background-color:#00aff0}
</style>
