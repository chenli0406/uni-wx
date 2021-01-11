<template>
	<view class="container">
		<cu-custom  :isBack="false">
		    <block slot="content">首页</block>
		</cu-custom>
		<view class="content">
			<view class="tab">
				<view class="tab_wrap">
					<view class="tab_item" :class="{ tab_active: tab == 1 }" @click="tab = 1">
						<text>邀请的用户(11)</text>
					</view>
					<view class="tab_item" :class="{ tab_active: tab == 2 }" @click="tab = 2">
						<text>邀请的商户</text>
					</view>
				</view>
			</view>
			<view class="list_wrap">
				<view v-show="tab == 1" class="invite_content">
				<!--  <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				 		 <view v-for="data in list"> 数据列表... </view>
				 	 </mescroll-body> -->
				</view>
				<view v-show="tab == 2" class="evaluate_content">
					<text>222</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				tab: 1,
				list: [],
				total: 0,
				params: {
					currentPage: 1,
					pageSize: 10,
				}
			}
		},
		onLoad() {
			// // 判断是否登录
			// var loginRes = this.checkLogin();
			// if (!loginRes) {
			// 	return false;
			// }
		},
		onShow(){
			this.$api.ping(this.params).then((res)=>{
				   this.list = res.data.data;
					 this.total = res.data.total
			})
		},
		methods: {
			getGoto() {
				console.log("22")
			},
			goDate(){
				console.log("23")
			},
			// 上拉加载
			upCallback(page){
			this.params.currentPage = page.num; // 页码, 默认从1开始
		  this.params.pageSize = page.size; // 页长, 默认每页10条
			console.log(this.params)
			this.$api.ping(this.params).then((res)=>{
				   this.list = res.data.data;
					 this.total = res.data.total
			})
		  },
			upOption(){
				
			}
	},
	}
</script>

<style lang="scss">
	.tab_wrap {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 20px 0px;
		margin: 0 auto;
		border-bottom: 1px solid #eee;
		.tab_item {
			width: 20rem;
			height: 100%;
			text-align: center;
			color: #666666;
			margin: 0 auto;
		}

		.tab_active {
			width: 20rem;
			height: 2rem;
			line-height: 2rem;
			background: #7e6ee3;
			border-radius: 34px;
			color: #fff;
			font-weight: 500;
			text-align: center;
		}
	}
</style>
