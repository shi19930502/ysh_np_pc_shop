import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import configs from './configs.js'

import {
	getRequest,
	postRequest
} from './utils/api'

import {
	MessageBox,
	Message,
	Notification,
	Loading
} from 'element-ui'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.$alert = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$Notification = Notification

import './assets/css/comm.scss'
import './assets/css/overwrite.scss'
/**处理js计算精度*/
import './utils/mathfix.js'

switch (configs.cityName) {
	case 'ysh':
		document.title = '源生汇农批'
		break
	case 'linyi':
		document.title = '临沂追溯采购系统'
		break
	case 'yuexi':
		document.title = '越西县农村电商'
		break
}


Vue.config.productionTip = false

router.beforeEach((route, redirect, next) => {
	next();

	if (route.name == 'login') {
		next();
		return;
	}
	if (route.name != 'reg') {
		if (!store.state.isLogin) {
			next({
				path: '/login'
			})
		} else {
			next();
		}
	} else {
		next()
	}
});

// 解决Error: Loading chunk 33 failed.路由不跳转
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
