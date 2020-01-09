<template>
  <div>
    <el-dialog
      :title="Config.TitleConfigure+Config.Title"
      :visible.sync="FormVis"
      :before-close="Close"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        :ref="Config.ruleFormName"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="item.Colspan" v-for="(item,index) in FtableData" v-bind:key="index">
            <el-form-item :label="item.Title" :prop="item.Prop" v-show="item.IsForm">
              <el-input
                v-if="item.Type=='input'"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请输入'+item.Title"
                :disabled="Config.FormDisplay?Config.FormDisplay.includes(item.Prop):false"
              >
                <template slot="append" v-if="item.Unit">{{item.Unit}}</template>
              </el-input>

              <el-input
                v-else-if="item.Type=='number'" 
                type="number"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请输入'+item.Title"
                :disabled="Config.FormDisplay?Config.FormDisplay.includes(item.Prop):false"
              >
                <template slot="append" v-if="item.Unit">{{item.Unit}}</template>
              </el-input>

              <el-input
                v-else-if="item.Type=='text'"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请输入'+item.Title"
                type="textarea"
                :rows="item.Rows"
                 :disabled="Config.FormDisplay?Config.FormDisplay.includes(item.Prop):false"
              ></el-input>

              <el-input
                v-else-if="item.Type=='text'"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请输入'+item.Title"
                type="textarea"
                :rows="item.Rows"
                :disabled="Config.FormDisplay?Config.FormDisplay.includes(item.Prop):false"
              ></el-input>

              <el-input-number 
                v-else-if="item.Type=='surplus'"
                v-model="ruleForm[item.Prop]"
                controls-position="right"
                :min="0"
                :max="item.Max"
                :disabled="Config.FormDisplay?Config.FormDisplay.includes(item.Prop):false"
               >
               </el-input-number>

               <el-select
                v-else-if="item.Type=='selectsearch'"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请选择'+item.Title"
                filterable
                remote
                value-key="id"
                @change="currentSel($event,item.Prop,item.LowerProp,item.SaveName,item.sName)"
                :prop="ruleForm[item.Prop]"
                :disabled="Config.FormDisplay?Config.FormDisplay.includes(item.Prop):false"
              >
                <div v-if='item.ArrNoShow'>
                    <el-option :label="'无'" value v-if="!item.IsMust"></el-option>
                </div>
                <div v-else>
                  <el-option :label="'无'" value v-if="!item.IsMust"></el-option>
                  <template v-for="(cm) in item.selectArr">
                    <el-option :key="cm.id" :label="cm[item.sName]" :value="item.SaveName?cm:cm.id"></el-option>
                  </template>
                </div>
              </el-select>

              <el-select
                v-else-if="item.Type=='select'"
                v-model="ruleForm[item.Prop]"
                :placeholder="'请选择'+item.Title"
                value-key="id"
                @change="currentSel($event,item.Prop,item.LowerProp,item.SaveName,item.sName)"
                :prop="ruleForm[item.Prop]"
                 :disabled="Config.FormDisplay?Config.FormDisplay.includes(item.Prop):false"
              >
                <div v-if='item.ArrNoShow'>
                    <el-option :label="'无'" value v-if="!item.IsMust"></el-option>
                </div>
                <div v-else>
                  <el-option :label="'无'" value v-if="!item.IsMust"></el-option>
                  <template v-for="(cm) in item.selectArr">
                    <el-option :key="cm.id" :label="cm[item.sName]" :value="item.SaveName?cm:cm.id"></el-option>
                  </template>
                </div>
              </el-select>

              <el-date-picker
                v-model="ruleForm[item.Prop]"
                type="date"
                @change="changData($event,item.Prop)"
                :placeholder="'请选择'+item.Title"
                v-else-if="item.Type=='date'"
                :prop="ruleForm[item.Prop]"
              ></el-date-picker>

              <el-date-picker
                v-model="ruleForm[item.Prop]"
                type="datetime"
                @change="changDataTime($event,item.Prop)"
                :placeholder="'请选择'+item.Title"
                v-else-if="item.Type=='datetime'"
                :prop="ruleForm[item.Prop]"
              ></el-date-picker>

              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :action="uploadAction"
                :headers="uploadheaders"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                accept="image/jpeg, image/gif, image/png, image/bmp"
                v-else-if="item.Type=='img'"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <el-upload
                :action="uploadAction"
                :headers="uploadheaders"
                :on-success="handlePreview"
                :before-upload="handleUpload"
                :on-remove="handleRemove(item.Prop)"
                :limit="1"
                :show-file-list="true"
                list-type="picture"
                :file-list="fileList"
                accept="image/jpeg, image/gif, image/png, image/bmp, .pdf"
                v-else-if="item.Type=='upload'"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>

              <el-transfer
                filterable
                v-else-if="item.Type=='transfer'"
                v-model="trvalue[item.Prop]"
                :data="transData[item.Prop]"
                :titles="['未选中', '已选中']"
                @change="handleChange($event,item.Prop,arguments)"
              ></el-transfer>

              <el-radio-group
                v-model="ruleForm[item.Prop]"
                v-else-if="item.Type=='radio'"
                @change="checkboxSel($event,item.Prop,item.LowerProp,arguments)"
              >
                <el-radio-button
                  v-for="(re) in item.radioArr"
                  :label="re.code"
                  :key="re.code"
                >{{re.name}}</el-radio-button>
              </el-radio-group>

              <quill-editor
                v-else-if="item.Type=='quill'"
                ref="myTextmaterialRequested"
                v-model="ruleForm.materialRequested"
                :options="editorOption2"
              ></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-show='bshow'>
        <el-button @click="Close">取 消</el-button>
        <el-button type="primary" @click="subproject(Config.ruleFormName)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    Config: Object,
    tableData: Array,
    FormVis: Boolean,
    FromDetails: Object,
    Parm: Object,
    Value: Array
  },
  data() {
    return {
      FtableData: this.tableData,
      state: {},
      date: {},
      loading: false,
      Updata: false,
      tabValue: this.Value,
      ruleForm: this.FromDetails,
      trvalue: {},
      cities: [],
      fileList: [],
      transData: [],
      transDataformObj: {},
      imageUrl: "",
      file: "",
      bshow:true,
      uploadAction: this.baseURL + `/sys/common/upload`,
      uploadheaders: { "X-Access-Token": sessionStorage.getItem("token") },
      rules: {}
    };
  },
  // watch: {
  //   'transData':{
  //     handler(newValue, oldValue) {
  //       console.log(newValue);
  //     },
  //     deep:true //深度监听
  //   }
  // },
  mounted() {
    let obj = {};
    let objruleForm = {};
    for (let i = 0; i < this.tableData.length; i++) {
      objruleForm[this.tableData[i].Prop] = "";
      if (this.tableData[i].IsMust == true) {
        if (
          this.tableData[i].Type == "input" ||
          this.tableData[i].Type == "text" ||
          this.tableData[i].Type == "date" ||
          this.tableData[i].Type == "datetime"
        ) {
          obj[this.tableData[i].Prop] = new Array({
            required: true,
            message: this.tableData[i].Title + "输入不能为空",
            trigger: "blur"
          });
        } else if (
          this.tableData[i].Type == "select" ||
          this.tableData[i].Type == "selectsearch" ||
          this.tableData[i].Type == "radio"
        ) {
          obj[this.tableData[i].Prop] = new Array({
            required: true,
            message: this.tableData[i].Title + "选择不能为空",
            trigger: 'change'
          });
        } else if (
          this.tableData[i].Type == "number" 
        ) {
          obj[this.tableData[i].Prop] = new Array({
            required: true,
            message: this.tableData[i].Title + "不能为空且必须为数字",
            trigger: "blur"
          });
        }
      }
    }
    if (!this.ruleForm) this.ruleForm = objruleForm;
    this.rules = obj;
  },
  methods: {
    generateData(Prop, datas, obj, formObj) {
      if (datas) {
        let data = [];
        let cities = [];
        let pinyin = [];
        
        datas.forEach((item, index, array) => {
          cities.push(item[obj.Sna]);
            pinyin.push(item[obj.Sid]);
          });
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            id: pinyin[index],
            disabled:formObj.disabled?formObj.disabled:false
          });
        });
        this.transData[Prop] = data;
        this.transDataformObj[Prop] = formObj;
      }
    },
    reset(formName){
      setTimeout(() => {
          this.$refs[formName].clearValidate();// 重置验证
      }, 0); 
    },
    // rload() {
    //   let TsURL = this.getUrl(this.Config.Url, "pagelist");
    //   if(this.Config.Uid){
    //       TsURL = TsURL+'/'+this.Config.Uid;
    //   }
    //   setTimeout(() => {
    //     this.axios.get(TsURL, { params: this.Parm }).then(res => {
    //       if (res.data.code == 0) {
    //         let { result } = res.data;
    //         this.tabValue = result.records;
    //         this.Parm.total = result.total;
    //         this.$emit("FromUpdate", result.records);
    //       }
    //     });
    //   }, 700);
    // },
    Close() {
      this.$emit("FormClose", false);
    },
    //select
    currentSel(val,selVal,LowerProp,SaveName,sName) {
      if(SaveName){
        this.ruleForm = Object.assign({}, this.ruleForm, { [selVal]: val[sName] });
        this.ruleForm = Object.assign({}, this.ruleForm, { [SaveName]: val.id });
      }else{
        this.ruleForm = Object.assign({}, this.ruleForm, { [selVal]: val });
      }
      if (LowerProp) {
        let os = val;
        if(SaveName){os = val.id}
        if (LowerProp.type == "select") {
          this.$emit(LowerProp.val + "Celect",os,true);
        }
      }
    },
    changData(val, selVal) {
      this.ruleForm[selVal] = val;
    },
    changDataTime(val, selVal) {
      this.ruleForm[selVal] = this.getDates(val);
    },
    //radio
    checkboxSel(val, selVal,LowerProp) {
      this.ruleForm = Object.assign({}, this.ruleForm, { [selVal]: val });
      if (LowerProp) {
        if (LowerProp.type == "radio") {
          this.$emit(LowerProp.val + "Celect", val,true);
        }
      }
    },
    handlePreview(res, file) {
      if(res.code == 0){
          let array = [];
          let item = {
            content: file.size,
            path: file.name,
            filePath: res.result.filePath,
            cnName: res.result.cnName,
            enName: res.result.enName,
            suffix: res.result.suffix
          };
          array.push(item);
          this.ruleForm.attachs = array;
          this.file = URL.createObjectURL(file.raw);
      }else{
        this.$message.error(res.message);
      }
    },
    handleRemove(Prop) {
      this.ruleForm[Prop] = [];
    },
    handleUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isPDF = file.type === "application/pdf";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG && !isGIF && !isPNG && !isBMP && !isPDF) {
        this.$message.error("上传文件必须是图片或PDF格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      return (isJPG || isBMP || isGIF || isPNG || isPDF) && isLt10M;
    },

    handleChange(value, selVal, movedKeys) {
      let arr = [];
      let rightTransData = [];
      let leftTransData = [];
      if (movedKeys[1] === "right") {
        if (value) {
          for (let i = 0; i < value.length; i++) {
            this.transData[selVal].forEach((item, index, array) => {
              if (item.key == value[i]) {
                rightTransData.push(item);
              }
            });
          }
          if (rightTransData) {
            for (let i = 0; i < rightTransData.length; i++) {
              let arrobj = {
                [this.transDataformObj[selVal].id]:rightTransData[i].id
              };
              arr.push(arrobj);
            }
          }
        }
      }
      if (movedKeys[1] === "left") {
        if (value) {
          for (let i = 0; i < value.length; i++) {
            this.transData[selVal].forEach((item, index, array) => {
              if (item.key == value[i]) {
                leftTransData.push(item);
              }
            });
          }
          if (leftTransData) {
            for (let i = 0; i < leftTransData.length; i++) {
              let arrobj = {
                [this.transDataformObj[selVal].id]:leftTransData[i].id
              };
              arr.push(arrobj);
            }
          }
        }
      }
      this.ruleForm[selVal] = arr;
    },
    prevePage() {},
    nextPage() {},
    subproject(formName,startTime,endTime) {
      if(this.Config.startTime && this.Config.endTime){
        if(new Date(this.ruleForm[this.Config.startTime]).getTime() >= new Date(this.ruleForm[this.Config.endTime]).getTime() ){
            this.$message.error("开始时间大于等于结束时间")
            return;
        }
      }
      if (!this.Updata) {
          if(this.Config.Copystrsource && this.Config.Copystrto){
              this.ruleForm[this.Config.Copystrto] = this.ruleForm[this.Config.Copystrsource];
          }
          if(this.Config.Copysource && this.Config.Copyto){
              this.Config.Copysource.forEach((item, index, array) => {
                  if(index>0){
                    this.ruleForm[this.Config.Copyto] += '【'+this.ruleForm[item]+'】';
                  }else{
                    this.ruleForm[this.Config.Copyto] = this.ruleForm[item];
                  }
              });
          }
          if(this.Config.Copyarrsource && this.Config.Copyarrto){
              this.Config.Copyarrto.forEach((item, index, array) => {
                  this.ruleForm[item] = this.ruleForm[this.Config.Copyarrsource];
              });
          }
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.postForm(this.Config.Url);
            }
          });
      } else {
         if(this.Config.Copysource && this.Config.Copyto){
            this.Config.Copysource.forEach((item, index, array) => {
              if(index>0){
                this.ruleForm[this.Config.Copyto] += '【'+this.ruleForm[item]+'】';
              }else{
                this.ruleForm[this.Config.Copyto] = this.ruleForm[item];
              }
            });
         }
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.putForm(this.Config.Url);
          }
        });
      }
    },
    //新建数据
    postForm(url) {
      // let TsURL = this.getUrl(url, "add");
      // let Count = 0;
      // if(this.Config.Multiple){
      //     if(this.ruleForm[this.Config.Multiple]){
      //         this.ruleForm[this.Config.Multiple].forEach((item, index, array) => {
      //           Count = parseInt(Count)+parseInt(this.ruleForm['proCount']);
      //         });
      //         if(Count>this.ruleForm['noCompleteCount']){
      //             this.$message.error('生产数量大于计划剩余数量');
      //         }else{
      //             this.ruleForm[this.Config.Multiple].forEach((item, index, array) => {
      //               let arr = [];
      //               arr.push(item);
      //               this.ruleForm = Object.assign({},this.ruleForm,{[this.Config.Multiple]:arr,['equSn']:item.equipmentId,['orderNo']:this.getCode('T',(this.Parm.total+index))});
      //               this.axios.post(TsURL,this.ruleForm).then(res => {
      //                 if (res.data.code == 200) {
      //                     this.$message.success(res.data.message);
      //                     if(this.Config.FormSubmit){
      //                       this.$emit("FormSubmit",this.ruleForm);
      //                     }
      //                     this.rload();
      //                     this.$emit("FormClose", false);
      //                   } else {
      //                     this.$message.error(res.data.message);
      //                   }
      //               });
      //           });
      //         }
      //     }else{
      //       this.$message.error("请选择执行设备");
      //     }
      // }else{    
      //   this.axios.post(TsURL, this.ruleForm).then(res => {
      //     if (res.data.code == 200) {
      //       this.$message.success(res.data.message);
      //       this.rload();
      //       this.$emit("FormClose", false);
      //     } else {
      //       this.$message.error(res.data.message);
      //     }
      //   });
      // }
    },
    //编辑数据
    putForm(url) {
      //  let TsURL = this.getUrl(url, "edit");
      //   this.axios.put(TsURL, this.ruleForm).then(res => {
      //     if (res.data.code == 0) {
      //       this.$message.success(res.data.message);
      //       this.rload();
      //       this.$emit("FormClose", false);
      //     } else {
      //       this.$message.error(res.data.message);
      //     }
      //   });
    },
    handleAvatarSuccess(res, file) {
       if(res.code == 0){
          let array = [];
          let item = {
            content: file.size,
            path: file.name,
            filePath: res.result.filePath,
            cnName: res.result.cnName,
            enName: res.result.enName,
            suffix: res.result.suffix
          };
          array.push(item);
          this.ruleForm.attachs = array;
          this.imageUrl = URL.createObjectURL(file.raw);
       }else{
        this.$message.error(res.message);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt5M;
    }
  }
};
</script>
<style>
.el-transfer-panel {
  width: 40%;
}
.el-transfer-panel__item {
  display: block;
}
.selectJob {
  text-align: center;
  height: 25px;
  position: fixed;
  /* margin-top: -89px; */
  width: 212px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  border: 1px solid #e4e7ed;
  border-top: 0;
}
.selectJob .span {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.selectJob .text {
  height: 25px;
  line-height: 5px;
  font-weight: bold;
  cursor: pointer;
}
</style>