<template>
    <div class="sidebar" v-if="screenoff">
        <el-menu class="sidebar-el-menu" :default-active="selectRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <!---->
                <template v-for="item in items">
                    <template v-if="item.route==0">
                        <el-submenu :index="'/home/'+item.redirect" :key="item.id">                         
                            <template slot="title">
                                <i :class="item.meta.icon"></i><span slot="title">{{ item.meta.title}}</span>
                            </template>
                            <template v-for="subItem in item.children">                          
                                <el-menu-item  :index="'/home/'+item.redirect+'/'+subItem.redirect" :key="subItem.id">
                                    {{ subItem.meta.title }}
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </template> 
                    <template v-else-if="item.route==1">                              
                        <el-menu-item :index="'/home/'+item.redirect" :key="item.id">
                            <i :class="item.meta.icon"></i><span slot="title">{{ item.meta.title }}</span>
                        </el-menu-item>
                    </template>
            </template> 
            <!---->
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import { mapState, mapMutations } from "vuex";
    export default {
        data() {
            return {
                collapse: false,
                screenoff:true,
                items:[],
            }    
        },
        props: ['screen'],
        watch:{
           screen:function(newdata,old)
                  {                    
                    this.screenoff=newdata;
                  }
        },
        computed:{
            ...mapState(["loginoff","token","menu"]),
              selectRoutes(){
                return this.$route.path;
            }
        },
        mounted () {
           this.items=JSON.parse(this.menu);
        //    this.items = this.menu
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;       
            });     
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
