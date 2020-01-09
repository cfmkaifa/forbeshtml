<template>
  <div class="meslook content">
    <div class="content_header">
      <div class="title">格博云MES车间制造执行管理系统</div>
    </div>
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="grid-content">
          <div class="title">
            <span>联机数量</span>
            <span>
              <i-count-up
                class="Fr el-tab-led"
                :startValue="0"
                :endValue="len"
                :decimals="0"
                :duration="2"
                :options="options"
              ></i-count-up>
            </span>
            <span>状态</span>
            <em></em>
            <i>故障</i>
            <em class="wait"></em>
            <i>待机</i>
            <em class="run"></em>
            <i>运行</i>
            <em class="Offline"></em>
            <i>离线/设备关机</i>
            <em class="offfault"></em>
            <i>通讯故障/设备关机</i>
            <el-select 
            v-model="opDateVal" 
            placeholder="请选择"
            @change="KselevalSel($event)"
            class='opSelect'>
              <el-option :label="'全部'" value></el-option>
              <el-option
                  v-for="item in opDate"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
          </el-select>
          </div>
          <div class="contont">
            <el-row :gutter="5">
              <template v-for="(item,index) in equipmentList">
                <el-col :span="4" class="mb6" :key="index">
                  <div class="deviesbox" :class="item.status">
                    <div class="devices">
                      <div class="name">
                        <div class="flex-row start">
                          <el-image
                            class="im equipmentImg"
                            :src="item.deviceImageUrl"
                            fit="fill"
                          ></el-image>
                          <div class="flex-column top">
                            <span>{{item.deviceName}}</span>
                            <span>{{item.deviceNumber}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="devtype">
                        <span>设备产量:</span>
                        <span class="num">
                           <i-count-up
                          class="Fr el-tab-led"
                          :startValue="0"
                          :endValue="item.produce_amount"
                          :decimals="0"
                          :duration="2"
                          :options="options"
                        ></i-count-up>
                        </span>
                      </div>
                      <div class="devtype">
                        <span>设备生产率:</span>
                        <span>  <i-count-up
                          class="Fr el-tab-led"
                          :startValue="0"
                          :endValue="item.device_produce_rate"
                          :decimals="0"
                          :duration="2"
                          :options="options"
                        ></i-count-up><span class="el-text-led">%</span></span>
                      </div>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="purpledatabg">
        <div class="bg-purple" id="purple"></div>
        <div class="detailDate">
          <table class="tabdata">
            <tr>
              <td width="50%">
                <div>总产量</div>
                <div>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="detailDevices.produce_total_amount"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                </div>
              </td>
              <td>
                <div>最多</div>
                <div>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="detailDevices.all_most_count"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                </div>
              </td>
            </tr>
            <tr>
              <td width="50%">
                <div>运行时间</div>
                <div>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="formatSeconds(this.detailDevices.all_runtime,'hous')"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                  <span class="el-text-led">小时</span>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="formatSeconds(this.detailDevices.all_runtime,'min')"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                  <span class="el-text-led">分</span>
                </div>
              </td>
              <td>
                <div>平均时间</div>
                <div>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="formatSeconds(this.detailDevices.all_average_runtime,'hous')"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                  <span class="el-text-led">小时</span>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="formatSeconds(this.detailDevices.all_average_runtime,'min')"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                  <span class="el-text-led">分</span>
                </div>
              </td>
            </tr>
            <tr>
              <td width="50%">
                <div>停机时间</div>
                <div>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="formatSeconds(this.detailDevices.all_stop_time,'hous')"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                  <span class="el-text-led">小时</span>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="formatSeconds(this.detailDevices.all_stop_time,'min')"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                  <span class="el-text-led">分</span>
                </div>
              </td>
              <td>
                <div>平均停机时间</div>
                <div>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="formatSeconds(this.detailDevices.all_average_stop_time,'hous')"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                  <span class="el-text-led">小时</span>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="formatSeconds(this.detailDevices.all_average_stop_time,'min')"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                  <span class="el-text-led">分</span>
                </div>
              </td>
            </tr>
            <tr>
              <td width="50%">
                <div>停机总次数</div>
                <div>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="detailDevices.all_stop_count"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                </div>
              </td>
              <td width="50%"></td>
            </tr>
            <tr>
              <td width="50%">
                <div>停机时间最长设备</div>
                <div class="Fs el-text-led">{{detailDevices.all_stop_most}}</div>
              </td>
              <td>
                <div>累计时长</div>
                <div>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="formatSeconds(this.detailDevices.all_add_up_time,'hous')"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                  <span class="el-text-led">小时</span>
                  <i-count-up
                    class="Fr el-tab-led"
                    :startValue="0"
                    :endValue="formatSeconds(this.detailDevices.all_add_up_time,'min')"
                    :decimals="0"
                    :duration="2"
                    :options="options"
                  ></i-count-up>
                  <span class="el-text-led">分</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="usertask">
          <template>
            <el-table
              :data="tableData"
              height="200"
              ref="tables"
              v-loading="loading"
              style="width: 100%"
              :header-cell-style="{background:'#000040',color:'#fff'}"
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="orderNo" label="任务编号" width="180"></el-table-column>
              <el-table-column prop="planName" label="任务名称" width="150"></el-table-column>
              <el-table-column prop="device_name" label="设备"></el-table-column>
              <el-table-column prop="startTime" label="任务开始时间" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="endTime" label="任务结束时间" :show-overflow-tooltip="true"></el-table-column>
              <!-- <el-table-column prop="now" label="心跳时间" :show-overflow-tooltip="true"></el-table-column> -->
              <el-table-column prop="headUser" label="负责人" width="80"></el-table-column>
              <el-table-column prop="proName" label="产品型号"></el-table-column>
              <el-table-column prop="planState" label="任务状态"  width="100"></el-table-column>
              <el-table-column prop="proCount" label="计划生产量" width="130"></el-table-column>
              <el-table-column prop="completeCount" label="已产生数量" width="130"></el-table-column>
              <el-table-column prop="Taskprogress" label="进度"  width="200">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="22"
                    :percentage="scope.row.Taskprogress?scope.row.Taskprogress:0"
                    :color="customColor"
                  ></el-progress>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
import ICountUp from "vue-countupjs";
export default {
  components: {
    ICountUp
  },
  data() {
    return {
      equipmentList: [],
      len: 0,
      curr: 0,
      detailDevices: "",
      produce_data: {},
      devdata: "",
      src: "http://xiab.ngrok2.xiaomiqiu.cn/",
      socket: "",
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: ""
      },
      tableData: [],
      customColor: "#38C121",
      loading: false,
      activation_rate: 0,
      opDate:[],
      opDateVal:'',
      workshopInfo:[]
    };
  },
  mounted() {
    this.init();
    // this.getAllDeviceIns(); //获取所有设备信息
  },
  destroyed() {
    // 销毁监听
    this.socket.close();
  },
  methods: {
    init() {
      this.getGauge("purple", this.activation_rate);
      // 实例化socket
      this.socket = new WebSocket(this.devicePath);
      // 监听socket连接
      this.socket.onopen = this.open;
      // 监听socket错误信息
      this.socket.onerror = this.error;
      // 监听socket消息
      this.socket.onmessage = this.getMessage;
      // // 获取需要绑定的table
      // this.dom = this.$refs.tables.bodyWrapper;
      // this.dom.addEventListener("scroll", () => {
      //   // 滚动距离
      //   let scrollTop = this.dom.scrollTop;
      //   // 变量windowHeight是可视区的高度
      //   let windowHeight = this.dom.clientHeight || this.dom.clientHeight;
      //   // 变量scrollHeight是滚动条的总高度
      //   let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight;
      //   if (scrollTop + windowHeight === scrollHeight) {
      //     // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
      //     if (!this.allData) this.getMoreLog();
      //   }
      // });
    },
    getAllDeviceIns(id) {
      this.axios.get("http://xiab.ngrok2.xiaomiqiu.cn/api/equipment/open/getAllDeviceInformation").then(res => {
        this.equipmentList = res.data.data;
        if(id){
            this.equipmentList.forEach((re,ins,array)=> {
              if(re.workshopInfoId !== id){
                  this.equipmentList.splice(ins,1);
               } 
            });
        }
        this.len = res.data.data.length;
        this.equipmentList.forEach(item => {
          if(item.deviceImageUrl){
                let filePath = item.deviceImageUrl;
                var index= filePath.lastIndexOf(".");
                var ext = filePath.substr(index+1);
                this.axios
                  .get(
                    "http://xiab.ngrok2.xiaomiqiu.cn/api/equipment/open/getImageBase64Code",
                    { params: { imageName: item.deviceImageUrl } }
                  )
                  .then(res => {
                    if (res.status == 200) {
                      item.deviceImageUrl = "data:image/"+ext+";base64,"+res.data;
                    }
                  });
           }
        });
      });
    },
    getMessage(msg) {
      this.devdata = JSON.parse(msg.data);
      this.detailDevices = this.devdata.all_device_total;
      let produce_data = this.devdata.device_produce_data;
      this.opDate = this.devdata.all_workshop_info;
      this.activation_rate = this.detailDevices.device_activation_rate; //稼动率
      this.equipmentList.forEach(item => {
           if(produce_data){
                    produce_data.forEach((re,ins,array)=> {
                    if (item.deviceCode == re.device_code) {
                      let tableDateLi = re.task_info.result;
                      tableDateLi.device_name = re.device_name;
                      if(tableDateLi.planState == -1){
                        tableDateLi.planState = '未开始';
                      }else if (tableDateLi.planState == 0){
                        tableDateLi.planState = '生产中';
                      }else if (tableDateLi.planState == 1){
                        tableDateLi.planState = '已完成';
                      }else if (tableDateLi.planState == 2){
                        tableDateLi.planState = '已延期';
                      }else if (tableDateLi.planState == 3){
                        tableDateLi.planState = '暂停';
                      }
                      tableDateLi.deviceCode = item.deviceCode;
                      tableDateLi.Taskprogress = (Math.round(tableDateLi.completeCount / tableDateLi.proCount * 10000) / 100.00);
                      tableDateLi.now = new Date().toLocaleString()
                      let index = this.tableData.findIndex(d=>{ return d.deviceCode  ===item.deviceCode ;} );
                      if (index == -1) {
                          this.tableData.push(tableDateLi);
                      }else{
                          //this.tableData[index]=tableDateLi;
                          this.tableData.splice(index,1);
                          this.tableData.splice(index,0,tableDateLi);
                      }
                      item.workshopInfoId = re.device_workshop_info.id;
                      item.device_produce_rate = re.device_produce_rate;
                      item.produce_amount = re.produce_amount;
                      if(re.error_state){//故障
                        item.status = 'fault';
                      }else if(re.device_online == 0){//离线
                        item.status = 'offline';
                      }else if(re.holding_state){//待机
                        item.status = 'standby';
                      }else if(re.devices_witch_state == false){//关机
                        item.status = 'shutdown';
                      }else{//正常
                        item.status = 'normal';
                      }
                    }
              });
            }
      });
    },
    open() {
      this.$message.success("设备网关连接成功");
    },
    error() {
      this.$message.error("设备网关连接错误");
    },
    KselevalSel(val){
      if(val){
        this.getAllDeviceIns(val);
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    getGauge(obj, val) {
      const that = this;
      //仪表盘
      var option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            min: 0,
            max: 100,
            splitNumber: 4,
            name: "生产设备",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: val, name: "稼动率" }],
            title: {
              show: true,
              color: "#fff"
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                //属性lineStyle控制线条样式
                color: [
                  [0.1, "#FF0000"],
                  [0.5, "#FFC125"],
                  [0.75, "#EE7942"],
                  [1, "#7CFC00"]
                ],
                width: 5,
                shadowColor: "#fff", //默认透明
                shadowBlur: 20
              }
            },
            axisLabel: {
              // show: false,
              textStyle: {
                // 属性lineStyle控制线条样式
                fontWeight: "bolder",
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 20
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#fff", //默认透明
                shadowBlur: 20
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            }
          }
        ]
      };
      let myChart = echarts.init(document.getElementById(obj));
      myChart.setOption(option);
    },
    // getMoreLog() {
    //   console.log("加载更多!");
    //   this.loading = true;
    //   this.tableData.push({
    //     rwbh: "Ts00012221",
    //     name: "Ts00012221",
    //     shebei: "自七线",
    //     fzr: "诚润",
    //     cpxh: "odd762",
    //     rwzt: "未开始",
    //     jhcl: 400,
    //     yscsl: 0,
    //     jd: 30,
    //     jhsj: "2019-06-14 16：30:00"
    //   });
    //   this.loading = false;
    //   //this.dom.scrollTop = this.dom.scrollTop - 100
    // },
    formatSeconds(value, type) {
      var theTime = parseInt(value); // 需要转换的时间秒
      var theTime1 = 0; // 分
      var theTime2 = 0; // 小时
      if (theTime >= 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 >= 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
        }
      }
      if (type == "hous") {
        return parseInt(theTime2);
      }
      if (type == "min") {
        return parseInt(theTime1);
      }
    }
  }
};
</script>
<style scoped>
/*deep*/
.opSelect{
  float: right;
  padding-right: 15px;
  width: 10%;
}
.opSelect /deep/ .el-input--small .el-input__inner{
  background: #002951;
}

