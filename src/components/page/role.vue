<template>
  <div class="wrapper"
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="box-title">
              <h5>角色管理</h5>
          </div>
          <div class="sel-search">
            <el-form ref="form" label-width="120px" class="demo-form-inline" :inline="true">
                <el-form-item label="角色名称">
                    <el-input v-model="input" placeholder="请输入内容"></el-input> 
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search()">查询</el-button>
                </el-form-item> 
                <el-form-item>
                    <el-button type="success" icon="el-icon-circle-plus-outline" @click="dialogTable = true">添加角色</el-button>
                    <el-button type="info" icon="el-icon-delete" @click="batchdelete()">删除角色</el-button>
                </el-form-item>
            </el-form>
          </div>
          <div class="table">
              <el-table
                :data="tableData"
                border
                ref="multipleTable"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        align="center"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="roleName"
                        align="center"
                        label="角色名称">
                    </el-table-column>
                    <el-table-column
                        prop="description"
                        align="center"
                        label="角色描述">
                    </el-table-column>
                    <el-table-column
                        prop="roleCode"
                        align="center"
                        label="角色编码">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        align="center"
                        >
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        >
                        <template  slot-scope="scope">
                            <el-button @click="amenddemand(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="permissionEdit(scope.row)" type="text" size="small">授权</el-button>
                            <el-button  type="text" @click="deleterole(scope.row)" size="small" class="deleat-a">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 添加角色 -->
                <el-dialog title="添加角色" :visible.sync="dialogTable">
                    <el-form ref="form" label-width="120px" class="box_select">

                        <el-form-item label="角色名：">
                            <el-input v-model="roleName" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="角色编码：">
                            <!-- <el-input v-model="roleCode" placeholder="请输入内容"></el-input> -->
                            <el-select v-model="roleCode" clearable placeholder="请选择">
                                <el-option
                                v-for="item in codeList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="角色描述：">
                            <el-input type="textarea" :rows="2" v-model="description" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="addrole">确定</el-button>
                            <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加分类</el-button> -->
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <!-- 编辑角色 -->
                <el-dialog title="修改角色" :visible.sync="dialogTableVisible">
                    <el-form ref="form" label-width="120px" class="box_select">

                        <el-form-item label="角色名：">
                            <el-input v-model="roleNames"></el-input>
                        </el-form-item>
                        <el-form-item label="角色编码：">
                            <!-- <el-input v-model="roleCode"></el-input> -->
                            <el-select v-model="roleCoden" clearable placeholder="请选择">
                                <el-option
                                v-for="item in codeList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="角色描述：">
                            <el-input type="textarea" :rows="2" v-model="descriptions"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="amend()">确定</el-button>
                            <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加分类</el-button> -->
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <!-- 角色授权 -->
                <el-dialog title="角色授权" :visible.sync="authorizationt">
                    <div>
                        <!-- <el-row>
                            <el-col :span="8"> -->
                            <el-tree
                                show-checkbox
                                ref="tree"
                                :data="treedata"
                                :props="defaultProps"
                                :render-content="renderContent"
                                node-key="key"
                                default-expand-all
                                :default-checked-keys="cheakarr"
                                @node-click="nodeClick"
                                @check="checkChang"
                            ></el-tree>
                            <!-- </el-col> -->
                            <!-- <el-col :span="16">
                            <template v-if="cheakbox">
                                <div class="roletitle">{{roleTile}}</div>
                                <div class="rolecontent">
                                <template v-if="cheakboxcont">
                                    <el-checkbox-group v-model="allPermission" @change="handleCheckedCitiesChange">
                                    <el-checkbox
                                        v-for="item in cities"
                                        :label="item.key"
                                        :index="item.key"
                                        :key="item.key"
                                    >{{item.title}}</el-checkbox>
                                    </el-checkbox-group>
                                </template>
                                <template v-else>
                                    <div>请到资源管理里边配置页面对应的按钮！</div>
                                </template>
                                </div>
                            </template>
                            </el-col> -->
                        <!-- </el-row> -->
                        </div>
                        <div slot="footer" class="footer">
                        <el-button size="mini" @click="handlecal">取消</el-button>
                        <el-button type="primary" size="mini" @click="updataPermission()">保存</el-button>
                        </div>
                </el-dialog>
        </div>
                <!-- 分页  -->
                <div>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current" :page-sizes="[10,20,100, 200, 300, 400]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
