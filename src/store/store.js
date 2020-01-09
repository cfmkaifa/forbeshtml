import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state:{
        'loginoff':sessionStorage.getItem("loginoff")?sessionStorage.getItem("loginoff"):false,
        'useinfo':sessionStorage.getItem("useinfo")?sessionStorage.getItem("useinfo"):"",  //登录成功后的用户信息 
        'token':sessionStorage.getItem('token')?sessionStorage.getItem('token'):"",
        'routeroff':sessionStorage.getItem('routeroff')?sessionStorage.getItem('routeroff'):false,
        'routers':sessionStorage.getItem('routers')?sessionStorage.getItem('routers'):"",
        'menu':sessionStorage.getItem('menu')?sessionStorage.getItem('menu'):"",
       },
    mutations:{
        loginQuit(state)
        {        
             state.menus="";
             state.loginoff=false;
             sessionStorage.clear(); 
        },
        seinfo(state,usename)
        {
            state.loginoff=true,
            sessionStorage.setItem("loginoff",true);
            var obj={}           
        },
        savauseinfo(state,useinfo){ 
            let temp=JSON.stringify(useinfo);        
            state.useinfo =useinfo;
            sessionStorage.setItem("useinfo",temp);
          },
        savetoken(state,parm){
            state.token=parm;  
            sessionStorage.setItem('token',parm);
        },
        saverouters(state,parm)
        {
            state.routers=parm; 
            let nparm=JSON.stringify(parm); 
            sessionStorage.setItem('routers',nparm);
        },
        setrouteoff(state){
            state.routeroff=true;
            sessionStorage.setItem('routeroff',true);
        },
        getroutes(state)
        {
          return state.routers;
        },
        getrouteoff(state)
        {
            return state.routeroff
        },
        setmenu(state,parm) //保存菜单
        {
           let parms=JSON.stringify(parm);
           state.menu=parms           
           sessionStorage.setItem("menu",parms);
        },
        getmenu(state)
        {
           console.log(state.menu);
          return state.menu;  
        }
    },
    getters:{

    },
    actions:{

    }
})