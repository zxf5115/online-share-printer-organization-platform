<template>
<div>
    <p-nav 
    :leftClick="leftClick"
    />
    <div>
        首页
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
        leftClick(e) {
            console.log(e);
        }
    },
}
</script>

<style>
</style>
