<template>
  <div>
    <p-nav title="设备详情" @callback="navInfo = $event"/>
    <div class="m-d">
      <p-cell label="打印机：" padding="40rpx" class="top" style="border-bottom: 1rpx solid #f0f0f0;">
        <device-status :status="source.activate_status.value" style="width: 94rpx"/>
      </p-cell>
      <div class="ctn">
        <p-cell label="型号：" :value="source.model"/>
        <p-cell label="地址：" :value="source.address"/>
        <p-cell label="店长：" :value="source.manager.nickname"/>
        <p-cell label="电话：" :value="source.manager.username"/>
      </div>
    </div>
  </div>
</template>
<script>
import deviceStatus from './components/deviceStatus.vue'
export default {
  components: { deviceStatus },
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
    requestData() {
      this.$api('printer').view(this.id).then(res => {
        console.log(res);
        this.source = res;
      })
    }
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
</style>
