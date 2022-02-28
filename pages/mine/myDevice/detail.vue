<template>
  <div>
    <p-nav title="设备详情" @callback="navInfo = $event"/>
    <div class="m-d">
      <p-cell label="打印机：" padding="40rpx" class="top" style="border-bottom: 1rpx solid #f0f0f0;">
        <div class="fl fd-r jc-sb ai-ctr">
          <device-status :status="source.equipment_status.value" style="width: 124rpx"/>
          <span style="color: red;" @click="del()" v-if="userinfo.role_id.value == 2 && source.equipment_status.value <= 3">删除</span>
        </div>
      </p-cell>
      <div class="ctn">
        <p-cell label="型号：" :value="source.model"/>
        <p-cell label="地址：" :value="source.address"/>
        <p-cell label="店长：" :value="source.manager.nickname"/>
        <p-cell label="电话：" :value="source.manager.username"/>
      </div>
    </div>
    <div class="btns fl fd-r ai-ctr jc-sb" v-if="userinfo.role_id.value == 3 && source.equipment_status.value == 5">
        <button @click="second_step">同意</button>
        <button @click="third_step">不同意</button>
      </div>
  </div>
</template>
<script>
import deviceStatus from './components/deviceStatus.vue'
import { mapGetters } from 'vuex'
export default {
  components: { deviceStatus },
  computed: {
    ...mapGetters([ 'userinfo' ])
  },
  data() {
    return {
      id: void 0,
      source: {},
    };
  },
  onLoad({id}) {
    this.id = id;
    this.requestData();
  },
  methods: {
    del() {
      uni.showLoading({mask: true, title: '加载中...'});
      this.$api('printer').delete(this.id).then(res => {
        uni.hideLoading();
        uni.navigateBack();
      })
    },
    third_step() {
      uni.showLoading({mask: true, title: '加载中...'});
      this.$api('printer').third_step(this.id).then(res => {
        console.log(res);
        uni.hideLoading();
        this.requestData();
      })
    },
    second_step() {
      uni.showLoading({mask: true, title: '加载中...'});
      this.$api('printer').second_step(this.id).then(res => {
        console.log(res);
        uni.hideLoading();
        this.requestData();
      })
    },
    requestData() {
      console.log(this.userinfo)
      uni.showLoading({mask: true, title: '加载中...'});
      this.$api('printer').view(this.id).then(res => {
        console.log(res);
        uni.hideLoading();
        this.source = res;
      })
    },

  },
};
</script>
<style scoped lang="scss">
.m-d {
  background-color: white;
  .ctn {
    margin: 30rpx 0;
  }
  
}
.btns {
    width: 100%;
    margin-top: 50rpx;
    button {
      background: #25A1F9;
      color: #fff;
      width: 256rpx;
      height: 94rpx;
      border-radius: 47rpx;
    }

  }
</style>
