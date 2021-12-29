<template>
    <div>
        <p-nav title="联系我们" :line="false" />
        <div class="top fl ai-ctr jc-ctr">
            <p>VISION</p>
            <p>在您身边提供更近的打印服务</p>
        </div>
        <p class="center">
            三友映画（北京）科技有限公司！<br/>
            Tel：010-9999 9999<br/>
            Email：Sharedprinting@sanyou.com
        </p>
        <p class="bottom">客服电话<br/><span>400 800 8000</span></p>
    </div>
</template>
<style>
::v-deep page { background-color: rgb(255, 255, 255) !important; }
</style>
<style lang="scss" scoped>
.top {
    width: 100%;
    height: 492rpx;
    background: #5171B6;
    p {
        color: white;
        &:nth-child(1) {
            font-size: 48rpx;
            border-bottom: 1rpx solid white;
        }
        &:nth-child(2) {
            margin-top: 42rpx;
            font-size: 36rpx;
        }
    }
}
.center {
    width: calc(100% - 100rpx);
    text-align: center;
    line-height: 70rpx;
    color: #5A5A5A;
    font-size: 28rpx;
    padding: 60rpx 0;
    margin: 0 50rpx;
    border-bottom: 1rpx solid #f0f0f0;
}
.bottom {
    color: #5A5A5A;
    margin-top: 60rpx;
    font-size: 28rpx;
    text-align: center;
    span {
        margin-top: 30rpx;
        text-align: center;
        font-size: 48rpx;
    }
}

</style>
