<template>
  <div class="wrapper"  
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
     <div class="box">
        <el-form ref="form" label-width="120px" class="demo-form-inline" :inline="true">
            <!-- <el-form-item label="名称">
                <el-input v-model="input" placeholder="请输入内容"></el-input> 
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search()">查询</el-button>
            </el-form-item>  -->
            <el-form-item>
                <el-button type="success" icon="el-icon-circle-plus-outline" @click="dialogTableVisible=true">添加</el-button>
                <!-- <el-button type="info" icon="el-icon-delete" @click="batchdelete()">删除</el-button> -->
            </el-form-item>
        </el-form>
        <div class="table-main" >
            <el-table
              :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              align="center"
              row-key="id"
              border
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column
                prop="name"
                label="名称"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="level"
                align="center"
                label="级别">
              </el-table-column>
              <el-table-column
                prop="state"
                align="center"
                label="状态">
                <template slot-scope="scope">
                  <el-tag type="danger" v-if="scope.row.state=='0'">未启用</el-tag>  
                  <el-tag type="warning" v-if="scope.row.state=='1'">启用</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                label="排序"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="othertag"
                align="center"
                label="操作" 
                width="300px">
                    <template slot-scope="scope">
                        <el-button  type="primary" plain size="mini" @click="edit(scope.row)">修改</el-button>
                        <el-button type="danger" plain size="mini" @click="del(scope.row)">删除</el-button>
                        <el-button v-if="scope.row.state == '1'" type="success" plain size="mini" @click="disable(scope.row)">禁用</el-button>
                        <el-button v-if="scope.row.state == '0'" type="warning" plain size="mini" @click="disable(scope.row)">启用</el-button>
                    </template>
              </el-table-column>
            </el-table>
        </div>
        <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
         </div>
         <el-dialog title="添加分类" :visible.sync="dialogTableVisible">
            <el-form ref="form" label-width="120px" class="box_select">
                <el-form-item label="分类名称:">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <el-form-item label="等级:">
                    <el-input v-model="level"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <!-- <el-input v-model="roleCode"></el-input> -->
                    <el-select v-model="state" clearable placeholder="请选择">
                        <el-option
                        v-for="item in codeList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类编码:">
                    <el-input :rows="2" v-model="classifySn" ></el-input>
                </el-form-item>
                <el-form-item>
                     <el-button type="primary" @click="dialogTableVisible=false">取消</el-button>
                     <el-button type="success" @click="amend()">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="修改分类" :visible.sync="centerDialogVisible">
            <el-form ref="form" label-width="120px" class="box_select">
                <el-form-item label="分类名称:">
                    <el-input v-model="nameEdit"></el-input>
                </el-form-item>
                <el-form-item label="等级:">
                    <el-input v-model="levelEdit"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <!-- <el-input v-model="roleCode"></el-input> -->
                    <el-select v-model="stateEdit" clearable placeholder="请选择">
                        <el-option
                        v-for="item in codeList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类编码:">
                    <el-input :rows="2" v-model="classifySnEdit"></el-input>
                </el-form-item>
                <el-form-item>
                     <el-button type="primary" @click="centerDialogVisible=false">取消</el-button>
                     <el-button type="success" @click="open()">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


    </div>
  </div>
</div>

