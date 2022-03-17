<template>
  <div class="fl vh-100">
    <p-nav title="添加打印机" @callback="navInfo = $event"/>
    <div class="ctn">
      <div class="i-cell"><label>打印机编号：</label><u-input v-model="fromSource.code" placeholder="请输入打印机编号"></u-input></div>
      <div class="i-cell"><label>打印机名称：</label><u-input v-model="fromSource.title" placeholder="请输入打印机名称"></u-input></div>
      <div class="i-cell"><label>打印机地址：</label><u-input v-model="fromSource.address" placeholder="请输入打印机地址"></u-input></div>
      <div class="remark">
        <p>备注：</p>
        <u--textarea height="266rpx" v-model="fromSource.remark" maxlength="300" border=""></u--textarea>
      </div>
    </div>
    <div class="btns fl jc-ctr ai-ctr">
      <button @click="submit">添加进我的设备</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fromSource: {
        title: void 0,
        code: void 0,
        address: void 0,
        remark: void 0,
      }
    };
  },
  methods: {
    submit() {
      if (!this.$validate.module('device').check(this.fromSource).scene('add')) {
        return this.$u.toast(this.$validate.message);
      }
      uni.showLoading({ mask: true, title: '加载中...'});
      this.$api('printer').add(this.fromSource).then(res => {
        uni.hideLoading();
        this.fromSource = {
          title: void 0,
          code: void 0,
          address: void 0,
          remark: void 0,
        };
        uni.navigateTo({url: '/pages/mine/myDevice/result?type=1'});
      }).catch(error => {
        uni.hideLoading();
        uni.navigateTo({url: `/pages/mine/myDevice/result?type=0&message=${error.message||'请重新添加打印机'}`});
      })
    }
  },
};
</script>
<style scoped lang="scss">
.ctn {
  padding: 40rpx;
  height: 822rpx;
  background-color: white;
  .remark {
    margin-top: 56rpx;
    /deep/ .u-textarea {
      margin-top: 20rpx;
      padding: 10rpx;
      border-radius: 12rpx;
      border: 1rpx #E7E7E7 solid;
    }
  }
  .i-cell {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 130rpx;
    width: calc(100% - 50rpx);
    // margin: 30rpx 0;
    label {
      width: 190rpx;
    }
    /deep/ .u-input {
      flex: 1;
      border-bottom: 1rpx solid #AFAFAF;
      padding: 15rpx!important;
      border-radius: 0;
      font-size: 24rpx !important;
    }
  }
}
.btns {
    flex: 1;
    button {
      width: 470rpx;
      height: 94rpx;
      font-size: 36rpx;
      // font-weight: bold;
      background: #25A1F9;
      color: white;
      border-radius: 47rpx;
    }
  }
</style>
