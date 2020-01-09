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
                    <el-button type="info" icon="el-icon-delete" @click="batchdelete()">删除</el-button>
                </el-form-item>
            </el-form>
        <div class="table-main" >
            <el-table
              :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                align="center"
                width="55">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                sortable
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="classifyId"
                align="center"
                label="绑定分类">
              </el-table-column>
              <el-table-column
                prop="attributeSn"
                align="center"
                label="编码">
              </el-table-column>
              <el-table-column
                prop="date"
                label="排序"
                sortable
                align="center">
              </el-table-column>
              <el-table-column
                prop="othertag"
                align="center"
                label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- <el-button  type="primary" plain size="mini" >删除</el-button> -->
                        <el-button type="danger" plain size="mini" @click="edit(scope.row)">修改</el-button>
                        <!-- <el-button v-if="scope.row.status == '1'" type="success" plain size="mini">添加子类</el-button>
                        <el-button v-if="scope.row.status == '0'" type="warning" plain size="mini">参数设置</el-button> -->
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
      <div>
          <el-dialog title="添加属性" :visible.sync="dialogTableVisible">
            <el-form ref="form" label-width="120px" class="box_select">
                <el-form-item label="名称:">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="等级:">
                    <el-input v-model="level"></el-input>
                </el-form-item> -->
                <el-form-item label="绑定分类">
                    <el-select v-model="classifyId" clearable  filterable style="width:200px;" placeholder="选择或输入分类名称">
                        <el-option
                            v-for="item in attrnames"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="编码:">
                    <el-input v-model="attributeSn" ></el-input>
                </el-form-item>
                <el-form-item>
                     <el-button type="primary" @click="dialogTableVisible=false">取消</el-button>
                     <el-button type="success" @click="amend()">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
      </div>
      <div>
          <el-dialog title="编辑添加属性" :visible.sync="centerDialogVisible">
            <el-form ref="form" label-width="120px" class="box_select">
                <el-form-item label="名称:">
                    <el-input v-model="clssifyList.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="等级:">
                    <el-input v-model="level"></el-input>
                </el-form-item> -->
                <el-form-item label="绑定分类">
                        <el-select v-model="clssifyList.classifyId" clearable  filterable style="width:200px;" placeholder="选择或输入分类名称">
                            <el-option
                                v-for="item in attrnames"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item> 
                <el-form-item label="编码:">
                    <el-input v-model="clssifyList.attributeSn" ></el-input>
                </el-form-item>
                <el-form-item>
                     <el-button type="primary" @click="centerDialogVisible=false">取消</el-button>
                     <el-button type="success" @click="amendEidt()">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</div>

</template>
<script>
import {attr,clssify} from '../../assets/js/productcenter'
    export default {
        data() {
            return {
                dialogTableVisible: false,
                centerDialogVisible: false,
                multipleSelection:[],
                page:1,
                pageSize:10,
                total:0,
                currentPage:1,
                tableData: [],
                name:"",
                form:[{
                    name:'',
                    attributeSn:""
                }],
                attrnames:[],
                clssifyList:[],
                classifyId:'',
                classifySn:"",
                attributeSn:"",
            };
        },
        created() {
            this.attr();
        },
        methods: {
            attr(){
                let url = `${attr.attrPage}?pageNo=${this.currentPage}&pageSize=${this.pageSize}`;
                this.axios.get(url).then(res=>{
                    // console.log(res.data);
                    if(res.data.code==200){
                        this.tableData = res.data.result.records;
                        this.total = res.data.result.total;
                        this.administration()
                    }
                })
            },
            administration(){
                 let url = `${clssify.clssifyPage}`;
                 this.axios.get(url).then(res=>{
                     if(res.data.code==200){
                         this.attrnames = res.data.result.records;
                     }
                 })
             },
            handleSelectionChange(val){
                this.multipleSelection = val
            },
            // 添加
            amend() {
                let url = `${attr.attrAdd}`;
                this.form.forEach((index)=>{
                    index.name = this.name;
                    index.attributeSn = this.attributeSn
                })
                let data = {
                    classifyId:this.classifyId,
                    attrnames:this.form,
                }
                 this.axios.post(url,data).then(res=>{
                     if(res.data.code==200){
                         this.dialogTableVisible = false;
                         this.attr();
                         this.classifyId="";
                         this.attributeSn= "";
                         this.name="";
                     }
                 })
            },
            edit(item){
                this.centerDialogVisible = true;
                this.clssifyList = item
                // this.
            },
            // 修改
            amendEidt(){
                console.log(this.clssifyList,656565)
                 let url = `${attr.attrEdit}`;
                 this.axios.put(url,this.clssifyList).then(res=>{
                     if(res.data.code==200){
                         this.centerDialogVisible = false;
                         this.attr();
                         this.$message.success(res.data.message)
                     }
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
                url = `${attr.attrBach}?ids=${parm}`;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',
                      {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                          this.axios.delete(url).then((res) => {
                            if (res.data.code == 200) {
                                this.attr();
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

              }else {
                this.$message({
                  message: '至少选择一条数据!',
                  type: 'warning'
                });
              }
            
            },
            // 分页
            handleSizeChange(size){
                this.pageSize = size;
                this.attr()
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.attr()
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
    .layer {
        width: 580px;
        margin: 0 auto;
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