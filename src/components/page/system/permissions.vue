<template>
  <div class="wrapper"
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="box-title">
              <h5>权限管理</h5>
          </div>
          <div class="sel-search">
            <el-form ref="form" label-width="120px" class="demo-form-inline" :inline="true">
                <el-form-item label="资源类型" class="getcode" ref="form">
                    <el-select v-model="status" clearable filterable style="width:220px;" @change="getStatus" >
                        <el-option
                            v-for="item in statusList"
                            :key="item.status"
                            :label="item.title"
                            :value="item.status"
                        >
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item label="资源名称">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item> 
                <el-form-item>
                    <el-button type="primary" @click="search()">查询</el-button> 
                </el-form-item>
                <el-form-item>
                    <el-button  @click="dialogTableVisible = true" type="success" >添加权限</el-button>
                    <el-button  @click="removed()" type="info" >删除权限</el-button>
                </el-form-item>
            </el-form>
          </div>
          <div class="table">
              <el-table
                :data="tableData"
                border
                @selection-change="handleSelectionChange"
                style="width: 100%">
                 <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="资源名称"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="url"
                    align="center"
                    label="页面接口地址"
                   >
                </el-table-column>
                <el-table-column
                    prop="redirect"
                    align="center"
                    label="路由地址">
                </el-table-column>
                <el-table-column
                    prop="icon"
                    label="图标"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    align="center">
                    <template  slot-scope="scope">
                        <span v-if="scope.row.type==0">菜单</span>
                        <span v-if="scope.row.type==1">页面</span>
                        <span v-if="scope.row.type==2">按钮</span>
                    </template>
                </el-table-column> 
                <el-table-column
                    prop="createTime"
                    label="日期"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    >
                    <template  slot-scope="scope">
                        <el-button @click="editor(scope.row)" type="text" size="small" class="deleat-a">编辑权限</el-button>
                        <el-button @click="deleted(scope.row)" type="text" size="small" class="deleat">删除权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加权限 -->
            <el-dialog title="添加权限" :visible.sync="dialogTableVisible">
                <el-form :model="ruleForm1" status-icon  ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="父级ID" prop="parentId">
                        <el-input type="text" v-model="ruleForm1.parentId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="资源名称" prop="name">
                        <el-input type="text" v-model="ruleForm1.name"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单权限编码" prop="perms">
                        <el-input type="text" v-model="ruleForm1.perms"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <!-- <el-input type="text" v-model="ruleForm1.type"></el-input> -->
                        <el-select v-model="ruleForm1.type" clearable filterable style="width:200px;" >
                            <el-option
                                v-for="item in statusList"
                                :key="item.status"
                                :label="item.title"
                                :value="item.status"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="等级" prop="grade">
                        <el-input type="text" v-model="ruleForm1.grade"></el-input>
                    </el-form-item>
                    <el-form-item label="页面接口地址" prop="url">
                        <el-input type="text" v-model="ruleForm1.url"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" class="" @click="addResources('ruleForm')">保存</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- 修改权限内容 -->
            <el-dialog title="修改权限内容" :visible.sync="modification">
                <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="父级ID" prop="parentId">
                        <el-input type="text"  v-model="ruleForm.parentId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="资源名称" prop="name">
                        <el-input type="text" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单权限编码" prop="perms">
                        <el-input type="text" v-model="ruleForm.perms"></el-input>
                    </el-form-item>
                    <el-form-item label="页面接口地址" prop="url">
                        <el-input type="text" v-model="ruleForm.url"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="页面接口地址" prop="age">
                        <el-input type="text" autocomplete="off"></el-input>
                    </el-form-item> -->
                    <el-form-item label="路由地址" prop="redirect">
                        <el-input type="text"  v-model="ruleForm.redirect" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" prop="icon">
                        <el-input type="text"  v-model="ruleForm.icon" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type" required>
                        <!-- <el-input type="text"  v-model="ruleForm.type"  autocomplete="off"></el-input> -->
                        <el-select v-model="ruleForm.type" clearable filterable style="width:200px;" >
                            <el-option
                                v-for="item in statusList"
                                :key="item.status"
                                :label="item.title"
                                :value="item.status"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="" @click="submitForm('ruleForm')">保存</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                    </el-form-item>
                </el-form>
            </el-dialog>
          </div>
          <!-- 分页 -->
          <div>
               <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="current"
                    :page-sizes="[10,20,100, 200, 300, 400]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
          </div>
      </div>
      
    </div>  
  </div>

