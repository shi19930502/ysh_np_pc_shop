<template>
  <div id="index-page">
    <shop-header/>
    <shop-search @getSellerId="getSellerId" :isStore="true"/>

    <!--主体-->
    <section class="shop-content">
      <div class="shop-product flex flex-x-between min-width">
        <div class="left">
          <shop-category ref="category"/>
        </div>
        <div class="center">
          <div class="banner">
            <img v-show="cityName=='ysh'" src="../../static/img/banner.png">
          </div>
          <div class="slogan">
            <ul class="flex flex-x-between flex-y-center">
              <li>
                <img src="../../static/img/icon_baozheng.png">
                <div>食品安全保障</div>
              </li>
              <li>
                <img src="../../static/img/icon-wuliu.png">
                <div>专业物流配送</div>
              </li>
              <li>
                <img src="../../static/img/iconz-xiadan.png">
                <div>便捷在线下单</div>
              </li>
              <li>
                <img src="../../static/img/icon-zhineng.png">
                <div>智能硬件支持</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="system-bulletin">
            <div class="flex flex-x-center" style="padding: 20px; 0">
              <strong>—</strong>
              <strong class="title-text">
                <span>系统</span>
                <span style="color: #00C65D;">公告</span>
              </strong>
              <strong>—</strong>
            </div>
            <ul v-if="megList.length>0">
              <li class="ellipsis" v-for="d in megList" @click="toReadMsg(d)">{{d.f_title}}</li>
            </ul>
            <div v-else class="tac">暂无公告</div>
          </div>
          <div class="new-order">
            <div class="flex flex-x-center" style="padding: 20px 0 10px">
              <strong>—</strong>
              <strong class="title-text">最新订单</strong>
              <strong>—</strong>
            </div>
            <template v-if="newestOrder.sellerName">
              <div class="store-name">{{newestOrder.sellerName}}</div>
              <div class="pro" v-if="newestOrder.orderitemList">
                <p class="pro-status">
                  <strong>{{newestOrder.orderStatusName}}</strong>
                </p>
                <img
                  v-if="newestOrder.orderitemList[0].productPicUrl"
                  :src="imgURL+newestOrder.orderitemList[0].productPicUrl"
                >
                <img v-else src="../../static/img/my_default_img.png">
                <p class="pro-name">{{newestOrder.orderitemList[0].productName}}</p>
                <p class="pro-price">{{'￥'+priceFormat(newestOrder.orderitemList[0].price)}}</p>
              </div>
              <div
                v-if="newestOrder.inspectedOrderTotal"
                class="price"
              >总计:{{'￥'+priceFormat(newestOrder.inspectedOrderTotal)}}</div>
              <div
                v-else-if="newestOrder.sortingOrderTotal"
                class="price"
              >总计:{{'￥'+priceFormat(newestOrder.sortingOrderTotal)}}</div>
              <div v-else class="price">总计:{{'￥'+priceFormat(newestOrder.orderTotal)}}</div>
              <div
                class="enterbtn"
                @click="findOrderDetails(newestOrder.id,newestOrder.orderUmber)"
              >进入></div>
            </template>
            <div v-else>暂无订单</div>
          </div>
        </div>
        <div class="yezi"></div>
      </div>
    </section>
    <!--促销活动-->
    <section class="sales" v-show="activeList.length>0">
      <div class="bg">
        <div class="saleswrap min-width">
          <div class="sales-nav">
            <ul class="flex flex-y-center">
              <li>
                <img src="../../static/img/cxhd.png">
              </li>
              <!-- <template v-for="d in activeList">
                <li class="ellipsis" :title="d.promotionTitle">{{d.promotionTitle}}</li>
              </template>-->
            </ul>
          </div>
          <div class="sales-content">
            <div class="head">
              <div class="sales-list">
                <ul class="flex flex-y-center">
                  <template v-for="d,index in activeList">
                    <li
                      @click="changeActivePro(d)"
                      :class="d.active ? 'active flex flex-y-center':'flex flex-y-center'"
                    >
                      <!-- <div class="radio-box"></div> -->
                      <div>
                        <p class="ellipsis" :title="d.promotionTitle">{{d.promotionTitle}}</p>
                        <p
                          class="ellipsis"
                          :title="d.promotionComment"
                          v-if="d.promotionComment"
                        >{{d.promotionComment}}</p>
                        <p>{{d.endDate.split(' ')[0]+'结束'}}</p>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
              <div class="djsbg">
                <div class="tips">距离活动结束还有</div>
                <div class="data-show-box">
                  <span class="date-tiem-span d">{{djs_d}}</span>天
                  <span class="date-tiem-span h">{{djs_h}}</span>时
                  <span class="date-tiem-span m">{{djs_m}}</span>分
                  <span class="date-s-span s">{{djs_s}}</span>秒
                </div>
              </div>
            </div>
            <div class="body">
              <ul class="prolist flex" v-if="ActiveProduct.length>0">
                <li v-for="d in ActiveProduct">
                  <div class="item">
                    <div class="pro-price flex flex-x-center flex-y-center">
                      <p class="p1">{{d.skuPriceTemp ==0?`￥时价`:`￥${d.skuPriceTemp}`}}</p>
                      <p class="p2" v-show="d.price>d.skuPriceTemp">{{'￥'+d.price}}</p>
                    </div>
                    <div class="pro-img">
                      <img v-if="d.skuPicUrl" :src="imgURL+d.skuPicUrl">
                      <img v-else src="../../static/img/my_default_img.png">
                    </div>
                    <div class="pro-name">{{d.name}}</div>
                    <div
                      class="btn flex flex-y-center flex-x-center"
                      @click="createShippingcarBySku(d)"
                    >加入购物车</div>
                  </div>
                </li>
              </ul>
              <div v-else class="noactive flex flex-y-center flex-x-center" style="color: #d1d1d1;">
                <div>
                  <img src="../../static/img/my_default_img.png">
                  <p>暂无活动商品</p>
                </div>
              </div>
              <!--fenye-->
              <div class="flex flex-x-center">
                <ul class="pagelist flex">
                  <li
                    v-for="d,index in ActivePageTotal"
                    :class="index == 0 ? 'active' : ''"
                    @click="getActivePageNum(d)"
                  ></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--新品上市-->
    <section class="newproduct">
      <div class="wraper min-width">
        <div class="title"></div>
        <div class="content">
          <div class="logo flex flex-y-center flex-x-center">
            <img v-show="cityName=='ysh'" src="../../static/img/xpss_name_small.png">
            <strong>每日准时更新</strong>
          </div>
          <ul
            :class="NewUpProduct.length>3?'flex flex-x-between':'flex flex-x-center'"
            v-if="NewUpProduct.length>0"
          >
            <li v-for="d in NewUpProduct" :style="NewUpProduct.length>3?'':'margin-right:10px'">
              <div class="item">
                <div class="pro-img-bg">
                  <div class="pro-img flex flex-x-center flex-y-center">
                    <img v-if="d.skuPicUrl" :src="imgURL+d.skuPicUrl">
                    <img v-else src="../../static/img/my_default_img.png">
                  </div>
                  <div class="pro-price-bg">
                    <p class="flex flex-y-center flex-x-center">
                      <span v-if="d.price == 0">￥时价</span>
                      <span v-else>{{'￥'+d.price}}</span>
                    </p>
                    <p class="flex flex-y-center flex-x-center">/{{d.skuMeasureName}}</p>
                  </div>
                </div>
                <div
                  class="pro-name ellipsis word-wrap tac"
                  :title="d.productName+'['+d.name+']'"
                >{{d.productName+'['+d.name+']'}}</div>
                <div class="pro-time">上架时间：{{d.lastModifyTime}}</div>
                <div class="pro-ms">{{d.storeName}}</div>
              </div>
              <div class="add-btn" @click="createShippingcarBySku(d)">加入购物车</div>
            </li>
          </ul>
          <div
            v-else
            class="flex flex-x-center flex-y-center"
            style="height: 500px;color: #d1d1d1;"
          >
            <div>
              <img src="../../static/img/my_default_img.png">
              <p class="tac">暂无商品</p>
            </div>
          </div>
          <div class="shucai"></div>
          <div class="doujiapo"></div>
        </div>
      </div>
    </section>
    <!--收藏商家-->
    <section class="collection min-width">
      <div class="title"></div>
      <ul :class="sellerList.length<3?'content flex flex-x-center': 'content flex flex-x-start'">
        <li v-for="d in sellerList" v-if="d.storeItem">
          <div class="telicon">
            <img src="../../static/img/scsj_icon-lxsj.png">
          </div>
          <div>
            <strong>联系商家:{{d.storeItem.phoneNumber}}</strong>
          </div>
          <div class="store flex flex-y-center">
            <div class="store-img">
              <img v-if="d.storeItem.headPicUrl" :src="imgURL+d.storeItem.headPicUrl">
              <img v-else src="../../static/img/my_default_img.png">
            </div>
            <div>
              <div class="store-name ellipsis">{{d.storeItem.storeName}}</div>
              <div
                class="status flex flex-y-center flex-x-center"
              >{{d.storeItem.distributionToday == 1?'支持当日配送':'次日配送'}}</div>
              <div
                class="store-time"
              >配送时间:{{d.storeItem.distributionStart+':00-'+d.storeItem.distributionEnd+':00'}}</div>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <shop-footer/>
  </div>
