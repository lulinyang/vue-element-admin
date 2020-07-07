<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <router-link to="add">
                    <el-button
                        type="success"
                        v-if="getHasRule('admin-groups-save')"
                        icon="el-icon-plus"
                        class="handle-del mr10"
                    >添加用户组</el-button>
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
                <el-table-column prop="title" label="组名"></el-table-column>
                <el-table-column prop="remark" label="名称"></el-table-column>
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
                        <el-button
                            v-if="getHasRule('admin-groups-update')"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            v-if="getHasRule('admin-groups-delete')"
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" :rules="rules" label-width="130px">
                <el-form-item label="用户组名称" prop="title">
                    <el-input v-model.trim="form.title" class="h-40 w-200"></el-input>
                </el-form-item>
                <el-form-item label="父级用户组" prop="pid">
                    <el-select v-model="form.pid" placeholder="父级用户组" class="w-200">
                        <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.title"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="备注"
                        v-model="form.remark"
                        class="w-200"
                    ></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio label="0">禁用</el-radio>
                        <el-radio label="1">启用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="权限分配">
                    <div class="bor-gray h-400 ovf-y-auto bor-ra-5 bg-wh">
                        <div v-for="(item,index1) in nodes" :key="index1">
                            <div class="bor-b-ccc bg-gra p-l-10 p-r-10">
                                <el-checkbox
                                    v-model="item.check"
                                    @change="selectProjectRule(item)"
                                >{{item.else}}</el-checkbox>
                            </div>
                            <div v-for="(childItem,index2) in item.child" :key="index2">
                                <div class="p-l-20 bor-b-ccc">
                                    <el-checkbox
                                        v-model="childItem.check"
                                        @change="selectModuleRule(childItem, item, childItem.child)"
                                    >{{childItem.else}}</el-checkbox>
                                </div>
                                <div class="p-l-40 bor-b-ccc bg-gra">
                                    <el-checkbox
                                        v-for="(grandChildItem,index3) in childItem.child"
                                        :key="index3"
                                        v-model="grandChildItem.check"
                                        @change="selectActionRule(grandChildItem, childItem, item)"
                                    >{{grandChildItem.else}}</el-checkbox>
                                </div>
                            </div>
                        </div>
                    </div>
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
import { AdminGroup, AdminRule } from '@/services';
export default {
    name: 'homeGroupsList',
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
            idx: -1,
            id: -1,
            form: {
                id: null,
                title: '',
                pid: '',
                remark: '',
                rules: '',
                status: null
            },
            options: [{ pid: '0', title: '无' }],
            nodes: [],
            selectedNodes: [],
            rules: {
                title: [{ required: true, message: '请输入用户组名称', trigger: 'blur' }],
                status: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        //初始化
        init() {
            AdminGroup.getGroupList({}).then(res => {
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
            AdminGroup.delGroup({
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
            this.id = row.id;
            this.getGroupInfo(row.id);
            this.getGroups();
        },
        // 保存编辑
        saveEdit() {
            this.form.rules = this.selectedNodes.toString();

            this.$refs.form.validate(valid => {
                if (valid) {
                    AdminGroup.editGroup({
                        id: this.id,
                        title: this.form.title,
                        remark: this.form.remark,
                        status: this.form.status,
                        pid: this.form.pid,
                        rules: this.form.rules
                    }).then(res => {
                        if (res.code == 1) {
                            this.$message.success(`编辑成功`);
                            this.editVisible = false;
                            setTimeout(() => {
                                this.init();
                            }, 1500);
                        }
                    });
                }
            });
        },
        getRules() {
            return new Promise((resolve, reject) => {
                AdminRule.getRuleList({
                    type: 'tree'
                }).then(res => {
                    if (res.code == 1) {
                        resolve(res.data);
                    }
                });
            });
        },
        getGroups() {
            AdminGroup.getGroupList({}).then(res => {
                if (res.code == 1) {
                    _(res.data).forEach(ret => {
                        ret.id = ret.id.toString();
                    });
                    this.options = this.options.concat(res.data);
                }
            });
        },
        async getGroupInfo(id) {
            let arr = await this.getRules();
            this.nodes = this.nodes.concat(arr);

            AdminGroup.readGroup({
                id: id
            }).then(res => {
                if (res.code == 1) {
                    this.form.title = res.data.title;
                    this.form.pid = res.data.pid ? res.data.pid.toString() : '';
                    this.form.remark = res.data.remark;
                    this.form.status = res.data.status.toString();
                    let array = res.data.rules.split(',');
                    _(array).forEach(ret => {
                        this.selectedNodes.push(parseInt(ret));
                    });
                    _(this.nodes).forEach(ret => {
                        if (_.includes(this.selectedNodes, ret.id)) {
                            ret.check = true;
                        }
                        _(ret.child).forEach(ret1 => {
                            if (_(this.selectedNodes).includes(ret1.id)) {
                                ret1.check = true;
                            }
                            _(ret1.child).forEach(ret2 => {
                                if (_(this.selectedNodes).includes(ret2.id)) {
                                    ret2.check = true;
                                }
                            });
                        });
                    });
                }
            });
            this.editVisible = true;
        },
        selectProjectRule(item) {
            if (!item.check) {
                _(item.child).forEach(res => {
                    res.check = false;
                    let index = _(this.selectedNodes).indexOf(res.id);
                    this.selectedNodes.splice(index, 1);
                    _(res.child).forEach(res1 => {
                        res1.check = false;
                        let index = _(this.selectedNodes).indexOf(res1.id);
                        this.selectedNodes.splice(index, 1);
                    });
                });
            }
            this.selectRule(item);
        },
        selectModuleRule(item, faItem, children) {
            if (!faItem.check) {
                faItem.check = true;
                this.selectedNodes.push(faItem.id);
            }
            if (item.check) {
                this.selectedNodes.push(item.id);
                _(children).forEach(res => {
                    res.check = true;
                    this.selectedNodes.push(res.id);
                });
            } else {
                let index = _(this.selectedNodes).indexOf(item.id);
                this.selectedNodes.splice(index, 1);
                _(children).forEach(res1 => {
                    let temp = _(this.selectedNodes).indexOf(res1.id);
                    if (temp >= 0) {
                        res1.check = false;
                        this.selectedNodes.splice(temp, 1);
                    }
                });
            }
        },
        selectActionRule(item, faItem, grandFaItem) {
            if (!faItem.check) {
                faItem.check = true;
                this.selectedNodes.push(faItem.id);
            }
            if (!grandFaItem.check) {
                grandFaItem.check = true;
                this.selectedNodes.push(grandFaItem.id);
            }
            this.selectRule(item);
        },
        selectRule(item) {
            if (item.check) {
                this.selectedNodes.push(item.id);
            } else {
                const index = _(this.selectedNodes).indexOf(item.id);
                this.selectedNodes.splice(index, 1);
            }
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
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
.bor-gray {
    border: 1px solid #e5e5e5;
}
.bor-b-ccc {
    border-bottom: 1px solid #ccc;
}

.bor-ra-5 {
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
}

.h-400 {
    height: 400px !important;
}
.ovf-y-auto {
    overflow-y: auto;
}

.bg-wh {
    background: #fff;
}

.bg-gra {
    background: #f9f9f9;
}

.p-l-10 {
    padding-left: 10px !important;
}

.p-l-20 {
    padding-left: 20px !important;
}

.p-l-40 {
    padding-left: 40px !important;
}

.p-r-10 {
    padding-right: 10px !important;
}
</style>