</div>

</div>
</div>

</template>
<script>
import {role} from '../../assets/js/Interface'
let cityOptions = [
  "编辑",
  "添加",
  "删除",
  "编辑1",
  "添加1",
  "删除1",
  "编辑2",
  "添加2",
  "删除2",
  "编辑3",
  "添加3",
  "删除3",
  "编辑4",
  "添加4",
  "删除4"
];
    export default {
        data() {
            return {
                flag: false,
                tableData: [],
                dialogTableVisible: false,
                // 授权
                authorizationt: false,
                // 添加
                dialogTable: false,
                input: "",
                isIndeterminate: true,
                checkAll: false,
                gridData: [],
                form:{
                    name:""
                },
                // 分页
                current: 1,
                pages: 1,
                name: "",
                size: 10,
                type: "",
                total: 0,
                // 删除id
                id: "",
                // 授权
                treedata: [],
                cheakarr: [],
                roleidData:[],
                roleTile:"",
                nowpareId: "",
                cheakbox:false,
                roleid: "",
                defaultProps: {
                children: 'children',
                label: 'label'
                },
                cities:cityOptions,
                allPermission: [],
                cheakboxcont:'',
                // 添加角色 角色描述 角色编码 角色名称
                description: "",
                roleCode: "",
                roleName: "",
                descriptions: "",
                roleCoden: "",
                roleNames: "",
                // 批量删除
                multipleSelection:[],
                // 查询
                permissionId:{},
                delnode:[],
                // 角色编码
                codeList:[]
            };
        },
        created() {
            this.role();
            this.roleCodes()
        },
        computed:{
             cheaks: function() {
                return this.cheakarr;
            }
        },
        methods: {
            //   分页查询角色 
            role() {
                let url = `${role.rolePage}?pageNo=${this.pages}&pageSize=${this.size}`;
                let data = {
                    size: this.size,
                    pages: this.pages,
                    total: this.total,
                }
                this.axios.get(url, data).then(res => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.result.records;
                        this.pages = res.data.result.pages;
                        this.size = res.data.result.size;
                        this.total = res.data.result.total;
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch(err => {

                    this.$message.error("服务器繁忙")
                })
            },
            // 查询 	/user/user-by-name
            search(){
                let url =`${role.rolePage}?pageNo=${this.current}&pageSize=${this.size}`;
                this.form.name = `${this.input}`
                // let data = JSON.parse(this.form)
                console.log(this.form,666)
                this.axios.get(url,{params:this.form}).then(res=>{
                    if(res.data.code==200){
                        this.tableData = res.data.result.records;
                        this.total = res.data.result.total;
                        // this.current = res.data.result.current
                        
                    }else{
                        this.$message.error(res.data.message);
                        
                    }
                }).catch(err=>{
                    this.$message.error("服务器繁忙");
                })
            },
            // 添加角色  
            addrole() {
                let url = `${role.roleAdd}`;
                let data = {
                    description: this.description,
                    roleCode: this.roleCode,
                    roleName: this.roleName,
                }
                this.axios.post(url, data).then(res => {
                    if(res.data.code==200){
                        this.dialogTable = false
                        this.role();
                        this.$message.success(res.data.message);
                        this.description = "";
                        this.roleCode = "";
                        this.roleName = "";
                    }
                    
                }).catch(err=>{
                    this.$message.error("服务器繁忙")
                })
            },
            // 修改角色 先查询 sysRole=${item.description}
            amenddemand(item) {
                console.log(item)
                this.descriptions=item.description
                this.roleCoden=item.roleCode;
                this.roleNames=item.roleName;
                this.id=item.id;
                this.dialogTableVisible = true
            },
             // 修改角色 后修改
            amend() {
                let url =`${role.edit}`;
                let data = {
                    description: this.descriptions,
                    roleCode: this.roleCoden,
                    roleName: this.roleNames,
                    id:this.id,
                }
                this.axios.put(url,data).then(res => {
                    
                    if(res.data.code==200){
                        this.dialogTableVisible = false;
                        this.role();
                        this.$message.success(res.data.message);
                    }else{
                       this.$message.error(res.data.message); 
                    }
                }).catch(err=>{
                    this.$message.error("服务器繁忙"); 
                })
            },
            headNodeClick (){   
                let url = `${role.permissions}?roleId=${this.roleid}`;
                // let roleCheak = []
                this.axios.get(url).then(res=>{
                    // console.log(res.data.result,5454554)
                    if(res.data.code==200){
                        res.data.result.forEach((val,index)=>{
                            this.delnode.push(res.data.result[index].permissionId)
                        })
                        
                      this.getcheckedNode = [...this.cheakarr];
                    }
                })
                    
            },
            // 授权 /role/grant-role/{roleId} 
            permissionEdit(val) {
                //弹出窗口角色授权
               this.headNodeClick()
                this.roleid = val.id;
                this.authorizationt = true;
                const queryRolePermission = () => {
                    return new Promise((resolve, reject) => {
                    let url = `${role.tree}?roleId=${this.roleid}`;
                    this.axios.get(url).then(res => {
                        // console.log(res.data);
                        if(res.data.code == 200){
                            this.treedata = res.data.result.treeList
                        }
                        
                        })
                        .catch(errore => {
                        console.log(errore);
                        });
                    });
                };
                
                const creatTree = data => {
                    this.$refs.tree.setCheckedKeys([]);
                    this.cheakarr = Object.assign([], data);
                    this.delnode.map(vals => {
                    this.cheakarr.map((val, index) => {
                        if (vals == val) {
                        this.paretTree.push(vals);
                        this.off = true;
                        this.cheakarr.splice(index, 1);
                        }
                    });
                    });

                    this.getcheckedNode = [...this.cheakarr];
                };
                const Async = async () => {
                    let query = await queryRolePermission();
                    this.allPermission = query;
                    creatTree(query);
                };
                Async();
            }, 	
            checkChang(
                    val,
                    data,
                    data2 //获取选中的值
                ) {
                    let temp = [];
                    this.off = false;
                    data.checkedNodes.map(val => {
                        temp.push(val.key);
                        val.parentId != undefined && temp.push(val.parentId);
                });
                     this.getcheckedNode = temp;
            },
                //树型点击事件
            nodeClick(data,val,arr) {
                console.log(val,55)
                this.treesel = val.slotTitle;
                this.cheakbox = val.icon == "el-icon-lx-file" ? false : true;
                // let url = `/role/role-permissions-role-id?roleId=${val.key}`;
                // this.nowpareId = val.key;
                // this.axios.get(url).then(res => {
                //     if (res.data.code == 200) {
                //         console.log(res)
                //     cityOptions = res.data.result;
                //     this.cities = [...cityOptions];

                //     this.cheakboxcont = this.cities.length > 0 ? true : false;
                //     } else if (res.data.code == 500) {
                //     this.cities = [];
                //     this.cheakboxcont = this.cities.length > 0 ? true : false;
                //     }
                // });
            },
            renderContent(h, { node, data, store }) {
                //树形的图标
                return (
                    <span>
                    <i class={data.icon}></i>
                    <span style="padding-left: 4px;">{node.label}</span>
                    </span>
                );
            },

            handlecal() {
                this.authorizationt = false;
                this.cheakbox = false;
            },
            //选择事件
            handleCheckedCitiesChange(value ) {
                if (value.length > 0) {
                    let selid = [...this.allPermission, ...value];
                    selid.push(this.nowpareId);
                    const uniqueSet = new Set(selid);
                    selid = [...uniqueSet];
                    this.allPermission = [...selid];
                } else {
                    this.allPermission.find((res, index) => {
                    if (res == this.nowpareId) {
                        this.allPermission.splice(index, 1);
                    }
                    });
                }
                    let checkedCount = value.length;
                    // this.checkAll = checkedCount === this.cities.length;
                    this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
                    console.log(checkedCount)
            },

            updataPermission(){
                console.log(this.cheakarr,"baoc");
                console.log(this.getcheckedNode,"x")
                this.cheakarr = this.getcheckedNode;
                let _this = this;
                function recursion(json) {
                    for (let i = 0; i < json.length; i++) {
                    if (json[i].leaf == false) {
                        _this.allPermission.map((res, index) => {
                        if (res == json[i].key) {
                            _this.allPermission.splice(index, 1);
                        }
                        });

                        recursion(json[i].children);
                    } else {
                        _this.allPermission.map((res, index) => {
                        if (res == json[i].key) {
                            _this.allPermission.splice(index, 1);
                        }
                        });
                    }
                    }
                }
                recursion(this.treedata[0].children);
                // console.log(this.getcheckedNode,1111)
                let parms = this.off ? [...this.getcheckedNode, ...this.allPermission, ...this.paretTree] : [...this.getcheckedNode, ...this.allPermission];
                const uniqueSet = new Set(parms);
                parms = [...uniqueSet];
                let permissionDtos = [];
                parms.forEach((permisstionId)=>{
                    let permissionObj = {
                        permissionId:permisstionId
                    }
                    permissionDtos[permissionDtos.length] = permissionObj;
                });
                let data = {
                        permissionDtos:permissionDtos

                }
                let url = `${role.grant}/${this.roleid}`;
                // console.log(data);
                this.axios.post(url,data).then(res => {
                    // console.log(res)
                    if(res.data.code==200){
                        this.$message.success(res.data.message);
                        this.authorizationt = false;
                        this.role();
                        this.cheakbox = false;
                    } else if (res.data.code == 500) {
                        this.$message.error(res.data.message);
                    }
                   
                });
            },

            // 删除角色
            deleterole(item) {
                let url = `${role.delete}?id=${item.id}`;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete(url).then(res => {
                        console.log(res)
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message);
                            this.role();
                        }
                    }).catch(err => {
                        this.$message.error("服务器繁忙")
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            roleCodes(){
                let url = `${role.roleCodes}`
                this.axios.get(url).then(res => {
                    console.log(res.data.result)
                    if (res.data.code == 200) {
                        this.codeList = res.data.result;
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch(err => {

                    this.$message.error("服务器繁忙")
                })
            },
            // 批量删除 	
            batchdelete(item) {
                 if (this.multipleSelection.length > 0) {
                        let arrtemp = [], parm, url;
                        this.multipleSelection.map((val) => {
                          arrtemp.push(val.id);
                        });
                        parm = arrtemp.join(",");
                        url = `${role.deleteBatch}?ids=${parm}`;
                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',
                              {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                              }).then(() => {
                                  this.axios.delete(url).then((res) => {
                                    if (res.data.code == 200) {
                                        this.role();
                                        this.$message.success(res.data.message);
                                    }
                                }).catch(err=>{
                                    this.$message.error("服务器繁忙");
                                })
                                
                              }).catch(() => {
                                this.$message({
                                  type: 'info',
                                  message: '已取消删除'
                                });
                              });

                      }
                      else {
                        this.$message({
                          message: '至少选择一条数据!',
                          type: 'warning'
                        });
                      }
              
            },
            // 每页多少条
            handleSizeChange(size) {
                this.size = size;
                this.role()
                // console.log(`每页 ${val} 条`);
            },
            // 当前页
            handleCurrentChange(pages) {
                this.pages = pages;
                this.role()
                // console.log(`当前页: ${val}`);
            },
            // 复选框
            handleSelectionChange(val){
                this.multipleSelection = val
            }
        }
    };
</script>
<style type="text/css" scoped>
    .table {
        width: 95%;
        min-width: 1100px;
        margin: 0 auto;
    }
    .deleat-a>>>span {
        color: red;
    }
    .el-input{
        width: 200px;
    }
</style>