<template>
  <div id ="paper">
    <el-row :gutter="20" class="mgb20" style="padding-top: 1%;padding-left: 1%;padding-right: 1%">
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-1">
            <div class="grid-cont-right">
              <div class="grid-num">{{usr}}</div>
              <div>用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-2">
            <div class="grid-cont-right">
              <div class="grid-num">{{kbas}}</div>
              <div>知识库总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-3">
            <div class="grid-cont-right">
              <div class="grid-num">{{doc}}</div>
              <div>知识记录数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-4">
            <div class="grid-cont-right">
              <div class="grid-num">{{post}}</div>
              <div>帖子总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mixin } from '@/mixins/index'

export default {
  name: 'Dashboard',
  mixins: [mixin],
  data() {
    return {
      usr:1,
      kbas:0,
      doc:0,
      post:0,
    }
  },
  mounted() {
   this.initkabs();
   this.initDoc();
   this.initPost();
  },
  methods: {
    initkabs(){
      this.axios
        .get("/Knowbase/count", {
          // params: { courseId: this.courseId },
          crossDomain: true,
        })
        .then((response) => {
          this.kbas = response.data
          console.log("kbas"+this.kbas)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    initDoc(){
      this.axios
        .get("/d/count", {
          // params: { courseId: this.courseId },
          crossDomain: true,
        })
        .then((response) => {
          this.doc = response.data
          console.log("doc"+this.doc)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    initPost(){
      this.axios
        .get("/post/count", {
          // params: { courseId: this.courseId },
          crossDomain: true,
        })
        .then((response) => {
          this.post = response.data
          console.log("post"+this.post)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<style>
#paper {
  background: url("../../assets/bg/eva1.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
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

.cav-info {
  border-radius: 6px;
  overflow: hidden;
}
</style>
