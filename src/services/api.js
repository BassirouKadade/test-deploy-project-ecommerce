import axios from "axios";
const base_url=process.env.REACT_APP_BASE_URL;
const api=axios.create({
     baseURL:base_url,
    headers:{
          "Content-Type":"application/json"
    }
})
export default api
export {base_url}