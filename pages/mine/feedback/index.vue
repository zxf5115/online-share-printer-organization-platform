<template>
    <div>
        <p-nav title="意见反馈" :line="false" />
        <div class="ctn">
            <div class="feed-label fl fd-r jc-sb ai-ctr">
                <p class="fl fd-r">问题和意见<span>*</span></p><label>{{params.content.length}}/100</label>
            </div>
            <u--textarea height="294rpx" v-model="params.content" maxlength="100" placeholder="请输入内容" border=""></u--textarea>
            <div class="feed-label">图片（选填，提供问题截图）</div>
            <div class="upload fl-wp fd-r ">
                <u-upload
                	:fileList="params.picture"
                    :previewImage="true"
                	@afterRead="afterRead"
                	@delete="deletePic"
                    width="calc(562rpx / 3.0)"
                    height="calc(562rpx / 3.0)"
                	multiple
                	:maxCount="6"
                ></u-upload>
            </div>
            <div class="feed-label fl fd-r jc-sb ai-ctr">
                <p class="fl fd-r">联系方式<span>*</span></p><label></label>
            </div>
            <u-input placeholder="留下联系方式，方便客服为您更好的解决问题" type="number" maxlength="11" border="" v-model="params.contact" />
            <div class="btns fl jc-ctr ai-ctr">
                <button @click="submit">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['token']),
    },
    data() {
        return {
            params: {
                content: '',
                contact: '',
                picture: []
            },
            
        }
    },
    methods: {
        submit() {
            if (!this.params.content.length) {
                return uni.showToast({
						title: '请输入问题和意见',
						icon: 'none',
						duration: 1500,
                        mask: true,
					});
            }
            if (!this.params.contact.length) {
                return uni.showToast({
						title: '请输入联系方式',
						icon: 'none',
						duration: 1500,
                        mask: true,
					});
            }
            let params = {...this.params, ...{picture: this.params.picture.map(e => {
                return e.url;
            })}};
            this.$api('complain').handle(params).then(res => {
                uni.showToast({
					title: res,
					icon: 'none',
					duration: 1500,
                    mask: true,
				})
                setTimeout(() => {
                    uni.navigateBack();
                }, 1500);
            })
        },
        afterRead(event) {
            let files = event.file;
            let queue = [];
            files.forEach(file => {
                queue.push(this.$api('file').picture(file.url));
            });
            uni.showLoading({ mask: true, 
                    title: '上传中'
            });
            Promise.all(queue).then(res => {
                let picture = res.map(e => {
                    return {url: e};
                });
                this.params.picture = [...(this.params.picture||[]), ...picture];
                console.log(JSON.stringify(this.params.picture));
                uni.hideLoading();
            }).catch(error => {
                console.log(error);
                uni.hidenLoading();
            })
        },
        deletePic(event) {
			this.params.picture.splice(event.index, 1)
		},
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
::v-deep .u-upload__button {
    height: calc(562rpx / 3.0) !important;
    width: calc(562rpx / 3.0) !important;
    margin: 0 10rpx 10rpx 0;
}
::v-deep .u-upload__wrap__preview {
    height: calc(562rpx / 3.0) !important;
    width: calc(562rpx / 3.0) !important;
    margin: 0 10rpx 10rpx 0;
}
:v-deep .u-upload__wrap__preview__image {
    height: calc(562rpx / 3.0) !important;
    width: calc(562rpx / 3.0) !important;
    margin: 0 10rpx 10rpx 0;
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
        padding: 30rpx 20rpx 20rpx 30rpx;
        border-radius: 20rpx;
        width: 582rpx;
        overflow-y: hidden;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .btns {
        margin-top: 40rpx;
        button {
            background-color: #25A1F9;
            width: 396rpx;
            height: 94rpx;
            font-size: 36rpx;
            text-align: center;
            line-height: 94rpx;
            color: white;
            border-radius: 48rpx;
        }
    }
}
</style>
