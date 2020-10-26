//导入axios
import $axios from "axios";
//获取菜单列表的方法
export async function getMenuList(){
   const res=await $axios.get('/api/menulist?istree=1');
   if(res.code==200){
       return res.list
   }else{
       return false;
   }
}
export async function getMenuById(id){
    const res=await $axios.get("/api/menuinfo",{params:{id}});
    if(res.code==200){
        return res.list
    }else{
        return false
    }
}