</template>
<script>
import { clssify } from '../../assets/js/productcenter'
    export default {
        data() {
            return {
                dialogTableVisible: false,
                centerDialogVisible: false,
                page:1,
                pageSize:10,
                total:0,
                currentPage:1,
                codeList:[
                    {code:"1",name:"启用"},
                    {code:"0",name:"未启用"},

                ],
                classifySn:"",
                level:"",
                name:"",
                state:"",
                tableData: [],
                // 修改
                classifySnEdit:"",
                levelEdit:"",
                nameEdit:"",
                stateEdit:"",
                id:""
            };
        },
        created() {
            this.administration()
        },
        methods: {
             administration(){
                 let url = `${clssify.clssifyPage}?pageNo=${this.currentPage}&pageSize=${this.pageSize}`;
                 this.axios.get(url).then(res=>{
                     if(res.data.code==200){
                         this.tableData = res.data.result.records;
                         this.total = res.data.result.total;
                     }
                 })
             },
            // 添加
            amend() {
                let url = `${clssify.clssifyAdd}`;
                let data = {
                    name:this.name,
                    level:this.level,
                    state:this.state,
                    classifySn:this.classifySn,
                }
                 this.axios.post(url,data).then(res=>{
                    //  console.log(res.data);
                     if(res.data.code==200){
                         this.dialogTableVisible = false;
                         this.administration();
                         this.name = "";
                         this.level = "";
                         this.state = "";
                         this.classifySn = ""
                     }
                 })
            },
            // 删除
            del(item){
                 let url = `${clssify.clssifyDelete}?id=${item.id}`;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete(url).then(res => {
                        // console.log(res)
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message);
                            this.administration();
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
            // 修改
            edit(item){
                // console.log(item)
                this.centerDialogVisible = true;
                this.classifySnEdit = item.classifySn;
                this.levelEdit = item.level;
                this.nameEdit = item.name;
                this.stateEdit = item.state;
                this.id = item.id;

            },
            open(){
                let url = `${clssify.clssifyEdit}`;
                let data = {
                    name:this.nameEdit,
                    level:this.levelEdit,
                    state:this.stateEdit,
                    classifySn: this.classifySnEdit,
                    id:this.id
                }
                 this.axios.put(url,data).then(res=>{
                    //  console.log(res.data);
                     if(res.data.code==200){
                         this.centerDialogVisible = false;
                         this.administration();
                         this.$message.success(res.data.message);
                     }
                 })
            },
            disable(item){
                if(item.state=="0"){
                    item.state = "1"
                }else if(item.state=="1"){
                    item.state = "0"
                }
                // console.log(item.state);
                let url = `${clssify.uppate}/${item.id}?state=${item.state}`;
                this.axios.put(url).then(res=>{
                    // console.log(res.data,555);
                    this.administration();
                })
            },
            // 批量删除 	
        //     batchdelete(item) {
        //      if (this.multipleSelection.length > 0) {
        //         let arrtemp = [], parm, url;
        //         this.multipleSelection.map((val) => {
        //           arrtemp.push(val.id);
        //         });
        //         parm = arrtemp.join(",");
        //         url = `${attr.attrBach}?ids=${parm}`;
        //         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',
        //               {
        //                 confirmButtonText: '确定',
        //                 cancelButtonText: '取消',
        //                 type: 'warning'
        //               }).then(() => {
        //                   this.axios.delete(url).then((res) => {
        //                     if (res.data.code == 200) {
        //                         this.role();
        //                         this.$message.success(res.data.message);
        //                     }
        //                 }).catch(err=>{
        //                     this.$message.error("服务器繁忙");
        //                 })
        //                 
        //               }).catch(() => {
        //                 this.$message({
        //                   type: 'info',
        //                   message: '已取消删除'
        //                 });
        //               });

        //       }else {
        //         this.$message({
        //           message: '至少选择一条数据!',
        //           type: 'warning'
        //         });
        //       }
            
        //     },
            handleSizeChange(size){
                this.pageSize = size;
                this.administration()
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.administration()
            },
        }
    };
</script>
<style type="text/css" scoped>
    .add {
        width: 98%;
        height: 43px;
        background-color: #F5FAFE;
        margin-top: 30px;
        display: flex;
        flex-direction: row-reverse;
    }
    .table-main {
        width: 98%;
        margin-top: 10px;
        text-align: center;
    }
    .dialog-img {
      display: flex;
    }
    .el-form-item__label {
      width: 101px !important;
    }
    .el-form-item__content {
      margin-left: 104px !important;
    }
    .dialog-img p {
      width: 87px;
      text-align: right;
    }
    .upload-demo {
      margin-left: 20px;
    }
    .has-gutter {
        background-color: #F5FAFE !important;
    }
    .el-table__body-wrapper {
        overflow: hidden;
        position: relative;
    }
    .el-input{
        width: 200px;
    }
</style>