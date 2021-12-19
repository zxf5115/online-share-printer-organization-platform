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
      l_refresh: false, // 刷新标志
    }
  },
  watch: {
    l_firstLoad() {
      // this.$_listInit();
    }
  },
	computed: {
    // 还有没有更多数据
		l_hasMoreData() {
      let res = (this.l_listData || []).length < this.l_total;
      if (this.l_more && !res) this.l_more = 3;
      console.log('l_hasMoreData', res);
			return res;
		},
    l_isLoading() {
      console.log(this.l_more == 2 , this.l_firstLoad , this.l_listPulling , this.l_refresh)
      const {l_more , l_firstLoad , l_listPulling , l_refresh} = this
      return this.l_more == 2 || this.l_firstLoad || this.l_listPulling || this.l_refresh;
    },
	},
  methods: {
		// 列表数据初始化方法
    $_listInit() {
      this.l_pageinfo  = Object.assign(this.l_pageinfo, {p: 1});
      this.l_total     = 0;
      this.l_firstLoad = true;
			this.l_listData  = [];
      this.l_more      = 1;
      this.l_refresh   = false;
    },
    // 初始化加载状态 设置数据后触发
    $_initLoading() {
      console.log('初始化各种loading状态')
      this.l_more        = this.l_hasMoreData ? 1 : 3;
      console.log(this.l_hasMoreData, this.l_more)
      this.l_listPulling = false;
      this.l_firstLoad   = false;
      this.l_refresh     = false;
    },
		// 拼接列表数据
		$_appendListData(listData) {
      console.log('拼接列表');
			this.l_listData = this.l_listData.concat(listData);
      this.l_hasMoreData;
      if (!this.l_listData.length) this.l_nodata = true;
      this.$nextTick(e => {
        this.$_initLoading();
      })
		},
    // 设置列表数据 这个用于下拉刷新等操作
		$_setListData(listData) {
      console.log('重置列表', this);
      this.l_listData = listData;
      console.log(listData);
      this.l_hasMoreData;
      if (!this.l_listData.length) this.l_nodata = true;
      this.$nextTick(e => {
        this.$_initLoading();
      })
    },
    $_loadMore(action, ...args) {
      console.log('上拉加载触发', this.l_hasMoreData, this.l_isLoading);
      if (!this.l_hasMoreData || this.l_isLoading) return;
      this.l_more = 2;
      console.log(this.l_more, this.l_hasMoreData);
      this.l_pageinfo.p ++;
      action(...args);
    },
    $_refresh(action, ...args) {
      console.log('下拉刷新触发', this.l_refresh);
      
      if (this.l_isLoading) {
        this.l_refresh    = true;
        return this.$nextTick(e => {
          this.l_refresh = false
        });
      }
      console.log(111);
      this.l_refresh    = true;
      this.l_pageinfo.p = 1;
      action(...args);
    }
  }
}