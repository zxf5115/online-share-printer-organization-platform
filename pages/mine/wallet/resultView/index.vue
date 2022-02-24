<template>
  <div class="result-page">
    <p-nav :title="resultParams.title"/>
    <div class="resultContent fl ai-ctr">
      <div class="resultImg"><img :src="resultParams.img" alt=""></div>
      <div class="resultTip" :style="{color: resultParams.titleColor}">{{resultParams.title}}</div>
      <div class="subtitleTitle" v-if="resultParams.subtitleTitle">{{resultParams.subtitleTitle}}</div>
      <div class="resultBtn fl ai-ctr jc-ctr" @click="pageLink(resultParams.type)" :style="{background: resultParams.type ? '#25A1F9' : '#07C160'}">{{resultParams.resultBtn}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      resultParams: {}
    }
  },
  onLoad(option) {
    this.resultParams = JSON.parse(decodeURIComponent(option.resultParams))
    console.log(this.resultParams)
  },
  methods: {
    /**
      * 根据当前类型跳转
     */
    pageLink(type) {
      uni.navigateBack();
    }
  }
}
</script>
<style scoped lang="scss">
.resultContent {
  padding-top: 200rpx;
  .resultImg {
    width: 208rpx;
    height: 208rpx;
    img {
      width: 100%;
      height: 100%
    }
  }
  .resultTip {
    font-size: 48rpx;
    height: 68rpx;
    line-height: 68rpx;

    margin: 10rpx 0 0;
  }
  .subtitleTitle {
    font-size: 28rpx;
    color: #434343;
    font-weight: 400;
    margin-top: 52rpx
  }
  .resultBtn {
    width: 396rpx;
    height: 94rpx;
    margin: 274rpx 0 180rpx;
    color: #ffffff;
    border-radius: 50rpx;
    
  }
}
</style>