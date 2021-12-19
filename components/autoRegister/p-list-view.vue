<template>
  <scroll-view
    style="height: 100%;"
    :scroll-top="scrollTop"
    scroll-y="true"
    :refresher-enabled="!firstLoad & !nodata"
    :refresher-triggered="triggered"
    :refresher-threshold="firstLoad ? 0 : 100"
    @scrolltolower="onDown"
    @refresherrefresh="firstLoad ? void 0 : onPulling"
    @scroll="scroll"
  >
    <!-- 初次加载内容 整页展示加载 -->
    <!-- TODO: 这部分后续需要考虑怎么换骨架屏 -->
    <div style="width: 100%; height: 100%;" class="fl jc-ctr ai-ctr" v-if="firstLoad">
      <u-loading-icon mode="semicircle"></u-loading-icon>
    </div>
    <div style="width: 100%; height: 100%;" class="fl jc-ctr ai-ctr" v-else-if="nodata">
      <u-empty mode="data" :text="emptyTxt" />
    </div>
    <!-- 外传slot -->
    <template v-else>
      <slot></slot>	
    </template>
    <!-- 加载更多 -->
		<u-loadmore :status="more == 1 ? 'loading' : 'nomore'" line v-if="more && !firstLoad && !nodata" />
  </scroll-view>
</template>
<script>
export default {
  name: "p-nav",
  props: {
    /**
     * 上拉加载状态
     * 0: 不显示加载
     * 1: 加载中
     * 2: 没有更多
     */
    more: {
      type: Number,
      default: 0,
    },
    // 展示下拉刷新
    downRefresh: {
      type: Boolean,
      default: false,
    },
    // 首次加载
    firstLoad: {
      type: Boolean,
      default: true,
    },
    // 无数据 
    nodata: {
      type: Boolean,
      default: false,
    },
    emptyTxt: {
      type: String,
      default: '无数据'
    }
  },
  data() {
    return {
      triggered: false,
    };
  },
  methods: {
    scroll(e) {
      // console.log(e);
    },
    onPulling(e) {
      console.log(e)
    },
    onDown(e) {
      console.log(e);
    }
  },
};
</script>
<style lang="scss" scoped>
.aaa {
  height: 500px;
}
</style>