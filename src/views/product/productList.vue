<template>
  <div id="productList">
    <shop-header/>
    <shop-search @getSellerId="getSellerId" :isStore="true"/>
    <div class="content">
      <div class="min-width flex flex-x-between">
        <!--商品分类-->
        <div class="left">
          <shop-category @getProByGbgoodsId="getProByGbgoodsId" page="productList" ref="category"/>
        </div>
        <!--商品显示区-->
        <div class="right">
          <!--分页-->
          <div class="page-num flex flex-y-center flex-x-between">
            <strong class="title">{{categoryText}}</strong>
            <div class="flex flex-y-center">
              <template v-if="gbgoodsId == 'oftenbuy'">
                <el-pagination
                  background
                  small
                  layout="total,prev, pager, next"
                  :total="oftenbuyDataCount"
                  @current-change="handleCurrentoftenbuyChange"
                  :page-size="this.oftenbuyPageSize"
                ></el-pagination>
              </template>
              <template v-else>
                <el-pagination
                  background
                  small
                  layout="total,prev, pager, next"
                  :total="productDataCount"
                  @current-change="handleCurrentChange"
                  :page-size="this.pageSize"
                ></el-pagination>
              </template>
            </div>
          </div>
          <!--店铺配送时间工具栏-->
          <div class="store-bar flex flex-y-center">
            <div
              class="status flex flex-y-center flex-x-center"
            >{{storeInfo.distributionToday == 1?'支持当日配送':'次日配送'}}</div>
            <div class="buytime">采购时间{{storeInfo.name}}</div>
          </div>
          <!--常买商品列表-->
          <template v-if="gbgoodsId == 'oftenbuy'">
            <ul class="pro-list flex" id="oftenbuyList" v-if="oftenBuySkuList.length>0">
              <li v-for="d in oftenBuySkuList">
                <div class="item">
                  <div class="pro-img">
                    <img v-if="d.skuPicUrl" :src="imgURL+d.skuPicUrl" preview />
                    <img v-else src="../../../static/img/my_default_img.png" preview />
                  </div>
                  <div class="pro-text">
                    <div class="pro-price flex flex-x-between flex-y-center">
                      <div
                        class="p1"
                        v-if="d.promotionPrice>0 && d.promotionBasePrice>0"
                      >{{'￥'+d.promotionPrice}}</div>
                      <div class="p1" v-else>{{d.price!=0?`${d.price}`:`￥时价`}}</div>
                      <div class="flex" v-if="d.promotionPrice < d.price">
                        <div class="p2">{{'￥'+d.price}}</div>
                        <div class="cuxbg flex flex-y-center flex-x-center">
                          <span>促销</span>
                        </div>
                      </div>
                    </div>
                    <!--商品名&规格名-->
                    <template v-if="d.skuMethodType == 1">
                      <div
                        class="pro-name ellipsis"
                        :title="d.productName+'['+d.skuMeasureName+']'"
                      >{{d.productName+'['+d.skuMeasureName+']'}}</div>
                    </template>
                    <template v-else>
                      <div
                        class="pro-name ellipsis"
                        v-if="d.proMeasureName != d.skuMeasureName"
                      >{{d.productName+'['+d.skuWeight+d.proMeasureName+'/'+d.skuMeasureName+']'}}</div>
                      <div
                        class="pro-name ellipsis"
                        v-else
                      >{{d.productName+'['+d.skuMeasureName+']'}}</div>
                    </template>

                    <div class="pro-ms ellipsis" :title="d.remark">{{d.remark || '暂无描述'}}</div>
                    <div class="pro-ms">计量方式：{{d.skuMethodType == 1 ?'计重':'计件'}}</div>
                    <!--不限制库存规格了-->
                    <!-- <div
                      class="pro-ms"
                    >规格量库存：{{d.stockLimit == '0' ? '充足' : d.canUseQuantity>0 ? d.canUseQuantity/100 : '不足'}}</div>-->
                  </div>
                  <div
                    class="pro-btns flex flex-y-center flex-x-center"
                    @click="createShippingcarBySku(d)"
                  >
                    <img src="../../../static/img/home_icon_shop.png" alt>
                    <span>加入购物车</span>
                  </div>
                </div>
              </li>
            </ul>
            <div
              v-else
              class="flex flex-x-center flex-y-center"
              style="height: 444px;color: #d1d1d1;"
            >
              <div>
                <img src="../../../static/img/my_default_img.png">
                <p class="tac">暂无商品</p>
              </div>
            </div>
          </template>
          <!--商品列表-->
          <template v-else>
            <div v-if="productList.length>0" v-loading="productLoading">
              <ul class="pro-list flex">
                <li v-for="d in productList">
                  <div class="item">
                    <div class="pro-img">
                      <img v-if="d.skuPicUrl" :src="imgURL+d.skuPicUrl" preview />
                      <img v-else-if="d.productPicUrl" :src="imgURL+d.productPicUrl" preview />
                      <img v-else src="../../../static/img/my_default_img.png" preview />
                    </div>
                    <div class="pro-text">
                      <div class="pro-price flex flex-x-between flex-y-center">
                        <div class="p1">
                          <span
                            v-if="d.productMinPrice != d.productMaxPrice"
                          >{{d.productMinPrice==0?`￥时价~${d.productMaxPrice}`:`￥${d.productMinPrice}~${d.productMaxPrice}`}}</span>
                          <span v-else-if="d.price==0">￥时价</span>
                          <span v-else>{{'￥'+d.productMinPrice}}</span>
                        </div>
                        <div class="flex" v-if="d.isPomotion==1">
                          <div
                            class="p2"
                            v-show="d.productMaxPrice <= d.maxPrice"
                          >{{d.maxPrice==0?`￥时价`:`￥${d.maxPrice}`}}</div>
                          <div class="cuxbg flex flex-y-center flex-x-center">
                            <span>促销</span>
                          </div>
                        </div>
                      </div>
                      <div class="pro-name ellipsis" :title="d.name">{{d.name}}</div>
                      <div class="pro-ms ellipsis" :title="d.remark">{{d.remark || '暂无描述'}}</div>
                      <div class="pro-btns flex flex-y-center">
                        <div
                          class="scbtn flex-y-center flex-x-center flex"
                          @click="addShoppingCar(d,'collection')"
                        >
                          <img src="../../../static/img/icon_xingx.png" alt>
                          <span>收藏</span>
                        </div>
                        <div
                          class="addcarbtn flex-y-center flex-x-center flex"
                          @click="addShoppingCar(d)"
                        >
                          <img src="../../../static/img/icon_gouwuche.png" alt>
                          <span>加入购物车</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-else
              class="flex flex-x-center flex-y-center"
              style="height: 444px;color: #d1d1d1;"
              v-loading="productLoading"
            >
              <div>
                <img src="../../../static/img/my_default_img.png">
                <p class="tac">暂无商品</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <shop-footer></shop-footer>
    <shopcar-modal
      v-if="modalShow"
      :modal="modalShow"
      @close="modalClose"
      :params="modalParams"
      @submitShopCar="submitShopCar"
    ></shopcar-modal>
    <!--加入购物车成功弹出窗-->
    <el-dialog title="添加成功" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
      <shopcar-sumodal @toShoppingCar="toShoppingCar" @closeSuccessModal="closeSuccessModal"></shopcar-sumodal>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ShopTop from "../components/header.vue";
