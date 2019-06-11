<template>
  <el-dialog
    title="收货地址管理"
    :visible="modal"
    :close-on-click-modal="false"
    :before-close="beforeClose"
  >
    <div id="addressModal">
      <div class="modal-form">
        <el-form :rules="rules" ref="form" :model="form">
          <el-form-item prop="contacts" label="联系人:">
            <div class="form-group">
              <!--<p>联系人：</p>-->
              <div>
                <el-input size="small" v-model="form.contacts" :maxlength="30"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="form-group flex flex-x-between">
              <div class="el-selectdiv">
                <p>所在省份：</p>
                <div>
                  <el-select
                    v-model="form.provinceCode"
                    placeholder="--请选择--"
                    size="small"
                    @change="changeProvinceList"
                  >
                    <el-option
                      :label="d.areaName"
                      :value="d.areaCode"
                      v-for="d in ProvinceList"
                      :key="d.areaCode"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="el-selectdiv">
                <p>所在市：</p>
                <div>
                  <el-select
                    v-model="form.cityCode"
                    placeholder="--请选择--"
                    size="small"
                    @change="changeCityList"
                  >
                    <el-option
                      :label="d.areaName"
                      :value="d.areaCode"
                      v-for="d in CityList"
                      :key="d.areaCode"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="el-selectdiv">
                <p>所在区/县：</p>
                <div>
                  <el-select
                    v-model="form.districCode"
                    placeholder="--请选择--"
                    size="small"
                    @change="changeDistricList"
                  >
                    <el-option
                      :label="d.areaName"
                      :value="d.areaCode"
                      v-for="d in DistricList"
                      :key="d.areaCode"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="detailedAddress" label="详细地址:">
            <div class="form-group">
              <!--<p>详细地址：</p>-->
              <div>
                <el-input
                  size="small"
                  v-model="form.detailedAddress"
                  :maxlength="100"
                  @input="setcompleteAddress"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="form-group">
              <p>完整信息：</p>
              <div>
                {{form.completeAddress}}
                <!--<el-input size="small" v-model="form.detailedAddress"></el-input>-->
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="phoneNumber" label="联系电话:">
            <div class="form-group">
              <!--<p>联系电话：</p>-->
              <div>
                <el-input size="small" v-model="form.phoneNumber":maxlength="11"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="form-group">
              <p>备注：</p>
              <div>
                <el-input size="small" v-model="form.comment" :maxlength="200"></el-input>
              </div>
            </div>
          </el-form-item>
          <div class="sbtn flex flex-x-center">
            <shop-btn
              @click.native="saveAdd"
              height="30px"
              bgcolor="#00C65D"
              border="1px #00C65D"
              color="#fff"
              fontsize="14px"
              text="保存地址"
            ></shop-btn>
          </div>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import btn from "../../components/shopbtn.vue";
import mixin from "../../../utils/mixin.js";

import { Input, Select, Option, Dialog, Form, FormItem } from "element-ui";
export default {
  name: "address-modal",
  mixins: [mixin],
  components: {
    [btn.name]: btn,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem
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
  data() {
    return {
      // 收货地址
      type: "add",
      rules: {
        contacts: [
          {
            required: true,
            message: "请填写收货人",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: "请填写联系电话",
            trigger: "blur"
          }
        ],
        detailedAddress: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: "blur"
          }
        ]
      },
      form: {
        id: "",
        districtName: "",
        detailedAddress: "",
        completeAddress: "",
        contacts: "",
        phoneNumber: "",
        customerId: "",

        provinceCode: "",
        cityCode: "",
        districCode: "",
        comment: "",

        provinceName: "",
        cityName: "",
        districName: ""
      },
      ProvinceList: [],
      CityList: [],
      DistricList: [],
      addressInfo: null
    };
  },
  created() {
    this.getProvinceList();
    if (this.params.type == "edit") {
      this.type = this.params.type;
      this.form = this.params.param;
      this.getCityList();
      this.getDistricList();
    }
    if (this.params.type == "add") {
      this.type = this.params.type;
    }
  },
  mounted() {},
  methods: {
    setcompleteAddress() {
      this.form.completeAddress =
        this.form.provinceName +
        this.form.cityName +
        this.form.districName +
        this.form.detailedAddress;
    },
    /**
     * 保存
     */
    saveAdd() {
      var param = {
        id: this.form.id,
        provinceCode: this.form.provinceCode,
        cityCode: this.form.cityCode,
        districCode: this.form.districCode,
        detailedAddress: this.form.detailedAddress,
        contacts: this.form.contacts,
        phoneNumber: this.form.phoneNumber,
        customerId: this.form.customerId,
        comment: this.form.comment
      };

      var url = "address/create";
      if (this.type == "edit") {
        url = "address/update";
      } else {
        param.customerId = this.userInfo.typeCode;
      }

      this.$refs["form"].validate(valid => {
        if (valid) {
          if (param.provinceCode == "") {
            this.$message.error("请选择所在省份！");
            return;
          }
          if (param.cityCode == "") {
            this.$message.error("请选择所在市！");
            return;
          }
          if (param.districCode == "") {
            this.$message.error("请选择所在县/区！");
            return;
          }
          this.postRequest(url, param).then(d => {
            if (d.data && d.data.state == 0) {
              this.$message({message:"保存成功！",type: 'success'});
              this.close();
              this.$emit("updateAdd");
            } else if(d.data && d.data.state == 2){
              this.$message(d.data.msg);
              this.close();
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
     * 获取省列表
     */
    getProvinceList() {
      this.postRequest("comArea/list", {
        level: 1
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.ProvinceList = d.data.aaData;
        }
      });
    },
    changeProvinceList() {
      this.form.cityCode = "";
      this.form.districCode = "";
      
      this.form.cityName = "";
      this.form.districName = "";
      for (let a of this.ProvinceList) {
        if (this.form.provinceCode == a.areaCode) {
          this.form.provinceName = a.areaName;
        }
      }
      this.setcompleteAddress();
      this.getCityList();
    },
    /**
     * 获取市列表
     */
    getCityList() {
      this.postRequest("comArea/list", {
        parentAreaCode: this.form.provinceCode,
        level: 2
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.CityList = d.data.aaData;
        }
      });
    },
    changeCityList() {
      this.form.districCode = "";
      this.form.districName = "";
      for (let a of this.CityList) {
        if (this.form.cityCode == a.areaCode) {
          this.form.cityName = a.areaName;
        }
      }
      this.setcompleteAddress();
      this.getDistricList();
    },
    /**
     * 获取县区列表
     */
    getDistricList() {
      this.postRequest("comArea/list", {
        parentAreaCode: this.form.cityCode,
        level: 3
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.DistricList = d.data.aaData;
        }
      });
    },
    changeDistricList() {
      for (let a of this.DistricList) {
        if (this.form.districCode == a.areaCode) {
          this.form.districName = a.areaName;
        }
      }
      this.setcompleteAddress();
    },
    close() {
      this.$emit("close");
      // this.$alert(`是否保存修改内容？`, "提示", {
      //   confirmButtonText: "确定"
      // });
    },
    beforeClose(done) {
      this.close();
      done();
    },
    toShoppingCar() {
      this.$emit("toShoppingCar");
    }
  }
};
</script>
<style lang="scss">
#addressModal {
  .modal-form {
    .el-form-item__label {
      line-height: 20px;
      color: #999;
    }
    .form-group {
      /*margin-bottom: 11px;*/
      p {
        color: #999;
        line-height: 20px;
        /*margin-bottom: 8px;*/
      }
      .el-selectdiv {
        width: 32%;
      }
    }
  }
}
</style>