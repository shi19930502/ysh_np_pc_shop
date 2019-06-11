export default {
  data() {
    return {
      // 分类列表
      categoryList: [],
      // 分裂国标码
      gbgoodsId: '',
      // 渠道列表
      channelList: [],
      // 渠道编码
      channelCode: '',
      categoryLoading: false
    }

  },
  methods: {
    /**
     * 获取分类列表
     */
    getCategoryList(sellerId) {
      this.categoryLoading = true
      this.postRequest('category/childList', {
        parentCategoryId: 'top',
        filteEnabled: 1,
        filteDeleted: 0,
        orderField: 't.f_id',
        supplierId: sellerId || '',
        onlyLv2: true
      }).then(resp => {
        this.categoryLoading = false
        if (resp && resp.data && resp.data.state == 0) {
          this.categoryList = resp.data.aaData
        }
      })
    },
    /**
     * 分类点击事件
     */
    categoryChange(gbgoodsId, name, isIndex) {
      this.gbgoodsId = gbgoodsId
      if (!isIndex) {// 是否首页调用
        this.categoryText = name
        this.pageNum = 1
        this.getProductList()
      }
    },
    /**
     * 获取渠道
     */
    getChannelList() {
      this.postRequest('channel/list', {
        level: 1
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            this.channelList = d.data.aaData
          }
        }
      })
    },
  }
}
