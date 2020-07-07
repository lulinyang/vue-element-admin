<template>
    <div class="m-l-50 m-t-30 w-500">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="旧密码" prop="old_pwd">
                <el-input v-model.trim="form.old_pwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_pwd">
                <el-input v-model.trim="form.new_pwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="goback()">取消</el-button>
                <el-button type="primary" @click="edit()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { AdminUser } from '@/services';
export default {
    name: 'changePwd',
    data() {
        return {
            disable: false,
            form: {
                id: '',
                auth_key: '',
                old_pwd: '',
                new_pwd: ''
            },
            rules: {
                old_pwd: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
                new_pwd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        edit() {
            this.$refs.form.validate(pass => {
                if (pass) {
                    AdminUser.changePwd({
                        id: this.form.id,
                        auth_key: this.form.auth_key,
                        old_pwd: this.form.old_pwd,
                        new_pwd: this.form.new_pwd,
                    }).then(res => {
                      if (res.code == 1) {
                          this.$message.success('修改成功,请重新登录!');
                          Lockr.rm('authKey');
                          Lockr.rm('authList');
                          Lockr.rm('sessionId');
                          setTimeout(() => {
                            router.replace('/login');
                          }, 1500);
                      }
                    });

                }
            });
        }
    },

    created() {
        let userInfo = Lockr.get('userInfo');

        this.form.id = userInfo.id;
        this.form.auth_key = Lockr.get('authKey');
    }
};
</script>