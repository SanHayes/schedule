<template>
	<view class="content">
		<view class="top u-flex">
			<view class="tab-item" :class="{'active':tabIndex==0}" @click="setTab(0)">{{$t('withdraw.txt1')}}</view>
			<view class="tab-item" :class="{'active':tabIndex==1}" @click="setTab(1)">{{$t('withdraw.txt2')}}</view>
		</view>
		<view v-if="tabIndex==0">
			<view class="box1">
				<view class="balance">
					<view class="px-font-14">{{$t('withdraw.txt3')}}</view>
					<view class="px-font-20 px-m-t-10 u-font-bold">{{userInfo.balance}} SGD</view>
					<view class="tips px-m-t-40 px-font-14">
						*{{$t('withdraw.txt4')}}
					</view>
				</view>
			</view>
			<view class="box2">
				<view class="px-font-16 u-font-bold title px-m-b-30">
					{{$t('withdraw.txt5')}}
				</view>
				<view class="form-box">
					<view class="form-item u-flex u-row-between">
						<view class="label font-main px-font-15 u-font-bold">
							{{$t('withdraw.txt6')}}
						</view>
						<input class="input" v-model="amount" type="number" :placeholder="$t('common.plc')" placeholder-style="color:#C0C4CC;fontSize:15px" />
					</view>
					<u-line color="#D6D7D9" />
					<view class="form-item u-flex u-row-between">
						<view class="label font-main px-font-15 u-font-bold">
							{{$t('withdraw.txt7')}}
						</view>
						<input class="input" v-model="payPsd" type="password" :placeholder="$t('common.plc')" placeholder-style="color:#C0C4CC;fontSize:15px" />
					</view>
				</view>
				<view class="recharge u-flex u-row-center">
					<view class="button" @click="subHandle">
						{{$t('withdraw.txt8')}}
					</view>
				</view>
			</view>
		</view>
		<view class="lists px-p-30" v-else>
			<view v-if="applyList.length>0">
				<view class="list-item" v-for="(item,index) in applyList" :key="index">
					<image class="icon" src="/static/images/home/wallet_log.png" mode=""></image>
					<view class="info">
						<view class="u-flex">
							<view class="title">
								{{$t('withdraw.txt1')}}
							</view>
							<text class="status status_1" :class="{'status_2':item.status==3}">{{ statusTxt[item.status - 1] }}</text>
						</view>
						<view class="px-font-14" v-if="item.remark">
							{{$t('withdraw.txt9')}}{{item.remark}}
						</view>
						<view class="u-flex">
							<text class="create_time">{{item.create_time}}</text>
							<text class="money">-{{item.price}}</text>
						</view>
					</view>
				</view>
				<u-loadmore :status="loadStatus" :load-text="loadText" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				userInfo:{},
				/* 记录列表 */
				applyList:[],
				/* 提交数据 */
				amount:"",
				payPsd:"",
				/* 分页相关 */
				totalPage: "", //数据总页数
				pageNum: 1,
				loadStatus: 'loadmore',
				loadText: {
					loadmore: this.$t('loadmore.tip1'),
					loading: this.$t('loadmore.tip2'),
					nomore: this.$t('loadmore.tip3'),
				},
				statusTxt:[this.$t('withdraw.status1'),this.$t('withdraw.status2'),this.$t('withdraw.status3')]
			};
		},
		onShow() {
			this.getUser()
		},
		onReachBottom() {
			if(this.tabIndex == 0) return;
			if (this.pageNum >= this.totalPage) return;
			this.loadStatus = 'loading';
			this.pageNum = ++this.pageNum;
			this.getApplyList()
		},
		methods: {
			/* 重置获取记录 */
			resetList(){
				this.pageNum = 1;
				this.applyList = [];
				this.getApplyList()
			},
			/* 获取申请记录 */
			getApplyList() {
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.$u.api.applyLogs({
					page: this.pageNum,
					web_time: nowTime,
				}).then(res => {
					console.log(res)
					this.applyList = this.applyList.concat(res.data);
					this.totalPage = res.last_page;
					if (this.pageNum >= this.totalPage) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loading';
					}
				})
			},
			setTab(i) {
				if (this.tabIndex == i) return;
				this.tabIndex = i;
				if(this.tabIndex == 1){
					this.resetList()
				}
			},
			/* 获取用户信息 */
			getUser(){
				this.$u.api.userInfo().then(res => {
					this.userInfo = res.data;
				})
			},
			subHandle(){
				if(this.userInfo.bind_card == 0){
					this.showHandle()
				}else{
					this.confirm()
				}
			},
			/* 二次确认 */
			confirm(){
				let pass = this.judge();
				if(!pass) return;
				const that = this;
				uni.showModal({
					title: that.vuex_config.app_name,
					content: that.$t('withdraw.txt10'),
					confirmText:that.$t('common.confirm'),
					confirmColor:'#52006B',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.subApply()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/* 提交申请 */
			subApply(){
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				let params = {
					web_time: nowTime,
					price:this.amount,
					pass:this.payPsd
				}
				this.$u.api.apply(params).then(res=>{
					console.log(res)
					this.amount = '';
					this.payPsd = '';
					this.$u.toast(res.msg);
					setTimeout(()=>{
						this.getUser();
					},1500)
				})
			},
			judge(){
				if(this.amount == ''){
					uni.showToast({
						title: this.$t('withdraw.tip1'),
						image:"/static/images/common/fail.png",
						icon:"none",
						duration: 2000
					});
					return false
				}
				if(this.payPsd == ''){
					uni.showToast({
						title: this.$t('password.tip1'),
						image:"/static/images/common/fail.png",
						icon:"none",
						duration: 2000
					});
					return false
				}
				return true
			},
			/* 跳转设置卡信息 */
			showHandle(){
				const that = this;
				uni.showModal({
					title: that.vuex_config.app_name,
					content: 'Kindly fill in your withdrawal details to withdraw!',
					confirmText:'To bind',
					confirmColor:'#52006B',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.$u.route('/pages/bindAccount/bindAccount')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
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
				padding: 20px 15px;
				color: #fff;
				.tips{
					font-weight: normal;
				}
			}
		}
		.box2{
			padding: 0 15px 15px;
			.title{
				color: #fff;
			}
			.form-box {
				background: white;
				padding: 10px 20px;
				border-radius: 10px;
			
				.form-item {
					padding: 10px 0;
					font-size: 14px;
					color: #303133;
			
					.label {
						width: 180px;
					}
			
					.input {
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
		.lists{
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
