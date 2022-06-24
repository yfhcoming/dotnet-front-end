<template>
  <div class="table">
    <div class="app-container">

      <div class="filter-container">
        <el-card class="box-card" style="
            margin-bottom: 10px;
            margin-top: 10px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 10px;">
          <div class="component-item" style="">
            <mallki class-name="mallki-text" text="学生列表" style=""/>
          </div>
        </el-card>


        <div class="filter-container" >
          <el-card class="box-card" style="
            margin-bottom: 10px;
            margin-top: 10px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
          ">
            <el-button type="primary" class="handle-del mr10 filter-item pan-btn pink-btn" @click="delAll">批量删除</el-button>
            <el-input v-model="select_word" placeholder="筛选相关用户" class="handle-input mr10 filter-item"
                      style="margin-left: 10px;"></el-input>
            <el-button class="filter-item pan-btn purple-btn" type="primary"  @click="addVisible = true"
                       style="margin-left: 10px;">添加学生
              <!--              <el-upload-->
              <!--                class="filter-item"-->
              <!--                name="excelFile"-->
              <!--                :action="uploadUrl()"-->
              <!--                :on-error="uploadFalse"-->
              <!--                :on-success="uploadSuccess"-->
              <!--                :before-upload="beforeAvatarUpload"-->
              <!--                :limit="1"-->
              <!--                accept=".xlsx,.xls"-->
              <!--                :show-file-list="false"-->
              <!--                :file-list="fileList">-->
              <!--                <el-button  style="margin-left: 10px;" icon="el-icon-edit" type="primary">批量上架</el-button>-->
              <!--              </el-upload>-->

            </el-button>

            <el-dialog
              title="添加学生"
              :visible.sync="addVisible"
              width="30%"
              center
              :before-close="handleClose"
            >
              <el-upload
                class="avatar-uploader"
                action="/api/student"
                :on-success="uploadSuccess"
                :before-upload="beforeAvatarUpload"
                :on-error="uploadFalse"
                accept=".xlsx,.xls"
                style="margin-top: 0px;margin-bottom: 12%"
                :show-file-list="false">
                <!--                :show-file-list="false">-->
                <!--                  <img v-if="imageUrl" :src="imageUrl" class="avatar"/>-->
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span class="dialog-footer" slot="footer" style="padding-top: 0px;margin-top:0">
                    <el-button type="primary" @click="addVisible = false" size="medium">取 消</el-button>
                    <el-button  style="margin-left: 10px" type="success" @click="" size="medium">确 定</el-button>
                </span>
            </el-dialog>

          </el-card>

        </div>
      </div>

      <el-container style="" class="filter-container">
        <el-main style="padding: 0">
          <el-row style="
            background: rgba(255, 255, 255, 0.5);
            margin-left: 0%;
            border-radius: 10px;"
                  class="filter-container">

            <el-card class="box-card" style="
            margin-bottom: 10px;
            margin-top: 10px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
          ">


              <el-table :data="stuData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="
                      width: 100%;
                      margin-top: 2%;
                      background: rgba(255, 255, 255, 0.5);
                      border-radius: 10px;" @selection-change="handleSelectionChange">
                <el-table-column type="selection"  align="center"></el-table-column>
                <el-table-column label="用户头像"  align="center">
                  <template slot-scope="scope">
                    <!--                            <img :src="getUrl(scope.row.avatar)" alt="" style="width: 80px;"/>-->
                    <img :src="scope.row.avatar" alt="" style="width: 80px;"  @click="setCoverVisible(scope.row.teacherId)"/>
                    <el-dialog
                      title="上传头像"
                      :visible="coverVisible"
                      width="30%"
                      center
                      :before-close="handleClose"
                    >
                      <el-upload
                        class="avatar-uploader"
                        action="/api/images/image"
                        :on-success="handlefaceSuccess"
                        :before-upload="beforefaceUpload"
                        style="margin-top: 0px;margin-bottom: 12%"
                        :show-file-list="false">
                        <!--                :show-file-list="false">-->
                        <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <span class="dialog-footer" slot="footer" style="padding-top: 0px;margin-top:0">
                    <el-button type="primary" @click="coverVisible = false" size="medium">取 消</el-button>
                    <el-button  style="margin-left: 10px" type="success" @click="setCover" size="medium">确 定</el-button>
                    </span>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column label="学号/工号" prop="studentId"  align="center"></el-table-column>
                <el-table-column label="用户名" prop="studentName"  align="center"></el-table-column>
                <el-table-column label="密码" prop="password" align="center"></el-table-column>
                <el-table-column label="性别" align="center" prop="gender">
                  <!--                          <template slot-scope="scope">-->
                  <!--                            <div>{{changeSex(scope.row.sex) }}</div>-->
                  <!--                          </template>-->
                </el-table-column>
                <el-table-column label="邮箱" prop="mailbox" align="center"></el-table-column>

                <el-table-column class-name="status-col" label="激活状态" width="110" align="center">
                  <template slot-scope="scope">
                    <el-tag :type="isVerifiedFilter(scope.row.activationState)" v-if="scope.row.activationState===1">
                      Y
                    </el-tag>
                    <el-tag :type="isVerifiedFilter(scope.row.activationState)" v-else>
                      N
                    </el-tag>
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="150" align="center">
                  <template slot-scope="scope">
                    <el-button plain type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button plain type="danger" size="small" @click="handleDelete(scope.row.studentId)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-row style="
                        margin-top: 2%;
                        padding: 2%;
                        border-radius: 10px;
                        margin-left: 4.5%;
                        margin-right: 4.5%;
                        text-align: center">
              <span style="margin-left: 39%">
                <el-pagination
                  v-model:currentPage="currentPage"
                  :page-sizes="[1, 2, 5, 10]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="stuData.length"
                  :page-size="pageSize"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :small="false"
                >
                </el-pagination>
              </span>
              </el-row>


            </el-card>
          </el-row>
        </el-main>
      </el-container>

    </div>

    <!-- 编辑弹出框 -->

    <el-dialog title="编辑" :visible="editVisible" width="40%" :before-close="handleClose" center>
      <el-form ref="editForm" :model="editForm" label-width="90px">
        <el-form-item label="学号" size="medium">
          <el-input v-model="editForm.studentId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名" size="medium">
          <el-input v-model="editForm.studentName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" size="medium">
          <el-input v-model="editForm.password" ></el-input>
        </el-form-item>
        <el-form-item label="性别" size="medium">
          <el-radio-group v-model="editForm.gender" fill="#626aef">
            <el-radio-button label="女">女</el-radio-button>
            <el-radio-button label="男">男</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" size="medium">
          <el-input v-model="editForm.mailbox"></el-input>
        </el-form-item>

        <el-form-item label="激活状态" size="medium">
          <el-tag :type="isVerifiedFilter(editForm.activationState)" v-if="editForm.activationState===1">
            Y
          </el-tag>
          <el-tag :type="isVerifiedFilter(editForm.activationState)" v-else>
            N
          </el-tag>

          <el-button plain style="margin-left: 80%" type="danger" @click="switchTAG" size="small">更改</el-button>

        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer" style="">
        <el-button plain type="primary" @click="editVisible = false" size="medium">取 消</el-button>
        <el-button plain style="margin-left: 10px" type="success" @click="saveEdit" size="medium">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center >
      <div class="del-dialog-cnt" align="center">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button plain @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Mallki from '@/components/TextHoverEffect/Mallki'
