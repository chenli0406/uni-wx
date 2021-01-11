import http from './request.js'


// ping
export const ping = (data) => {
    return http.request({
        url: '/users/getListPage',
        method: 'GET', 
        data,
    })
}
// 首页banner
export const getBanner = (data) => {
    return http.request({
        url: '/users/getBanner',
        method: 'GET', 
        data,
    })
}
// nav
export const getNavList = (data) => {
    return http.request({
        url: '/users/getNavList',
        method: 'GET', 
        data,
    })
}
// Tab
export const getTabList = (data) => {
    return http.request({
        url: '/users/getTabList',
        method: 'GET', 
        data,
    })
}
// getMsgList
export const getMsgList = (data) => {
    return http.request({
        url: '/users/getMsgList',
        method: 'GET', 
        data,
    })
}

// getMsgList
export const getDetails = (data) => {
    return http.request({
        url: '/users/getDetails',
        method: 'GET', 
        data,
    })
}

// addFeedback
export const addFeedback = (data) => {
    return http.request({
        url: '/users/addFeedback',
        method: 'post', 
        data:data,
    })
}
// getPresonListPage
export const getPresonListPage = (data) => {
    return http.request({
        url: '/users/getPresonListPage',
        method: 'GET', 
        data,
    })
}
//getPresonId
export const getPresonId = (data) => {
    return http.request({
        url: '/users/getPresonId',
        method: 'GET', 
        data,
    })
}
// 登录 
export const checkLogin = (data) => {
	return http.request({
		url: "/login/checkLogin",
		method: 'post',
		data:data,
	})
}
export default {
    ping,
		checkLogin,
		getBanner,
		getNavList,
		getTabList,
		getMsgList,
		getDetails,
		addFeedback,
		getPresonListPage,
		getPresonId
}