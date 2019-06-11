<template>
  <div id="userCenter">
    <shop-header/>
    <!--搜索-->
    <shop-search :showClassify="false" pageName="消息"/>

    <!--主体-->
    <section class="user-content">
      <div class="min-width flex flex-x-between">
        <div class="user-content-l">
          <ul>
            <li>
              <strong>消息</strong>
              <p>我的消息</p>
            </li>
          </ul>
        </div>
        <div class="user-content-r">
          <div class="navbar flex flex-y-center">我的消息</div>
          <div class="main">
            <div v-if="megList.length>0">
              <ul id="msglist">
                <li v-for="d in megList">
                  <div class="flex flex-x-center">
                    <div class="date">{{d.f_published_date}}</div>
                  </div>
                  <div class="flex flex-x-center">
                    <!-- <div
                      v-if="d.f_notice_status==0"
                      class="unread"
                      @click="updateMsgStatus(d)"
                      title="标记为已读"
                    >未读</div> -->
                    <div class="unread"></div>
                  </div>
                  <div class="mes">
                    <div class="mes-title">{{d.f_title}}</div>
                    <div class="mes-body">{{d.f_comment}}</div>
                    <div class="mes-sender">{{d.f_created_person_name}}</div>
                    <div v-if="d.files.length>0">
                      <span>附件下载：</span>
                      <template v-for="file in d.files">
                        <p>
                          <a
                            download="123"
                            :href="imgURL+file.filePath+'?'+file.fileName"
                            class="click-a"
                          >{{file.fileName}}</a>
                        </p>
                      </template>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="flex flex-x-end" style="margin-top: 20px;">
                <el-pagination
                  background
                  small
                  layout="total,prev, pager, next"
                  :total="productDataCount"
                  @current-change="handleCurrentChange"
                  :page-size="pageSize"
                ></el-pagination>
              </div>
            </div>
            <div
              v-else
              class="flex flex-x-center flex-y-center"
              style="height: 544px;color: #d1d1d1;"
            >
              <div>
                <img src="../../../static/img/my_default_img.png">
                <p class="tac">暂无消息</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <shop-footer/>
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
  Pagination
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
    [Pagination.name]: Pagination
  },
  data() {
    return {
      pageSize: 5,
      pageNum: 1,
      productDataCount: 0,
      megList: [],
      count: 0,
      msgFileList: [],
      unreadMsgIds:[]
    };
  },
  created() {
    this.queryMsgFileByPage();
  },
  mounted() {},
  methods: {
    /**
     * 查看消息
     */
    readMsg(id) {
      this.postRequest("platformnoticeflow/queryById", {
        id: id
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          this.geMsgFile([resp.data.aaData]);
          this.productDataCount = 1;
        }
      });
    },
    /**
     * 获取消息列表
     */
    getUserMessageAll() {
      this.postRequest("platformnoticeflow/queryByMainNoticeStatusIsOne", {
        customerId: this.userInfo.typeCode,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.megList = d.data.aaData;
          this.productDataCount = d.data.dataCount;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.unreadMsgIds = []
      this.queryMsgFileByPage();
    },
    /**
     * 递归获取获取附件
     */
    geMsgFile(arr) {
      if (this.count < arr.length) {
        var param = {
          sourceObjectType: "002", //公告附件
          sourceObjectId: arr[this.count].id
        };
        this.postRequest("uploadfilerecode/list", param).then(d => {
          if (d.data && d.data.state == 0) {
            if (d.data.aaData.length > 0) {
              arr[this.count].file = d.data.aaData[0];
            }
            this.count++;
            this.geMsgFile(arr);
          }
        });
      } else {
        this.megList = arr;
      }
    },
    /**
     * 通过接口获取通知及附件
     */
    queryMsgFileByPage() {
      this.postRequest("platformnoticeflow/queryMsgFileByPage", {
        customerId: this.userInfo.typeCode,
        userId: this.userInfo.userId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.megList = d.data.aaData;
          this.productDataCount = d.data.dataCount;
          // 获取未读消息id
          for(let msg of d.data.aaData){
            if(msg.f_notice_status == 0){
              this.unreadMsgIds.push(msg.f_id)
            }
          } 
          // 批量更新消息
          if(this.unreadMsgIds.length>0){
            this.postRequest("platformnoticeflow/batchUpdate", {
              ids: this.unreadMsgIds
            }).then(res => {
              if (res.data && res.data.state == 0) {
                this.getUnreadMstCount();
              }
            });
          }
        }
      });
    },
    // 更新消息已读状态
    updateMsgStatus(msg) {
      this.postRequest("platformnoticeflow/update", {
        id: msg.f_id,
        noticeStatus: 1
      }).then(res => {
        if (res.data && res.data.state == 0) {
          msg.f_notice_status = 1;
          this.getUnreadMstCount();
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/css/userCenter.scss";
.router-link-active {
  color: #00c65d !important;
}

#msglist {
  li {
    margin-top: 30px;
  }
  .date {
    height: 20px;
    line-height: 20px;
    background: #f7f7f7;
    width: 144px;
    text-align: center;
    color: #666;
    // margin-bottom: 20px;
  }
  .unread {
    padding: 8px 0;
    cursor: pointer;
  }
  .unread:hover {
    text-decoration: underline;
    color: #00c65d;
  }
  .mes {
    padding: 10px 20px;
    background: #f7f7f7;
    .mes-title {
      font-size: 14px;
      font-weight: 600;
      border-bottom: 1px solid #d3d3d3;
      padding-bottom: 10px;
    }
    .mes-body {
      padding: 10px 0;
    }
    .mes-sender {
      padding-bottom: 6px;
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
