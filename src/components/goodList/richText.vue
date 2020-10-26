<template>
  <div class="e">
    <el-card>
        <h1>分室山</h1>
      <el-divider></el-divider>
      <vue-wangeditor id="editor" v-model="content" ref="aditor"></vue-wangeditor>
      <el-button @click="gethtml" type="primary">获取内容</el-button>
      <el-button @click="sethtml" type="success">设置内容</el-button>
    </el-card>
  </div>
</template>

<script>
import vueWangeditor from "vue-wangeditor";
export default {
  name: "e",
  data() {
    return {
        content:`<h1>你好</h1>`
    };
  },
  components: {
    vueWangeditor,
  },
  created() {},
  mounted() {},
  methods: {
      gethtml(){
          const html=this.$refs.aditor.gethtml();
      },
       sethtml(){
          this.$refs.editor.sethtml(`
          <h1>世界</h1>
          `)
      }
  },
};
</script>
<style scoped>
</style>
