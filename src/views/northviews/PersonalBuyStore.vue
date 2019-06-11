<template>
  <div id="PersonalBuyStore">
    <shop-header />

    <shop-search @getSellerId="getSellerId" :isStore="true" :showClassify="false" />
    <!--店铺信息 -->
    <div class="page-content">
      <div class="store-info min-width flex flex-x-between">
        <div class="flex flex-y-center">
          <div class="store-name">
            <strong>{{storeInfo.storeName}}</strong>
          </div>
          <div style="width: 1px; height: 30px;background: #DFDFDF;"></div>
          <div class="store-pingfen flex flex-y-center">
            <span>信用等级：</span>
            <el-rate v-model="storeInfo.reputationVal" disabled></el-rate>
            <span style="color: #FF541F;">{{storeInfo.reputationLevel}}</span>
          </div>
          <!-- <div style="width: 1px; height: 30px;background: #DFDFDF;"></div>
          <div class="store-mainsell">
            <p>主营产品：[xxx、xxxx、xxx、xxxxx]</p>
          </div> -->
        </div>
        <div class="flex flex-y-center">
          <div class="critem flex flex-y-center">
            <img src="../../../static/img/home_icon_phone.png" class="icon" />
            <span>联系卖家：{{storeInfo.phoneNumber}}</span>
          </div>
          <div class="critem flex flex-y-center">
            <!-- <i class="el-icon-star-on"></i> -->
            <img src="../../../static/img/home_icon_shoucang.png" class="icon" />
            <span>收藏店铺</span>
          </div>
        </div>
      </div>
      <section class="market-name flex flex-x-center flex-y-center">{{storeInfo.storeName}}</section>

      <!-- 商品列表 -->
      <section class="pro-list min-width flex flex-x-between">
        <div class="left">
          <div class="store-title flex flex-x-center flex-y-center">店铺商品分类</div>
          <!-- 商品分类 -->
          <div id="category" v-loading="categoryLoading">
            <ul v-if="categoryList.length>0">
              <li class="active" @click="categoryChange('','全部商品')">
                <div class="flex flex-x-between flex-y-center listem">
                  <div class="flex flex-y-center">
                    <strong>全部商品</strong>
                  </div>
                </div>
              </li>
              <li v-for="d in categoryList" @click="categoryChange(d.gbgoodsId,d.name)">
                <div class="flex flex-x-between flex-y-center listem">
                  <div class="flex flex-y-center">
                    <strong>{{d.name}}</strong>
                  </div>
                  <div class="arrow-r" v-if="d.childList"></div>
                </div>
                <div class="fenlist flex" v-if="d.childList">
                  <div v-for="item,index in d.childList">
                    <span @click="categoryChange(item.gbgoodsId,item.name)">{{item.name}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <!--分页-->
          <div class="page-num flex flex-y-center flex-x-between">
            <strong class="title">{{categoryText}}</strong>
            <div class="flex flex-y-center">
              <template v-if="gbgoodsId == 'oftenbuy'">
                <el-pagination background small layout="total,prev, pager, next" :total="oftenbuyDataCount" @current-change="handleCurrentoftenbuyChange"
                  :page-size="this.oftenbuyPageSize">
                </el-pagination>
              </template>
              <template v-else>
                <el-pagination background small layout="total,prev, pager, next" :total="productDataCount" @current-change="handleCurrentChange"
                  :page-size="this.pageSize">
                </el-pagination>
              </template>
            </div>
          </div>
          <div class="pro-list-wrapper">
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
                        <span v-if="d.productMinPrice != d.productMaxPrice">{{'￥'+d.productMinPrice+'~'+d.productMaxPrice}}</span>
                        <span v-else>{{'￥'+d.price}}</span>
                      </div>
                      <div class="flex" v-if="d.isPomotion==1">
                        <div class="p2">{{'￥'+d.price}}</div>
                        <div class="cuxbg flex flex-y-center flex-x-center">
                          <span>促销</span>
                        </div>
                      </div>
                    </div>
                    <div class="pro-name ellipsis">{{d.name}}</div>
                    <div class="pro-ms ellipsis" :title="d.remark">{{d.remark || '暂无描述'}}</div>
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
            <div v-else class=" flex flex-x-center flex-y-center" style="height: 444px;color: #d1d1d1;">
              <div>
                <img src="../../../static/img/my_default_img.png" />
                <p class="tac">暂无商品</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
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
    Dialog
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
    },
    data() {
      return {
        dialogTableVisible: false,
        categoryText: '全部商品',
        storeInfo: {},
      }
    },
    created() {
      if (this.$route.query.sellerId) {
        this.sellerId = this.$route.query.sellerId
        this.getCategoryList(this.$route.query.sellerId)
        this.setStoreInfo(this.$route.query.sellerId)
        this.getProductList()
      }
    },
    mounted() {
      $(document).on('click', '#category ul li', function () {
        $(this).addClass('active').siblings().removeClass('active')
      })
    },
    methods: {
      /**
       * 商品分页 
       */
      handleCurrentChange(val) {
        this.pageNum = val
        this.getProductList()
      },
      getSellerId() {

      },
      async setStoreInfo(sellerId) {
        let storeInfo = await this.getStoreInfoById(sellerId)
        let Reputation = await this.getStoreReputation(sellerId)
        this.storeInfo = Object.assign(storeInfo, Reputation)
      },
      /**
       * 获取店铺信息
       */
      getStoreInfoById(sellerId) {
        return new Promise((resolve, reject) => {
          this.postRequest('store/queryBySellerId', {
            sellerId: sellerId
          }).then(resp => {
            if (resp.data && resp.data.state == 0) {
              if (resp.data.aaData) {
                resolve(resp.data.aaData)
              }
            }
          })
        })
      },
      /**
       * 获取客户信息
       */
      getSellerInfoById(sellerId) {
        return new Promise((resolve, reject) => {
          this.postRequest('customer/selectById', {
            sellerId: sellerId
          }).then(resp => {
            if (resp.data && resp.data.state == 0) {
              if (resp.data.aaData) {
                resolve(resp.data.aaData)
              }
            }
          })
        })
      },
      /**
       * 获取店铺信用等级
       */
      getStoreReputation(sellerId) {
        return new Promise((resolve, reject) => {
          this.postRequest('reputation/list', {
            customerId: sellerId
          }).then(resp => {
            if (resp.data && resp.data.state == 0) {
              let o = {}
              if (resp.data.aaData.length > 0) {
                switch (resp.data.aaData[0].reputationLevel) {
                  case 'A':
                    o.reputationVal = 5
                    o.reputationLevel = 'A'
                    break;
                  case 'B':
                    o.reputationVal = 4
                    o.reputationLevel = 'B'
                    break;
                  case 'C':
                    o.reputationVal = 3
                    o.reputationLevel = 'C'
                    break;
                  case 'D':
                    o.reputationVal = 2
                    o.reputationLevel = 'D'
                    break;
                  default:
                    this.reputationVal = 1
                    this.reputationLevel = 'E'
                    break;
                }
              } else {
                o.reputationVal = 5
                o.reputationLevel = 'A'
              }
              resolve(o)
            }
          })
        })
      },
      /**
       * 选择商品规格
       */
      addShoppingCar(d, type) {

        if (type == 'collection') {
          this.postRequest('productsku/getSkuByQuotation', {
            productId: d.id,
            purchaserId: this.userInfo.typeCode,
            supplierId: this.sellerId,
            buyerId: this.userInfo.typeCode
          }).then(resp => {
            if (resp.data && resp.data.state == 0) {
              for (var i in resp.data.aaData) {
                //								this.createProductcollection(resp.data.aaData[i])
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
          param.type = 'search'
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
    }
  }
</script>

<style lang="scss">
  @import './styles/store-list.scss';
  @import './styles/category.scss';

  #PersonalBuyStore {
    .el-rate {
      height: 15px;
    }
    .el-rate__icon {
      font-size: 12px;
    }
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
      .store-info {
        font-size: 14px;
        height: 60px;
        background: #F1F1F1;
        .store-name,
        .store-pingfen,
        .store-mainsell {
          padding: 0 15px;
        }
        .critem {
          padding: 0 10px;
          img {
            margin-right: 10px;
          }
        }
      }
      .market-name {
        width: 100%;
        height: 100px;
        background: url(../../../static/img/northring/marketnamebg.png);
        font-size: 50px;
        font-weight: bolder;
        color: #fff;
      }
      .pro-list {
        margin-top: 10px;
        .left {
          width: 230px;
          .store-title {
            height: 46px;
            background: #CD0011;
            color: #fff;
          }
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
        .right {
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
      background: #F1F1F1;
      padding-bottom: 50px;
    }
  }
</style>
