import axios from "axios";



const getMainList = async ()=>{
    const res = await axios.get("http://3.35.46.239/api/categories")
    return res;
}

export {getMainList};