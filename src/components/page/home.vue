<template>
  <div class="padding10">
    <div class="container">
      <Cards ref="ChCards" :Config="CardsConfig" :CardsData="CardsData" />
      <HeaderTitle :Title="tableConfig.Title+'列表'" Icon="el-icon-s-unfold" />
      <Search
        ref="ChSearch"
        :Config="tableConfig"
        :SearchData="tableData"
        :Parm="tableParm"
        @SearchUpdate="FromUpdate"
      />
      <Table
        ref="ChTable"
        :tableData="tableData"
        :BottonData="BottonData"
        :Config="tableConfig"
        :tableValue="tableValue"
        :Parm="tableParm"
        :tableButton="tableButton"
        @GetFormVisible="addTab"
        @FormEdit="handleEdit"
        @getTableValue="getTableValue"
      />
      <Froms
        ref="ChForm"
        :tableData="tableData"
        :Config="tableConfig"
        :tableValue="tableValue"
        :Parm="tableParm"
        :FormVis="FormVisible"
        :FromDetails="FromDetails"
        @FormClose="FormShow"
        @FromUpdate="FromUpdate"
      />
    </div>
  </div>
</template>

<script>
import {} from "../../assets/js/Interface";
import HeaderTitle from "./coms/HeaderTitle";
import Cards from "./coms/Cards";
import Search from "./coms/Search";
import Table from "./coms/Table";
import Froms from "./coms/Froms";

