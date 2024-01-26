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
				node:"",
			};
		},
		onShow() {
			this.getAgree()
		},
		methods:{
			getAgree() {
				this.$u.api.regAgree().then(res => {
					this.node = res.data.register_agree;
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
