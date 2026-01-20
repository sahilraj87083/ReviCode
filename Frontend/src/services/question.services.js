import { api } from "./api.services";



export const uploadQuestionService = async (data) => {
  const res = await api.post("/questions", data);
  return res.data.data; // question
};



export const getAllQuestionsService = async (params = {}) => {
  const res = await api.get("/questions", { params });
  return res.data.data; 
  // {
  //   total,
  //   page,
  //   pages,
  //   limit,
  //   questions
  // }
};



export const getQuestionByIdService = async (questionId) => {
  const res = await api.get(`/questions/${questionId}`);
  return res.data.data; // question
};


export const updateQuestionService = async (questionId, data) => {
  const res = await api.patch(`/questions/${questionId}`, data);
  return res.data.data; // updated question
};


export const deleteQuestionService = async (questionId) => {
  const res = await api.delete(`/questions/${questionId}`);
  return res.data.data; // {}
};
