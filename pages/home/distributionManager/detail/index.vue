<template>
	<div>
		<p-nav title="分销管理" @callback="navInfo = $event" />
		<div class="dm-detail bg-w">
			<div class="head fl fd-r ai-ctr">
				<image class="ava" width="166rpx" height="166rpx" :src="source.avatar"/>
				<p class="fl fd-r ai-ctr">收益分成： <span>¥{{source.asset.proportion}}/页</span></p>
			</div>
			<p class="cell fl fd-r"><label>姓名：</label><span>{{source.nickname}}</span></p>
			<p class="cell fl fd-r"><label>性别：</label><span>{{source.archive.sex.text}}</span></p>
			<p class="cell fl fd-r"><label>所在地：</label><span>{{source.archive.address}}</span></p>
			<p class="cell fl fd-r"><label>年龄：</label><span>{{source.archive.age}}</span></p>
			<p class="cell fl fd-r"><label>手机号：</label><span>{{source.username}}</span></p>
			<!-- <p class="cell fl fd-r"><label>微信号：</label><span>17303330043</span></p>
			<p class="cell fl fd-r"><label>邮箱：</label><span>1544908061@qq.com</span></p> -->
			<p class="cell fl fd-r" v-if="source.role_id == 3"><label>上级分销商电话：</label><span>{{source.parent||''}}</span></p>
			<p class="cell fl fd-r" v-else><label>打印机型号：</label><span>{{source.printer}}</span></p>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			id: void 0,
			source: {},
		}
	},
	onLoad({id}) {
		this.id = id;
		this.requestData();
	},
	methods: {
		requestData() {
			this.$api('org').data(this.id).then(res => this.source = res);
		}
	},
}
</script>
<style lang="scss" scoped>
.dm-detail {
	.head {
		background-color: white;
		padding: 86rpx 50rpx;
		.ava {
			width:166rpx;
		  	height:166rpx;
		  	border-radius: 50%;
		}
		p {
			flex: 1;
			font-size: 28rpx;
			color: #454564;
			margin-left: 32rpx;
			span {
				margin-left: 32rpx;
				font-size: 48rpx;
				color: #FF8A00;
			}
		}
	}
	.cell {
		width: calc(100% - 84rpx);	
		padding: 0 42rpx;
		margin-bottom: 34rpx;
		label {
			width: 286rpx;
		}
		span {
			flex: 1;
		}
	}
}
</style>