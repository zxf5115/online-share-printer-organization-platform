<template>
    <div>
        <p-nav title="用户信息" :line="false" />
        <div class="ctn">
            <div class="top fl jc-ctr ai-ctr">
                <image src="https://cdn.uviewui.com/uview/album/1.jpg" />
            </div>
            <p-cell label="姓名：" padding="20rpx 40rpx">
                <u--input placeholder="请输入姓名" border="bottom" clearable v-model="source.name" />
            </p-cell>
            <p-cell label="性别：" padding="20rpx 40rpx">
                <u--input placeholder="请输入性别" border="bottom" clearable v-model="source.name" />
            </p-cell>
            <p-cell label="所在地：" padding="20rpx 40rpx">
                <u--input placeholder="请输入所在地" border="bottom" clearable v-model="source.name" />
            </p-cell>
            <p-cell label="年龄：" padding="20rpx 40rpx">
                <u--input placeholder="请输入年龄" border="bottom" clearable v-model="source.name" />
            </p-cell>
            <p-cell label="手机号：" padding="20rpx 40rpx">
                <u--input placeholder="请输入手机号" border="bottom" clearable v-model="source.name" />
            </p-cell>
            <p-cell label="微信号：" padding="20rpx 40rpx">
                <u--input placeholder="请输入微信号" border="bottom" clearable v-model="source.name" />
            </p-cell>
            <p-cell label="邮箱：" padding="20rpx 40rpx">
                <u--input placeholder="请输入邮箱" border="bottom" clearable v-model="source.name" />
            </p-cell>
            <p-cell label="上级分销商电话：" padding="20rpx 40rpx" value>
                <u--input placeholder="请输入上级分销商电话" border="bottom" clearable v-model="source.name" />
            </p-cell>
            <div class="submit">
                <button>保存</button>
            </div>
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
            soruce: {},
        }
    },
    methods: {
    },
}
</script>
<style>
/* ::v-deep page { background-color: rgb(255, 255, 255) !important; } */
::v-deep .p-cell-label {
    width: 224rpx !important;
}
</style>
<style lang="scss" scoped>

.ctn {
    background: #fff;
    .top {
        margin: 62rpx 0 40rpx 0;
        height: 212rpx;
        image {
            width: 166rpx;
            height: 166rpx;
            border-radius: 50%;
        }
    }
    .submit {
        padding: 60rpx 0;
        button {
            width: 470rpx;
            height: 94rpx;
            background-color: #25A1F9;
            color: white;
            border-radius: 47rpx;
        }
    }
}
</style>