.opSelect /deep/ .el-select-dropdown{
  background: #002951;
}
.opSelect /deep/ .el-input__inner {
  border: 1px solid #5bc9ff;
  color:#5bc9ff;
}
.opSelect /deep/ .el-select-dropdown__item{
  color:#fff;
}
.opSelect /deep/ .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
   background: #5bc9ff;
}
.title{
  background: '';
}
.content_header {
  width: 100%;
  height: 8%;
  background-image: url(../../assets/img/headerbg.png);
  background-size: 100% 61%;
  background-position: 0% 45%;
  background-repeat: no-repeat;
  display: flex;
  display: -webkit-flex;
  position: relative;
}
.content_header .title {
  color: #5bc9ff;
  margin: 25px auto;
  background:'';
  font-size: 25px;
  font-family: "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei";
}
.meslook {
  background-image: url(../../assets/img/sysBg.png);
  height: 100%;
  overflow-x: hidden;
}
.purpledatabg {
  padding-left: 0px !important;
  position: relative;
  background: url(../../assets/img/left_boxbg.png) no-repeat;
  background-size: cover;
}
.grid-content {
  height: 656px;
  background: url(../../assets/img/left_boxbg.png) no-repeat;
  background-size: 100% 100%;
}
.grid-content .title {
  color: #fff;
  padding: 10px 0px;
}
.grid-content .title span,
.title em {
  display: inline-block;
  margin-left: 20px;
}
.grid-content .contont {
  margin: 0 25px;
}
.grid-content .contont .mb6 {
  margin-bottom: 6px;
}
.tabdata,
.timelate {
  width: 100%;
  color: #5bc9ff;
  text-align: center;
}
.tabdata tr {
  border: 1px solid #5bc9ff;
}
.timelate tr td {
  border: 1px solid #5bc9ff;
  height: 30px;
}
.Ranking {
  width: 100%;
  border: 1px solid #5bc9ff;
  color: #5bc9ff;
  text-align: center;
}

