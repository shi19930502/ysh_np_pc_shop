<template>
  <div>
    <div class="navbar flex flex-y-center">个人信息</div>
    <div class="main">
      <div class="status-item flex flex-x-between">
        <div class="flex">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础信息" name="0">
              <div class="baseinfo">
                <div class="form">
                  <el-form :rules="rules" ref="form" :model="form" label-width="100px">
                    <el-form-item prop="name" label="昵称:">
                      <div class="form-group">
                        <div class="input">
                          <el-input size="small" v-model="form.name" :maxlength="50"></el-input>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item prop="regId" label="证件号码:">
                      <div class="form-group">
                        <div class="input">
                          <el-input size="small" v-model="form.regId" :maxlength="50"></el-input>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item label="地址:">
                      <div class="form-group">
                        <div class="input">
                          <el-input size="small" v-model="form.address" :maxlength="200"></el-input>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item prop="tel" label="联系电话:">
                      <div class="form-group">
                        <div class="input">
                          <el-input size="small" v-model="form.tel" :maxlength="20"></el-input>
                        </div>
                      </div>
                    </el-form-item>
                  </el-form>
                  <div class="form-group flex flex-y-center">
                    <div class="lable"></div>
                    <div class="sbtn">
                      <shop-btn
                        @click.native="saveUserInfo"
                        height="30px"
                        bgcolor="#00C65D"
                        border="1px #00C65D"
                        color="#fff"
                        fontsize="14px"
                        text="保存"
                      ></shop-btn>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="个人头像" name="1">
              <div class="upload-head">
                <el-upload
                  :on-success="handleSuccess"
                  :show-file-list="false"
                  :data="uploadData"
                  :action="uploadURL+'/imgUpload?token='+userInfo.token"
                  :file-list="fileList"
                  :before-upload="beforeAvatarUpload"
                >
                  <shop-btn
                    text="上传头像"
                    color="#00C65D"
                    fontsize="14px"
                    bgcolor="#f9f9f9"
                    border="1px #f9f9f9"
                    width="224px"
                    height="30px"
                    marginR="0"
                  ></shop-btn>
                  <div slot="tip" class="el-upload__tip">能上传jpg/png/gif文件，且不超过2M</div>
                </el-upload>
                <div class="pre flex flex-x-center">
                  <div class="uploadimg" v-if="uploadResult">
                    <img :src="imgURL+uploadResult">
                  </div>
                  <template v-else>
                    <div>
                      <img src="../../../../static/img/photo.jpg" width="159" height="159">
                      <div style="color: #999;width: 149px;" class="tac">还没有上传头像</div>
                    </div>
                  </template>
                </div>
                <div class="sbtn flex flex-x-center">
                  <shop-btn
                    @click.native="saveHeadImgInfo"
                    height="30px"
                    bgcolor="#00C65D"
                    border="1px #00C65D"
                    width="224px"
                    color="#fff"
                    fontsize="14px"
                    text="保存"
                  ></shop-btn>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="2">
              <div class="update-password">
                <div class="form">
                  <el-form :rules="rules" ref="form2" :model="form2" label-width="100px">
                    <el-form-item prop="oldPassword" label="原始密码:">
                      <div class="form-group">
                        <div class="input">
                          <el-input type="password" size="small" v-model="form2.oldPassword"></el-input>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item prop="newPassword" label="新密码:">
                      <div class="form-group">
                        <div class="input">
                          <el-input type="password" size="small" v-model="form2.newPassword"></el-input>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item prop="newPassword2" label="确认密码:">
                      <div class="form-group">
                        <div class="input">
                          <el-input type="password" size="small" v-model="form2.newPassword2"></el-input>
                        </div>
                      </div>
                    </el-form-item>
                  </el-form>
                  <div class="form-group flex flex-y-center">
                    <div class="lable"></div>
                    <div class="sbtn">
                      <shop-btn
                        @click.native="updateMyPassword"
                        height="30px"
                        bgcolor="#00C65D"
                        border="1px #00C65D"
                        color="#fff"
                        fontsize="14px"
                        text="提交"
                      ></shop-btn>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <!--<el-tab-pane label="收货地址" name="4">
							<div class="address-wrap">
								<div class="no flex flex-x-center flex-y-center" v-if="AddressList.length==0">
									<div>
										<img src="../../../../static/img/noaddress.png" />
										<p>当前暂无收货地址</p>
										<div class="flex flex-x-center">
											<shop-btn text="添加收货地址" width="114px" height="30px" bgcolor="#F0F9E9" border="1px #00C65D" fontsize="14px" marginR="0"></shop-btn>
										</div>
									</div>
								</div>
								<div class="address-list" v-else v-for="d in AddressList">
									<p>您当前收货地址</p>
									<div class="item">
										<strong>{{d.contacts}}</strong>
										<div class="item-group flex" style="margin-top: 15px;">
											<div>收货人：</div>
											<div>{{d.contacts}}</div>
										</div>
										<div class="item-group flex">
											<div>收货地址：</div>
											<div>{{d.completeAddress}}</div>
										</div>
										<div class="item-group flex">
											<div>联系电话：</div>
											<div>{{d.phoneNumber}}</div>
										</div>
										<div class="flex flex-x-end btns">
											<span @click="open(d)">编辑</span>
											<span>删除</span>
										</div>
									</div>
								</div>
							</div>
            </el-tab-pane>-->
          </el-tabs>
        </div>
      </div>
    </div>
    <!--编辑新增地址-->
    <address-modal
      v-if="modalShow"
      :modal="modalShow"
      @close="modalClose"
      :params="modalParams"
      @updateAdd="updateAdd"
    ></address-modal>
    <!--<el-dialog title="收货地址管理" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
			<address-modal @close="close"></address-modal>
    </el-dialog>-->
  </div>
