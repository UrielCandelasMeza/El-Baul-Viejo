import axios from "./axios";

export const createPiece        = (data) => axios.post("/piece/create", data);
export const getAllPieces        = ()     => axios.get("/piece/get");
export const getAvailablePieces = ()     => axios.get("/piece/get/available");
export const getPieceById       = (id)   => axios.get(`/piece/get/${id}`);
export const updatePiece        = (id, data) => axios.put(`/piece/update/${id}`, data);
export const deletePiece        = (id)   => axios.delete(`/piece/delete/${id}`);