.equipmentImg {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 5px;
}
.tablebg.usertask .el-table /deep/ td,
.tablebg.usertask .el-table /deep/ th {
  background: #1d1d1d;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex .im {
  flex: 5;
}
.flex span {
  flex: 5;
  padding: 0px 0px 0px 5px;
}

.Ranking td {
  height: 30px;
}
.deviesbox{
  background-color: #acacac;
  padding: 6px 8px;
  border-radius: 15px;
  backface-visibility: hidden;
  cursor: pointer;
  color: rgba(20, 230, 250, 0.95);
  text-shadow: 4px 4px 10px rgba(212, 221, 238, 0.33),
    -4px -4px 10px rgba(212, 221, 238, 0.33), -4px 4px 10px rgba(172, 172, 172, 0.53),
    4px -4px 10px rgba(172, 172, 172, 0.53);
}
.deviesbox.devices span{
  margin-right: 5px;
}
.fault{
  background-color: #f74327;
}

.normal{
  background-color: #38c121;
}

.offline{
  background-color: #acacac;
}

.shutdown{
  background-color: #4c98f4;
}

.standby{
  background-color: #f6e726;
}

.Fs{
  padding:9px;
}

.el-tab-led {
  font-family: UnidreamLED !important;
  font-size: 20px !important;
  display: inline-block;
  line-height: 37px;
  padding-right: 6px;
  text-align: center;
  color: #ffd600;
  text-shadow: 4px 4px 10px rgba(255, 54, 0, 0.35),
    -4px -4px 10px rgba(255, 54, 0, 0.35), -4px 4px 10px rgba(255, 54, 0, 0.35),
    4px -4px 10px rgba(255, 54, 0, 0.35);
}

