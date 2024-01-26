<template>
	<view class="content">
		<view class="top u-flex">
			<view class="tab-item" :class="{'active':tabIndex==0}" @click="setTab(0)">{{$t('deposit.txt1')}}</view>
			<view class="tab-item" :class="{'active':tabIndex==1}" @click="setTab(1)">{{$t('deposit.txt2')}}</view>
		</view>
		<view v-if="tabIndex==0">
			<view class="box1">
				<view class="balance u-font-bold">
					<view class="px-font-14">{{$t('deposit.txt3')}}</view>
					<view class="px-font-20 px-m-t-10">{{userInfo.balance}} SGD</view>
				</view>
			</view>
			<view class="box2">
				<view class="lists u-flex u-row-between">
				<!-- <view class="lists u-flex u-row-between u-flex-wrap"> -->
					<view class="list-item px-font-14" v-for="(item,index) in payList" :key="index" :class="{'l-active':listIndex == index}" @click="selItem(index)">
						<view class="px-font-16">SGD</view>
						<view class="px-m-t-20 u-font-bold">{{item.num}}</view>
						<view class="px-m-t-30">{{$t('deposit.txt4')}}</view>
						<view>{{item.num}}</view>
					</view>
				</view>
				<view class="form-box">
					<view class="form-item u-flex u-row-between">
						<view class="label font-main px-font-15 u-font-bold">
							{{$t('deposit.txt5')}}
						</view>
						<input class="input" type="number" :placeholder="$t('common.plc')" placeholder-style="color:#C0C4CC;fontSize:15px" />
					</view>
				</view>
				<view class="recharge u-flex u-row-center">
					<view class="button" @click="payMethodes">
						{{$t('deposit.txt6')}}
					</view>
				</view>
			</view>
		</view>
		<!-- 记录 -->
		<view class="list-box px-p-30" v-else>
			<!-- <view class="list-item">
				<image class="icon" src="/static/images/home/wallet_log.png" mode=""></image>
				<view class="info">
					<view class="u-flex">
						<view class="title">
							Deposit
						</view>
						<text class="status status_1">Paid</text>
					</view>
					<view class="u-flex">
						<text class="create_time">2023-01-10 19:20:16</text>
						<text class="money">+195000000.00</text>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				tabIndex: 0,
				/* 套餐 */
				listIndex:null,
				payList:[{num:'1.000.000'},{num:'2.000.000'},{num:'5.000.000'}],
				// payList:[{num:'1.000.000'},{num:'2.000.000'},{num:'5.000.000'},{num:'1.000.000'},{num:'2.000.000'},{num:'5.000.000'}]
			};
		},
		onShow() {
			this.getUser()
		},
		methods: {
			/* 获取用户信息 */
			getUser(){
				this.$u.api.userInfo().then(res => {
					this.userInfo = res.data;
				})
			},
			setTab(i) {
				if (this.tabIndex == i) return;
				this.tabIndex = i;
			},
			selItem(i){
				if(this.listIndex == i) return;
				this.listIndex = i;
			},
			async payMethodes(){
				let {data} = await this.$u.api.serverList();
				let action = data.map(item=>item.name);
				uni.showActionSheet({
					itemList: action,
					success: function(res) {
						let url = data[res.tapIndex].val;
						// #ifdef APP-PLUS
						plus.runtime.openURL(url)
						// #endif
						// #ifdef H5
						window.open(url)
						// #endif
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.top {
			height: 50px;
			line-height: 50px;
			color: #666;
			font-size: 14px;
			border-bottom: 1px solid #3c5189;
			padding: 0 10%;
			.active {
				color: #416cc7;
				font-weight: 700;
			}
			.tab-item{
				width: 50%;
				text-align: center;
			}
		}
		.box1{
			padding: 15px;
			position: relative;
			.balance{
				background-image: url('/static/images/common/BG-020.png');
				background-repeat: no-repeat;
				background-size: 100% auto;
				border-radius: 10px;
				padding: 30px 15px;
				color: #fff;
			}
		}
		.box2{
			padding: 15px;
			.lists{
				.list-item{
					width: 33.33333%;
					// width: 31%;
					padding: 15px 0;
					text-align: center;
					border-radius: 10px;
					background-color: initial;
					color: #9bb5e2;
					margin-right: 10px;
					margin-bottom: 10px;
					border: 1px solid #194f6d;
					&:last-child{
					// &:nth-child(3n){
						margin-right: 0;
					}
				}
				.l-active{
					background: linear-gradient(#001a37,#002f5a);
					border-color: #233978 !important;
					font-weight: 700;
					color: #fff!important;
				}
			}
			.form-box {
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
			.recharge{
				margin-top: 30px;
				margin-bottom: 10px;
				.button{
					width: 70%;
					background: linear-gradient(#001a37,#002f5a);
					border: 1px solid #233978;
					color: #fff;
					text-align: center;
					height: 50px;
					line-height: 50px;
					border-radius: 15px;
					font-size: 15px;
				}
			}
		}
		.list-box{
			.list-item{
				background-color: #fff;
				color: #333;
				padding: 15px;
				border-radius: 15px;
				display: flex;
				justify-content: flex-start;
				flex-wrap: nowrap;
				align-items: center;
				margin-bottom: 15px;
				box-shadow: 0 2px 4px 1px rgba(194, 0, 42, 0.15);
				.icon{
					width: 36px;
					height: 36px;
					border-radius: 18px;
					margin-right: 10px;
				}
				.title{
					font-size: 14px;
					font-weight: 600;
				}
				.status{
					font-size: 12px;
					background-color: #590f7f;
					padding: 2px 10px;
					color: #fff;
					border-radius: 3px;
				}
				.status_0{
					background-color: #590f7f;
				}
				.status_1{
					background-color: #590f7f;
				}
				.status_2{
				    background-color: #555;
				}
				.create_time{
					font-size: 12px;
				}
				.money{
					font-size: 14px;
					font-weight: 600;
					color: #333;
				}
				.red{
					color: #590f7f;
				}
				.green{
					color: #18bc37;
				}
			}
		}
	}
</style>
