<template>
  <div id="regPage">
    <!--logo-->
    <section class="shop-search flex flex-y-center">
      <div class="min-width">
        <ul class="flex flex-x-between flex-y-end">
          <li class="logo flex flex-y-end">
            <div v-show="cityName=='ysh'" class="logo-l-yinchuan"></div>
            <strong>欢迎注册</strong>
          </li>
          <li>
            <p>
              已有账号？
              <span class="click-a" @click="goback">请登录 ></span>
            </p>
          </li>
        </ul>
      </div>
    </section>
    <!--form-->
    <section class="form-container">
      <div class="step">
        <el-steps :active="active" align-center>
          <el-step title="手机号验证"></el-step>
          <el-step title="用户信息"></el-step>
          <el-step title="注册成功"></el-step>
        </el-steps>
      </div>
      <div class="formlist">
        <template v-if="active == 1">
          <el-form ref="form" :model="form" :rules="rules1">
            <el-form-item label="手机号码" prop="telephone">
              <div class="form-group flex flex-y-center">
                <el-input type="text" placeholder="手机号码" v-model="form.telephone"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="验证码" prop="mesCode">
              <div class="form-group flex flex-y-center">
                <el-input type="text" placeholder="验证码" class="flex-item-5" v-model="form.mesCode"></el-input>
                <div
                  class="flex-item-5 get-code-btn tac"
                  @click="sendMesCode"
                  v-if="codebtnStatus"
                >获取验证码</div>
                <div class="flex-item-5 get-code-btn tac" v-else>验证码已发送({{mesCodeTime}})</div>
              </div>
            </el-form-item>
          </el-form>
        </template>
        <!--step2-->
        <template v-if="active == 2">
          <el-form ref="formpsw" :model="form" :rules="rules1">
            <el-form-item label="用户名" prop="name">
              <div class="form-group flex flex-y-center">
                <el-input type="text" placeholder="请输入用户名" v-model="form.name"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <div class="form-group flex flex-y-center">
                <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
              <div class="form-group flex flex-y-center">
                <el-input type="password" placeholder="请输入密码" v-model="form.repassword"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="邀请码" prop="invitationCode">
              <div class="form-group flex flex-y-center">
                <el-input type="text" placeholder="请输入邀请码" v-model="form.invitationCode"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </template>
        <!--step3-->
        <template v-if="active == 3">
          <div class="regsuc flex flex-y-center flex-x-center">
            <img src="../../static/img/icon_dui.png">
            <div class="text">注册成功</div>
          </div>
          <p class="tips">
            账号正在审核中...，系统将在
            <span class="click-a">{{second}}</span>秒后
            <span class="click-a" @click="goback">返回登录页</span>
          </p>
        </template>
        <shop-btn
          v-show="active==1"
          @click.native="next"
          text="下一步"
          width="100%"
          height="38px"
          border="1px #F64811"
          color="#fff"
          bgcolor="#F64811"
        ></shop-btn>
        <!-- <shop-btn
          v-show="active==2"
          @click.native="pre"
          text="上一步"
          width="100%"
          height="38px"
          border="1px #F64811"
          color="#fff"
          bgcolor="#F64811"
          style="margin-bottom: 20px;"
        ></shop-btn>-->
        <shop-btn
          v-show="active==2"
          @click.native="savePsw"
          text="确认"
          width="100%"
          height="38px"
          border="1px #F64811"
          color="#fff"
          bgcolor="#F64811"
        ></shop-btn>
      </div>
    </section>
    <!--foot-->
    <footer>
      <div class="min-width">
        <p>免费服务热线：400-8558-783</p>
        <p>技术支持：成都九洲电子信息系统股份有限公司</p>
        <p>版本号{{version}}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import ShopTop from "./components/header.vue";
import ShopFooter from "./components/footer.vue";
import mixin from "../utils/mixin.js";

import {
  Input,
  Step,
  Steps,
  Radio,
  RadioGroup,
  Select,
  Option,
  Checkbox,
  CheckboxGroup,
  Form,
  FormItem
} from "element-ui";
import btn from "./components/shopbtn.vue";
import configs from "../configs.js";

