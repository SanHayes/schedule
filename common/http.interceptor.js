import md5Libs from "uview-ui/libs/function/md5";
/* 加密token */
function encryToken(){
	let time = Date.parse(new Date())/1000;
	let code = time + '@62b7c5572a99ee1@' + time;
	return md5Libs.md5(code)
}

/* 当前语言 */
function getLan(){
	let lan = uni.getLocale(),
		curlan = "";
	if(lan == 'zh-Hans' || lan == 'zh-Hant'){
		curlan = "zh";
	}else if(lan == 'vi-VN'){
		curlan = "vi";
	}else{
		curlan = lan;
	}
	return curlan
}

const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://27.102.115.100/api/index',
		loadingText: 'Loading',//vm.$t('loadmore.tip2')
		loadingTime: 100,
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		// originalData: true, 
		// 设置自定义头部content-type
		// header: {
		// 	'Content-Type': 'application/json;charset=UTF-8'
		// }
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		if(config.url != '/login' && config.url != '/register'){
			config.header['authorization'] = vm.vuex_authorization;
		}
		config.header['s-time'] = Date.parse(new Date())/1000;
		config.header['s-token'] = encryToken();
		config.header['schedule-lang'] = getLan();
		
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		if(res.success) {
			// 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
			let initData;
			if(res.last_page){
				initData = {
					data:res.data,
					last_page:res.last_page,
					total:res.total,
					msg:res.msg
				}
			}else{
				initData = {
					data:res.data,
					msg:res.msg
				}
			}
			return initData;  
		} else {
			if(res.logout){
				vm.$u.toast(res.msg);
				vm.$u.vuex('vuex_authorization','');
				setTimeout(() => {
					vm.$u.route({
						type:'reLaunch',
						url:'/pages/userPages/login/login',
					})
				}, 1500)
			}else{
				uni.showModal({
					title: vm.vuex_config.app_name,
					content: res.msg,
					showCancel:false,
					confirmColor: '#00554D',
					success: function(res) {
					// 	if (res.confirm) {
					// 		that.doExit()
					// 		console.log('用户点击确定');
					// 	} else if (res.cancel) {
					// 		console.log('用户点击取消');
					// 	}
					}
				});
			}
			return false;
		}
	}
}

export default {
	install
}