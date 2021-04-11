import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSticky from "vue-sticky";

Vue.config.productionTip = false;
Vue.directive("sticky", VueSticky);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
