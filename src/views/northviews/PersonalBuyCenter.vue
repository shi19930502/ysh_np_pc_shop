<template>
  <div id="personalBuyCenter">
    <shop-header />
    <shop-search @getSellerId="getSellerId" :isStore="true" :showClassify="false" />

    <section class="page-title min-width flex flex-x-between flex-y-end">
      <shop-btn marginR="0" text="个人采购中心" height="32px" width="238px" bgcolor="#CD0011" color="#fff" border="1px #CD0011"></shop-btn>
      <ul class="flex right">
        <li class="click-a">用户须知</li>
        <li class="click-a">客户登记</li>
      </ul>
    </section>
    <div class="page-content">
      <div class="min-width" id="muen-list">
        <ul class="muen-list flex flex-y-center">
          <li class="active">
            <span @click="channelChange('')">全部店铺</span>
          </li>
          <li v-for="d in channelList">
            <span @click="channelChange(d.code)">{{d.name}}</span>
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
    <shop-footer />
  </div>
</template>

<script>
  import ShopTop from '../components/header.vue'
  import ShopFooter from '../components/footer.vue'
  import Search from '../components/search.vue'
  import btn from '../components/shopbtn.vue'

  import {
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
      [Pagination.name]: Pagination,
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 5,
        pageTatol: 0,
        // 门店客户类型004
        customerProperty: '004',
        stores: []
      }
    },
    created() {
      this.getStoreByChannel()
      this.getChannelList()
    },
    mounted() {
      $(document).on('click', '#muen-list ul li', function () {
        $(this).addClass('active').siblings().removeClass('active')
      })
    },
    methods: {
      getSellerId() {

      },
      /**
       * 分页 
       */
      handleCurrentChange(val) {
        this.pageNum = val
        this.getStoreByChannel()
      },
      /**
       * 获取店铺
       */
      async getStoreByChannel() {
				let param = {
					channelCode: this.channelCode,
					customerProperty: this.customerProperty,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}
        if (this.userInfo) {
          let AddressInfo = await this.getUserAddressInfo()
					if(AddressInfo){
						param.latitude = AddressInfo.latitude
						param.longitude = AddressInfo.longitude
					}
        }
        
        this.postRequest('store/getStoreByChannel', param).then((d) => {
          if (d.data && d.data.state == 0) {
            if (d.data.aaData) {
              this.stores = d.data.aaData
              this.pageTatol = d.data.dataCount
            }
          }
        })
      },
      /**
       * 获取登录人地址信息
       */
      getUserAddressInfo() {
        return new Promise((resolve, reject) => {
          this.postRequest('address/queryByCustomerId', {
            customerId: this.userInfo.typeCode
          }).then((d) => {
            if (d.data && d.data.state == 0) {
              resolve(d.data.aaData)
            }
          })
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
       * 改变渠道
       */
      channelChange(channelCode) {
        this.channelCode = channelCode
        this.pageNum = 1
        this.getStoreByChannel()
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/store-list.scss';
  #personalBuyCenter {
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

    .page-content {
      background: #F1F1F1;
      padding-bottom: 50px;
      padding-top: 25px;
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
