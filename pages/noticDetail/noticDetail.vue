<template>
	<view class="content">
		<view class="image-box">
			<image src="/static/images/common/BG-020.png" mode="aspectFill"></image>
		</view>
		<view class="content-txt">
			<view class="desc">
				{{info.content}}
			</view>
			<view class="time">
				{{info.create_time}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			};
		},
		onLoad(e) {
			this.info = JSON.parse(decodeURIComponent(e.msg));
			// console.log(this.info)
			this.reader()
		},
		methods:{
			reader(){
				this.$u.api.readMsg({mes_id:this.info.id}).then(res => {
					// console.log(res)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.image-box {
		width: 85%;
		margin: 0 auto;

		image {
			width: 100%;
			height: 150px;
			border-radius: 10px;
			margin: 15px auto;
		}
	}
	.content-txt{
		color: #FFFFFF;
		width: 85%;
		margin: 0 auto;
		.title{
			font-size: 14px;
			font-weight: bold;
			margin-bottom: 10px;
		}
		.desc{
			font-size: 16px;
		}
		.time{
			margin-top: 30px;
			font-size: 16px;
		}
	}
</style>
