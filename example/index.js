import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  el: '#root',
  router,
  template: '<App/>',
  components: { App }
})
