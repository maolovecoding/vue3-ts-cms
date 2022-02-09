import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/index.less";
import { setupStore } from "./store";
import { formatTime } from "@/utils";

setupStore();
const app = createApp(App);
// 配置一个全局过滤器对象 可以包含多个过滤器
app.config.globalProperties.$filters = { formatTime };
// ep国际化 采用中文
app
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(store)
  .use(router)
  .mount("#app");
// console.log(process.env.VUE_APP_BASE_URL);
