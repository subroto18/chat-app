import api from "../api/Http";

const UPLOAD = async (formData, config) => {
  const res = await api().post("/api/media/upload", formData, config);
  return res;
};

export { UPLOAD };
