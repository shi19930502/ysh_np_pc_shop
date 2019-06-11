<template>
  <!--加入购物车弹出窗-->
  <el-dialog
    :title="modalTitle"
    :visible="modal"
    :close-on-click-modal="false"
    :before-close="beforeClose"
  >
    <div id="shopcar-modal">
      <!--收藏商品 -->
      <template v-if="type=='collection'">
        <div
          class="flex flex-x-between collection-item flex-y-center"
          v-for="d in proSkuList"
          :key="d.id"
        >
          <div class="flex flex-y-center">
            <img
              v-if="d.skuPicUrl"
              :src="imgURL+d.skuPicUrl"
              style="width: 60px;height: 60px;margin-right: 10px;"
            >
            <img
              v-else
              src="../../../static/img/my_default_img.png"
              style="width: 60px;height: 60px;margin-right: 10px;"
            >
            <div>
              <!--商品名&规格名-->
              <template v-if="d.skuMethodType == 1">
                <span>{{d.productName+'['+d.skuMeasureName+']'}}</span>
              </template>
              <template v-else>
                <span
                  v-if="d.proMeasureName != d.skuMeasureName"
                >{{d.productName+'['+d.skuWeight+d.proMeasureName+'/'+d.skuMeasureName+']'}}</span>
                <span v-else>{{d.productName+'['+d.skuMeasureName+']'}}</span>
              </template>
              <p style="color: #9999;font-size: 12px;">规格名：{{d.name}}</p>
            </div>
          </div>
          <div>
            <div class="scbtn flex-y-center flex-x-center flex" @click="createProductcollection(d)">
              <img v-if="d.isCollection=='0'" src="../../../static/img/icon_xingx.png" alt>
              <img v-else src="../../../static/img/icon_xingx_a.png" alt>
              <span>{{d.isCollection=='0' ? '收藏':'取消'}}</span>
            </div>
          </div>
        </div>
        <div v-show="proSkuList.length==0" class="tac" style="padding: 20px 0;">暂无商品收藏</div>

        <div class="flex flex-x-end" style="margin-bottom: 20px">
          <el-pagination
            background
            small
            layout="total,prev, pager, next"
            :total="proskuDataCount"
            @current-change="handleCurrentChange"
            :page-size="this.pageSize"
            :current-page.sync="currentpage"
          ></el-pagination>
        </div>
        <div class="flex flex-x-center" v-show="proSkuList.length>0">
          <shop-btn marginR="0" text="关闭" @click.native="closeAddShopCarModal"/>
        </div>
      </template>
      <!--获取商品规格 -->
      <template v-else>
        <!-- 新版本加入购物车 -->
        <!-- <sku-table/> -->
        <el-table
          ref="multipleTable"
          :data="proSkuList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
        >
          <!--:selectable="selectable" 限制规格-->
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column width="55">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.proChecked" @change="checkedPro(scope.row)"></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label="商品图片" width="100">
            <template slot-scope="scope">
              <img
                v-if="scope.row.skuPicUrl"
                :src="imgURL+scope.row.skuPicUrl"
                style="width: 60px;height: 60px;"
              >
              <img
                v-else
                src="../../../static/img/my_default_img.png"
                style="width: 60px;height: 60px;"
              >
              <div
                v-if="scope.row.productName.length>10"
                :title="scope.row.productName"
              >{{`${scope.row.productName.substring(0, 8)}...`}}</div>
              <div v-else>{{scope.row.productName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="规格名" width="210">
            <template slot-scope="scope">
              <!--<span v-if="scope.row.proMeasureName != scope.row.skuMeasureName">{{ scope.row.productName +'['+scope.row.skuWeight+scope.row.proMeasureName+'/'+scope.row.skuMeasureName+']'}}</span>
              <span v-else>{{ scope.row.productName+'['+scope.row.proMeasureName+']' }}</span>-->
              <span>{{scope.row.name}}</span>
              <!--<p class="pttext">规格量库存：{{scope.row.stockLimit == '0' ? '充足' : scope.row.canUseQuantity>0 ? scope.row.canUseQuantity/100 : '不足'}}</p>-->
              <!-- <p class="pttext" v-if="scope.row.proMeasureName != scope.row.skuMeasureName">{{scope.row.skuWeight+scope.row.proMeasureName+'/'+scope.row.skuMeasureName}}</p> -->
              <!-- <p class="pttext" v-else>{{scope.row.proMeasureName}}</p> -->
              <!--商品名&规格名-->
              <template v-if="scope.row.skuMethodType == 1">
                <p class="pttext">{{scope.row.skuMeasureName}}</p>
              </template>
              <template v-else>
                <p
                  class="pttext"
                  v-if="scope.row.proMeasureName != scope.row.skuMeasureName"
                >{{scope.row.skuWeight+scope.row.proMeasureName+'/'+scope.row.skuMeasureName}}</p>
                <p class="pttext" v-else>{{scope.row.skuMeasureName}}</p>
              </template>

              <p class="pttext">计量方式：{{scope.row.skuMethodType == 1 ?'计重':'计件'}}</p>
            </template>
          </el-table-column>
          <el-table-column label="单价" width="120">
            <template slot-scope="scope">
              <div
                class="p1"
                v-if="scope.row.promotionPrice>0 && scope.row.promotionBasePrice>0"
              >{{'￥'+scope.row.promotionPrice + '/' + scope.row.skuMeasureName}}</div>
              <div
                class="p1"
                v-else-if="scope.row.price==0"
              >{{'￥时价'+ '/' + scope.row.skuMeasureName}}</div>
              <div class="p1" v-else>{{'￥'+scope.row.price + '/' + scope.row.skuMeasureName}}</div>

              <div
                class="p2"
                v-if="scope.row.promotionPrice-0 < scope.row.price-0"
                style="text-decoration: line-through;color: #999;"
              >{{'￥'+scope.row.price}}</div>
            </template>
          </el-table-column>
          <el-table-column label="数量">
            <template slot-scope="scope">
              <!--<el-input-number :disabled="true" v-if="scope.row.stockLimit != 0 && scope.row.canUseQuantity <= 0" size="mini" :max="scope.row.canUseQuantity/100" :precision="2" v-model="scope.row.quantity" :min="1" @change="handleChange(scope.row)"></el-input-number>
							<el-input-number v-if="scope.row.stockLimit != 0 && scope.row.canUseQuantity > 0" size="mini" :max="scope.row.canUseQuantity/100" :precision="2" v-model="scope.row.quantity" :min="1" @change="handleChange(scope.row)"></el-input-number>
              <el-input-number v-if="scope.row.stockLimit == 0" size="mini" :max="10000" :precision="2" v-model="scope.row.quantity" :min="1" @change="handleChange(scope.row)"></el-input-number>-->
              <el-input-number
                v-if="scope.row.skuMethodType == 1"
                size="mini"
                :max="999999"
                maxlength="7"
                :precision="2"
                :step="1"
                v-model="scope.row.quantity"
                :min="1"
                @change="handleChange(scope.row)"
              ></el-input-number>
              <el-input-number
                v-if="scope.row.skuMethodType == 2"
                size="mini"
                :max="999999"
                maxlength="7"
                v-model="scope.row.quantity"
                :min="1"
                @change="handleChange(scope.row)"
              ></el-input-number>
            </template>
          </el-table-column>
        </el-table>
        <div class="total flex flex-y-center flex-x-center">
          <template v-if="multipleSelection.length>0">
            <div>
              <span style="color: #333;">合计：</span>
              <span>总数量{{quantityTotal}}</span>
            </div>
            <ul>
              <li class="flex flex-y-center" v-for="d in multipleSelection">
                <div>
                  <span
                    v-if="d.proMeasureName != d.skuMeasureName"
                  >{{ d.productName +'['+d.skuWeight+d.proMeasureName+'/'+d.skuMeasureName+']'}}</span>
                  <span v-else>{{ d.productName+'['+d.proMeasureName+']' }}</span>
                </div>
                <div
                  v-if="d.promotionPrice>0 && d.promotionBasePrice>0"
                >{{d.promotionPrice}}x{{d.quantity}}</div>
                <div v-else-if="d.price==0">时价x{{d.quantity}}</div>
                <div v-else>{{d.price}}x{{d.quantity}}</div>

                <div v-if="d.itemPriceTotal==0">小计:￥时价</div>
                <div v-else>小计:￥{{d.itemPriceTotal}}</div>
              </li>
            </ul>
            <div>=￥{{priceTotal}}</div>
          </template>
        </div>
        <div class="flex flex-x-end" style="margin-bottom: 20px">
          <el-pagination
            background
            small
            layout="total,prev, pager, next"
            :total="proskuDataCount"
            @current-change="handleCurrentChange"
            :page-size="this.pageSize"
            :current-page.sync="currentpage"
          ></el-pagination>
        </div>
        <div class="flex flex-x-center">
          <shop-btn
            text="确定"
            bgcolor="#00C65D"
            color="#fff"
            border="1px #00C65D"
            @click.native="submitShopCar"
          />
          <shop-btn text="取消" marginR="0" @click.native="closeAddShopCarModal"/>
        </div>
      </template>
    </div>
  </el-dialog>
</template>
<script>
import {
  Table,
  TableColumn,
  InputNumber,
  Pagination,
  Dialog,
  Checkbox,
  CheckboxGroup
} from "element-ui";
import btn from "../components/shopbtn.vue";
import skuTable from "./addShopCarSkuTable.vue";

import mixin from "../../utils/mixin.js";
export default {
  name: "shopcar-modal",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [InputNumber.name]: InputNumber,

    [btn.name]: btn,
    [Dialog.name]: Dialog,
    [Pagination.name]: Pagination,
    [skuTable.name]: skuTable,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },
  props: {
    modal: {
      default: false
    },
    params: {
      default: function() {
        return {};
      }
    }
  },
  mixins: [mixin],
  data() {
    return {
      sellerId: "",
      sellerName: "",
      productId: "",
      pageNum: 1,
      pageSize: 2,
      proSkuList: [], // 商品规格列表
      proskuDataCount: 0,
      multipleSelection: [], // 选中的商品
      priceTotal: 0,
      quantityTotal: 0,
      type: "",
      modalTitle: "请选订购数量",
      currentpage: 2
    };
  },
  created() {
    this.productId = this.params.productId;
    this.sellerId = this.params.sellerId;
    this.sellerName = this.params.sellerName;

    if (this.params.type == "collection") {
      this.type = this.params.type;
      this.modalTitle = "请选择收藏商品";
    }

    if (this.params.type == "search") {
      this.type = this.params.type;
    }

    this.getProductListSku();
  },
  mounted() {},
  methods: {
    checkedPro(d) {
      if (d.proChecked) {
        this.multipleSelection.push(d);
      } else {
        for (let o in this.multipleSelection) {
          if (this.multipleSelection[o].id == d.id) {
            this.multipleSelection.splice(o, 1);
          }
        }
      }
      this.priceTotal = this.getTotal().priceTotal;
      this.quantityTotal = this.getTotal().quantityTotal;
    },
    /**
     * 计算总量
     */
    getTotal() {
      let priceTotal = 0;
      let quantityTotal = 0;
      for (var i in this.multipleSelection) {
        priceTotal += this.multipleSelection[i].itemPriceTotal - 0;
        quantityTotal += this.multipleSelection[i].quantity - 0;
      }
      return {
        priceTotal: (priceTotal - 0).toFixed(2),
        quantityTotal: quantityTotal.toFixed(2)
      };
    },
    /**
     * 手动单选
     */
    handleSelect(row) {
      this.priceTotal = this.getTotal().priceTotal;
      this.quantityTotal = this.getTotal().quantityTotal;
    },
    /**
     * 全选
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.priceTotal = this.getTotal().priceTotal;
      this.quantityTotal = this.getTotal().quantityTotal;
    },
    /**
     * 商品分页
     */
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getProductListSku();
    },
    /**
     * 获取商品规格列表
     */
    getProductListSku() {
      let param = {
        productId: this.productId,
        purchaserId: this.userInfo.typeCode,
        supplierId: this.sellerId,
        buyerId: this.userInfo.typeCode,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.type == "search" || this.sellerId == "") {
        // delete param.purchaserId
        delete param.supplierId;
      }
      // 收藏的时候不传purchaserId获取不到是否收藏的字段
      if (this.type == "collection" && this.sellerId == "") {
        // delete param.purchaserId
        delete param.supplierId;
      }

      this.postRequest("productsku/getSkuByQuotation", param).then(resp => {
        if (resp.data && resp.data.state == 0) {
          for (var i in resp.data.aaData) {
            resp.data.aaData[i].quantity = 1;
            resp.data.aaData[i].sellerId = this.params.sellerId;
            resp.data.aaData[i].sellerName = this.params.sellerName;
            // 计算小计
            if (
              resp.data.aaData[i].promotionPrice > 0 &&
              resp.data.aaData[i].promotionBasePrice > 0
            ) {
              resp.data.aaData[i].itemPriceTotal =
                resp.data.aaData[i].quantity *
                resp.data.aaData[i].promotionPrice;
            } else {
              resp.data.aaData[i].itemPriceTotal =
                resp.data.aaData[i].quantity * resp.data.aaData[i].price;
            }
            // 只有一个规格是默认选中
            if(resp.data.aaData.length == 1 && resp.data.dataCount == 1){
              resp.data.aaData[i].proChecked = true;
              this.checkedPro(resp.data.aaData[i])
            } else {
              resp.data.aaData[i].proChecked = false;
            }
            // 多规格翻页记录上一页选中的商品
            for (let j of this.multipleSelection) {
              if (resp.data.aaData[i].id == j.id) {
                resp.data.aaData[i] = j;
              }
            }
          }
          this.proSkuList = resp.data.aaData;
          this.proskuDataCount = resp.data.dataCount;
        }
      });
    },
    /**
     * 提交购物车
     */
    submitShopCar() {
      if (this.multipleSelection.length == 0) {
        this.$message("请选择加入购物车的商品！");
      } else {
        this.createShippingcar(this.multipleSelection);
      }
    },
    /**
     * 关闭购物
     */
    closeAddShopCarModal() {
      this.$emit("close");
    },
    handleChange(row) {
      // 计算每个规格小计
      if (row.quantity) {
        if (row.promotionPrice > 0 && row.promotionBasePrice > 0) {
          row.itemPriceTotal = (row.promotionPrice * row.quantity - 0).toFixed(
            2
          );
        } else {
          row.itemPriceTotal = (row.price * row.quantity - 0).toFixed(2);
        }
        

        if (row.skuMethodType == 1) {
          // 计重
          row.quantity = row.quantity.toFixed(2) - 0;
        } else {
          row.quantity = parseInt(row.quantity) - 0;
        }
      } else {
        row.quantity = 1;
      }

      if (row.quantity > 999999) {
        row.quantity = 1;
      }
      // 现在用的CheckBox自定义选择商品
      row.proChecked = true;
      if (this.multipleSelection.length == 0) {
        this.multipleSelection.push(row);
      } else {
        if(this.isInArray1(this.multipleSelection,row.id)){

        } else {
          this.multipleSelection.push(row) 
        }
      }

      // 之前用的table插件选择商品不可控
      // this.toggleSelection(row);

      this.priceTotal = this.getTotal().priceTotal;
      this.quantityTotal = this.getTotal().quantityTotal;
    },
    /**
		 * 判断数组是否存在某个元素
		 */
		isInArray1(arr, element) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].id == element) {
					return true;
				}
			}
			return false;
		},
    blur(d) {
      if (d.quantity == undefined || d.quantity == "") {
        d.quantity = 1;
      }
    },
    selectable(row) {
      if (row.stockLimit != 0 && row.canUseQuantity <= 0) {
        return 0;
      } else {
        return 1;
      }
    },
    toggleSelection(row) {
      this.$refs.multipleTable.toggleRowSelection(row, true);
    },
    beforeClose(done) {
      this.closeAddShopCarModal();
      done();
    }
  }
};
</script>
<style lang="scss">
#shopcar-modal {
  .pttext {
    color: #9999;
    font-size: 12px;
  }

  .collection-item {
    // height: 40px;
    margin-bottom: 10px;

    .scbtn {
      border: 1px solid #ddd;
      padding: 3px 10px;
      cursor: pointer;

      img {
        margin-right: 5px;
      }
    }
  }

  .total {
    margin: 20px 0 28px;
    color: #ff541f;
    font-size: 14px;

    ul {
      margin: 0px 10px;
      border: 1px solid #dddddd;
      border-bottom: none;

      li {
        min-height: 40px;
        border-bottom: 1px solid #dddddd;

        div {
          width: 114px;
          text-align: center;
        }
      }
    }
  }
}
</style>
