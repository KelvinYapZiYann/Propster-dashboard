/*!

=========================================================
* Vue White Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-white-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-white-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import VueRouter from "vue-router";
import SocialSharing from "vue-social-sharing";
import VueGitHubButtons from "vue-github-buttons";
import "vue-github-buttons/dist/vue-github-buttons.css";
import App from "./App.vue";
import "@/assets/scss/white-dashboard.scss";
import "@/assets/css/nucleo-icons.css";
import "@/assets/demo/demo.css";

import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import RTLPlugin from "./RTLPlugin";
import Notify from "@/components/NotificationPlugin";
import i18n from "./i18n";
import SideBar from "@/components/SidebarPlugin";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import './registerServiceWorker'
import VueMeta from 'vue-meta'

// element ui language configuration
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import store from "./store";
import RouterPrefetch from 'vue-router-prefetch'

locale.use(lang);

Vue.config.productionTip = false;

import router from "./routers/index";

Vue.use(Element);

Vue.use(VueRouter);
// Vue.use(RouterPrefetch);
Vue.use(SocialSharing);
Vue.use(VueGitHubButtons, { useCache: true });
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(RTLPlugin);
Vue.use(SideBar);
Vue.use(Notify);
Vue.use(VueMeta, { keyName: 'head' })

new Vue({
  store: store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
