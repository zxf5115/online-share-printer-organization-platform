<template>
  <div class="scroll">
    <!-- 初次加载内容 整页展示加载 -->
    <div class="fl jc-ctr ai-ctr loading" v-if="firstLoad" @touchmove.stop.prevent="()=>{}">
      <u-loading-icon mode="semicircle"></u-loading-icon>
    </div>
    <div style="width: 100%; height: 100%;" class="fl jc-ctr ai-ctr" v-if="nodata" @touchmove.stop.prevent="()=>{}">
      <u-empty mode="data" :text="emptyTxt" />
    </div>
    <scroll-view
      style="height: 100%;"
      class="scroll"
      :scroll-top="scrollTop"
      scroll-y="true"
      :refresher-enabled="!nodata"
      :refresher-triggered="downRefresh"
      :refresher-threshold="firstLoad ? 0 : 100"
      @scrolltolower="pull"
      @refresherrefresh="refresh"
      @scroll="scroll"
      ref="scroll"
    >
      <!-- 外传slot -->
      <template>
        <slot name="list"></slot>	
      </template>
      <!-- 加载更多 -->
  		<u-loadmore v-if="more && !firstLoad && !nodata" :status="loadmore[more - 1]" line  />
    </scroll-view>
  </div>
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
    },
    scrollTop: {
      type: Number|String,
      default: '',
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
      this.firstLoad ? void 0 : this.$emit('refresh', e);
    },
    pull(e) { // 上拉加载
      this.$emit('pull', e);
    }
  },
};
</script>
<style lang="scss" scoped>
.scroll {
  position: relative;
  width: 100%;
  height: 100%;
  .loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 222;
  }
}

</style>