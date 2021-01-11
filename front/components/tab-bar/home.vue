<template>
	<view class="container main_box">
		<cu-swiper ref="swiper"></cu-swiper>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
		 <view class="flex text-center" style="justify-content: space-between;">
		 	<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in navList" :key="index" @tap="tabSelect" :data-id="index">
		 		{{item.navName}}
		 	</view>
		 </view>
		</scroll-view>
	  <view style="margin-top: 20rpx;">
	  	<view class="" v-show="TabCur == 0" style="width: 100%;">
	  	   <cu-tablist ref="tablist"></cu-tablist>
	  	</view>
	  	<view class="" v-show="TabCur == 1">
	  		<text>3</text>
	  	</view>
	  	<view class="" v-show="TabCur == 2">
	  		<text>4</text>
	  	</view>
			<view class="" v-show="TabCur == 3" style="position: fixed;">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
					<view v-for="data in dataList"> 数据列1表... </view>
				</mescroll-body>
			</view>
	  </view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import cuSwiper from '../../colorui/components/cu-swiper.vue';
	import cuTablist from '../../colorui/components/cu-tablist.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			cuSwiper,
			cuTablist,
		},
		data() {
			return {
				dataList: [],
				TabCur: 0,
				scrollLeft: 0,
				navList: [],
			}
		},
		onLoad(){
			this.ontrueGetList();
		},
		methods: {
			ontrueGetList() {
			  this.$refs.swiper.getBannerList();
				this.$refs.tablist.getTabPage();
				this.$api.getNavList().then((res)=>{
						this.navList = res.data.data
				})
			},
			/*上拉加载的回调*/
			upCallback(page) {
			},
			tabSelect(e) {
				let _this = this;
				this.TabCur = e.currentTarget.dataset.id;
				if(e.currentTarget.dataset.id == 0){
					this.$refs.tablist.getTabPage();
				}
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss">
	// padding-bottom:120rpx;box-sizing: border-box;重要*************************保证页面底部内容不被隐藏也不会出现多余的滚动条
	.main_box {
		width: 100vw;
		position: fixed;
		padding-bottom: 120rpx;
		box-sizing: border-box;
	}
.content{
	padding:1.2rem;
}
	.main_centent {
		width: 100%;
		height: 100vh;
		letter-spacing: 4rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
