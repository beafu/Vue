import axios from "../common/http"
export async function  getGoodslist(params){
    const res=await axios.get("/api/goodslist",{params})
    if(res.code==200){
        return res.list
    }
    return false
}
export async function getTotal(){
    const res=await axios.get("/api/goodscount");
    if(res.code==200){
        return res.list[0].total
    }
    return false
}
export async function updateInfo(params){
    const fd=new FormData();
    for(let key in params){
        fd.append(key,params[key])
    }
    const res=await axios.post('/api/goodsedit',fd);
    if(res.code==200){
        return res.list;
    }
    return false
}
export async function getGoodsByid(id){
    const res=await axios.get("/api/goodsinfo",{params:{id}})
    if(res.code==200){
        return res.list
    }
    return false
}