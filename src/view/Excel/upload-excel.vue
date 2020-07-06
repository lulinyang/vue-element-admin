<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :before-upload="beforeAvatarUpload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div class="handle-box">
        <el-button type="success" class="mr10 mb10" @click="importExcel">导入Excel</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column :prop="item.key" :label="item.title" v-for="(item, index) in tableTitle" :key="index"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import excel from '@/tools/excel';
export default {
  name: 'upload-excel',
  data () {
    return {
      tableData: [],
      tableLoading: false,
      tableTitle: []
    };
  },
  created () {

  },

  methods: {
    beforeAvatarUpload (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase();
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file)
        this.file = file
      } else {
        this.$message.error('文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。')
      }
      return false
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {
        this.tableLoading = true
      }
      reader.onprogress = e => {
        this.progressPercent = Math.round(e.loaded / e.total * 100)
      }
      reader.onerror = e => {
        this.$message.error('文件读取出错')
      }
      reader.onload = e => {
        this.$message.info('文件读取成功')
        const data = e.target.result;
        const { header, results } = excel.read(data, 'array');
        this.tableTitle = header.map(item => {
          return { title: item, key: item }
        });
        this.tableData = results;
      }
    },
    importExcel () {
      let dataArray = this.groupArray(this.tableData, 7);
      console.log('this.tableData', JSON.stringify(dataArray));
      alert(JSON.stringify(dataArray));
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
