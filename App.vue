<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let lan = uni.getLocale();
			if(lan == 'en' || lan == 'en'){
				uni.setLocale('en');
				this.$u.vuex('vuex_lang','en')
			}else{
				this.$u.vuex('vuex_lang',lan)
			}
			if(this.vuex_authorization == ""){
				uni.reLaunch({
					url:'/pages/userPages/login/login',
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	page{
		background: transparent;
		background-color: #1e2d4b !important;
	}
	
	/deep/ uni-modal{
		z-index:999999 !important;
	}
	/deep/ .uni-modal .uni-modal__bd {
		word-break: normal!important;
	}
	/deep/ .uni-modal .uni-modal__hd{
		padding: 16px 26px 5px !important;
	}
</style>
<style lang="scss">
	@import "uview-ui/index.scss";
</style>