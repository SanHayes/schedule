<template>
	<view class="content u-flex-col u-col-center">
		<u-navbar :is-back="false" title="" :border-bottom="false" :background="headerBg">
			<view class="change-lang" slot="right" @click="setLang">
				{{$t('common.lan')}}
			</view> 
		</u-navbar>
		<view class="u-flex-col u-text-center u-p-50 logo-box">
			<view class="u-col-center">
				<image src="/static/images/common/logo5.png" mode="heightFix"></image>
			</view>
			<view class="px-m-t-42 px-font-24 u-font-bold">
				{{$t('login.txt1')}}
			</view>
			<view class="px-m-t-30 px-font-14 u-font-bold">
				{{$t('login.txt2')}}
			</view>
		</view>
		<view class="login-form u-flex-col bg-white width-690 px-border-radius-12">
			<view class="u-flex-y px-p-30">
				<view class="u-flex u-row-between">
					<view class="px-font-14 u-font-bold">
						{{$t('login.txt3')}}
					</view>
					<view class="px-font-14 text-underline font-error u-font-bold" @click="jumpToReg">
						{{$t('login.txt4')}}
					</view>
				</view>
			</view>
			<u-line color="#D6D7D9" />
			<view class="u-flex px-p-30 px-font-16">
				<text class="font-error u-label-32">
					{{$t('login.txt5')}}
				</text>
				<input type="text" v-model="account" class="px-m-l-20" :placeholder="$t('common.plc')">
			</view>
			<u-line color="#D6D7D9" />
			<view class="u-flex px-p-30 px-font-16">
				<text class="font-error u-label-32">
					{{$t('login.txt6')}}
				</text>
				<input type="password" v-model="password" class="px-m-l-20" :placeholder="$t('common.plc')">
			</view>
			<u-line color="#D6D7D9" />
			<view class="px-m-t-100"></view>
			<view class="login-btn u-flex u-row-center" @click="loginHandle">
				<view class="fade-transition">
					<image class="login-img" src="/static/images/common/nx-33.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="fotter_box">
			<view class="bottom-text px-font-14">
				{{$t('common.copyright')}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 登录提交数据 */
				account:"",
				password:"",
				
				headerBg:{
					backgroundColor: 'transparent',
				},
			}
		},
		onLoad() {
		},
		methods: {
			judge(){
				if(this.account == "" || this.password == "") {
					this.$u.toast(this.$t('login.tip1'));
					return false
				}
				if(!this.$u.test.enOrNum(this.account)){
					this.$u.toast(this.$t('reg.tip4'));
					return false
				}
				return true
			},
			loginHandle(){
				let pass = this.judge();
				if(!pass) return;
				let params = {
					username:this.account,
					pass:this.password,
				}
				this.$u.api.login(params).then(res => {
					// console.log(res)
					this.$u.vuex('vuex_authorization',res.data.authorization);
					this.$u.toast(res.msg);
					setTimeout(()=>{
						this.$u.route({
							type:'reLaunch',
							url: '/pages/tabbar/index/index',
						})
					},1500)
				})
			},
			jumpToReg(){
				this.account = "";
				this.password = "";
				this.$u.route('/pages/userPages/register/register')
			},
			// setLang(){
			// 	const that = this;
			// 	uni.showActionSheet({
			// 		itemList: ['Tiếng Việt', 'English', '繁體中文'],
			// 		success: function (res) {
			// 			if(res.tapIndex==0){
			// 				uni.setLocale('vi-VN');
			// 				that.$u.vuex('vuex_lang','vi-VN');
			// 				that.$i18n.locale = 'vi-VN';
			// 			}else if(res.tapIndex==1){
			// 				uni.setLocale('en');
			// 				that.$u.vuex('vuex_lang','en');
			// 				that.$i18n.locale = 'en';
			// 			}else{
			// 				uni.setLocale('zh-Hant');
			// 				that.$u.vuex('vuex_lang','zh-Hant');
			// 				that.$i18n.locale = 'zh-Hant';
			// 			}
			// 		},
					setLang(){
						const that = this;
						uni.showActionSheet({
							itemList: ['English', '繁體中文'],
							success: function (res) {
								if(res.tapIndex==0){
									uni.setLocale('en');
									that.$u.vuex('vuex_lang','en');
									that.$i18n.locale = 'en';
								// }else if(res.tapIndex==1){
								// 	uni.setLocale('en');
								// 	that.$u.vuex('vuex_lang','en');
								// 	that.$i18n.locale = 'en';
								}else{
									uni.setLocale('zh-Hant');
									that.$u.vuex('vuex_lang','zh-Hant');
									that.$i18n.locale = 'zh-Hant';
								}
							},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			}
		}
	}
</script>

<style>
	page{
		color: #333;
		font-family: PingFangSC-Medium;
		height: 100%;
	}
</style>
<style lang="scss" scoped>
.content{
	height: 100%;
	background-image: url('/static/images/common/BG-020.png');
	background-size: 100% auto;
	background-repeat: no-repeat;
	.change-lang{
		padding: 0 20rpx;
		color: #fff;
		font-size: 16px;
	}
	.logo-box{
		margin-top: calc(10vh - 29px);
		color: #fff;
		image{
			height: 60px;
		}
	}
	.login-form{
		position: relative;
		.login-btn{
			position: absolute;
			bottom: -30px;
			left: 142px;
			border-radius: 50%;
			.fade-transition{
				animation: fadeIn 1s;
			}
			.login-img{
				width: 60px;
				height: 60px;
			}
		}
		@keyframes fadeIn {
		  0% {
		    opacity: 0;
		  }
		 
		  100% {
		    opacity: 1;
		  }
		}
	}
	.fotter_box {
	    color: #939393 !important;
	}
}
</style>
