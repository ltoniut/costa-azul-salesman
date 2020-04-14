import Vue from 'vue';
import App from './App';
import Destinations from './components/Destinations';
import Solution from './components/Solution';
import Consult from './components/Consult';
import Prices from './components/Prices';
import router from './router';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  components: { App, Destinations, Solution, Consult, Prices },
  template: '<App/>',
});

export default app;
