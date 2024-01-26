<template>
	<view class="content">
		<view class="tips">
			{{$t('bind.txt1')}}
		</view>
		<view class="form-box">
			<view class="form-item u-flex u-row-between">
				<view class="label font-main">
					{{$t('bind.txt2')}}
				</view>
				<input class="input" v-model="bankInfo.account_name" type="text" :placeholder="$t('common.plc')" />
			</view>
			<u-line color="#ededed" />
			<view class="form-item u-flex u-row-between">
				<view class="label font-main">
					{{$t('bind.txt3')}}
				</view>
				<input class="input" v-model="bankInfo.name" type="text" :placeholder="$t('common.plc')" />
			</view>
			<u-line color="#ededed" />
			<view class="form-item u-flex u-row-between">
				<view class="label font-main">
					{{$t('bind.txt4')}}
				</view>
				<input class="input" v-model="bankInfo.card_no" type="text" :placeholder="$t('common.plc')" />
			</view>
			<u-line color="#ededed" />
			<view class="form-item u-flex u-row-between">
				<view class="label font-main">
					{{$t('bind.txt5')}}
				</view>
				<input class="input" v-model="dealPass" type="text" :placeholder="$t('bind.txt8')" />
			</view>
		</view>
		<view class="item_button">
			<view class="button" v-if="!canChange" @click="setHandle">
				{{$t('bind.txt6')}}
			</view>
			<view class="button reset-btn" v-if="canChange" @click="modifyHandle">
				{{$t('bind.txt7')}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankInfo:{
					account_name:"",
					name:"",
					card_no:""
				},
				dealPass:"",
				/* 修改标识 */
				canChange:false,
				/* 设置的支付密码 */
				userPay:""
			};
		},
		onLoad() {
			this.getBankInfo()
		},
		methods:{
			modifyHandle(){
				this.bankInfo.account_name = "";
				this.bankInfo.name = "";
				this.bankInfo.card_no = "";
				this.dealPass = "";
				this.canChange = false;
			},
			async getBankInfo(){
				let {data} = await this.$u.api.userInfo();
				this.userPay = data.deal_pass;
				if(data.bind_card == 1){
					this.$u.api.getBank().then(res => {
						this.bankInfo = res.data;
						this.canChange = true;
					})
				}else{
					this.canChange = false;
				}
			},
			setHandle(){
				let pass = this.judge();
				if(!pass) return;
				let parmas = {
					name: this.bankInfo.name,
					account_name: this.bankInfo.account_name,
					card_no:this.bankInfo.card_no,
				}
				this.$u.api.setBank(parmas).then(res => {
					this.dealPass = "";
					this.$u.toast(res.msg);
					this.getBankInfo()
				})
			},
			judge(){
				if(this.bankInfo.account_name == "" || this.bankInfo.name == "" || this.bankInfo.card_no == "" || this.dealPass == '') {
					this.$u.toast(this.$t('bank.tip1'));
					return false
				}
				if(this.dealPass != this.userPay){
					this.$u.toast(this.$t('password.tip2'));
					return false
				}
				return true
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 15px;
		
		.tips{
			font-size: 18px;
			text-align: center;
			color: #999;
			margin-bottom: 10px;
		}
		
		.form-box {
			background: white;
			border-radius: 10px;

			.form-item {
				font-size: 14px;
				color: #303133;
				padding: 0 20px;

				.label {
					width: 160px;
					padding: 10px 0;
				}

				.input {
					height: 55px;
					line-height: 55px;
					width: 100%;
					font-size: 14px;
					text-align: right;
				}
			}
		}

		.item_button {
			padding: 10px 0;

			.button {
				width: 70%;
				margin-left: 15%;
				background-color: #416cc7;
				color: #fff;
				text-align: center;
				height: 50px;
				line-height: 50px;
				border-radius: 15px;
				font-size: 15px;
			}
			.reset-btn{
				background-color: #bababa !important;
			}
		}
	}
</style>
