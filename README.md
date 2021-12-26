#### 时间选择组件调用方法
```
import dateView from '/components/ui/r-date-view'
// 参数说明见组件内prod注释
<date-view :show.sync="showDate" :value="timestamp" type="datemonth" format="yyyy年M月" @confirm="timestamp = $event.value"/>

```