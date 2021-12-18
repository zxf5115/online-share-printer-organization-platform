<template>
<div>
     <navigation />
        <div>
            首页
        </div>
</div>
</template>

<script>
export default {
    components: { navigation },
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
