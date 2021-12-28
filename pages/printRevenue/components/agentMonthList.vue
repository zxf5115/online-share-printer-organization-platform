<template>
  <p-list-view style="height: 100%" :more="l_more" :firstLoad="l_firstLoad" :downRefresh="l_refresh" :nodata="l_nodata" @refresh="$_refresh(requestList, 0, 1)" @pull="$_loadMore(requestList)" v-if="activeIndex">
		<div>
      <list-item :source="item" v-for="(item, i) in l_listdata" :key="i" />
    </div>
	</p-list-view>
</template>

<script>
import listView from '../../../mixins/listView';
import listItem from './listItem';
export default {
  components: { listItem },
  mixins: [ listView ],
  data() {
    return {
      
    }
  },
  components: {
    requestList() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({status: 1, date: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]});
        }, 1000);
      })
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
