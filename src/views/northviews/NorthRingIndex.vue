<template>
  <div id="north-index-page">
    <shop-header />
    <shop-search @getSellerId="getSellerId" :isStore="true" :showClassify="false" />
    <!-- customer-nav -->
    <section class="customer-nav min-width">
      <div class="flex flex-x-between">
        <ul class="flex left">
          <li class="active">批发中心</li>
          <template v-if="userInfo">
            <!-- <li v-show="userInfo.userType != '004'" @click="toRestaurantIndex">餐厅、企事业单位采购配送</li>
            <li v-show="userInfo.userType != '004'" @click="toPersonalBuyCenter">个人采购</li> -->
          </template>
          <template v-else>
            <li @click="toRestaurantIndex">餐厅、企事业单位采购配送</li>
            <li @click="toPersonalBuyCenter">个人采购</li>
          </template>
        </ul>
        <ul class="flex right">
          <li class="click-a">用户须知</li>
          <li class="click-a">客户登记</li>
        </ul>
      </div>
    </section>
    <!--banner -->
    <section class="banner">
      <div class="min-width flex">
        <div class="banner-left">
          <ul class="market-list">
            <li v-for="d in channelList" class="flex flex-y-center click-a">
              <div class="yuan"></div>
              <div class="ellipsis" @click="channelChange(d.code)">{{d.name}}</div>
            </li>
          </ul>
        </div>
        <div class="banner-middle">
          <div class="banner-img flex flex-x-center flex-y-center">
						<div class="img"></div>
          </div>
        </div>
        <div class="banner-right">
          <div class="system-bulletin">
            <div class="flex flex-x-center" style="padding: 20px 0;">
              <strong>—</strong>
              <strong class="title-text">
                <span>系统公告</span>
              </strong>
              <strong>—</strong>
            </div>
            <ul v-if="megList.length>0">
              <li class="ellipsis" v-for="d in megList" @click="toReadMsg(d)">{{d.title}}</li>
            </ul>
            <div v-else class="tac">暂无公告</div>
          </div>
          <div class="wxshop">
            <div class="flex flex-x-center" style="padding: 20px 0;">
              <strong>—</strong>
              <strong class="title-text">
                <span>微信商城</span>
              </strong>
              <strong>—</strong>
            </div>
            <div class="QRcode">
              <img src="../../../static/img/login_img_erweima.png" alt="">
            </div>
          </div>
          <div class="loginbtn flex flex-x-center flex-y-center">
            <shop-btn marginR="0" @click.native="toLogin" text="立即登录" height="26px" width="96px" bgcolor="#E5B27F" color="#fff" border="1px #E5B27F"></shop-btn>
          </div>
        </div>
      </div>
    </section>
    <div style="background: #F1F1F1;">
      <template v-if="!isLogin">
        <!--价格走势 -->
        <section class="price-trend min-width">
          <div class="title-wrap flex flex-y-center">
            <div class="title-icon"></div>
            <div class="title-text">
              <p>价格走势</p>
              <span>Price trend</span>
            </div>
          </div>
          <div class="price-trend-content flex">
            <div class="left">
              <div class="market-name">
                <div class="dqwz">当前
                  <br>位置</div>
                <div class="name flex flex-y-center flex-x-center">北环市场</div>
              </div>
              <div class="pro-class">
                <div class="wraper flex">
                  <div class="click-a" v-for="d in categoryList" @click="categoryChange(d.gbgoodsId,'',true)">{{d.name}}</div>
                </div>
              </div>
            </div>
            <div class="right">
              <div id="priceChart"></div>
            </div>
          </div>
        </section>
        <!-- 今日行情-->
        <section class="todaysmarket min-width">
          <div class="title-wrap flex flex-y-center">
            <div class="title-icon"></div>
            <div class="title-text">
              <p>今日行情</p>
              <span>Today's market</span>
            </div>
          </div>
          <div class="todays-table">
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
            <div class="todays-pagination flex flex-x-end">
              <el-pagination background small layout="total,prev, pager, next,jumper" :total="tableDataCount" @current-change="handleCurrentChange"
                :page-size="pageSize">
              </el-pagination>
            </div>
          </div>
        </section>
      </template>
      <!--门店用户登录 -->
      <template v-else>
        <section class="current-store min-width">
          <div class="title-wrap flex flex-y-center">
            <div class="title-icon"></div>
            <div class="title-text">
              <p>当前店铺</p>
              <span>Price trend</span>
            </div>
          </div>
          <div class="page-content">
            <div class="min-width" id="muen-list">
              <ul class="muen-list flex flex-y-center">
                <li class="active">
                  <span @click="channelChangeStore('')">全部店铺</span>
                </li>
                <li v-for="d in channelList">
                  <span @click="channelChangeStore(d.code)">{{d.name}}</span>
                </li>
              </ul>
              <div class="flex flex-y-center" style="padding: 15px 0;">
                <!-- <div style="width: 18px;height: 18px;border: 1px solid #C5C5C5;margin-right: 10px;"></div> -->
                <!-- <div style="font-size: 14px;">收藏和购买过</div> -->
              </div>

              <div class="stores">
                <ul class="store-list" v-if="stores.length>0">
                  <li v-for="d in stores" class="flex">
                    <div class="store-info">
                      <div class="flex">
                        <div class="store-img">
                          <img v-if="d.f_head_pic_url" :src="imgURL+d.f_head_pic_url" alt="">
                          <img v-else src="../../../static/img/my_default_img.png" alt="">
                        </div>
                        <div class="flex-item-4">
                          <div class="store-name">{{d.f_store_name}}</div>
                          <p class="store-mainsell">
                            <span>主营：</span>
                            <template v-for="item,index in d.listCategory">
                              <span v-if="index!=d.listCategory.length-1">{{item.name+'、'}}</span>
                              <span v-else>{{item.name}}</span>
                            </template>
                          </p>
                        </div>
                      </div>
                      <div class="store-pingfen">
                        <shop-btn marginR="0" text="信誉评分：5分" height="22px" width="118px" bgcolor="#FF9873" color="#fff" border="1px #FF9873" fontsize="14px"></shop-btn>
                      </div>
                      <div class="store-text" v-if="d.distatce == 0">距离 -</div>
                      <div class="store-text" v-else-if="d.distatce >= 1">距离 {{d.distatce.toFixed(1)}}km</div>
                      <div class="store-text" v-else>距离 {{(d.distatce*1000).toFixed(0)}}m</div>

                      <div class="store-text">成交 {{d.dealCount}}</div>
                      <div class="store-address flex flex-y-center">
                        <img src="../../../static/img/northring/position.png" alt="">
                        <span>地址：{{d.completeAddress}}</span>
                      </div>
                    </div>

                    <div class="store-products">
                      <template v-if="d.listProSku.length>0">
                        <div :class="d.listProSku.length>=4 ? 'pro-list flex flex-x-between' : 'pro-list flex mr15'">
                          <div class="pro-item" v-for="item in d.listProSku">
                            <div class="pro-img">
                              <img v-if="item.skuPicUrl" :src="imgURL+item.skuPicUrl" alt="">
                              <img v-else src="../../../static/img/my_default_img.png" alt="">
                            </div>
                            <template v-if="!isLogin">
                              <div class="pro-price flex flex-y-center">时价</div>
                            </template>
                            <template v-else>
                              <div class="pro-price flex flex-y-center" v-if="item.promotionPrice>0 && item.promotionBasePrice>0">{{'￥'+item.promotionPrice}}</div>
                              <div class="pro-price flex flex-y-center" v-else>{{'￥'+item.price}}</div>
                            </template>
                            <!-- <div class="pro-price flex flex-y-center">￥1231</div> -->
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class=" flex flex-x-center flex-y-center" style="height: 82%;color: #d1d1d1;">
                          <div>
                            <img src="../../../static/img/my_default_img.png" />
                            <p class="tac">暂无商品</p>
                          </div>
                        </div>
                      </template>


                      <div class="btns flex flex-x-center flex-y-center">
                        <div class="tac flex flex-x-center flex-y-center ">
                          <img src="../../../static/img/northring/icon_phone.png" class="icon" />
                          <div>
                            <p>联系卖家</p>
                            <p>{{d.f_phone_number}}</p>
                          </div>
                        </div>
                        <div style="width: 1px;height: 30px;background: #fff;"></div>
                        <div class="tac flex flex-x-center flex-y-center" @click="toPersonalBuyStore(d.f_seller_id)">
                          <img src="../../../static/img/northring/icon_store.png" class="icon" />
                          <span>进入店铺</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-else class="flex flex-x-center flex-y-center" style="height: 444px;color: #d1d1d1;">
                  <div>
                    <img src="../../../static/img/my_default_img.png" />
                    <p class="tac">暂无数据</p>
                  </div>
                </div>

                <div class="todays-pagination flex flex-x-end">
                  <el-pagination background small layout="total,prev, pager, next,jumper" :total="pageTatol" @current-change="handleCurrentChange"
                    :page-size="pageSize">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>

        </section>
      </template>
      <shop-footer />
    </div>
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
      this.getCategoryList()
      // this.getUserMessage()
      if (!this.isLogin) {
        this.queryMoreProductPrice()
        this.getChannelList()
      } else {
        this.getStoreByChannel()
        this.getChannelList()
      }

    },
    mounted() {
      if (!this.isLogin) {
        this.renderPriceChart()
      }
      $(document).on('click', '#muen-list ul li', function () {
        $(this).addClass('active').siblings().removeClass('active')
      })
    },
    methods: {
      getSellerId() {

      },
      /**
       * 改变渠道
       */
      channelChange(code) {
        this.channelCode = code
        this.queryMoreProductPrice()
        this.renderPriceChart()
      },
      /**
       * 今日行情
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
       * 价格走势
       */
      queryProductPrice() {
        let params = {
          channelCode: this.channelCode,
          productType: this.gbgoodsId || '0',
          startTime: '2018-01-01',
          endTime: '2018-08-30'
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
            text: '热销商品价格走势'
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
      /**
       * 今日行情分页 
       */
      handleCurrentChange(val) {
        this.pageNum = val
        this.queryMoreProductPrice()
      },
      /**
       * 读取消息
       */
      toReadMsg(param) {
        this.$router.push({
          name: 'message',
          query: {
            id: param.id
          }
        })
      },
      /**
       * 个人采购中心RestaurantIndex
       */
      toPersonalBuyCenter() {
        this.$router.push({
          name: 'PersonalBuyCenter'
        })
      },
      /**
       * 餐厅、企事业单位采购配送
       */
      toRestaurantIndex() {
        this.$router.push({
          name: 'RestaurantIndex'
        })
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
       * 进入店铺
       */
      toPersonalBuyStore(sellerId) {
        this.$router.push({
          name: 'PersonalBuyStore',
          query: {
            sellerId: sellerId
          }
        })
      },
      /**
       * 获取店铺
       */
      getStoreByChannel() {
        this.postRequest('store/getStoreByChannel', {
          channelCode: this.channelCode,
          customerProperty: '001',
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then((d) => {
          if (d.data && d.data.state == 0) {
            if (d.data.aaData) {
              this.stores = d.data.aaData
              this.pageTatol = d.data.dataCount
            }
          }
        })
      },
      /**
       * 改变渠道
       */
      channelChangeStore(channelCode) {
        this.channelCode = channelCode
        this.pageNum = 1
        this.getStoreByChannel()
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/store-list.scss';
  #north-index-page {
    .title-wrap {
      padding: 30px 0;
      .title-text {
        color: #474E56;
        p {
          font-size: 24px;
        }
        span {
          font-size: 12px;
        }
      }
      .title-icon {
        width: 38px;
        height: 44px; // border: 3px solid rgba(71, 78, 86, 1);
        background: url(../../../static/img/northring/dbx.png);
        margin-right: 10px;
      }
    }
    .customer-nav {
      ul {
        font-size: 16px;
        li {
          padding: 17px 30px;
          cursor: pointer;
        }
      }
      ul.left {
        li.active {
          color: #FF4400;
          font-weight: bold;
        }
      }
      ul.right {
        color: #999999;
      }
    }
    .banner {
      width: 100%;
      height: 450px;
      background: #FC8833;
      .banner-left {
        width: 240px;
        height: 450px;
        background: #474E56;
        .market-list {
          padding: 37px;
          color: #fff;
          li {
            height: 38px;
          }
          .yuan {
            width: 18px;
            height: 18px;
            background: #fff;
            border-radius: 9px;
            margin-right: 20px;
          }
        }
      }
      .banner-middle {
        width: 800px;
        .banner-img {
          text-align: center;
          padding-top: 30px;
					.img{
						width: 780px;
						height: 450px;
						background: url(../../../static/img/northring/north-banner.png);
					}
        }
      }
      .banner-right {
        width: 150px;
        height: 390px;
        margin-top: 30px;
        background: #fff;
        .title-text {
          padding: 0px 10px;
          color: #934B20;
        }
        .system-bulletin {
          height: 137px;
          border-top: 4px solid #E5B27F;
          ul {
            font-size: 14px;
            padding: 0 10px;
            li {
              margin-bottom: 5px;
              cursor: pointer;
            }
            li:before {
              content: "";
              display: inline-block;
              width: 3px;
              height: 3px;
              background-color: #000;
              border-radius: 50%;
              margin-right: 5px;
              margin-bottom: 4px;
            }
            li:hover {
              color: #FF4400;
              text-decoration: underline;
            }
          }
        }
        .wxshop {
          background: #FFEABB;
          border-top: 1px solid #E5B27F;
          height: 196px;
          .QRcode {
            width: 98px;
            height: 98px;
            img {
              width: 100%;
              height: 100%;
            }
            margin: 0 auto;
          }
        }
        .loginbtn {
          background: #F2D5A4;
          height: 52px;
          .shopbtn {
            border-radius: 14px;
          }
        }
      }
    }
    .price-trend {
      .price-trend-content {
        height: 476px;
        background: #fff;
        .left {
          width: 290px;
          height: 100%;
          .market-name {
            .dqwz {
              font-size: 14px;
              padding: 10px;
            }
            .name {
              width: 180px;
              height: 88px;
              background: #fff;
              color: #772305;
              font-weight: bolder;
              font-size: 24px;
              margin: 56px auto 0;
            }
            height: 276px;
            background: #FF4400;
            color: #fff;
          }
          .pro-class {
            width: calc(100% - 8x);
            height: 192px;
            border: 4px solid #A2A9B2;
            .wraper {
              padding: 20px;
              flex-wrap: wrap;
              .click-a {
                margin-right: 10px;
                margin-bottom: 10px;
              }
            }
          }
        }
        .right {
          width: 900px;
          #priceChart {
            width: 870px;
            height: 446px;
            margin: 15px auto;
          }
        }
      }
    }
    .todaysmarket {
      .todays-pagination {
        padding: 25px 0;
      }
    }
    .data-show-box {
      margin-top: 30px;
      line-height: 30px;
      .date-tiem-span,
      .date-s-span {
        display: inline-block;
        font-size: 20px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 5px;
      }
      .date-tiem-span {
        background: #333;
      }
      .date-s-span {
        background: #fff;
        color: #000;
      }
    }
    .page-content {
      background: #F1F1F1;
      padding-bottom: 50px;
      ul.muen-list {
        background: #fff;
        border: 1px solid #ddd;
        height: 54px;
        font-size: 14px;
        li {
          padding: 0 20px;
          span {
            padding: 2px 10px;
            cursor: pointer;
          }
        }
        li.active {
          span {
            background: #FF4400;
            color: #fff;
          }
        }
      }
    }
    .stores {
      .todays-pagination {
        padding: 20px;
        background: #fff;
        border: 1px solid #ddd;
        margin: 20px 0 0;
      }
    }
  }
</style>
