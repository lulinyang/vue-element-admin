<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button :type="active*1 === index ? 'primary': ''" class="mr10 mb10" v-for="(item, index) in jsonDataExcels" :key="index" @click="selcetedJsonData(item, index)">{{item.name}}({{item.data.length}})</el-button>
      </div>
      <div class="handle-box">
        <el-button type="success" class="mr10 mb10" @click="exportExcel">导出Excel({{tableData.length}})</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="名称" label="企业名称"></el-table-column>
        <el-table-column prop="邮箱" label="企业邮箱"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import excel from '@/tools/excel';
import jsonData from './公路工程综合甲级.json';
import jsonData1 from './公路工程综合乙级.json';
import jsonData2 from './公路工程综合丙级.json';
import jsonData3 from './公路工程桥梁隧道工程专项.json';
import jsonData4 from './公路工程交通工程专项.json';
import jsonData5 from './水运工程结构（地基）甲级.json';
import jsonData6 from './水运工程结构（地基）乙级.json';
import jsonData7 from './水运工程材料甲级.json';
import jsonData8 from './水运工程材料乙级.json';
import jsonData9 from './水运工程材料丙级.json';
export default {
  name: 'Excel-export',
  data () {
    return {
      tableData: jsonData.Items,
      active: 0,
      jsonDataExcels: [
        {
          name: '公路工程综合甲级',
          data: jsonData.Items
        },
        {
          name: '公路工程综合乙级',
          data: jsonData1.Items
        },
        {
          name: '公路工程综合丙级',
          data: jsonData2.Items
        },
        {
          name: '公路工程桥梁隧道工程专项',
          data: jsonData3.Items
        },
        {
          name: '公路工程交通工程专项',
          data: jsonData4.Items
        },
        {
          name: '水运工程结构（地基）甲级',
          data: jsonData5.Items
        },
        {
          name: '水运工程结构（地基）乙级',
          data: jsonData6.Items
        },
        {
          name: '水运工程材料甲级',
          data: jsonData7.Items
        },
        {
          name: '水运工程材料乙级',
          data: jsonData8.Items
        },
        {
          name: '水运工程材料丙级',
          data: jsonData8.Items
        },
        {
          name: '公路工程综合(甲、乙、丙)级',
          data: jsonData.Items.concat(jsonData1.Items, jsonData2.Items)
        },
      ]
    };
  },
  created () {
    let arr = [];
    let objArr = [];
    this.jsonDataExcels[0].data.forEach((item, index) => {
      if (arr.indexOf(item.名称) === -1) {
        arr.push(item.名称);
        objArr.push(item);
      }
    });
    this.tableData = objArr;
    this.filename = this.jsonDataExcels[0].name;
  },
  methods: {
    selcetedJsonData (item, index) {
      this.active = index;
      let arr = [];
      let objArr = [];
      item.data.forEach((item, index) => {
        if (arr.indexOf(item.名称) === -1) {
          arr.push(item.名称);
          objArr.push(item);
        }
      });
      this.tableData = objArr;
      this.filename = this.jsonDataExcels[index].name;
    },
    exportExcel () {
      if (this.tableData.length) {
        this.exportLoading = true
        const params = {
          title: ['机构名称', '企业邮箱'],
          key: ['名称', '邮箱'],
          data: this.tableData,
          autoWidth: true,
          filename: this.filename
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
    }
  }
};
</script>

<style scoped>
.mb10 {
    margin-bottom: 10px;
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
