import $axios from "../common/http"
export async function getRoleList(){
    const res=await $axios.get("/api/rolelist");
    if(res.code==200){
        return res.list;
    }
    return false
}
export async function getRoleById(id){
    const res=await $axios.get("/api/roleinfo",{params:{id}});
    if(res.code==200){
        return res.list;
    }
    return false
}