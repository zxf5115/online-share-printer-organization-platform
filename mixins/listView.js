// 页面单个listView配套使用混入文件
export default {
  data() {
    return{
      l_pageinfo: {
        p: 1,
        s: 10,
      },
      l_total: 0, // 总数据
      l_firstLoad: true, // 是否第一次加载
			l_listData: [], // 列表数据
			l_more: 1, // 上拉的展示状态
      l_listPulling: false, // 下拉的状态 
      l_nodata: false,
    }
  },
	computed: {
    l_isLoading() {
      return this.l_more == 1 || this.l_firstLoad || this.l_listPulling;
    },
    // 还有没有更多数据
		l_hasMoreData() {
      let res = this.l_pageinfo.p * this.l_pageinfo.s < this.l_total;
      if (this.l_more && !res) this.l_more = 2;
			return res;
		}
	},
  methods: {
		// 列表数据初始化方法
    $_listInit() {
      this.l_pageinfo  = Object.assign(this.l_pageinfo, {p: 1});
      this.l_total     = 0;
      this.l_firstLoad = true;
			this.l_listData  = [];
      this.l_more      = 1;
    },
    // 初始化加载状态 设置数据后触发
    $_initLoading() {
      this.l_more = 1;
      this.l_listPulling = false;
      this.l_firstLoad = false;
    },
		// 拼接列表数据
		$_appendListData(listData) {
			this.l_listData = this.l_listData.concat(listData);
      this.$_initLoading();
      this.l_hasMoreData;
      if (!this.l_listData.length) this.l_nodata = true;
		},
    // 设置列表数据 这个用于下拉刷新等操作
		$_setListData(listData) {
      this.l_listData = listData;
      this.$_initLoading();
      this.l_hasMoreData;
      if (!this.l_listData.length) this.l_nodata = true;
    }
  }
}