export default {
  components: {
    HeaderTitle,
    Cards,
    Search,
    Table,
    Froms
  },
  data() {
    return {
      FormVisible: false,
      Updata: false,
      FormData: [],
      FromDetails: {},
      BottonData: [],
      CardsConfig: {
        gutter: 24,
        style: "padding-bottom:50px;"
      },
      CardsData: [
        {
          Num1: "0",
          Num2: "0",
          Sub: "设备（已接入/总设备）",
          Colspan: 6,
          Style:
            "color:#fff;text-align: center;padding:20px 0;background-image: linear-gradient(to right, #29bdd9 0%, #276ace 100%);",
          GoUrl: "/home/equipmentlist"
        },
        {
          Num1: "0",
          Num2: "0",
          Sub: "预警（未处理/总数）",
          Colspan: 6,
          Style:
            "color:#fff;text-align: center;padding:20px;background-image: linear-gradient(to right, #ff9569 0%, #e92758 100%);",
          GoUrl: ""
        },
        {
          Num1: "0",
          Num2: "0",
          Sub: "生产任务（未完成/总数）",
          Colspan: 6,
          Style:
            "color:#fff;text-align: center;padding:20px;background-image: linear-gradient(to right, #e8c144 0%, #e95d27 100%);",
          GoUrl: "/home/tasklist"
        },
        {
          Num1: "0",
          Num2: "0",
          Sub: "生产产品（未完成/总数）",
          Colspan: 6,
          Style:
            "color:#fff;text-align: center;padding:20px;background-image: linear-gradient(to right, #ece345 0%, #da9a0a 100%);",
          GoUrl: "/home/productlist"
        }
      ],
      tableConfig: {
        Title: "设备监测",
        Size: "mini",
        ButtonWidth: "0",
        Url: "/mess/equipment",
        TitleConfigure: "",
        ruleFormName: "ruleForm",
        Selection: true,
        SearchWidth: "80px",
        headerStyle: { background: "#fbfbfb", color: "#606266" },
        dblclick:true,
      },
      tableData: [
        {
          Prop: "id",
          Title: "物料ID",
          Width: "",
          Type: "",
          Colspan: 24,
          IsTable: false,
          IsForm: false,
          IsMust: false
        },
        {
          Prop: "classifyId",
          Title: "设备类型",
          Width: "200",
          Type: "select",
          Colspan: 24,
          IsTable: false,
          IsForm: false,
          IsMust: false,
          IsSearch: false
        },
        {
          Prop: "name",
          Title: "设备名称",
          Width: "200",
          Type: "input",
          Colspan: 12,
          IsTable: true,
          IsForm: true,
          IsMust: true,
          IsSearch: true
        },
        {
          Prop: "devices_witch_state",
          Title: "开关机状态",
          Width: "",
          Type: "input",
          Colspan: 24,
          IsTable: true,
          IsForm: true,
          IsMust: true
        },
        {
          Prop: "device_holding_rate",
          Title: "当日待机率",
          Width: "",
          Type: "input",
          Colspan: 12,
          IsTable: true,
          IsForm: true,
          IsMust: true,
          IsSearch: false
        },
        {
          Prop: "device_online",
          Title: "生产状态",
          Width: "",
          Type: "input",
          Colspan: 12,
          IsTable: true,
          IsForm: true,
          IsMust: true,
          IsSearch: false
        },
        {
          Prop: "produce_total_amount",
          Title: "当日产量",
          Width: "",
          Type: "input",
          Colspan: 12,
          IsTable: true,
          IsForm: true,
          IsMust: true,
          IsSearch: false
        },
        {
          Prop: "device_produce_total_time",
          Title: "当日总生产时长（h）",
          Width: "140",
          Type: "input",
          Colspan: 12,
          IsTable: true,
          IsForm: true,
          IsMust: true,
          IsSearch: false
        },
        {
          Prop: "device_off_duration",
          Title: "当日开机总时长（h）",
          Width: "140",
          Type: "input",
          Colspan: 12,
          IsTable: true,
          IsForm: true,
          IsMust: true,
          IsSearch: false
        },
        {
          Prop: "device_error_time",
          Title: "当日故障时长（h）",
          Width: "140",
          Type: "input",
          Colspan: 12,
          IsTable: true,
          IsForm: true,
          IsMust: true,
          IsSearch: false
        },
        {
          Prop: "device_holding_time",
          Title: "当日待机时长（h）",
          Width: "140",
          Type: "input",
          Colspan: 12,
          IsTable: true,
          IsForm: true,
          IsMust: true,
          IsSearch: false
        },
        {
          Prop: "error_state",
          Title: "故障状态",
          Width: "",
          Type: "input",
          Colspan: 12,
          IsTable: true,
          IsForm: true,
          IsMust: true,
          IsSearch: false
        },
        {
          Prop: "holding_state",
          Title: "待机状态",
          Width: "",
          Type: "input",
          Colspan: 12,
          IsTable: true,
          IsForm: true,
          IsMust: true,
          IsSearch: false
        }
      ],
      tableValue: [],
      tableButton: [
        { Title: "编辑", Size: "mini", Type: "primary", Onclick: "handleEdit" },
        { Title: "删除", Size: "mini", Type: "", Onclick: "handleDelete" }
      ],
      tableParm: {
        total: 0,
        pageNo: 1,
        pageSize: 10
      },
      socket: ""
    };
  },
  created() {
    this.tableData.forEach((item, index, array) => {
      switch (item.Prop) {
        case "eptState":
          // this.axios.get("/mess/equipment/ept-states", {}).then(res => {
          //   item.sName = "name";
          //   item.radioArr = res.data.code == 0 ? res.data.result : null;
          // });
          break;
      }
    });
  },
  created() {
    // this.CardsData.forEach((item, index, array) => {
    //   switch (item.Sub) {
    //     case "设备（已接入/总设备）":
    //       item.Title = "";
    //       this.axios
    //         // .get("/mess/spectaculars/have-access-to-equip-total", {})
    //         .then(res => {
    //           item.Num1 = res.data.code == 0 ? res.data.result : null;
    //           this.axios.get("/mess/spectaculars/equip-total", {}).then(res => {
    //             item.Num2 = res.data.code == 0 ? res.data.result : null;
    //           });
    //         });
    //       break;
    //     case "生产任务（未完成/总数）":
    //       item.Title = "";
    //       this.axios
    //         .get("/mess/spectaculars/unfinished-task-total", {})
    //         .then(res => {
    //           item.Num1 = res.data.code == 0 ? res.data.result : null;
    //           this.axios.get("/mess/spectaculars/task-total", {}).then(res => {
    //             item.Num2 = res.data.code == 0 ? res.data.result : null;
    //           });
    //         });
    //       break;
    //       case "生产产品（未完成/总数）":
    //       item.Title = "";
    //       this.axios.get("/mess/product/pro-total", {}).then(res => {
    //           item.Num2 = res.data.code == 0 ? res.data.result : null;
    //           this.axios.get("/mess/product/no-complete-total", {}).then(res => {
    //             item.Num1 = res.data.code == 0 ? res.data.result : null;
    //           });
    //         });
    //       break;
    //   }
    // });
    // // 初始化
    // this.init();
  },
  destroyed() {
    // 销毁监听
    this.socket.close();
  },
  methods: {
    init() {
      if (typeof WebSocket === "undefined") {
        this.$message.error("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.devicePath);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open() {
      this.$message.success("设备网关连接成功");
    },
    error() {
      this.$message.error("设备网关连接错误");
    },
    getMessage(msg) {
      let arr = this.tableValue;
      let data = JSON.parse(msg.data);
      data= data.device_produce_data
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (arr[i].equSn == data[j].device_code) {
              arr[i].devices_witch_state = data[j].devices_witch_state? "开机": "关机";
              arr[i].device_holding_rate = data[j].device_holding_rate;
              arr[i].device_produce_total_time =data[j].device_produce_total_time;
              arr[i].device_off_duration = data[j].device_off_duration;
              arr[i].device_holding_time = data[j].device_holding_time;
              arr[i].device_error_time = data[j].device_error_time;
              arr[i].produce_total_amount = data[j].produce_total_amount;
              arr[i].device_online = data[j].device_online == 1 ? "在线" : "离线";
              arr[i].error_state = data[j].error_state ? "故障" : "正常";
              arr[i].holding_state = data[j].holding_state? "待机中": "运行中";
            }
          }
        }
        this.$refs.ChTable.tabValue = Object.assign(
          [],
          this.$refs.ChTable.tabValue,
          { arr }
        );
      }
    },
    send() {
      this.socket.send(params);
    },
    close() {
      this.$message.error("设备网关连接已关闭");
    },
    FormShow(val) {
      this.FormVisible = val;
    },
    FromUpdate(val) {
      this.tableValue = val;
      this.$refs.ChTable.tabValue = val;
    },
    getTableValue(val) {
      this.tableValue = val;
    },
    addTab(val) {
      this.FormShow(val);
      this.$refs.ChForm.ruleForm = {};
      this.tableConfig.TitleConfigure = "添加";
      this.$refs.ChForm.Updata = false;
      this.$refs.ChForm.ruleForm = Object.assign(
        {},
        this.$refs.ChForm.ruleForm,
        { ["id"]: "" }
      );
    },
    handleEdit(val, type) {
      this.FormShow(type);
      this.tableConfig.TitleConfigure = "编辑";
      this.FromDetails = val;
      this.$refs.ChForm.ruleForm = val;
      this.$refs.ChForm.Updata = true;
    }
  }
};
</script>
