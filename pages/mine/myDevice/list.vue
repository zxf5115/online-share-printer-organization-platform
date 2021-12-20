<template>
  <div>
    <p-nav title="我的设备" @callback="navInfo = $event"/>
    <div class="m-d">
      <div class="head fl jc-sb fd-r ai-ctr bg-w">
        <u-image width="80rpx" height="80rpx" :src="require('../../../static/home/index/item1.png')"/>
        <p class="fl fd-r jc-sb ai-ctr"><span>辰东</span><label>100台</label></p>
      </div>
      <!-- 列表主体 -->
      <div :style="{
            height: `calc(100vh - ${navInfo.height || 0}px - 180rpx)`,
            background: '#fff',
          }" style="margin-top: 20rpx;">
        <!-- 列表scroll -->
        <p-list-view
          style="height: 100%;"
          :more="l_more"
          :firstLoad="l_firstLoad"
          :downRefresh="l_refresh"
          :nodata="l_nodata"
          @refresh="$_refresh(requestList, 0, 1)"
          @pull="$_loadMore(requestList)"
        >
          <div
            class="item fl ai-ctr fd-r jc-sb"
            v-for="(item, i) in l_listData"
            :key="i"
            @click="toDetail(item)"
          >
            <p>万三打印机</p>
            <div class="fl fd-r jc-sb">
              <device-status :status="i % 3" style="margin-right: 20rpx"/>
              <u-icon
                name="arrow-right"
                color="#B7B7B7"
                size="32rpx"
                @click="leftAction"
              />
            </div>
          </div>
        </p-list-view>
      </div>
    </div>
  </div>
</template>
<script>
import listView from "../../../mixins/listView";
import deviceStatus from './components/deviceStatus.vue'
export default {
  mixins: [listView],
  components: {deviceStatus},
  data() {
    return {
      navInfo: {}
    };
  },
  created() {
    this.requestList(1);
  },
  methods: {
    toDetail(item) {
      uni.navigateTo({
        url: '/pages/mine/myDevice/detail'
      })
    },
    requestList(firstLoad = false, cover = false) {
      console.log("模拟请求数据", firstLoad, cover);
      this.l_firstLoad = firstLoad;
      cover = cover || firstLoad;
      setTimeout(() => {
        this.l_total = 11;
        let res = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        cover ? this.$_setListData(res) : this.$_appendListData(res);
      }, 200);
    },
  },
};
</script>
<style scoped lang="scss">
.m-d {
  .head {
    padding: 40rpx;
    height: 80rpx;
   p {
     margin-left: 20rpx;
     flex: 1;
     color: #454564;
   }
  }
  .item {
    padding: 40rpx;
    border-bottom: 1rpx solid #f0f0f0;
    height: 56rpx;
    &:nth-last-child(1) {border: 0;}
    color: #454564;
    p {
      &:nth-last-child(1) {
        flex: 1;
      }
    }
  }
}
</style>
