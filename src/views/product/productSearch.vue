<template>
  <div id="productList">
    <shop-header/>
    <shop-search @getSellerId="getSellerId" :isStore="true" @getSearchProList="getSearchProList"/>
    <div class="content">
      <div class="min-width flex flex-x-between">
        <!--商品显示区-->
        <div class="right" style="width: 100%;">
          <!--分页-->
          <div class="page-num flex flex-y-center flex-x-between">
            <strong class="title">搜索结果</strong>
            <div class="flex flex-y-center">
              <el-pagination
                background
                small
                layout="total,prev, pager, next"
                :total="productDataCount"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </div>
          </div>
          <!--店铺配送时间工具栏-->
          <!-- <div class="store-bar flex flex-y-center">
            <div
              class="status flex flex-y-center flex-x-center"
            >{{storeInfo.distributionToday == 1?'支持当日配送':'次日配送'}}</div>
            <div class="buytime">配送时间{{storeInfo.name}}</div>
          </div> -->
          <!--商品列表-->
          <div v-loading="loading" v-if="productList.length>0">
            <ul class="pro-list flex" id="searchList">
              <li v-for="d in productList" style="height: 316px;">
                <div class="item">
                  <div class="pro-img">
                    <img v-if="d.skuPicUrl" :src="imgURL+d.skuPicUrl" preview />
                    <img v-else-if="d.productPicUrl" :src="imgURL+d.productPicUrl" preview />
                    <img v-else src="../../../static/img/my_default_img.png" preview />
                  </div>
                  <div class="pro-text">
                    <div class="pro-price flex flex-x-between flex-y-center">
                      <!--<div class="p1">{{'￥'+d.productMinPrice}}</div>-->
                      <div class="p1">
                        <span
                          v-if="d.productMinPrice != d.productMaxPrice"
                        >{{d.productMinPrice==0?`￥时价~${d.productMaxPrice}`:`￥${d.productMinPrice}~${d.productMaxPrice}`}}</span>
                        <span v-else-if="d.price==0">￥时价</span>
                        <span v-else>{{'￥'+d.productMinPrice}}</span>
                      </div>
                      <div class="flex" v-if="d.isPomotion==1">
                        <div class="p2">{{'￥'+d.maxPrice}}</div>
                        <div class="cuxbg flex flex-y-center flex-x-center">
                          <span>促销</span>
                        </div>
                      </div>
                    </div>
                    <div class="pro-name ellipsis" :title="d.name">{{d.name}}</div>
                    <div class="pro-ms ellipsis" :title="d.remark">{{d.remark || '暂无描述'}}</div>
                    <div class="pro-ms ellipsis">{{d.createdPersonName}}</div>

                    <div class="pro-btns flex flex-y-center">
                      <div
                        class="scbtn flex-y-center flex-x-center flex"
                        @click="addShoppingCar(d,'collection',true)"
                      >
                        <img src="../../../static/img/icon_xingx.png" alt>
                        <span>收藏</span>
                      </div>
                      <div
                        class="addcarbtn flex-y-center flex-x-center flex"
                        @click="addShoppingCar(d,'search',true)"
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
            v-loading="loading"
          >
            <div>
              <img src="../../../static/img/my_default_img.png">
              <p class="tac">暂无商品</p>
            </div>
          </div>
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

import { Badge, Dialog, Select, Option, Pagination } from "element-ui";

import mixin from "../../utils/mixin.js";
import configs from "../../configs.js";

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
    [Pagination.name]: Pagination
  },
  data() {
    return {
      dialogTableVisible: false,
      storeInfo: {},
      pageNum: 1,
      loading: true
    };
  },
  created() {
    this.sellerId = this.$store.getters.selecedSellerInfo.sellerId;
    this.keyWord = this.$route.query.keyWord;
    this.$store.state.keyWord = this.keyWord;
    this.gbgoodsId = "";
    this.pageSize = 10;
    // this.getSearchProductList()
  },
  mounted() {},
  methods: {
    /**
     * 获取搜索商品
     */
    getSearchProList(keyWord) {
      this.keyWord = keyWord;
      this.gbgoodsId = "";
      this.pageSize = 10;
      this.getSearchProductList();
    },
    /**
     * 获取商品列表
     */
    getSearchProductList() {
      this.loading = true;
      let purl = "product/getProByQuotation";
      let param = {
        purchaserId: this.userInfo.typeCode,
        buyerId: this.userInfo.typeCode,
        supplierId: this.sellerId || "",
        gbgoodsid: this.gbgoodsId,
        keyWord: this.keyWord,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };

      this.getisChoiceSupplier().then(d => {
        if (d == 1 || configs.name == "linyi") {
          // 能搜索全部渠道的商品
          delete param.supplierId;
        }

        this.postRequest(purl, param).then(resp => {
          this.loading = false;
          if (resp.data && resp.data.state == 0) {
            this.productList = resp.data.aaData;
            this.$store.dispatch("setProductList_AC", resp.data.aaData);
            this.productDataCount = resp.data.dataCount;
          }
        });
      });
    },
    /**
     * 选择商品规格
     */
    addShoppingCar(d, type, isSearch) {
      var param = {
        productId: d.id,
        sellerId: this.sellerId,
        sellerName: this.sellerName,
        type: type
      };

      if (this.sellerId == "") {
        param.sellerId = d.customerId;
        param.sellerName = d.createdPersonName;
        // param.type = 'search'
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
      this.getSearchProductList();

      //获取店铺
      this.getStore(this.sellerId, d => {
        this.storeInfo = d;
        $(".buytime").html(
          `配送时间${d.distributionStart}:00-${d.distributionEnd}:00`
        );
      });
    },
    /**
     * 商品分页
     */
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getSearchProductList();
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/productList.scss";
#productList {
  ul#searchList {
		padding-top: 0;
    li {
      margin-right: 15px;
      margin-bottom: 15px;
      position: relative;
      .cuxbg{
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    li:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
