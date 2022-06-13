import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}/`;

class DirectoriesService {
  getAllDir(data) {
    return axios.post(API_URL + "directories/getAllDir", {...data}, { headers: authHeader() });
  }
  updateDirName(data) {
    return axios.post(API_URL + "directories/updateDirName", {...data}, { headers: authHeader() });
  }
  createDir(data) {
    return axios.post(API_URL + "directories/createDir", {...data}, { headers: authHeader() });
  }
  deleteDirId(data) {
    return axios.post(API_URL + "directories/deleteDirId", {...data}, { headers: authHeader() });
  }
  getPage(data) {
    return axios.post(API_URL + "page-history/getPage", {page_id: data}, { headers: authHeader() });
  }
}

export default new DirectoriesService();