import ShopFooter from "../components/footer.vue";
import Category from "../components/category.vue";
import Search from "../components/search.vue";
import shopcarModal from "./addShopCarModal.vue";
import shopcarSuModal from "./addCarSuccessModal.vue";
import { Badge, Dialog, Select, Option, Pagination, Tooltip } from "element-ui";

import mixin from "../../utils/mixin.js";

export default {
  mixins: [mixin],
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [shopcarModal.name]: shopcarModal,
    [shopcarSuModal.name]: shopcarSuModal,
    [Search.name]: Search,

    [Badge.name]: Badge,
    [Dialog.name]: Dialog,
    [Category.name]: Category,
    [Select.name]: Select,
    [Option.name]: Option,
    [Pagination.name]: Pagination,
    [Tooltip.name]: Tooltip
  },
  data() {
    return {
      dialogTableVisible: false,
      categoryText: "常买商品",
      storeInfo: {},
      oftenbuyPageNum: 1,
      oftenbuyPageSize: 8,
      // 常买商品列表
      oftenBuySkuList: [],
      oftenbuyDataCount: 0,
      productLoading: false
    };
  },
  created() {
    this.gbgoodsId = this.$route.query.gbgoodsId;
    //       this.sellerId = this.$store.getters.selecedSellerInfo.sellerId
    //       this.getProductList()
  },
  mounted() {},
  methods: {
    /**
     * 点击分类获取商品
     */
    getProByGbgoodsId(gbgoodsId, categoryText) {
      this.categoryText = categoryText;
      this.gbgoodsId = gbgoodsId;
      if (gbgoodsId == "oftenbuy") {
        this.oftenbuyPageNum = 1;
        if (this.sellerId) {
          this.getSkuByOftenBuy();
        }
      } else {
        this.pageNum = 1;
        if (this.sellerId) {
          this.getProductList();
        }
      }
    },
    /**
     * 获取常买商品
     */
    getSkuByOftenBuy() {
      this.postRequest("productsku/getSkuByOftenBuy", {
        code: "",
        purchaserId: this.userInfo.typeCode,
        supplierId: this.sellerId,
        keyWord: "",
        pageNum: this.oftenbuyPageNum,
        pageSize: this.oftenbuyPageSize
      }).then(resp => {
        if (resp && resp.data && resp.data.state == 0) {
          this.oftenBuySkuList = resp.data.aaData;
          this.oftenbuyDataCount = resp.data.dataCount;
        }
      });
    },
    /**
     * 选择商品规格
     */
    addShoppingCar(d, type) {
      //         if (type == 'collection') {
      //           this.postRequest('productsku/getSkuByQuotation', {
      //             productId: d.id,
      //             purchaserId: this.userInfo.typeCode,
      //             supplierId: this.sellerId,
      //             buyerId: this.userInfo.typeCode
      //           }).then(resp => {
      //             if (resp.data && resp.data.state == 0) {
      //               for (var i in resp.data.aaData) {
      //                 //								this.createProductcollection(resp.data.aaData[i])
      //                 // console.log(resp.data.aaData[i].isCollection)
      //               }
      //             }
      //           })
      //         }

      var param = {
        productId: d.id,
        sellerId: this.sellerId,
        sellerName: this.sellerName,
        type: type
      };
      if (this.sellerId == "") {
        param.sellerId = d.customerId;
        param.sellerName = d.createdPersonName;
        param.type = "search";
      }

      this.modalEdit(param);
    },
    /**
     * 提交购物车
     */
    submitShopCar() {
      this.modalClose();
      this.dialogTableVisible = true;
    },
    /**
     * 添加成功提示框跳转购物车
     */
    toShoppingCar() {
      this.$router.push({
        name: "shoppingCar"
      });
    },
    /**
     * 关闭继续购物
     */
    closeSuccessModal() {
      this.dialogTableVisible = false;
    },
    /**
     * 获取id
     */
    getSellerId(params) {
      this.sellerId = params.sellerId;
      if (params.sellerId) {
        this.getProductList();
        this.getSkuByOftenBuy();
        this.$refs.category.getCategoryListSaveLocal(params.sellerId);
        //获取店铺
        this.getStore(params.sellerId, d => {
          this.storeInfo = d;
          $(".buytime").html(
            `采购时间${d.distributionStart}:00-${d.distributionEnd}:00`
          );
        });
      }
    },
    /**
     * 常买商品分页
     */
    handleCurrentoftenbuyChange(val) {
      this.oftenbuyPageNum = val;
      this.getSkuByOftenBuy();
    },
    /**
     * 商品分页
     */
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getProductList();
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/productList.scss";
#productList {
  ul {
    li {
      position: relative;
      .cuxbg {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  #oftenbuyList {
    li {
      height: 321px;
    }
    .pro-ms {
      margin-top: 5px;
    }
    .item .pro-btns {
      border: none;
      border-radius: 0;
      background: #f9f9f9;
      color: #666;
      height: 36px;
      width: 100%;
      margin-top: 12px;
      img {
        margin-right: 7px;
      }
    }
  }
}
</style>
