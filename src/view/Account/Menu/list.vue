<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <router-link to="add">
                    <el-button type="success" icon="el-icon-plus" class="handle-del mr10">添加节点</el-button>
                </router-link>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="p_title" label="上级菜单"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>

                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 0">
                            <el-tag type="danger">禁用</el-tag>
                        </div>
                        <div v-else-if="scope.row.status === 1">
                            <el-tag type="success">启用</el-tag>
                        </div>
                        <div v-else>
                            <el-tag type="warning">未知状态</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <router-link :to="{ name: '编辑菜单', params: { id: scope.row.id }}" class="btn-link edit-btn">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
						</router-link>
                        
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>-->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model.trim="form.title" class="h-40 w-200"></el-input>
                </el-form-item>
                <el-form-item label="绑定权限标识" prop="rule_name">
                    <el-input v-model.trim="form.rule_name" class="h-40 fl w-200" :disabled="true"></el-input>
                    <el-button class="fl m-l-30" @click="openRule()">查找</el-button>
                </el-form-item>
                <el-form-item label="菜单类型" prop="menu_type">
                    <el-radio-group v-model="form.menu_type">
                        <el-radio disabled label="1">普通三级菜单</el-radio>
                        <el-radio disabled label="2">单页菜单</el-radio>
                        <el-radio disabled label="3">外链</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上级菜单" prop="pid">
                    <el-select disabled v-model="form.pid" placeholder="请选择活动区域" class="w-200">
                        <el-option
                            v-for="(item,index) in tableData"
                            :label="item.title"
                            :value="item.id"
                            :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="路径">
                    <el-input v-model.trim="form.url" class="h-40 w-200"></el-input>
                </el-form-item>
                <el-form-item label="模块" prop="module">
                    <el-input v-model.trim="form.module" class="h-40 w-200"></el-input>
                </el-form-item>
                <el-form-item label="所属菜单">
                    <el-input v-model.trim="form.menu" class="h-40 w-200"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.sort" class="h-40 w-200"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { AdminMenu } from '@/services';
import ruleList from './rule.vue';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 4,
            form: {},
            idx: -1,
            id: -1,
            rules: {
                title: [{ required: true, message: '请输入菜单标题' }],
                rule_name: [{ required: true, message: '请绑定权限标识' }],
                menu_type: [{ required: true, message: '请选择菜单类型' }],
                module: [{ required: true, message: '请填写菜单模块' }],
                pid: [{ type: 'number', required: true, message: '请选择上级菜单' }]
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        //初始化
        init() {
            AdminMenu.getMenuList({}).then(res => {
                if (res.code == 1) {
                    this.tableData = res.data;
                }
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
        },
        // 删除操作
        handleDelete(index, row) {
            AdminMenu.delMenu({
                id: row.id
            }).then(res => {
                if (res.code == 1) {
                    this.$message.success('删除成功');
                    this.init();
                }
            });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            AdminMenu.readMenu({
                id: row.id
            }).then(res => {
                if (res.code == 1) {
                    this.form = res.data;
                }
            });
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$refs.form.validate(valid => {
                if (valid) {
                    AdminMenu.editMenu({
                        id: this.form.id,
                        level: this.form.level,
                        name: this.form.name,
                        pid: this.form.pid,
                        status: this.form.status,
                        title: this.form.title
                    }).then(res => {
                        if (res.code == 1) {
                            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                            this.$message.success(`修改成功`);
                            this.init();
                        }
                    });
                }
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //吊起筛选
        openRule() {
            this.$refs.ruleList.open();
        }
    },
    components: {
        ruleList
    }
};
</script>

<style scoped>
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
