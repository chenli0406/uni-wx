import Vue from 'vue'
import App from './App'
import api from '@/apis/api.js'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import cuCustom from './colorui/components/cu-custom.vue'
Vue.config.productionTip = false
Vue.prototype.$api = api
App.mpType = 'app'

const app = new Vue({
	...App
})

// 判断是否登录
Vue.prototype.checkLogin = function() {
	const token = uni.getStorageSync('token')
	if (token === '') { // 本地没有token表示未登录
		uni.reLaunch({
			url: '/pages/login/login'
		})
		return false
	}
}

// 全局注册
Vue.component('mescroll-body', MescrollBody)
Vue.component('cu-custom',cuCustom)
app.$mount()
