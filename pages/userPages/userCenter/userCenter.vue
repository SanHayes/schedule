<template>
	<view class="content px-p-30">
		<view class="m-0-center width-690 px-m-t-84 info-box px-p-30">
			<image class="avatar" src="/static/images/common/headimg.jpg" mode=""></image>
			<view class="user-info u-flex u-col-top u-row-center">
				<view class="px-font-16 u-font-bold">
					{{userInfo.username}}
				</view>
				<image class="level-icon px-m-l-10" :src="userInfo.level && userInfo.level.img" mode=""></image>
			</view>
			<view class="px-m-t-10 u-font-bold px-font-12 font-main u-text-center" @click="copyTxt(userInfo.invite_code)">
				{{$t('uinfo.txt1')}}：{{userInfo.invite_code}}
			</view>
			<view class="star-box u-flex u-row-center u-m-t-20" v-if="userInfo.sign_count>0">
				<u-rate :current="userInfo.sign_count" :count="userInfo.sign_count" active-color="#FFD700" :disabled="true"></u-rate>
			</view>
			<view class="u-flex u-row-center rep-box">
				<view class="px-m-r-10 px-font-12 u-text-center font-main" style="flex-shrink: 0;">
					{{$t('uinfo.txt2')}}:
				</view>
				<view class="uslider " style="word-break: break-all;">
					<view class="uslider2" :style="'width: ' + userInfo.credit_score + '%'">
						<view class="usliderBut">{{userInfo.credit_score}}</view>
					</view>
				</view>
			</view>
			<view class="u-flex u-row-around px-font-14 px-m-t-20 u-col-top">
				<view class="u-text-center width-220">
					<view class="u-font-bold px-font-12 pro-num">{{userInfo.today_profit}} SGD</view>
					<view class="px-m-t-10 px-font-14 pro-txt">{{$t('uinfo.txt3')}}</view>
				</view>
				<u-line color="#D6D7D9" direction="col" length="80" />
				<view class="u-text-center width-220">
					<view class="u-font-bold px-font-12 pro-num">{{userInfo.balance}} SGD</view>
					<view class="px-m-t-10 px-font-14 pro-txt">{{$t('uinfo.txt4')}}</view>
				</view>
			</view>
		</view>
		<view class="m-0-center width-690 px-m-t-40 px-p-30 user-list">
			<view class="list-item u-flex u-row-between" v-for="(item,index) in menuList" :key="index"
				@click="jumpPage(item.url)">
				<view class="u-flex menu-left px-font-14">
					<image :src="item.icon" mode=""></image>
					<text>{{ item.txt }}</text>
				</view>
				<u-icon name="arrow-right" color="#4747DF" size="32"></u-icon>
			</view>
			<view class="exit-btn px-p-20 u-flex u-row-center" @click="exitHandle">
				{{$t('uinfo.txt5')}}
			</view>
		</view>
		<view class="fotter_box">
			<view class="bottom-text px-font-14">
				{{$t('common.copyright')}}
			</view>
		</view>
		<!-- 密码弹窗 -->
		<u-popup mode="bottom" v-model="showPop">
			<view class="pop-box">
				<view class="header u-flex u-row-between">
					<text>{{$t('uinfo.txt6')}}</text>
					<image class="close" src="/static/images/home/close.png" mode="" @click="closePop"></image>
				</view>
				<view class="input_item px-m-t-15 u-flex">
					<view class="label">
						{{$t('uinfo.txt7')}}
					</view>
					<u-input class="c-input" input-align="right" :clearable="false" :placeholder="$t('common.plc')"
						v-model="payPass" type="password" :border="false" :password-icon="true" />
				</view>
				<view class="btn" @click="compareKey">
					{{$t('uinfo.txt8')}}
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 弹窗标识 */
				showPop: false,
				/* 菜单列表 */
				menuList: [{
					icon: "/static/images/home/BG-018.png",
					txt: this.$t('uinfo.txt11'),
					url: "/pages/deposit/deposit"
				}, {
					icon: "/static/images/home/BG-011.png",
					txt: this.$t('uinfo.txt12'),
					url: "/pages/withdraw/withdraw"
				}, {
					icon: "/static/images/home/BG-09.png",
					txt: this.$t('uinfo.txt13'),
					url: "/pages/walletLogs/walletLogs"
				}, {
					icon: "/static/images/home/BG-08.png",
					txt: this.$t('uinfo.txt14'),
					url: "/pages/userPages/userInfo/userInfo"
				}, {
					icon: "/static/images/home/BG-013.png",
					txt: this.$t('uinfo.txt15'),
					url: "psd"
				}, {
					icon: "/static/images/home/BG-02.png",
					txt: this.$t('uinfo.txt16'),
					url: "serve"
				}, {
					icon: "/static/images/home/BG-010.png",
					txt: this.$t('uinfo.txt17'),
					url: "/pages/noticList/noticList"
				}],
				payPass: "",
				/* 用户信息 */
				userInfo: {}
			};
		},
		onShow() {
			this.getUser()
		},
		methods: {
			copyTxt(txt){
				uni.setClipboardData({
					data: txt,
					success: function () {
						console.log('success');
					}
				});
			},
			/* 对比支付密码 */
			compareKey() {
				if (this.payPass == '') {
					this.$u.toast(this.$t('password.tip1'))
					return
				}
				if (this.payPass != this.userInfo.deal_pass) {
					this.$u.toast(this.$t('password.tip2'));
					return
				}
				this.payPass = '';
				this.closePop();
				this.$u.route('/pages/bindAccount/bindAccount')
			},
			/* 获取用户信息 */
			getUser() {
				this.$u.api.userInfo().then(res => {
					// console.log(res)
					this.userInfo = res.data;
				})
			},
			/* 跳转 */
			jumpPage(url) {
				if (url == 'psd') {
					this.showPop = true;
				} else if (url == 'serve') {
					this.openServe()
				} else {
					this.$u.route(url);
				}
			},
			/* 打开客服 */
			async openServe() {
				let {
					data
				} = await this.$u.api.serverList();
				let action = data.map(item => item.name);
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
			/* 退出modal */
			exitHandle() {
				const that = this;
				uni.showModal({
					title: that.vuex_config.app_name,
					content: that.$t('uinfo.txt9'),
					confirmText: that.$t('uinfo.txt10'),
					confirmColor: '#00554D',
					success: function(res) {
						if (res.confirm) {
							that.doExit()
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/* 退出登录 */
			doExit() {
				this.$u.api.logout().then(res => {
					this.$u.toast(res.msg);
					setTimeout(() => {
						this.$u.route({
							type: 'reLaunch',
							url: '/pages/userPages/login/login',
						})
					}, 1500)
				})
			},
			/* 关闭密码弹窗 */
			closePop() {
				this.showPop = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		color: #fff;
		height: 100%;
		background-image: url('/static/images/common/BG-020.png');
		background-size: 100% auto;
		background-repeat: no-repeat;

		.info-box {
			position: relative;
			color: #333;
			border-radius: 12px;
			background-color: #fff;

			.avatar {
				width: 65px;
				height: 65px;
				border-radius: 50%;
				border: 1px solid #fff;
				position: absolute;
				top: -33px;
				left: calc(50% - 32px);
			}

			.user-info {
				margin-top: 25px;

				.level-icon {
					width: 20px;
					height: 20px;
				}
			}

			.rep-box {
				width: 80%;
				margin: 0 auto;
				padding: 10px;
				.uslider {
				    width: 100%;
				    height: 5px;
				    background-color: #dcdcdc;
				    border-radius: 15px;
					.uslider2 {
					    position: relative;
					    height: 5px;
					    background-color: #ffab2a;
					    border-radius: 15px;
					}
					.usliderBut {
					    width: 40px;
					    height: 20px;
					    text-align: center;
					    line-height: 20px;
					    border-radius: 30px;
					    background-color: #ffab2a;
					    position: absolute;
					    right: -53px;
					    top: 50%;
					    color: #fff;
					    font-size: 12px;
					    -webkit-transform: translate(-50%,-50%);
					    transform: translate(-50%,-50%);
					}
				}
			}

			.pro-txt {
				color: #3B3B3B;
			}
		}

		.user-list {
			background-color: #fff;
			border-radius: 8px;

			.list-item {
				color: #333;
				padding: 12px 0;
				border-bottom: 1rpx solid #E9E9E9;

				&:first-child {
					padding-top: 5px;
				}

				.menu-left {
					image {
						margin-right: 15px;
						width: 26px;
						height: 26px;
					}
				}
			}

			.exit-btn {
				margin-top: 15px;
				color: #F46B6B;
				font-size: 15px;
				text-align: center;
				font-weight: 700;
			}
		}

		.pop-box {
			background-color: #fff;
			padding: 15px;
			border-radius: 15px 15px 0 0;
			height: 40vh;

			.header {
				font-size: 17px;
				color: #333;

				.close {
					width: 16px;
					height: 16px;
				}
			}

			.input_item {
				color: #333;
				font-size: 15px;
				margin-bottom: 20px;
				margin-top: 15px;
				background-color: #f1f1f1;
				border-radius: 10px;
				height: 46px;
				line-height: 46px;
				padding: 0 10px 0 20px;

				.c-input {
					/deep/ .u-input__input {
						height: 46px;
						line-height: 46px;
						font-size: 16px;
					}
				}
			}

			.btn {
				width: 100%;
				background-color: #416cc7;
				color: #fff;
				text-align: center;
				height: 46px;
				line-height: 46px;
				border-radius: 25px;
				font-size: 15px;
				margin-top: 20px;
			}
		}
	}
</style>
