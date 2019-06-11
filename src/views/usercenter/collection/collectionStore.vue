<template>
  <div id="collectionStore">
    <div class="navbar flex flex-y-center">收藏商家</div>
    <div class="main">
      <div class="status-item flex flex-x-between flex-y-center">
        <span>共{{collectionStores.length}}个商家</span>
        <div>
          <!--<shop-btn width="74px" height="26px" text="批量操作" fontsize="12px" marginR="0"></shop-btn>-->
        </div>
      </div>
      <!--商家列表-->
      <ul class="store-list">
        <li class="flex" v-for="d in collectionStores">
          <div class="store-info">
            <!--<div class="top-btns flex">
							<div class="flex flex-x-center flex-y-center">取消关注</div>
							<div class="flex flex-x-center flex-y-center">置顶</div>
            </div>-->
            <div class="store-logo flex flex-x-center">
              <div>
                <div class="logo">
                  <img v-if="d.storeItem.headPicUrl" :src="imgURL+d.storeItem.headPicUrl">
                  <img v-else src="../../../../static/img/my_default_img.png">
                </div>
                <div class="store-name">
                  <strong>{{d.storeItem.storeName}}</strong>
                </div>
                <div class="pf">
                  <p style="margin: 0 0 10px">信誉等级</p>
                  <div class="flex flex-y-center flex-x-center">
                    <el-rate v-model="d.reputationVal" disabled></el-rate>
                    <span class="score">{{d.reputationLevel}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-btns flex flex-x-center flex-y-center">
              <div class="flex flex-y-center flex-x-center" @click="toProductList1(d)">
                <img src="../../../../static/img/home_icon_shop.png">
                <span>进入店铺</span>
              </div>
              <div>|</div>
              <div class="flex flex-y-center flex-x-center" @click="toContactService">
                <img src="../../../../static/img/home_icon_phone.png">
                <span>联系客服</span>
              </div>
            </div>
          </div>
          <div class="store-products">
            <div class="pagelist flex flex-x-end flex-y-center">
              <div class="flbtns flex">
                <div class="btn active" @click="toProductList1(d)">全部</div>
                <!--<div class="btn ">促销</div>
                <div class="btn ">新品</div>-->
              </div>
              <!--分页-->
              <!--<div class="page-num flex flex-y-center flex-x-between">
								<div class="flex flex-y-center">
									<div class="pagebtn"><span class="cpage">1</span>/30</div>
									<div class="arrowout brn flex flex-x-center flex-y-center">
										<div class="arrow-l"></div>
									</div>
									<div class="arrowout flex flex-x-center flex-y-center">
										<div class="arrow-r"></div>
									</div>
								</div>
              </div>-->
            </div>
            <!--商品-->
            <div class="pro flex" v-if="d.skus.length>0">
              <div class="pro-item" v-for="p in d.skus">
                <div class="pro-img">
                  <img v-if="p.skuPicUrl" :src="imgURL+p.skuPicUrl">
                  <img v-else src="../../../../static/img/my_default_img.png">
                </div>
                <div style="height: 59px" class="flex flex-y-center flex-x-center">
                  <div>
                    <div class="pro-price ellipsis" :title="p.name" style="width:120px">{{p.name}}</div>
                    <div
                      class="pro-price"
                      v-if="p.promotionPrice>0 && p.promotionBasePrice>0"
                    >{{'￥'+p.promotionPrice}}</div>
                    <div class="pro-price" v-else>{{'￥'+p.price}}</div>
                    <div class="flex" v-if="p.promotionPrice < p.price">
                      <div
                        class="flex flex-x-center"
                        style="text-decoration: line-through;width: 100%"
                      >{{'￥'+p.price}}</div>
                      <div class="cuxbg flex flex-y-center flex-x-center">
                        <span>促销</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="addbtn">
                  <shop-btn
                    @click.native="createShippingcarBySku(p)"
                    width="118px"
                    bgcolor="#00C65D"
                    color="#fff"
                    border="1px #00C65D"
                    fontsize="14px"
                    text="加入购物车"
                  ></shop-btn>
                </div>
              </div>
            </div>
            <div
              v-else
              class="flex flex-x-center flex-y-center"
              style="height: 232;color: #d1d1d1;"
            >
              <div>
                <img src="../../../../static/img/my_default_img.png">
                <p class="tac">暂无推荐商品</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="flex flex-x-end">
        <el-pagination
          background
          small
          layout="total,prev, pager, next"
          :total="sellerDataCount"
          @current-change="handleCurrentChange"
          :page-size="sellersPageSize"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ShopTop from "../../components/header.vue";
import ShopFooter from "../../components/footer.vue";
import btn from "../../components/shopbtn.vue";
import { Pagination, Rate } from "element-ui";
import mixin from "../../../utils/mixin.js";
export default {
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [btn.name]: btn,

    // element component
    [Rate.name]: Rate,
    [Pagination.name]: Pagination
  },
  mixins: [mixin],
  data() {
    return {
      sellersPageNum: 1,
      sellersPageSize: 2,
      sellerDataCount: 0
    };
  },
  created() {},
  mounted() {
    // this.getCollectionStores("collectionStore");
    this.getSellerStoreList();
  },
  methods: {
    /**
     * 获取供应商列表店铺信息
     */
    getSellerStoreList() {
      this.postRequest("suppliercollection/queryStoreBySellerId", {
        customerId: this.userInfo.typeCode,
        isCollectionPage: true,
        pageNum: this.sellersPageNum,
        pageSize: this.sellersPageSize
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          if (resp.data.aaData.length > 0) {
            for (let i of resp.data.aaData) {
              if (i.reputation) {
                switch (i.reputation.reputationLevel) {
                  case "A":
                    i.reputationVal = 5;
                    i.reputationLevel = "A";
                    break;
                  case "B":
                    i.reputationVal = 4;
                    i.reputationLevel = "B";
                    break;
                  case "C":
                    i.reputationVal = 3;
                    i.reputationLevel = "C";
                    break;
                  case "D":
                    i.reputationVal = 2;
                    i.reputationLevel = "D";
                    break;
                  default:
                    i.reputationVal = 1;
                    i.reputationLevel = "E";
                    break;
                }
              } else {
                i.reputationVal = 5;
                i.reputationLevel = "A";
              }
            }
          }

          this.collectionStores = resp.data.aaData;
          this.sellerDataCount = resp.data.dataCount;
        }
      });
    },
    /**
     * 分页
     */
    handleCurrentChange(val) {
      this.sellersPageNum = val;
      this.getSellerStoreList();
    },
    /**
     * 继续购物
     */
    toProductList1(d) {
      this.$store.dispatch("setSelecedSeller_AC", {
        sellerId: d.f_seller_id,
        sellerName: d.f_seller_name
      });

      this.$router.push({
        name: "productList",
        query: {
          gbgoodsId: "oftenbuy",
          gbgoodsName: "常买",
          sellerId: d.f_id
        }
      });
    }
  }
};
</script>

