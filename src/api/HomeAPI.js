import axios from "axios";



const getMainList = async ()=>{
    try{
        const res = await axios.get("http://3.35.46.239/api/categories")
        console.log(res)
        return res;
    }
    catch(error){
        console.log("ddddddddddd",error)
    }

}
const getCateList = async (payload)=>{
    try{
        const res = await axios.get(`http://3.35.46.239/api/categories/${payload}`)
        console.log(res)
        return res;
    }
    catch(error){
        console.log("ddddddddddd",error)
    }

}

export {getMainList};