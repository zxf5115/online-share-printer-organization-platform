<template>
  <div class="item fl ai-ctr fd-r">
		<!-- 头像 -->
		<image src="https://cdn.uviewui.com/uview/album/1.jpg" width="80rpx" height="80rpx" class="ava" shape="circle"></image>
		<!-- 信息 -->
		<div class="userinfo fl-wp jc-sb">
			<span>辰东</span>
			<span :class="{'shopowner': activeIndex,'level2': !activeIndex}">店长</span>
		</div>
		<!-- 右边俩标签 -->
		<span class="price vertical-center">￥0.30</span>
		<span class="detail vertical-center" @click="toDetail">详情</span>
	</div>
</template>

<script>
export default {
  props: {
    source: {
      type: Object,
      default: () => {},
    }
  },
  methods: {
	  toDetail() {
		  this.$emit('detail', this.source);
	  }
  },
}
</script>
<style lang="scss" scoped>
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
		background-color: #dfdfdf;
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
</style>
