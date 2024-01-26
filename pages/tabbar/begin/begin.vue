<template>
	<view class="content">
		<!-- 自定义头部 -->
		<h-header :logo="vuex_config.app_logo"></h-header>
		<!-- 动画滚动 -->
		<view class="scorll-box px-m-t-20">
			<view class="scroll-content">
				<view class="u-flex" v-for="(item,index) in  appList" :key="index">
					<view v-for="(app,i) in item" :key="app.name" @click="jumpDesc(app)">
						<image class="s-logo" :src="app.img" mode=""></image>
					</view>
					<view v-for="(sec,j) in item" :key="j" @click="jumpDesc(sec)">
						<image class="s-logo" :src="sec.img" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- new -->
		<view class="new-box u-flex u-row-center">
			<view class="new-item">
				<image src="/static/images/common/new-l.png" mode=""></image>
				<view class="px-m-l-30 new-txt">
					<view class="new-txt1">{{$t('begin.txt2')}}</view>
					<view class="new-txt2">SGD<br/>{{userInfo.today_profit}}</view>
				</view>
			</view>
			<view class="new-item new-right">
				<image src="/static/images/common/new-r.png" mode=""></image>
				<view class="px-m-l-30 new-txt">
					<view class="new-txt1">{{$t('begin.txt4')}}</view>
					<view class="new-txt2">SGD<br/>{{userInfo.balance}}</view>
				</view>
			</view>
		</view>
		<view class="new-start">
			<view class="u-flex u-row-center title">
				<view class="big">
					{{$t('begin.txt1')}}
				</view>
				<view class="small">
					({{userInfo.order_total}} / {{userInfo.level && userInfo.level.order_num}})
				</view>
			</view>
			<view class="new-btn" @click="starthandle">
				{{$t('begin.txt19')}}
			</view>
		</view>
		<!-- 开始 -->
		<!-- <view class="start-box px-m-t-80">
			<view class="u-flex u-font-bold title">
				<image :src="userInfo.level && userInfo.level.img" mode=""></image>
				<view class="px-m-l-20 px-font-16">{{userInfo.level && userInfo.level.name}}</view>
			</view>
			<view class="btn-box">
				<view class="btn" @click="starthandle">{{$t('begin.txt1')}} {{userInfo.order_total}} / {{userInfo.level && userInfo.level.order_num}}</view>
			</view>
		</view>
		<view class="bg-white px-m-t-40 width-690 profit-box">
			<view class="u-flex px-m-t-20 u-row-between px-p-b-30">
				<image class="icon-left" src="" mode=""></image>
				<view class="px-m-l-50 con-center px-font-14">
					<view>{{$t('begin.txt2')}}</view>
					<view class="px-m-t-10 u-font-bold">VND {{userInfo.today_profit}}</text></view>
				</view>
				<view class="px-m-l-60 con-right px-font-14 u-flex-1">
					{{$t('begin.txt3')}}
				</view>
			</view>
			<u-line color="#D6D7D9" />
			<view class="u-flex px-m-t-20">
				<image class="icon-left" src="/" mode=""></image>
				<view class="px-m-l-50 con-center px-font-14">
					<view>{{$t('begin.txt4')}}</view>
					<view class="px-m-t-10 u-font-bold w-115">VND {{userInfo.balance}}</view>
				</view>
				<view class="px-m-l-60 con-right px-font-14">
					{{$t('begin.txt5')}}
				</view>
			</view>
		</view> -->
		<view class="width-690 bottom-tips">
			<view class="px-font-16">{{$t('begin.txt6')}}</view>
			<view class="px-m-t-10 px-font-12">• {{$t('begin.txt7')}}: {{ vuex_config.operation_time }}</view>
			<view class="px-m-t-10 px-font-12">• {{$t('begin.txt8')}}!</view>
		</view>
		<!-- 自定义loading -->
		<view class="cus-loading" v-if="showLoading">
			<image src="/static/images/common/loading.svg" mode=""></image>
		</view>
		<!-- 下单弹窗 -->
		<u-popup mode="bottom" v-model="showPop">
			<view class="pop-box">
				<view class="header u-flex u-row-between">
					<text>{{$t('begin.txt9')}}</text>
					<image class="close" src="/static/images/home/close.png" mode="" @click="closePop"></image>
				</view>
				<view class="creat-info u-flex-col u-col-center px-m-t-30">
					<image class="c-icon" :src="goodsInfo.goods_img" mode="widthFix"></image>
					<view class="c-name px-m-t-20 u-font-bold px-font-16">
						{{goodsInfo.goods_name}}
					</view>
					<view class="money-box u-flex px-m-t-60 px-m-b-30">
						<view class="box-item">
							<view class="title px-font-14">
								{{$t('begin.txt10')}}
							</view>
							<view class="nums px-font-16 px-m-t-10">
								SGD {{goodsInfo.price}}
							</view>
						</view>
						<view class="box-item">
							<view class="title px-font-14">
								{{$t('begin.txt11')}}
							</view>
							<view class="nums px-font-16 px-m-t-10">
								SGD {{goodsInfo.commission}}
							</view>
						</view>
					</view>
					<u-line color="#D6D7D9" />
					<view class="u-flex u-row-between info-list">
						<view class="label">
							{{$t('begin.txt12')}}
						</view>
						<view class="txt-val">
							{{goodsInfo.create_time}}
						</view>
					</view>
					<u-line color="#D6D7D9" />
					<view class="u-flex u-row-between info-list">
						<view class="label">
							{{$t('begin.txt13')}}
						</view>
						<view class="txt-val">
							{{goodsInfo.order_no}}
						</view>
					</view>
					<u-line color="#D6D7D9" />
				</view>
				<view class="btn" @click="submissionHandle">
					{{$t('begin.txt14')}}
				</view>
			</view>
		</u-popup>
		<!-- 自定义tabbar -->
		<h-tabbar></h-tabbar>
	</view>
