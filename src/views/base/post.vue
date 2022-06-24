<template>
  <div class="filter-container" >
    <div >
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
          <mallki class-name="mallki-text" text="社区交流" style=""/>
        </div>
      </el-card>
    </div>


    <div class="filter-container" >
      <el-card class="box-card" style="
              margin-bottom: 10px;
              margin-top: 10px;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 10px;
              margin-left: 4.5%;
              margin-right: 4.5%
            ">
        <el-button class="filter-item pan-btn purple-btn" type="primary"  @click="getPostsOrderByLikes"
                   style="margin-left: 10px;">排序
        </el-button>
        <el-input v-model="select_word" placeholder="搜索帖子" class="handle-input mr10 filter-item"
                  style="margin-left: 10px;"></el-input>
        <el-button class="filter-item pan-btn purple-btn" type="primary"  @click="createPostVisible = true"
                   style="margin-left: 10px;">发布帖子
        </el-button>
      </el-card>



    </div>

    <el-dialog
      title="发布帖子"
      :visible="createPostVisible"
      width="30%"
      center
      :before-close="handleClose"
    >
      <section>
        <b-field label="帖子标题" type="is-info is-light">
          <b-input  v-model="title" rounded></b-input>
        </b-field>

        <b-field label="内容">
          <b-input type="is-success" v-model="content" rounded></b-input>
        </b-field>

      </section>


      <span class="dialog-footer" slot="footer" style="padding-top: 0px;margin-top:0">
                      <el-button type="primary" @click="createPostVisible = false" size="medium">取 消</el-button>
                      <el-button  style="margin-left: 10px" type="success" @click="createPosts" size="medium">确 定</el-button>
        </span>
    </el-dialog>

    <div>

      <el-card class="box-card"
               v-for="(item,index) in posts"
               :key="item.id"
               style="
              margin-bottom: 10px;
              margin-top: 10px;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 10px;
              margin-left: 4.5%;
              margin-right: 4.5%
            ">
        <el-container style="
              margin-left: 3%;
              margin-right: 3%">
          <el-main>
            <el-row

              style="
              margin-top: 2%;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 10px;
              text-align: left;

            "
              justify="start"
            >
              <el-col
                :span="18"
                style="margin-bottom: 1% ;">
                <b-collapse
                  aria-id="contentIdForA11y2"
                  class="panel"
                  animation="slide"
                  v-model="isOpen[index]"
                  @open=""
                  style="margin-top: 2%">
                  <template #trigger>
                    <div
                      class="panel-heading"
                      role="button"
                      aria-controls="contentIdForA11y2"
                      :aria-expanded="isOpen[index]">
                      <strong>{{item.title}}</strong>
                    </div>
                  </template>

                  <b-message type="is-info">
                    {{item.content}}
                  </b-message>
<!--                  <b-notification
                    type="is-info is-light"
                    >
                    {{item.content}}
                  </b-notification>-->

                </b-collapse>
              </el-col>
              <el-col
                :span="6"
                style="margin-bottom: 1% ;"
              >
                  <b-button type="is-info" style="margin-left: 20%;margin-top: 10%" @click="likePosts(item.id)">点赞</b-button>
<!--
                <el-button class="filter-item pan-btn purple-btn" type="primary"  @click=""
                           style="margin-left: 10px;">s删除
                </el-button>-->
              </el-col>
            </el-row>
            <el-row style="margin-top: 5%">
              <el-col
                :span="6"
                style="margin-left: 5%;margin-bottom: 1% ;"
              >
                <p style="color: #4AB7BD;font-size: 18px">{{item.likeNum}} Likes </p>
              </el-col>

              <el-col
                :span="6"
                style="margin-bottom: 1% ;"
              >
                <b-button type="is-dark" @click="deletePosts(item.id)">删除</b-button>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-card>
    </div>
  </div>
</template>

<script>
import Mallki from "@/components/TextHoverEffect/Mallki";

export default {
  name: "post",
  components:{
    Mallki,
  },

  data() {
    return {
      posts:[
        {
          "id": "",
          "title": "",
          "content": "",
          "likeNum": ""
        },
      ],
      title:"",
      content:"",
      tempPosts:[
        {

        }
      ],
      createPostVisible:false,
      isOpen: [],
      flag:false,
      len: 0,
      select_word:'',
    }

  },
  watch: {
    select_word: function () {
      if (this.select_word === '') {
        this.posts = this.tempPosts
      } else {
        this.posts = []
        for (let item of this.tempPosts) {
          if (item.content.includes(this.select_word)) {
            this.posts.push(item)
          }
        }
      }
    }
  },
  methods: {
    getAllPosts(){
      let url = "/post"
      this.axios
        .get(url, {
          // params: { courseId: this.courseId },
          crossDomain: true,
        })
        .then((response) => {
          this.posts = response.data
          this.tempPosts=response.data
          this.len = this.posts.length;
          this.isOpen = new Array(this.len+1).fill(false);
          console.log("isOpen"+this.isOpen)
          console.log(this.posts)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getPostsOrderByLikes(){
      let url = "/action"
      this.axios
        .get(url, {
          // params: { courseId: this.courseId },
          crossDomain: true,
        })
        .then((response) => {
          this.posts = response.data
          this.tempPosts = response.data
          this.len = this.posts.length;
          this.isOpen = new Array(this.len+1).fill(false);
          console.log("isOpen"+this.isOpen)
          console.log(this.posts)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleClose(done) {
      this.createPostVisible = false;
    },
    createPosts(){
      let url = "/post/"
      var jsons = {
        "Title":this.title,
        "Content":this.content
      }
      this.axios
        .post(url, jsons,{
          crossDomain: true,
          /*          headers:{
                      'Content-Type' : 'application/json'
                    }*/
        })
        .then((response) => {
          console.log("createPosts")
          console.log(response)
          this.createPostVisible = false;
          this.getAllPosts();
          this.title='';
          this.content='';
          this.$buefy.notification.open({
            message: `发布帖子成功`,
            duration: 3000,
            progressBar: true,
            type: 'is-primary',
            pauseOnHover: true
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    likePosts(id){
      let url = "/action/"
      var jsons = {
        "id":id
      }
      this.axios
        .post(url, jsons,{
          crossDomain: true,
          /*          headers:{
                      'Content-Type' : 'application/json'
                    }*/
        })
        .then((response) => {
          console.log("likePosts")
          console.log(response)
          this.getAllPosts()
          this.$buefy.notification.open({
            message: `点赞成功`,
            duration: 3000,
            progressBar: true,
            type: 'is-primary',
            pauseOnHover: true
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deletePosts(id){
      let url = "/moniter/"
      var jsons = {
        "id":id
      }
      this.axios
        .post(url, jsons,{
          crossDomain: true,
          /*          headers:{
                      'Content-Type' : 'application/json'
                    }*/
        })
        .then((response) => {
          console.log("deletePosts")
          console.log(response)

          this.getAllPosts()
          this.$buefy.notification.open({
            message: `删除帖子成功`,
            duration: 3000,
            progressBar: true,
            type: 'is-primary',
            pauseOnHover: true
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.isOpen = new Array(1001).fill(false);
    this.getAllPosts()
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
