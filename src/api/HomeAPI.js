import axios from "axios";



const getMainList = async ()=>{
    const res = await axios.get("https://3.35.46.239/categories")
    return res;
}

export {getMainList};