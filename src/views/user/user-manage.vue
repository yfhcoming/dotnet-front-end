<template>
  <div class="table">
    <div class="app-container">

      <div class="filter-container">
        <el-card class="box-card" style="
            margin-bottom: 10px;
            margin-top: 2%;
            padding: 2%;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            margin-left: 4.5%;
            margin-right: 4.5%">
          <!--        <div slot="header" class="clearfix">-->
          <!--          <span>hover text</span>-->
          <!--        </div>-->
          <div class="component-item" style="">
            <mallki class-name="mallki-text" text="用户管理" style=""/>
          </div>
        </el-card>

        <div class="filter-container" >
          <el-card class="box-card" style="
            margin-bottom: 10px;
            margin-top: 2%;
            padding: 2%;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            margin-left: 4.5%;
            margin-right: 4.5%
          ">
            <div class="component-item" style="text-align: left">

              <el-button class="pan-btn pink-btn" @click="teaList">教师列表</el-button>
              <el-button class="pan-btn purple-btn" @click="stuList" style="margin-left: 50px">学生列表</el-button>
            </div>

          </el-card>

        </div>
<!--        <div class="handle-box">-->
<!--          <el-button type="primary" class="handle-del mr10 filter-item pan-btn pink-btn" @click="delAll">批量删除</el-button>-->
<!--          <el-input placeholder="筛选相关用户" class="handle-input mr10 filter-item"-->
<!--                    style="margin-left: 10px;"></el-input>-->
<!--          <el-button class="filter-item pan-btn yellow-btn" type="primary"  @click="centerDialogVisible = true"-->
<!--                     style="margin-left: 10px;">添加用户</el-button>-->
<!--        </div>-->


      </div>


