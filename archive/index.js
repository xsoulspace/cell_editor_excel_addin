import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from 'vue';
import store from "./src/store.js";
import App from './src/App';

Vue.component('editor', require('./src/Editor'));

(Office.onReady(info => {
    new Vue({
      store,
      render: h => h(App),
    }).$mount('#app')
  })
)()