export default {
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [Input.name]: Input,
    [btn.name]: btn,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Select.name]: Select,
    [Option.name]: Option,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Form.name]: Form,
    [FormItem.name]: FormItem
  },
  mixins:[mixin],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback(new Error("请输入密码"));
      } else {
        let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
        if (!reg.test(this.form.password)) {
          callback(
            new Error(
              "密码长度应为6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格"
            )
          );
        } else {
          if (this.form.password !== "") {
            this.form.password = value;
            // this.$refs.formpsw.validateField('password');
            callback();
          }
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      cityName: configs.cityName,
      version: configs.version,
      buyerChecked: true,
      merchantChecked: false,
      sorterChecked: false,
      distributionChecked: false,
      mesCodeTime: 180,
      codebtnStatus: true,

      checkList: [],
      active: 1,
      radio: 1,
      second: 10,
      form: {
        name: "",
        telephone: "",
        key: "buyer",
        password: "",
        channelCode: "",
        invitationCode: "",
        loginName: "",
        mesCode: "",
        codeId: ""
      },
      rules1: {
        name: [
          {
            required: true,
            message: "请输入用户昵称",
            trigger: "blur"
          },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur"
          }
        ],
        telephone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }
        ],
        mesCode: [
          {
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          }
        ],
        channelCode: [
          {
            required: true,
            message: "请选择渠道",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        invitationCode: [
          {
            required: true,
            message: "请输入邀请码",
            trigger: "blur"
          }
        ],
        repassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      repassword: "",
      channelList: [],
      timer: null,
      timer1: null
    };
  },
  created() {
    //this.getChannelList();
		this.getVersion()
    
  },
  mounted() {},
  methods: {
    goback() {
      clearInterval(this.timer);
      this.$router.back();
    },
    /**
     * 下一步
     */
    next() {
      var reg = /^1(3|4|5|7|8)\d{9}$/;

      this.$refs["form"].validate(valid => {
        if (valid) {
          // 验证短信验证码
          this.postRequest("/reg/auth/smscodecheck", {
            smsCode: this.form.mesCode,
            codeId: this.form.codeId
          }).then(d => {
            if (d.data && d.data.state == 0) {
              this.active++;
              this.codebtnStatus = true;
              clearInterval(this.timer1);
              this.mesCodeTime = 180;
            }
          });
        } else {
          return false;
        }
      });
    },
    /**
     * 上一步
     */
    pre() {
      this.active--;
    },
    /**
     * 保存
     */
    savePsw() {
      this.$refs["formpsw"].validate(valid => {
        if (valid) {
          let param = {
            name: this.form.name,
            telephone: this.form.telephone,
            key: "buyer",
            invitationCode: this.form.invitationCode,
            password: this.form.password
          };
          this.postRequest("customer/customerRegist", param).then(d => {
            if (d.data && d.data.state == 0) {
              this.active++;
              this.timer = setInterval(() => {
                this.second--;
                if (this.second == 0) {
                  // clearInterval(this.timer)
                  this.goback();
                }
              }, 1000);
            }
          });
        } else {
          return false;
        }
      });
    },
    /**
     * 获取渠道
     */
    getChannelList() {
      this.postRequest("channel/list", {
        level: 1
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            this.channelList = d.data.aaData;
          }
        }
      });
    },
    /**
     * 获取短信验证码模板
     */
    getSmstemplate() {
      return new Promise((resolve, reject) => {
        this.postRequest("smstemplate/list?smsType=2", {}).then(d => {
          if (d.data && d.data.state == 0) {
            if (d.data.aaData.length > 0) {
              resolve(d.data.aaData[0].comment);
            }
          } else {
            resolve(d.data);
          }
        });
      });
    },
    /**
     * 获取短信验证码
     */
    getSmsCode(temp) {
      this.postRequest("/reg/auth/smscode", {
        phone: this.form.telephone,
        temp: temp
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.$message({
            message: "发送成功！请注意查看手机短信。",
            type: "success"
          });
          this.codebtnStatus = false;
          this.form.codeId = d.data.aaData.codeId;
          this.timer1 = setInterval(() => {
            this.mesCodeTime--;
            if (this.mesCodeTime == 0) {
              clearInterval(this.timer1);
              this.mesCodeTime = 180;
              this.codebtnStatus = true;
            }
          }, 1000);
        }
      });
    },
    /**
     * 发送短信验证码
     */
    sendMesCode() {
      if (this.form.telephone == "") {
        this.$message.error(`请输入手机号码！`);
        return false;
      }
      // 验证手机号码是否注册
      this.postRequest("customer/telephoneMatche", {
        telephone: this.form.telephone
      }).then(async d => {
        if (d.data && d.data.state == 1) {
          let temp = await this.getSmstemplate();
          this.getSmsCode(temp);
        } else {
          this.$message.error(`${d.data.msg}!`);
        }
      });
    }
  }
};
</script>
<style lang="scss">
#regPage {
  .el-step__head.is-finish {
    color: #04ca61;
    border-color: #04ca61;
    .el-step__icon.is-text {
      background: #04ca61;
      color: #fff;
    }
  }
  .el-step__title.is-finish {
    color: #04ca61;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #04ca61;
    background: #04ca61;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #04ca61;
  }
  .shop-search {
    height: 100px;
    box-shadow: 0 0 10px #e6e9e3;
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
    .click-a {
      color: #f64811;
      margin-left: 10px;
    }
  }
  .form-container {
    .el-form-item__label {
      width: 90px;
      text-align: left;
      padding: 0 12px 0 !important;
    }
    .el-form-item__content {
      border: 1px solid #bdbdbd;
    }
    width: 430px;
    margin: 0 auto;
    .step {
      padding: 90px 0 55px;
    }
    .formlist {
      .form-group {
        .get-code-btn {
          color: #f64811;
          background-color: #bdbdbd;
          cursor: pointer;
        }
        span.name {
          width: 120px;
          display: block;
          height: 40px;
          line-height: 40px;
          padding-left: 16px;
        }
        .el-input__inner {
          border: none;
          font-size: 16px;
        }
      }
      .regsuc {
        border-bottom: 1px solid #d9d9d9;
        padding-bottom: 30px;
        .text {
          font-size: 36px;
          color: #f64811;
          margin-left: 30px;
        }
      }
      p.tips {
        padding-top: 55px;
        text-align: center;
        span.click-a {
          color: #1e88e5;
        }
      }
    }
  }
  footer {
    .min-width {
      border-top: 1px solid #e5e5e5;
      padding: 33px 0 100px;
      margin-top: 74px;
      text-align: center;
      p {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
</style>