.deviesbox.curr {
  border: 2px #43eec9 solid;
  border-radius: 15px;
}

.deviesbox {
  position: relative;
}

.deviesbox.stop .devices {
  background-image: linear-gradient(rgb(248, 129, 17), rgb(211, 37, 11));
}
.deviesbox.stop .devicesback {
  background-image: linear-gradient(#fb7201, #f74327);
}
.devices .name .icon {
  color: #999;
  font-size: 30px;
  margin: 0px 10px;
}
.devices .name,
.devices .devtype {
  padding: 0px 6px;
}
.devices .devtype .num {
  font-size: 20px;
  color: #f6e726;
}
.bg-purple {
  padding-top: 25px;
  height: 250px;
  background: '';
}

.title em {
  border-radius: 50%;
  background: #f74327;
  width: 14px;
  height: 14px;
  margin-right: 3px;
}
em.wait {
  background: #f6e726;
  margin-right: 3px;
}
em.run {
  background: #38c121;
  margin-right: 3px;
}
em.Offline {
  background: #acacac;
  margin-right: 3px;
}
em.offfault {
  background: #4c98f4;
  margin-right: 3px;
}

.usertask {
  max-height: 300px;
  overflow-y: auto;
}
.usertask .el-table /deep/ {
  background: transparent;
  font-size: 14px;
}

.flex-column,
.flex-row {
  display: flex;
  justify-content: space-between;
}

.flex-row {
  flex-direction: row;
  align-items: flex-end;
}

.flex-column {
  flex-direction: column;
}

.center {
  text-align: center;
  vertical-align: middle;
}

.flex-column.between,
.flex-row.between {
  justify-content: space-between;
}

.flex-column.center,
.flex-row.center {
  justify-content: center;
}

.flex-column.start,
.flex-row.start {
  justify-content: flex-start;
}

.flex-column.end,
.flex-row.end {
  justify-content: flex-end;
}

.flex-column.stretch,
.flex-row.stretch {
  justify-content: stretch;
}

.flex-column.first,
.flex-row.first {
  justify-content: first baseline;
}

.flex-row.stretch {
  align-items: stretch;
}

.flex-row.top {
  align-items: flex-start;
}

.flex-row.bottom {
  align-items: flex-end;
}
.flex-row.middle {
  align-items: center;
  vertical-align: middle;
}

.usertask .el-table /deep/ thead th {
  background-color: hsl(200, 13%, 14%);
}

.usertask .el-table /deep/ .el-table__row{
  color: #eee;
}

.usertask .el-table /deep/ th > .cell {
  color: #bae3f7;
  text-shadow: 6px 0 6px #00366b, 5px 5px 5px #002951, 0 6px 6px #00366b;
}

.usertask .el-table /deep/ tr,
.mixin-components-container {
  background-color: transparent;
  font-size: 15px;
}

.usertask .el-table /deep/__fixed-right:before,
.usertask .el-table /deep/__fixed:before {
  background: transparent;
}

.usertask .el-table /deep/__fixed {
  background-color: rgba(3, 50, 101, 0.9);
}

.usertask .el-table /deep/--striped .usertask .el-table /deep/__body tr.usertask .el-table /deep/__row--striped.current-row td,
.usertask .el-table /deep/--striped .usertask .el-table /deep/__body tr.usertask .el-table /deep/__row--striped td,
.usertask .el-table /deep/__body tr.current-row > td,
.usertask .el-table /deep/__body tr.hover-row.current-row > td,
.usertask .el-table /deep/__body tr.hover-row.usertask .el-table /deep/__row--striped.current-row > td,
.usertask .el-table /deep/__body tr.hover-row.usertask .el-table /deep/__row--striped > td,
.usertask .el-table /deep/__body tr.hover-row > td {
  background-color: rgba(0, 0, 0, 0.2);
}

.usertask .el-table /deep/--striped .usertask .el-table /deep/__body tr.usertask .el-table /deep/__row--striped.current-row td,
.usertask .el-table /deep/__body tr.current-row > td {
  background-color: rgba(33, 150, 243, 0.8);
}

.usertask .el-table /deep/--enable-row-hover .usertask .el-table /deep/__body tr:hover > td,
.hover-row {
  background-color: rgba(33, 150, 243, 0.5) !important;
}

.usertask .el-table /deep/ td,
.usertask .el-table /deep/ th.is-leaf {
  border-bottom: 1px solid #366c9b;
  cursor: default;
}

.usertask .el-table /deep/ td.is-center,
.usertask .el-table /deep/ th.is-center {
  text-align: center;
}

.usertask .el-table /deep/:before {
  height: 0;
}

.usertask .el-table /deep/ .cell,
.usertask .el-table /deep/ th div {
  padding-right: 0;
}

.usertask .el-table /deep/ .cell .unit,
.usertask .el-table /deep/ th div .unit {
  padding-left: 3px;
  font-size: 0.85em;
  opacity: 0.7;
}

.usertask .el-table /deep/__footer-wrapper tbody td,
.usertask .el-table /deep/__header-wrapper tbody td {
  background-color: rgba(33, 150, 243, 0.3);
  color: #fff;
  border: none;
  font-weight: 700;
}

.usertask .el-table /deep/__footer-wrapper tbody th.gutter {
  background-color: rgba(0, 0, 0, 0.6);
}

.usertask .el-table /deep/ td:last-child,
.usertask .el-table /deep/ th:last-child {
  border-right: none;
}

.usertask .el-table /deep/ td:first-child,
.usertask .el-table /deep/ th:first-child {
  border-left: none;
}

.usertask .el-table /deep/--border,
.usertask .el-table /deep/--group {
  border: none;
}

.usertask .el-table /deep/--border td,
.usertask .el-table /deep/--border th {
  border-right: 1px solid #366c9b !important;
}

.usertask .el-table /deep/--border td:first-child,
.usertask .el-table /deep/--border th:first-child {
  border-left: 1px solid #366c9b;
}

.usertask .el-table /deep/--border:after,
.usertask .el-table /deep/--group:after,
.usertask .el-table /deep/:before {
  content: none;
}

.usertask .el-table /deep/--mini td,
.usertask .el-table /deep/--mini th {
  padding: 7px 0;
  cursor: default;
}

.usertask .el-table /deep/__empty-block {
  min-height: 100px !important;
  height: 100px !important;
}

.usertask .el-table /deep/-filter {
  background-color: transparent;
  box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.5);
  border: none;
}

