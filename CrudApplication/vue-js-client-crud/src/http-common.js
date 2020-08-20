import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:85/api",
  headers: {
    "Content-type": "application/json"
  }
});