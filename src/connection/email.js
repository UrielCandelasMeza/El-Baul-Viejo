import axios from "./axios.js";

export const sendEmail = (data) => axios.post("/email/send", data);
