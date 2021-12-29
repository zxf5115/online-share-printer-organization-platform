<template>
	<div class="content ">
		<p-nav title="收益统计"/>
		<div class="top">
			<!-- 年月账单 -->
			<div class="date fl fd-r jc-sb ai-ctr">
				<label :class="{'is-active': topDateIndex === 0}" @click="topDateIndex = 0">月账单</label>
				<label :class="{'is-active': topDateIndex === 1}" @click="topDateIndex = 1">年账单</label>
			</div>
			<!-- 时间、身份切换栏 -->
			<div class="handle fl fd-r jc-sb ai-ctr ">
				<selectDate :value.sync="yearDate" type="dateyear"  v-if="topDateIndex" />
				<selectDate :value.sync="monthDate" type="datemonth" v-else />
				<div class="switch fl fd-r jc-sb">
					<p :class="{'is-active': role_id === 2}" @click="role_id = 2">店长</p>
					<p :class="{'is-active': role_id === 3}" @click="role_id = 3">代理商</p>
				</div>
			</div>
			<!-- 收益详情 -->
			<div class="profit">
				<label>共收入{{viewData.count}}笔，合计</label>
				<p>￥{{viewData.price}}</p>
			</div>
		</div>
		<!-- 列表 -->
		<div class="list" :style="{
			height: `calc(100vh - ${navHeight}px - 450rpx)`
		}">
			<p-list-view style="height: 100%" :more="l_more" :firstLoad="l_firstLoad" :downRefresh="l_refresh" :nodata="l_nodata" @refresh="$_refresh(requestList, false, true)" @pull="$_loadMore(requestList)" :scrollTop="scrollTop">
				<template v-slot:list>
					<list-item :source="item" v-for="(item, i) in l_listData" :key="i" @detail="toDetail(item)"></list-item>
				</template>
			</p-list-view>
		</div>
	</div>
</template>
<script>
import selectDate from '../../components/ui/select-date'
import { dateManager } from '../../util/date/DateManager'
import listView from "../../mixins/listView";
import listItem from './components/listItem.vue'
export default {
	components: { selectDate, listItem },
	mixins: [ listView ],
	data() {
		return {
			topDateIndex: 0, // 顶部选择
			monthDate: new Date(),
			yearDate: new Date(),
			role_id: 2, // 身份
			viewData: {
				count: 1324,
				price: '48340.00',
			}
		}
	},
	computed: {
		monthDateParam() {
			let y = dateManager.year (this.monthDate);
			let m = dateManager.month(this.monthDate);
			return [
				dateManager.format(new Date(y, m - 1, 1), 'yyyy-MM-dd hh:mm:ss'),
				`${dateManager.format(new Date(y, m, 0), 'yyyy-MM-dd ')}23:59:59`,
			];
		},
		yearDateParam() {
			let y = dateManager.year (this.yearDate);
			return [
				`${y}-01-01 00:00:00`,
				`${y}-12-31 23:59:59`,
			];
		},
		requestParams() { // 获取请求入参
			let asset_create_time = this.topDateIndex ? this.yearDateParam : this.monthDateParam;
			let { role_id } = this;
			let params = {
				role_id,
				asset_create_time,
				...this.l_pageinfo,
			};
			return params;
		},
		navHeight: () => getApp().globalData.navHeight,
	},
	watch: {
		// 改变了就刷新请求数据
		topDateIndex() {
			this.requestList(true);
		},
		role_id() {
			this.requestList(true);
		},
		monthDate() {
			this.requestList(true);
		},
		yearDate() {
			this.requestList(true);
		},
	},
	created() {
		this.requestList(true);
	},
	methods: {
		toDetail(e) {
			console.log('去详情', e);
			uni.navigateTo({
				url: '/pages/printRevenue/profitList/list'
			})
		},
		requestList(firstLoad = false, cover = false) {
			console.log('模拟请求数据', firstLoad, cover, this.requestParams)
			firstLoad ? this.$_listInit() : void 0;
			cover = cover || firstLoad;
			setTimeout(() => {
				this.l_total = 11;
				let res = [1,1,1,1,1,1,1,1,1,1];
				cover ? this.$_setListData(res) : this.$_appendListData(res);
			}, 1200);
		}
	},
}
</script>
<style lang="scss" scoped>
.content {
	.top {
		padding: 0 40rpx;
		background-color: white;
		height: 430rpx;
		color: #454564;
		.date {
			width: calc(100% - 300rpx);
			margin: 40rpx 150rpx;
			label {
				height: 54rpx;
				width: 180rpx;
				line-height: 54rpx;
				text-align: center;
				color: #454564;
				font-size: 32rpx;
			}
			.is-active {
				position: relative;
				&::after {
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 4rpx;
					background: #454564;
					border-radius: 2rpx;
				}
			}
		}
		.handle {
			height: 50rpx;
			margin-bottom: 40rpx;
			.switch {
				width: 240rpx;
				p {
					width: 100rpx;
					height: 44rpx;
					line-height: 44rpx;
					text-align: center;
				}
				.is-active {
					position: relative;
					&::after {
						content: '';
						position: absolute;
						left: -4rpx;
						top: -4rpx;
						width: 100%;
						height: 100%;
						background: transparent;
						border-radius: 22rpx;
						border: 4rpx solid #25A1F9;
					}
				}
			}
		}
		.profit {
			label {
				margin-top: 30rpx;
				font-size: 28rpx;
			}
			p {
				margin-top: 30rpx;
				font-size: 48rpx;
				color: #FF8A00;
			}
		}
		
	}
	.list {
		margin-top: 20rpx;
		background-color: white;
	}
}
</style>