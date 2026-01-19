import { api } from "./api.services";

export const addQuestionToCollection = (collectionId, data) =>
  api.post(`/collections/${collectionId}/questions`, data);

export const removeQuestionFromCollection = (collectionId, qId) =>
  api.delete(`/collections/${collectionId}/questions/${qId}`);