</template>
<script>
import {permissions} from '../../../assets/js/Interface'
export default {
  data() {
    return {
      tableData:[],
      form:{
        name:"",
        type:''
           
      },
      input:"",
      dialogTableVisible:false,
      dialogFormVisible:false,
      modification:false,
      gridData: [{
          name: '供应商',
          address: ''
        }, {
          name: '采购商',
          address: ''
        }],
        ruleForm1:{
            name:"",
            grade:"",//等级
            perms:"",//菜单编码
            url:'',
            type:"",
            redirect:"",
            icon:"",
            id:'',
            parentId:""
        },
        status:"",
        statusList:[
            {title:"菜单",status:0},
            {title:"页面",status:1},
            {title:"按钮",status:2}
        ],
        ruleForm:{},
        multipleSelection:[],
        current:1,
        pages:1,
        size:10,
        total:0,
        
    };
  },
  created() {
      this.getPermissionByRole()
  },

  methods: {
    //   权限
    getPermissionByRole(){
        let url =`${permissions.permissionsPage}?pageNo=${this.current}&pageSize=${this.size}`;
        this.axios.get(url).then(res=>{
            if(res.data.code==200){
                this.tableData = res.data.result.records;
                this.total = res.data.result.total;
                this.pages = res.data.result.pages
                
            }else{
                this.$message.error(res.data.message);
                
            }
        }).catch(err=>{
            this.$message.error("服务器繁忙");
        })
    },
    getStatus(){

    },
    // 查询
    search(){
        let url =`${permissions.permissionsPage}?pageNo=${this.current}&pageSize=${this.size}`;
        this.form.name = `${this.input}`;
        // this.form.type
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
    // 删除权限
    deleted(item){
        let urls = `${permissions.permissionsDelete}?id=${item.id}`
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete(urls).then(res=>{
              if(res.data.code==200){
                  this.$message.success(res.data.message);
                  if(this.tableData ==[]){
                   this.current=this.current-1 
                }
                  this.getPermissionByRole();
              }
          }).catch(err=>{
              this.$message.error("服务器繁忙");
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 编辑
    editor(item){
        this.modification = true;
        this.ruleForm = item;
        console.log(this.ruleForm)
    },
    // 提交编辑
    submitForm(){
        let urls = `${permissions.permissionsEdit}`;
        this.axios.put(urls,this.ruleForm).then(res=>{
            console.log(res)
            if(res.data.code==200){
                this.modification = false;
                this.getPermissionByRole();
                 this.$message.success(res.data.message)

            }else{
                this.$message.error(res.data.message)
            }
        }).catch(err=>{
            this.$message.error("服务器繁忙")
        })
    },
    // 确定添加
    addResources(){
        this.axios.post(`${permissions.permissionsAdd}`,this.ruleForm1).then(res=>{
            console.log(res.data)
            if(res.data.code==200){
                this.dialogTableVisible=false;
                this.ruleForm.grade = "";
                this.ruleForm.perms = "";
                this.ruleForm.url = "";
                this.ruleForm.type = "";
                this.ruleForm.name = "";
                this.ruleForm.parentId = ""
                this.getPermissionByRole();
            }
        }).catch(err=>{
            this.$message.error("服务器繁忙")
        })
    },
    // 每页多少条
    handleSizeChange(size) {
        this.size = size;
        this.getPermissionByRole()
        // console.log(`每页 ${val} 条`);
    },
    // 当前页
    handleCurrentChange(val) {
        this.current = val;
        this.getPermissionByRole()
        // console.log(`当前页: ${val}`);
    },
    // 多选框
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 批量删除
    removed(){
        if (this.multipleSelection.length > 0) {
        let arrtemp = [], parm, url;
        this.multipleSelection.map((val) => {
          arrtemp.push(val.id);
        });
        parm = arrtemp.join(",");
        url = `${permissions.deleteBatch}?ids=${parm}`;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  this.axios.delete(url).then((res) => {
                    if (res.data.code == 200) {
                        this.getPermissionByRole();
                        this.$message.success(res.data.message);
                    }
                }).catch(err=>{
                    this.$message.error("服务器繁忙");
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });

      }
      else {
        this.$message({
          message: '至少选择一条数据!',
          type: 'warning'
        });
      }
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
    .deleat>>>span{
        color: #666
    }
    .demo-ruleForm {
        width: 350px;
        margin-left: 26%;
    }
    .box-add {
        width: 100%;
        height: 60px;
    }
    .add-button {
        float: right;
        margin-right: 100px;
    }
    .el-input{
        width: 200px;
    }
</style>
