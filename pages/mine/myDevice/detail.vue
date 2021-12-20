<template>
  <div>
    <p-nav title="设备详情" @callback="navInfo = $event"/>
    <div class="m-d">
      <p-cell label="打印机：" padding="40rpx" class="top" style="border-bottom: 1rpx solid #f0f0f0;">
        <device-status :status="1" style="width: 94rpx"/>
      </p-cell>
      <div class="ctn">
        <p-cell label="型号：" :value="'PR223798'"/>
        <p-cell label="地址：" :value="'通州万三水果超市'"/>
        <p-cell label="店长：" :value="'元冰冰'"/>
        <p-cell label="电话：" :value="'134 5555 6587'"/>
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
      
    };
  },
  created() {
    
  },
  methods: {

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
