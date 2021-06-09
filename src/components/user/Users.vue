<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="
                queryInfo.pagenum = 1;
                getUserList;
              "
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="ID" prop="uid"></el-table-column>
        <el-table-column label="password" prop="password"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="telephone"></el-table-column>
        <el-table-column label="操作" width="270px">
          <template slot-scope="scope">
            {{ scope.row }}
            <el-button type="primary" icon="el-icon-edit" size="medium"
            @click="showEditDialog(scope.row.id)">
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="medium" @click="removeUserById(scope.row.id)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="80px"
      >
        <el-form-item label="ID" prop="uid">
          <el-input v-model="addForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="addForm.telephone"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <span>
        <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editFormRules"
        label-width="80px"
      >
        <el-form-item label="ID" prop="uid">
          <el-input v-model="addForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="addForm.telephone"></el-input>
        </el-form-item>
      </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userlist: [],
      total: 0,
      addDialogVisible: false,
      //添加用户的表单数据
      addForm: {
        uid: '',
        password: '',
        username: '',
        telephone: ''
      },
      addFormRules: {
        uid: [
          { required: true, message: '请输入用户ID', trigger: 'blur'},{ min: 3, max: 10, message: '用户ID的长度在3~10个字符之间'}
        ],
        password: [
           { required: true, message: '请输入密码', trigger: 'blur'},{ min: 6, max: 15, message: '密码的长度在6~15个字符之间'}
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur'},{ min: 3, max: 6, message: '密码的长度在3~6个字符之间'}
        ],
        telephone: [
          { required: true, message: '请输入电话', trigger: 'blur'}
        ]
      },
      //控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      //查询到的用户数据
      editForm: {},
      //修改表单的验证
      editFormRules: {
         uid: [
          { required: true, message: '请输入用户ID', trigger: 'blur'},{ min: 3, max: 10, message: '用户ID的长度在3~10个字符之间'}
        ],
        password: [
           { required: true, message: '请输入密码', trigger: 'blur'},{ min: 6, max: 15, message: '密码的长度在6~15个字符之间'}
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur'},{ min: 3, max: 6, message: '密码的长度在3~6个字符之间'}
        ],
        telephone: [
          { required: true, message: '请输入电话', trigger: 'blur'}
        ]
      }
    };
  },
  create() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      const { data: res } = await this.$http.get("", {
        params: this.queryInfo,
      }); //路径
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败");
      }
      this.userlist = res.data.users;
      this.total = res.data.total;
      console.log(res);
    },
    //监听handleSize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听页码值
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //监听添加用户对话框的关闭
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    //点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('',this.addForm)  //放置路径
        if (res.mata.status !== 201) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        this.addDialogVisible = false
        //重新获得用户列表数据
        this.getUserList()
      })
    },
    //展示编辑用户的对话框
    async showEditDialog(id) {
      const {data: res } = await this.$http.get('' + id)
      if(res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    //监听修改用户对话框的关闭
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    //修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid =>{
        if (!valid) return
        //发起修改用户信息的数据请求
        const {data: res} = await this.$http.put(''+this.editForm.id,{
          uid: this.editForm.uid,
          password: this.editForm.password,
          username: this.editForm.username,
          telephone: this.editForm.telephone
        })
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success('更新用户信息成功！')
      })
    },
    //根据Id删除
    async removeUserById(id) {
      //弹框提示
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err )
        console.log(confirmResult)
        if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
        }
        const { data: res } = await this.$http.delete('' + id)//添加删除路径
        if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
        }
        this.$message.success('删除用户成功！')
        this.getUserList()
    }
  }
}
</script>

<script lang="less" scoped></script>
