<template>
	<view class="content">
		<view class="form-box">
			<view class="form-item u-flex u-row-between">
				<view class="label font-main px-font-15">
					{{$t('pwd.txt1')}}
				</view>
				<input class="input" type="text" v-model="oldPsd" :placeholder="$t('common.plc')" placeholder-style="color:#C0C4CC;fontSize:15px" />
			</view>
			<u-line color="#D6D7D9" />
			<view class="form-item u-flex u-row-between">
				<view class="label font-main px-font-15">
					{{$t('pwd.txt2')}}
				</view>
				<input class="input" type="text" v-model="newPsd" :placeholder="$t('common.plc')" placeholder-style="color:#C0C4CC;fontSize:15px" />
			</view>
			<u-line color="#D6D7D9" />
			<view class="form-item u-flex u-row-between">
				<view class="label font-main px-font-15">
					{{$t('pwd.txt3')}}
				</view>
				<input class="input" type="text" v-model="confirmPsd" :placeholder="$t('common.plc')" placeholder-style="color:#C0C4CC;fontSize:15px" />
			</view>
		</view>
		<view class="item_button">
			<view class="button" @click="resetHandle">
				{{$t('pwd.txt4')}}
			</view>
		</view>
		<view class="tips">
			{{$t('pwd.txt5')}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 提交数据 */
				oldPsd:"",
				newPsd:"",
				confirmPsd:""
			};
		},
		methods:{
			judge(){
				if(this.oldPsd == "" || this.newPsd == "" || this.confirmPsd == "") {
					this.$u.toast(this.$t('pwd.txt7'));
					return false
				}
				if(this.newPsd != this.confirmPsd){
					this.$u.toast(this.$t('reg.tip3'));
					return false
				}
				return true
			},
			resetHandle(){
				let pass = this.judge();
				if(!pass) return;
				let params = {
					old_pass:this.oldPsd,
					new_pass:this.newPsd,
					type:'1',
				}
				this.$u.api.resetPsd(params).then(res => {
					// console.log(res);
					this.oldPsd = "";
					this.newPsd = "";
					this.confirmPsd = "";
					this.$u.toast(res.msg);
					setTimeout(()=>{
						this.$u.route({
							type:'back'
						})
					},1500)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 15px;

		.form-box {
			width: 98%;
			margin: 0px auto;
			background: white;
			padding: 5px 5px 5px 10px;
			border-radius: 10px;

			.form-item {
				padding: 10px 0;
				font-size: 14px;
				color: #303133;

				.label {
					width: 180px;
				}

				.input {
					padding: 6px 9px;
					flex: 1;
				}
			}
		}

		.item_button {
			padding: 10px 0;

			.button {
				width: 70%;
				margin-left: 15%;
				background: linear-gradient(#001a37, #002f5a);
				border: 1px solid #233978;
				color: #fff;
				text-align: center;
				height: 50px;
				line-height: 50px;
				border-radius: 15px;
				font-size: 15px;
			}
		}

		.tips {
			font-size: 16px;
			text-align: center;
			color: red;
		}
	}
</style>
