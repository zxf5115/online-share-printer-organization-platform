<template>
  <div class="tnd">
    <p-nav title="提现"/>
    <div class="top">
      <p>收益提现-到工商银行（9551）</p>
      <p>￥2000</p>
    </div>
    <div class="take-info">
      <div class="status fl fd-r ">
        <p class="title">当前状态</p>
        <div class="step">
          <u-steps current="3" direction="column" activeColor="#2FC24F">
        		<u-steps-item title="已下单" desc="10:30">
        		</u-steps-item>
        		<u-steps-item title="已出库" desc="10:35">
        		</u-steps-item>
        		<u-steps-item title="运输中" desc="11:40"></u-steps-item>
        	</u-steps>
        </div>
      </div>
      <div style="padding: 40rpx 0;">
        <p-cell label="提现金额" padding="20rpx 40rpx" label-color="#454564" value-color="#666" :value="'￥2000.00'"/>
        <p-cell label="服务费"   padding="20rpx 40rpx" label-color="#454564" value-color="#666" :value="'￥60.00     （3%）'"/>
        <p-cell label="申请时间" padding="20rpx 40rpx" label-color="#454564" value-color="#666" :value="'2021-12-12   23:00:00'"/>
        <p-cell label="到账时间" padding="20rpx 40rpx" label-color="#454564" value-color="#666" :value="'2021-12-17   23:00:00'"/>
        <p-cell label="提现银行" padding="20rpx 40rpx" label-color="#454564" value-color="#666" :value="'工商银行'"/>
        <p-cell label="提现单号" padding="20rpx 40rpx" label-color="#454564" value-color="#666" :value="'20721112210005222178878454'"/>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      
    }
  },

}
</script>
<style scoped>
::v-deep .u-steps-item--column {
  padding-bottom: 40rpx;
  margin-top: -10rpx;
}
::v-deep .u-steps-item__line--column {
  display: none;
}
</style>
<style lang="scss" scoped>
.tnd {
  color: #454564;
  font-size: 28rpx;
  .top {
    height: 124rpx;
    padding: 68rpx;
    p {
      text-align: center;
      &:nth-child(2) {
        margin-top: 16rpx;
        font-size: 48rpx;
      }
    }
  }
  .take-info {
    background-color: white;
    .status {
      padding: 0 40rpx;
      margin-top: 40rpx;
      border-bottom: 1rpx solid #f0f0f0;
      .title {
        font-size: 24rpx;
      }
      .step {
        margin-left: 20rpx;
        flex: 1;
      }
    }
  }
}
</style>
