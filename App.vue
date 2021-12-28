<script>
export default {
	onLaunch: function() {
	},
	onShow: function() {
		this.setViewData();
	},
	onHide: function() {
		
	},
	data() {
		return {
			// 公共数据
			globalData: {
				navHeight: 0,
				customBar: 0,
				statusBar: 0,
			},
		}
	},
	methods: {
		setViewData() {
			let that = this;
			uni.getSystemInfo({
			  	success:function(e){
				    that.globalData.statusBar = e.statusBarHeight
				    // #ifndef MP
				    if(e.platform == 'android') {
				        that.globalData.customBar = e.statusBarHeight + 50
				    }else {
				        that.globalData.customBar = e.statusBarHeight + 45
				    }
				    // #endif
				    // #ifdef MP-WEIXIN
				    //获取胶囊按钮的布局位置信息，坐标信息以屏幕左上角为原点
				    let custom = uni.getMenuButtonBoundingClientRect()   
				    //导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度。
				    that.globalData.customBar = custom.bottom + custom.top - e.statusBarHeight
				    // #endif
				    // #ifdef MP-ALIPAY
				    that.globalData.customBar = e.statusBarHeight + e.titleBarHeight
				    // #endif
					// 使用 uview 时 默认导航栏高度
					that.globalData.navHeight = that.globalData.statusBar + 44;
			  	}
			})
		},
	},
}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "common/css/uView.scss";
	@import "common/css/common.scss";
	
</style>