.usertask .el-table /deep/-filter .usertask .el-table /deep/-filter__content {
  background-color: rgba(0, 0, 0, 0.6);
}

.usertask .el-table /deep/-filter .usertask .el-table /deep/-filter__content .el-checkbox {
  color: #fff;
}

.usertask .el-table /deep/-filter .usertask .el-table /deep/-filter__bottom {
  background-color: rgba(0, 0, 0, 0.6);
  border-top: 1px solid #ebeef5;
}

.usertask .el-table /deep/-filter .usertask .el-table /deep/-filter__bottom button {
  color: #fff;
}

.usertask .el-table /deep/-filter .usertask .el-table /deep/-filter__bottom button.is-disabled {
  color: #c0c4cc;
}

.usertask .el-table /deep/__column-filter-trigger i {
  color: #03a9f4;
  font-weight: 700;
}

.usertask .el-table /deep/-column--selection .cell {
  padding-left: 14px;
  padding-right: 14px;
}

.usertask .el-table /deep/-filter {
  border: 1px solid #ebeef5;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 2px 0;
}

.usertask .el-table /deep/-filter__list {
  padding: 5px 0;
  margin: 0;
  list-style: none;
  min-width: 100px;
}

.usertask .el-table /deep/-filter__list-item {
  line-height: 36px;
  padding: 0 10px;
  cursor: pointer;
  font-size: 14px;
}

