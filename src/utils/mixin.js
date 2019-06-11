import configs from '../configs'
import mixin_modal from './mixin_modal'
import mixin_shopCar from './mixin_shopCar'
import mixin_store from './mixin_store'

export default {
	mixins: [mixin_modal, mixin_shopCar, mixin_store],
	data() {
		return {
			cityName: configs.cityName,
			uploadURL: configs.uploadURL,
			imgURL: configs.imgURL,
			version: 'V0.0.0.1',
			defaultImgs: ['img_moren_one.png', 'img_moren_two.png', 'img_moren_th.png', 'img_moren_four.png'],
			userInfo: JSON.parse(localStorage.getItem('userInfo')),
			server_date: null,
			// 物流方式
			logisticsType: [{
				type: 1,
				name: '物流配送',
				selected: true
			}, {
				type: 0,
				name: '自提',
				selected: false
			}],
			// 支付方式
			payType: [{
				type: 0,
				name: '现金支付',
				selected: true
			}, {
				type: 1,
				name: 'POS刷卡',
				selected: false
			}, {
				type: 2,
				name: '微信支付',
				selected: false
			}, {
				type: 3,
				name: '支付宝支付',
				selected: false
			}],
			// 配送方式
			distributionType: [{
				distributionType: 0,
				name: '次日配送',
				selected: true
			}, {
				distributionType: 1,
				name: '当日配送',
				selected: false
			}],
			// 收货地址
			AddressList: [],
			addressInfo: null,
		}
	},
	mounted() {},
	methods: {
		/**
		 * 获取服务器时间
		 */
		 getServerTime(){
			return new Promise((resolve,reject)=>{
				this.postRequest('store/getServerTime', {
				}).then(d => {
					if(d && d.data.state == 0){
						resolve(d.data.aaData)
					} else {
						resolve(null)
					}
				})
			})
		},
		/**
		 * 获取收货人
		 */
		getAddressInfo() {
      return new Promise((resolve, reject) => {
        this.postRequest("address/queryByCustomerId", {
          customerId: this.userInfo.typeCode
        }).then(d => {
          if(d && d.data.state == 0){
						resolve(d.data.aaData)
					}
        })
      })
    },
		/**
     * 获取版本号
     */
    getVersion() {
      this.postRequest("datadic/list", {
        ket: "01",
        dataType: "SYSTEM_VERSION"
      }).then(d => {
        if (d.data && d.data.state == 0 && d.data.aaData.length>0) {
          this.version = d.data.aaData[0].value
        }
      });
    },
		priceFormat(val) {
			if (typeof val === 'number') {
				return val.div(100) || 0
			} else {
				return val || 0
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
		 * 数组去重
		 * @param arr 
		 */
		uniqueArr(arr) {
			var res = [];
			var obj = {};
			for (var v of arr) {
				if (!obj[v]) {
					res.push(v);
					obj[v] = 1;
				}
			}
			return res
		},
		/**
		 * 数组去重复对象
		 * @param arr 
		 */
		uniqueArrObj(arr) {
			var unique = {};
			arr.forEach(function(a) {
				unique[JSON.stringify(a)] = 1
			});
			arr = Object.keys(unique).map(function(u) {
				return JSON.parse(u)
			});
			return arr
		},
		/**
		 * 获取不同的日期
		 * @param AddDayCount 目标天数与当天的差
		 * @returns {string}
		 * @constructor
		 */
		GetDateStr(AddDayCount,severDate) {
			var dd = new Date();
			if(severDate) dd = new Date(severDate)
			// 这里使用传进来的日期时间有问题
			dd.setDate(dd.getDate() + AddDayCount);
			var y = dd.getFullYear();
			var m = dd.getMonth() + 1;
			var d = dd.getDate();
			var w = dd.getDay();
			const wstr = '日一二三四五六'
			if (m < 10) {
				m = `0${m}`
			}
			if (d < 10) {
				d = `0${d}`
			}
			return {
				date: `${y}-${m}-${d}`,
				week: `星期${wstr.charAt(w)}`
			};
		},
		/**
		 * 退出登录
		 */
		logOut() {
			localStorage.clear()
			this.$store.state.hotProList = []
			this.$store.commit("saveUserHeadfilePath", null);
			this.$router.push({
				name: 'login',
				redirect: {
					name: 'login'
				}
			})
		},
		/**
		 * 获取收货地址列表
		 */
		getAddress() {
			this.postRequest('address/queryByCustomerId', {
				customerId: this.userInfo.typeCode
			}).then(d => {
				if (d.data && d.data.state == 0) {
					if (d.data.aaData) {
						this.AddressList = [d.data.aaData]
						this.addressInfo = d.data.aaData
					}
				}
			})
		},
    getUnreadMstCount() {
      this.postRequest("platformnoticeflow/queryUserUnreadMsgCount", {
        customerId: this.userInfo.userId
      }).then(d => {
        if (d.data && d.data.state == 0) {
          this.$store.commit("saveUnreadMsgCount", d.data.aaData);
        }
      });
    }
	},
}
