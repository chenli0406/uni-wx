<template>
	<view class="container">
		<!-- 首页 -->
		<view :style="{'display':show_index == 0 ?'block':'none'}">
			<tab-home ref="home"></tab-home>
		</view>
		<!-- 聊天 -->
		<view :style="{'display':show_index == 1 ?'flex':'none'}">
			<tab-center ref="center"></tab-center>
		</view>
		<!-- 个人中心 -->
		<view :style="{'display':show_index == 2 ? 'flex':'none'}">
			<tab-my  ref="my"></tab-my>
		</view>
		<!-- is_lhp判断是否为刘海屏在main.js里，好像uniapp有一个css变量获取刘海屏的安全区域 -->
		<view class="tabBar" :style="{height:is_lhp?'140rpx':'98rpx'}">
			<!-- 导航的中间圆圈 -->
			<view class="border_box" :style="{paddingBottom:is_lhp?'40rpx':''}">
				<view class="tabBar_miden_border"></view>
			</view>
			<view class="tabBar_list" :style="{paddingBottom:is_lhp?'40rpx':''}">
				<view v-for="(item) in tab_nav_list" :key="item.id" :class="{'tabBar_item':item.id!=1,'tabBar_item2':item.id==1}"
				 @tap="cut_index(item.id)">
					<image v-if="show_index == item.id" :src="item.selectedIconPath"></image>
					<image v-else :src="item.iconPath"></image>
					<view :class="{'tabBar_name':true,'nav_active':show_index == item.id}">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabHome from '@/components/tab-bar/home.vue'
	import tabMy from '@/components/tab-bar/my.vue'
	import tabCenter from '@/components/tab-bar/center.vue'
	export default {
		components: {
			tabHome, //首页    0
			tabCenter, //推荐  1
			tabMy, //我的    2
		},
		data() {
			return {
				show_index: 0, //控制显示那个组件
				tab_nav_list: [{
					'id': 0,
					'name': '首页',
					"iconPath": "../../static/img/index.png",
     			"selectedIconPath": "../../static/img/index-active.png",
				}, {
					'id': 1,
					'name': '推荐',
					"iconPath": "../../static/img/center-active.png",
					"selectedIconPath": "../../static/img/center-active.png",
				}, {
					'id': 2,
					'name': '我的',
					"iconPath": "../../static/img/my.png",
      		"selectedIconPath": "../../static/img/my-active.png",
				}], //菜单列表
				is_lhp: false
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let _this = this
			this.is_lhp = this.$is_bang
			this.$nextTick(function() {
				// 一定要等视图更新完再调用方法   -----------++++++++++++++++重要
				setTimeout(function() {
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#6739b6'
					})
					_this.$refs.home.ontrueGetList() //初次加载第一个页面的请求数据
				}, 100)
			})
		},
		onReady(){
			uni.hideLoading()
		},
		// 监听推荐组件触底（在组件中这个不执行）
		onReachBottom(){
		 console.log("111")
			this.$refs.center.onBottom()
		},
		methods: {
			// 切换组件
			cut_index(type) {
				let _this = this
				_this.show_index = type
				if (_this.show_index == 0) {
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#6739b6'
					})
					_this.$refs.home.ontrueGetList()
				} else if (_this.show_index == 1) {
					_this.$refs.center.ontrueGetList()
				} else if (_this.show_index == 2) {
					_this.$refs.my.ontrueGetList()
				}
			},
			onPullDownRefresh() {
				if(this.show_index+1 == 2){
					this.$refs.center.onRefresh()
				}
				setTimeout(function() {
					uni.showToast({
						title: '刷新成功',
						icon: 'none'
					})
					uni.stopPullDownRefresh()
				}, 2000)
			},
		}
	}
</script>

<style lang="scss">
	.tabBar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;

		.tabBar_list {
			width: 86%;
			display: flex;
			justify-content: space-between;

			image {
				width: 48rpx;
				height: 48rpx;
				margin-bottom: 2rpx
			}

			.tabBar_item {
				width: 68rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20rpx;
				color: #969BA3;
			}

			.tabBar_item2 {
				width: 68rpx;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20rpx;
				color: #969BA3;
				margin-top: -20rpx;
				position: relative;
				z-index: 101;

				image {
					width: 68rpx;
					height: 68rpx;
				}
			}
		}
	}

	.border_box {
		// pointer-events: none; 事件穿透解决z-index层级问题
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0px;
		bottom: 50rpx;
		z-index: 100;
		pointer-events: none;

		.tabBar_miden_border {
			width: 100rpx;
			height: 50rpx;
			border-top: 2rpx solid #E5E5E5;
			border-radius: 60rpx 60rpx 0 0;
			/* 左上、右上、右下、左下 */
			background: #fff;
		}
	}

	.nav_active {
		color: #1296DB;
	}
</style>
