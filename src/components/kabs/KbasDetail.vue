<template>
  <div>
<!--    <el-container style="
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
            <el-card color="#385F73" dark class="E-card-back">
              <img
                :src="item.img"
                @click=""
                class="card-image"
              />
              <div style="padding: 14px">
                <el-link
                  @click=""
                  class="title-font setHeight"
                >
                </el-link
                >
              </div>
              <p class="title is-4 title-font setHeight" style="margin-left: 20%;margin-right: 5%">{{ item.name }}</p>
              &lt;!&ndash;                <p class="subtitle is-6">@johnsmith</p>&ndash;&gt;
            </el-card>
          </el-col>
        </el-row>
      </el-main>

    </el-container>-->

  </div>
</template>

<script>
export default {
  name: "KbasDetail",
  props: {
    KBASID: {
      type: String,
      default: "",
    },
  },
  methods: {
    getTheKbs(id){

    }
  },
  mounted() {
    this.getAllKbas()
  }
}
</script>

<style scoped>

</style>
