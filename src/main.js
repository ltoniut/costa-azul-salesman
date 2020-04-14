import Vue from 'vue';
import App from './App';
import './assets/style.css';
import Consult from './components/Consult';

/* eslint-disable no-new */

Vue.component('app-costa', Consult);

new Vue({
  el: '#app',
  render: h => h(App),
});