.usertask .el-table /deep/-filter__list-item:hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}

.usertask .el-table /deep/-filter__list-item.is-active {
  background-color: #409eff;
  color: #fff;
}

.usertask .el-table /deep/-filter__content {
  min-width: 100px;
}

.usertask .el-table /deep/-filter__bottom {
  border-top: 1px solid #ebeef5;
  padding: 8px;
}

.usertask .el-table /deep/-filter__bottom button {
  background: 0 0;
  border: none;
  color: #606266;
  cursor: pointer;
  font-size: 13px;
  padding: 0 3px;
}
.usertask .el-table /deep/-filter__bottom button:hover {
  color: #409eff;
}

.usertask .el-table /deep/-filter__bottom button:focus {
  outline: 0;
}

.usertask .el-table /deep/-filter__bottom button.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.usertask .el-table /deep/-filter__wrap {
  max-height: 280px;
}

.usertask .el-table /deep/-filter__checkbox-group {
  padding: 10px;
}

.usertask .el-table /deep/-filter__checkbox-group label.el-checkbox {
  display: block;
  margin-right: 5px;
  margin-bottom: 8px;
  margin-left: 5px;
}

.usertask .el-table /deep/-filter__checkbox-group .el-checkbox:last-child {
  margin-bottom: 0;
}

.usertask .el-table /deep/--hidden,
.usertask .el-table /deep/ td.is-hidden > *,
.usertask .el-table /deep/ th.is-hidden > * {
  visibility: hidden;
}

.usertask .el-table /deep/,
.el-tag {
  -webkit-box-sizing: border-box;
}

.el-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: hsla(220, 4%, 58%, 0.3);
  transition: background-color 0.3s;
}
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  display: none;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(25, 25, 34, 0.3);
  border-radius: 8px;
  background-color: hsla(0, 0%, 100%, 0.3);
  display: none;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(33, 128, 204, 0.8);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
  display: none;
}
</style>