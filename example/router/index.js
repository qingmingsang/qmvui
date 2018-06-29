import Vue from 'vue';
import Router from 'vue-router';
import Demo from '../pages/Demo';
import Doc from '../pages/Doc';

Vue.use(Router);

let demoRequire = require.context('../demos/', true, /.*\.vue$/);
const demos = demoRequire.keys().map((demoKey) => {
  return demoKey.split('./')[1].replace(".vue", "");
});

const demoRouters = demos.map(demo => {
  return {
    path: demo,
    name: demo,
    // component: resolve => {
    //   require.ensure([], () => resolve(require('../demos/' + demo)), demo)
    // },
    component: resolve => {
      require(['../demos/' + demo], resolve)
    }
    //component: require('../demos/' + demo)
  }
});

export default new Router({
  mode: 'history',
  //base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/demo'
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo,
      redirect: `/demo/${demoRouters[0].path}`,
      children: [...demoRouters]
    }
  ]
})
