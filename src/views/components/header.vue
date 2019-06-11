<template>
  <div class="shop-top">
    <div class="min-width flex flex-x-between">
      <div class="left flex flex-y-center">
        <div class="user-headimg">
          <img
            v-if="getUserHeadfilePath"
            @click="userSeting('1')"
            :src="imgURL+getUserHeadfilePath"
          >
          <img v-else @click="userSeting('1')" src="../../../static/img/photo.jpg">
        </div>
        <div class="user" @click="userSeting('0')">您好，{{userInfo.nickName}}</div>
        <div class="msg flex flex-y-center">
          <span @click="logOut">注销</span>
        </div>
        <div class="msg flex flex-y-center">
          <img src="../../../static/img/icon-message.png">
          <span @click="tomsg">
            <template v-if="getUserUnreadMsgCount== 0">消息</template>
            <template v-else>消息({{getUserUnreadMsgCount}}条新消息)</template>
          </span>
        </div>
      </div>
      <div class="right flex flex-y-center">
        <span @click="toIndex">首页</span>
        <span class="splitter">|</span>
        <span @click="toUserCenter">我的订单</span>
        <span class="splitter">|</span>
        <span @click="toCollectionPro">我的收藏</span>
        <span class="splitter">|</span>
        <span @click="toContactService">联系客服</span>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "../../utils/mixin.js";
import { Popover } from "element-ui";
import { mapGetters } from "vuex";
export default {
  name: "shop-header",
  components: {
    [Popover.name]: Popover
  },
  props: {},
  mixins: [mixin],
  computed: {
    ...mapGetters(["getUserHeadfilePath", "getUserUnreadMsgCount"])
  },
  data() {
    return {};
  },
  created() {
    if (this.getUserHeadfilePath) {
      // this.filePath = this.$store.state.userHeadfilePath;
    } else {
      this.saveUserImgToStore();
    }
    this.getUnreadMstCount();
  },
  mounted() {},
  methods: {
    tomsg() {
      this.$router.push({
        name: "message"
      });
    },
    userSeting(tab) {
      this.$router.push({
        name: "userSetting",
        params: {
          tab: tab
        }
      });
    },
    async saveUserImgToStore() {
      let path = await this.getUserHeadImgPath();
      this.$store.commit("saveUserHeadfilePath", path);
    },
    getUserHeadImgPath() {
      return new Promise((res, rej) => {
        this.postRequest(
          "user/list",
          {
            userId: this.userInfo.userId
          },
          false,
          true
        ).then(d => {
          if (d.data && d.data.state == 0) {
            if (d.data.aaData && d.data.aaData.length > 0) {
              res(d.data.aaData[0].filePath);
            } else {
              res(null);
            }
          }
        });
      });
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/css/header.scss";
</style>