<!--      <el-table :data="tableData" border size="mini" style="width: 100%" height="550px">-->
<!--        <el-table-column type="selection"  align="center"></el-table-column>-->
<!--        <el-table-column label="用户头像"  align="center">-->
<!--&lt;!&ndash;          <template slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;            <img :src="getUrl(scope.row.avator)" alt="" style="width: 80px;"/>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-upload&ndash;&gt;-->
<!--&lt;!&ndash;              class="upload-demo"&ndash;&gt;-->
<!--&lt;!&ndash;              :action="uploadUrl(scope.row.id)"&ndash;&gt;-->
<!--&lt;!&ndash;              :show-file-list="false"&ndash;&gt;-->
<!--&lt;!&ndash;              :on-success="handleAvatarSuccess"&ndash;&gt;-->
<!--&lt;!&ndash;              :before-upload="beforeAvatarUpload">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-button size="mini">更新图片</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-upload>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--        </el-table-column>-->
<!--        <el-table-column label="学号/工号" prop="serialNumber"  align="center"></el-table-column>-->
<!--        <el-table-column label="用户名" prop="username"  align="center"></el-table-column>-->
<!--        <el-table-column label="密码" prop="password" align="center"></el-table-column>-->
<!--        <el-table-column label="性别" align="center" prop="sex">-->
<!--&lt;!&ndash;          <template slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;            <div>{{changeSex(scope.row.sex) }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--        </el-table-column>-->
<!--        <el-table-column label="邮箱" prop="email" align="center"></el-table-column>-->

<!--        <el-table-column class-name="status-col" label="激活状态" width="110" align="center">-->
<!--          <template slot-scope="{row}">-->
<!--            <el-tag :type="row.status | statusFilter">-->
<!--              {{ row.status }}-->
<!--            </el-tag>-->
<!--          </template>-->
<!--        </el-table-column>-->

<!--        <el-table-column prop="role" label="身份" align="center"></el-table-column>-->
<!--&lt;!&ndash;        <el-table-column prop="location" label="地区" width="80" align="center"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-table-column label="收藏" width="80" align="center">&ndash;&gt;-->
<!--&lt;!&ndash;          <template  slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-button size="mini" @click="getCollect(data[scope.$index].id)">收藏</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-table-column>&ndash;&gt;-->
<!--        <el-table-column label="操作" width="150" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>-->
<!--            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->

<!--      <div class="pagination">-->
<!--        <el-pagination-->
<!--          @current-change="handleCurrentChange"-->
<!--          background-->
<!--          layout="total, prev, pager, next"-->
<!--          :current-page="currentPage"-->
<!--          :page-size="pageSize"-->
<!--          :total="tableData.length">-->
<!--        </el-pagination>-->
      </div>

    </div>

<!--    &lt;!&ndash;添加新用户&ndash;&gt;-->
<!--    <el-dialog title="添加用户" :visible.sync="centerDialogVisible" width="400px" center>-->
<!--      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">-->
<!--        <el-form-item label="学号/工号" prop="serialNumber" size="mini">-->
<!--          <el-input v-model="registerForm.serialNumber" placeholder="学号/工号"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="用户名" prop="username" size="mini">-->
<!--          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码" prop="password" size="mini">-->
<!--          <el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="性别" size="mini">-->
<!--          <el-radio-group v-model="registerForm.sex">-->
<!--            <el-radio :label="0">女</el-radio>-->
<!--            <el-radio :label="1">男</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="邮箱" prop="email" size="mini">-->
<!--          <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="状态" prop="status" size="mini">-->
<!--          <el-input  placeholder="状态" v-model="registerForm.status"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="角色" prop="role" size="mini">-->
<!--          <el-select v-model="registerForm.role" placeholder="角色">-->
<!--            <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" size="mini" @click="addPeople">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->

<!--    &lt;!&ndash; 编辑弹出框 &ndash;&gt;-->
<!--    <el-dialog title="编辑" :visible="editVisible" width="400px" :before-close="handleClose">-->
<!--      <el-form ref="form" :model="form" label-width="90px">-->
<!--        <el-form-item label="学号/工号" size="mini">-->
<!--          <el-input v-model="form.serialNumber" :disabled="true"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="用户名" size="mini">-->
<!--          <el-input v-model="form.username" :disabled="true"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码" size="mini">-->
<!--          <el-input v-model="form.password"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="性别" size="mini">-->
<!--          <el-radio-group v-model="form.sex">-->
<!--            <el-radio :label="0">女</el-radio>-->
<!--            <el-radio :label="1">男</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="邮箱" size="mini">-->
<!--          <el-input v-model="form.email"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="状态" size="mini">-->
<!--          <el-input v-model="form.status"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="角色" size="mini">-->
<!--          <el-input v-model="form.role"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button size="mini" @click="editVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" size="mini" @click="saveEdit">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->

<!--    &lt;!&ndash; 删除提示框 &ndash;&gt;-->
<!--    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>-->
<!--      <div class="del-dialog-cnt" align="center">删除不可恢复，是否确定删除？</div>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button size="mini" @click="delVisible = false">取 消</el-button>-->
<!--        <el-button size="mini" type="primary" @click="deleteRow">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
</template>

<script>
import { mixin } from '@/mixins/index'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {

  name: 'user-manage',
  mixins: [mixin],
  components:{
    Mallki,
  },
  filters:{
    statusFilter(status) {
      const statusMap = {
        Verified: 'success',
        NoVerified: 'danger',
      }
      return statusMap[status]
    }
  },
  data(){
    return{
      tableData: [
        {
          serialNumber:"1",
          username:"王小虎",
          password:"111",
          sex:"男",
          email:"lalal",
          status:"NoVerified",
          role:"老师"

        },
      ],
      roles:[
        {
          value: '责任教师',
          label: '责任教师'
        },
        {
          value: '学生',
          label: '学生'
        },
        {
          value: '教师',
          label: '教师'
        },
        {
          value: '助教',
          label: '助教'
        },
        {
          value: '系统管理员',
          label: '系统管理员'
        },
      ],
      registerForm: { // 注册
        serialNumber: '',
        username: '',
        password: '',
        sex: '',
        email: '',
        status: '',
        role: '',
      },
      form: { // 记录编辑的信息
        id:'',
        serialNumber: '',
        username: '',
        password: '',
        sex: '',
        email: '',
        status: '',
        role: '',
        createTime: '',
        updateTime: ''
      },
      pageSize: 5, // 页数
      currentPage: 1, // 当前页
      centerDialogVisible: false,
      editVisible: false, // 显示编辑框
      delVisible: false, // 显示删除框
    }


  },
  methods:{

    teaList(){
      this.$router.push('/user/tea-list')
    },
    stuList(){
      this.$router.push('/user/stu-list')
    },

    // 获取当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleEdit (row) {
      this.idx = row.id
      this.form = {
        id: row.id,
        serialNumber: row.serialNumber,
        username: row.username,
        password: row.password,
        sex: row.sex,
        email: row.email,
        status: row.status,
        role: row.role,
      }
      this.editVisible = true
    },
    handleDelete(){
      this.delVisible= true
    },
    saveEdit(){
      console.log('saveEdit------run')
      this.editVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    addPeople(){
      console.log('addPeople-----run')
    },
    deleteRow(){
      console.log('deleteRow------run')
      this.notify('删除框','success')
    },
  }
  // select_word: function () {
  //   if (this.select_word === '') {
  //     this.tableData = this.tempDate
  //   } else {
  //     this.tableData = []
  //     for (let item of this.tempDate) {
  //       if (item.username.includes(this.select_word)) {
  //         this.tableData.push(item)
  //       }
  //     }
  //   }
  // }

}

</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
  font-size: 12px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

</style>
