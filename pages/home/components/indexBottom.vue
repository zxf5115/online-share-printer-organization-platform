<template>
  <div class="fl-wp jc-sb fd-r ib-ctn">
    <div class="item fl jc-ctr ai-ctr" v-for="(item, i) in items" :key="i" @click.stop="jump(item)">
      <div style="width: 100rpx;height: 100rpx">
        <u-image :src="item.icon" alt="" width="100rpx" height="100rpx" @click="jump(item)"/>
      </div>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters([ 'userinfo' ])
  },
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
          path: '/pages/printRevenue/index',
          type: 'tabbar'
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
  mounted() {
    // 这里改下我的设备的path
    if (this.userinfo.role_id.value === 2) {
      this.items[0].path = `/pages/mine/myDevice/list?&id=${this.userinfo.id}&nickname=${this.userinfo.nickname}&avatar=${this.userinfo.avatar}&role_id=${this.userinfo.role_id.value}`;
    }
  },
  methods: {
    jump(e) {
      if (e.type === 'tabbar')
        uni.switchTab({url: e.path})
      else
        uni.navigateTo({url: e.path,});
    }
  },
}
</script>
<style lang="scss" scoped>
.ib-ctn {
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
    z-index: 1;
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
