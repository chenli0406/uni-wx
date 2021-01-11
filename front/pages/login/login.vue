<template>
	<view class="container">
		<view class="login"></view>
		<view class="from">
			<view class="cu-form-group">
				<text class='cuIcon-phone  margin-r-xs'></text>
				<input v-model="phone" type="number" maxlength="11" placeholder="请输入手机号" name="input"></input>
			</view>
			<view class="cu-form-group">
				<text class='cuIcon-qrcode margin-r-xs'></text>
				<input v-model="code" maxlength="6" placeholder="请输入验证码" name="input"></input>
				<button class='cu-btn bg-blue shadow'>验证码</button>
			</view>
			<button class="primary-btn" :loading="loading" @click="onClick">确认登录</button>
			<button class="register-btn" @click="gotoRegister">
				没有账号，去注册
			</button>
		</view>
		<view class="bottom">
			<text>登录即代表你已同意</text>
			<text style="color:#7E6EE3">《隐私政策》</text>
			<text>和</text>
			<text style="color:#7E6EE3"> 《服务协议》 </text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				code: "",
				loading: false,
				isSendCode: false,
				codeTime: 0,
				aVisiable: false,
				phoneIcon: require("../../static/img/phone.png"),
				passwoedIcon: require("../../static/img/password.png")
			}
		},
		methods: {
			onSendCode() {},
			gotoRegister() {},
			onChangePhoen(event) {
				this.phone = event.detail;

			},
			onChangeCode(event) {
				this.code = event.detail;
			},
			onClick() {
				if (this.phone == "") {
					uni.showToast({
						title: '请输入有效手机号',
						icon: 'none',
					});
					return false;
				}
				if (this.code == "") {
					uni.showToast({
						title: '请输入有效验证码',
						icon: 'none',
					});
					return false;
				}
				let para = {};
				para.phone = this.phone;
				para.code = this.code;
				this.$api.checkLogin(para).then((res) => {
					if (res.data.code == 0) {
						uni.showToast({
							title: res.data.msg,
						});
						uni.setStorageSync('token', res.data.token);
						uni.navigateTo({
							url: "/pages/index/index"
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
						});
					}

				})

			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100%;
		background-color: #FFFFFF;
	}

	.login {
		background: url(../../static/img/login-bg.png);
		background-size: 100% 100%;
		height: 54vh;
		position: relative;
	}
 .margin-r-xs{
	 margin-right: 20rpx;
	 color: #ccc;
 }
	.from {
		background: url(../../static/img/login-from.png);
		background-size: 100% 100%;
		height: 36vh;
		position: absolute;
		width: 90%;
		left: 0;
		right: 0;
		bottom: 180px;
		margin: auto;
	}
.cu-form-group{
	 width: 80%;
	 margin: 0 auto;

}
.cu-form-group:first-child{
	margin-top: 60rpx;
}
	button::after {
		border: none;
	}

	.send-btn {
		font-size: 14px;
		color: #7e6ee3 !important;
		background: transparent;
	}

	.primary-btn {
		width: 60%;
		height: 40px;
		background: #7e6ee3;
		border-radius: 50px;
		color: #fff;
		border: none;
		font-size: 16px;
		font-weight: bold;
		position: absolute;
		bottom: 0px;
		margin: auto;
		left: 0;
		right: 0;
		font-family: PingFang SC;
	}

	.bottom {
		position: fixed;
		bottom: 20px;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
		color: #999999;
		font-size: 14px;
	}

	.register-btn {
		position: absolute;
		bottom: -50px;
		color: #999999;
		margin: auto;
		left: 0;
		right: 0;
		font-size: 14px;
		background: transparent;
	}
</style>
