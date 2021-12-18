<template>
<div>
     <u-navbar
            title="打印收益"
            fixed
            placeholder
            safeAreaInsetTop
            @rightClick="rightClick"
            @leftClick="leftClick"
        >
        </u-navbar>
        <div>
            打印收益
        </div>
</div>
</template>

<script>
export default {
    onLaunch: function() {
    },
    onShow: function() {
        
    },
    onHide: function() {
        
    },
    methods: {
        rightClick(e) {
            console.log(e);
        },
        leftClick(e) {
            console.log(e);
        }
    },
}
</script>

<style>
</style>
