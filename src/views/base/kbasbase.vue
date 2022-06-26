<template>

  <div class="filter-container" >
      <div v-if="!isDetail">
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
            <mallki class-name="mallki-text" text="知识库广场" style=""/>
          </div>
        </el-card>

        <div class="filter-container" >
          <el-card class="box-card" style="
              margin-bottom: 10px;
              margin-top: 10px;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 10px;
              margin-left: 4.5%;
              margin-right: 4.5%
            ">
            <el-button class="filter-item pan-btn purple-btn" type="primary"  @click="addVisible = true"
                       style="margin-left: 10px;">添加知识库
            </el-button>
          </el-card>
        </div>

        <div>
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
                  :span="6"
                  v-for="item in kbasbases"
                  :key="item.id"
                  style="margin-bottom: 1% ;"

                >
                  <el-card color="#385F73" dark class="E-card-back" @click="">
                    <img
                      :src="item.img"
                      @click="check(item.id)"
                      class="main-card-image"
                    />
                    <div style="padding: 14px">
                      <el-link
                        @click=""
                        class="title-font setHeight"
                      >
                      </el-link
                      >
                    </div>
                    <p class="title is-4 main-title-font setHeight" style="margin-left: 20%;margin-right: 5%">{{ item.name }}</p>
                    <!--                <p class="subtitle is-6">@johnsmith</p>-->
                  </el-card>
                </el-col>
              </el-row>
            </el-main>

          </el-container>


          <el-dialog
            title="创建知识库"
            :visible="addVisible"
            width="30%"
            center
            :before-close="handleClose"
          >
            <section>
              <b-field label="知识库名称" type="is-info is-light">
                <b-input  v-model="name" rounded></b-input>
              </b-field>

              <b-field label="标签所属">
                <b-input type="is-success" v-model="owner" rounded></b-input>
              </b-field>

            </section>


            <span class="dialog-footer" slot="footer" style="padding-top: 0px;margin-top:0">
                      <el-button type="primary" @click="addVisible = false" size="medium">取 消</el-button>
                      <el-button  style="margin-left: 10px" type="success" @click="createKbas" size="medium">确 定</el-button>
        </span>
          </el-dialog>

        </div>
      </div>


    <div class="filter-container" v-if="isDetail">

      <el-card class="box-card" style="
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
                :span="6"
                style="margin-bottom: 1% ;"

              >
                <el-card color="#385F73" dark class="E-card-back" @click="">
                  <img
                    :src="this.kbasSingle.img"
                    class="card-image"
                  />
                </el-card>
              </el-col>

              <el-col
                :span="18"
                style="margin-bottom: 1% ;"
              >
                <el-card color="#385F73" dark class="E-card-back" @click="">
                  <p class="title is-2 title-font setHeight" style="margin-left: 40%;">{{ this.kbasSingle.name }}</p>
                  <p class="subtitle is-4 sub-title-font setHeight"style="margin-left:39%;margin-top: 5%">{{this.kbasSingle.owner}}</p>

                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-card>

      <div class="filter-container" >
        <el-card class="box-card" style="
              margin-bottom: 10px;
              margin-top: 10px;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 10px;
              margin-left: 4.5%;
              margin-right: 4.5%
            ">

          <el-button class="filter-item pan-btn purple-btn" type="primary"  @click="addDocVisible = true"
                     style="margin-left: 10px;">添加记录
          </el-button>
          <el-button type="primary" class="handle-del mr10 filter-item pan-btn pink-btn" @click="back">返回</el-button>
        </el-card>
      </div>


      <el-dialog
        title="创建知识记录"
        :visible="addDocVisible"
        width="30%"
        center
        :before-close="handleClose"
      >
        <section>
          <b-field label="记录名称" type="is-info is-light">
            <b-input  v-model="title" rounded></b-input>
          </b-field>

          <b-field label="内容">
            <b-input type="is-success" v-model="content" rounded></b-input>
          </b-field>

        </section>


        <span class="dialog-footer" slot="footer" style="padding-top: 0px;margin-top:0">
                      <el-button type="primary" @click="addDocVisible = false" size="medium">取 消</el-button>
                      <el-button  style="margin-left: 10px" type="success" @click="createDocs" size="medium">确 定</el-button>
        </span>
      </el-dialog>

      <b-table
        height="250px"
        :data="docs"
        :selected.sync="selected"
        :sticky-header="stickyHeaders"
        style="margin-left: 5%;margin-right: 5%"
        draggable>
        <b-table-column field="id" label="ID" width="200" sortable numeric centered searchable="searchable">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template  #searchable="props2">
            <b-field>
              <b-input
                v-model="props2.filters[props2.column.field]"
                placeholder="Search..."
                style="font-size: 30px"
                size="is-small" />
            </b-field>
          </template>
          <template v-slot="props">
            {{ props.row.id }}
          </template>
        </b-table-column>


        <b-table-column field="title" label="名称" v-slot="props" sortable centered>
            <span>
                 {{ props.row.title }}
            </span>
        </b-table-column>

        <b-table-column field="content" label="内容" v-slot="props" sortable centered>
            <span>
                 {{ props.row.content }}
            </span>
        </b-table-column>

        <b-table-column label="选择" v-slot="props" centered>
            <span>
               <b-button
                 size="is-small"
                 type="is-primary"
                 icon-pack="fas"
                 icon-left="magnifying-glass"
               />
            </span>
        </b-table-column>

      </b-table>

    </div>
  </div>
