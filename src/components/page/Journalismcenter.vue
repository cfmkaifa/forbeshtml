<template>
  <div class="wrapper"
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="title1">
              <el-form ref="form" label-width="100px" class="box_select">
                    <el-form-item label="新闻分类" >
                          <!-- <el-select v-model="value" placeholder="请选择"  class="title1-select">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> -->
                            <el-select v-model="value" clearable placeholder="请选择">
                                <el-option
                                v-for="item in releaseList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                    </el-form-item> 
                    <el-form-item label="标题名称">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </el-form-item> 
                    <el-form-item>
                       <el-button type="success" @click="search()">搜索</el-button>
                       <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加新闻</el-button>
                    </el-form-item>
            </el-form>
          </div>
          <div class="add">
              <el-dialog title="添加新闻" :visible.sync="dialogVisible" width="75%">
                    <div class="dialog-form">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="新闻标题">
                                <el-input type="input" v-model="form.title" placeholder="新闻标题（限制100字以内）"></el-input>
                            </el-form-item>
                            <el-form-item label="新闻分类">
                                <el-select v-model="form.typeId" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in releaseList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                             <!-- <el-form-item label="新闻标题">
                                <el-input type="input" v-model="form.name" placeholder="新闻标题（限制100字以内）"></el-input>
                            </el-form-item> -->
                            <!-- <el-form-item label="发布状态">
                                <el-select v-model="form.resource" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in releaseList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
                        
                    </el-form>
                    <div class="edit_container">
                        <!--  新增时输入 -->
                        <quill-editor 
                            v-model="form.content" 
                            ref="myQuillEditor" 
                            :options="editorOption" 
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                        </quill-editor>
                        <!-- 从数据库读取展示 -->
                        <div v-html="str" class="ql-editor">
                            {{str}}
                        </div>
                    </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="determineAdd()">确 定</el-button>
                    </span>
               </el-dialog>
          </div>
          <div class="table">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID"
                    align="center"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="新闻分类"
                    align="center"
                    width="150">
                </el-table-column>
                <!-- <el-table-column
                    prop="address"
                    align="center"
                    label="新闻来源">
                </el-table-column> -->
                <el-table-column
                    prop="title"
                    align="center"
                    label="新闻标题">
                </el-table-column>
                <el-table-column
                    prop="releaseTime"
                    align="center"
                    label="添加时间">
                </el-table-column>
                <el-table-column
                    prop="releaseStatus"
                    align="center"
                    label="状态"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag type="warning" v-if="scope.row.releaseStatus =='0'">待审核</el-tag>
                        <el-tag type="danger" v-if="scope.row.releaseStatus =='1'">未发布</el-tag>
                        <el-tag type="primary" v-if="scope.row.releaseStatus =='2'">已发布</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button type="danger" plain size="mini" v-if="scope.row.releaseStatus =='2'" @click="stopRelease(scope.row)">停止发布</el-button>
                        <el-button type="success" plain size="mini" v-if="scope.row.releaseStatus =='1'" @click="release(scope.row)">发布</el-button>
                        <el-button type="success" plain size="mini" v-if="scope.row.releaseStatus =='0'" @click="audit(scope.row)">审核</el-button>
                        <el-button type="primary" plain size="mini" @click="edit(scope.row)">修改</el-button>
                        <el-button type="warning" plain size="mini" @click="details(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <div>
               <el-dialog title="详情" :visible.sync="dialog" width="75%">
                   <el-form ref="tableList" :model="tableList" >
                      <div>
                           <h3 class="detailsTitle">{{tableList.title}}</h3>
                           <h4 class="detailsTitle details">{{tableList.releaseTime}}</h4>
                           <div class="detailsContent">
                              <p>{{tableList.content}}</p>
                           </div>
                      </div>
                   </el-form>
               </el-dialog>
          </div>
          
        <el-dialog title="修改新闻" :visible.sync="dialogVisibleEdit" width="75%">
            <div class="dialog-form">
                <el-form ref="form" :model="newsForm" label-width="80px">
                <el-form-item label="特殊资源">
                    <!-- <el-radio-group v-model="newsForm.releaseStatus">
                        <el-radio>{{newsForm.name}}</el-radio> 
                    </el-radio-group> -->
                    <el-select v-model="newsForm.name" clearable placeholder="请选择">
                        <el-option
                        v-for="item in releaseList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻标题">
                    <el-input type="input" v-model="newsForm.title" placeholder="新闻标题（限制100字以内）"></el-input>
                </el-form-item>
            </el-form>
            <div class="edit_container">
                <!--  新增时输入 -->
                <quill-editor 
                    v-model="newsForm.content" 
                    ref="myQuillEditor" 
                    :options="editorOption" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                </quill-editor>
                <!-- 从数据库读取展示 -->
                <div v-html="str" class="ql-editor">
                    {{str}}
                </div>
            </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="determine()">确 定</el-button>
            </span>
        </el-dialog>
          
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
      </div>
      
    </div>  
  </div>

