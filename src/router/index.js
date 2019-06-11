import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import login from '@/views/login'
// import login from '@/views/login_yulin'
import productList from '@/views/product/productList'
import shoppingCar from '@/views/product/shoppingCar'
import shoppingSettlement from '@/views/product/shoppingSettlement'
import checkoutSuccess from '@/views/product/checkoutSuccess'

import userCenter from '@/views/usercenter/userCenter'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/reg',
		name: 'reg',
		component: resolve => require(['@/views/reg.vue'], resolve),
	}, {
		path: '/search',
		name: 'search',
		component: resolve => require(['@/views/product/productSearch.vue'], resolve),
	}, {
		path: '/login',
		name: 'login',
		component: login
	}, {
		path: '/',
		name: 'index',
		component: index
	}, {
		path: '/productList',
		name: 'productList',
		component: productList
	}, {
		path: '/shoppingCar',
		name: 'shoppingCar',
		component: shoppingCar
	}, {
		path: '/shoppingSettlement',
		name: 'shoppingSettlement',
		component: shoppingSettlement
	}, {
		path: '/checkoutSuccess',
		name: 'checkoutSuccess',
		component: checkoutSuccess
	}, {
		path: '/OEvaluation',
		name: 'OEvaluation',
		component: resolve => require(['@/views/usercenter/order/OEvaluation.vue'], resolve),
	}, {
		path: '/evaluationList',
		name: 'evaluationList',
		component: resolve => require(['@/views/usercenter/order/evaluationList.vue'], resolve),
	}, {
		path: '/message',
		name: 'message',
		component: resolve => require(['@/views/message/message.vue'], resolve),
	}, {
		path: '/orderDetails',
		name: 'orderDetails',
		component: resolve => require(['@/views/usercenter/order/orderDetails.vue'], resolve),
	}, { // 个人中心
		path: '/userCenter',
		name: 'userCenter',
		redirect: '/userCenter/orderList',
		component: userCenter,
		children: [{
			path: '/userCenter/orderList',
			name: 'orderList',
			component: resolve => require(['@/views/usercenter/order/orderList.vue'], resolve),
		}, {
			path: '/userCenter/orderEvaluate',
			name: 'orderEvaluate',
			component: resolve => require(['@/views/usercenter/order/orderEvaluate.vue'], resolve),
		}, {
			path: '/userCenter/orderPay',
			name: 'orderPay',
			component: resolve => require(['@/views/usercenter/order/orderPay.vue'], resolve),
		}, {
			path: '/userCenter/ofenBuy',
			name: 'ofenBuy',
			component: resolve => require(['@/views/usercenter/order/ofenBuy.vue'], resolve),
		}, {
			path: '/userCenter/contactService',
			name: 'contactService',
			component: resolve => require(['@/views/usercenter/service/contactService.vue'], resolve),
		}, {
			path: '/userCenter/feedback',
			name: 'feedback',
			component: resolve => require(['@/views/usercenter/service/feedback.vue'], resolve),
		}, {
			path: '/userCenter/address',
			name: 'address',
			component: resolve => require(['@/views/usercenter/setting/address.vue'], resolve),
		}, {
			path: '/userCenter/userSetting',
			name: 'userSetting',
			component: resolve => require(['@/views/usercenter/setting/userSetting.vue'], resolve),
		}, {
			path: '/userCenter/collectionStore',
			name: 'collectionStore',
			component: resolve => require(['@/views/usercenter/collection/collectionStore.vue'], resolve),
		}, {
			path: '/userCenter/collectionPro',
			name: 'collectionPro',
			component: resolve => require(['@/views/usercenter/collection/collectionPro.vue'], resolve),
		}]
	}, ]
})