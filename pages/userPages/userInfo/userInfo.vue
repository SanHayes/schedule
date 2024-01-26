<template>
	<view class="content">
		<view class="lists">
			<view class="list-item u-flex u-row-between">
				<view class="label">
					{{$t('uinfo.txt18')}}
				</view>
				<view class="u-flex">
					<image class="headimg" src="/static/images/common/headimg.jpg" mode=""></image>
					<u-icon name="arrow-right" color="#02574F" size="28"></u-icon>
				</view>
			</view>
			<view class="list-item u-flex u-row-between">
				<view class="label">
					{{$t('uinfo.txt19')}}
				</view>
				<view class="u-flex">
					<text class="desc">{{userInfo.username}}</text>
				</view>
			</view>
			<!-- <view class="list-item u-flex u-row-between" @click="selGender">
				<view class="label">
					Gender
				</view>
				<view class="u-flex">
					<text class="desc">Female</text>
					<u-icon name="arrow-right" color="#02574F" size="28"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="lists">
			<view class="list-item u-flex u-row-between" @click="jumpPage('/pages/payPassword/payPassword')">
				<view class="label">
					{{$t('uinfo.txt20')}}
				</view>
				<view class="u-flex">
					<u-icon name="arrow-right" color="#02574F" size="28"></u-icon>
				</view>
			</view>
			<view class="list-item u-flex u-row-between" @click="jumpPage('/pages/password/password')">
				<view class="label">
					{{$t('uinfo.txt21')}}
				</view>
				<view class="u-flex">
					<u-icon name="arrow-right" color="#02574F" size="28"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{}
			};
		},
		onShow() {
			this.getUser()
		},
		methods:{
			/* 获取用户信息 */
			getUser(){
				this.$u.api.userInfo().then(res => {
					// console.log(res)
					this.userInfo = res.data;
				})
			},
			selGender(){
				uni.showActionSheet({
					itemList: ['Female', 'Male'],
					success: function (res) {
						if(res.tapIndex==0){
						}else{
						}
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			jumpPage(url){
				this.$u.route(url);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 15px;
		.lists{
			margin: 0 15px 15px 15px;
			border-radius: 10px;
			background-color: #fff;
			.list-item{
				padding: 15px;
				border-bottom: 1px solid #eee;
				&:last-child{
					border: none;
				}
				.label{
					font-size: 14px;
					color: #416cc7;
					font-weight: 600;
				}
				.headimg{
					height: 36px;
					width: 36px;
					margin-right: 5px;
					border-radius: 18px;
				}
				.desc{
					font-size: 14px;
					    color: #322c43;
					    margin-right: 5px;
					    font-weight: 600;
				}
			}
		}
	}
</style>
