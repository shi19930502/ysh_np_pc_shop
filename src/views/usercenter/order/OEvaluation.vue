<template>
  <div id="OEvaluation">
    <shop-header />
    <!--搜索-->
    <shop-search :showClassify="false" pageName="个人中心" />

    <!--主体-->
    <section class="user-content">
      <div class="min-width">
        <div class="flex flex-x-center">
          <div class="tac">
            <div>
              <strong>订单评价</strong>
            </div>
            <div class="on">
              <span>订单号：</span>
              <span>{{orderInfo.orderUmber}}</span>
              <span>{{orderInfo.createdDate}}</span>
            </div>
          </div>
        </div>

        <div class="pswlpingjia flex">
          <div class="left flex flex-y-center">
            <div class="img">
              <img src="../../../../static/img/icon_edit.png" />
            </div>
            <div class="text">
              <div>
                <strong>质量与配送评价</strong>
              </div>
              <p>感谢你的支持</p>
            </div>
          </div>
          <div class="right flex flex-y-center">
            <div class="item flex flex-y-center" v-for="d in reviewtypeList">
              <span class="la">{{d.reviewName}}</span>
              <el-rate v-model="d.productrate" v-if="type == 1" disabled></el-rate>
              <el-rate v-model="d.productrate" v-else></el-rate>
            </div>
          </div>
        </div>

        <div class="pjcontent flex">
          <div class="left flex flex-y-center flex-x-center">
            <div class="flex flex-y-center flex-x-center">
              <div class="pro-list">
                <div class="flex flex-x-center">
                  <div v-if="index<4" class="pro-img" v-for="d,index in orderInfo.orderitemList">
                    <img v-if="d.skuPicUrl" :src="imgURL+d.skuPicUrl" />
										<img v-else-if="d.productPicUrl" :src="imgURL+d.productPicUrl" />
                    <img v-else src="../../../../static/img/my_default_img.png" />
                  </div>
                </div>
                <p>
                  <span v-if="index<2" v-for="d,index in orderInfo.orderitemList">
                    <template>
                      {{d.productName+'['+ d.skuMeasureName +']'}}
                    </template>
                    <!-- <template v-if="d.inspectedWeight != null">
                      {{'['+d.inspectedWeight+d.baseMeasureName+'/'+d.skuMeasureName+']' + '、'}}
                    </template>
                    <template v-else-if="d.sortingWeight != null">
                      {{'['+d.sortingWeight+d.baseMeasureName+'/'+d.skuMeasureName+']' + '、'}}
                    </template>
                    <template v-else>
                      {{'['+d.weight+d.baseMeasureName+'/'+d.skuMeasureName+']' + '、'}}
                    </template> -->
                  </span>
                  <span v-if="orderInfo.orderitemList">等{{orderInfo.orderitemList.length}}件商品</span>
                </p>
              </div>
            </div>
          </div>
          <div class="right flex flex-x-center">
            <p>订单评价</p>
            <div v-if="type == 1">
              <el-input readonly type="textarea" :rows="5" placeholder="请输入内容" v-model="reviewContent" style="width: 684px;height: 126px;">
              </el-input>
              <div class="flex flex-x-end">{{reviewContent.length}}/200</div>
            </div>
            <div v-else>
              <el-input type="textarea" tabindex="100" maxlength="200" :rows="5" placeholder="请输入内容" v-model="reviewContent" style="width: 684px;height: 126px;">
              </el-input>
              <div class="flex flex-x-end">{{reviewContent.length}}/200</div>
            </div>
          </div>
        </div>

        <div class="savebtn flex flex-x-center flex-y-center">
          <shop-btn @click.native="$router.back" marginR="10px" text="返回" bgcolor="#F64811" border="1px #F64811" color="#fff"
            height="46px" width="220px"></shop-btn>

          <shop-btn v-show="!type==1" @click.native="save" marginR="10px" text="提交" bgcolor="#F64811" border="1px #F64811" color="#fff" height="46px"
            width="220px"></shop-btn>
          <p>你的评价将匿名发送给商家</p>
        </div>

      </div>
    </section>

    <shop-footer />

  </div>
