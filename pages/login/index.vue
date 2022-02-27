<template>
	<div class="fl" style="height: 100vh;">
	    <p-nav :title="isLogin ? ' ' : '授权'"/>
        <!-- 获取失败情况 -->
        <div class="loading fl jc-ctr ai-ctr" v-if="errorFlag" @click="login">
            <u-empty mode="wifi" icon="https://cdn.uviewui.com/uview/empty/wifi.png" text="获取用户信息失败,点击重试!"/>
        </div>
        <!-- 获取用户信息 -->
	    <div class="ctn" v-else-if="!hasUserinfo&&isLogin">
	      <div class="banner">
              <image :src="require('@/static/login/banner.png')" />
          </div>
          <div class="read fl fd-r jc-ctr">
              <u-checkbox-group v-model="readFlag" placement="row">
            	<u-checkbox labelColor="#000" :label="'已阅读并同意'"></u-checkbox>
            </u-checkbox-group>
            <span @click="jumpAgreement">《打印机用户协议》</span>
          </div>
          <div class="btns fl jc-ctr">
              <button :class="{'is-read': isRead}" @click="getUserinfo">授权登录</button>
          </div>
	    </div>
        <!-- 加载状态 -->
        <div class="loading fl fd-r jc-ctr ai-ctr" v-else>
            <u-loading-icon mode="semicircle"></u-loading-icon>
        </div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        isRead() {
            return !!this.readFlag.length;
        },
        ...mapGetters(['isLogin', 'hasUserinfo']),
    },
    onLoad(e = {}) {
        console.log(e);
        this.token = (e||{}).token||void 0;
        
    },
    mounted() {
        console.log(this.isLogin, this.hasUserinfo)
        if (this.isLogin && this.hasUserinfo && !this.token) { // 已登录就直接跳转到home/index
            this.jumpHome();
        } else if (!this.isLogin || this.token) { // 未登录就去登录
            this.login();
        }
    },
    data() {
        return {
            readFlag: [],
            errorFlag: false,
            token: void 0,
        }
    },
    methods: {
        async login(...args) {
            this.errorFlag = false;
            let params = args[0]||{};
            if (this.token) params.token = this.token;
            this.$store.dispatch('user/login', params).then(res => {
                if (this.isLogin && this.hasUserinfo) { // 已登录就直接跳转到home/index
                    this.jumpHome();
                }
            }).catch(err => {
                console.log(err);
                this.errorFlag = true;
            });
        },
        jumpAgreement() {
            console.log('跳转协议页面')
        },
        jumpHome() {
            // 跳转之前应该要请求一些必要数据
            Promise.all([
                this.$store.dispatch('user/getOrgAsset'),
                this.$store.dispatch('user/getBankInfo'),
                this.$store.dispatch('user/getBankList'),
            ]).then(res => {
                uni.switchTab({url: '/pages/home/index'});
            }).catch(err => {
                console.log('jump获取必要数据');
                this.errorFlag = true;
            });
        },
        getUserinfo() {
            if (!this.isRead) return;
            this.getUserProfile();
        },
        setUserinfo({avatar, nickname}) {
            this.$store.dispatch('user/setUserinfo', {avatar, nickname}).then(res => {
                if (this.isLogin && this.hasUserinfo) { // 已登录就直接跳转到home/index
                    this.jumpHome();
                }
            }).catch(error => {
                uni.showToast({
						title: '设置用户信息失败请重试!',
						icon: 'none',
						duration: 1500,
                        mask: true,
					});
            })
        },
        getUserProfile() {
            uni.getUserProfile({
                desc:'Wexin', // 这个参数是必须的
                success: res => {
                    this.setUserinfo({avatar: res.userInfo.avatarUrl, nickname: res.userInfo.nickName});
                },
                fail: err => {
                    console.log(err)
                    uni.showToast({
						title: '需要授权后才可以使用',
						icon: 'none',
						duration: 1500,
                        mask: true,
					});
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.loading {
    flex: 1;
}
.ctn {
    .banner {
        image {
            width: 750rpx;
            height: 482rpx;
        }
    }
    .read {
        padding: 50rpx 0;
        margin-top: 100rpx;
        span {
            color: #25A1F9;
        }
    }
    .btns {
        button {
            color: #fff;
            background-color: #B1B1B1;
            text-align: center;
            height: 94rpx;
            line-height: 94rpx;
            width: 396rpx;
            border-radius: 47rpx;
        }
        .is-read {
            background-color: #25A1F9;
        }
    }
}
</style>
