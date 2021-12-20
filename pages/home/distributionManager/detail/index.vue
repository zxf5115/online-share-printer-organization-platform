<template>
	<div>
		<p-nav title="分销管理" @callback="navInfo = $event" />
		<div class="dm-detail bg-w">
			<div class="head fl fd-r ai-ctr">
				<u-image class="ava" width="166rpx" height="166rpx" :src="require('../../../../static/home/index/item1.png')"/>
				<p class="fl fd-r ai-ctr">收益分成： <span>¥0.20/页</span></p>
			</div>
			<p class="cell fl fd-r"><label>姓名：</label><span>老吴</span></p>
			<p class="cell fl fd-r"><label>性别：</label><span>男</span></p>
			<p class="cell fl fd-r"><label>所在地：</label><span>河北省石家庄市桥西区</span></p>
			<p class="cell fl fd-r"><label>年龄：</label><span>18</span></p>
			<p class="cell fl fd-r"><label>手机号：</label><span>18132050229</span></p>
			<p class="cell fl fd-r"><label>微信号：</label><span>17303330043</span></p>
			<p class="cell fl fd-r"><label>邮箱：</label><span>1544908061@qq.com</span></p>
			<p class="cell fl fd-r"><label>上级分销商电话：</label><span>17303330043</span></p>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
		}
	},
	created() {
		
	},
	methods: {
		
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