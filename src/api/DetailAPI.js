import axios from "axios";



const getDetail = async (payload)=>{
    const res = await axios.get(`http://3.35.46.239/api/goods/${payload}`)
    return res;
}

export {getDetail};