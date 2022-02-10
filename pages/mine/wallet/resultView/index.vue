<template>
  <div class="result-page">
    <p-nav :title="resultParams.title"/>
    <div class="resultContent fl ai-ctr">
      <div class="resultImg"><img :src="resultParams.img" alt=""></div>
      <div :style="{color: resultParams.titleColor}" class="resultTip">{{resultParams.title}}</div>
      <div v-if="resultParams.subtitleTitle" class="subtitleTitle">{{resultParams.subtitleTitle}}</div>
      <div class="resultBtn fl ai-ctr jc-ctr" :style="{background: resultParams.type ? '#25A1F9' : '#07C160'}">
        {{resultParams.resultBtn}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      resultParams: {
        type: 0, // 成功
        title: '添加失败',
        img: require("@/static/mine/wallet/Info.png"),
        titleColor: '#F76160',
        subtitleTitle: "请重新添加银行卡",
        resultBtn: "重新添加银行卡"
      }
      // {
      //   type: 1, // 成功
      //   title: '添加成功',
      //   img: require("@/static/mine/wallet/Done.png"),
      //   titleColor: '#07C160',
      //   subtitleTitle: "",
      //   resultBtn: "确定"
      // }
    }
  },
  onLoad(option) {
    // this.resultParams = JSON.parse(decodeURIComponent(option.resultParams))
    // console.log(this.resultParams)
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
    margin: 574rpx 0 180rpx;
    color: #ffffff;
    border-radius: 50rpx;
    
  }
}
</style>