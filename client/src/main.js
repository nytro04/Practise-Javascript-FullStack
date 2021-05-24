import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./vee-validate";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
// Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

Vue.prototype.$confirm = async function () {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  return result.isConfirmed;
};

Vue.prototype.$toast = function (msg, icon = "success") {
  Toast.fire({
    icon: icon,
    title: msg,
  });
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
