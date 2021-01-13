<template>
	<view class="container main_box">
		<cu-swiper ref="swiper"></cu-swiper>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center" style="justify-content: space-between;">
				<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in navList" :key="index" @tap="tabSelect"
				 :data-id="index">
					{{item.navName}}
				</view>
			</view>
		</scroll-view>
		<view style="margin-top: 20rpx;">
			<view class="" v-show="TabCur == 0" style="width: 100%;">
				<cu-tablist ref="tablist"></cu-tablist>
			</view>
			<view class="" v-show="TabCur == 1" class="item2">
				<scroll-view scroll-y  @scrolltolower="onBottom" lower-threshold="140">
					<cl-list-item justify="start" v-for="(item, index) in list" :key="index">
						<view class="basis-xs  margin-xs">
							<cl-image :size="120" :src="item.url"  class="image"></cl-image>
						</view>
						<view class="basis-lg  margin-xs">
							<cl-text :value="item.title" :bold="true" :size="30" :margin="4"></cl-text>
							<cl-text :ellipsis="2" block :value="item.introductory" :color="'#999'" :size="22" :margin="4"></cl-text>
							<text style="font-size: 30rpx;" class="cuIcon-like" v-if="item.zan == 0" @tap="clickLike(1,item.id)"></text>
							<text style="font-size: 30rpx;" class="cuIcon-likefill text-red" v-if="item.zan == 1" @tap="clickLike(0,item.id)"></text>
						</view>
						<view class="basis-xs  margin-xs">
								<cl-button type="success">查看</cl-button>
						</view>
					</cl-list-item>
				</scroll-view>
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
				active: 0,
				list: [],
				total: 0,
				params: {
					currentPage: 1,
					pageSize: 4,
				},
				isNewRenderDone: false,
			}
		},
		onLoad() {
			this.ontrueGetList();
		},
		methods: {
			ontrueGetList() {
				this.$refs.swiper.getBannerList();
				this.$refs.tablist.getTabPage();
				this.$api.getNavList().then((res) => {
					this.navList = res.data.data
				})
			},
			tabSelect(e) {
				let _this = this;
				this.TabCur = e.currentTarget.dataset.id;
				if (e.currentTarget.dataset.id == 0) {
					this.$refs.tablist.getTabPage();
				}
				if (e.currentTarget.dataset.id == 1) {
				  this.getList();
				}
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getList(){
				this.$api.getGoodList(this.params).then((res) => {
					this.isNewRenderDone = true;
					this.list = res.data.data;
					this.total = res.data.total;
				})
			},
			clickLike(val,id){
					this.$api.saveGoodList({zan: val, id: id}).then((res) => {
						this.getList();
						if(res.data.code !=0){
							uni.showToast({
								title:"收藏失败",
								icon: "none"
							})
						}
					})
			},
			onBottom(){
				console.log("111")
				// // 加锁，避免在加载更多时用户频繁下拉导致的重复触发而渲染异常
				// if (!this.isNewRenderDone) return;
				// this.isNewRenderDone = false
				// uni.showLoading({
				// 	title: '正在加载更多'
				// })
				// this.params.currentPage ++;
				// if(this.page >= this.params.currentPage){
				// 	this.$api.getGoodList(this.params).then((res)=>{
				// 		  this.list.push(...res.data.data);
				// 			this.total = res.data.total
				// 	})
				// }else{
				// 	uni.hideLoading()
				// }
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
page{
	height: 100%;
}
	.content {
		padding: 1.2rem;
	}

	.main_centent {
		width: 100%;
		height: 100vh;
		letter-spacing: 4rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item2 {
		width: 100vw;
		padding: 0 20rpx;
		height: 60vh;
		padding-bottom: 120rpx;
		overflow-y: scroll;
		.cl-list-item {
			border-radius: 20rpx;
			margin: 20rpx 0;
			padding: 20rpx;
			.image{
				border-radius: 14rpx;
			}
		}
	}
/deep/	.cl-list-item__content{
		padding: 0;
	}
/deep/	.cl-list-item__container{
		padding: 0px;
	}
</style>
