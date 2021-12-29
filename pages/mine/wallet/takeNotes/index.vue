<template>
  <div class="wr-record">
    <p-nav :title="title"/>
    <div class="calendarCom">
      <calendar />
    </div>
    <div class="recordList bg-w" :style="{
      height: `calc(100vh - ${navHeight}px - 104rpx)`
    }">
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
          <div class="item fl fd-r jc-sb ai-ctr" v-for="(item, i) in l_listData" :key="i" @click="detail(item)">
            <image src="@/static/icon/$.png" />
            <div class="info">
              <p>收益提现-到工商银行（9551）</p>
              <p>2021-11-11 12:22:12</p>
            </div>
            <label>￥2000</label>
          </div>
        </template>
      </p-list-view>
    </div>
  </div>
</template>
<script>
import listView from "@/mixins/listView";
import calendar from "./components/calendar"
export default {
  mixins: [ listView ],
  components: {
    calendar
  },
  data() {
    return {
      title: '提现', // title
    }
  },
   created() {
    this.requestList(1);
  },
  computed: {
		navHeight: () => getApp().globalData.navHeight,
  },
  methods: {
    detail() {
      uni.navigateTo({
        url: '/pages/mine/wallet/takeNotes/detail'
      })
    },
    confirm(e) {
      console.log(e)
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
  }
}
</script>
<style lang="scss" scoped>
.calendarCom {
  height: 64rpx;
  padding: 20rpx 40rpx;
}
.item {
  height: 156rpx;
  padding: 0 40rpx;
  border-bottom: 1rpx solid #f0f0f0;
  font-size: 28rpx;
  color: #454564;
  &:nth-last-child(1) {
    border: 0;
  }
  image {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
  }
  .info {
    flex: 1;
    margin: 0 20rpx;
    p {
      &:nth-child(2) {
        color: #9B9B9B;
      }
    }
  }
  label {
    height: 80rpx;
  }
}
</style>