</template>

<script>
import ShopTop from "./components/header.vue";
import ShopFooter from "./components/footer.vue";
import Category from "./components/category.vue";
import Search from "./components/search.vue";
import "../utils/leftTime.min.js";
import { Badge, Select, Option } from "element-ui";

import mixin from "../utils/mixin.js";
export default {
  mixins: [mixin],
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,

    [Category.name]: Category,
    [Search.name]: Search,

    [Badge.name]: Badge,
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      sellerList: [],
      newestOrder: {},
      NewUpProduct: [],
      sellerId: "",
      ActiveProduct: [],
      ActiveCount: 0,
      ActivePageTotal: 0,
      ActivePageNum: 1,
      activeList: [],
      djs_s: "00",
      djs_m: "00",
      djs_h: "00",
      djs_d: "00",
      active_endTime: "",
      clearTime: null
    };
  },
  created() {
    this.getUserMessage();
    this.getnewestOrder();
    // this.getCollectionStores();
    this.getSellerStoreList();
    // this.getNewUpProduct();
  },
  mounted() {
    // 活动商品分页
    $(document).on("click", ".pagelist li", function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
  },
  methods: {
    /**
     * 获取供应商列表店铺信息
     */
    getSellerStoreList() {
      this.postRequest("suppliercollection/queryStoreBySellerId", {
        customerId: this.userInfo.typeCode
        // pageNum: this.sellersPageNum,
        // pageSize: this.sellersPageSize
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          this.sellerList = resp.data.aaData;
        }
      });
    },
    /**
     * 查看订单详情
     */
    findOrderDetails(orderId, orderUmber) {
      this.$router.push({
        name: "orderDetails",
        query: {
          orderId: orderId,
          orderUmber: orderUmber
        }
      });
    },
    /**
     * 最新采购
     */
    getnewestOrder() {
      this.postRequest("order/listByUser", {
        pageNum: 1,
        pageSize: 5,
        orderField: "f_created_date desc"
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          if (resp.data.aaData.length > 0) {
            this.newestOrder = resp.data.aaData[0];
            if (this.newestOrder.orderitemList) {
              this.newestOrder.sl = this.newestOrder.orderitemList.length;
            }
          }
        }
      });
    },
    /**
     * 获取促销商品
     */
    getActiveProduct() {
      this.postRequest("productsku/getSkuByPromotion", {
        purchaserId: this.userInfo.typeCode,
        supplierId: this.sellerId,
        pageNum: this.ActivePageNum,
        pageSize: 5,
        promotionId: this.promotionId
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          this.ActiveProduct = resp.data.aaData;
          this.ActiveCount = resp.data.dataCount;
          this.ActivePageTotal = Math.ceil(resp.data.dataCount / 5);
        }
      });
    },
    /**
     * 获取最新上架
     */
    getNewUpProduct(seller) {
      this.postRequest("productsku/getSkuByQuotation", {
        pageNum: 1,
        pageSize: 4,
        purchaserId: this.userInfo.typeCode,
        supplierId: seller.sellerId,
        orderField: "f_created_date"
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          for (let o of resp.data.aaData) {
            o.storeName = seller.storeName;
          }
          this.NewUpProduct = resp.data.aaData;
        }
      });
    },
    /**
     * 获取id
     */
    getSellerId(params) {
      this.sellerId = params.sellerId;
      this.$refs.category.getCategoryListSaveLocal(this.sellerId);
      window.clearInterval(this.clearTime);
      this.getPromotionList(this.sellerId);
      this.getNewUpProduct(params);
    },
    /**
     * 获取促销活动
     */
    getPromotionList(sellerId) {
      this.postRequest("promotion/queryListByBuyerId", {
        pageNum: 1,
        pageSize: 4,
        sellerId: sellerId,
        buyerId: this.userInfo.typeCode
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          if (resp.data.aaData.length > 0) {
            for (var i in resp.data.aaData) {
              if (i == 0) {
                resp.data.aaData[i].active = true;
              } else {
                resp.data.aaData[i].active = false;
              }
            }

            this.activeList = resp.data.aaData;
            setTimeout(() => {
              this.promotionId = this.activeList[0].id;
              this.getActiveProduct();
            }, 100);

            this.active_endTime = this.activeList[0].endDate.replace(/-/g, "/");
            var data = {
              startdate: this.activeList[0].startDate.replace(/-/g, "/"),
              enddate: this.active_endTime
            };
            // 倒计时
            this.clearTime = $.leftTime(data, d => {
              if (d.status) {
                this.djs_s = d.s;
                this.djs_m = d.m;
                this.djs_h = d.h;
                this.djs_d = d.d;
              }
            });
          }
        }
      });
    },
    /**
     * 切换促销活动
     */
    changeActivePro(d) {
      window.clearInterval(this.clearTime);

      for (var i of this.activeList) {
        i.active = false;
      }
      if (!d.active) {
        d.active = true;
      }
      this.promotionId = d.id;
      this.getActiveProduct();

      this.active_endTime = d.endDate.replace(/-/g, "/");

      // 倒计时
      this.clearTime = $.leftTime(this.active_endTime, d => {
        if (d.status) {
          this.djs_s = d.s;
          this.djs_m = d.m;
          this.djs_h = d.h;
          this.djs_d = d.d;
        }
      });
    },
    /**
     * 促销活动分页
     */
    getActivePageNum(d) {
      this.ActivePageNum = d;
      this.getActiveProduct();
    },
    /**
     * 读取消息
     */
    toReadMsg(param) {
      this.$router.push({
        name: "message",
        query: {
          id: param.f_id
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/index.scss";
.data-show-box {
  line-height: 40px;
  .date-tiem-span,
  .date-s-span {
    display: inline-block;
    font-size: 20px;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
  }
  .date-tiem-span {
    background: #333;
  }
  .date-s-span {
    background: #f00;
  }
}
</style>
