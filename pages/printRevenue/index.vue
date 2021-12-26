<template>
	<div class="dm ">
		<p-nav title="打印收益" @callback="navInfo = $event" />
		<date-view :show.sync="showDate" :value="timestamp" type="datemonth" format="yyyy年M月" @confirm="timestamp = $event.value"/>
		<div class="profit fl fd-r ai-ctr bg-w" @click="showDate = !showDate">
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
		}" v-if="false">
			<!-- 数据列表 -->
			<!-- TODO: 这里有个bug  如果不用v-if切换的话 scrollview的高度不会自动更新 先这样处理 后续再搞别的办法 -->
			<p-list-view style="height: 100%" :more="l_more" :firstLoad="l_firstLoad" :downRefresh="l_refresh" :nodata="l_nodata" @refresh="$_refresh(requestList, 0, 1)" @pull="$_loadMore(requestList)" v-if="activeIndex">
				<div class="list">
					<div class="item fl ai-ctr fd-r" v-for="(item, i) in l_listData" :key="i">
						<!-- 头像 -->
						<u-image src="https://cdn.uviewui.com/uview/album/1.jpg" width="80rpx" height="80rpx" class="ava" shape="circle"></u-image>
						<!-- 信息 -->
						<div class="userinfo fl-wp jc-sb">
							<span>辰东</span>
							<span :class="{'shopowner': activeIndex,'level2': !activeIndex}">店长</span>
						</div>
						<!-- 右边俩标签 -->
						<span class="price vertical-center">￥0.30</span>
						<span class="detail vertical-center" @click="toDetail(item)">详情</span>
					</div>
				</div>
			</p-list-view>
			<p-list-view style="height: 100%" :more="l_more" :firstLoad="l_firstLoad" :downRefresh="l_refresh" :nodata="l_nodata" @refresh="$_refresh(requestList, 0, 1)" @pull="$_loadMore(requestList)" v-else>
				<div class="list">
					<div class="item fl ai-ctr fd-r" v-for="(item, i) in l_listData" :key="i">
						<!-- 头像 -->
						<u-image src="https://cdn.uviewui.com/uview/album/1.jpg" width="80rpx" height="80rpx" class="ava" shape="circle"></u-image>
						<!-- 信息 -->
						<div class="userinfo fl-wp jc-sb">
							<span>辰东</span>
							<span :class="{'shopowner': activeIndex,'level2': !activeIndex}">店长</span>
						</div>
						<!-- 右边俩标签 -->
						<span class="price vertical-center">￥0.30</span>
						<span class="detail vertical-center" @click="toDetail(item)">详情</span>
					</div>
				</div>
			</p-list-view>
		</div>
	</div>
</template>
<script>
import listViewMixin from '../../mixins/listView'
import dateView from '../..//components/ui/r-date-view'
export default {
	components: {dateView},
	mixins: [ listViewMixin ],
	data() {
		return {
			navInfo: void 0,
			activeIndex: 0,
			showDate: false,
			timestamp: '2021年5月1日',
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
		dateChanged(e) {
			console.log(e);
			this.timestamp = e.value;
		},
		temestampChange(e) {
			console.log(e);
		},
		toDetail(item) {
			console.log(item)
			uni.navigateTo({url: '/pages/home/distributionManager/detail/index'});
		},
		requestList(firstLoad = false, cover = false) {
			console.log('模拟请求数据', firstLoad, cover)
			this.l_firstLoad = firstLoad;
			cover = cover || firstLoad;
			setTimeout(() => {
				this.l_total = 11;
				let res = [1,1,1,1,1,1,1,1,1,1];
				cover ? this.$_setListData(res) : this.$_appendListData(res);
			}, 200);
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
				white-space:nowrap;
			}
			.is-active {
				background: #25A1F9;
				color: white;
			}
		}
	}
	.list {
		.item {
			width: calc(100% - 40rpx);
			position: relative;
			height: 120rpx;
			padding-left: 40rpx;
			// padding: 0 40rpx;
			border-bottom: 1rpx solid #f0f0f0;
			&:nth-last-child(1) {
				border: 0;
			}
			.ava {
				width: 80rpx;
				height: 80rpx;
			}
			.userinfo {
				margin-left: 20rpx;
				height: 80rpx;
				.level2 {
					color: #10D13A !important;
				}
				.shopowner {
					color: #FF8A00 !important;
				}
				span {
					color: #454564;
					&:nth-child(2) {
						font-size: 24rpx;
					}
				}
			}
			.price {
				color: #454564;
				right: 140rpx;
			}
			.detail {
				color: #0066FF;
				right: 40rpx;
			}
		}
	}
}
</style>