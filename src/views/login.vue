<template>
  <div id="loginPage">
    <!--logo-->
    <section class="shop-search flex flex-y-center">
      <div class="min-width">
        <ul class="flex flex-x-between flex-y-center">
          <li class="logo flex flex-y-end">
            <div v-show="cityName=='ysh'" class="logo-l-yinchuan"></div>
            <strong>欢迎登录</strong>
          </li>
          <li>
            <div class="logo-r"></div>
          </li>
        </ul>
      </div>
    </section>
    <!--form-->
    <section class="form-container flex flex-y-center">
      <!--<img src="../../static/img/banner.png" alt="" />-->
      <div class="flex flex-x-between flex-y-center min-width">
        <div class="form-text">
          <div class="flex flex-x-center">
            <div v-show="cityName=='ysh'" class="title-yinchuan"></div>
          </div>
          <div class="btns flex flex-x-center">
            <div>来源可溯</div>
            <div>产品安全</div>
            <div>层层把关</div>
            <div>专业配送</div>
          </div>
          <div class="texts">
            <p>肉类蔬菜流通追溯体系建设，是商务部、财政部2010年起在全国范围内启动实施的一项民生工程。</p>
            <p>通过加大现代科技在监管领域的应用，建设肉类蔬菜流通追溯体系，</p>
            <p>推进了监管方式和监管手段的不断创新，以改革传统监管模式的弊端，提升管理水平，</p>
            <p>促进肉菜流通的安全、高效，确保食品安全。</p>
          </div>
        </div>
        <div class="form">
          <div class="form-head flex flex-y-center flex-x-center">安全登录</div>
          <div class="form-body" v-loading="loading">
            <el-form ref="form" :model="form" :rules="rules" style="margin-top: 20px;">
              <el-form-item label="账号" prop="username">
                <div class="form-group">
                  <el-input
                    type="text"
                    v-model="form.username"
                    placeholder="请输入注册手机号码"
                    @keyup.enter.native="login"
                  >
                    <img slot="suffix" src="../../static/img/login_icon_user.png">
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <div class="form-group">
                  <el-input
                    type="password"
                    v-model="form.password"
                    placeholder="请输入密码"
                    @keyup.enter.native="login"
                  >
                    <img slot="suffix" src="../../static/img/login_icon_password.png">
                  </el-input>
                </div>
              </el-form-item>
              <!-- 需要验证码放开注释 -->
              <el-form-item label="密码" prop="authCode">
                <!-- <el-form-item label="密码"> -->
                <div class="form-group flex">
                  <el-input
                    type="text"
                    v-model="form.authCode"
                    placeholder="请输入验证码"
                    @keyup.enter.native="login"
                  ></el-input>
                  <img :src="verifyCodeSRC" @click="refreshVerifyCode">
                </div>
              </el-form-item>
            </el-form>
            <!-- <div class="form-group">
              <el-input type="password" v-model="password" placeholder="请输入密码" @keyup.enter.native="login">
                <img slot="suffix" src="../../static/img/login_icon_password.png">
              </el-input>
            </div>-->
            <!-- <div class="form-group flex" prop="authCode">
              <el-input type="text" v-model="form.authCode" placeholder="请输入验证码"></el-input>
              <img :src="verifyCodeSRC" @click="refreshVerifyCode">
            </div>-->
            <!-- <div class="form-group flex flex-x-end">
							<span class="forget">忘记密码？</span>
            </div>-->
            <div class="form-group" style="margin-top: 22px;">
              <shop-btn
                @click.native="login"
                text="登录"
                bgcolor="#F64811"
                border="1px #F64811"
                color="#fff"
                width="calc(100% - 2px)"
              />
            </div>
          </div>
          <div class="form-foot flex flex-y-center flex-x-center">
            <div class="flex flex-y-center">
              <!-- <img src="../../static/img/login_icon_right.png" @click="toReg" /> -->
              <div>没有账号？</div>
              <span @click="toReg" class="click-a">立即注册</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="min-width flex">
        <div class="foot-l">
          <div class="QRcode">
            <div class="img">
              <img v-show="cityName == 'ysh'" src="../../static/img/ysh_wx.jpg" alt>
            </div>
            <p>关注微信</p>
            <p>获取最佳便捷生活</p>
          </div>
        </div>
        <div class="foot-r">
          <ul class="flex">
            <li class="flex flex-y-center">
              <img src="../../static/img/login_icon_gaoxiao.png">
              <div>
                <strong>高效</strong>
                <p>专业配送，精准高效</p>
              </div>
            </li>
            <li class="flex flex-y-center">
              <img src="../../static/img/login_icon_anquan.png">
              <div>
                <strong>安全</strong>
                <p>严格监控，层层把关</p>
              </div>
            </li>
            <li class="flex flex-y-center">
              <img src="../../static/img/login_icon_suyuan.png">
              <div>
                <strong>可溯源</strong>
                <p>来源可追溯，去向可查证</p>
              </div>
            </li>
          </ul>
          <div class="copyright">
            <p>免费服务热线：400-8558-783</p>
            <p>版权所有：成都九洲电子信息系统股份有限公司</p>
            <p>版本号{{version}}</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import ShopTop from "./components/header.vue";
