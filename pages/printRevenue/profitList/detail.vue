<template>
	<div class="content">
		<p-nav title="打印收益"/>
		<div class="fl fd-r jc-sb ai-ctr top">
	        <p-cell label="时间：" label-width="118rpx" value-color="#7A7A7D" :value="source.create_time"/>
			<span>{{source.order_status.text}}</span>
		</div>
		<div class="cell-box">
	        <p-cell label="订单号：" value-color="#7A7A7D" :value="source.order_no"/>
	        <p-cell label="文件名称：" value-color="#7A7A7D" :value="source.title"/>
	        <p-cell label="文件页数：" value-color="#7A7A7D" :value="`${source.page_total||''}页`"/>
	        <p-cell label="打印份数：" value-color="#7A7A7D" :value="`${source.print_total||''}份`"/>
	        <p-cell label="类　　型：" value-color="#7A7A7D" :value="source.price.title"/>
		</div>
		<div class="cell-box">
			<p-cell label="打印机：" value-color="#7A7A7D" :value="source.printer.code"/>
	        <p-cell label="型　号：" value-color="#7A7A7D" :value="source.printer.model"/>
	        <p-cell label="地　址：" value-color="#7A7A7D" :value="source.printer.address"/>
	        <p-cell label="店　长：" value-color="#7A7A7D" :value="source.printer.title"/>
		</div>
		<div class="cell-box">
			<p-cell label="文件页数：" value-color="#7A7A7D" :value="source.total"/>
		</div>
		<div class="cell-box price">
			<p-cell label="支付金额：" value-color="#FF0000" :value="`￥${source.pay_money||''}`"/>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			loading: false,
			id: void 0,
			source: {},
		}
	},
	watch: {
		id() {
			this.requestData();
		},
	},
	onLoad({id}) { // 初始化数据
		this.id = id;
	},
	methods: {
		requestData() {
			this.$api('order').view(this.id).then(res => {
				this.source = res;
			}).catch(error => {
				
			})
		}
	},
}
</script>
<style>
::v-deep page { background-color: rgb(255, 255, 255) !important; }
</style>
<style lang="scss" scoped>
.content {
	background-color: white;
	.top {
		height: 80rpx;
		border-bottom: 1rpx #f0f0f0 solid;
		span {
			margin-right: 40rpx;
		}
	}
	.cell-box {
		padding: 40rpx 0;
		border-bottom: 1rpx #f0f0f0 solid;
	}
	.price {
		border: 0;
	}
}
</style>