import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import {
  store
} from './store/store.js'

import {
  mapMutations,
  mapState
} from "vuex";
import VueI18n from 'vue-i18n';
import {
  messages
} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import {
  errors
} from './router/index.js';
import "babel-polyfill";
import '@/icons' // icon
import 'default-passive-events'
import {getData,getUrl,getCode,delall,deletes,getDates} from "./assets/js/Interface";
Vue.config.productionTip = false
Vue.use(VueI18n);
Vue.use(ElementUI, {
  size: 'small'
});
axios.defaults.baseURL = "http://129.211.88.251:888";
Vue.prototype.baseURL = "http://129.211.88.251:888";
Vue.prototype.axios = axios;
Vue.prototype.getData=getData;
// Vue.prototype.getUrl=getUrl;
Vue.prototype.deletes=deletes;
Vue.prototype.delall=delall;
Vue.prototype.getDates=getDates;
Vue.prototype.getCode=getCode;
const i18n = new VueI18n({
  locale: 'zh',
  messages
})
/**
 * 获取当前时间
 * 格式YYYY-MM-DD
 */
Vue.prototype.getNowFormatDate = function () {
  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var seperator1 = "-"

  //获取时分秒
  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();

  //检查是否小于10
  h = check(h);
  m = check(m);
  s = check(s);
  var currentdate = year + seperator1 + month + seperator1 + day + " " + h + ":" + m + ":" + s;
  return currentdate;
};

function check(i) {
  var num;
  i < 10 ? num = "0" + i : num = i;
  return num;
}


new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  computed: {
    ...mapState(["loginoff", "token"]),
  },
  methods: {
    ...mapMutations(["quits"]),
  },
  created() {
    var _this = this;
    var addrt = JSON.parse(sessionStorage.getItem("routeroff"));
    var routers = JSON.parse(sessionStorage.getItem("routers"));
    if (addrt && addrt == true) {
     let routerObj = routers[0];
      routerObj.children.map((val) => {
        val.component = () => import('@/'+val.componentName);
        if(val.children){
          val.children.map((subVal)=>{
            subVal.component = () => import('@/'+subVal.componentName);
          });
        }

      });
      routerObj.component = () => import('@/components/common/Home.vue');
      this.$router.addRoutes(routers.concat(errors));
    } else {
      this.$router.addRoutes(errors);
    }
    this.axios.interceptors.response.use((response) => { // ①10010 token半小时（30分） ②10011 token无效
        if (response.data.code === 501) {
          this.$message({
            showClose: true,
            message: '用户过期或有其它人在别处登录！',
            type: 'error',
            duration: 2000,
          });
          setTimeout(() => {
            this.$router.push({
              path: '/login'
            });
            sessionStorage.clear();
          }, 2000);
        } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
          Storage.localSet('token', response.data.token) // 覆盖原来的token(默认一天刷新一次)
        }
        return response

      },
      function (error) {
        console.log(error);
        return Promise.reject(error)

      })
    this.axios.interceptors.request.use(config => {
        let token = sessionStorage.getItem("token");
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.common['X-Access-Token'] = `${token}`
        }
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return config;
      },
      err => {
        return Promise.reject(err);
      }

    )
  }
}).$mount('#app')