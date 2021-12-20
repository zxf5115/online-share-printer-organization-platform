<template>
  <div class="fl-wp jc-sb fd-r ctn">
    <div class="item fl jc-ctr ai-ctr" v-for="(item, i) in items" :key="i" @click.stop="jump(item)">
      <div style="width: 100rpx;height: 100rpx">
        <u-image :src="item.icon" alt="" width="100rpx" height="100rpx" @click="jump(item)"/>
      </div>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: ['source'],
  data() {
    return {
       items: [
        {
          title: '我的设备',
          icon: require('../../../static/home/index/item1.png'),
          path: '/pages/mine/myDevice/index',
        }, {
          title: '收益统计',
          icon: require('../../../static/home/index/item2.png'),
          path: '/pages/mine/profit/index',
        }, {
          title: '分销管理',
          icon: require('../../../static/home/index/item3.png'),
          path: '/pages/home/distributionManager/index',
        }, {
          title: '我的钱包',
          icon: require('../../../static/home/index/item4.png'),
          path: '/pages/mine/wallet/index',
        }, 
      ]
    }
  },
  methods: {
    jump(e) {
      console.log(e);
      uni.navigateTo({url: e.path,});

    }
  },
}
</script>
<style lang="scss" scoped>
.ctn {
  height: auto;
  width: calc(100vw - 72rpx);
  padding: 56rpx 36rpx;
  .item {
    background: white;
    border-radius: 12rpx;
    width: calc(43.46666666vw);
    height: calc(43.46666666vw * 0.6380368);
    box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.1);
    color: #454564;
    margin-top: 26rpx;
    img {
      height: 100rpx;
      width: 100rpx;
    }
    p {
      margin-top: 12rpx;
    }
  }
}
</style>
