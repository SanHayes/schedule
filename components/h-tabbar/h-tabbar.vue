<template>
	<!-- 自定义tabbar -->
	<view class="u-flex u-row-between px-font-12 cus_tabBar">
		<view class="tabbar-item u-font-bold" @click="jumpPage('/pages/tabbar/index/index')">
			<image class="tab-img" src="/static/images/tabbar/home.png" mode=""></image>
			<view class="tab-txt">
				{{$t('index.home')}}
			</view>
		</view>
		<view class="tabbar-item center-tab" @click="jumpPage('/pages/tabbar/begin/begin')">
			<view class="center-big u-flex u-row-center">
				<image class="tab-img" src="/static/images/tabbar/BG-07.png" mode=""></image>
			</view>
			<view class="tab-txt">
				{{$t('index.begin')}}
			</view>
		</view>
		<view class="tabbar-item" @click="jumpPage('/pages/tabbar/history/history')">
			<image class="tab-img" src="/static/images/tabbar/BG-01.png" mode=""></image>
			<view class="tab-txt">
				{{$t('index.order')}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "h-tabbar",
		data() {
			return {

			};
		},
		props: {
			activeIndex: {
				default: 0
			}
		},
		created() {
			uni.hideTabBar();
		},
		methods: {
			jumpPage(url) {
				uni.switchTab({
					url: url
				})
				this.$u.vuex('vuex_index_pop',true);
			},
		},
	}
</script>

<style lang="scss" scoped>
	.cus_tabBar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		// bottom: constant(safe-area-inset-bottom);
		// bottom: env(safe-area-inset-bottom);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, .1);
		z-index: 999;
		background: #242424;
		flex-direction: row;
		width: 100%;
		height: 50px;
		color: #fff;
		font-size: 12px;
	
	.tab-img {
			width: 23px;
			height: 23px;
		}

		.tabbar-item {
			width: 33.33%;
			text-align: center;
		}

		.center-tab {
			position: relative;

			.tab-txt {
				margin-top: 28px;
			}

			.tab-img {
				width: 26px;
				height: 26px;
			}

			.center-big {
				position: absolute;
				background: linear-gradient(#001b39, #002d58);
				width: 65px;
				height: 65px;
				border-radius: 50%;
				left: calc(50% - 32px);
				top: -40px;
			}
		}
	}
</style>
