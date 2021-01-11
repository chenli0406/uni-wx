<template>
	<view class="container">
		 <scroll-view scroll-y bindscrolltolower="bottom" lower-threshold="400" class="DrawerPage" :class="showDrawerModal == true?'show':''">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">列表</block>
			</cu-custom>
			<wfalls-flow  :list="list" ref="wfalls" @finishLoad="getLoadNum" @changeId="changeId($event)"></wfalls-flow>
			<view style="text-align: center;color: #999;" v-if="loadMore">
				<view style="padding: 10rpx;">已经到底啦!</view>
			</view>
	</scroll-view>
	<view class="DrawerClose" :class="showDrawerModal == true?'show':''" @tap="hideModal">
		<text class="cuIcon-pullright"></text>
	</view>
	<scroll-view scroll-y class="DrawerWindow" :class="showDrawerModal == true?'show':''">
		<view>
			<view class="cu-card article">
				<view class="cu-item shadow">
					<image :src="detailsData.image"></image>
					<view class="content">
						<view class="desc">
							<view class="text-content">{{detailsData.content}}</view>
						<view class='flex flex-wrap'>
							<view  style="padding-right: 20rpx;" v-for="(item,index) in tag" :key="index">
								<view class='cu-tag light radius bg-blue'>{{item}}</view>
							</view>
						</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
	</view>
</template>

<script>
	import wfallsFlow from '../wfalls-flow/wfalls-flow.vue';
	export default {
		components: {
			wfallsFlow
		},
		data() {
			return {
				list: [],
				tag: [],
				ColorList: this.ColorList,
				detailsData: '',
				isNewRenderDone: false ,//锁的作用
				total: 0,
				params: {
					currentPage: 1,
					pageSize: 6,
				},
				page: 0,
				loadMore: false,
				showDrawerModal: false,
			};
		},
		onLoad() {
		},
		methods: {
			ontrueGetList() {
				this.$api.getPresonListPage(this.params).then((res)=>{
						this.list = res.data.data;
						this.$refs.wfalls.init();
						this.total = res.data.total;
						this.page = this.total / this.params.pageSize;
						if(this.total % this.params.pageSize > 0){
							 this.page = this.page +1;
						}
				})
			},
			bottom(){
				console.log("1244445")
			},
			getLoadNum(num) {
				console.log('共加载了'+ num)
			 !this.isNewRenderDone && uni.hideLoading()
				this.isNewRenderDone = true
			},
			onRefresh() {
				this.loadMore = false;
				this.params.currentPage = 1;
				this.ontrueGetList()
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			onBottom() {
				// 加锁，避免在加载更多时用户频繁下拉导致的重复触发而渲染异常
				if (!this.isNewRenderDone) return;
				this.isNewRenderDone = false
				uni.showLoading({
					title: '正在加载更多'
				})
			  //  (加载更多)
				this.params.currentPage ++;
        if(this.page >= this.params.currentPage){
					this.$api.getPresonListPage(this.params).then((res)=>{
						 this.list.push(...res.data.data);
							this.$refs.wfalls.init();
							this.total = res.data.total
					})
				}else{
					uni.hideLoading()
					this.loadMore = true;
				}
			},
			// 详情
			changeId(data){
			 this.$api.getPresonId({id: data}).then((res)=>{
				 console.log(res.data)
				 this.detailsData = res.data.data[0];
				 this.tag = JSON.parse(this.detailsData.tag)
				 this.showDrawerModal = true;
		 	 });
				
		  },
			hideModal(){
				this.showDrawerModal = false;
			},
			bottom(){
				console.log("122435")
			}
		},
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 120rpx;
		box-sizing: border-box;
		background-image: var(--gradualBlue);
		width: 100vw;
	}
	.DrawerPage {
		position: fixed;
		width: 100vw;
		left: 0vw;
		height: 100vh;
		background-color: #f1f1f1;
		transition: all 0.4s;
		padding-bottom: 120rpx;
		overflow-y: auto;
	}
	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}
	
	.DrawerWindow {
		position: absolute;
		width: 85vw;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 60upx 0;
	  padding-bottom: 120rpx;
		overflow-y: hidden;
	}
	
	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}
	
	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 120upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}
	
	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}
	
	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}
	
	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}
	
	.DrawerPage .nav {
		flex: 1;
	}
	
	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}
	
	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}
	
	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
