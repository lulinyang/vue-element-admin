<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-1">
            <i class="el-icon-lx-people grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">1234</div>
              <div>用户访问量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-2">
            <i class="el-icon-lx-notice grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">321</div>
              <div>系统消息</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-3">
            <i class="el-icon-lx-goods grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">5000</div>
              <div>数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { UcenterService } from '@/services'
export default {
  name: 'home',
  data () {
    return {};
  },
  created () {
    UcenterService.getTopicList({
      open_id: "oEi-Y5MAzQ9Ur_D4H5rNF2ZcYpLM",
      school_id: 2,
      user_id: 10,
      type: 2,
      page: 1
    }).then(res => {
      console.log(res);
      this.notify({
        type: 'success',
        title: '成功',
        msg: '查询成功！'
      });
    });
  },
  methods: {}
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}
</style>
