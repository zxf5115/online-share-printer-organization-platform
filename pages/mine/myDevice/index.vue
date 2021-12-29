<template>
  <div>
    <p-nav title="我的设备" @callback="navInfo = $event"/>
    <div class="m-d">
      <div class="head fl jc-sb fd-r ai-ctr bg-w">
        <p><span>500</span><label>设备数量</label></p>
        <icon class="line" />
        <p><span>500</span><label>已分配</label></p>
        <icon class="line" />
        <p><span>500</span><label>未分配</label></p>
      </div>
      <!-- 列表主体 -->
      <div :style="{
            height: `calc(100vh - ${navInfo.height || 0}px - 270rpx)`,
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
          <template v-slot:list>
            <div
              class="item fl ai-ctr fd-r jc-sb"
              v-for="(item, i) in l_listData"
              :key="i"
              @click="toDeviceList(item)"
            >
              <u-image width="80rpx" height="80rpx" :src="require('../../../static/home/index/item1.png')"/>
              <p><span>辰东</span><span>134 5568 889</span></p>
              <span>100台</span>
            </div>
          </template>
        </p-list-view>
      </div>
    </div>
  </div>
</template>
<script>
import listView from "../../../mixins/listView";

export default {
  mixins: [listView],
  data() {
    return {
      navInfo: {}
    };
  },
  created() {
    this.requestList(true);
  },
  methods: {
    toDeviceList(item) {
      console.log(item);
      uni.navigateTo({
        url: '/pages/mine/myDevice/list',
      })
    },
    requestList(firstLoad = false, cover = false) {
      console.log('模拟请求数据', firstLoad, cover)
			firstLoad ? this.$_listInit() : void 0;
			cover = cover || firstLoad;
			setTimeout(() => {
				this.l_total = 11;
				let res = [1,1,1,1,1,1,1,1,1,1];
				cover ? this.$_setListData(res) : this.$_appendListData(res);
			}, 1200);
    },
  },
};
</script>
<style scoped lang="scss">
.m-d {
  .head {
    height: 108rpx;
    padding: 66rpx;
    .line {
      width: 34px;
      height: 1px;
      transform: rotate(90deg);
      background-color: #f0f0f0;
    }
    span {
      color: #ff8a00;
      text-align: center;
      font-size: 48rpx;
    }
    label {
      text-align: center;
      color: #454564;
    }
  }
  .item {
    padding: 40rpx;
    border-bottom: 1rpx solid #f0f0f0;
    &:nth-last-child(1) {border: 0;}
    color: #454564;
    p {
      flex: 1;
      margin: 0 20rpx;
    }
  }
}
</style>
