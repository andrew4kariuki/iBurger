import axios from "axios";
const instance = axios.create({
  baseURL: "https://iburger-f2fb4.firebaseio.com/",
});

export default instance;
