import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/index.less";
import { setupStore } from "./store";

setupStore();
createApp(App)
  // ep国际化 采用中文
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(store)
  .use(router)
  .mount("#app");
// console.log(process.env.VUE_APP_BASE_URL);
