<template>
	<div class="content fl vh-100" @touchmove.stop.prevent @catchtouchmove="()=>{}">
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
				<label>共收入{{sumTotal}}笔，合计</label>
				<p>￥{{sumMoney}}</p>
			</div>
		</div>
		<!-- 列表 -->
		<div class="list">
			<template v-if="hasPower">
				<p-list-view style="height: 100%" :more="l_more" :firstLoad="l_firstLoad" :downRefresh="l_refresh" :nodata="l_nodata" @refresh="$_refresh(requestList, false, true)" @pull="$_loadMore(requestList)">
					<template v-slot:list>
						<list-item :source="{'item': item}" v-for="(item, i) in l_listData" :key="i" @detail="toDetail(item)"></list-item>
					</template>
				</p-list-view>
			</template>
			<template v-else>
				<div class="power-toast bg-w" style="height: 100%">
					<p>{{powerToast}}</p>
					<p>请联系：13488697701</p>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
import selectDate from '../../components/ui/select-date'
import { dateManager } from '../../util/date/DateManager'
import listView from "../../mixins/listView";
import listItem from './components/listItem.vue'
import { mapGetters } from 'vuex'
export default {
	components: { selectDate, listItem },
	mixins: [ listView ],
	data() {
		return {
			topDateIndex: 0, // 顶部选择
			monthDate: new Date(),
			yearDate: new Date(),
			role_id: 2, // 身份
			listHeight: '',
			viewData: {
			},
		}
	},
	computed: {
		...mapGetters([ 'userinfo' ]),
		sumTotal() {
			return this.viewData.money == void 0 ? '-' : this.viewData.money;
		},
		sumMoney() {
			return this.viewData.money == void 0 ? '-' : this.viewData.money;
		},
		hasPower() { // 权限判断
			// 一级分销商看二级分销商
			if (this.userinfo.role_id.value == 3 && this.userinfo.level.value == 1) {
				return true;
			} else if (this.userinfo.role_id.value == 3 && this.userinfo.level.value == 2 && this.role_id == 2) {
				return true;
			}
			return false;
		},
		powerToast() {
			if (this.userinfo.role_id.value == 3) {
				return `您目前权限为${this.userinfo.role_id.text}，如果想升级为一级分销商`;
			}
			return `您目前权限为${this.userinfo.role_id.text}，如果想升级为分销商`;
		},
		monthDateParam() {
			let y = dateManager.year (this.monthDate);
			let m = dateManager.month(this.monthDate);
			return [
				dateManager.format(new Date(y, m - 1, 1), 'yyyy-MM-dd hh:mm:ss'),
				`${dateManager.format(new Date(y, m, 0), 'yyyy-MM-dd 23:59:59')}`,
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
			let create_time = JSON.stringify(this.topDateIndex ? this.yearDateParam : this.monthDateParam);
			let { role_id } = this;
			let params = {
				role_id,
				create_time,
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
// 		您目前权限为店长，如果想升级为分销商
// 请联系：13488697701
		// #ifdef MP	
		this.listHeight = `calc(100vh - ${this.navHeight}px - 450rpx)`;
		// #endif
		// #ifdef H5		
		this.listHeight = `calc(100vh - ${this.navHeight}px - 550rpx)`;
		// #endif
		this.requestList(true);
	},
	methods: {
		toDetail(e) {
			uni.navigateTo({
				url: `/pages/printRevenue/profitList/list?type=${this.topDateIndex?'dateyear':'datemonth'}&timestamp=${this.topDateIndex?this.yearDate.getTime():this.monthDate.getTime()}&member_id=${e.id}&sum=${e.obtain_money}`
			})
		},
		requestList(firstLoad = false, cover = false) {
			if (!this.hasPower) return;
			firstLoad ? this.$_listInit() : void 0;
			cover = cover || firstLoad;
			Promise.all([
				this.$api('obtain').getSubLevelObtain(this.requestParams),
				this.$api('obtain').center({create_time:this.requestParams.create_time}),
			]).then(res => {
				this.l_total = res[0].total;
				let list = res[0].data;
				cover ? this.$_setListData(list) : this.$_appendListData(list);
				this.viewData = res[1];
				console.log(this.viewData);
			})
		}
	},
}
</script>
<style lang="scss" scoped>
.content {
	overflow: hidden;
	.top {
		padding: 0 40rpx;
		background-color: white;
		height: 430rpx;
		color: #454564;
		.date {
			width: calc(100% - 300rpx);
			padding: 40rpx 150rpx;
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
		flex: 1;
		margin-top: 20rpx;
		background-color: white;
		.power-toast {
			padding-top: 116rpx;
			p {
				text-align: center;
			}
		}
	}
}
</style>