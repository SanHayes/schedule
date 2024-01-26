<template>
	<view class="content">
		<view class="lists px-p-30" v-if="logs.length>0">
			<view class="list-item" v-for="(item,index) in logs" :key="index">
				<image class="icon" src="/static/images/home/wallet_log.png" mode=""></image>
				<view class="info">
					<view class="title">
						<!-- [{{ statusTxt[item.type - 1] }}]{{item.explain}} -->
						{{item.title}}
					</view>
					<view class="u-flex">
						<text class="create_time">{{item.create_time}}</text>
						<text class="money red" v-if="item.status == 2">{{item.price}}</text>
						<text class="money green" v-if="item.status == 1">+{{item.price}}</text>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" :load-text="loadText" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logs:[],
				/* 分页相关 */
				totalPage: "", //数据总页数
				pageNum: 1,
				loadStatus: 'loadmore',
				loadText: {
					loadmore: this.$t('loadmore.tip1'),
					loading: this.$t('loadmore.tip2'),
					nomore: this.$t('loadmore.tip3'),
				},
				statusTxt:[this.$t('wdlogs.txt1'),this.$t('wdlogs.txt2'),this.$t('wdlogs.txt3'),this.$t('wdlogs.txt4'),this.$t('wdlogs.txt5'),this.$t('wdlogs.txt6'),this.$t('wdlogs.txt7'),this.$t('wdlogs.txt8')]
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
			this.getLogs()
		},
		methods:{
			/* 重置分页数据 */
			resetPage() {
				this.pageNum = 1;
				this.loadStatus = 'loadmore';
				this.logs = [];
				this.getLogs()
			},
			getLogs(){
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.$u.api.walletLogs({
					page: this.pageNum,
					web_time: nowTime,
				}).then(res => {
					// console.log(res)
					this.logs = this.logs.concat(res.data);
					this.totalPage = res.last_page;
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
			.create_time{
				font-size: 12px;
			}
			.money{
				font-size: 14px;
				font-weight: 600;
			}
			.red{
				color: #590f7f;
			}
			.green{
				color: #18bc37;
			}
		}
	}
</style>
