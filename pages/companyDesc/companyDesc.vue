<template>
	<view class="content">
		<view class="text_rich">
			<u-parse :html="node"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				node:'',
				aid:""
			};
		},
		onLoad(e) {
			this.aid = e.id;
		},
		onShow() {
			this.getDesc()
		},
		methods:{
			getDesc(){
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.$u.api.scrollInfo({
					web_time:nowTime,
					id:this.aid
				}).then(res => {
					this.node = res.data.desc;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.text_rich{
	padding: 15px;
	font-size: 14px;
	color: #fff;
}
</style>