import ShopFooter from "./components/footer.vue";
import { Input, Form, FormItem } from "element-ui";
import btn from "./components/shopbtn.vue";
import configs from "../configs.js";
import mixin from "../utils/mixin";

export default {
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [Input.name]: Input,
    [btn.name]: btn,
    [Form.name]: Form,
    [FormItem.name]: FormItem
  },
  mixins: [mixin],
  data() {
    return {
      loading: false,
      cityName: configs.cityName,
      version: configs.version,
      form: {
        username: "",
        password: "",
        verifiCode: "",
        authCode: ""
      },
      verifyCodeSRC: ROOT_API + "/login/auth/code",
      rules: {
        username: [
          {
            required: true,
            message: "请输入注册手机号码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        authCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getVersion();
  },
  mounted() {},
  methods: {
    refreshVerifyCode() {
      this.verifyCodeSRC = this.verifyCodeSRC + "?s=" + new Date().getTime();
    },
    toReg() {
      this.$router.push({
        name: "reg"
      });
    },
    login() {
      let param = {
        loginName: this.form.username,
        password: this.form.password,
        systemId: 8,
        flag: 1,
        authCode: this.form.authCode
      };
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          $.ajax({
            type: "POST",
            url: configs.loginAPI,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "flightHandler",
            data: param,
            success: resp => {
              this.loading = false;
              if (resp && resp.state == 0) {
                let userInfo = resp.sessionUser;
                userInfo.token = resp.token;
                if (userInfo.typeId == "buyer") {
                  this.$store.commit("saveuserInfo", userInfo);
                  this.$router.push({
                    name: "index"
                  });
                } else {
                  this.$message.error(
                    "该账号注册为供应商账号，请使用采购商账号登录！"
                  );
                }
              } else {
                this.$message.error(resp.msg);
                this.refreshVerifyCode();
              }
            }
          });
          // this.postRequest(
          //   "",
          //   {
          //     loginName: this.form.username,
          //     password: this.form.password,
          //     systemId: 8,
          //     flag: 1,
          //     authCode: this.form.authCode || "O0i9"
          //   },
          //   true
          // ).then(resp => {
          //   this.loading = false;
          //   if (resp && resp.status == 200) {
          //     if (resp.data && resp.data.state == 0) {
          //       let userInfo = resp.data.sessionUser;
          //       userInfo.token = resp.data.token;
          //       if (userInfo.typeId == "buyer") {
          //         this.$store.commit("saveuserInfo", userInfo);
          //         this.$router.push({
          //           name: "index"
          //         });
          //       } else {
          //         this.$message.error(
          //           "该账号注册为供应商账号，请使用采购商账号登录！"
          //         );
          //       }
          //     } else {
          //       this.refreshVerifyCode()
          //     }
          //   }
          // });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
#loginPage {
  .el-form-item__content {
    width: 100% !important;
  }
  .el-form-item__label {
    display: none;
  }
  .logo-l-yinchuan {
    width: 147px;
    height: 47px;
    background: url(../../static/img/login_img_logo.png);
    margin-right: 10px;
  }
  .logo-l-linyi {
    width: 114px;
    height: 77px;
    background: url(../../static/img/ly_img_logo.png);
    margin-right: 10px;
  }
  .logo-l-yuexi {
    width: 208px;
    height: 78px;
    background: url(../../static/img/yuexi_img_logo.png);
    margin-right: 10px;
  }
  .logo-r {
    width: 304px;
    height: 46px;
    background: url(../../static/img/login_img_slogo.png);
  }
  .form-container {
    width: 100%;
    height: 568px;
    background: url(../../static/img/loginbanner.png) no-repeat;
    background-size: 100% 100%;
    .form-text {
      width: 844px;
      height: 421px;
      padding-top: 127px;
      .title-yinchuan {
        width: 617px;
        height: 143px;
        background: url(../../static/img/title.png);
      }
      .title-linyi {
        width: 617px;
        height: 143px;
        background: url(../../static/img/ly_title.png);
      }
      .title-yuexi {
        width: 648px;
        height: 143px;
        background: url(../../static/img/yuexi_title.png);
      }
      .btns {
        margin: 20px 0;
        div {
          background: #185f0c;
          color: #fff;
          height: 31px;
          line-height: 31px;
          padding: 0 10px;
          border-radius: 100px;
          margin-right: 10px;
        }
      }
      .texts p {
        color: #fff;
        font-size: 14px;
        text-align: center;
        margin-top: 5px;
      }
    }
    .form {
      width: 346px;
      height: 421px;
      background: #fff;
      .form-head {
        height: 50px;
        border-bottom: 1px solid #f4f4f4;
        font-weight: 600;
      }
      .form-body {
        padding-top: 20px;
        width: 306px;
        margin: 0 auto;
        height: 319px;
        .form-group {
          span.forget:hover {
            color: #00c65d;
            text-decoration: underline;
          }
          span.forget {
            cursor: pointer;
            font-size: 14px;
            color: #666;
          } // margin-top: 20px;
          .el-input.is-active .el-input__inner,
          .el-input__inner:focus {
            border-color: #00c65d;
          }
          .el-input {
            input {
              border-radius: 0;
              padding-left: 10px;
              padding-right: 35px;
            }
            .el-input__suffix {
              right: 10px;
              img {
                margin-top: 10px;
              }
            }
          }
        }
      }
      .form-foot {
        height: 50px;
        border-top: 1px solid #f4f4f4;
        background: #fcfcfc;
        span {
          padding-left: 5px;
          color: #f64811;
          cursor: pointer;
        }
      }
    }
  }
  footer {
    padding: 20px 0 80px;
    .foot-l {
      .QRcode {
        width: 146px;
        padding-bottom: 18px;
        -webkit-box-shadow: 0 0 10px 15px #e9eef2;
        -moz-box-shadow: 0 0 10px 15px #e9eef2;
        box-shadow: 0 0 10px 3px #e9eef2;
        text-align: center;
        overflow: hidden;
        .img {
          width: 110px;
          height: 110px;
          margin: 18px auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          font-size: 12px;
          color: #666;
        }
        p:last-child {
          margin-top: 5px;
        }
      }
    }
    .foot-r {
      margin-top: 50px;
      margin-left: 100px;
      width: 944px;
      .copyright {
        width: 608px;
        margin-top: 40px;
        p {
          font-size: 12px;
          color: #666;
          text-align: center;
          margin-top: 10px;
        }
      }
      ul {
        li {
          width: 33.3%;
          img {
            margin-right: 10px;
          }
          strong {
          }
          p {
            margin-top: 3px;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
