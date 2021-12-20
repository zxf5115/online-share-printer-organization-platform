<template>
  <scroll-view
    style="height: 100%;"
    :scroll-top="scrollTop"
    scroll-y="true"
    :refresher-enabled="!firstLoad & !nodata"
    :refresher-triggered="downRefresh"
    :refresher-threshold="firstLoad ? 0 : 100"
    @scrolltolower="pull"
    @refresherrefresh="refresh"
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
		<u-loadmore v-if="more && !firstLoad && !nodata" :status="loadmore[more - 1]" line  />
  </scroll-view>
</template>
<script>
export default {
  name: "p-nav",
  props: {
    /**
     * 上拉加载状态
     * 0: 不显示加载
     * 1: 加载更多
     * 2: 加载中
     * 3: 没有更多
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
      loadmore: [
        'loadmore',
        'loading',
        'nomore',
      ]
    };
  },
  methods: {
    scroll(e) {
      // console.log(e);
    },
    refresh(e) { // 下拉刷新
      console.log('下拉刷新', e);
      this.firstLoad ? void 0 : this.$emit('refresh', e);
      
    },
    pull(e) { // 上拉加载
      console.log('上拉加载', e)
      this.$emit('pull', e);
    }
  },
};
</script>
<style lang="scss" scoped>
.aaa {
  height: 500px;
}
</style>