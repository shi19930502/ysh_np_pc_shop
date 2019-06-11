export default {
  data() {
    return {
      carIds: [], // 创建购物车返回的id
      ShippingcarList: [], // 购物车数据
      alreadyChosenGoods: [], // 购物车当前供应商已经选择的商品
      orderTotal: 0 // 当前店铺选择商品总价
    }
  },
  methods: {
    /**
     * 规格创建购物车
     */
    createShippingcarBySku(d) {
      //			不限制库存规格了
      //			if(d.stockLimit == '1' && d.canUseQuantity <= 0) {
      //				this.$message('该商品库存不足无法加入购物车！')
      //				return false
      //			}
      console.log()
      var data = d
      var saveurl = 'shippingcar/create'
      var params = {
        buyerId: this.userInfo.typeCode,
        productId: data.productId,
        productName: data.productName,
        skuId: data.id || data.skuId,
        skuName: data.name || data.skuName,
        quantity: 1,
        comment: data.remark || '',
        sellerId: data.sellerId || data.supplierId - 0 || this.sellerId,
      }
      this.postRequest(saveurl, params).then(d => {
        if (d.data && d.data.state == 0) {
          this.$message({
            message: '加入购物车成功，可在购物车中查看！',
            type: 'success'
          });
          // 获取购物车数量
          this.getShopCarCount()
        } else {
          this.$message.error(d.data.msg);
        }
      })
    },
    /**
     * 创建购物车
     */
    createShippingcar(skus) {
      var count = 0
      var saveurl = 'shippingcar/create'
			
			for (let i = 0; i < skus.length; i++) {
				var params = {
					buyerId: this.userInfo.typeCode,
					productId: skus[i].productId,
					productName: skus[i].productName,
					skuId: skus[i].id,
					skuName: skus[i].name,
					quantity: skus[i].quantity,
					comment: skus[i].remark,
					sellerId: this.sellerId,
				}
				this.postRequest(saveurl, params).then(d => {
					if (d.data && d.data.state == 0) {
						count++
						if (count == skus.length) {
							this.$emit('submitShopCar')
							// 获取购物车数量
							this.getShopCarCount()
						}
					} else {
            if(d.data.state == 50){
						  this.$message.error(`加入购物车失败！${d.data.msg}请确认购物车数量是否过大!`);
            } else {
              this.$message.error('加入购物车失败！');
            }
					}
				})
			}
    },
    /**
     * 获取购物车数量
     */
    getShopCarCount() {
      this.postRequest('shippingcar/list', {
        buyerId: this.userInfo.typeCode,
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.$store.dispatch('getCount_AC', d.data.dataCount)
        } else {
          this.$message.error(d.data.msg)
        }
      })
    },
    /**
     * 获取购物车商品skuid
     */
    getShopCarSkuId() {
      this.postRequest('shippingcar/list', {
        buyerId: this.userInfo.typeCode,
      }).then(d => {
        if (d.data && d.data.state == 0) {
          let a = []
          for (let i of d.data.aaData) {
            let o = {
              sellerId: i.sellerId,
              skuId: i.skuId
            }
            a.push(o)
          }
        }
      })
    },
    /**
     * 获取购物车
     */
    getShippingcarList() {
      this.postRequest('shippingcar/queryGrouplist', {
        buyerId: this.userInfo.typeCode,
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.ShippingcarList = d.data.aaData
        } else {
          this.$message.error(d.data.msg)
        }
      })
    },
    /**
     * 删除购物车
     */
    del(sellerId) {
      this.postRequest('shippingcar/queryGrouplist', {
        buyerId: this.userInfo.typeCode,
        sellerId: sellerId
      }).then(d => {
        if (d.data && d.data.state == 0) {
          for (var i in d.data.aaData) {
            if (sellerId == i) { //如果卖家id等于购物车中的卖家id就删除
              var items = d.data.aaData[i]
              for (var j in items) {
                this.deleteShopCarById(items[j].id)
              }
            }
          }
        }
      })
    },
    /**
     * 删除购物车byId
     */
    deleteShopCarById(id, iscardel) {
      this.postRequest('shippingcar/delete', {
        id: id
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (iscardel) {
            this.$message('删除成功！')
            this.getStoreCar()
          }
        } else {
          this.$message.error(d.data.msg)
        }
      })
    },
    /**
     * 计算商品总价
     */
    getOrderTotal(arr) {
      var priceTotal = 0;
      var quantityTotal = 0;
      for (var i in arr) {
        quantityTotal += arr[i].quantity
        if (arr[i].promotionPrice > 0 && arr[i].promotionBasePrice > 0) {
          priceTotal += arr[i].quantity * (arr[i].promotionPrice - 0)
        } else {
          priceTotal += arr[i].quantity * (arr[i].price - 0)
        }
      }

      return {
        priceTotal: priceTotal.toFixed(2),
        quantityTotal: quantityTotal
      }
    },
    /**
     * 判断数组是否存在某个元素
     */
    isInArray(arr, element) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == element) {
          return true;
        }
      }
      return false;
    },
    /**
     * 取消订单
     */
    orderCancel(id, cb, type,data) {
      var orderStatusId = 7
      var tipsText = '是否确认取消订单?'
      var message = '订单取消成功!'

      if (type == 'qrsh') {
        orderStatusId = 4
        tipsText = '是否确认收货?'
        message = '确认收货成功!'
        this.$alert.confirm(tipsText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let inspectedOrderTotal = 0
          for(let k of data.orderitemList){
            k.inspectedWeight = k.quantity
            k.inspectedTotal = k.priceForDecimal.mul(k.inspectedWeight).mul(100) 
            inspectedOrderTotal += k.inspectedTotal
          }
          data.inspectedOrderTotal = inspectedOrderTotal

          // 更新订单明细验收金额 
          this.postRequest('orderitem/batchUpdate', {
            orderitems: JSON.stringify(data.orderitemList),
            arr: true
          }).then(resp => {
            if (resp.data && resp.data.state == 0) {
              this.postRequest('order/update', {
                id: id,
                orderStatusId: orderStatusId,
                inspectedOrderTotal: data.inspectedOrderTotal
              }).then(resp => {
                if (resp.data && resp.data.state == 0) {
                  this.$message({
                    type: 'success',
                    message: message
                  });
                  cb && cb()
                }
              })
            }
          })
        }).catch(() => {});
      } else {
        this.$alert.confirm(tipsText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('order/update', {
            id: id,
            orderStatusId: orderStatusId
          }).then(resp => {
            if (resp.data && resp.data.state == 0) {
              this.$message({
                type: 'success',
                message: message
              });
              cb && cb()
            }
          })
        }).catch(() => {});
      }
    },
    /**
     * 统计店铺访问人数
     */
    countVisits() {
      this.postRequest('store/countVisits', {
        sellerId: this.sellerId
      }).then(d => {
        if (d.data && d.data.state == 0) {}
      })
    },
    /**
     * toShopCar
     */
    toShopCar() {
      this.$router.push({
        name: 'shoppingCar'
      })
    },
    /**
     * 继续购物
     */
    toProductList() {
      this.$router.push({
        name: 'productList',
        query: {
          gbgoodsId: 'oftenbuy',
          gbgoodsName: '常买'
        }
      })
    },
    /**
     * 个人中心
     */
    toUserCenter() {
      this.$router.push({
        name: 'userCenter'
      })
    },
    /**
     * 我的收藏
     */
    toCollectionPro() {
      this.$router.push({
        name: 'collectionPro'
      })
    },
    /**
     * 联系客服
     */
    toContactService() {
      this.$router.push({
        name: 'contactService'
      })
    },
    /**
     * 主页
     */
    toIndex() {
      this.$router.push({
        name: 'index'
      })
    },
  }
}
