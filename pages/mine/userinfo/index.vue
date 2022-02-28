<template>
    <div>
        <p-nav title="用户信息" :line="false" />
        <div class="ctn">
            <div class="top fl jc-ctr ai-ctr">
                <image :src="source.avatar" />
                <span @click="getUserProfile">点击获取微信头像</span>
            </div>
            <p-cell label="姓名：" padding="20rpx 40rpx">
                <u--input placeholder="请输入姓名" border="bottom" clearable v-model="source.nickname" />
            </p-cell>
            <p-cell label="性别：" padding="20rpx 40rpx">
                <p style="padding-left: 9px" @click="showPicker = true">{{sexText}}</p>
            </p-cell>
            <p-cell label="所在地：" padding="20rpx 40rpx">
                <p style="color: #4992FF;padding-left: 9px;" @click="getLocation">{{source.address||'点击选择所在地区'}}</p>
            </p-cell>
            <p-cell label="手机号：" padding="20rpx 40rpx">
                <u--input placeholder="请输入手机号" border="bottom" clearable v-model="source.username" disabled/>
            </p-cell>
            <p-cell label="微信号：" padding="20rpx 40rpx">
                <u--input placeholder="请输入微信号" border="bottom" clearable v-model="source.weixin" />
            </p-cell>
            <p-cell label="邮箱：" padding="20rpx 40rpx">
                <u--input placeholder="请输入邮箱" border="bottom" clearable v-model="source.email " />
            </p-cell>
            <p-cell label="上级分销商电话：" padding="20rpx 40rpx" value v-if="userinfo.parent">
                <u--input placeholder="请输入上级分销商电话" border="bottom" clearable v-model="userinfo.parent.username" disabled />
            </p-cell>
            <div class="submit">
                <button @click="submit">保存</button>
            </div>
        </div>
        <u-picker :show="showPicker" :columns="[sexSelectList]" :keyName="'label'" @confirm="pickerConfirm" @cancel="showPicker = false"></u-picker>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QQMap from '@/static/common/js/location/qqmap-wx-jssdk.js'
import { filterObj } from '@/util/common.js'
export default {
    computed: {
        ...mapGetters(['userinfo']),
        sexText() {
            if (this.source.sex && this.sexSelectList[parseInt(this.source.sex) - 1]) {
                return this.sexSelectList[parseInt(this.source.sex) - 1].label;
            }
            return '点击选择';
        }
    },
    data() {
        return {
            source: {},
            sexSelectList: [
                {
                    label: '男',
                    value: '1',
                },
                {
                    label: '女',
                    value: '2',
                },
                {
                    label: '保密',
                    value: '3',
                }
            ],
            showPicker: false,
        }
    },
    async onLoad() {
        let keyArr = ['nickname', 'sex', 'avatar', 'address', 'username', 'weixin', 'email'];
        this.source = filterObj({...this.userinfo.archive, ...this.userinfo, sex: (this.userinfo.archive.sex||{}).value}, keyArr);
        await this.getCode();
        this.qqmap = new QQMap({
            key: '4LABZ-JVNCG-BMYQY-IBMIU-YFXNH-JVB6U'
        });
    },
    methods: {
        pickerConfirm(e) {
            console.log(e);
            this.source.sex = e.value[0].value;
            console.log(this.source);
            this.showPicker = false;
        },
        async getCode() {
            this.code = await this.$api('user').wxLogin();
            if (!this.code) this.$u.toast('获取用户信息失败，请检查网络配置');
        },
        submit() {
            uni.showLoading({mask: true, title: '加载中...'});
            this.$store.dispatch('user/setUserinfo', this.source).then(res => {
                uni.hideLoading();
                this.$u.toast('成功');
            }).catch(error => {
                uni.hideLoading();
                uni.showToast({
						title: '设置用户信息失败请重试!',
						icon: 'none',
						duration: 1500,
                        mask: true,
					});
            })
        },
        getLocation() {
            let that = this;
            uni.showLoading({ mask: true, title: '定位中...'});
            uni.getLocation({
                type: 'wgs84',
                success: function (local) {
                    uni.hideLoading();
                    // 地址反解析
                    that.qqmap.reverseGeocoder({
                          location: local || '', 
                          success: function(res) {//成功后的回调
                            that.$set(that.source, 'address', `${res.result.address_component.province}${res.result.address_component.city}${res.result.address_component.district}${res.result.address_component.street}`)
                          },
                          fail: function(error) {
                            that.$u.toast('地址解析失败，请重试');
                          },
                          complete: function(res) {
                            console.log(res);
                          }
                    })
                },
                fail: function(err) {
                    console.log(err);
                    uni.hideLoading();
                }
            });
        },
        getPhoneNumber(e) {
            if (!e.detail.encryptedData) return;
            uni.showLoading({ mask: true, title: '加载中...'});
            this.$api('user').mobile({
                data: e.detail.encryptedData,
                iv: e.detail.iv,
                code: this.code,
            }).then(res => {
                this.source.username = res;
                this.getCode();
                uni.hideLoading();
            }).catch(error => {
                this.$u.toast('获取手机号码失败');
                uni.hideLoading();
            })
            
        },
        getUserProfile() {
            uni.getUserProfile({
                desc:'Wexin', // 这个参数是必须的
                success: res => {
                    this.source.avatar = res.userInfo.avatarUrl;
                    this.source.nickname = res.userInfo.nickName;
                },
                fail: err => {
                    uni.showToast({
						title: '取消了授权',
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
<style>
/* ::v-deep page { background-color: rgb(255, 255, 255) !important; } */
::v-deep .p-cell-label {
    width: 224rpx !important;
}
</style>
<style lang="scss" scoped>

.ctn {
    background: #fff;
    /deep/ .u-input {
        background-color: transparent !important;
    }
    .top {
        margin: 62rpx 0 40rpx 0;
        height: 212rpx;
        image {
            width: 166rpx;
            height: 166rpx;
            border-radius: 50%;
        }
        span {
            margin-top: 20rpx;
            font-size: 24rpx;
            color: #616161;
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