</template>

<script>
import Mallki from '@/components/TextHoverEffect/Mallki'
import KbasDetail from "@/components/kabs/KbasDetail";

export default {
  name: "kbasbase",
  components:{
    Mallki,
    KbasDetail,
  },
  data() {
    return {
      kbasSingle:[
        {
          id:"",
          name:"",
          owner:"",
          img:""
        }
      ],
      kbasbases:[
        {
          id:"",
          name:"",
          owner:"",
          img:""
        }
      ],
      selected: '',
      stickyHeaders: true,

      docs:[
        {
          "id": "",
          "title": "",
          "content": "",
          "knowbaseId": "",
        }
      ],
      addVisible:false,
      addDocVisible:false,

      isDetail:false,
      name:'',
      owner:'',
      KBASID:0,

      title:'',
      content:'',
    }
  },

  methods: {
    getAllKbas(){
      let url = "/docks"
      this.axios
        .get(url, {
          // params: { courseId: this.courseId },
          crossDomain: true,
        })
        .then((response) => {
          this.kbasbases = response.data
          console.log(this.kbasbases)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getSingleKbs(){
      let url = "/docks/"
      this.axios
        .get(url+this.KBASID, {
          crossDomain: true,
        })
        .then((response) => {
          this.kbasSingle = response.data
          console.log(this.kbasSingle)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getAllDocsBykbasId(){
      let url = "/d/knowbase/"
      this.axios
        .get(url+this.KBASID+"/doc", {
          crossDomain: true,
        })
        .then((response) => {
          this.docs = response.data
          console.log(this.docs)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    back() {
      this.isDetail = false;
      this.clear();
    },
    clear(){
      this.KBASID = 0;
      this.docs=[];
    },
    check(id){
      this.KBASID = id;
      this.isDetail = true;
      this.getSingleKbs();
      this.getAllDocsBykbasId();
      this.selected = this.docs[0]
    },
    handleClose(done) {
      this.addVisible = false;
      this.addDocVisible = false;
    },
    createKbas(){
      let url = "/Knowbase/"
      var jsons = {
        "Name":this.name,
        "Owner":this.owner
      }
      this.axios
        .post(url, jsons,{
          crossDomain: true,
          /*          headers:{
                      'Content-Type' : 'application/json'
                    }*/
        })
        .then((response) => {
          console.log("createKbas")
          console.log(response)
          this.addVisible = false;
          this.getAllKbas();
          this.name='';
          this.owner='';
          this.$buefy.notification.open({
            message: `知识库创建成功`,
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

    createDocs(){
      let url = "/d/knowbase/"
      var jsons = {
        "title":this.title,
        "content":this.content
      }
      this.axios
        .post(url+this.KBASID+"/doc", jsons,{
          crossDomain: true,
          /*          headers:{
                      'Content-Type' : 'application/json'
                    }*/
        })
        .then((response) => {
          console.log("createDocs")
          console.log(response)
          this.addDocVisible = false;
          this.getAllDocsBykbasId();
          this.title='';
          this.content='';
          this.$buefy.notification.open({
            message: `知识记录创建成功`,
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
    this.getAllKbas()
  }
}
</script>

<style scoped>

.handle-input {
  width: 300px;
  display: inline-block;
}

.E-card-back {
  margin: 5% 8%;
  border-radius: 15px;

  background-color: rgba(255, 255, 255, 0.5);
}

.E-card-back-new {
  margin: 5% 8%;
  border-radius: 15px;

/*  background-color: rgba(255, 255, 255, 0.5);*/
}

.card-image {
  height: 190px;
  width: auto;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888888;
}

.main-card-image {
  height: 220px;
  width: auto;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888888;
}

.card-image-new {
  height: 300px;
  width: auto;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888888;
}

.time-font {
  font-size: 13px;
  color: #999;
}
.main-title-font {
  font-size: 22px;
  color: black;
}

.title-font {
  font-size: 30px;
  color: black;
}

.sub-title-font {
  font-size: 22px;
  color: black;
}

.divider {
  position: relative;
  margin: 10px auto;
  width: auto;
  height: 1px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: #475669;
}

.back {
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 20px;
}

.setHeight {
  overflow: hidden;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.el-card:hover {
  cursor: pointer;
  -webkit-transform: translateY(-2px) translateX(-2px);
  -ms-transform: translateY(-2px) translateY(-2px);
  -webkit-box-shadow: 3px 3px 6px #999;
  box-shadow: 3px 3px 6px #999;
  -webkit-transition: all .5s ease-out;
  transition: all .5s ease-out;
}


</style>
