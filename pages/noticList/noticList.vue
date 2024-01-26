<template>
	<view class="content">
		<view class="num-tips">
			{{total}} {{$t('notic.txt1')}}
		</view>
		<view class="list" v-if="noticList.length>0">
			<view class="list-item u-flex u-row-between" @click="goDetail(item)" v-for="(item,index) in noticList" :key="index">
				<view class="notic-info">
					<view class="desc">
						<text class="un-read font-main" v-if="item.status==0">[{{$t('notic.txt2')}}]</text>{{item.content}}
					</view>
					<view class="time">
						{{item.create_time}}
					</view>
				</view>
				<u-icon class="icon-r" name="arrow-right" color="#00554D" size="28"></u-icon>
			</view>
			<u-loadmore :status="loadStatus" :load-text="loadText" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticList:[],
				/* 分页相关 */
				totalPage: "", //数据总页数
				pageNum: 1,
				loadStatus: 'loadmore',
				total:"",
				loadText: {
					loadmore: this.$t('loadmore.tip1'),
					loading: this.$t('loadmore.tip2'),
					nomore: this.$t('loadmore.tip3'),
				}
			};
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
			this.getNoticList()
		},
		methods: {
			/* 重置分页数据 */
			resetPage() {
				this.pageNum = 1;
				this.loadStatus = 'loadmore';
				this.noticList = [];
				this.getNoticList()
			},
			goDetail(msg) {
				this.$u.route('/pages/noticDetail/noticDetail', {msg:encodeURIComponent(JSON.stringify(msg))})
			},
			getNoticList() {
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.$u.api.msgList({
					page: this.pageNum,
					web_time: nowTime,
				}).then(res => {
					// console.log(res)
					this.noticList = this.noticList.concat(res.data);
					this.totalPage = res.last_page;
					this.total = res.total;
					if (this.pageNum >= this.totalPage) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loading';
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 15px;

		.num-tips {
			text-align: center;
			margin-bottom: 5px;
			color: #999;
			font-size: 16px;
		}

		.list {
			.list-item {
				padding: 15px;
				background-color: #fff;
				border-radius: 10px;
				margin-bottom: 15px;

				.notic-info {
					.desc {
						font-size: 18px;
						border-radius: 15px;
						margin-top: 5px;
						color: #061035;
						overflow: hidden;
						display: -webkit-box;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						width: 95%;
						.un-read{
							margin-right:6px;
						}
					}

					.time {
						font-size: 16px;
						color: #919191;
						margin: 10px 0 0 0;
					}
				}

				.icon-r {
					margin-right: 3%;
				}
			}
		}
	}
</style>
