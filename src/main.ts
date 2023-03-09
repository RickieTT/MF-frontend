import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// 2. 引入组件样式
import 'vant/lib/index.css';
import { Button, NavBar,Icon,Tabbar, TabbarItem,Col, Row   } from 'vant';
import { Tag } from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/route";
import { Empty } from 'vant';






const app =createApp(App)
// 好像不需要引入
app.use(NavBar);
app.use(Button);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Col);
app.use(Row);
app.use(Tag);
app.use(Empty);


// 3. 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router);
//挂载
app.mount('#app')




