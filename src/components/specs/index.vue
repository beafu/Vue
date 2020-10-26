<template>
  <el-card>
    <el-button
      type="primary"
      @click="$router.push('/specs/add')"
      icon="el-icon-circle-plus-outline"
      >添加</el-button
    >
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" min-width="80"> </el-table-column>
      <el-table-column prop="specsname" label="属性名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="属性值">
        <template v-slot="scope">
          <el-tag
            type="success"
            v-for="(item, index) in scope.row.attrs"
            :key="index"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="error" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            @click="edit(scope.row.id)"
            type="success"
            size="mini"
            circle
            icon="el-icon-edit"
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            size="mini"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getspecList } from "../../request/specs";
export default {
  data() {
    return {
      list: [],
      page: 1,
      size: 1,
    };
  },
  components: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    edit(id) {
      this.$router.push("/specs/" + id);
    },
    del(id) {
      this.$myConfirm(async () => {
        const res = await this.$http.post("/api/specsdelete", { id });
        if (res.code == 200) {
          const index=this.list.findIndex(item=>item.id==id)
          this.list.splice(index,1)
          return this.$success("删除成功");
        } else {
          this.$error("删除失败");
        }
      });
    },
    async getList() {
      const res = await getspecList({ page: this.page, size: this.size });
      if (res) {
        this.list = res;
      }
    },
  },
};
</script>
<style scoped>
</style>
