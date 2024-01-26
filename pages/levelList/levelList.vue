<template>
	<view class="conent">
		<view class="lists" v-if="levList.length>0">
			<view class="list-item px-m-p-30" v-for="(lev,index) in levList" :key="index">
				<view class="px-p-l-100">
					<view class="top-info">
						<view class="title u-font-bold u-flex u-row-between">
							<view class="u-flex">
								<text class="px-font-16">{{ lev.name }}</text>
								<text class="px-font-12 tag" v-if="userInfo.level_id == lev.id">{{$t('lev.txt2')}}</text>
							</view>
							<!-- <view class="font-main text-underline px-font-13" v-if="lev.id > userInfo.level_id" @click="update(lev)">
								<text>{{$t('lev.txt1')}}</text>
							</view> -->
						</view>
						<!-- <view class="price px-font-13">
							{{lev.price}}
						</view> -->
					</view>
					<view class="desc px-p-t-30">
						<u-parse :html="lev.node"></u-parse>
					</view>
				</view>
				<image class="lev-icon" :src="lev.img" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				levList: [],
				userInfo: {}
			};
		},
		onLoad() {
			this.getUser();
			this.getList();
		},
		methods: {
			update(lev){
				const that = this;
				let tip;
				if(this.vuex_lang == 'en'){
					tip = `The accumulated first Deposit of \n VND ${lev.price} can be \n upgraded to ${lev.name}!`;
				}else if(this.vuex_lang == 'vi-VN'){
					tip = `Số tiền gửi tích lũy đầu tiên của \n VND ${lev.price} có thể được \n nâng cấp lên ${lev.name}!`;
				}else{
					tip = `累積的第一筆存款 \n VND ${lev.price} \n 可以升級到 ${lev.name}！`
				}
				
				uni.showModal({
					title: that.vuex_config.app_name,
					content: tip,
					confirmText:that.$t('common.confirm'),
					confirmColor:'#52006B',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.buyVipHandle(lev.id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/* 购买vip */
			buyVipHandle(level_id){
				this.$u.api.buyVip({level_id}).then(res => {
					// console.log(res)
					this.$u.toast(res.msg);
				})
			},
			/* 获取用户信息 */
			getUser() {
				this.$u.api.userInfo().then(res => {
					this.userInfo = res.data;
				})
			},
			getList() {
				this.$u.api.vipList().then(res => {
					let list = res.data;
					list.map(item=>{
							// let str1 = `<p><b>${item.order_rate_txt} profit per deal<br>
							// Maximum ${item.order_num} applications per set of data improvement<br>
							// Maximum of ${item.ring} sets of improvement tasks per day</b></p>`;
							let str1 = `<p><b>${item.order_rate_txt} profit per deal<br>
							Maximum ${item.order_num} applications per set of data improvement<br>
							Activate with an SGD$ ${item.ring} </b></p>`;
							let str2 = `<p><b>Lợi nhuận ${item.order_rate_txt} trên mỗi giao dịch<br>
							Có tối đa ${item.order_num} ứng dụng trên mỗi bộ cải tiến dữ liệu<br>
							Tối đa ${item.ring} bộ nhiệm vụ cải tiến mỗi ngày</b></p>`;
							
							// let str3 = `<p><b>每筆交易 ${item.order_rate_txt} 利潤<br>
							// 	每組數據改進最多 ${item.order_num} 個應用<br>
							// 	每天最多 ${item.ring} 組改進任務</b></p>`;
							let str3 = `<p><b>每筆交易 ${item.order_rate_txt} 利潤<br>
								每組數據改進最多 ${item.order_num} 個應用<br>
								重置激活SGD$ ${item.ring} </b></p>`;
						if(this.vuex_lang=='en'){
							item.node = str1;
						}else if(this.vuex_lang=='vi-VN'){
							item.node = str2;
						}else{
							item.node = str3
						}
					})
					this.levList = list;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.conent {
		.lists {
			padding: 15px 15px 0;

			.list-item {
				padding: 20px 15px;
				border-radius: 10px;
				position: relative;
				margin-bottom: 15px;
				background-color: #fff;

				.top-info {
					.title {
						color: #4A0018;
					}

					.price {
						color: #50657a;
						margin: 10px 0;
						font-weight: 600;
					}

					.tag {
						color: #999;
						border: 1px solid #999;
						padding: 2px 8px;
						border-radius: 20px;
						margin-left: 10px;
					}
				}

				.desc {
					color: #666;
					font-size: 13px;
				}

				.lev-icon {
					position: absolute;
					width: 50px;
					height: 50px;
					position: absolute;
					top: 15px;
					left: 10px;
			}
				}
		}
	}
</style>