</template>

<script>
import ShopTop from "../../components/header.vue";
import ShopFooter from "../../components/footer.vue";
import btn from "../../components/shopbtn.vue";
import addressModal from "./addressModal.vue";
import {
  Tabs,
  TabPane,
  Input,
  Dialog,
  Upload,
  Form,
  FormItem
} from "element-ui";

import mixin from "../../../utils/mixin.js";

export default {
  mixins: [mixin],
  components: {
    [ShopTop.name]: ShopTop,
    [ShopFooter.name]: ShopFooter,
    [btn.name]: btn,
    [addressModal.name]: addressModal,

    // element component
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Input.name]: Input,
    [Dialog.name]: Dialog,
    [Upload.name]: Upload,
    [Form.name]: Form,
    [FormItem.name]: FormItem
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback(new Error("请输入密码"));
      } else {
        let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
        if (!reg.test(this.form2.newPassword)) {
          callback(
            new Error(
              "密码长度应为6-16位, 数字, 字母, 字符至少包含两种, 不能包含中文和空格"
            )
          );
        } else {
          if (this.form2.newPassword !== "") {
            this.form2.newPassword = value;
            callback();
          }
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form2.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "0",
      dialogTableVisible: false,
      fileList: [],
      uploadResult: "",
      rules: {
        name: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        regId: [
          {
            required: true,
            message: "请输入证件号码",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur"
          }
        ],
        oldPassword: [
          {
            required: true,
            message: "请输入原始密码",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        newPassword2: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      form: {
        name: "",
        regId: "",
        address: "",
        tel: "",
        id: "",
        remark: ""
      },
      form2: {
        oldPassword: "",
        newPassword: "",
        newPassword2: ""
      },
      uploadData: {
        savePath: "userSetting"
      },
      filePath: "",
      // 修改密码
      oldPassword: "",
      newPassword: "",
      newPassword2: ""
    };
  },
  created() {
    this.getuser();
    this.getAddress();
    if (this.$route.params.tab) {
      this.activeName = this.$route.params.tab;
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
            this.filePath = d.data.aaData[0].filePath;
            this.uploadResult = d.data.aaData[0].filePath;
          }
        }
      });
    } else {
      this.activeName = "0";
    }
  },
  mounted() {},
  methods: {
    /**
     * 修改密码
     */
    updateMyPassword() {
      var o = {
        oldPassword: this.form2.oldPassword,
        newPassword: this.form2.newPassword,
        newPassword2: this.form2.newPassword2
      };

      this.$refs["form2"].validate(async valid => {
        if (valid) {
          let checkPassword = await this.checkPassword();
          if (checkPassword) {
            if (o.oldPassword == o.newPassword) {
              this.$message.error("原密码与新密码一致，无需修改");
            } else {
              this.postRequest(
                "user/updateMyPassword",
                {
                  oldPassword: o.oldPassword,
                  newPassword: o.newPassword
                },
                false,
                true
              ).then(resp => {
                if (resp.data && resp.data.state == 0) {
                  this.$message({
                    message: "密码修改成功，请重新登录！",
                    type: "success"
                  });
                  this.logOut();
                }
              });
            }
          }
        } else {
          return false;
        }
      });
    },
    /**
     * 验证旧密码是否正确
     */
    checkPassword() {
      return new Promise((res, rej) => {
        this.postRequest(
          "user/checkPassword",
          {
            password: this.form2.oldPassword
          },
          false,
          true
        ).then(d => {
          if (d.data && d.data.state == 0) {
            res(true);
          } else {
            res(false);
          }
        });
      });
    },
    /**
     * 保存个人信息
     */
    saveUserInfo() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.postRequest("customer/update", this.form).then(d => {
            if (d.data && d.data.state == 0) {
              this.$message({
                message: "个人信息修改成功！",
                type: "success"
              });
              this.getuser();
            } else {
              this.$message.error(d.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    /**
     * 保存个人头像
     */
    saveHeadImgInfo() {
      if (this.uploadResult == "" || this.uploadResult == null) {
        this.$message("请上传图片！");
        return false;
      }
      this.postRequest(
        "user/update",
        {
          userId: this.userInfo.userId,
          filePath: this.uploadResult
        },
        false,
        true
      ).then(d => {
        if (d.data && d.data.state == 0) {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          this.getuser();
          this.$store.commit("saveUserHeadfilePath", this.uploadResult);
        } else {
          this.$message.error(d.data.msg);
        }
      });
    },
    /**
     * 获取个人信息
     */
    getuser() {
      this.postRequest("customer/selectById", {
        id: this.userInfo.typeCode
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            for (var i in d.data.aaData) {
              if (d.data.aaData[i] == "null" || d.data.aaData[i] == null)
                d.data.aaData[i] = null;
            }
            this.form.name = d.data.aaData.name;
            this.form.regId = d.data.aaData.regId;
            this.form.address = d.data.aaData.address;
            this.form.tel = d.data.aaData.tel;
            this.form.remark = d.data.aaData.remark;
            this.form.id = d.data.aaData.id;
          }
        }
      });
    },
    handleClick(tab, event) {
      if (this.activeName == "1") {
        this.fileList = [];
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
              this.filePath = d.data.aaData[0].filePath;
              this.uploadResult = d.data.aaData[0].filePath;
            }
          }
        });
      }
    },
    updateAdd() {
      this.getAddress();
    },
    open(d) {
      this.modalEdit({
        type: "edit",
        param: d
      });
    },
    /**
     * 上传
     */
    handleSuccess(d, file, fileList) {
      if (d && d.state == 0) {
        this.uploadResult = d.aaData.path;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss">
.form {
  .el-form-item__content {
    float: left;
    margin-left: 0 !important;
  }
  padding-top: 37px;
  .form-group {
    // margin-bottom: 20px;
    .lable {
      width: 100px;
      text-align: right;
    }
    .input {
      width: 400px;
    }
  }
}

.sbtn {
  margin-top: 40px;
  .shopbtn {
    border-radius: 3px;
    font-weight: 600;
  }
}
/**
	 * y头像
	 */

.upload-head {
  padding-top: 30px;
  p.gs {
    padding: 6px 0 13px;
    color: #666666;
    font-size: 12px;
  }
  .el-upload__tip {
    width: 224px;
    text-align: center;
  }
  .pre {
    width: 224px;
    margin-top: 10px;
    .uploadimg {
      width: 150px;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.update-password {
  .shopbtn {
    border-radius: 3px;
    font-weight: 600;
  }
}

.address-wrap {
  .no {
    width: 1080px;
    height: 584px;
    text-align: center;
    p {
      color: #999;
      padding: 24px 0 30px;
    }
  }
  .address-list {
    p {
      color: #999;
      margin-bottom: 20px;
    }
    .item {
      padding: 20px;
      height: 110px;
      width: 998px;
      border: 1px solid #e6e6e6;
      strong {
        margin-left: 0;
      }
      .btns {
        span {
          margin-left: 30px;
          color: #3b58b6;
          cursor: pointer;
        }
      }
      .item-group {
        color: #666;
        margin-bottom: 5px;
        div:first-child {
          width: 60px;
          text-align: right;
          color: #999;
        }
      }
    }
  }
}
</style>
