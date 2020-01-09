<template>
    <div class="sidebar" v-if="screenoff">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="red" unique-opened router>
            <!-- <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu v-if="subItem.children" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template> -->



            <template v-for="item in items">
                <template v-if="item.route==0">
                     <el-submenu :index="item.id+''" :key="item.id">                         
                         <template slot="title">
                            <i :class="item.meta.icon"></i><span slot="title">{{ item.meta.title}}</span>
                        </template>
                        <template v-for="subItem in item.children">                          
                            <el-submenu v-if="subItem.children" :index="subItem.redirect" :key="subItem.redirect">
                                <template slot="title">{{ subItem.meta.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.redirect">
                                    {{ threeItem.title }}-{{threeItem.redirect}}
                                </el-menu-item>
                            </el-submenu>
                            
                            <el-menu-item v-else :index="subItem.name" :key="subItem.id">
                                {{ subItem.meta.title }}-{{subItem.redirect}}
                            </el-menu-item>
                        </template>
                     </el-submenu>
                </template> 
                <template v-else-if="item.route==1">                              
                    <el-menu-item :index="item.name" :key="item.id">
                        <i :class="item.meta.icon"></i><span slot="title">{{ item.meta.title }}</span>
                    </el-menu-item>
                </template>
            </template> 

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
                // items: [
                    
                //     {
                //         icon: 'el-icon-lx-cascades',
                //         index: '1',
                //         title: '用户管理',
                //         children: [
                //                 {
                //                     index: 'merchants',
                //                     title: '商家列表'
                //                 },
                //                 {
                //                     index:'customer',
                //                     title:'客户列表'
                //                 },                                 
                //              ]
                //     },
                //     {
                //         icon: 'el-icon-lx-global',
                //         index: 'order',
                //         title: '订单管理'
                //     },
                //     {
                //         icon: 'el-icon-folder-opened',
                //         index: '3',
                //         title: '分类管理',
                //         children: [
                            
                //                 {
                //                     index: 'index',
                //                     title: '商品管理'
                //                 },
                //                 {
                //                     index: 'administration',
                //                     title: '商品分类'
                //                 },
                //                 {
                //                     index: 'attribute',
                //                     title: '商品属性'
                //                 },
                //                 {
                //                     index: 'specifications',
                //                     title: '商品规格'
                //                 },
                                                              
                //              ]
                //     },
                //     {
                //         icon: 'el-icon-lx-cascades',
                //         index: '4',
                //         title: '消息中心',
                //         children: [
                //                 {
                //                     index: 'send',
                //                     title: '发送消息'
                //                 },
                //                 {
                //                     index: 'msgTemplate',
                //                     title: '消息模板'
                //                 },
                //                 {
                //                     index:'classification',
                //                     title:'新闻分类'
                //                 },   
                //                 {
                //                     index:'Journalismcenter',
                //                     title:'新闻中心'
                //                 },   
                //                 // {
                //                 //     index:'feedback',
                //                 //     title:'意见反馈'
                //                 // },                           
                //              ]
                //     },
                //     {
                //         icon: 'el-icon-lx-cascades',
                //         index: '6',
                //         title: '用户管理',
                //         children: [
                //                 {
                //                     index: 'user',
                //                     title: '用户列表'
                //                 },
                //                 {
                //                     index:'role',
                //                     title:'角色管理'
                //                 },   
                //                 {
                //                     index:'permissions',
                //                     title:'资源管理'
                //                 },                              
                //              ]
                //     },
                //     // {
                //     //     icon: 'el-icon-document',
                //     //     index: '7',
                //     //     title: '基础信息',
                //     //     children: [
                //     //             {
                //     //                 index: 'banner',
                //     //                 title: '商品轮播'
                //     //             },
                //     //             {
                //     //                 index:'img',
                //     //                 title:'其他图片'
                //     //             },                                
                //     //          ]
                //     // },
                //     {
                //         icon: 'el-icon-document',
                //         index: '8',
                //         title: '页面管理',
                //         children: [
                //                 {
                //                     index: 'navgrouping',
                //                     title: '导航分组管理'
                //                 },
                //                 {
                //                     index:'advertising',
                //                     title:'广告位管理'
                //                 },
                //                 {
                //                     index:'advertisingManagement',
                //                     title:'广告管理'
                //                 },
                //                 {
                //                     index:'navManagement',
                //                     title:'导航管理'
                //                 }, 
                //                 // {
                //                 //     index: 'markdown',
                //                 //     title: 'markdown编辑器'
                //                 // },  
                     
                //              ],
                   
                //     },
                    
                    
                // ],
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
            
            onRoutes(){
                console.log(this.$route.path,"5554889898")
                this.$router.push({
                    path:this.items.redirect
                });
                // return this.$route.path.replace('/home/','/');
            }
            
        },
        mounted () {
           this.items=JSON.parse(this.menu);
        //    this.items = this.menu
        },
        created(){
            // console.log(this.$router)
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
