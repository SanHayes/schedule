<template>
	<view class="content u-flex-col">
		<!-- 自定义头部 -->
		<h-header :logo="homeData.config && homeData.config.app_logo"></h-header>
		<view class="px-p-t-20 px-p-b-20">
			<u-notice-bar type="none" :customIcon="true" customUrl="/static/images/home/message.png"
				:volume-icon="false" color="#fff" mode="horizontal" :list="mesList"></u-notice-bar>
		</view>
		<view class="welcome px-p-30">
			<view class="px-font-24 u-font-bold">
				{{$t('home.txt1')}}
			</view>
			<view class="user-info u-flex px-m-t-20 u-col-top">
				<view class="px-font-20">
					{{userInfo.username}}
				</view>
				<image class="level-icon px-m-l-20" :src="userInfo.level && userInfo.level.img" mode=""></image>
			</view>
			<view class="u-flex server" @click="openServe">
				<image class="level-icon px-m-l-20" src="/static/images/home/BG-02.png" mode=""></image>
				<view class="px-font-12 px-p-l-10">
					{{$t('home.txt2')}}
				</view>
			</view>
		</view>
		<!-- 金刚区 -->
		<view class="vajra-box px-p-30 u-flex u-row-between u-flex-wrap u-col-top">
			<view class="va-item" :class="{'px-m-t-60' : index > 3}" v-for="(item,index) in navList" :key="index" @click="jumpMenu(index)">
				<image :src="item.icon" mode=""></image>
				<view class="px-font-14">
					{{item.text}}
				</view>
			</view>
		</view>
		<!-- 等级 -->
		<view class="width-690 px-p-30 px-m-t-30 flex-self-center level-box">
			<view class="u-flex u-font-bold u-row-between">
				<view class="px-font-16">
					{{$t('home.txt11')}}
				</view>
				<view class="px-font-14 font-main u-flex" @click="goLevelDesc">
					<text class="px-m-r-10">{{$t('home.txt12')}}</text>
					<u-icon name="arrow-right" color="#00B6AF" size="28"></u-icon>
				</view>
			</view>
			<view class="u-flex u-row-between px-m-t-20 level-img">
				<block v-for="(item,index) in homeData.vip_list" :key="index">
					<image class="px-p-10" :class="{'border-main-color':currentIndex == index}" :src="item.img" mode="" @click="switchLev(index)"></image>
				</block>
			</view>
			<view class="px-m-t-20 level-content">
				<view class="u-font-bold title px-font-16">
					{{currentLev.name}}
				</view>
				<view class="px-m-t-10 px-font-16">
					<rich-text :nodes="currentLev.node"></rich-text>
				</view>
			</view>
		</view>
		<view class="fotter_box px-m-b-80">
			<view class="bottom-text px-font-14">
				{{$t('common.copyright')}}
			</view>
		</view>
		<!-- 内容弹窗 -->
		<u-popup mode="center" border-radius="12" v-model="showContentPop">
			<view class="pop-box">
				<view class="pop-title px-m-l-30 u-font-bold px-m-b-20 px-font-16">{{vuex_config.app_name}}</view>
				<view class="pop-type px-font-20 u-font-bold px-m-l-30">{{typTitle}}</view>
				<scroll-view class="height-450 width-630 px-p-30" scroll-y="true">
					<u-parse :html="popRichtxt"></u-parse>
				</scroll-view>
			</view>
		</u-popup>
		<!-- 自定义弹窗 -->
		<view class="mask-pop" v-if="showPop">
			<view class="pop-cont" @click="laterPage">
				<image class="img" :src="homeData.config && homeData.config.pop" mode=""></image>
				<image class="close" src="/static/images/home/close_green.png" mode="" @click.stop="closePop"></image>
			</view>
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
				/* 自定义弹窗展示标识 */
				showPop: false,
				mesList: [],
				messagetxt:"",
				nodes:"Lợi nhuận 0,25% trên mỗi giao dịch",
				navList: [{
					icon: "/static/images/home/BG-07.png",
					text: this.$t('home.txt3')
				}, {
					icon: "/static/images/home/BG-012.png",
					text: this.$t('home.txt4')
				}, {
					icon: "/static/images/home/BG-011.png",
					text: this.$t('home.txt5')
				}, {
					icon: "/static/images/home/BG-018.png",
					text: this.$t('home.txt6')
				}, {
					icon: "/static/images/home/BG-017.png",
					text: this.$t('home.txt7')
				}, {
					icon: "/static/images/home/BG-015.png",
					text: this.$t('home.txt8')
				}, {
					icon: "/static/images/home/BG-016.png",
					text: this.$t('home.txt9')
				}, {
					icon: "/static/images/home/BG-019.png",
					text: this.$t('home.txt10')
				}],
				/* 富文本弹窗相关 */
				showContentPop:false,
				popRichtxt:"",
				typTitle:"",
				/* 用户信息 */
				userInfo:{},
				/* 首页数据 */
				homeData:{},
				currentLev:{},
				currentIndex:null
			}
		},
		onShow() {
			this.getHome();
		},
		onHide() {
			this.$u.vuex('vuex_index_pop',false);
		},
		methods: {
			laterPage(){
				let lates;
				lates = encodeURIComponent(JSON.stringify(this.homeData.config.event_list))
				this.$u.route('/pages/richText/lates',{lates})
			},
			switchLev(i){
				this.currentIndex = i;
				this.homeData.vip_list.map((item,index)=>{
					if(index == i){
						this.currentLev = item
					}
				})
			},
			
			/* 获取首页数据 */
			async getHome(){
				let user = await this.$u.api.userInfo();
				this.userInfo = user.data;
				this.$u.api.homeData().then(res => {
					let configObj = {
						app_name:res.data.config.app_name,
						operation_time:res.data.config.operation_time,
						withdraw_time:res.data.config.operation_time,
						app_logo: res.data.config.app_logo
					}
					this.$u.vuex('vuex_config',configObj);
					this.mesList = [res.data.config.tips];
					this.messagetxt = res.data.config.tips;
					
					let levList = res.data.vip_list;
					// levList.map((item,index)=>{
					// 		let str1 = `<p><b>${item.order_rate_txt} profit per deal<br>
					// 		Maximum ${item.order_num} applications per set of data improvement<br>
					// 		Maximum of ${item.ring} sets of improvement tasks per day</b></p>`;
					// 		let str2 = `<p><b>Lợi nhuận ${item.order_rate_txt} trên mỗi giao dịch<br>
					// 		Có tối đa ${item.order_num} ứng dụng trên mỗi bộ cải tiến dữ liệu<br>
					// 		Tối đa ${item.ring} bộ nhiệm vụ cải tiến mỗi ngày</b></p>`;
					// 		let str3 = `<p><b>每筆交易 ${item.order_rate_txt} 利潤<br>
					// 		每組數據改進最多 ${item.order_num} 個應用<br>
					// 		每天最多 ${item.ring} 組改進任務</b></p>`;
					levList.map((item,index)=>{
							let str1 = `<p><b>${item.order_rate_txt} profit per deal<br>
							Maximum ${item.order_num} applications per set of data improvement<br>
							Activate with an SGD$ ${item.ring} </b></p>`;
							let str2 = `<p><b>Lợi nhuận ${item.order_rate_txt} trên mỗi giao dịch<br>
							Có tối đa ${item.order_num} ứng dụng trên mỗi bộ cải tiến dữ liệu<br>
							Tối đa ${item.ring} bộ nhiệm vụ cải tiến mỗi ngày</b></p>`;
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
						if(this.userInfo.level_id == item.id){
							this.currentLev = item;
							this.currentIndex = index;
						}
					})
					res.data.vip_list = levList;
					this.homeData = res.data;
					if(this.vuex_index_pop){
						this.showPop = true;
					}
				})
			},
			/* 打开客服 */
			async openServe() {
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
			},
			goLevelDesc(){
				this.$u.route('/pages/levelList/levelList')
			},
			closePop() {
				this.showPop = false;
			},
			jumpMenu(i){
				if(i==0){
					this.$u.route({
						type:'switchTab',
						url: '/pages/tabbar/begin/begin',
					})
				}
				if(i==1){
					let cert;
					cert = encodeURIComponent(JSON.stringify(this.homeData.config.cert_list))
					this.$u.route('/pages/richText/richText',{cert})
				}
				if(i==2){
					this.$u.route('/pages/withdraw/withdraw')
				}
				if(i==3){
					this.$u.route('/pages/deposit/deposit')
				}
				if(i>=4){
					this.typTitle = this.navList[i].text;
					if(i==4){
						this.popRichtxt = this.homeData.config.rule;
					}
					if(i==5){
						let str = "",imgList=[];
						imgList = this.homeData.config.event_list;
						imgList.map(item=>{
							str += `<img src="${item}" style="max-width:100%;border:0">`
						})
						this.popRichtxt = str;
					}
					if(i==6){
						this.popRichtxt = this.homeData.config.intro;
					}
					if(i==7){
						this.popRichtxt = this.homeData.config.about_us;
					}
					this.showContentPop = true;
				}
			}
		}
	}