</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import {news,newsType} from '../../assets/js/message'
export default {
  data() {
    return {
        // 富文本
        content: "",
        str: '',
        editorOption: {},

        options: [],
        value: '',
        input:'',
        dialogVisible: false,
        dialog:false,
        dialogVisibleEdit:false,
        form: {
          title: '',
          typeId: '',
          content:'',
          
        },
        // 表格
        tableData: [],
        page:1,
        pageSize:10,
        total:0,
        currentPage:1,
        tableList:{},
        // 改
        newsForm:{},
        releaseList:[],
    };

  },
  created() {
      this.news();
      this.newsType()
  },
  computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
  },
  components: {
    quillEditor
  },
  mounted(){
    let content = '';  // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content);
    // console.log(this.str)
    
  },
  methods: {
       news(){
           let url = `${news.page}?pageNo=${this.currentPage}&pageSize=${this.pageSize}`;
           this.axios.get(url).then(res=>{
               if(res.data.code==200){
                   this.tableData = res.data.result.records;
                   this.total = res.data.result.total
               }

           })
       },
       newsType(){
           let url = `${newsType.typePage}`;
           this.axios.get(url).then(res=>{
               if(res.data.code==200){
                   this.releaseList = res.data.result.records;
               }
           })
       },
       // 分页
        handleSizeChange(size){
            this.pageSize = size;
            this.news()
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.news()
        },
        // 改
       edit(item){
           this.dialogVisibleEdit = true;
           console.log(item,666)
           this.newsForm = item;
        },

        // 确定改
        determine(){
            let url = `${news.edit}`;
            this.axios.put(url,this.newsForm).then(res=>{
                if(res.data.code==200){
                    this.dialogVisibleEdit = false;
                    this.news()
                }
                 
            })
        },
        // 详情
        details(item){
            this.dialog = true;
            this.tableList = item;
            
        },
        // 增
        determineAdd(){
            let url = `${news.add}`;
            this.axios.post(url,this.form).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.dialogVisible = false;
                    this.$message.success(res.data.message);
                    this.news();
                    this.form = {}
                }
            })
        },
        // 查
        search(){
            let url = `${news.page}?pageNo=${this.currentPage}&pageSize=${this.pageSize}`;
            let data = {
                typeId:this.value,
                title:this.input
            }
            this.axios.get(url,{params:data}).then(res=>{
                if(res.data.code==200){
                    this.tableData = res.data.result.records;
                    this.total = res.data.result.total
                }

            })
        },
        stopRelease(item){
            
            this.$confirm('此操下架新闻, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let url = `${news.withdraw}/${item.id}`;
                this.axios.put(url,{id:item.id}).then(res=>{
                    this.news()
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消下架'
            });          
            });

        },
        audit(item){
             this.$confirm('此操通过审核, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let url = `${news.examine}/${item.id}`;
                this.axios.put(url,{id:item.id}).then(res=>{
                    this.news()
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消通过审核'
            });          
            });
        },
        release(item){
            this.$confirm('此操上架新闻, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let url = `${news.release}/${item.id}`;
                this.axios.put(url,{id:item.id}).then(res=>{
                    this.news()
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消上架'
            });          
            });
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        // 转码
        escapeStringHTML(str) {
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            return str;
        }
  }
};
</script>
<style type="text/css" scoped>
    .box_select {
        /* width: 180px; */
        display: flex;
    }
    .title1 {
        margin-top: 15px;
    }
    .title1-select {
        width: 100%;
    }
    .title2 {
        margin-top: 15px;
    }
    .search {
        margin-top: 15px;
        text-align: center;
    }
    /* .add {
        width: 100%;
        height: 43px;
        background-color: #F5FAFE;
        display: flex;
        flex-direction: row-reverse;
    } */
    .table {
        width: 100%;
        margin-top: 15px;
    }
    .pagination {
        width: 100%;
        margin-top: 15px;
        display: flex;
        /* flex-direction: row-reverse; */
    }
    .dialog-form {
        width: 80%;
        margin: 0 auto;
    }
    .quill-editor{
        height: 600px
    }
    .detailsTitle{
         width: 90%;
         margin: 0 auto;
        text-align: center;
        /* margin-bottom: 18px; */
        border: 1px solid #ddd;
        font-size: 20px;
    }
    .detailsContent{
        width: 90%;
        margin: 0 auto;
        border: 1px solid #ddd;
        padding: 10px;
        box-sizing: border-box;
        font-size: 16px;
        line-height: 28px
    }
    .details{
        font-size: 18px;
    }
    .el-input{
        width: 215px;
    }
</style>
