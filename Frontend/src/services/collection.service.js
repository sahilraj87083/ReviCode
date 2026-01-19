import { api } from "./api.services";

export const getMyCollections = () =>
  api.get("/collections").then(res => res.data.data);

export const createCollection = (data) =>
  api.post("/collections", data).then(res => res.data.data);

export const deleteCollection = (collectionId) => 
    api.delete(`/collections/${collectionId}`).then(res => res.data)

export const getCollectionById = (collectionId) =>
    api.get(`/collections/${collectionId}`).then(res => res.data.data)

export const getCollectionAllQuestions = (collectionId) =>
    api.get(`/collections/${collectionId}/questions`).then(res => res.data.data)


