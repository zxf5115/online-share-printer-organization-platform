<template>
  <u-navbar
        title="首页"
        
        fixed
        placeholder
        safeAreaInsetTop
        @rightClick="rightClick"
        @leftClick="leftClick"
    >
        <div slot="left"></div>
    </u-navbar>
</template>

<script>
export default {
  name: 'navigation',
  props: {
      
  },
  data() {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