</script>
<style>
	page{
		/* background-image: url('/static/images/common/BG-020.png');
		background-size: 100% auto;
		background-repeat: no-repeat; */
		color: #fff;
		font-family: PingFangSC-Medium;
		background-image: url('/static/images/common/BG-020.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		min-height: 100vh;
		background-attachment: fixed;
	}
</style>
<style lang="scss" scoped>
	.content {
		color: #fff;
		height: 100%;
	}

	.mes-icon {
		width: 20px;
		height: 20px;
	}

	.welcome {
		position: relative;

		.level-icon {
			width: 26px;
			height: 26px;
		}

		.server {
			position: absolute;
			top: 15px;
			right: 25px;
		}
	}

	.vajra-box {
		.va-item {
			width: 23.5%;
			margin-right: 2%;
			text-align: center;

			image {
				width: 30px;
				height: 30px;
				background-color: #fff;
				border-radius: 50%;
				padding: 15px;
			}
			&:nth-child(4n){
				margin-right: 0;
			}
		}
	}
	
	.level-box{
		color: #333;
		background-color: #fff;
		border-radius: 12px;
		.level-img{
			image{
				width: 50px;
				height: 50px;
				border-radius: 12px;
			}
			.border-main-color{
				border: 2px solid #ffbeae;
			}
		}
		.level-content{
			.title{
				color: #52006B;
			}
		}
	}

	.pop-box{
		background-color: #1e2d4b;
		color: #9f9f9f;
		width: 345px;
		// box-shadow: 0 4px 4px 4px rgb(255 217 217 / 15%);
		padding-top: 30px;
		.pop-title{
			color:#85B3FF;
		}
		.pop-type{
			color:#fff
		}
	}
	
	.mask-pop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		color: #fff;
		background: rgba(0, 0, 0, .4);
		left: 0;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99999;

		.pop-cont {
			max-width: 80vw;
			position: relative;

			.img {
				height: 400px;
				max-width: 80vw;
				border-radius: 10px;
			}

			.close {
				position: absolute !important;
				top: -10px;
				right: -10px;
				width: 26px;
				height: 26px;
			}
		}
	}
	@media screen and (min-width: 376px) and (max-width: 800px) {
		.content {
			zoom: 1.05 !important;
		}
	
	}
</style>
