<template>
	<div class="content ">
		<p-nav title="打印收益"/>
		<div class="fl fd-r jc-sb ai-ctr top">
	        <p-cell label="时间：" label-width="118rpx" value-color="#7A7A7D" :value="'2021-12-12  16:00'"/>
			<span>打印中</span>
		</div>
		<div class="cell-box">
	        <p-cell label="订单号：" value-color="#7A7A7D" :value="'NPREV231231234'"/>
	        <p-cell label="文件名称：" value-color="#7A7A7D" :value="'小学一年级作业'"/>
	        <p-cell label="文件页数：" value-color="#7A7A7D" :value="'5页'"/>
	        <p-cell label="打印份数：" value-color="#7A7A7D" :value="'10份'"/>
	        <p-cell label="类　　型：" value-color="#7A7A7D" :value="'黑白'"/>
		</div>
		<div class="cell-box">
			<p-cell label="打印机：" value-color="#7A7A7D" :value="'天天打印机'"/>
	        <p-cell label="型　号：" value-color="#7A7A7D" :value="'PR36587'"/>
	        <p-cell label="地　址：" value-color="#7A7A7D" :value="'藁城天天超市'"/>
	        <p-cell label="店　长：" value-color="#7A7A7D" :value="'庞于滋'"/>
		</div>
		<div class="cell-box">
			<p-cell label="文件页数：" value-color="#7A7A7D" :value="'50'"/>
		</div>
		<div class="cell-box price">
			<p-cell label="支付金额：" value-color="#FF0000" :value="`￥${30}`"/>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			
		}
	},

	onLoad({id}) { // 初始化数据
		console.log(id)
	},
	created() {
	},
	methods: {
	
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