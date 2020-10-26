<template>
  <div class="add">
    <el-card>
      <el-form
        label-width="120px"
        :model="formData"
        :rules="formRules"
        ref="addForm"
      >
        <el-form-item label="角色名称" prop="rolename">
          <el-input
            v-model="formData.rolename"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            default-expanded-all
            :props="defaultProps"
            :default-checked-keys="formData.menus.split(',')"
            ref="tree"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getMenuById, getMenuList } from "../../request/menu";
import { getRoleById } from "../../request/role";
export default {
  name: "add",
  data() {
    return {
      formData: {
        id: this.$route.params.id,
        rolename: "",
        menus: "",
        status: 1,
      },
      formRules: {
        rolename: {
          required: true,
          message: "请输入角色名称",
          trigger: "blur",
        },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
      menuList: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  components: {},
  created() {
    // 必须要调用
    this.getMenuList();
    this.getRoleById()
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          // console.log('表单校验通过');
          // 提交数据
          // 将树形组件的选中的数据更新到this.formData.menus
          // 获取树形控件中被勾选的节点
          // [1,2,4,5]
          const menus = this.$refs.tree.getCheckedKeys();
          this.formData.menus = menus.join(",");
          this.$http.post("/api/roleedit", {...this.formData,id:this.$route.params.id}).then((res) => {
            if (res.code == 200) {
              this.$success("修改成功");
            } else {
              this.$error("修改失败");
            }
          });
        } else {
          console.log("表单校验不通过");
        }
      });
    },
    async getMenuList() {
      const res = await getMenuList();
      if (res) {
        this.menuList = res;
      }
    },
    async getRoleById(){
      const res=await getRoleById(this.formData.id);
      if(res){
        this.formData=res;
        console.log(res)
      }
    }
  },
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: auto;
}
</style>