<style lang="scss">
#collectionStore {
  ul.store-list {
    padding: 10px 0 20px 0;
    li .store-info:hover .top-btns {
      top: 0;
    }
    li {
      margin-bottom: 20px;
      width: calc(100% - 1px);
      height: 298px;
      border: 1px solid #ddd;
      overflow: hidden;
      .store-products {
        width: 800px;
        .pro {
          height: 232px;
          padding: 0px 20px 0;
          .pro-item:hover .addbtn {
            bottom: 0;
          }
          .pro-item {
            width: 120px;
            height: 100%;
            position: relative;
            overflow: hidden;
            margin-right: 30px;
            .cuxbg {
              position: absolute;
              top: 15px;
              right: 0;
              width: 44px;
              height: 16px;
              color: #fff;
              font-size: 12px;
              background: url(../../../../static/img/img_box.png) no-repeat;
              margin-left: 5px;
              span {
                margin-left: 6px;
              }
            }
            .pro-img {
              width: 100%;
              height: 120px;
              img {
                width: 100%;
                height: 100%;
              }
              margin-top: 15px;
            }
            .pro-price {
              font-size: 14px;
              color: #333;
              // margin: 30px auto 20px;
              text-align: center;
            }
            .addbtn {
              position: absolute;
              bottom: -38px;
              transition: all 0.3s;
              -moz-transition: all 0.3s;
              -webkit-transition: all 0.3s;
              -o-transition: all 0.3s;
            }
          }
        }
        .pagelist {
          padding: 18px 20px;
          .flbtns {
            font-size: 14px;
            .btn {
              width: 60px;
              height: 30px;
              line-height: 30px;
              border: 1px solid #dddddd;
              text-align: center;
              cursor: pointer;
            }
            .btn:not(:last-child) {
              border-right: none;
            }
            .btn.active {
              color: #00c65d;
              border-color: #00c65d;
              border-right: 1px solid #00c65d;
            }
            .btn:first-child.active {
              color: #00c65d;
              border-color: #00c65d;
            }
          }
          .page-num {
            padding: 20px 0;
            strong.title {
              color: #666666;
            }
            .pagebtn {
              margin-right: 20px;
              .cpage {
                color: #00c65d;
              }
            }
            .arrowout {
              cursor: pointer;
              height: 25px;
              width: 48px;
              border: 1px solid #00c65d;
              .arrow-r,
              .arrow-l {
                border-color: #00c65d;
              }
            }
            .arrowout.brn {
              border-right: none;
            }
          }
        }
      }
      .store-info {
        width: 240px;
        height: 100%;
        border-right: 1px solid #ddd;
        position: relative;
        .top-btns {
          width: 100%;
          height: 36px;
          background: rgba(0, 0, 0, 0.7);
          position: absolute;
          top: -36px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s;
          -moz-transition: all 0.3s;
          -webkit-transition: all 0.3s;
          -o-transition: all 0.3s;
          div {
            width: 50%;
            height: 100%;
          }
          div:nth-child(1) {
            border-right: 1px solid #fff;
          }
        }
        .store-logo {
          text-align: center;
          padding-top: 25px;
          .logo {
            width: 60px;
            height: 60px;
            margin: 0 auto;
            border-radius: 100px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .store-name {
            font-size: 16px;
            margin: 20px 0 52px;
          }
          .pf {
            color: #999;
            .el-rate{
              height: 16px;
            }
            .el-rate__icon{
              font-size: 14px;
            }
          }
        }
        .bottom-btns {
          width: 100%;
          height: 42px;
          background: #f9f9f9;
          position: absolute;
          bottom: 0;
          div:nth-child(2) {
            font-size: 20px;
            color: #e3e3e3;
          }
          div:not(:nth-child(2)) {
            width: 49%;
            img {
              margin-right: 7px;
            }
            cursor: pointer;
            height: 100%;
            color: #666;
          }
        }
      }
    }
  }
}
</style>>