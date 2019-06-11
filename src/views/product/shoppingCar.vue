<template>
  <div id="shoppingCar">
    <shop-header/>
    <shop-search :showClassify="false" :isCarPage="true" pageName="购物车"/>
    <div class="min-width">
      <section class="shopcartotal flex flex-x-end flex-y-center">
        购物车共有
        <strong style="color: #00C65D;">{{shopCarCount}}</strong>件商品
      </section>
      <section>
        <ul class="shopcar-thead flex flex-y-center flex-x-center">
          <li class="flex flex-y-center" style="width: 200px;">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            ></el-checkbox>
            <div style="margin-left: 54px;">商品</div>
          </li>
          <li style="width: 198px;"></li>
          <li style="width: 198px;">数量</li>
          <li style="width: 198px;">单价</li>
          <li style="width: 198px;">小计</li>
          <li style="width: 198px;">操作</li>
        </ul>
        <!--按店铺-->
        <ul class="shopcar-tbody" v-if="dataList.length>0">
          <li
            v-for="d,index in dataList"
            v-if="d.sellerProducts.length > 0"
            :id="'sellerLi'+d.sellerInfo.sellerId"
          >
            <div class="store flex flex-y-center">
              <el-checkbox @change="checkedAllByStore(d)" v-model="d.storeChecked"></el-checkbox>
              <div>{{d.storeInfo.storeName}}</div>
            </div>
            <div class="shopcar-pro">
              <div class="shopcar-prolist flex flex-x-center" v-for="pro in d.sellerProducts">
                <div class="flex" style="width: 200px;">
                  <el-checkbox v-model="pro.proChecked" @change="checkedPro(d)"></el-checkbox>
                  <div class="pro-img">
                    <img v-if="pro.skuPicUrl" :src="imgURL+pro.skuPicUrl">
                    <img v-else-if="pro.proPicUrl" :src="imgURL+pro.proPicUrl">
                    <img v-else src="../../../static/img/my_default_img.png">
                  </div>
                  <div class="pro-name">
                    <div class="word-wrap">{{pro.proName}}</div>
                    <div
                      class="cuxbg flex flex-y-center flex-x-center"
                      v-if="pro.promotionPrice-0 < pro.price-0"
                    >
                      <span>促销</span>
                    </div>
                  </div>
                </div>
                <div class="pro-sku">
                  <div class="pro-sku-item flex flex-x-center" v-for="d in 1">
                    <div class="flex flex-x-center" style="width: 198px;">
                      <div class="tac">
                        <div style="padding: 0 10px;">{{pro.skuName}}</div>
                        <!--proMeasureName基础单位-->
                        <!--商品名&规格名-->
                        <template v-if="pro.skuMethodType == 1">
                          <p class="pttext">{{pro.skuMeasureName}}</p>
                        </template>
                        <template v-else>
                          <p
                            class="pttext"
                            v-if="pro.proMeasureName != pro.skuMeasureName"
                          >{{pro.skuWeight+pro.proMeasureName+'/'+pro.skuMeasureName}}</p>
                          <p class="pttext" v-else>{{pro.skuMeasureName}}</p>
                        </template>

                        <!-- <p class="pttext" v-if="pro.proMeasureName != pro.skuMeasureName">{{pro.skuWeight+pro.proMeasureName+'/'+pro.skuMeasureName}}</p> -->
                        <!-- <p class="pttext" v-else>{{pro.proMeasureName}}</p> -->
                        <p class="pttext">计量方式：{{pro.skuMethodType == 1 ?'计重':'计件'}}</p>
                      </div>
                    </div>
                    <div class="flex flex-x-center" style="width: 198px;">
                      <el-input-number
                        v-if="pro.skuMethodType == 1"
                        :max="999999"
                        @change="getSettlementParam(pro.id)"
                        :min="1"
                        size="mini"
                        :precision="2"
                        :maxlength="7"
                        v-model="pro.quantity"
                      ></el-input-number>
                      <el-input-number
                        v-if="pro.skuMethodType == 2"
                        :max="999999"
                        :maxlength="7"
                        @change="getSettlementParam(pro.id)"
                        :min="1"
                        size="mini"
                        v-model="pro.quantity"
                      ></el-input-number>
                    </div>
                    <template v-if="pro.promotionPrice>0 && pro.promotionBasePrice>0">
                      <div class="tac" style="width: 198px;">
                        <span>{{'￥'+pro.promotionPrice+'/'+pro.skuMeasureName}}</span>
                        <div class="flex flex-x-center" v-if="pro.promotionPrice-0 < pro.price-0">
                          <div class="p2">{{'￥'+pro.price}}</div>
                        </div>
                      </div>
                      <div class="flex flex-x-center" style="width: 198px;">
                        <strong>{{'￥'+(pro.promotionPrice * pro.quantity).toFixed(2)}}</strong>
                      </div>
                    </template>
                    <template v-else>
                      <div
                        v-if="pro.price==0"
                        class="flex flex-x-center"
                        style="width: 198px;"
                      >{{'￥时价'+'/'+pro.skuMeasureName}}</div>
                      <div
                        v-else
                        class="flex flex-x-center"
                        style="width: 198px;"
                      >{{'￥'+pro.price+'/'+pro.skuMeasureName}}</div>
                      <div v-if="pro.price==0" class="flex flex-x-center" style="width: 198px;">
                        <strong>{{'￥时价'}}</strong>
                      </div>
                      <div v-else class="flex flex-x-center" style="width: 198px;">
                        <strong>{{'￥'+(pro.price * pro.quantity).toFixed(2)}}</strong>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="pro-btns flex flex-x-center" style="width: 198px;">
                  <div class="czbtns">
                    <div>
                      <span @click="deleteCarById(pro.id,1)">删除</span>
                    </div>
                    <div v-if="pro.isCollection == '0'">
                      <span @click="productcollection(pro,d)">添加收藏</span>
                    </div>
                    <div v-else>
                      <span @click="productcollection(pro,d)">取消收藏</span>
                    </div>
                  </div>
                </div>
                <!--合计-->
                <div class="pro-total flex flex-y-center flex-x-center">
                  <span>合计</span>
                  <span
                    v-if="pro.promotionPrice>0 && pro.promotionBasePrice>0"
                  >{{'￥'+(pro.promotionPrice * pro.quantity).toFixed(2)}}</span>
                  <span v-else>{{'￥'+(pro.price * pro.quantity).toFixed(2)}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div
          v-else
          class="nodata flex flex-x-center flex-y-center"
          style="height: 512px;color: #d1d1d1;"
        >
          <div>
            <img src="../../../static/img/my_default_img.jpg">
            <p class="tac">暂无商品</p>
          </div>
        </div>
      </section>
    </div>
    <section class="shop-settlement-footer">
      <ul class="min-width flex flex-y-center flex-x-between">
        <li class="flex flex-y-center">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            style="margin-top: 4px;"
          ></el-checkbox>
          <div>全选</div>
          <div class="delbtn" @click="delChecked">删除</div>
        </li>
        <li class="flex-item-6 flex-x-end flex flex-y-center">
          <div>商家数量：{{settlementSellers.length}}</div>
          <div>商品数量：{{sellersPros.length}}</div>
          <div class="flex-y-center flex">
            <span>商品金额总计：</span>
            <strong>￥{{settlementPriceTotal}}</strong>
          </div>
        </li>
        <li>
          <shop-btn
            width="160px"
            height="60px"
            text="结算"
            bgcolor="#F64811"
            color="#fff"
            border="#F64811"
            marginR="0"
            fontsize="24px"
            @click.native="toShoppingSettlement"
          />
        </li>
      </ul>
    </section>

  </div>
</template>

<script>
import ShopTop from "../components/header.vue";
import ShopFooter from "../components/footer.vue";
import btn from "../components/shopbtn.vue";
import Search from "../components/search.vue";

import {
  Badge,
  Dialog,
  Table,
  TableColumn,
  InputNumber,
  Checkbox,
  CheckboxGroup
} from "element-ui";
import mixin from "../../utils/mixin.js";

export default {
  mixins: [mixin],
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [btn.name]: btn,
    [Search.name]: Search,

    // element component
    [Badge.name]: Badge,
    [Dialog.name]: Dialog,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [InputNumber.name]: InputNumber,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      sellerList: [],
      dataList: [],
      orderTotal: 0,
      shopCarCount: 0,
      // 标题全选
      checkAll: true,
      isIndeterminate: false,
      checkedCities: [],
      // 结算商品obj
      settlementPros: [],
      // 结算商家数量
      settlementSellers: [],
      // 结算商品数量
      sellersPros: [],
      // 结算商品总价
      settlementPriceTotal: 0
    };
  },
  watch: {
    settlementSellers: {
      handler: function(newValue, oldValue) {
        if (newValue.length == 0) {
          this.checkAll = false;
        }
      },
      deep: true
    }
  },
  async created() {
    this.server_date = await this.getServerTime()
    this.sellerId = this.$route.query.sellerId;
    this.getStoreCar();
    // this.queryStoreGrouplist()
  },
  mounted() {},
  methods: {
    /**
     * 单选商品
     */
    checkedPro(d) {
      this.getSettlementParam();
    },
    /**
     * 选择店铺的全部商品
     */
    checkedAllByStore(d) {
      if (d.storeChecked) {
        for (var pro of d.sellerProducts) {
          pro.proChecked = true;
        }
      } else {
        for (var pro of d.sellerProducts) {
          pro.proChecked = false;
        }
      }
      this.getSettlementParam();
    },
    /**
     * 表头全选
     */
    handleCheckAllChange(val) {
      if (val) {
        for (var i of this.dataList) {
          i.storeChecked = true;
          for (var k of i.sellerProducts) {
            k.proChecked = true;
          }
        }
      } else {
        for (var i of this.dataList) {
          i.storeChecked = false;
          for (var k of i.sellerProducts) {
            k.proChecked = false;
          }
        }
      }
      this.getSettlementParam();
      this.isIndeterminate = false;
    },
    /**
     * 获取结算数据
     */
    getSettlementParam(id) {
      // 结算商品
      var sellersPros = [];
      var storeCount = 0;
      for (var i of this.dataList) {
        var proCount = 0;
        for (var k of i.sellerProducts) {
          if (k.proChecked) {
            sellersPros.push(k);
            proCount++;
          }
          // 加减商品跟新购物车数量
          if (id) {
            if (id == k.id) {
              if (k.quantity) {
                if (k.skuMethodType == 1) {
                  // 计重
                  k.quantity = k.quantity.toFixed(2) - 0;
                } else {
                  k.quantity = parseInt(k.quantity) - 0;
                }
              } else {
                k.quantity = 1;
              }

              var params = {
                buyerId: k.buyerId,
                productId: k.productId,
                productName: k.productName,
                skuId: k.skuId,
                skuName: k.skuName,
                quantity: k.quantity,
                comment: k.remark || "",
                sellerId: k.sellerId - 0
              };
              params.id = k.id;
              this.postRequest("shippingcar/update", params).then(d => {
                if (d.data && d.data.state == 0) {
                }
              });
            }
          }
        }
        if (proCount == i.sellerProducts.length) {
          i.storeChecked = true;
        } else {
          i.storeChecked = false;
        }
        if (i.storeChecked) {
          storeCount++;
        }
      }

      if (storeCount == this.dataList.length) {
        this.checkAll = true;
        this.isIndeterminate = false;
      } else {
        this.checkAll = false;
        //					this.isIndeterminate = true
      }

      this.sellersPros = sellersPros; // 计算商家数量商品数量
      var settlementSellers = [];
      var settlementPriceTotal = 0;
      for (var i of this.sellersPros) {
        settlementSellers.push(i.sellerId);
        if (i.promotionPrice > 0 && i.promotionBasePrice > 0) {
          settlementPriceTotal += i.promotionPrice * i.quantity;
        } else {
          settlementPriceTotal += i.price * i.quantity;
        }
      }
      this.settlementSellers = this.uniqueArr(settlementSellers);
      this.settlementPriceTotal = settlementPriceTotal.toFixed(2);
    },
    /**
     * 获取购物车store
     */
    getStoreCar(isdel) {
      this.postRequest("shippingcar/queryGrouplist", {
        buyerId: this.userInfo.typeCode
      }).then(d => {
        if (d.data && d.data.state == 0) {
          var arr = [];
          var shopCarCount = 0;
          this.sellersPros = [];
          for (var sellerId in d.data.aaData) {
            shopCarCount += d.data.aaData[sellerId].length;
            for (var pro of d.data.aaData[sellerId]) {
              pro.proChecked = true;
              // 默认选择全部商品
              this.sellersPros.push(pro);
            }

            (sellerId => {
              this.getSellerInfoById(sellerId).then(sellerInfo => {
                var o = {
                  sellerProducts: d.data.aaData[sellerId],
                  orderTotal: this.getOrderTotal(d.data.aaData[sellerId])
                    .priceTotal
                };
                o.sellerInfo = sellerInfo;
                this.getStore(sellerId, storeInfo => {
                  o.storeInfo = storeInfo;
                  o.storeChecked = true;
                  arr.push(o);
                });
              });
            })(sellerId);
          }

          setTimeout(() => {
            this.dataList = arr;
            this.shopCarCount = shopCarCount;

            // 默认选择所有供应商的商品
            var settlementPriceTotal = 0;
            var settlementSellers = [];
            for (var i of this.sellersPros) {
              settlementSellers.push(i.sellerId);
              if (i.promotionPrice > 0 && i.promotionBasePrice > 0) {
                settlementPriceTotal += i.promotionPrice * i.quantity;
              } else {
                settlementPriceTotal += i.price * i.quantity;
              }
            }
            this.settlementSellers = this.uniqueArr(settlementSellers);
            this.settlementPriceTotal = settlementPriceTotal.toFixed(2);
          }, 1);
        }
      });
    },
    /**
     * 获取店铺信息
     */
    getStore2(sellerId) {
      return new Promise((resolve, reject) => {
        this.postRequest("store/queryBySellerId", {
          sellerId: sellerId
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            resolve(resp.data.aaData);
          }
        });
      });
    },
    /**
     * 获取登录用户的供应商列表
     */
    getSellers() {
      this.postRequest("suppliercollection/querySellerByCustomerId", {
        customerId: this.userInfo.typeCode
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          this.sellerList = resp.data.aaData;
        }
      });
    },
    /**
     * 结算页
     */
    toShoppingSettlement() {
      if (this.sellersPros.length == 0) {
        this.$message("请至少选择一个商品结算！");
      } else {
        var settlementPros = [];
        for (var i of this.settlementSellers) {
          let obj = {
            sellerProducts: []
          };
          for (var k of this.dataList) {
            if (i == k.sellerInfo.sellerId) {
              obj.sellerInfo = k.sellerInfo;
              obj.storeInfo = k.storeInfo;
            }
          }

          for (var j of this.sellersPros) {
            if (i == j.sellerId) {
              obj.sellerProducts.push(j);
            }
          }
          obj.orderTotal = this.getOrderTotal(obj.sellerProducts).priceTotal;
          settlementPros.push(obj);
        }
        // 获取报价单起配金额
        var count = 0;
        for (let setPro of settlementPros) {
          // 先验证是否在营业中
          if(setPro.storeInfo.enabled == 1){
            // 先验证是否在营业时间内
            // 获取当前时间小时
            let h = new Date(this.server_date).getHours();
            // let h = this.server_date.getHours()

            
            if (h < setPro.storeInfo.openStart || h >= setPro.storeInfo.openEnd) {
              setPro.storeInfo.isOpenTime = false;
            } else {
              setPro.storeInfo.isOpenTime = true;
            }
            if (setPro.storeInfo.isOpenTime) {
              // 在验证是否满足起配金额
              this.getStartAmount(setPro.sellerInfo.sellerId).then(d => {
                // 如果结算商品中有时价商品则不验证起配金额
                for(let p of setPro.sellerProducts){
                  if(p.price == 0){
                    d.startAmount = 0
                    break
                  }
                }

                if (setPro.orderTotal < d.startAmount) {
                  this.$alert(
                    `${
                      setPro.storeInfo.storeName
                    }订单金额必须大于等于起配金额(￥${d.startAmount})`,
                    "提示",
                    {
                      confirmButtonText: "确定"
                    }
                  );
                } else {
                  count++;
                  if (count == settlementPros.length) {
                    localStorage.setItem(
                      "settlementPros",
                      JSON.stringify(settlementPros)
                    );
                    this.$router.push({
                      name: "shoppingSettlement"
                    });
                  }
                }
              });
            } else {
              this.$alert(`${setPro.storeInfo.storeName}未到营业时间(${setPro.storeInfo.openStart}:00~${setPro.storeInfo.openEnd}:00)，暂不能下单！！`, "提示", {
                confirmButtonText: "确定"
              });
            }
          } else {
            this.$alert(`${setPro.storeInfo.storeName}未营业，暂不能下单！`, "提示", {
              confirmButtonText: "确定"
            });
          }
        }
      }
    },
    getStartAmount(sellerId) {
      return new Promise((resolve, reject) => {
        this.postRequest("quotation/listWithCount", {
          customerId: sellerId,
          buyersId: this.userInfo.typeCode
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            if (resp.data.aaData && resp.data.aaData[0]) {
              resolve(resp.data.aaData[0]);
            } else {
              resolve(0);
            }
          }
        });
      });
    },
    /**
     * 删除选中的购物车商品
     */
    delChecked() {
      if (this.sellersPros.length == 0) {
        this.$message("请至少选中一条购物车商品删除！");
      } else {
        for (var i of this.sellersPros) {
          this.deleteShopCarById(i.id, 1);
        }
        this.sellersPros = []; // 计算商家数量商品数量
        this.settlementSellers = [];
        this.settlementPriceTotal = 0;
        this.isIndeterminate = false;
      }
    },
    /**
     * 收藏商品
     */
    productcollection(item, d) {
      var param = {
        customerId: this.userInfo.typeCode - 0,
        sellerId: d.sellerInfo.sellerId,
        sellerName: d.sellerInfo.sellerName,
        productId: item.productId,
        productName: item.productName,
        skuId: item.skuId,
        skuName: item.skuName
      };
      if (item.isCollection == "0") {
        this.postRequest("productcollection/create", param).then(d => {
          if (d.data && d.data.state == 0) {
            item.isCollection = 1;
            this.$message({
              message: "收藏商品成功！",
              type: "success"
            });
          } else {
            this.$message.error(d.data.msg);
          }
        });
      } else {
        this.postRequest("productcollection/deleteByCustomerIdAndSkuId", {
          customerId: this.userInfo.typeCode - 0,
          skuId: item.skuId
        }).then(d => {
          if (d.data && d.data.state == 0) {
            item.isCollection = 0;
            this.$message({
              message: "取消收藏！",
              type: "success"
            });
          } else {
            this.$message.error(d.data.msg);
          }
        });
      }
    },
    /**
     * 获取供应商信息
     */
    getSellerInfoById(sellerId) {
      return new Promise((resolve, reject) => {
        this.postRequest("customer/queryById", {
          id: sellerId
        }).then(resp => {
          if (resp.data && resp.data.state == 0) {
            resp.data.aaData.sellerId = resp.data.aaData.id;
            resolve(resp.data.aaData);
          }
        });
      });
    },
    /**
     * 删除购物车
     */
    deleteCarById(id) {
      this.postRequest("shippingcar/delete", {
        id: id
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.$message("删除成功！");
          this.getStoreCar(true);
        }
      });
    },
    /**
     * queryStoreGrouplist
     */
    queryStoreGrouplist() {
      this.postRequest("shippingcar/queryStoreGrouplist", {
        buyerId: this.userInfo.typeCode
      }).then(d => {
        if (d.data && d.data.state == 0) {
          console.log(d.data);
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/shoppingCar.scss";
</style>
