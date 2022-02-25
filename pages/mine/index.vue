<template>
    <div>
        <p-nav title="我的" />
        <div class="ctn">
            <div class="top">
                <image class="ava vertical-center" :src="userinfo.avatar" />
                <span class="username">{{userinfo.nickname}}</span>
                <p class="edit fl jc-sb fd-r ai-ctr" @click="jump({path: '/pages/mine/userinfo/index'})">
                    编辑个人资料
                    <image src="../../static/icon/edit.png" />
                </p>
            </div>
            <div class="item fl fd-r ai-ctr" v-for="(item, i) in menus" :key="i" @click="jump(item)">
                <image :src="item.icon" />
                <p>{{item.title}}</p>
                <u-icon name="arrow-right" color="#B7B7B7" size="16"></u-icon>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['userinfo']),
        menus() {
            if (this.userinfo.role_id == 2)  // 店长
                return this.items.filter((e, i) => i != 4);
            else // 分销商
                return this.items.filter((e, i) => i != 0);
        }
    },
    onShow: function() {
        
    },
    onHide: function() {
        
    },
    data() {
        return {
            items: [
                {
                    icon: require('../../static/mine/index/item1.png'),
                    title: '邀请店长加入',
                    path: '/pages/mine/myDevice/index',
                },
                {
                    icon: require('../../static/mine/index/item1.png'),
                    title: '我的设备',
                    path: '/pages/mine/myDevice/index',
                },
                 {
                    icon: require('../../static/mine/index/item2.png'),
                    title: '收益统计',
                    path: '/pages/printRevenue/index',
                    type: 'tabbar',
                },
                 {
                    icon: require('../../static/mine/index/item3.png'),
                    title: '我的钱包',
                    path: '/pages/mine/wallet/index',
                }, 
                {
                    icon: require('../../static/mine/index/item4.png'),
                    title: '绑定设备',
                    path: '',
                },
                 {
                    icon: require('../../static/mine/index/item5.png'),
                    title: '意见反馈',
                    path: '/pages/mine/feedback/index',
                },
                 {
                    icon: require('../../static/mine/index/item6.png'),
                    title: '联系我们',
                    path: '/pages/mine/contact/index',
                }, 
            ]
        }
    },
    methods: {
        jump(e) {
          if (e.type === 'tabbar')
            uni.switchTab({url: e.path})
          else
            uni.navigateTo({url: e.path,});
        },
        rightClick(e) {
            console.log(e);
        },
        leftClick(e) {
            console.log(e);
        }
    },
}
</script>
<style scoped>
::v-deep page { background-color: rgb(255, 255, 255) !important; }
</style>
<style lang="scss" scoped>
.ctn {
    padding-left: 40rpx;
    background-color: white;
    .top {
        height: 236rpx;
        position: relative;
        border-bottom: 1rpx solid #F0F0F0;
        .ava {
            width: 118rpx;
            height: 118rpx;
            border-radius: 59rpx;
            left: 0;
        }
        .username  {
            position: absolute;
            color: #454564;
            font-size: 36rpx;
            left: 150rpx;
            top: 66rpx;
        }
        .edit {
            position: absolute;
            color: #B0B0B8;
            width: 206rpx;
            font-size: 28rpx;
            top: 128rpx;
            left: 150rpx;
            image {
                width: 30rpx;
                height: 30rpx;
            }
        }
    }
    .item {
        height: 154rpx;
        border-bottom: 1rpx solid #F0F0F0;
        padding-right: 70rpx;
        &:nth-last-child(1) {
            border-bottom: 0;
        }
        image:nth-child(1) {
            width: 76rpx;
            height: 76rpx;
        }
        p {
            flex: 1;
            margin: 0 40rpx;
        }

    }
}
</style>
