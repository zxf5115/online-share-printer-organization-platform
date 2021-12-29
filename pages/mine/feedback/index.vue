<template>
    <div>
        <p-nav title="意见反馈" :line="false" />
        <div class="ctn">
            <div class="feed-label fl fd-r jc-sb ai-ctr">
                <p class="fl fd-r">问题和意见<span>*</span></p><label>{{params.feedTxt.length}}/100</label>
            </div>
            <u--textarea height="294rpx" v-model="params.feedTxt" maxlength="100" placeholder="请输入内容" border=""></u--textarea>
            <div class="feed-label">图片（选填，提供问题截图</div>
            <div class="upload"></div>
            <div class="feed-label">联系方式</div>
            <u-input placeholder="留下联系方式，方便客服为您更好的解决问题" border="" v-model="params.phone" />
        </div>
    </div>
</template>

<script>
export default {
    onShow: function() {
        
    },
    onHide: function() {
        
    },
    data() {
        return {
            params: {
                feedTxt: '',
                phone: ''
            }
        }
    },
    methods: {
    },
}
</script>
<style scoped>
::v-deep .u-textarea {
    border-radius: 20rpx;
}
::v-deep .u-input {
    background: white;
    padding: 20rpx 19rpx !important;
    border-radius: 20rpx;
}
</style>
<style lang="scss" scoped>
.ctn {
    padding: 10rpx 54rpx;
    color: #5A5A5A;
    .feed-label {
        margin-top: 30rpx;
        font-size: 26rpx;
        padding: 20rpx;
        p {
           span { color: red; }
        }
        label {
            
        }
    }
    .upload {
        background: #fff;
        height: 260rpx;
        border-radius: 20rpx;
        width: 642rpx;
    }
}
</style>
