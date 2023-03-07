import axios from "axios";



const getMainList = async ()=>{
    try{
        const res = await axios.get("https://spar-bk.shop/api/goods")
        console.log(res)
        return res;
    }
    catch(error){
        console.log("ddddddddddd",error)
    }

}
const getCateList = async (payload) => {
    try {
        console.log(payload);
      const res = await axios.get(`https://spar-bk.shop/api/goods/categories/${payload}`);
      console.log(res);
      return res;
    } catch (error) {
      console.log("ddddddddddd", error);
    }
  };

export {getMainList, getCateList};