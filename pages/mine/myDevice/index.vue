<template>
  <div  @touchmove.stop.prevent @catchtouchmove="()=>{}">
    <p-nav title="我的设备" @callback="navInfo = $event"/>
    <div class="m-d">
      <div class="head fl jc-sb fd-r ai-ctr bg-w">
        <p @click="jumpMyDevices"><span>{{printerInfo.printer_total}}</span><label>设备数量</label></p>
        <icon class="line" />
        <p><span>{{printerInfo.already_printer_total}}</span><label>已分配</label></p>
        <icon class="line" />
        <p><span>{{printerInfo.without_printer_total}}</span><label>未分配</label></p>
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
              <image width="80rpx" height="80rpx" :src="item.avatar" style="width:80rpx;height:80rpx;"/>
              <p><span>{{item.nickname}}</span><span>{{item.username}}</span></p>
              <span>{{item.asset.should_printer_total}}台</span>
            </div>
          </template>
        </p-list-view>
      </div>
    </div>
  </div>
</template>
<script>
import listView from "../../../mixins/listView";
import { mapGetters } from "vuex";
export default {
  mixins: [listView],
  computed: {
    ...mapGetters(['userinfo'])
  },
  data() {
    return {
      navInfo: {},
      printerInfo: {},
    };
  },
  created() {
    this.requestList(true);
    this.$api('asset').equipment().then(res => {
      console.log(res);
      this.printerInfo = res;
    })
  },
  methods: {
    toDeviceList(item) {
      uni.navigateTo({
        url: `/pages/mine/myDevice/list?&id=${item.id}&sum=${item.asset.should_printer_total}&nickname=${item.nickname}&avatar=${item.avatar}&role_id=${item.role_id.value}`,
      })
    },
    requestList(firstLoad = false, cover = false) {
      console.log('模拟请求数据', firstLoad, cover)
			firstLoad ? this.$_listInit() : void 0;
			cover = cover || firstLoad;
      this.$api('org').subordinate(this.l_pageinfo).then(res => {
				this.l_total = res.total;
				let list = res.data;
        if (list.length == 0 && this.l_pageinfo.page == 1) {
          // 跳转到 下一个页面
          return this.jumpMyDevices();
        }
				cover ? this.$_setListData(list) : this.$_appendListData(list);
			})
    },
    jumpMyDevices() {
      uni.redirectTo({
          url: `/pages/mine/myDevice/list?&id=${this.userinfo.id}&nickname=${this.userinfo.nickname}&avatar=${this.userinfo.avatar}&role_id=${this.userinfo.role_id.value}`
        })
    }
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
