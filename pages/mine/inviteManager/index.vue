<template>
    <div class="fl vh-100">
        <p-nav title="邀请店长加入" :line="false" />
        <div class="ctn fl ai-ctr" v-if="userinfo">
            <image :src="userinfo.archive.invitation_qrcode_url"/>
            <p>用户扫描此小程序码后<br/>会自动注册成为您的下属店长<br/>已注册用户，无法扫描</p>
        </div>
        <div class="btns fl jc-ctr ai-ctr" v-if="userinfo">
            <button @click="save">保存到相册</button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters([ 'userinfo' ]),
    },
    methods: {
        save() {
            let that = this;
            uni.showLoading({title:'加载中...'});
            this.$R.download(this.userinfo.archive.invitation_qrcode_url).then(res => {
                uni.hideLoading();
                uni.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function() {
                        that.$u.toast('保存成功');  
                    },
                    fail: function(err) {
                        if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                            that.openSetting()
                            return;
                        }
                        console.log(err)
                        that.$u.toast('保存失败');  
                    }
                });
            }).catch(error => {
                uni.hideLoading();
                console.log(error);
            })
        },
        openSetting() {
            let that = this;
            uni.showModal({
              title: '提示',
              content: '需要您授权保存相册',
              showCancel: true,
              success: modalSuccess => {
                uni.openSetting({
                  success(settingdata) {
                    that.$u.toast('再次点击以保存');  
                  },
                  fail(failData) {
                    that.$u.toast('保存失败');  
                  },
                })
              }
            });
        }
    },
};
</script>
<style lang="scss" scoped>
.ctn {
    margin: 14rpx 30rpx;
    width: calc(100% - 60rpx);
    height: 900rpx;
    background: white;
    border-radius: 36rpx;
    image {
        width: 514rpx;
        height: 514rpx;
        background-color: transparent;;
        margin-top: 150rpx;
    }
    p {
        text-align: center;
        margin-top: 70rpx;
    }
}
.btns {
    flex: 1;
    button {
        color: white;
        width: 396rpx;
        height: 94rpx;
        line-height: 47rpx;
        border-radius: 47rpx;
        text-align: center;
        font-size: 36rpx;
        background: #07C160;
    }
}
</style>
