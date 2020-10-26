import $axios from "../common/http"

export async function getCategoryList(){
    const res =await $axios.get("./api/catelist?istree=1");
    if(res.code==200){
        return res.list
    }
    return false
}
export async function  getCategoryById(id){
    const res=await $axios.get("/api/cateinfo",{params:{id}})
    if(res.code==200){
        return res.list
    }
    return false
}