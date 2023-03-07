import axios from "axios";



const getMainList = async ()=>{
    try{
        const res = await axios.get("http://211.215.63.173:8080/api/goods")
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
      const res = await axios.get(`http://211.215.63.173:8080/api/goods/categories/${payload}`);
      console.log(res);
      return res;
    } catch (error) {
      console.log("ddddddddddd", error);
    }
  };

export {getMainList, getCateList};