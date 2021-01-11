<template>
	<view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 475upx)">
				<view class="cu-item" :class="index==tabCurr?'text-blue cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{item.title}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 475upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-bt padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-blue"></text> {{item.title}}</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="(item, index) in msgList" :key="index" @click="gotoTabDetails(item.id)">
							<view class="cu-avatar round lg" :style="'background-image:url('+ item.imgPath +')'"></view>
							<view class="content">
								<view class="text-grey">
									<text class="text-cut">{{ item.title }}</text>
									<view class="cu-tag round bg-orange sm">{{ item.mark }}</view>
								</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
									{{item.content}}
									</text>
								</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">{{item.createTime}}</view>
								<view class="cuIcon-notice_forbid_fill text-gray" v-if="item.msgNum == 0"></view>
								<view class="cu-tag round bg-red sm" v-else>{{ item.msgNum }}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				msgList: [],
				tabCurr: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			getTabPage(){
		   	this.$api.getTabList().then((res)=>{
					this.list = res.data.data
			  });
				this.$api.getMsgList().then((res)=>{
					this.msgList = res.data.data
				})
				
			},
			TabSelect(e) {
				this.tabCurr = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + i);
					view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (i) * 50
						this.tabCurr = i
						return false
					}
				}
			},
			gotoTabDetails(val){
				uni.navigateTo({
					url:'/pages/pagesA/details/details?id='+ val
				})
			}
		},
	}
</script>

<style lang="scss">
	.fixed {
		position: fixed;
		z-index: 99;
	}
	.main_tab{
		padding-bottom: 120rpx;
		box-sizing: border-box;
	}
	.VerticalNav.nav {
		width: 180upx;
		white-space: initial;
		padding-bottom: 160rpx;
	}
  .padding-bt{
		padding-bottom: 30rpx;
	}
	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		padding-bottom: 160rpx;
	}
</style>