</template>

<script>
	import hTabbar from "@/components/h-tabbar/h-tabbar";
	import hHeader from "@/components/h-header/h-header";
	export default {
		components: {
			hTabbar,
			hHeader
		},
		data() {
			return {
				showLoading:false,
				showPop:false,
				/* 用户信息 */
				userInfo:{},
				/* 轮播二维数据 */
				appList:[],
				/* 订单生成后返回商品信息 */
				goodsInfo:{}
			}
		},
		onLoad() {
			this.initData();
		},
		onShow() {
			this.getUser();
		},
		methods: {
			getUser(){
				this.$u.api.userInfo().then(res => {
					this.userInfo = res.data;
				})
			},
			/* 跳转到描述 */
			jumpDesc(app){
				console.log(app)
				this.$u.route('/pages/companyDesc/companyDesc',{id:app.id})
			},
			/* 数组分割 */
			sliceIntoChunks(arr, chunkSize) {
			    const res = [];
			    for (let i = 0; i < arr.length; i += chunkSize) {
			        const chunk = arr.slice(i, i + chunkSize);
			        res.push(chunk);
			    }
			    return res;
			},
			/* 获取滚动数据 */
			initData(){
				this.$u.api.scrollList().then(res => {
					let mulList = this.sliceIntoChunks(res.data,24);
					this.appList = mulList;
				})
			},
			/* 关闭密码弹窗 */
			closePop(){
				this.showPop = false;
			},
			/* 生成订单 */
			starthandle(){
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.showLoading = true;
				this.$u.api.creatOrder({
					web_time: nowTime
				}).then(res => {
					this.showLoading = false;
					this.goodsInfo = res.data;
					this.showPop = true;
				}).catch(err=>{
					this.showLoading = false;
					console.log(err)
					if(err.data.status == 0){
						uni.hideToast();
						this.noBanlaceTips(err.data.num)
					}if(err.data.status == 1){
						uni.hideToast();
						this.noLastOrder(err.data.num)
					}
				})
				this.getUser();
			},
			/* 做完单提示 */
			noLastOrder(num){
				const that = this;
				uni.showModal({
					title: that.vuex_config.app_name,
					showCancel:false,
					content: `${that.$t('begin.txt17')} ${num} ${that.$t('begin.txt18')}`,
					confirmText: that.$t('common.confirm'),
					confirmColor:'#52006B',
					success: function (res) {
						if (res.confirm) {
							
						} else if (res.cancel) {
							
						}
					}
				});
			},
			/* 余额不足提示 */
			noBanlaceTips(num){
				const that = this;
				uni.showModal({
					title: that.vuex_config.app_name,
					content: `${that.$t('begin.txt15')} ${num}SGD ${that.$t('begin.txt16')}`,
					confirmText: that.$t('home.txt6'),
					confirmColor:'#52006B',
					success: function (res) {
						if (res.confirm) {
							that.$u.route('/pages/deposit/deposit')
						} else if (res.cancel) {
						}
					}
				});
			},
			/* 提交订单 */
			submissionHandle() {
				this.showLoading = true;
				let params = {
					order_id: this.goodsInfo.order_id
				}
				this.$u.api.subOrder(params).then(res => {
					this.$u.toast(res.msg)
					this.showLoading = false;
					this.closePop();
					this.getUser();
				}).catch(err=>{
					this.showLoading = false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-bottom: 70px;

		.scorll-box {
			overflow: hidden;
			max-width: 2160px;
			margin: 0 auto;
		}

		.scroll-content {
			min-height: 360px;
			animation: rowScroll 60s linear infinite;
			.s-logo {
				border: 1px solid #1e2d4b;
				width: 80px;
				border-radius: 15px;
				height: 80px;
				margin: 5px;
				flex-shrink: 0;
			}
		}
		
		.start-box {
			max-width: 2160px;
			padding: 0 15px;
			margin: 0 auto;
			color: #fff;

			.title {
				image {
					width: 40px;
					height: 40px;
				}
			}

			.btn-box {
				margin-top: 15px;

				.btn {
					width: 100%;
					background-color: #009adf;
					color: #fff;
					text-align: center;
					height: 50px;
					line-height: 50px;
					border-radius: 25px;
					font-size: 15px;
				}
			}
		}

		.profit-box {
			margin: 0 auto;
			padding: 10px 5px;
			border-radius: 12px !important;

			.icon-left {
				width: 30px;
				height: 30px;
			}

			.con-center {
				width: 90px;

				.w-115 {
					width: 115px;
				}
			}

			.con-right {
				width: 140px;
			}
		}

		.bottom-tips {
			margin: 25px auto;
			color: #bbbfbe;
		}
	}
	.cus-loading{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		color: #fff;
		background: rgba(0,0,0,.4);
		left: 0;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99999;
	}
	.pop-box {
		background-color: #fff;
		padding: 15px;
		border-radius: 15px 15px 0 0;
	
		.header {
			font-size: 17px;
			color: #333;
	
			.close {
				width: 16px;
				height: 16px;
			}
		}
		
		.creat-info{
			
			.c-icon{
				width: 100px;
				border-radius: 15px;
			}
			.c-name{
				
			}
			.money-box{
				width: 100%;
				.box-item{
					width: 50%;
					text-align: center;
					.title{
						color: #6D6864;
					}
					.nums{
						font-weight: bold;
					}
				}
			}
			.info-list{
				width: 100%;
				font-size: 14px;
				padding: 15px 0;
				.label{
					color: #6D6864;
				}
			}
		}
	
		.btn{
			width: 100%;
			background-color: #416cc7;
			color: #fff;
			text-align: center;
			height: 46px;
			line-height: 46px;
			border-radius: 25px;
			font-size: 15px;
			margin-top: 20px;
			margin-bottom: 100px;
		}
	}
	@keyframes rowScroll {
		0% {
			-webkit-transform: translateX(0px);
			transform: translateX(0px)
		}
	
		100% {
			-webkit-transform: translateX(-2160px);
			transform: translateX(-2160px)
		}
	}
	.new-box{
		padding: 15px;
		
		.new-item{
			text-align: center;
			background-color: #fff;
			width: 160px;
			border-radius: 12px;
			padding: 15px;
			color: #333;
			image{
				width: 50px;
				height: 50px;
			}
			.new-txt{
				text-align: left;
			}
			.new-txt1{
				font-size: 14px;
			}
			.new-txt2{
				margin-top: 3px;
				font-size: 16px;
				font-weight: 700;
			}
		}
		.new-right{
			margin-left: 10px;
		}
	}
	.new-start{
		width: 345px;
		background-color: #fff;
		margin: 15px auto 0;
		padding: 15px;
		border-radius: 8px;
		.title{
			font-size: 18px;
			color: #000;
			.big{
				font-size: 20px;
				font-weight: 700;
			}
			.small{
				margin-left: 100px;
			}
		}
		.new-btn{
			background-color: #4869e8;
			width: 85%;
			margin: 20px auto 0;
			text-align: center;
			padding: 12px;
			border-radius: 12px;
			color: #fff;
			font-size: 16px;
			font-weight: 700;
		}
	}
</style>
