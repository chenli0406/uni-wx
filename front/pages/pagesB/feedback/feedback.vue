<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">意见反馈</block>
		</cu-custom>
		 <view class="from  radius shadow-warp bg-white">
		 	<view class="cu-form-group">
		 		<view class="title">反馈类型</view>
		 		<picker @change="pickerChange" :value="index" :range="picker" range-key="name">
		 			<view class="picker">
		 				{{index>-1 ? picker[index].name: "请选择反馈类型"}}
		 			</view>
		 		</picker>
		 	</view>
			<view class="cu-form-group align-start">
				<view class="title">反馈内容</view>
				<textarea :value="content" maxlength="255" @input="textareaBInput" placeholder="">请输入</textarea>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="viewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="chooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue margin-tb-sm lg" @tap="submit">提交</button>
			</view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: -1,
				picker: [
					{
						id: 1,
						name: '投诉'
					},
					{
						id: 2,
						name: '建议'
					},
					{
						id: 3,
						name: '举报'
					},
					{
						id: 4,
						name: '其他'
					},
				],
				imgList: [],
				content: "",
				type: "",
			};
		},
		methods:{
			pickerChange(e) {
				this.index = e.detail.value;
				this.type = e.detail.value;
				console.log(this.type)
			},
			textareaBInput(e){
				this.content = e.detail.value;
			},
			chooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			delImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			submit(){
				if(this.type < 0 ){
					uni.showToast({
						title: "类型不能为空",
						icon:'none',
					})
					  return false;
				}
				if(this.content == ""){
					uni.showToast({
					    title: "内容不能为空",
							icon:'none',
					});
					  return false;
				}
			 let para = {};
			 para.content = this.content;
			 para.type = this.picker[this.type].id;
			 para.imgList = JSON.stringify(this.imgList);
			 this.$api.addFeedback(para).then((res)=>{
			 		if(res.data.code == 0){
						uni.showToast({
							title: res.data.msg ,
						});
					}else{
						uni.showToast({
							title: res.data.msg ,
						})
					}
			 })
			}
		}
	}
</script>

<style lang="scss">
.from{
	background-color: #fff;
	margin:30rpx;
	border-radius: 10rpx;
	padding: 10rpx;
}
</style>
