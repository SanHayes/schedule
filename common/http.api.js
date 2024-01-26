/* 登录 */
let loginUrl = '/login';
/* 注册 */
let registerUrl = '/register';
/* 退出 */
let logoutUrl = '/logout';
/* 首页数据 */
let homeDataUrl = '/getIndex';
/* 用户信息 */
let userInfoUrl = '/getUserInfo';
/* 客服列表 */
let serverListUrl = '/getCustomer';
/* vip列表 */
let vipListUrl = '/getVipList';
/* 购买vip */
let buyVipUrl = '/buyVip';
/* 更改密码 */
let resetPsdUrl = '/changePass';
/* 消息列表 */
let msgListUrl = '/getMesList';
/* 设置消息已读 */
let readMsgUrl = '/setMesRead';
/* 获取银行信息 */
let getBankUrl = '/getCard';
/* 设置银行信息 */
let setBankUrl = '/setCard';
/* 申请提现 */
let applyUrl = '/setWithData';
/* 提现记录 */
let applyLogsUrl = '/getWithList';
/* 钱包记录 */
let walletLogsUrl = '/getWalletList';
/* 创建订单 */
let creatOrderUrl = '/setOrder';
/* 提交订单 */
let subOrderUrl = '/commitOrder';
/* 订单列表 */
let orderListUrl = '/getOrderList';
/* 订单详情 */
let orderInfoUrl = '/getOrderInfo';
/* app滚动列表 */
let scrollListUrl = '/getAppList';
/* 滚动详情 */
let scrollInfoUrl = '/getAppInfo';
/* 注册协议 */
let regAgreeUrl = '/getAgreement';

// 此处第二个参数vm，就是我们在页面使用的this
const install = (Vue, vm) => {
	// 此处使用了传入的params参数，一切自定义即可
	let login = (params = {}) => vm.$u.post(loginUrl, params);
	let register = (params = {}) => vm.$u.post(registerUrl, params);
	let logout = (params = {}) => vm.$u.post(logoutUrl, params);
	let homeData = (params = {}) => vm.$u.post(homeDataUrl, params);
	let userInfo = (params = {}) => vm.$u.post(userInfoUrl, params);
	let serverList = (params = {}) => vm.$u.post(serverListUrl, params);
	let vipList = (params = {}) => vm.$u.post(vipListUrl, params);
	let buyVip = (params = {}) => vm.$u.post(buyVipUrl, params);
	let resetPsd = (params = {}) => vm.$u.post(resetPsdUrl, params);
	let msgList = (params = {}) => vm.$u.post(msgListUrl, params);
	let readMsg = (params = {}) => vm.$u.post(readMsgUrl, params);
	let getBank = (params = {}) => vm.$u.post(getBankUrl, params);
	let setBank = (params = {}) => vm.$u.post(setBankUrl, params);
	let apply = (params = {}) => vm.$u.post(applyUrl, params);
	let applyLogs = (params = {}) => vm.$u.post(applyLogsUrl, params);
	let walletLogs = (params = {}) => vm.$u.post(walletLogsUrl, params);
	let creatOrder = (params = {}) => vm.$u.post(creatOrderUrl, params);
	let subOrder = (params = {}) => vm.$u.post(subOrderUrl, params);
	let orderList = (params = {}) => vm.$u.post(orderListUrl, params);
	let orderInfo = (params = {}) => vm.$u.post(orderInfoUrl, params);
	let scrollList = (params = {}) => vm.$u.post(scrollListUrl, params);
	let scrollInfo = (params = {}) => vm.$u.post(scrollInfoUrl, params);
	let regAgree = (params = {}) => vm.$u.post(regAgreeUrl, params);

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		login,
		register,
		logout,
		homeData,
		userInfo,
		serverList,
		vipList,
		buyVip,
		resetPsd,
		msgList,
		readMsg,
		getBank,
		setBank,
		apply,
		applyLogs,
		walletLogs,
		creatOrder,
		subOrder,
		orderList,
		orderInfo,
		scrollList,
		scrollInfo,
		regAgree
	};
}

export default {
	install
}
