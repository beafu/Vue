import axios from "../common/http"
export async function lunList(){
    const res=await axios.get("/api/bannerlist")
    if(res.code==200){
        return res.list
    }
    return false
}
export async function lunById(id){
    const res=await axios.get("/api/bannerinfo",{params:{id}})
    console.log(res)
    if(res.code==200){
        return res.list
    }
    return false
}