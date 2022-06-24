export const mixin = {
  methods: {
    notify (title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    // 获取批量要删除的列表
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    delAll(){

    },
  }
}