</template>
<script>
  import ShopTop from '../../components/header.vue'
  import ShopFooter from '../../components/footer.vue'
  import btn from '../../components/shopbtn.vue'
  import Search from '../../components/search.vue'

  import {
    Badge,
    Dialog,
    Table,
    TableColumn,
    InputNumber,
    Rate,
    Input
  } from 'element-ui'
  import mixin from '../../../utils/mixin.js'
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
      [Rate.name]: Rate,
      [Input.name]: Input,

    },
    data() {
      return {
        value1: 5,
        reviewtypeList: [],
        reviewContent: '',
        orderInfo: {}
      }
    },
    created() {
      // 获取订单信息
      this.getOrderDetailById(this.$route.query.orderUmber)
      this.type = this.$route.query.type
      // 获取分数
      if (this.type == 1) {
        this.postRequest('orderitemreview/queryReviewAndScore', {
          orderId: this.$route.query.orderId
        }).then(d => {
          if (d && d.data.state == 0) {
            if (d.data.aaData && d.data.aaData[0]) {
              this.reviewContent = d.data.aaData[0].reviewContent
            }
            if (d.data.aaData && d.data.aaData[1]) {
              let productrate = 0
              for (var i in d.data.aaData[1]) {
                d.data.aaData[1][i].productrate = d.data.aaData[1][i].score / 20
                productrate += d.data.aaData[1][i].productrate
              }
              this.productrate = parseInt(productrate / d.data.aaData[1].length)
              this.reviewtypeList = d.data.aaData[1]
            }
          }
        })
      } else {
        // 获取评价类型
        this.getReviewtype()
      }
    },
    mounted() {

    },
    methods: {
      /**
       * 评分类型
       */
      getReviewtype() {
        this.postRequest('reviewtype/list', {
          enabled: 1,
          deleted: 0
        }).then(d => {
          if (d && d.data.state == 0) {
            for (var i in d.data.aaData) {
              d.data.aaData[i].productrate = 0
            }
            this.reviewtypeList = d.data.aaData
          }
        })
      },
      /**
       * 获取订单信息
       */
      getOrderDetailById(orderUmber) {
        this.postRequest('order/listByUser', {
          orderUmber: orderUmber
        }).then(d => {
          if (d.data && d.data.state == 0) {
            if (d.data.aaData.length > 0) {
              this.orderInfo = d.data.aaData[0]
            }
          }
        })
      },
      /**
       * 保存
       */
      save() {
        var str = ''
        for (var i of this.reviewtypeList) {
          str += i.reviewCode + ':' + i.productrate + ','
          if(i.productrate == 0){
            this.$message(`你还没有输入${i.reviewName}评价!`)
            return false
          }
        }
        var params = {
          orderId: this.$route.query.orderId,
          reviewContent: this.reviewContent,
          reviewScoreJson: str.slice(0, str.length - 1)
        }

        if (params.reviewContent == '') {
          this.$message('你还没有输入评价内容!')
          return false
        }
        this.postRequest('orderitemreview/create', params).then(d => {
          if (d.data && d.data.state == 0) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push({
              name: 'orderEvaluate',
              query: {
                orderStatusId: '8'
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  #OEvaluation {
    .user-content {
      background: #F1F1F1;
      padding: 20px 0;
      .on {
        padding: 14px 0 19px;
        font-size: 14px;
        color: #999;
        span:last-child {
          padding-left: 30px;
        }
        span:nth-child(2) {
          color: #666;
        }
      }
      /*pswlpingjia*/
      .pswlpingjia {
        height: 112px;
        background: #fff;
        .left {
          width: 322px;
          height: 100%;
          border-right: 1px solid #F5F5F5;
          .img {
            margin: 0 15px 0 45px;
          }
          .text {
            font-size: 15px;
            p {
              font-size: 14px;
              color: #999;
              margin-top: 8px;
            }
          }
        }
        .right {
          height: 100%;
          .item {
            margin-left: 48px;
            span.la {
              padding-right: 10px;
            }
          }
        }
      }
      .pjcontent {
        height: 260px;
        margin-top: 20px;
        background: #fff;
        .left {
          width: 322px;
          border-right: 1px solid #F5F5F5;
          height: 100%;
          .pro-list {
            p {
              font-size: 12px;
              color: #666;
              text-align: center;
              margin-top: 30px;
            }
            .pro-img {
              margin-right: 10px;
              width: 60px;
              height: 60px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .pro-img:last-child {
              margin-right: 0;
            }
          }
        }
        .right {
          width: 867px;
          padding-top: 71px;
          p {
            font-size: 12px;
            margin-right: 50px;
          }
        }
      }
      .savebtn {
        height: 112px;
        background: #fff;
        margin-top: 20px;
        p {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
</style>
