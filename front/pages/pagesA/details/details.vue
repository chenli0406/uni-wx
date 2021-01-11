<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">详情</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom" :class="isCard?'margin-top':''" v-if="list.length>0">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 展示形式
			</view>
			<view class="action">
				<switch :class="isCard?'checked':''" :checked="isCard?true:false" @change="IsCard"></switch>
			</view>
		</view>
		<view class="cu-card dynamic" :class="isCard?'no-card':''" v-if="list.length>0">
			<view class="cu-item shadow" v-for="(item,index) in list" :key="index">
				<view class="text-content" style="padding-top: 30rpx;">
					{{item.content}}
				</view>
				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
					 v-for="(item,index) in isCard?9:1" :key="index">
					</view>
				</view>
				<view class="text-gray text-sm text-flex padding">
					<text>{{item.createTime}}</text>
					<view>
						<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.lookNum}}
						<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.giveLike}}
						<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.comment}}
					</view>
				</view>
		
				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view class="text-grey">莫甘娜</view>
							<view class="text-gray text-content text-df">
								凯尔，你被自己的光芒变的盲目。
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>凯尔：</view>
									<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciatefill text-red"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content">
							<view class="text-grey">凯尔</view>
							<view class="text-gray text-content text-df">
								妹妹，如果不是为了飞翔，我们要这翅膀有什么用?
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>莫甘娜：</view>
									<view class="flex-sub">如果不能立足于大地，要这双脚又有何用?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciate text-gray"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="none" v-else>
			<view class="box">
				<image src="../../../static/img/none.png"></image>
				<view style="padding: 20rpx 0;color: #999;">暂无信息！</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { formatTime }  from "../../../common/util.js";
	export default {
		data() {
			return {
				isCard: false,
				list: []
			};
		},
		onLoad(e){
			this.$api.getDetails({id:e.id}).then((res)=>{
					this.list = res.data.data
			})
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
 .text-flex{
	  display: flex;
		justify-content: space-between;
 }
 .none{
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 overflow: hidden;
	 margin-top: 400rpx;
	 .box{
		 width: 300rpx;
		 height: 300rpx;
		 text-align: center;
		 image{
			 width: 80%;
			 height: 80%;
		 }
	 }
	
 }
</style>
