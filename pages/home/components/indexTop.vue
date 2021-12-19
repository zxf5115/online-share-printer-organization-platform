<template>
  <div class="ctn">
    <span class="label">权限：二级</span>
    <span class="up-org">上级经销商：张三</span>
    <span class="means-sum level-center">总资产</span>
    <p class="means-txt level-center">
      <span>￥</span>
      <span><u-count-to class="count" :endVal="9186.88" :decimals="2" fontSize="72rpx" color="white"></u-count-to></span>
    </p>
    <span class="yesterday">昨日收益 ￥<u-count-to class="count" :endVal="500" :decimals="2" fontSize="28rpx" color="white"></u-count-to></span>
    <span class="now-month">当月收益 ￥<u-count-to class="count" :endVal="1800.96" :decimals="2" fontSize="28rpx" color="white"></u-count-to></span>
  </div>
</template>

<script>
export default {
  props: ['source'],
  data() {
    
    return {
      
    }
  },
  created() {

  },
}
</script>
<style lang="scss" scoped>
.ctn {
  height: 500rpx;
  width: 100vw;
  position: relative;
  span {
    position: absolute;
    color: white;
    height: 46rpx;
    line-height: 46rpx;
  }
  .label {
    top: 40rpx;
    left: 0;
    min-width: 180rpx;
    padding: 0 20rpx;
    background: #5E5DD7;
    border-top-right-radius: 23rpx;
    border-bottom-right-radius: 23rpx;
  }
  .up-org {
    top: 40rpx;
    right: 40rpx;
  }
  .means-sum {
    top: 160rpx;
  }
  .means-txt {
    top: 242rpx;
    display: inline-block; 
    span {
      position: static !important;
      display: inline-block; 
      &:nth-child(1) {
        display: row;
        font-size: 36rpx;
        margin-right: 12rpx;
      }
      &:nth-child(2) {
        font-size: 72rpx;
      }
    }
  }
  .yesterday {
    left: 40rpx;
    bottom: 0;
  }
  .now-month {
    right: 40rpx;
    bottom: 0;
  }
}
</style>
