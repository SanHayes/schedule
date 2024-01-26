<template>
	<view class="content">
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:""
			}
		},
		onLoad(e) {
			let img = JSON.parse(decodeURIComponent(e.lates));
			let str = "";
			img.map(item=>{
				str += `<img src="${item}" style="max-width:100%;border:0">`
			})
			this.content = str;
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.content{
	color: #fff;
	padding: 15px;
	font-size: 14px;
}
</style>
