<template>
	<view class="content">
		<!-- 自定义头部 -->
		<h-header :logo="vuex_config.app_logo"></h-header>
		<!-- 分类tab -->
		<view class="tab-box u-flex u-row-between">
			<view class="tab-item" :class="{'active':selIndex == index}" v-for="(item,index) in tabList" :key="index"
				@click="typeChange(index)">
				{{ item.txt }}
			</view>
		</view>
		<!-- 记录列表 -->
		<view class="list">
			<view v-if="orderList.length>0">
				<view class="list-item" v-for="(item,index) in orderList" :key="index">
					<view class="u-flex u-row-between">
						<view class="time">
							{{ item.create_time }}
						</view>
						<view>
							<text class="status status_0" v-if="item.status==1">{{$t('history.txt1')}}</text>
							<text class="status status_1" v-if="item.status==2">{{$t('history.txt2')}}</text>
							<text class="btn" v-if="item.status==1" @click="subOrder(item.id)">{{$t('history.txt3')}}</text>
						</view>
					</view>
					<view class="info">
						<view class="goods">
							<image class="logo" :src="item.goods_img" mode="widthFix"></image>
							<view class="title">{{item.goods_name}}</view>
						</view>
						<view class="order">
							<view class="o-item">
								<view class="label">
									{{$t('history.txt4')}}
								</view>
								<view class="desc">
									<text class="m-icon">SGD</text>{{item.price}}
								</view>
							</view>
							<view class="o-item">
								<view class="label">
									{{$t('history.txt5')}}
								</view>
								<view class="desc">
									<text class="m-icon">SGD</text>{{item.commission}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="loadStatus" :load-text="loadText" />
			</view>
		</view>
		<!-- 自定义loading -->
		<view class="cus-loading" v-if="showLoading">
			<image src="/static/images/common/loading.svg" mode=""></image>
		</view>
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
				selIndex: 0,
				tabList: [{
					val: "",
					txt: this.$t('history.txt7')
				}, {
					val: "2",
					txt: this.$t('history.txt1')
				}, {
					val: "1",
					txt: this.$t('history.txt2')
				}],
				/* 分页相关 */
				totalPage: "", //数据总页数
				pageNum: 1,
				loadStatus: 'loadmore',
				loadText: {
					loadmore: this.$t('loadmore.tip1'),
					loading: this.$t('loadmore.tip2'),
					nomore: this.$t('loadmore.tip3'),
				},
				/* 订单列表 */
				orderList: []
			}
		},
		onShow() {
			this.resetPage()
		},
		onPullDownRefresh() {
			this.resetPage();
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.pageNum >= this.totalPage) return;
			this.loadStatus = 'loading';
			this.pageNum = ++this.pageNum;
			this.getLogs()
		},
		methods: {
			getLogs() {
				let status;
				if (this.selIndex == 0) {
					status = '';
				} else if (this.selIndex == 1) {
					status = '1';
				} else {
					status = '2';
				}
				
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.$u.api.orderList({
					page: this.pageNum,
					web_time: nowTime,
					status
				}).then(res => {
					// console.log(res)
					this.orderList = this.orderList.concat(res.data);
					this.totalPage = res.last_page;
					if (this.pageNum >= this.totalPage) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loading';
					}
				})
			},
			/* 重置分页数据 */
			resetPage() {
				this.pageNum = 1;
				this.loadStatus = 'loadmore';
				this.orderList = [];
				this.getLogs()
			},
			typeChange(i) {
				if (this.selIndex == i) return;
				this.selIndex = i;
				this.resetPage()
			},
			subOrder(id) {
				const that = this;
				uni.showModal({
					title: that.vuex_config.app_name,
					content: that.$t('history.txt6'),
					confirmText: that.$t('common.confirm'),
					confirmColor: '#00554D',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.submissionHandle(id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/* 提交订单 */
			submissionHandle(id) {
				this.showLoading = true;
				let params = {
					order_id: id
				}
				this.$u.api.subOrder(params).then(res => {
					// console.log(res)
					this.$u.toast(res.msg)
					this.showLoading = false;
					this.resetPage()
				}).catch(err=>{
					this.showLoading = false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-box {
		width: 100%;
		color: #acacac;
		padding-top: 25px;

		.tab-item {
			width: 33.333%;
			text-align: center;
			font-size: 16px;

			&.active {
				color: #416cc7;
				font-weight: 600;
			}
		}
	}

	.list {
		padding: 15px;
		padding-bottom: 90px;
		border-top: 1px solid #c4ebe8;
		margin-top: 15px;

		.list-item {
			margin-bottom: 25px;

			.time {
				font-size: 15px;
				color: #fff;
			}

			.status {
				font-size: 12px;
				padding: 2px 8px;
				border-radius: 15px;
			}

			.status_0 {
				border: 1px solid #9f9f9f;
				color: #9f9f9f;
			}

			.status_1 {
				border: 1px solid #00b25e;
				color: #00b25e;
			}

			.status_2 {
				border: 1px solid #ff5f2e;
				color: #ff5f2e;
			}

			.btn {
				background-color: #590f7f;
				color: #fff;
				font-size: 12px;
				padding: 2px 8px;
				border-radius: 15px;
				margin-left: 10px;
			}

			.info {
				background-color: #fff;
				border-radius: 10px;
				padding: 15px 10px;
				margin-top: 10px;
				box-shadow: 0 2px 4px 1px rgba(194, 0, 35, 0.1);

				.goods {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					border-bottom: 1px solid #d8d8d8;
					padding-bottom: 5px;

					.logo {
						width: 55px;
						max-height: 80px;
						border-radius: 15px;
						margin-right: 15px;
					}

					.title {
						font-size: 14px;
						overflow: hidden;
						-webkit-line-clamp: 2;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
					}
				}
			}

			.order {
				display: flex;
				justify-content: flex-start;
				padding: 10px 0 0 0;

				.o-item {
					width: 50%;

					.label {
						color: #666;
						font-size: 12px;
					}

					.desc {
						font-size: 14px;
						font-weight: 600;
						margin-top: 3px;
						color: #590f7f;

						.m-icon {
							margin-right: 3px;
							font-size: 12px;
						}
					}
				}
			}
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
</style>
