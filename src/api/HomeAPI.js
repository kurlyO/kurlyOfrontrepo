import axios from "axios";



const getMainList = async ()=>{
    const res = await axios.get("api/categories")
    return res;
}

export {getMainList};