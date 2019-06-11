<template>
  <div class="shop-bottom">
    <div class="min-width">
      <ul class="slogans flex flex-x-between flex-y-center">
        <li class="flex flex-y-center flex-x-center">
          <img src="../../../static/img/icon_baozheng_small.png">
          <span>食品安全保障</span>
        </li>
        <li class="flex flex-y-center flex-x-center">
          <img src="../../../static/img/icon-wuliu_small.png">
          <span>专业物流配送</span>
        </li>
        <li class="flex flex-y-center flex-x-center">
          <img src="../../../static/img/iconz-xiadan_samll.png">
          <span>便捷在线下单</span>
        </li>
        <li class="flex flex-y-center flex-x-center">
          <img src="../../../static/img/icon-zhineng_small.png">
          <span>智能硬件支持</span>
        </li>
      </ul>
      <div class="contact flex flex-x-center">
        <div class="contact-left flex">
          <div class="QRcode">
            <img v-show="cityName == 'ysh'" src="../../../static/img/ysh_wx.jpg">
            <p>微商城</p>
          </div>
          <div class="QRcode">
            <img v-show="cityName == 'ysh'" src="../../../static/img/ysh_wx.jpg">
            <p>微信公众号</p>
          </div>
        </div>
        <ul class="contact-list flex">
          <!-- <li>
            <p>有话要说</p>
            <p class="click-a" @click="tofeedback">意见反馈</p>
          </li> -->
          <li>
            <p>商家服务</p>
            <p class="click-a" @click="toReg">商家入驻</p>
            <p class="click-a" @click="toContactService">联系我们</p>
          </li>
          <li>
            <p>联系客服</p>
            <p>客服电话：400-8558-783</p>
            <p>服务时间：9:00-17:30</p>
            <p>客服邮箱：yuanshenghuii@163.com</p>
          </li>
        </ul>
      </div>
      <div class="copyright">版权所有：成都九洲电子信息系统股份有限公司</div>
      <div class="copyright" style="margin-top: 6px">版本号 {{version}}</div>
    </div>
  </div>
</template>

<script>
import configs from "../../configs.js";
import mixin from "../../utils/mixin.js";
export default {
	name: "shop-footer",
	mixins:[mixin],
  props: {},
  data() {
    return {
      cityName: configs.cityName,
      version: configs.version
    };
  },
  created() {
		this.getVersion()
  },
  mounted() {},
  methods: {
    toReg() {
      this.$router.push({
        name: "reg"
      });
    },
    tofeedback() {
      this.$router.push({
        name: "feedback"
      });
    },
    toContactService() {
      this.$router.push({
        name: "contactService"
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/footer.scss";
</style>