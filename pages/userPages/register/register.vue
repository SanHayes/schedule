<template>
	<view class="content u-flex-col u-col-center">
		<u-navbar :is-back="false" title="" :border-bottom="false" :background="headerBg">
			<view class="change-lang" :class="{'black-txt':topDis>90}" slot="right" @click="setLang">
				{{$t('common.lan')}}
			</view>
		</u-navbar>
		<view class="u-flex-col u-p-50 logo-box">
			<view class="u-col-center u-text-center">
				<image src="/static/images/common/fac.logo.png" mode="heightFix"></image>
			</view>
			<view class="px-m-t-70 px-font-24 u-font-bold">
				{{$t('login.txt1')}}
			</view>
			<view class="px-m-t-20 px-font-14 u-font-bold">
				{{$t('login.txt2')}}
			</view>
		</view>
		<view class="login-form u-flex-col bg-white width-690 px-border-radius-12">
			<view class="u-flex-y px-p-30">
				<view class="u-flex u-row-between px-m-t-20 px-m-b-20">
					<view class="px-font-24 u-font-bold">
						{{$t('login.txt4')}}
					</view>
					<view class="px-font-14 text-underline font-error u-font-bold" @click="jumpToLogin">
						{{$t('reg.txt1')}}
					</view>
				</view>
				<view class="px-font-14 u-font-bold">
					{{$t('reg.txt2')}}
				</view>
			</view>
			<u-line color="#D6D7D9" />
			<view class="u-flex px-p-30 px-font-14">
				<text class="font-error u-label-50">
					{{$t('reg.txt3')}}
				</text>
				<input type="text" v-model="username" class="px-m-l-20 px-font-14" :placeholder="$t('reg.plc1')">
			</view>
			<u-line color="#D6D7D9" />
			<view class="u-flex px-p-30 px-font-14">
				<text class="font-error u-label-50">
					{{$t('reg.txt4')}}
				</text>
				<input type="text" v-model="userPhone" class="px-m-l-20 px-font-14" :placeholder="$t('reg.plc2')">
			</view>
			<u-line color="#D6D7D9" />
			<view class="u-flex px-p-30 px-font-14">
				<text class="font-error u-label-50">
					{{$t('reg.txt5')}}
				</text>
				<input type="password" v-model="password" class="px-m-l-20 px-font-14" :placeholder="$t('reg.plc3')">
			</view>
			<u-line color="#D6D7D9" />
			<view class="u-flex px-p-30 px-font-14">
				<text class="font-error u-label-50">
					{{$t('reg.txt6')}}
				</text>
				<input type="password" v-model="confirmPsd" class="px-m-l-20 px-font-14" :placeholder="$t('reg.plc4')">
			</view>
			<u-line color="#D6D7D9" />
			<view class="u-flex px-p-30 px-font-14">
				<text class="font-error u-label-50">
					{{$t('reg.txt7')}}
				</text>
				<input type="password" v-model="payPsd" class="px-m-l-20 px-font-14" :placeholder="$t('reg.plc5')">
			</view>
			<u-line color="#D6D7D9" />
			<!-- <view class="u-flex px-p-30 px-font-14">
				<text class="font-error u-label-50">
					Gender
				</text>
				<view class="u-flex u-flex-1 px-font-14 px-m-l-20 u-row-between" @click="selGender">
					<view>Select Gender</view>
					<u-icon name="arrow-down" color="#333" size="28"></u-icon>
				</view>
			</view>
			<u-line color="#D6D7D9" /> -->
			<view class="u-flex px-p-30 px-font-14">
				<text class="font-error u-label-50">
					{{$t('reg.txt8')}}
				</text>
				<input type="text" v-model="inviteCode" class="px-m-l-20 px-font-14" :placeholder="$t('reg.plc6')">
			</view>
			<u-line color="#D6D7D9" />
			<view class="px-m-b-80 px-p-20 flex-self-center">
				<checkbox-group @change="checkboxChange">
					<label>
						<checkbox style="transform:scale(0.6)" value="1" color="#000" :checked="agree" />{{$t('reg.txt9')}} <text class="text-underline px-m-l-10" @click.stop="jumpTerm">{{$t('reg.txt10')}}</text>
					</label>
				</checkbox-group>
			</view>
			<view class="login-btn u-flex u-row-center" @click="regHandle">
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
				agree:false,
				/* 注册提交数据 */
				username:"",
				userPhone:"",
				password:"",
				confirmPsd:"",
				payPsd:"",
				gender:"1",
				inviteCode:"",
				
				headerBg:{
					backgroundColor: 'rgba(255,255,255,0)'
				},
				topDis:0
			}
		},
		onPageScroll(e) {
			let top = e.scrollTop;
			this.topDis = top;
			if(top>=100 && top<150){
				this.headerBg.backgroundColor = 'rgba(255,255,255,0.3)'
			}
			if(top>=150 && top<200){
				this.headerBg.backgroundColor = 'rgba(255,255,255,0.6)'
			}
			if(top>200){
				this.headerBg.backgroundColor = 'rgba(255,255,255,1)'
			}
			if(top<=20){
				this.headerBg.backgroundColor = 'rgba(255,255,255,0)'
			}
		},
		onLoad() {
			
		},
		methods: {
			resetForm(){
				this.username="";
				this.userPhone="";
				this.password="";
				this.confirmPsd="";
				this.payPsd="";
				this.inviteCode="";
			},
			regHandle(){
				let pass = this.judge();
				if(!pass) return;
				let params = {
					username:this.userPhone,
					pass:this.password,
					deal_pass:this.payPsd,
					invite_code:this.inviteCode,
					nickname:this.username
				}
				this.$u.api.register(params).then(res => {
					// console.log(res)
					this.resetForm();
					this.$u.toast(res.msg);
					setTimeout(()=>{
						this.$u.route({type:'back'})
					},1500)
				})
			},
			judge(){
				if(!this.agree){
					this.$u.toast(this.$t('reg.tip1'));
					return false
				}
				if(this.username == "" || this.userPhone == "" || this.password == "" || this.confirmPsd == "" || this.payPsd == "" || this.gender == "" || this.inviteCode == "") {
					this.$u.toast(this.$t('reg.tip2'));
					return false
				}
				if(!this.$u.test.enOrNum(this.username)){
					this.$u.toast(this.$t('reg.tip4'));
					return false
				}
				if(!this.$u.test.enOrNum(this.userPhone)){
					this.$u.toast(this.$t('reg.tip5'));
					return false
				}
				if(this.password != this.confirmPsd){
					this.$u.toast(this.$t('reg.tip3'));
					this.password="";
					this.confirmPsd="";
					return false
				}
				return true
			},
			checkboxChange(e){
				let values = e.detail.value;
				if(values.length>0){
					this.agree = true;
				}else{
					this.agree = false;
				}
			},
			jumpTerm(){
				this.$u.route('/pages/userPages/agreement/agreement')
			},
			jumpToLogin(){
				this.resetForm();
				// #ifdef H5
					let canNavBack = getCurrentPages()
					if( canNavBack && canNavBack.length>1) {  
						uni.navigateBack() 
					} else {  
						history.back();  
					}
				// #endif
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
			},
			selGender(){
				uni.showActionSheet({
					itemList: ['Female', 'Male'],
					success: function (res) {
						if(res.tapIndex==0){
						}else{
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
	.black-txt{
		color: #000;
	}
	.logo-box{
		margin-top: calc(10vh - 29px);
		color: #fff;
		image{
			width: 160px;
			height: 90px;
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
	    padding-top: 50px;
	    padding-bottom: 50px;
	    width: 100%;
	    text-align: center;
	    color: #939393;
	}
}
</style>
