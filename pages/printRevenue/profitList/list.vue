<template>
	<div class="content ">
		<p-nav title="收益统计"/>
		<div class="handle  fl fd-r jc-sb ai-ctr">
			<selectDate :value.sync="yearDate" type="dateyear"  v-if="type == 'dateyear'" />
			<selectDate :value.sync="monthDate" type="datemonth" v-else />
			<p>收益：￥545.00</p>
		</div>
		<!-- 列表 -->
		<div class="list" :style="{
			height: `calc(100vh - ${navHeight}px - 100rpx)`
		}">
			<p-list-view style="height: 100%" :more="l_more" :firstLoad="l_firstLoad" :downRefresh="l_refresh" :nodata="l_nodata" @refresh="$_refresh(requestList, false, true)" @pull="$_loadMore(requestList)" :scrollTop="scrollTop">
				<template v-slot:list>
					<div class="item fl fd-r jc-sb ai-ctr" v-for="(item, i) in l_listData" :key="i" @click="detail(item)">
						<image :src="'https://cdn.uviewui.com/uview/album/1.jpg'" class="ava"/>
						<p class="info fl">
							<label class="name">艾高冷食店</label>
							<label class="time">2021-21-21</label>
						</p>
						<p class="price">￥{{`20.00`}}</p>
					</div>
				</template>
			</p-list-view>
		</div>
	</div>
</template>
<script>
import selectDate from '../../../components/ui/select-date'
import { dateManager } from '../../../util/date/DateManager'
import listView from "../../../mixins/listView";
import listItem from '../components/listItem.vue'
export default {
	components: { selectDate, listItem },
	mixins: [ listView ],
	data() {
		return {
			monthDate: new Date(),
			yearDate: new Date(),
			role_id: 2, // 身份
			type: 'dateyear', // 年或月
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
	onLoad({type = "dateyear", timestamp = void 0, role_id = 2}) { // 初始化数据
		timestamp = timestamp ? parseInt(timestamp) : void 0;
		this.type = type;
		this.role_id = role_id;
		if (timestamp) {
			if (type == `dateyear`) {
				this.yearDate  = new Date(timestamp);
			} else {
				this.monthDate = new Date(timestamp);
			}
		}
	},
	created() {
		this.requestList(true);
	},
	methods: {
		detail(item) {
			console.log(item);
			uni.navigateTo({
				url: '/pages/printRevenue/profitList/detail'
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
	.handle {
		padding: 0 40rpx;
		height: 100rpx;
		p {
			color: #454564;
			font-size: 24rpx;
		}
	}
	.list {
		background-color: white;
		.item {
			padding: 0 40rpx;
			border-bottom: 2rpx #F0F0F0 solid;
			height: 162rpx;
			color: #434343;
			.ava {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background-color: #f0f0f0;
			}
			.info {
				flex: 1;
				margin: 0 20rpx;
				.time {
					color: #B0B0B8;
					margin-top: 10rpx;
				}
			}
			.price {
				height: 80rpx;
			}
		}
	}
}
</style>