<template>
	<div>
	    <p-nav :title="isLogin ? ' ' : '授权'"/>
	    <div class="ctn">
	      <div class="banner">
              <image :src="require('@/static/login/banner.png')" />
          </div>
          <div class="read fl fd-r jc-ctr">
              <u-checkbox-group v-model="readFlag" placement="row">
            	<u-checkbox labelColor="#000出" :label="'已阅读并同意'"></u-checkbox>
            </u-checkbox-group>
            <span>《打印机用户协议》</span>
          </div>
          <div class="btns fl jc-ctr">
              <button :class="{'is-read': isRead}" @click="getUserinfo">授权登录</button>
          </div>
	    </div>
	</div>
</template>

<script>
export default {
    computed: {
        isLogin() {
            return false;
        },
        isRead() {
            return !!this.readFlag.length;
        }
    },
    data() {
        return {
            readFlag: [],
        }
    },
    created() {
        this.getUserProfile();
    },
    methods: {
        getUserinfo() {
            if (!this.isRead) return;
            this.getUserProfile();
        },
        getUserProfile() {
            uni.getUserProfile({
                desc:'Wexin', // 这个参数是必须的
                success: res => {
                    console.log(res)
                },
                fail: err => {
                    console.log(err)
                    uni.showToast({
						title: '不能正常使用小程序',
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
