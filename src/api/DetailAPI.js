import axios from "axios";



const getDetail = async (payload)=>{
    const res = await axios.get(`https://spar-bk.shop/api/goods/${payload}`)
    return res;
}

export {getDetail};