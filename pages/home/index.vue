<template>
	<div class="index">
	    <p-nav/>
	    <div class="ctn">
	      <!-- 背景 -->
	      <div class="bg-img" />
	      <!-- 顶部数据 -->
	      <top />
	      <!-- 底部菜单 -->
	      <bottom />
	    </div>
	</div>
</template>

<script>
import top    from './components/indexTop.vue'
import bottom from './components/indexBottom.vue'
export default {
    components: { top, bottom },
    onLaunch: function() {
    },
    onShow: function() {
        
    },
    onHide: function() {
        
    },
    methods: {
        leftClick(e) {
            console.log(e);
        }
    },
}
</script>
<style lang="scss" scoped>
.index {
	overflow: hidden;
}
.ctn {
    position: relative;
    min-height: calc(734rpx + 288rpx);
    max-width: 100vw;
    .bg-img {
        height: 1468rpx;
        width: 1468rpx;
        background: #605CD6;
        background: -moz-linear-gradient(left, #2A91FE, #2A91FE 15%, #605CD6 85%, #605CD6);
        background: -o-linear-gradient(left, #2A91FE, #2A91FE 15%, #605CD6 85%, #605CD6);
        background: -webkit-gradient(linear, left top, right top, from(#2A91FE), color-stop(0.15, #2A91FE), color-stop(0.85, #605CD6), color-stop(0.75, #605CD6), to(#605CD6));
        // background-image: linear-gradient(to right, #2A91FE , #605CD6);
        border-radius: 50%;
        position: absolute;
        top: -734rpx;
        left: calc(-734rpx + 50vw);
        z-index: -1;
    }
}
</style>