import { mixin } from '@/mixins/index'

export default {

  name: 'stu-list',
  mixins: [mixin],
  components:{
    Mallki,

  },
  data(){
    return{
      stuData: [
        {
          avatar:'',
          studentId:"",
          studentName:"",
          password:"",
          gender:"",
          mailbox:"",
          activationState:"",
        },
      ],
      tempData:[],//记录用户信息，用于搜索时能临时记录一份用户信息

      select_word: '', // 记录输入框输入的内容
      editForm: {  // 记录编辑的信息
        avatar:'',
        studentId:"",
        studentName:"",
        password:"",
        gender:"",
        mailbox:"",
        activationState:"",
      },

      pageSize: 5, // 页数
      currentPage: 1, // 当前页

      centerDialogVisible: false,

      coverVisible: false, //头像
      editVisible: false, // 显示编辑框
      delVisible: false, // 显示删除框
      addVisible: false, // 显示导入框

      imageUrl:'',
      imageUrlx:'',

      idxCover:'',
    }


  },
  watch: {
    select_word: function () {
      if (this.select_word === '') {
        this.stuData = this.tempData
      } else {
        this.stuData = []
        for (let item of this.tempData) {
          if (item.studentName.includes(this.select_word)) {
            this.stuData.push(item)
          }
        }
      }
    }
  },
  methods:{

    //添加用户
    uploadSuccess(response, file, fileList) {
      console.log(response)
      this.handleClose();
      this.$notify({
        title: "导入成功",
        type:"success"
      });
      this.getAllStus();
    },

    uploadFalse(response, file, fileList) {
      this.$notify({
        title: '文件上传失败！',
        type: 'error'
      });
    },

    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        this.$notify({
          title: '上传模板只能是 xls、xlsx格式!',
          type: 'error'
        });
      }
      if (!isLt2M) {
        console.log("上传模板大小不能超过 10MB!");
        this.$notify({
          title: '上传模板大小不能超过 10MB!',
          type: 'error'
        });
      }
      return extension || extension2 || extension3 || (extension4 && isLt2M);
    },


    isVerifiedFilter(it){
      const statusMap = {
        1: 'success',
        0: 'danger',
      }
      return statusMap[it]
    },

    handleSelectionChange (val) {
      this.multipleSelection = val
    },


    // 获取当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleSizeChange(val){
      this.pageSize = val;
    },

    // 编辑
    handleEdit (row) {
      console.log(row.name)
      this.idx = row.teacherId
      this.editForm = {
        avatar:row.avatar,
        studentId:row.studentId,
        studentName:row.studentName,
        password:row.password,
        gender:row.gender,
        mailbox:row.mailbox,
        activationState:row.activationState,
      }
      this.editVisible = true
    },
    handleClose(done) {
      this.editVisible = false;
      this.coverVisible = false;
      this.addVisible = false;
    },
    switchTAG(){
      let it = this.editForm.activationState;
      if(it===1){
        this.editForm.activationState=0;
        this.$notify({
          title: "用户状态为未激活",
          type:"error"
        });
      }
      else if(it===0){
        this.editForm.activationState=1;
        this.$notify({
          title: "用户状态激活",
          type:"success"
        });
      }

    },

    saveEdit(){
      console.log("saveEdit")
      var url = "/api/student/upByManager"
      this.axios
        .post(url, {},{
          params: {
            avatar:this.editForm.avatar,
            studentId:parseInt(this.editForm.studentId),
            studentName:this.editForm.studentName,
            password:this.editForm.password,
            gender:this.editForm.gender,
            mailbox:this.editForm.mailbox,
            activationState:parseInt(this.editForm.activationState),
          },
          crossDomain: true,
        })
        .then(response => {
          if(response.data === true)
          {
            this.getAllStus();
            let _this=this;
            setTimeout(function () {
              _this.$notify({
                title: "成功修改一条信息！",
                type:"success"
              })
            }, 500);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.editVisible = false
    },


    // 删除

    delAll () {
      for (let item of this.multipleSelection) {
        this.handleDeleteForAll(item.studentId)
        this.deleteRow(item.studentId)
      }
      this.multipleSelection = [];
      // this.$notify({
      //   title: "全部删除成功",
      //   type:"success"
      // });
    },

    handleDelete(id){
      this.idx = id
      console.log(id)
      this.delVisible= true
    },

    handleDeleteForAll(id){
      this.idx = id
    },

    deleteRow(){
      var url = "/api/student/deleteByManager"
      this.axios
        .post(url, {},{
          params: {
            studentId:parseInt(this.idx),
          },
          crossDomain: true,
        })
        .then(response => {
          if(response.data === true)
          {
            this.delVisible= false;
            this.getAllStus();
            let _this=this;
            setTimeout(function () {
              _this.$notify({
                title: "成功删除一条信息！",
                type:"success"
              })
            }, 500);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //头像
    setCoverVisible(id){
      this.coverVisible = true;
      this.idxCover = id;
      console.log(this.idxCover);
    },

    //上传图片
    handlefaceSuccess(res) {
      this.imageUrl = res.result
      console.log(this.imageUrl)
    },

    beforefaceUpload(file) {
      // 设置限定格式
      const img_mimetype = ['image/jpeg', 'image/jpg', 'image/png']
      const isJPG = img_mimetype.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像只能是图片格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false;
      }
      return isJPG && isLt2M;
    },

    setCover(){
      console.log(this.idxCover);
      if(!this.imageUrl){
        this.$notify.success({
          title: "提示",
          message: "头像上传成功！",
        });
      }
      this.imageUrlx =this.imageUrl;
      this.imageUrl = '';
      this.updateAva();
    },




    updateAva() {
      console.log("updateAva")
      let url = "/api/student/update";
      console.log(this.imageUrlx);
      this.axios
        .post(url, {}, {
            params: {
              id: parseInt(this.idxCover),
              param: this.imageUrlx,
              type: "avatar",
            }, crossDomain: true
          }
        )
        .then(response => {
          if(response.data === true)
          {
            this.getAllStus();
            let _this=this;
            setTimeout(function () {
              _this.$notify({
                title: "成功修改头像！",
                type:"success"
              })
            }, 500);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.coverVisible = false;
    },


    // 获得所有学生的信息
    getAllStus(){
      console.log("getAllStus")
      var url = "/api/student/all-info"
      this.axios
        .get(url, {
          params: {},
          crossDomain: true,
        })
        .then((response) => {
          console.log(response);
          this.stuData=response.data.result;
          this.tempData=response.data.result;
          console.log(this.stuData)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  },
  mounted() {
    this.getAllStus();
  }


}

</script>

<style scoped>

.handle-input {
  width: 300px;
  display: inline-block;
}

:deep(.el-dialog) {
  min-width: 500px;
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  max-width: fit-content;
  padding: 0;
}
:deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 50%;
}

.avatar-uploader{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 28%;
  margin-right: 28%;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin-left: 2.5%;
  margin-right: 5%;
}

</style>

