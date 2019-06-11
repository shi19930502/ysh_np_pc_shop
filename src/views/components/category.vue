<template>
  <div id="category" v-loading="loading">
    <ul ref="categoryUl">
      <li :data-gbgoodsId="d.gbgoodsId" v-for="d,index in categoryList" :class="d.gbgoodsId == gbgoodsId && page != 'index' ? 'active' : ''">
        <div class="flex flex-x-between flex-y-center listem" @click="getProductByCategoryId(d)">
          <div class="flex flex-y-center">
            <img v-if="d.name == '常买'" src="../../../static/img/home_icon_changmai.png" alt="" class="categoryicon" />
            <img v-else-if="d.name == '时令蔬菜'" src="../../../static/img/home_icon_shucai.png" alt="" class="categoryicon" />
            <img v-else-if="d.name == '禽蛋肉类'" src="../../../static/img/home_icon_qindan.png" alt="" class="categoryicon" />
            <img v-else-if="d.name == '粮油食品'" src="../../../static/img/home_icon_liangyou.png" alt="" class="categoryicon" />
            <img v-else-if="d.name == '水产海鲜'" src="../../../static/img/home_icon_shuichan.png" alt="" class="categoryicon" />
            <img v-else-if="d.name == '购新鲜'" src="../../../static/img/home_icon_shucai.png" alt="" class="categoryicon" />
            <img v-else-if="d.name == '成品半成品'" src="../../../static/img/home_icon_shucai.png" alt="" class="categoryicon" />
            <div v-else class="out flex flex-x-center flex-y-center">
              <div class="in"></div>
            </div>
            <strong>{{d.name}}</strong>
          </div>
          <div class="arrow-r" v-if="d.childList"></div>
        </div>
        <div class="fenlist" v-if="d.childList">
          <div v-for="item,index in d.childList">
            <span @click="getProductByCategoryId(item)">{{item.name}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import mixin from '../../utils/mixin.js'
  import mixin_store from '../../utils/mixin_store.js'
  export default {
    name: 'shop-category',
    mixins: [mixin, mixin_store],
    props: {
      page: {
        default: 'index'
      },
      sellerIdss: {
        default: ''
      }
    },
    data() {
      return {
        // 获取商品参数
        gbgoodsId: '',
        // 分类名称
        gbgoodsName: '',
        // 一级商品分类列表
        categoryList: [],
        // 二级分类列表
        secondCategoryList: [],
        loading: true
      }
    },
    created() {
      this.gbgoodsId = this.$route.query.gbgoodsId
      this.gbgoodsName = this.$route.query.gbgoodsName
      // 查询商品
      this.$emit('getProByGbgoodsId', this.gbgoodsId, this.gbgoodsName);
    },
    mounted() {
      $(document).on('click', '#category ul li', function () {
        $(this).addClass('active').siblings().removeClass('active')
      })
			if(!this.sellerId){
				this.loading =false
			} 
    },
    methods: {
      /**
       * 获取商品分类
       */
      getCategoryList() {
        // 				if(localStorage.getItem('categoryList')) {
        // 					this.categoryList = JSON.parse(localStorage.getItem('categoryList'))
        // 				} else {
        this.getCategoryListSaveLocal()
        // }
      },
      /**
       * 获取分类列表缓存本地
       */
      getCategoryListSaveLocal(sellerId) {
        this.loading = true
        this.postRequest('category/childList', {
          parentCategoryId: 'top',
          filteEnabled: 1,
          filteDeleted: 0,
          orderField: 't.f_id',
          supplierId: sellerId,
          onlyLv2: true
        }).then(resp => {
          this.loading = false
          if (resp && resp.data && resp.data.state == 0) {
            // 添加常买选项
            resp.data.aaData.unshift({
              name: '常买',
              id: 'oftenbuy',
              gbgoodsId: 'oftenbuy'
            }) // 商品分类数据
            this.categoryList = resp.data.aaData
            // 初始化分类列表
            this.$nextTick(function () {
              for (let i = 0; i < $(this.$refs.categoryUl).children().length; i++) {
								$(this.$refs.categoryUl).children().eq(i).removeClass('active')
								if($(this.$refs.categoryUl).children().eq(i).attr('data-gbgoodsId') == this.$route.query.gbgoodsId){
									$(this.$refs.categoryUl).children().eq(i).addClass('active')
								}
              }
              // this.$emit('getProByGbgoodsId', this.gbgoodsId, this.gbgoodsName);
            })
            // 缓存分类列表
            // localStorage.setItem('categoryList', JSON.stringify(this.categoryList))
          }
        })
      },
      /**
       * 商品列表页面
       */
      getProductByCategoryId(d) {
        if (this.page == 'productList') {
          this.$emit('getProByGbgoodsId', d.gbgoodsId, d.name);
        }
        this.$router.push({
          name: 'productList',
          query: {
            gbgoodsId: d.gbgoodsId,
            gbgoodsName: d.name
          }
        })
      }
    },
  }
</script>

<style lang="scss">
  #category {
    background: #fff;
    min-height: 200px;
    ul {
      font-size: 14px;
      padding: 0 10px;
      li:last-child {
        border-bottom: none;
      }
      li.active {
        strong {
          color: #00C65D;
        }
        .arrow-r {
          border-top: 1px solid #00C65D;
          border-right: 1px solid #00C65D;
        }
      }
      li.active {
        .arrow-r {
          border-top: 1px solid #00C65D;
          border-right: 1px solid #00C65D;
          transform: rotate(134deg);
        }
        .fenlist {
          display: block;
          // div {
          //   display: inline-block;
          // }
        }
      }
      li {
        cursor: pointer;
        .categoryicon {
          margin-right: 10px;
        }
        padding: 10px 0;
        border-bottom: 1px solid #DDD;
        .out {
          width: 28px;
          height: 28px;
          margin-right: 10px;
          background: rgba(0, 198, 93, 1);
          .in {
            width: 14px;
            height: 14px;
            border-radius: 100px;
            border: 1px solid #222222;
          }
        }
        .listem {
          cursor: pointer;
        }
        .fenlist {
          flex-wrap: wrap;
          padding-left: 33px;
          padding-top: 5px;
          transition: all 0.3s;
          display: none;
          div {
            span {
              display: inline-block;
              color: #909090;
              font-size: 12px;
              margin-bottom: 3px;
              cursor: pointer;
              padding: 0 5px;
            }
            span:hover {
              color: #00C65D;
              text-decoration: underline;
            }
            i.line {
              padding: 0 3px;
              color: #909090;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
