<template>
  <div class="fl vh-100">
    <p-nav title="添加打印机" @callback="navInfo = $event"/>
    <div class="ctn fl jc-end ai-ctr">
      <image :src="icon">
      <p :style="{color: titleColor}">{{type ? '添加成功' : '添加失败'}}</p>
      <label v-if="!type">{{message}}</label>
    </div>
    <div class="btns fl jc-ctr ai-ctr fd-r">
      <button @click="navigateBack(success ? 2 : 1)">返回</button>
      <button @click="navigateBack(1)">{{success ? '继续添加' : '重新添加'}}</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: void 0,
      message: '',
    }
  },
  computed: {
    icon () {
      if (this.type) {
        return require("@/static/mine/wallet/Done.png");
      } else {
        return require("@/static/mine/wallet/Info.png");
      }
    },
    titleColor() {
      if (this.type) {
        return '#07C160';
      } else {
        return '#F76160';
      }
    }
  },
  onLoad({type = 1, message=""}) {
    this.type = +type;
    this.message = message;
  },
  methods: {
    navigateBack(delta = 1) {
      console.log(delta);
      uni.navigateBack({delta});
    },
  },
};
</script>
<style scoped lang="scss">
.ctn {
  height: 584rpx;
  image {
    width: 208rpx;
    height: 208rpx;
  }
  p {
    font-size: 48rpx;
    margin-top: 20rpx;
  }
  label {
    color: #434343;
    margin-top: 30rpx;
  }
}
.btns {
    flex: 1;
    button {
      margin: 35rpx;
      width: 256rpx;
      height: 94rpx;
      font-size: 36rpx;
      // font-weight: bold;
      background: #25A1F9;
      color: white;
      border-radius: 47rpx;
    }
  }
</style>
