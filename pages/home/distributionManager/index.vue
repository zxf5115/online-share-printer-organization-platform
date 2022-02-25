<template>
	<div class="dm "  @touchmove.stop.prevent @catchtouchmove="()=>{}">
		<p-nav title="分销管理" @callback="navInfo = $event" />
		<div class="profit fl fd-r ai-ctr bg-w">
			您的收益分成：<span class="mgr-l">¥0.20/页</span>
		</div>
		<div class="head-menu fl jc-sb fd-r ai-ctr">
			您的下级分销收益分成
			<div class="btns fl fd-r">
				<!-- 这里判断loading 避免页面混乱 -->
				<button :class="{ 'is-active':  activeIndex == 2 }" @tap="!l_isLoading ? activeIndex = 2 : void 0">只看店长</button>
				<button :class="{ 'is-active':  activeIndex == 3 }" @tap="!l_isLoading ? activeIndex = 3 : void 0">只看代理商</button>
			</div>
		</div>
		<div class="list" :style="{
			height: `calc(100vh - ${navInfo.height||0}px - 268rpx)`,
			background: '#fff'
		}">
			<template v-if="hasPower">
			<!-- 数据列表 -->
				<p-list-view style="height: 100%" :more="l_more" :firstLoad="l_firstLoad" :downRefresh="l_refresh" :nodata="l_nodata" @refresh="$_refresh(requestList, 0, 1)" @pull="$_loadMore(requestList)" :scrollTop="scrollTop">
					<template v-slot:list>
						<div class="list">
							<div class="item fl ai-ctr fd-r" v-for="(item, i) in l_listData" :key="i">
								<!-- 头像 -->
								<image :src="item.avatar" width="80rpx" height="80rpx" class="ava" shape="circle"></image>
								<!-- 信息 -->
								<div class="userinfo fl-wp jc-sb">
									<span>{{item.nickname}}</span>
									<span :class="{'shopowner': activeIndex == 2,'level2': activeIndex == 3}">{{item.level.text}}</span>
								</div>
								<!-- 右边俩标签 -->
								<span class="price vertical-center">￥{{item.asset.proportion}}</span>
								<span class="detail vertical-center" @click="toDetail(item)">详情</span>
							</div>
						</div>
					</template>
				</p-list-view>
			</template>
			<template v-else>
				<div class="power-toast">
					<p>{{powerToast}}</p>
					<p>请联系：13488697701</p>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
import listViewMixin from '../../../mixins/listView'
import { mapGetters } from 'vuex'
export default {
	mixins: [ listViewMixin ],
	data() {
		return {
			navInfo: void 0,
			activeIndex: 3,
			scrollTop: '',
		}
	},
	watch: {
		activeIndex() {
			this.requestList(true)
		},
	},
	created() {
		this.requestList(true);
	},
	computed: {
		...mapGetters([ 'userinfo' ]),
		hasPower() { // 权限判断
			// 一级分销商看二级分销商
			if (this.userinfo.role_id.value == 3 && this.userinfo.level.value.value == 1) {
				return true;
			} else if (this.userinfo.role_id.value == 3 && this.userinfo.level.value == 2 && this.activeIndex == 2) {
				return true;
			}
			this.l_firstLoad = false;
			return false;
		},
		powerToast() {
			if (this.userinfo.role_id.value == 3) {
				return `您目前权限为${this.userinfo.role_id.text}，如果想升级为一级分销商`;
			}
			return `您目前权限为${this.userinfo.role_id.text}，如果想升级为分销商`;
		},
	},
	methods: {
		toDetail(item) {
			uni.navigateTo({url: '/pages/home/distributionManager/detail/index?id=' + item.id});
		},
		requestList(firstLoad = false, cover = false) {
			if (!this.hasPower) return;
			firstLoad ? this.$_listInit() : void 0;
			cover = cover || firstLoad;
			this.$api('org').subordinate({page: this.l_pageinfo.page, role_id: this.activeIndex}).then(res => {
				this.l_total = res.total;
				let list = res.data;
				cover ? this.$_setListData(list) : this.$_appendListData(list);
			})
		}
	},
}
</script>
<style lang="scss" scoped>
.dm {
	z-index: 10;
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
		.power-toast {
			padding-top: 116rpx;
			p {
				text-align: center;
			}
		}
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
				border-radius: 50%;
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