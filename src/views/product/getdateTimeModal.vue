<template>
  <!--选择配送时间-->
  <el-dialog title="选择配送时间" :visible="modal" :close-on-click-modal="false" :before-close="beforeClose">
    <div id="datetime-modal">
      <div class="flex timebtns">
        <div class="flex flex-x-between">
          <div class="left">
            <div class="li-btns">
              <div class="psdate">
                <div :class="d.isActive?'btn active': 'btn'" v-for="d,index in dateArr" @click="setLeftDate(d)">
                  <shop-btn marginR="0" height="30px" :text="d.value" width="120px" fontsize="14px" /></shop-btn>
                  <div class="icon_duidui"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="li-btns">
              <div class="psdate flex">
                <div :class="d.isActive?'btn active': 'btn'" v-for="d,index in timeArr" @click="setRightTime(d)">
                  <shop-btn marginR="0" height="30px" :text="d.value" width="120px" fontsize="14px" /></shop-btn>
                  <div class="icon_duidui"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-x-center">
        <shop-btn text="确定" bgcolor="#00C65D " color="#fff" border="1px #00C65D " @click.native="ok" />
      </div>
    </div>
  </el-dialog>

</template>
<script>
  import {
    Table,
    TableColumn,
    InputNumber,
    Dialog
  } from 'element-ui'
  import btn from '../components/shopbtn.vue'
  import mixin from '../../utils/mixin.js'
  export default {
    name: 'datetime-modal',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [InputNumber.name]: InputNumber,

      [btn.name]: btn,
      [Dialog.name]: Dialog,

    },
    props: {
      modal: {
        default: false
      },
      params: {
        default: function () {
          return {}
        }
      }
    },
    mixins: [mixin],
    data() {
      return {
        istody: 0,
        dateArr: [],
        timeArr: [],
        result: '2018-07-17 17:00~18:00',
        currentDate: '',
        currentTime: '',

      }
    },
    async created() {
      this.server_date = await this.getServerTime()
      this.result = this.params.param.psdate
      this.sellerId = this.params.param.sellerInfo.sellerId
      this.initLeftDate(this.params.param.storeInfo)
      this.initRightTime(this.params.param.storeInfo, this.currentDate)
    },
    mounted() {},
    methods: {
      /**
       * 根据所选今日配送还是次日配送初始化左边日期
       */
      initLeftDate(storeInfo) {
        this.dateArr = []
        if (storeInfo.distributionToday == 0) { // 不支持当日配送
          for (var i = 1; i <= storeInfo.period; i++) {
            let o = {
              value: this.GetDateStr(i, this.server_date).date
            }
            if (this.result.split(' ')[0] == this.GetDateStr(i, this.server_date).date) {
              o.isActive = true
            } else {
              o.isActive = false
            }
            this.dateArr.push(o)
          }
        } else {
          let nowTime = new Date(this.server_date)
          // let nowTime = this.server_date

          let nt = nowTime.getHours() + 1
          let i = 0
          nt >= storeInfo.distributionEnd ? i = 1 : i = 0
          for (var j = i; j <= storeInfo.period; j++) {
            let o = {
              value: this.GetDateStr(j, this.server_date).date
            }

            if (this.result.split(' ')[0] == this.GetDateStr(j, this.server_date).date) {
              o.isActive = true
            } else {
              o.isActive = false
            }
            this.dateArr.push(o)
          }
        }
        this.currentDate = this.result.split(' ')[0]
      },
      /**
       * 封装时间段数据
       */
      initRightTime(storeInfo, currentDate) {
        this.timeArr = []
        let start = storeInfo.distributionStart
        let nowTime = new Date(this.server_date);
        // let nowTime = this.server_date
        if (storeInfo.distributionToday == 1 && currentDate == this.GetDateStr(0, this.server_date).date) { //如果当日配送开始时间不能小于当前时间1小时
          start = nowTime.getHours()  + 1
          if (start >= storeInfo.distributionEnd || start <= storeInfo.distributionStart) {
            start = storeInfo.distributionStart
          }
        }
        while (start < storeInfo.distributionEnd) {
          let timeStr;
          let toTime = start + 1
          let startStr;
          let toTimeStr;

          start < 10 ? startStr = `0${start}:00` : startStr = `${start}:00`
          toTime < 10 ? toTimeStr = `0${toTime}:00` : toTimeStr = `${toTime}:00`

          timeStr = `${startStr}~${toTimeStr}`
          start += 1;

          var o = {
            value: timeStr
          }
          if (timeStr == this.result.split(' ')[1]) {
            o.isActive = true
          } else {
            o.isActive = false
          }
          this.timeArr.push(o)
        }
        
        this.currentTime = this.result.split(' ')[1]
      },
      setLeftDate(d) {
        this.initRightTime(this.params.param.storeInfo, d.value)
				for (var i in this.timeArr) {// 每次获取新的一天默认选择第一个时间段配送
					this.timeArr[i].isActive = false
				}
        this.timeArr[0].isActive = true
        this.currentTime = this.timeArr[0].value
				
        for (var i in this.dateArr) {
          this.dateArr[i].isActive = false
        }

        if (!d.isActive) {
          d.isActive = true
        }
        this.currentDate = d.value
      },
      setRightTime(d) {
        for (var i in this.timeArr) {
          this.timeArr[i].isActive = false
        }
        if (!d.isActive) {
          d.isActive = true
        }
        this.currentTime = d.value
      },
      ok() {
        this.result = `${this.currentDate} ${this.currentTime}`
        var count = 0
        for (var i of this.timeArr) {
          if (i.isActive) {
            count++
          }
        }

        if (count > 0) {
          let resultobj = {
            sellerId: this.sellerId,
            result: this.result
          }
          this.$emit('getTimeCallback', resultobj)
        } else {
          this.$message.error('请选择配送时间段!')
        }
      },
      close() {
        this.$emit('close')
      },
      beforeClose(done) {
        this.close()
        done()
      },
    }
  }
</script>
<style lang="scss">
  #datetime-modal {
    .timebtns {
      flex-wrap: wrap;
    }
    .li-btns {
      .btn {
        border: 1px solid #ddd;
        position: relative;
        margin-right: 10px;
        background: #F3F3F3;
        margin-bottom: 10px;
        .icon_duidui {
          height: 16px;
          width: 16px;
          background: url(../../../static/img/icon_duidui.png);
          position: absolute;
          right: 0;
          bottom: 0;
          display: none;
        }
        #shop-btn {
          .shopbtn {
            height: 30px !important;
            color: #999999 !important;
            background: #F3F3F3 !important;
            border: 1px solid #F3F3F3 !important;
          }
        }
      }
      .btn.active {
        border: 1px solid #00C65D;
        .icon_duidui {
          display: block;
        }
        #shop-btn {
          .shopbtn {
            height: 30px !important;
            color: #00C65D !important;
            background: #fff !important;
            border: 1px solid #fff !important;
          }
        }
      }
    }
    .right {
      .psdate {
        flex-wrap: wrap;
      }
    }
  }
</style>
