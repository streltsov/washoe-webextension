import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_URL + "/api/v1",
  headers: { "Content-Type": "application/json" }
});
