<template>
	<div class="dm ">
		<p-nav title="分销管理" @callback="navInfo = $event" />
		<div class="profit fl fd-r ai-ctr bg-w">
			您的收益分成：<span class="mgr-l">¥0.20/页</span>
		</div>
		<div class="head-menu fl jc-sb fd-r ai-ctr">
			您的下级分销收益分成
			<div class="btns fl fd-r">
				<!-- 这里判断loading 避免页面混乱 -->
				<button :class="{ 'is-active': !activeIndex }" @tap="!l_isLoading ? activeIndex = 0 : void 0">只看店长</button>
				<button :class="{ 'is-active':  activeIndex }" @tap="!l_isLoading ? activeIndex = 1 : void 0">只看代理商</button>
			</div>
		</div>
		<div class="list" :style="{
			height: `calc(100vh - ${navInfo.height||0}px - 268rpx)`,
			background: '#fff'
		}">
			<!-- 数据列表 -->
			<p-list-view style="height: 100%" :more="l_more" :firstLoad="l_firstLoad" :downRefresh="true" :nodata="l_nodata">
				<div class="list">
					<div class="item">
						
					</div>
				</div>
			</p-list-view>
		</div>
	</div>
</template>
<script>
import listViewMixin from '../../../mixins/listView'
export default {
	mixins: [ listViewMixin ],
	data() {
		return {
			navInfo: void 0,
			activeIndex: 0,
		}
	},
	watch: {
		activeIndex() {
			this.requestList(1)
		},
	},
	created() {
		this.requestList(1);
	},
	methods: {
		requestList(firstLoad = false) {
			this.l_firstLoad = firstLoad;
			setTimeout(() => {
				this.l_firstLoad = false;
				this.$_setListData([]);
			}, 2000);
		}
	},
}
</script>
<style lang="scss" scoped>
.dm {
	.profit {
		height: 148rpx;
		padding: 0 40rpx;
		span {
			font-size: 48rpx;
			color: #FF8A00;
		}
	}
	.head-menu {
		padding: 0 40rpx;
		color: #454564;
		font-size: 24rpx;
		height: 120rpx;
		.btns {
			button {
				width: 180rpx;
				height: 60rpx;
				border-radius: 30rpx;
				font-size: 24rpx;
			}
			.is-active {
				background: #25A1F9;
				color: white;
			}
		}
	}
	.list {
		.item {
			height: 120rpx;
			padding: 0 40rpx;
		
		}
	}
}
</style>