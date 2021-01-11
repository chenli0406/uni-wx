<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="false" bgColor="text-white">
				<block slot="content">个人中心</block>
			</cu-custom>
		</view>
		<view class="screen-swiper">
			<image src="../../static/image/big39000.jpg"></image>
		</view>
		<view class="cu-list menu sm-border card-menu menu">
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="contact" @tap="setShowModal">
					<text class="cuIcon-settings text-olive"></text>
					<text class="text-grey">设置</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-peoplefill text-red"></text>
					<text class="text-grey">关于我们</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-warnfill text-cyan"></text>
					<text class="text-grey">隐私协议</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="contact" @tap="gotoFeedBack">
					<text class="cuIcon-writefill text-brown"></text>
					<text class="text-grey">意见反馈</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="contact" @tap="clearShowModal">
					<text class="cuIcon-btn text-black"></text>
					<text class="text-grey">清除缓存</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="contact" @tap="showModal">
					<text class="cuIcon-mobilefill text-blue"></text>
					<text class="text-grey">退出登录</text>
				</button>
			</view>
		</view>
		<view class="cu-modal" :class="dialogModal == true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end" >
					<view class="content">确定退出?</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn line-green text-blue" @tap="hideModal">取消</button>
						<button class="cu-btn bg-blue margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="clearDialogModal == true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end" >
					<view class="content">是否清楚缓存?</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn line-green text-blue" @tap="hideModal">取消</button>
						<button class="cu-btn bg-blue margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 设置 -->
		<view class="cu-modal drawer-modal justify-end" :class="setModal== true?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" style="height:100vh">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item,index) in 5" :key="index">
						<view class="content">
							<view>Item {{index +1}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				dialogModal: false,
				clearDialogModal: false,
				setModal: false,
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
			ontrueGetList() {},
      showModal() {
			 this.dialogModal = true;
      },
			clearShowModal(){
				this.clearDialogModal = true;
			},
			hideModal(){
				this.dialogModal = false;
			},
			setShowModal() {
				this.setModal = true;
			},
			hideModal() {
				this.setModal = false;
			},
			gotoFeedBack(){
				uni.navigateTo({
					url: '/pages/pagesB/feedback/feedback'
				})
			}
		}
	}
</script>

<style lang="scss">
	.fixed {
		position: fixed;
		z-index: 99;
	}
	.screen-swiper {
		width: 100vw;
		height: 20vh;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.menu{
		margin: 30rpx;
	}
	.cu-dialog{
		width: 60%;
		border-radius: 20rpx;
		padding: 20rpx 0;
	}
	.cu-bar .content{
		width: auto;
	}
</style>
