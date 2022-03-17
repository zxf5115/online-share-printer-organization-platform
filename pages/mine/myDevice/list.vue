<template>
  <div  @touchmove.stop.prevent @catchtouchmove="()=>{}">
    <p-nav title="我的设备" @callback="navInfo = $event"/>
    <div class="m-d">
      <div class="head fl jc-sb fd-r ai-ctr bg-w">
        <image style="width: 80rpx;height:80rpx;" :src="avatar"/>
        <p class="fl fd-r jc-sb ai-ctr"><span>{{nickname}}</span><label v-if="sum">{{sum}}台</label></p>
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
          <template v-slot:list>
            <div
              class="item fl ai-ctr fd-r jc-sb"
              v-for="(item, i) in l_listData"
              :key="i"
              @click="toDetail(item)"
            >
              <p>{{item.code}}</p>
              <div class="fl fd-r jc-sb">
                <device-status :status="item.equipment_status.value" style="margin-right: 20rpx"/>
                <u-icon
                  name="arrow-right"
                  color="#B7B7B7"
                  size="32rpx"
                  @click="leftAction"
                />
              </div>
            </div>
          </template>
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
      navInfo: {},
      id: void 0,
      sum: void 0,
      nickname: '-',
      avatar: '',
    };
  },
  // id=55&sum=2&nickname=123&avatar=
  onLoad({id, sum = void 0, nickname, avatar, role_id}) {
    this.id = id;
    this.sum = sum;
    this.nickname = nickname;
    this.avatar = avatar;
    this.role_id = role_id;
    this.requestList(true, true);
  },
  onShow() {
    if (!this.l_firstLoad) {
      this.l_pageinfo = { page: 1, size: 10 };
      this.requestList(true, true);
    }
  },
  methods: {
    toDetail(item) {
      uni.navigateTo({
        url: `/pages/mine/myDevice/detail?id=${item.id}`
      })
    },
    requestList(firstLoad = false, cover = false) {
      console.log("模拟请求数据", firstLoad, cover);
      this.l_firstLoad = firstLoad;
      cover = cover || firstLoad;
      let idParam = {};
      if (this.role_id == 2) {
        idParam.manager_id = this.id;
      } else {
        idParam.member_id = this.id;
      }
      this.$api('printer').list(Object.assign(this.l_pageinfo, idParam)).then(res => {
				this.l_total = res.total;
				let list = res.data;
        console.log('本次调用cover', cover);
				cover ? this.$_setListData(list) : this.$_appendListData(list);
			})
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
