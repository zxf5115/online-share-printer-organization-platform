<template>
	<div class="index fl"  @touchmove.stop.prevent @catchtouchmove="()=>{}">
	    <p-nav/>
	    <div class="ctn">
            <!-- scroll -->
            <p-list-view
              style="height:100%"
              :more="0"
              :firstLoad="false"
              :downRefresh="refreshFlag"
              :nodata="false"
              @refresh="refreshAction"
            >
              <template v-slot:list>
                <!-- 背景 -->
                <div class="bg-box"><div class="bg-img" /></div>
                <!-- 顶部数据 -->
    	        <div class="top">
                    <top />
                </div>
                <div class="bottom">
                    <bottom />
                </div>
              </template>
            </p-list-view>
	    </div>
	</div>
</template>

<script>
import top    from './components/indexTop.vue'
import bottom from './components/indexBottom.vue'
export default {
    components: { top, bottom },
    data() {
        return {
            refreshFlag: false,
        }
    },
    methods: {
        refreshAction() { // 刷拉刷新 这里刷新资产数据即可
            this.refreshFlag = true;
            this.$store.dispatch('user/getOrgAsset').then(res => {
                this.refreshFlag = false;
            }).catch(err => {
                this.refreshFlag = false;
                this.errorFlag = true;
            })
        },
    },
}
</script>
<style lang="scss" scoped>
.index {
	overflow: hidden;
    height: 100vh;
}
.ctn {
    position: relative;
    flex: 1;
    max-width: 100vw;
    overflow: hidden;
    .bg-box {
        width: 100vw;
        height: 100vw;
        position: absolute;
        overflow: hidden;
        left: 0;
        right: 0;
        .bg-img {
            height: 1468rpx;
            width: 1468rpx;
            background: #605CD6;
            background: linear-gradient(90deg, #2A91FE 0%, #605CD6 100%);
            background: -moz-linear-gradient(left, #2A91FE, #2A91FE 15%, #605CD6 85%, #605CD6);
            background: -o-linear-gradient(left, #2A91FE, #2A91FE 15%, #605CD6 85%, #605CD6);
            background: -webkit-gradient(linear, left top, right top, from(#2A91FE), color-stop(0.15, #2A91FE), color-stop(0.85, #605CD6), color-stop(0.75, #605CD6), to(#605CD6));
            // background-image: linear-gradient(to right, #2A91FE , #605CD6);
            border-radius: 50%;
            position: absolute;
            top: -734rpx;
            left: calc(-734rpx + 50vw);
            z-index: 0;
        }
    }
    
    .top {
        z-index: 1;
    }
    .bottom {
        z-index: 1;
    }
}
</style>
